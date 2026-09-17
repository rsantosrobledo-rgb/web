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
  // - Vertical swipe UP closes project (at bottom, header, footer, or if content fits)
  // - Vertical pull DOWN at top also closes project
  const touchStartXRef = useRef(null)
  const touchStartYRef = useRef(null)
  const initialScrollTopRef = useRef(0)
  const isAtBottomAtStartRef = useRef(false)
  const touchTargetTypeRef = useRef('body')

  const handleTouchStart = (e) => {
    e.stopPropagation()
    if (isClosing) return
    const touch = e.touches[0]
    touchStartXRef.current = touch.clientX
    touchStartYRef.current = touch.clientY

    if (detailRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = detailRef.current
      initialScrollTopRef.current = scrollTop
      isAtBottomAtStartRef.current = scrollTop + clientHeight >= scrollHeight - 35
    } else {
      initialScrollTopRef.current = 0
      isAtBottomAtStartRef.current = true
    }

    if (e.target.closest('.project-detail__header')) {
      touchTargetTypeRef.current = 'header'
    } else if (e.target.closest('.project-detail__footer-nav')) {
      touchTargetTypeRef.current = 'footer'
    } else if (touch.clientY > window.innerHeight * 0.75) {
      touchTargetTypeRef.current = 'bottom-edge'
    } else {
      touchTargetTypeRef.current = 'body'
    }
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

    // 1. Deslizado horizontal: cambiar de proyecto
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      if (dx < 0) {
        goToNext()
      } else {
        goToPrev()
      }
      return
    }

    // 2. Deslizado hacia ARRIBA: volver hacia atrás
    if (dy < -50 && Math.abs(dy) > Math.abs(dx) * 1.2) {
      let isScrollable = false
      let isAtBottomNow = false
      if (detailRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = detailRef.current
        isScrollable = scrollHeight > clientHeight + 25
        isAtBottomNow = scrollTop + clientHeight >= scrollHeight - 35
      }

      const shouldClose =
        !isScrollable ||
        isAtBottomAtStartRef.current ||
        isAtBottomNow ||
        touchTargetTypeRef.current === 'header' ||
        touchTargetTypeRef.current === 'footer' ||
        touchTargetTypeRef.current === 'bottom-edge'

      if (shouldClose) {
        handleClose()
        return
      }
    }

    // 3. Deslizado hacia ABAJO al inicio de la página: también permite volver atrás
    if (dy > 70 && Math.abs(dy) > Math.abs(dx) * 1.2 && initialScrollTopRef.current <= 5) {
      handleClose()
      return
    }
  }

  // Wheel / Trackpad handling for desktop horizontal swipe and scroll-past-bottom
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

    // Vertical wheel past bottom: dismiss
    if (detailRef.current && e.deltaY > 60 && Math.abs(e.deltaY) > Math.abs(e.deltaX) * 1.4) {
      const { scrollTop, scrollHeight, clientHeight } = detailRef.current
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        if (!projectWheelLocked) {
          projectWheelLocked = true
          setTimeout(() => { projectWheelLocked = false }, 600)
          handleClose()
        }
      }
      return
    }

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
