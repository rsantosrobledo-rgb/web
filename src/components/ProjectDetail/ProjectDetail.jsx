import { useState, useEffect, useRef, useCallback } from 'react'
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

export default function ProjectDetail({
  project,
  projects,
  onClose,
  onNavigateProject,
}) {
  const [selectedMedia, setSelectedMedia] = useState(null)
  const detailRef = useRef(null)
  const wheelUpAccumulator = useRef(0)
  const wheelUpTimeout = useRef(null)
  const touchStartY = useRef(null)
  const hasClosedRef = useRef(false)

  const safeClose = useCallback(() => {
    if (hasClosedRef.current) return
    hasClosedRef.current = true
    onClose()
  }, [onClose])

  // Reset custom selected media when project changes
  useEffect(() => {
    setSelectedMedia(null)
    hasClosedRef.current = false
    if (detailRef.current) {
      detailRef.current.scrollTop = 0
    }
  }, [project.id])

  // Scroll up detection: scrolling up while at top returns to MY WORK, NOT to home
  useEffect(() => {
    const el = detailRef.current
    if (!el) return

    const handleWheel = (e) => {
      // Always stop propagation so wheel events inside a project detail NEVER leak to StickerBoard (which would return to home)
      e.stopPropagation()

      // If user is at the top of the project detail and scrolls up:
      if (el.scrollTop <= 2 && e.deltaY < 0) {
        wheelUpAccumulator.current += Math.abs(e.deltaY)
        if (wheelUpTimeout.current) clearTimeout(wheelUpTimeout.current)
        wheelUpTimeout.current = setTimeout(() => {
          wheelUpAccumulator.current = 0
        }, 220)

        // Threshold reached: return to MY WORK!
        if (wheelUpAccumulator.current > 20 || e.deltaY < -15) {
          wheelUpAccumulator.current = 0
          safeClose()
        }
      } else {
        wheelUpAccumulator.current = 0
      }
    }

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      e.stopPropagation()
      if (touchStartY.current === null) return
      const deltaY = touchStartY.current - e.touches[0].clientY

      // If user is at top of project detail and pulls down / scrolls up:
      if (el.scrollTop <= 2 && deltaY < -30) {
        touchStartY.current = null
        safeClose()
      }
    }

    const handleTouchEnd = () => {
      touchStartY.current = null
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      if (wheelUpTimeout.current) clearTimeout(wheelUpTimeout.current)
    }
  }, [safeClose, project.id])

  // Keyboard navigation: Escape to go back, Left/Right for prev/next
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        safeClose()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      } else if (e.key === 'ArrowLeft') {
        goToPrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [project.id, projects, safeClose])

  if (!project) return null

  const currentIndex = projects.findIndex((p) => p.id === project.id)
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(currentIndex + 1) % projects.length]

  const goToNext = () => onNavigateProject(nextProject)
  const goToPrev = () => onNavigateProject(prevProject)

  // Determine secondary pieces — only show if explicitly provided in project data
  const secondaryPieces = Array.isArray(project.secondaryMedia) ? project.secondaryMedia : []
  const hasSecondaryPieces = secondaryPieces.length > 0
  const firstSecondaryPiece = secondaryPieces.length > 0 ? secondaryPieces[0] : null

  const hasVideo = Boolean(project.videoEmbed)

  const defaultMediaSrc = hasVideo ? project.videoEmbed : (firstSecondaryPiece ? firstSecondaryPiece.src : project.sticker)
  const defaultMediaType = hasVideo ? 'video' : (firstSecondaryPiece ? firstSecondaryPiece.type : 'image')

  const activeMainType = selectedMedia ? selectedMedia.type : defaultMediaType
  const activeMainSrc = selectedMedia ? selectedMedia.src : defaultMediaSrc

  const activePieceId = selectedMedia ? selectedMedia.id : (!hasVideo && firstSecondaryPiece ? firstSecondaryPiece.id : null)

  const isYouTube = typeof activeMainSrc === 'string' && (activeMainSrc.includes('youtube.com') || activeMainSrc.includes('youtu.be'))

  return (
    <article
      className="project-detail"
      id="project-detail-view"
      ref={detailRef}
      aria-label={`Project details for ${project.name}`}
    >
      {/* Top Bar: Return to projects arrow button */}
      <header className="project-detail__header">
        <button
          type="button"
          className="project-detail__back-btn"
          onClick={onClose}
          id="project-detail-back-btn"
          aria-label="Back to projects"
        >
          <span className="project-detail__back-arrow">←</span>
          <span className="project-detail__back-label">BACK TO PROJECTS</span>
        </button>

        <div className="project-detail__header-index">
          <span className="project-detail__index-current">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <span className="project-detail__index-sep">/</span>
          <span className="project-detail__index-total">
            {String(projects.length).padStart(2, '0')}
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="project-detail__body">
        {/* Media Showcase: Split if secondary pieces exist, otherwise full-width primary media */}
        <section
          className={`project-detail__media-showcase ${
            hasSecondaryPieces ? '' : 'project-detail__media-showcase--full'
          }`}
          aria-label="Project media showcase"
        >
          {/* Left / Center: Large Primary Piece (Video prioritized) */}
          <div className="project-detail__primary-media">
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
          </div>

          {/* Right: Grid of Secondary Pieces (only if present, no names/labels) */}
          {hasSecondaryPieces && (
            <aside className="project-detail__secondary-grid" aria-label="Secondary pieces">
              <div className="project-detail__grid-items">
                {secondaryPieces.map((piece, idx) => {
                  const isSelected = activePieceId === piece.id
                  const isPieceYouTube = typeof piece.src === 'string' && (piece.src.includes('youtube.com') || piece.src.includes('youtu.be'))
                  return (
                    <button
                      key={`${project.id}-piece-${idx}`}
                      type="button"
                      className={`project-detail__grid-card ${
                        isSelected ? 'project-detail__grid-card--selected' : ''
                      }`}
                      onClick={() => setSelectedMedia(piece)}
                      aria-label={`View piece ${idx + 1}`}
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
                      </div>
                    </button>
                  )
                })}
              </div>
            </aside>
          )}
        </section>

        {/* Project Explanation Underneath */}
        <section className="project-detail__info-section" aria-label="Project information">
          <div className="project-detail__meta-bar">
            <span className="project-detail__category-tag">{project.category}</span>
            {project.year && (
              <span className="project-detail__year-tag">{project.year}</span>
            )}
          </div>

          <h1 className="project-detail__title">{project.name}</h1>

          <div className="project-detail__description-wrap">
            <p className="project-detail__description-text">
              {project.description}
            </p>
          </div>
        </section>
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
