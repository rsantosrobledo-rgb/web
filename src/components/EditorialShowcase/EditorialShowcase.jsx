import { useState, useRef, useLayoutEffect, useEffect, useCallback, useMemo } from 'react'
import ProjectDetail from '../ProjectDetail/ProjectDetail.jsx'
import './EditorialShowcase.css'

// Stickers styled to overlap the typography directly, exactly like physical cutouts in the reference photo (scaled x1.2)
const STICKER_CONFIGS = {
  1: { rotate: -4, hoverRotate: -2, width: 'clamp(115px, 9.8vw, 194px)', overlap: '-14px' },  // Decoding Culture
  4: { rotate: 6, hoverRotate: 3, width: 'clamp(108px, 8.9vw, 180px)', overlap: '-12px' },    // 5W Summit
  3: { rotate: -4, hoverRotate: -2, width: 'clamp(115px, 9.8vw, 194px)', overlap: '-14px' },  // Christmas Tales
  6: { rotate: 5, hoverRotate: 2, width: 'clamp(122px, 10.1vw, 200px)', overlap: '-14px' },   // That's Noise
  7: { rotate: -4, hoverRotate: -2, width: 'clamp(115px, 9.5vw, 187px)', overlap: '-14px' },  // Helios Factory
  2: { rotate: 5, hoverRotate: 2, width: 'clamp(122px, 10.1vw, 202px)', overlap: '-14px' },   // Ameba Studios
  5: { rotate: -5, hoverRotate: -2, width: 'clamp(103px, 8.4vw, 166px)', overlap: '-12px' },   // AI Desert
  8: { rotate: 6, hoverRotate: 3, width: 'clamp(98px, 7.9vw, 158px)', overlap: '-12px' },     // Equal Voice
  9: { rotate: -4, hoverRotate: -1, width: 'clamp(103px, 8.4vw, 166px)', overlap: '-12px' },   // Siever Core
  10: { rotate: 5, hoverRotate: 2, width: 'clamp(98px, 7.9vw, 158px)', overlap: '-12px' },    // Mach Club
  11: { rotate: 0, hoverRotate: 0, width: 'clamp(103px, 8.4vw, 170px)', overlap: '-12px' },   // Awake Sound
  12: { rotate: 6, hoverRotate: 3, width: 'clamp(98px, 7.9vw, 161px)', overlap: '-12px' },    // Hybrid Lab
  13: { rotate: -4, hoverRotate: -2, width: 'clamp(85px, 6.8vw, 136px)', overlap: '-12px' },  // Robot Christmas
}

// Fallback rows in case projects do not specify a row property
const EDITORIAL_ROWS = [
  [1, 4],       // Row 1: Decoding Culture · 5W Global Summit
  [3, 6],       // Row 2: Christmas Chronicles · That's Noise
  [7, 2, 13],   // Row 3: Helios AI Factory · Ameba Studios · Robot Christmas
  [5, 8, 9],    // Row 4: The AI Desert · 8M Equal Voice · Siever Design Core
  [10, 11, 12], // Row 5: Mach Food Branding · Awake Sound Lab · Hybrid Futures Lab
]

// Dynamically group projects by their row property (Row 1..5)
const getEditorialRows = (projectList) => {
  if (!projectList || projectList.length === 0) return EDITORIAL_ROWS
  const hasRows = projectList.some((p) => p.row)
  if (!hasRows) return EDITORIAL_ROWS

  const rowMap = {}
  projectList.forEach((p) => {
    const r = p.row || 1
    if (!rowMap[r]) rowMap[r] = []
    rowMap[r].push(p.id)
  })
  return Object.keys(rowMap)
    .sort((a, b) => Number(a) - Number(b))
    .map((k) => rowMap[k])
}

// Strictly non-looping sequence with HOME to the left of MY WORK:
// HOME (returns to hero screen) · MY WORK · ABOUT ME · CONTACT
const SECTIONS = [
  { id: 'home', label: 'HOME' },
  { id: 'work', label: 'MY WORK' },
  { id: 'about', label: 'ABOUT ME' },
  { id: 'contact', label: 'CONTACT' },
]

export default function EditorialShowcase({ projects, onSelectProject, onReturnToHero }) {
  const [hoveredId, setHoveredId] = useState(null)
  const [currentView, setCurrentView] = useState('work') // 'home' | 'work' | 'about' | 'contact'
  const [activeProject, setActiveProject] = useState(null)
  const [trackOffset, setTrackOffset] = useState(0)
  const [isExitingToHome, setIsExitingToHome] = useState(false)
  const homeTimerRef = useRef(null)
  const homeResetTimerRef = useRef(null)

  const [sectionStatus, setSectionStatus] = useState({
    work: 'active',
    about: 'idle',
    contact: 'idle',
  })

  const titleRefs = useRef({})
  const projectMap = new Map(projects.map((p) => [p.id, p]))

  // Dynamic rows calculated directly from each project's `row` definition
  const editorialRows = useMemo(() => getEditorialRows(projects), [projects])

  // Navigation indices for directional arrows
  const currentIndex = SECTIONS.findIndex((s) => s.id === currentView)
  const prevSection = currentIndex > 0 ? SECTIONS[currentIndex - 1] : null
  const nextSection = currentIndex < SECTIONS.length - 1 ? SECTIONS[currentIndex + 1] : null

  // Arrow key navigation between sections
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeProject) return
      if (e.key === 'ArrowLeft' && prevSection) {
        navigateTo(prevSection.id)
      } else if (e.key === 'ArrowRight' && nextSection) {
        navigateTo(nextSection.id)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevSection, nextSection, activeProject])

  // Measure and center the active section title precisely at 50vw
  const updateCenterPosition = useCallback(() => {
    const activeEl = titleRefs.current[currentView]
    if (activeEl) {
      const center = activeEl.offsetLeft + activeEl.offsetWidth / 2
      setTrackOffset(window.innerWidth / 2 - center)
    }
  }, [currentView])

  useLayoutEffect(() => {
    updateCenterPosition()
  }, [updateCenterPosition])

  useEffect(() => {
    window.addEventListener('resize', updateCenterPosition)
    if (document.fonts) {
      document.fonts.ready.then(updateCenterPosition)
    }
    return () => window.removeEventListener('resize', updateCenterPosition)
  }, [updateCenterPosition])

  useEffect(() => {
    return () => {
      if (homeTimerRef.current) clearTimeout(homeTimerRef.current)
      if (homeResetTimerRef.current) clearTimeout(homeResetTimerRef.current)
    }
  }, [])

  const navigateTo = (targetId) => {
    if (isExitingToHome) return

    if (targetId === 'home') {
      if (currentView === 'home') return

      const prevView = currentView
      setCurrentView('home')

      // Slide previous view out smoothly:
      // If coming from 'work', work exits to the right (since home is to the left)
      // If coming from 'about' or 'contact', they exit normally
      setSectionStatus({
        work: prevView === 'work' ? 'exiting-right' : 'idle',
        about: prevView === 'about' ? 'exiting' : 'idle',
        contact: prevView === 'contact' ? 'exiting' : 'idle',
      })

      // 1. Once HOME centers in the nav (~500ms),
      // header glides upwards while home view and background video fade in:
      if (homeTimerRef.current) clearTimeout(homeTimerRef.current)
      homeTimerRef.current = setTimeout(() => {
        setIsExitingToHome(true)
        if (onReturnToHero) onReturnToHero()
      }, 500)

      // 2. Once smoothly settled back on home hero screen, reset showcase state to work:
      if (homeResetTimerRef.current) clearTimeout(homeResetTimerRef.current)
      homeResetTimerRef.current = setTimeout(() => {
        setIsExitingToHome(false)
        setCurrentView('work')
        setSectionStatus({
          work: 'active',
          about: 'idle',
          contact: 'idle',
        })
      }, 1500)

      return
    }

    if (targetId === currentView) return

    const prevView = currentView
    setCurrentView(targetId)

    // Update section status for linear transition:
    // targetView becomes active, previous view exits to the left, others idle
    setSectionStatus((prev) => {
      const next = { ...prev }
      Object.keys(next).forEach((key) => {
        if (key === targetId) {
          next[key] = 'active'
        } else if (key === prevView) {
          next[key] = 'exiting'
        } else {
          next[key] = 'idle'
        }
      })
      return next
    })

    // After exit animation finishes (780ms), reposition previous section to idle on the right
    setTimeout(() => {
      setSectionStatus((prev) => ({
        ...prev,
        [prevView]: 'idle',
      }))
    }, 780)
  }

  const renderProjectItem = (id, keySuffix = '') => {
    const project = projectMap.get(id)
    if (!project) return null

    const config = project.stickerConfig || STICKER_CONFIGS[id] || {
      rotate: 0,
      hoverRotate: 0,
      width: '173px',
      overlap: '-14px',
    }

    const isHovered = hoveredId === id
    const currentRotate = isHovered ? config.hoverRotate : config.rotate
    const currentScale = isHovered ? 1.15 : 1
    const currentYOffset = isHovered ? -5 : 0

    return (
      <button
        key={`${project.id}-${keySuffix}`}
        type="button"
        className="editorial__item"
        id={`editorial-item-${project.id}${keySuffix ? '-' + keySuffix : ''}`}
        onClick={() => setActiveProject(project)}
        onMouseEnter={() => setHoveredId(project.id)}
        onMouseLeave={() => setHoveredId(null)}
        aria-label={`View project ${project.name}`}
      >
        {/* Project Title in Futura Light — all with the exact same font size */}
        <span className="editorial__title">
          {project.name}
        </span>

        {/* Sticker overlapping horizontally right next to the title */}
        <div
          className="editorial__sticker-box"
          style={{
            marginLeft: config.overlap,
            transform: `translateY(${currentYOffset}px) rotate(${currentRotate}deg) scale(${currentScale})`,
          }}
        >
          <img
            src={project.sticker}
            alt={project.name}
            className="editorial__sticker-img"
            style={{ width: config.width }}
            draggable={false}
          />
        </div>
      </button>
    )
  }

  return (
    <section className="editorial" id="editorial-showcase" aria-label="Project Portfolio">
      {/* 5 packed typography lines + Center Header spanning with 0 interlineado */}
      <div className={`editorial__canvas ${activeProject ? 'editorial__canvas--project-open' : ''} ${isExitingToHome ? 'editorial__canvas--exit-up' : ''}`}>
        {/* Row 0: Section Title Header with selected title ALWAYS centered, previous and next visible, no overlap, strictly non-looping */}
        <div className="editorial__line editorial__line--header">
          {/* Left Directional Arrow at the extreme over texts */}
          <button
            type="button"
            className={`editorial__nav-arrow editorial__nav-arrow--prev ${
              !prevSection || activeProject || isExitingToHome ? 'editorial__nav-arrow--hidden' : ''
            }`}
            onClick={() => prevSection && navigateTo(prevSection.id)}
            aria-label={prevSection ? `Go to ${prevSection.label}` : 'Previous section'}
            title={prevSection ? `Go to ${prevSection.label}` : ''}
            id="editorial-nav-prev"
            disabled={!prevSection || !!activeProject || isExitingToHome}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            className="editorial__header-track"
            style={{
              transform: `translate3d(${trackOffset}px, 0, 0)`,
            }}
          >
            {SECTIONS.map((section) => {
              const isActive = section.id === currentView
              return (
                <div
                  className="editorial__header-slot"
                  key={section.id}
                  ref={(el) => (titleRefs.current[section.id] = el)}
                >
                  <button
                    type="button"
                    className={`editorial__heading editorial__heading--${section.id} ${
                      isActive ? 'editorial__heading--active' : 'editorial__heading--inactive'
                    }`}
                    id={`editorial-heading-${section.id}`}
                    onClick={() => navigateTo(section.id)}
                    aria-label={`Go to ${section.label}`}
                  >
                    {section.label}
                  </button>
                </div>
              )
            })}
          </div>

          {/* Right Directional Arrow at the extreme over texts */}
          <button
            type="button"
            className={`editorial__nav-arrow editorial__nav-arrow--next ${
              !nextSection || activeProject || isExitingToHome ? 'editorial__nav-arrow--hidden' : ''
            }`}
            onClick={() => nextSection && navigateTo(nextSection.id)}
            aria-label={nextSection ? `Go to ${nextSection.label}` : 'Next section'}
            title={nextSection ? `Go to ${nextSection.label}` : ''}
            id="editorial-nav-next"
            disabled={!nextSection || !!activeProject || isExitingToHome}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Bio Section: Appears when ABOUT ME is active */}
        <div
          className={`editorial__bio editorial__bio--${sectionStatus.about}`}
          aria-hidden={currentView !== 'about'}
          id="editorial-bio-section"
        >
          <div className="editorial__bio-inner">
            <p className="editorial__bio-text">
              Hi, I’m Rodri, a <strong>Creative Director</strong> specializing in <strong>CGI</strong> and <strong>AI</strong>. With strong conceptual and creative skills, I’ve taken numerous projects from 0 to 100, balancing coordination and creation in equal measure.
            </p>
            <p className="editorial__bio-text">
              With a broad range of expertise, I co-directed the brand identity and narrative for <strong>Making Science</strong> for 5 years, in addition to collaborating on various content types for brands like <strong>Stradivarius</strong>, <strong>Santander</strong>, and <strong>Hertz</strong>.
            </p>
            <p className="editorial__bio-text">
              My specialty is concept and idea development, combined with a strong ability to design <strong>efficient workflows</strong>.
            </p>

            <div className="editorial__bio-actions">
              <button
                type="button"
                className="editorial__bio-back-btn"
                onClick={() => navigateTo('work')}
                id="bio-back-to-work-btn"
              >
                <span className="editorial__bio-back-arrow">←</span> VIEW PROJECTS
              </button>
            </div>
          </div>
        </div>

        {/* Contact Section: Appears when CONTACT is active */}
        <div
          className={`editorial__contact editorial__contact--${sectionStatus.contact}`}
          aria-hidden={currentView !== 'contact'}
          id="editorial-contact-section"
        >
          <div className="editorial__contact-inner">
            <p className="editorial__contact-intro">
              Let’s collaborate on your next vision. Available for creative direction, CGI consultancy, and AI-driven workflows.
            </p>

            <div className="editorial__contact-links">
              {/* Mail Link */}
              <a
                href="mailto:hola@rodrisanro.com"
                className="editorial__contact-item"
                id="contact-mail-link"
                aria-label="Send email to hola@rodrisanro.com"
              >
                <div className="editorial__contact-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="editorial__contact-text-box">
                  <span className="editorial__contact-label">EMAIL</span>
                  <span className="editorial__contact-value">hola@rodrisanro.com</span>
                </div>
                <span className="editorial__contact-arrow">↗</span>
              </a>

              {/* LinkedIn Link */}
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="editorial__contact-item"
                id="contact-linkedin-link"
                aria-label="Visit LinkedIn profile"
              >
                <div className="editorial__contact-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </div>
                <div className="editorial__contact-text-box">
                  <span className="editorial__contact-label">LINKEDIN</span>
                  <span className="editorial__contact-value">Rodrigo Santos</span>
                </div>
                <span className="editorial__contact-arrow">↗</span>
              </a>
            </div>

            <div className="editorial__contact-actions">
              <button
                type="button"
                className="editorial__bio-back-btn"
                onClick={() => navigateTo('work')}
                id="contact-back-to-work-btn"
              >
                <span className="editorial__bio-back-arrow">←</span> VIEW PROJECTS
              </button>
            </div>
          </div>
        </div>

        {/* Rows of projects in Futura Light with 0 interlineado, slowly drifting in loop */}
        {editorialRows.map((rowIds, rowIndex) => {
          const isEven = rowIndex % 2 === 1
          const directionClass = isEven ? 'editorial__line--drift-right' : 'editorial__line--drift-left'
          const statusClass = `editorial__line--${sectionStatus.work}`

          return (
            <div
              className={`editorial__line editorial__line--${rowIndex + 1} ${directionClass} ${statusClass}`}
              key={`row-${rowIndex}`}
              style={{ '--row-idx': rowIndex }}
            >
              <div className="editorial__track">
                {/* First set of projects */}
                <div className="editorial__track-group">
                  {rowIds.map((id) => renderProjectItem(id, 'set1'))}
                </div>
                {/* Second duplicated set for seamless infinite loop */}
                <div className="editorial__track-group" aria-hidden="true">
                  {rowIds.map((id) => renderProjectItem(id, 'set2'))}
                </div>
                {/* Third duplicated set for wide screens */}
                <div className="editorial__track-group" aria-hidden="true">
                  {rowIds.map((id) => renderProjectItem(id, 'set3'))}
                </div>
              </div>
            </div>
          )
        })}

        {/* Full-Page Project Detail View with video/media grid, description, and navigation */}
        {activeProject && (
          <ProjectDetail
            project={activeProject}
            projects={projects}
            onClose={() => setActiveProject(null)}
            onNavigateProject={setActiveProject}
          />
        )}
      </div>

      {/* Persistent Elegant Footer in Editorial Menus */}
      <footer className="editorial__footer" aria-label="Rodrigo Santos Creative Direction">
        <span className="editorial__footer-text">
          <span className="editorial__footer-name">RODRIGO SANTOS</span>
          <span className="editorial__footer-sep"> - </span>
          <span className="editorial__footer-sub">CREATIVE DIRECTION</span>
        </span>
      </footer>
    </section>
  )
}
