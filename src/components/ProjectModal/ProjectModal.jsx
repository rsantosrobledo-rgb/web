import { useEffect, useRef } from 'react'
import './ProjectModal.css'

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

export default function ProjectModal({ project, onClose }) {
  const overlayRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  if (!project) return null

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      id="project-modal-overlay"
    >
      <div className="modal" ref={modalRef} id="project-modal" role="dialog" aria-modal="true">
        <button className="modal__close" onClick={onClose} aria-label="Cerrar">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="modal__media-container">
          {project.videoEmbed ? (
            <div className="modal__video-wrapper">
              <iframe
                src={formatYouTubeUrl(project.videoEmbed)}
                title={project.name}
                className="modal__video-iframe"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="modal__sticker-preview">
              <img
                src={project.sticker}
                alt={project.name}
                className="modal__sticker-img"
              />
            </div>
          )}
        </div>

        <div className="modal__content">
          <div className="modal__header-meta">
            <span className="modal__category-badge">{project.category}</span>
            {project.year && <span className="modal__year-badge">{project.year}</span>}
          </div>
          <h2 className="modal__title">{project.name}</h2>
          {project.description && (
            <p className="modal__description">{project.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}
