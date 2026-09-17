import { useState, useRef, useLayoutEffect, useEffect, useCallback, useMemo } from 'react'
import ProjectDetail from '../ProjectDetail/ProjectDetail.jsx'
import entityBack from '../../assets/entity_back.png'
import homeVideoMp4 from '../../assets/home.mp4'
import homeVideoWebm from '../../assets/home.webm'
import './EditorialShowcase.css'

// Stickers styled to overlap the typography directly, exactly like physical cutouts in the reference photo (scaled x1.2)
const STICKER_CONFIGS = {
  1: { rotate: -4, hoverRotate: -2, width: 'clamp(115px, 9.8vw, 194px)', overlap: '-14px' },  // Decoding Culture
  4: { rotate: 6, hoverRotate: 3, width: 'clamp(108px, 8.9vw, 180px)', overlap: '-12px' },    // 5W Summit
  3: { rotate: -4, hoverRotate: -2, width: 'clamp(115px, 9.8vw, 194px)', overlap: '-14px' },  // Christmas Tales
  6: { rotate: 5, hoverRotate: 2, width: 'clamp(122px, 10.1vw, 200px)', overlap: '-14px' },   // That's Noise
  7: { rotate: -4, hoverRotate: -2, width: 'clamp(115px, 9.5vw, 187px)', overlap: '-14px' },  // Helios Factory
  2: { rotate: 5, hoverRotate: 2, width: 'clamp(122px, 10.1vw, 202px)', overlap: '-14px' },   // Ameba Studios
  5: { rotate: -5, hoverRotate: -2, width: 'clamp(103px, 8.4vw, 166px)', overlap: '-12px' },   // The Desert
  8: { rotate: 6, hoverRotate: 3, width: 'clamp(98px, 7.9vw, 158px)', overlap: '-12px' },     // Equal Voice
  9: { rotate: -3, hoverRotate: 0, width: 'clamp(130px, 10.5vw, 205px)', overlap: '-14px' },   // Geo Sphere
  10: { rotate: 5, hoverRotate: 2, width: 'clamp(98px, 7.9vw, 158px)', overlap: '-12px' },    // Mach Club
  11: { rotate: 0, hoverRotate: 0, width: 'clamp(103px, 8.4vw, 170px)', overlap: '-12px' },   // Awake Sound
  12: { rotate: 6, hoverRotate: 3, width: 'clamp(98px, 7.9vw, 161px)', overlap: '-12px' },    // Hybrid Lab
  13: { rotate: -4, hoverRotate: -2, width: 'clamp(85px, 6.8vw, 136px)', overlap: '-12px' },  // Robot Christmas
  14: { rotate: -4, hoverRotate: -2, width: 'clamp(103px, 8.4vw, 166px)', overlap: '-12px' }, // Mazda Exclusive Days
}

// Fallback rows in case projects do not specify a row property
const EDITORIAL_ROWS = [
  [1, 4],       // Row 1: Decoding Culture · 5W Global Summit
  [3, 6, 14],   // Row 2: Christmas Chronicles · That's Noise · Mazda Exclusive Days
  [7, 2, 13],   // Row 3: Helios AI Factory · Ameba Studios · Robot Christmas
  [5, 8, 9],    // Row 4: The Desert · 8M Equal Voice · Geo Sphere
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

// Strictly non-looping sequence:
// HOME · MY WORK · ABOUT ME · CONTACT
const SECTIONS = [
  { id: 'home', label: 'HOME' },
  { id: 'work', label: 'MY WORK' },
  { id: 'about', label: 'ABOUT ME' },
  { id: 'contact', label: 'CONTACT' },
]

export default function EditorialShowcase({ projects, onSelectProject }) {
  const [hoveredId, setHoveredId] = useState(null)
  const [currentView, setCurrentView] = useState('home') // 'home' | 'work' | 'about' | 'contact'
  const [activeProject, setActiveProject] = useState(null)
  const [trackOffset, setTrackOffset] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const homeVideoRef = useRef(null)
  const titleRefs = useRef({})
  const projectMap = new Map(projects.map((p) => [p.id, p]))

  // Dynamic rows calculated directly from each project's `row` definition
  const editorialRows = useMemo(() => getEditorialRows(projects), [projects])

  // Navigation indices for directional arrows
  const currentIndex = SECTIONS.findIndex((s) => s.id === currentView)
  const prevSection = currentIndex > 0 ? SECTIONS[currentIndex - 1] : null
  const nextSection = currentIndex < SECTIONS.length - 1 ? SECTIONS[currentIndex + 1] : null

  // Pure spatial state: active at 0, past on the left (-120vw), future on the right (+120vw), depth for zoom from home
  const getSectionState = (sectionId) => {
    if (sectionId === 'home') {
      return currentView === 'home' ? 'active' : 'inactive'
    }
    if (sectionId === 'work' && currentView === 'home') {
      return 'depth'
    }
    const targetIdx = SECTIONS.findIndex((s) => s.id === sectionId)
    if (targetIdx === currentIndex) return 'active'
    if (targetIdx < currentIndex) return 'past'
    return 'future'
  }

  // Ensure home video plays automatically with audio muted
  useEffect(() => {
    const v = homeVideoRef.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.playsInline = true
    const p = v.play()
    if (p && p.catch) {
      p.catch(() => {
        const unlock = () => {
          v.play().catch(() => {})
          window.removeEventListener('click', unlock)
          window.removeEventListener('touchstart', unlock)
          window.removeEventListener('wheel', unlock)
        }
        window.addEventListener('click', unlock, { once: true })
        window.addEventListener('touchstart', unlock, { once: true })
        window.addEventListener('wheel', unlock, { once: true })
      })
    }
  }, [currentView])

  // Subtle mouse tilt for seated figure on home view
  const handleMouseMove = useCallback((e) => {
    if (currentView !== 'home') return
    const xRatio = (e.clientX / window.innerWidth) - 0.5
    const yRatio = (e.clientY / window.innerHeight) - 0.5
    setTilt({
      x: yRatio * -3,
      y: xRatio * 4,
    })
  }, [currentView])

  // Robust navigation lock to prevent multiple section skips from a single swipe/trackpad momentum
  const isNavigatingRef = useRef(false)
  const navigationLockTimerRef = useRef(null)
  const wheelActiveTimerRef = useRef(null)
  const minTimePassedRef = useRef(false)

  const navigateTo = useCallback((targetId) => {
    if (!targetId || targetId === currentView || isNavigatingRef.current) return
    isNavigatingRef.current = true
    minTimePassedRef.current = false
    setCurrentView(targetId)

    if (navigationLockTimerRef.current) clearTimeout(navigationLockTimerRef.current)
    navigationLockTimerRef.current = setTimeout(() => {
      minTimePassedRef.current = true
      // Only unlock if trackpad momentum stream has settled (no wheel events for 160ms)
      if (!wheelActiveTimerRef.current) {
        isNavigatingRef.current = false
      }
    }, 750)
  }, [currentView])

  useEffect(() => {
    return () => {
      if (navigationLockTimerRef.current) clearTimeout(navigationLockTimerRef.current)
      if (wheelActiveTimerRef.current) clearTimeout(wheelActiveTimerRef.current)
    }
  }, [])

  // Arrow key navigation between sections
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeProject || isNavigatingRef.current) return
      if (currentView === 'home') {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === ' ') {
          e.preventDefault()
          navigateTo('work')
        }
        return
      }
      if (e.key === 'ArrowLeft' && prevSection) {
        navigateTo(prevSection.id)
      } else if (e.key === 'ArrowRight' && nextSection) {
        navigateTo(nextSection.id)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevSection, nextSection, activeProject, currentView, navigateTo])

  // Swipe navigation between sections: Touch & Trackpad horizontal swipe
  const touchStartXRef = useRef(null)
  const touchStartYRef = useRef(null)
  const isHorizontalSwipeRef = useRef(false)

  const handleTouchStart = (e) => {
    if (activeProject) return
    touchStartXRef.current = e.touches[0].clientX
    touchStartYRef.current = e.touches[0].clientY
    isHorizontalSwipeRef.current = false
  }

  const handleTouchMove = (e) => {
    if (activeProject || touchStartXRef.current === null) return
    const dx = e.touches[0].clientX - touchStartXRef.current
    const dy = e.touches[0].clientY - touchStartYRef.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 12) {
      isHorizontalSwipeRef.current = true
    }
  }

  const handleTouchEnd = (e) => {
    if (activeProject || touchStartXRef.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartXRef.current
    const dy = e.changedTouches[0].clientY - touchStartYRef.current
    touchStartXRef.current = null
    touchStartYRef.current = null

    // Ignore touch swipe if already navigating
    if (isNavigatingRef.current) return

    // In HOME: lateral swipe is disabled; swipe up advances to MY WORK
    if (currentView === 'home') {
      if (dy < -25 && Math.abs(dy) > Math.abs(dx) * 0.8) {
        navigateTo('work')
      }
      return
    }

    // In MY WORK, ABOUT ME, CONTACT: lateral swipe enabled — strictly one by one
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx < 0 && nextSection) {
        navigateTo(nextSection.id)
      } else if (dx > 0 && prevSection) {
        navigateTo(prevSection.id)
      }
    } else if (Math.abs(dy) > 45 && Math.abs(dy) > Math.abs(dx) * 1.2) {
      if (currentView === 'work' && dy > 45) {
        navigateTo('home')
      }
    }

    if (isHorizontalSwipeRef.current) {
      setTimeout(() => {
        isHorizontalSwipeRef.current = false
      }, 120)
    }
  }

  // Wheel / trackpad swipe (strictly 1 section per gesture, debouncing mac momentum)
  const handleShowcaseWheel = useCallback((e) => {
    if (activeProject) return

    // Track active wheel momentum stream from trackpad
    if (wheelActiveTimerRef.current) clearTimeout(wheelActiveTimerRef.current)
    wheelActiveTimerRef.current = setTimeout(() => {
      wheelActiveTimerRef.current = null
      // Once momentum has completely stopped and animation time elapsed, unlock
      if (minTimePassedRef.current) {
        isNavigatingRef.current = false
      }
    }, 160)

    // Strictly ignore while animating or during residual momentum
    if (isNavigatingRef.current) return

    // In HOME: lateral displacement is NOT enabled, only scroll down / swipe up advances to MY WORK
    if (currentView === 'home') {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.5) {
        return // Ignore lateral swipe on HOME
      }
      if (Math.abs(e.deltaY) > 25) {
        navigateTo('work')
      }
      return
    }

    // In MY WORK, ABOUT ME, CONTACT: horizontal swipe strictly ONE-BY-ONE
    if (Math.abs(e.deltaX) > 40 && Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.3) {
      if (e.deltaX > 0 && nextSection) {
        navigateTo(nextSection.id)
      } else if (e.deltaX < 0 && prevSection) {
        navigateTo(prevSection.id)
      }
      return
    }

    // Vertical wheel: scrolling up in MY WORK returns to HOME
    if (Math.abs(e.deltaY) > 35 && Math.abs(e.deltaY) > Math.abs(e.deltaX) * 1.3) {
      if (currentView === 'work' && e.deltaY < 0) {
        navigateTo('home')
      }
    }
  }, [activeProject, nextSection, prevSection, currentView, navigateTo])

  useEffect(() => {
    window.addEventListener('wheel', handleShowcaseWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleShowcaseWheel)
  }, [handleShowcaseWheel])

  // Measure and center the active section title precisely at 50vw
  const updateCenterPosition = useCallback(() => {
    // When on HOME, keep header track aligned to 'work' so entering/leaving HOME has ZERO horizontal drift
    const targetSection = currentView === 'home' ? 'work' : currentView
    const activeEl = titleRefs.current[targetSection]
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
        onClick={() => {
          if (isHorizontalSwipeRef.current) return
          setActiveProject(project)
        }}
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
    <section
      className="editorial"
      id="editorial-showcase"
      aria-label="Project Portfolio"
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 5 packed typography lines + Center Header spanning with 0 interlineado */}
      <div
        className={`editorial__canvas ${activeProject ? 'editorial__canvas--project-open' : ''} ${
          currentView === 'home' ? 'editorial__canvas--home' : ''
        }`}
      >
        {/* Row 0: Section Title Header with selected title ALWAYS centered, previous and next visible, no overlap, strictly non-looping */}
        <div className="editorial__line editorial__line--header">
          {/* Left Directional Arrow: Elongated arrow placed above the titles at the extreme */}
          <button
            type="button"
            className={`editorial__nav-arrow editorial__nav-arrow--prev ${
              !prevSection || activeProject ? 'editorial__nav-arrow--hidden' : ''
            }`}
            onClick={() => prevSection && navigateTo(prevSection.id)}
            aria-label={prevSection ? `Go to ${prevSection.label}` : 'Previous section'}
            title={prevSection ? `Go to ${prevSection.label}` : ''}
            id="editorial-nav-prev"
            disabled={!prevSection || !!activeProject}
          >
            <svg width="52" height="18" viewBox="0 0 52 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M50 9H2M11 2L2 9l9 7" />
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

          {/* Right Directional Arrow: Elongated arrow placed above the titles at the extreme */}
          <button
            type="button"
            className={`editorial__nav-arrow editorial__nav-arrow--next ${
              !nextSection || activeProject ? 'editorial__nav-arrow--hidden' : ''
            }`}
            onClick={() => nextSection && navigateTo(nextSection.id)}
            aria-label={nextSection ? `Go to ${nextSection.label}` : 'Next section'}
            title={nextSection ? `Go to ${nextSection.label}` : ''}
            id="editorial-nav-next"
            disabled={!nextSection || !!activeProject}
          >
            <svg width="52" height="18" viewBox="0 0 52 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 9h48M41 2l9 7-9 7" />
            </svg>
          </button>
        </div>

        {/* Home Section: Appears when HOME is active */}
        <div
          className={`editorial__home editorial__home--${getSectionState('home')}`}
          aria-hidden={currentView !== 'home'}
          id="editorial-home-section"
        >
          {/* Background video of the eye */}
          <video
            ref={homeVideoRef}
            className="editorial__home-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src={homeVideoMp4} type="video/mp4" />
            <source src={homeVideoWebm} type="video/webm" />
          </video>

          {/* Hero Title & Subtitle */}
          <div className="editorial__home-title-wrap">
            <h1 className="editorial__home-name">RODRIGO SANTOS</h1>
            <p className="editorial__home-sub">CREATIVE DIRECTION</p>

            <button
              type="button"
              className="editorial__home-cta"
              onClick={() => navigateTo('work')}
              id="home-explore-work-btn"
              aria-label="Explore work"
            >
              <span className="editorial__home-cta-text">EXPLORE WORK</span>
              <span className="editorial__home-cta-arrow">→</span>
            </button>
          </div>

          {/* Seated Entity from behind with 3D parallax tilt */}
          <div
            className="editorial__home-entity"
            style={{
              transform: `translateX(-50%) translate3d(${tilt.y * -1.2}px, ${tilt.x * -1.0}px, 0)`,
            }}
          >
            <img
              src={entityBack}
              alt="Rodrigo Santos back view"
              className="editorial__home-entity-img"
              draggable={false}
            />
          </div>
        </div>

        {/* Bio Section: Appears when ABOUT ME is active */}
        <div
          className={`editorial__bio editorial__bio--${getSectionState('about')}`}
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
          className={`editorial__contact editorial__contact--${getSectionState('contact')}`}
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
                href="mailto:r.santosrobledo@gmail.com"
                className="editorial__contact-item"
                id="contact-mail-link"
                aria-label="Send email to r.santosrobledo@gmail.com"
              >
                <div className="editorial__contact-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="editorial__contact-text-box">
                  <span className="editorial__contact-label">EMAIL</span>
                  <span className="editorial__contact-value">r.santosrobledo@gmail.com</span>
                </div>
                <span className="editorial__contact-arrow">↗</span>
              </a>

              {/* LinkedIn Link */}
              <a
                href="https://www.linkedin.com/in/rodrigo-santos-robledo-90050b177/"
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

        {/* Unified 3D Work Stage for authentic camera Dolly In / Dolly Out and lateral panning */}
        <div className={`editorial__work-stage editorial__work-stage--${getSectionState('work')}`}>
          {editorialRows.map((rowIds, rowIndex) => {
            const isEven = rowIndex % 2 === 1
            const directionClass = isEven ? 'editorial__line--drift-right' : 'editorial__line--drift-left'

            return (
              <div
                className={`editorial__line editorial__line--${rowIndex + 1} ${directionClass}`}
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
        </div>

        {/* Full-Page Project Detail View with video/media grid, description, and navigation */}
        {activeProject && (
          <ProjectDetail
            key={activeProject.id}
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
