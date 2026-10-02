import React, { useState, useEffect, useRef, useCallback, useMemo, Fragment } from 'react'
import { createPortal } from 'react-dom'
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

function isYouTubeUrl(url) {
  if (!url || typeof url !== 'string') return false
  return url.includes('youtube.com') || url.includes('youtu.be')
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
  const [lightboxAsset, setLightboxAsset] = useState(null)
  const [activeMoodboardIdx, setActiveMoodboardIdx] = useState(null)
  const detailRef = useRef(null)

  // Reset custom states when project changes
  useEffect(() => {
    setLightboxAsset(null)
    setActiveMoodboardIdx(null)
    if (detailRef.current) {
      detailRef.current.scrollTop = 0
    }
  }, [project.id])

  // Lock background scroll on document.body and detail container when lightbox is open
  useEffect(() => {
    if (!lightboxAsset) return
    const prevBodyOverflow = document.body.style.overflow
    const prevDetailOverflow = detailRef.current ? detailRef.current.style.overflowY : ''

    document.body.style.overflow = 'hidden'
    if (detailRef.current) {
      detailRef.current.style.overflowY = 'hidden'
    }

    return () => {
      document.body.style.overflow = prevBodyOverflow || ''
      if (detailRef.current) {
        detailRef.current.style.overflowY = prevDetailOverflow || ''
      }
    }
  }, [lightboxAsset])

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

  const isCoverYouTube = isYouTubeUrl(project.videoEmbed)

  const brandAssetsList = useMemo(() => {
    const list = []

    // 1. Primary asset: whatever is featured in principal (videoEmbed or coverImage)
    const primarySrc = project.videoEmbed || project.coverImage
    if (primarySrc) {
      const isVideo = Boolean(project.videoEmbed)
      list.push({
        id: `${project.id}-primary-hero`,
        type: isVideo ? 'video' : 'image',
        title: isVideo ? `${project.name} · Hero Film` : `${project.name} · Official Logo / Main Asset`,
        src: primarySrc,
      })
    }

    // 2. All other brandAssets (or secondaryMedia), deduplicated by src
    const rawList = Array.isArray(project.brandAssets) && project.brandAssets.length > 0
      ? project.brandAssets
      : (Array.isArray(project.secondaryMedia) ? project.secondaryMedia : [])

    rawList.forEach((asset) => {
      const existingIdx = list.findIndex((it) => it.src === asset.src)
      if (existingIdx !== -1) {
        if (asset.title) list[existingIdx] = asset
      } else {
        list.push(asset)
      }
    })

    return list
  }, [project])

  const categoryParts = useMemo(() => {
    if (!project?.category) return []
    const cleaned = project.category.replace(/^Script\s*&\s*/i, '')
    return cleaned.split(/\s*[·•]\s*/).map((s) => s.trim()).filter(Boolean)
  }, [project?.category])

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

  // Keyboard navigation: Escape to go back (or close lightbox), Left/Right to change project
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightboxAsset) {
          setLightboxAsset(null)
          return
        }
        handleClose()
      } else if (e.key === 'ArrowRight' && !lightboxAsset) {
        goToNext()
      } else if (e.key === 'ArrowLeft' && !lightboxAsset) {
        goToPrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrev, handleClose, lightboxAsset])

  // Swipe gesture navigation:
  // - Horizontal swipe (left/right) changes project
  // - Vertical scrolling scrolls through project content freely without dismissing
  const touchStartXRef = useRef(null)
  const touchStartYRef = useRef(null)

  const handleTouchStart = (e) => {
    if (isClosing || lightboxAsset) return
    e.stopPropagation()
    const touch = e.touches[0]
    touchStartXRef.current = touch.clientX
    touchStartYRef.current = touch.clientY
  }

  const handleTouchMove = (e) => {
    e.stopPropagation()
  }

  const handleTouchEnd = (e) => {
    if (isClosing || lightboxAsset || touchStartXRef.current === null) return
    e.stopPropagation()

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
    if (isClosing || lightboxAsset) return
    e.stopPropagation()

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

        {/* Media Showcase: Always a single hero asset, prioritizing videos in all projects */}
        <section
          className="project-detail__media-showcase project-detail__media-showcase--full"
          aria-label="Project cover showcase"
        >
          <div className="project-detail__primary-media">
            {project.videoEmbed ? (
              <div className="project-detail__video-wrapper">
                {isCoverYouTube ? (
                  <iframe
                    key={project.videoEmbed}
                    src={formatYouTubeUrl(project.videoEmbed)}
                    title={project.name}
                    className="project-detail__video-iframe"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <video
                    key={project.videoEmbed}
                    src={project.videoEmbed}
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
                  key={project.coverImage || project.sticker}
                  src={project.coverImage || project.sticker}
                  alt={project.name}
                  className="project-detail__primary-image"
                />
              </div>
            )}
          </div>
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

        {/* Brand System & Identity: Logo, Color Palette, Web Viewer & All Uploaded Brand Assets */}
        {(project.colorPalette || project.logo || project.webPreview || brandAssetsList.length > 0) && (
          <section className="project-detail__brand-system" aria-label="Brand visual identity system">
            <div className="project-detail__brand-header">
              <span className="project-detail__brand-tag">IDENTITY & BRAND REPOSITORY</span>
              <h2 className="project-detail__brand-title">Brand Assets & System</h2>
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

            {/* All Uploaded Project Brand Assets Repository */}
            {brandAssetsList.length > 0 && (
              <div className="project-detail__brand-assets-section">
                <div className="project-detail__brand-assets-header">
                  <span className="project-detail__artifact-label">
                    PROJECT ASSETS REPOSITORY ({brandAssetsList.length})
                  </span>
                  <span className="project-detail__brand-assets-hint">
                    Click any asset to inspect in full resolution
                  </span>
                </div>
                <div className="project-detail__brand-assets-grid">
                  {brandAssetsList.map((asset, aIdx) => {
                    const isAssetVideo = asset.type === 'video'
                    const isAssetYT = isYouTubeUrl(asset.src)
                    return (
                      <div
                        key={asset.id || `asset-${aIdx}`}
                        className="project-detail__brand-asset-card"
                        onClick={() => setLightboxAsset(asset)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') setLightboxAsset(asset)
                        }}
                      >
                        <div className="project-detail__brand-asset-media-box">
                          {isAssetVideo ? (
                            isAssetYT ? (
                              <img
                                src={getYouTubeThumbnail(asset.src)}
                                alt={asset.title || 'Video Asset'}
                                className="project-detail__brand-asset-img"
                                loading="lazy"
                              />
                            ) : (
                              <video
                                src={typeof asset.src === 'string' && !asset.src.includes('#t=') ? `${asset.src}#t=0.001` : asset.src}
                                className="project-detail__brand-asset-video"
                                muted
                                playsInline
                                preload="metadata"
                              />
                            )
                          ) : (
                            <img
                              src={asset.src}
                              alt={asset.title || 'Brand Asset'}
                              className="project-detail__brand-asset-img"
                              loading="lazy"
                            />
                          )}
                          <div className="project-detail__brand-asset-overlay">
                            <span className="project-detail__brand-asset-badge">
                              {isAssetVideo ? 'VIDEO' : 'ASSET'}
                            </span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="project-detail__brand-asset-zoom-icon">
                              <circle cx="11" cy="11" r="8"/>
                              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                              <line x1="11" y1="8" x2="11" y2="14"/>
                              <line x1="8" y1="11" x2="14" y2="11"/>
                            </svg>
                          </div>
                        </div>
                        {asset.title && (
                          <div className="project-detail__brand-asset-footer">
                            <span className="project-detail__brand-asset-title">{asset.title}</span>
                          </div>
                        )}
                      </div>
                    )
                  })}
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

      {/* High-Resolution Lightbox Modal for Brand Assets rendered via Portal on body */}
      {lightboxAsset && typeof document !== 'undefined' && createPortal(
        <div
          className="project-detail__lightbox"
          onClick={() => setLightboxAsset(null)}
          onWheel={(e) => {
            e.stopPropagation()
          }}
          onTouchMove={(e) => {
            e.stopPropagation()
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="project-detail__lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="project-detail__lightbox-close"
              onClick={() => setLightboxAsset(null)}
              aria-label="Close asset preview"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="project-detail__lightbox-media-wrap">
              {lightboxAsset.type === 'video' ? (
                isYouTubeUrl(lightboxAsset.src) ? (
                  <iframe
                    src={formatYouTubeUrl(lightboxAsset.src)}
                    title={lightboxAsset.title || 'Video preview'}
                    className="project-detail__lightbox-iframe"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={lightboxAsset.src}
                    className="project-detail__lightbox-video"
                    controls
                    autoPlay
                    playsInline
                  />
                )
              ) : (
                <img
                  src={lightboxAsset.src}
                  alt={lightboxAsset.title || 'Brand Asset preview'}
                  className="project-detail__lightbox-img"
                />
              )}
            </div>
            {lightboxAsset.title && (
              <div className="project-detail__lightbox-bar">
                <span className="project-detail__lightbox-title">{lightboxAsset.title}</span>
                {typeof lightboxAsset.src === 'string' && !isYouTubeUrl(lightboxAsset.src) && (
                  <a
                    href={lightboxAsset.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-detail__lightbox-ext"
                  >
                    <span>OPEN ORIGINAL</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </article>
  )
}
