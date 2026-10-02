import React, { useState, useEffect, useRef, useCallback, useMemo, Fragment } from 'react'
import './ProjectDetail.css'

function formatYouTubeUrl(url) {
  if (!url || typeof url !== 'string') return url
  if (!url.includes('youtube.com') && !url.includes('youtu.be')) return url
  try {
    const parsed = new URL(url)
    parsed.searchParams.set('autoplay', '1')
    parsed.searchParams.set('playsinline', '1')
    return parsed.toString()
  } catch {
    const sep = url.includes('?') ? '&' : '?'
    return `${url}${sep}autoplay=1&playsinline=1`
  }
}

function getYouTubeThumbnail(url) {
  if (!url || typeof url !== 'string') return ''
  const match = url.match(/(?:embed\/|v\/|vi\/|youtu\.be\/|watch\?v=)([\w-]{11})/)
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : ''
}

// Module-level persistent wheel lock state across ProjectDetail mounts / project transitions
let projectWheelLocked = false
let projectMinTimePassed = false
let projectWheelActive = false
let projectWheelTimer = null
let projectLockTimer = null

export default function ProjectDetail({
  project,
  projects,
  onClose,
  onNavigateProject,
}) {
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [activeMoodboardIdx, setActiveMoodboardIdx] = useState(null)
  const detailRef = useRef(null)

  // Reset custom selected media and moodboard state when project changes
  useEffect(() => {
    setSelectedMedia(null)
    setActiveMoodboardIdx(null)
    if (detailRef.current) {
      detailRef.current.scrollTop = 0
    }
  }, [project.id])

  const cycleMoodboardTop = useCallback(() => {
    const mb = project?.processComparison?.moodboard
    if (!Array.isArray(mb) || mb.length <= 1) return
    setActiveMoodboardIdx((prev) => {
      if (prev === null) return 0
      return (prev + 1) % mb.length
    })
  }, [project])

  if (!project) return null

  const currentIndex = projects.findIndex((p) => p.id === project.id)
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(currentIndex + 1) % projects.length]

  const goToNext = () => onNavigateProject(nextProject)
  const goToPrev = () => onNavigateProject(prevProject)

  // Full list of media pieces for this project (used by side pasadores)
  const allPieces = useMemo(() => {
    const secondary = Array.isArray(project.secondaryMedia) ? project.secondaryMedia : []
    if (project.videoEmbed) {
      return [
        { id: `${project.id}-primary-video`, type: 'video', src: project.videoEmbed, isPrimary: true },
        ...secondary,
      ]
    }
    if (secondary.length > 0) {
      return secondary
    }
    return [{ id: `${project.id}-sticker`, type: 'image', src: project.sticker, isPrimary: true }]
  }, [project.id, project.videoEmbed, project.secondaryMedia, project.sticker])

  const activePieceIndex = useMemo(() => {
    if (!selectedMedia) return 0
    const idx = allPieces.findIndex((p) => p.id === selectedMedia.id)
    return idx >= 0 ? idx : 0
  }, [allPieces, selectedMedia])

  const activePiece = allPieces[activePieceIndex] || allPieces[0]
  const activeMainType = activePiece ? activePiece.type : 'image'
  const activeMainSrc = activePiece ? activePiece.src : project.sticker
  const activePieceId = activePiece ? activePiece.id : null
  const isYouTube = typeof activeMainSrc === 'string' && (activeMainSrc.includes('youtube.com') || activeMainSrc.includes('youtu.be'))

  const hasMultiplePieces = allPieces.length > 1

  const categoryParts = useMemo(() => {
    if (!project?.category) return []
    const cleaned = project.category.replace(/^Script\s*&\s*/i, '')
    return cleaned.split(/\s*[·•]\s*/).map((s) => s.trim()).filter(Boolean)
  }, [project?.category])

  const goToNextPiece = useCallback((e) => {
    if (e) e.stopPropagation()
    if (allPieces.length <= 1) return
    const nextIdx = (activePieceIndex + 1) % allPieces.length
    setSelectedMedia(allPieces[nextIdx])
  }, [activePieceIndex, allPieces])

  const goToPrevPiece = useCallback((e) => {
    if (e) e.stopPropagation()
    if (allPieces.length <= 1) return
    const prevIdx = (activePieceIndex - 1 + allPieces.length) % allPieces.length
    setSelectedMedia(allPieces[prevIdx])
  }, [activePieceIndex, allPieces])

  const [isClosing, setIsClosing] = useState(false)

  const handleClose = useCallback(() => {
    if (isClosing) return
    setIsClosing(true)
    projectWheelLocked = false
    projectWheelActive = false
    if (projectWheelTimer) clearTimeout(projectWheelTimer)
    if (projectLockTimer) clearTimeout(projectLockTimer)
    setTimeout(() => {
      onClose()
    }, 350)
  }, [isClosing, onClose])

  // Keyboard navigation: Escape to go back, Left/Right to change project
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      } else if (e.key === 'ArrowLeft') {
        goToPrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrev, handleClose])

  // Swipe gesture navigation:
  // - Horizontal swipe (left/right) changes project
  // - Vertical scrolling scrolls through project content freely without dismissing
  const touchStartXRef = useRef(null)
  const touchStartYRef = useRef(null)

  const handleTouchStart = (e) => {
    e.stopPropagation()
    if (isClosing) return
    const touch = e.touches[0]
    touchStartXRef.current = touch.clientX
    touchStartYRef.current = touch.clientY
  }

  const handleTouchMove = (e) => {
    e.stopPropagation()
  }

  const handleTouchEnd = (e) => {
    e.stopPropagation()
    if (isClosing || touchStartXRef.current === null) return

    const touch = e.changedTouches[0]
    const dx = touch.clientX - touchStartXRef.current
    const dy = touch.clientY - touchStartYRef.current

    touchStartXRef.current = null
    touchStartYRef.current = null

    // Deslizado horizontal: cambiar de proyecto
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      if (dx < 0) {
        goToNext()
      } else {
        goToPrev()
      }
      return
    }
  }

  // Wheel / Trackpad handling for desktop horizontal swipe between projects
  const handleDetailWheel = (e) => {
    e.stopPropagation()
    if (isClosing) return

    // Track active wheel momentum stream from trackpad (requires 180ms quiet window to settle)
    if (projectWheelTimer) clearTimeout(projectWheelTimer)
    projectWheelActive = true
    projectWheelTimer = setTimeout(() => {
      projectWheelActive = false
      // Only unlock when trackpad momentum stream has settled and min lock time elapsed
      if (projectMinTimePassed) {
        projectWheelLocked = false
      }
    }, 180)

    // If currently locked during project transition or active residual momentum, ignore horizontal change
    if (projectWheelLocked) return

    // Trackpad horizontal swipe: change project (strictly 1 project per physical gesture)
    if (Math.abs(e.deltaX) > 45 && Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.4) {
      projectWheelLocked = true
      projectMinTimePassed = false

      if (projectLockTimer) clearTimeout(projectLockTimer)
      projectLockTimer = setTimeout(() => {
        projectMinTimePassed = true
        // Only unlock if trackpad momentum stream is completely quiet
        if (!projectWheelActive) {
          projectWheelLocked = false
        }
      }, 750)

      if (e.deltaX > 0) {
        goToNext()
      } else {
        goToPrev()
      }
    }
  }

  useEffect(() => {
    return () => {
      if (isClosing) {
        projectWheelLocked = false
        projectWheelActive = false
        if (projectWheelTimer) clearTimeout(projectWheelTimer)
        if (projectLockTimer) clearTimeout(projectLockTimer)
      }
    }
  }, [isClosing])

  // Secondary pieces grid calculation
  const secondaryPieces = Array.isArray(project.secondaryMedia) ? project.secondaryMedia : []
  const hasSecondaryPieces = secondaryPieces.length > 0

  // If there are more than 6 secondary pieces, show at most 6 slots with "more pieces" indicator on slot 6
  const MAX_GRID_SLOTS = 6
  const hasMoreThanMax = secondaryPieces.length > MAX_GRID_SLOTS
  const visibleGridPieces = hasMoreThanMax
    ? secondaryPieces.slice(0, MAX_GRID_SLOTS)
    : secondaryPieces
  const remainingCount = Math.max(0, secondaryPieces.length - (MAX_GRID_SLOTS - 1))
  const hasVideo = Boolean(
    project.videoEmbed ||
    (Array.isArray(project.secondaryMedia) && project.secondaryMedia.some((m) => m.type === 'video'))
  )

  return (
    <article
      className={`project-detail ${isClosing ? 'project-detail--closing' : ''}`}
      id="project-detail-view"
      ref={detailRef}
      aria-label={`Project details for ${project.name}`}
      onWheel={handleDetailWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar: Return to projects arrow button — ONLY way to go back */}
      <header className="project-detail__header">
        <button
          type="button"
          className="project-detail__back-btn"
          onClick={handleClose}
          id="project-detail-back-btn"
          aria-label="Back to projects"
        >
          <span className="project-detail__back-arrow">←</span>
          <span className="project-detail__back-label">BACK TO PROJECTS</span>
        </button>

        {/* Top Right: Next Project button */}
        <button
          type="button"
          className="project-detail__header-next-btn"
          onClick={goToNext}
          id="project-detail-header-next-btn"
          aria-label={`Next project: ${nextProject.name}`}
        >
          <span className="project-detail__header-next-content">
            <span className="project-detail__header-next-label">NEXT PROJECT</span>
            <span className="project-detail__header-next-name">{nextProject.name}</span>
          </span>
          <span className="project-detail__header-next-arrow">→</span>
        </button>
      </header>

      {/* Main Content Area */}
      <div className="project-detail__body">
        {/* Project Intro Banner: Meta, Title & Brief-to-Solution Storytelling */}
        <section className="project-detail__intro-section" aria-label="Project overview">
          <div className="project-detail__meta-bar">
            {categoryParts.map((part, index) => (
              <Fragment key={index}>
                {index > 0 && (
                  <span className="project-detail__meta-divider" aria-hidden="true" />
                )}
                <span className="project-detail__category-tag">{part}</span>
              </Fragment>
            ))}
            {hasVideo && (
              <>
                <span className="project-detail__meta-divider" aria-hidden="true" />
                <span className="project-detail__script-tag">SCRIPT CREATION</span>
              </>
            )}
          </div>

          <h1 className="project-detail__title">
            <span className="project-detail__title-text">{project.name}</span>
            {project.year && (
              <span className="project-detail__title-year">{project.year}</span>
            )}
          </h1>

          {/* 3-Part Storytelling Grid: The Dream / On Ground / The Harvest */}
          {project.story ? (
            <div className="project-detail__story-grid">
              <div className="project-detail__story-card">
                <div className="project-detail__story-header">
                  <span className="project-detail__story-num">1</span>
                  <span className="project-detail__story-label">THE DREAM</span>
                </div>
                <p className="project-detail__story-text">
                  {project.story.dream || project.story.challenge}
                </p>
              </div>

              <div className="project-detail__story-card">
                <div className="project-detail__story-header">
                  <span className="project-detail__story-num">2</span>
                  <span className="project-detail__story-label">ON GROUND</span>
                </div>
                <p className="project-detail__story-text">
                  {project.story.onGround || project.story.concept}
                </p>
              </div>

              <div className="project-detail__story-card">
                <div className="project-detail__story-header">
                  <span className="project-detail__story-num">3</span>
                  <span className="project-detail__story-label">THE HARVEST</span>
                </div>
                <p className="project-detail__story-text">
                  {project.story.harvest || project.story.impact}
                </p>
              </div>
            </div>
          ) : (
            <div className="project-detail__description-wrap">
              <p className="project-detail__description-text">
                {project.description}
              </p>
            </div>
          )}
        </section>

        {/* Media Showcase: Split if secondary pieces exist, otherwise full-width primary media */}
        <section
          className={`project-detail__media-showcase ${
            hasSecondaryPieces ? '' : 'project-detail__media-showcase--full'
          }`}
          aria-label="Project media showcase"
        >
          {/* Left / Center: Large Primary Piece with Pasadores */}
          <div className="project-detail__primary-media">
            {/* Pasador Izquierdo (Previous Piece) */}
            {hasMultiplePieces && (
              <button
                type="button"
                className="project-detail__pasador project-detail__pasador--prev"
                onClick={goToPrevPiece}
                aria-label="Previous piece"
                id="pasador-prev-piece"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
            )}

            {/* Media Display */}
            {activeMainType === 'video' ? (
              <div className="project-detail__video-wrapper">
                {isYouTube ? (
                  <iframe
                    key={activeMainSrc}
                    src={formatYouTubeUrl(activeMainSrc)}
                    title={project.name}
                    className="project-detail__video-iframe"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <video
                    key={activeMainSrc}
                    src={activeMainSrc}
                    title={project.name}
                    className="project-detail__video-element"
                    controls
                    playsInline
                    autoPlay
                  />
                )}
              </div>
            ) : (
              <div className="project-detail__image-wrapper">
                <img
                  key={activeMainSrc}
                  src={activeMainSrc}
                  alt={project.name}
                  className="project-detail__primary-image"
                />
              </div>
            )}

            {/* Pasador Derecho (Next Piece) */}
            {hasMultiplePieces && (
              <button
                type="button"
                className="project-detail__pasador project-detail__pasador--next"
                onClick={goToNextPiece}
                aria-label="Next piece"
                id="pasador-next-piece"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            )}
          </div>

          {/* Right: Grid of Secondary Pieces (at most 6 slots) */}
          {hasSecondaryPieces && (
            <aside className="project-detail__secondary-grid" aria-label="Secondary pieces">
              <div className="project-detail__grid-items">
                {visibleGridPieces.map((piece, idx) => {
                  const isLastSlotWithMore = hasMoreThanMax && idx === MAX_GRID_SLOTS - 1

                  // Selected state: if active piece is one of the extra pieces (index >= 5), highlight slot 6
                  const isSelected = isLastSlotWithMore
                    ? (activePieceId === piece.id || (!project.videoEmbed && activePieceIndex >= MAX_GRID_SLOTS - 1) || (project.videoEmbed && activePieceIndex >= MAX_GRID_SLOTS))
                    : activePieceId === piece.id

                  const isPieceYouTube = typeof piece.src === 'string' && (piece.src.includes('youtube.com') || piece.src.includes('youtu.be'))

                  const handleCardClick = () => {
                    if (isLastSlotWithMore && isSelected) {
                      // Cycle to next piece if already viewing extra pieces
                      const nextIdx = (activePieceIndex + 1) % allPieces.length
                      setSelectedMedia(allPieces[nextIdx])
                    } else {
                      setSelectedMedia(piece)
                    }
                  }

                  return (
                    <button
                      key={`${project.id}-piece-${idx}`}
                      type="button"
                      className={`project-detail__grid-card ${
                        isSelected ? 'project-detail__grid-card--selected' : ''
                      } ${isLastSlotWithMore ? 'project-detail__grid-card--more' : ''}`}
                      onClick={handleCardClick}
                      aria-label={isLastSlotWithMore ? `View more pieces (+${remainingCount})` : `View piece ${idx + 1}`}
                    >
                      <div className="project-detail__grid-img-box">
                        {piece.type === 'video' ? (
                          isPieceYouTube ? (
                            <img
                              src={getYouTubeThumbnail(piece.src)}
                              alt=""
                              className="project-detail__grid-img"
                              loading="lazy"
                            />
                          ) : (
                            <video
                              src={piece.src}
                              className="project-detail__grid-video"
                              muted
                              playsInline
                              preload="metadata"
                            />
                          )
                        ) : (
                          <img
                            src={piece.src}
                            alt=""
                            className="project-detail__grid-img"
                            loading="lazy"
                          />
                        )}

                        {isLastSlotWithMore && (
                          <div className="project-detail__more-overlay">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="project-detail__more-icon">
                              <rect width="13" height="13" x="8" y="8" rx="2" />
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                            <span className="project-detail__more-badge">+{remainingCount}</span>
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </aside>
          )}
        </section>

        {/* Editorial Narrative / Background Story (Debajo de las piezas) */}
        {project.editorialNarrative && (
          <section className="project-detail__narrative-section" aria-label="Project story and context">
            <div className="project-detail__narrative-header">
              <span className="project-detail__narrative-tag">INSIGHT & CONTEXT</span>
              <h2 className="project-detail__narrative-title">Behind the Piece</h2>
            </div>
            <div className="project-detail__narrative-content">
              {(Array.isArray(project.editorialNarrative)
                ? project.editorialNarrative
                : project.editorialNarrative.split('\n\n')
              ).map((paragraph, pIdx) => (
                <p key={pIdx} className="project-detail__narrative-para">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Brand System & Identity: Logo, Color Palette & Live Web Viewer */}
        {(project.colorPalette || project.logo || project.webPreview) && (
          <section className="project-detail__brand-system" aria-label="Brand visual identity system">
            <div className="project-detail__brand-header">
              <span className="project-detail__brand-tag">IDENTITY & DESIGN SYSTEM</span>
              <h2 className="project-detail__brand-title">Brand Assets & Palette</h2>
            </div>

            {/* Brand Artifacts Row: Logo Badge & Color Swatches */}
            {(project.logo || project.colorPalette) && (
              <div className="project-detail__artifacts-row">
                {/* Official Brand Logomark */}
                {project.logo && (
                  <div className="project-detail__logo-card">
                    <span className="project-detail__artifact-label">BRAND LOGOMARK</span>
                    <div className="project-detail__logo-box">
                      <img
                        src={project.logo}
                        alt={`${project.name} Logo`}
                        className="project-detail__logo-img"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}

                {/* Curated Color Palette */}
                {Array.isArray(project.colorPalette) && project.colorPalette.length > 0 && (
                  <div className="project-detail__palette-card">
                    <span className="project-detail__artifact-label">CURATED COLOR PALETTE</span>
                    <div className="project-detail__palette-swatches">
                      {project.colorPalette.map((color, cIdx) => (
                        <div key={cIdx} className="project-detail__swatch-item" title={`${color.name}: ${color.hex}`}>
                          <div
                            className="project-detail__swatch-circle"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div className="project-detail__swatch-meta">
                            <span className="project-detail__swatch-name">{color.name}</span>
                            <span className="project-detail__swatch-hex">{color.hex}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Live Interactive Web Viewer / Browser Mockup */}
            {project.webPreview && (
              <div className="project-detail__web-viewer-container">
                <div className="project-detail__browser-chrome">
                  <div className="project-detail__browser-controls">
                    <span className="project-detail__browser-dot project-detail__browser-dot--red" />
                    <span className="project-detail__browser-dot project-detail__browser-dot--yellow" />
                    <span className="project-detail__browser-dot project-detail__browser-dot--green" />
                  </div>
                  <div className="project-detail__browser-url-bar">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="project-detail__browser-lock">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span className="project-detail__browser-url-text">
                      {project.webPreview.url.replace(/^https?:\/\//, '')}
                    </span>
                  </div>
                  <a
                    href={project.webPreview.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-detail__browser-visit-btn"
                    title="Open live website in new tab"
                    aria-label={`Open ${project.webPreview.url} in new tab`}
                  >
                    <span>VISIT SITE</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>

                <div className="project-detail__browser-screen">
                  <iframe
                    src={project.webPreview.url}
                    title={`${project.name} Live Web Experience`}
                    className="project-detail__browser-iframe"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                  />
                </div>
              </div>
            )}
          </section>
        )}

        {/* Process & Craft: Before vs After (Concept Study → Final Render) */}
        {project.processComparison && (
          <section className="project-detail__process-section" aria-label="Process and craft comparison">
            <div className="project-detail__process-header">
              <span className="project-detail__process-tag">PROCESS & CRAFT</span>
              <h2 className="project-detail__process-title">Concept Exploration to Final Execution</h2>
            </div>
            <div className="project-detail__process-grid">
              {/* Left Card: Moodboard & Inspiration (Amontonadas) */}
              <div className="project-detail__process-card project-detail__process-card--before">
                <div className="project-detail__process-badge">
                  <span className="project-detail__process-dot" />
                  {project.processComparison.beforeLabel || 'Inspiration & Concept Moodboard'}
                </div>

                {Array.isArray(project.processComparison.moodboard) && project.processComparison.moodboard.length > 0 ? (
                  <div
                    className="project-detail__moodboard-pile"
                    onClick={cycleMoodboardTop}
                    title="Click to shuffle references"
                    role="region"
                    aria-label="Stacked moodboard references"
                  >
                    {project.processComparison.moodboard.map((imgSrc, imgIdx) => {
                      const total = project.processComparison.moodboard.length
                      const isTop = activeMoodboardIdx !== null ? activeMoodboardIdx === imgIdx : imgIdx === total - 1
                      return (
                        <div
                          key={`mb-${imgIdx}`}
                          className={`project-detail__moodboard-item project-detail__moodboard-item--${imgIdx} ${
                            isTop ? 'project-detail__moodboard-item--top' : ''
                          }`}
                          style={{
                            '--item-index': imgIdx,
                            '--total-items': total,
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveMoodboardIdx(imgIdx)
                          }}
                        >
                          <img
                            src={imgSrc}
                            alt={`Moodboard reference ${imgIdx + 1}`}
                            className="project-detail__moodboard-img"
                            loading="lazy"
                          />
                        </div>
                      )
                    })}
                    <div className="project-detail__moodboard-hint">
                      <span className="project-detail__moodboard-hint-icon">✦</span>
                      <span>INSPIRATION MOODBOARD</span>
                    </div>
                  </div>
                ) : (
                  <div className="project-detail__process-img-wrap">
                    <img
                      src={project.processComparison.before}
                      alt={project.processComparison.beforeLabel}
                      className="project-detail__process-img"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              {/* Right Card: Final Execution Render or Video */}
              <div className="project-detail__process-card project-detail__process-card--after">
                <div className="project-detail__process-badge project-detail__process-badge--final">
                  <span className="project-detail__process-dot project-detail__process-dot--final" />
                  {project.processComparison.afterLabel || 'Final Key Visual / Execution'}
                </div>
                <div className="project-detail__process-img-wrap">
                  {project.processComparison.afterType === 'video' ? (
                    <video
                      src={project.processComparison.after}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="project-detail__process-img"
                    />
                  ) : (
                    <img
                      src={project.processComparison.after}
                      alt={project.processComparison.afterLabel}
                      className="project-detail__process-img"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Bottom Navigation: Arrows to flip through projects */}
      <footer className="project-detail__footer-nav" aria-label="Project navigation">
        <button
          type="button"
          className="project-detail__nav-btn project-detail__nav-btn--prev"
          onClick={goToPrev}
          id="project-prev-btn"
          aria-label={`Go to previous project: ${prevProject.name}`}
        >
          <span className="project-detail__nav-arrow">←</span>
          <span className="project-detail__nav-text">
            <span className="project-detail__nav-sub">PREVIOUS</span>
            <span className="project-detail__nav-name">{prevProject.name}</span>
          </span>
        </button>

        <button
          type="button"
          className="project-detail__nav-btn project-detail__nav-btn--next"
          onClick={goToNext}
          id="project-next-btn"
          aria-label={`Go to next project: ${nextProject.name}`}
        >
          <span className="project-detail__nav-text project-detail__nav-text--right">
            <span className="project-detail__nav-sub">NEXT</span>
            <span className="project-detail__nav-name">{nextProject.name}</span>
          </span>
          <span className="project-detail__nav-arrow">→</span>
        </button>
      </footer>
    </article>
  )
}
