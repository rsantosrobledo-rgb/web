import { useState } from 'react'
import './Nav.css'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className="nav" id="main-nav">
        <button
          className="nav__button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menú"
          id="nav-toggle"
        >
          <span className="nav__button-text">Info</span>
          <span className={`nav__button-icon ${isOpen ? 'nav__button-icon--open' : ''}`}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3.5 5.5L7 9L10.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
      </nav>

      {isOpen && (
        <div className="info-panel" id="info-panel">
          <div className="info-panel__card">
            <h2 className="info-panel__title">Sobre mí</h2>
            <p className="info-panel__text">
              Creador audiovisual y diseñador con base en España.
              Especializado en dirección de arte, videoclips, spots publicitarios
              y branding visual.
            </p>

            <div className="info-panel__divider" />

            <h3 className="info-panel__subtitle">Contacto</h3>
            <div className="info-panel__links">
              <a href="mailto:hola@rodrisanro.com" className="info-panel__link" id="contact-email">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="3.5" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M2 5.5L8 9L14 5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                hola@rodrisanro.com
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="info-panel__link" id="contact-instagram">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.3"/>
                  <circle cx="8" cy="8" r="2.8" stroke="currentColor" strokeWidth="1.3"/>
                  <circle cx="11.5" cy="4.5" r="0.8" fill="currentColor"/>
                </svg>
                Instagram
              </a>
              <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" className="info-panel__link" id="contact-vimeo">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 6.5C3 6.5 3.5 9.5 5.5 9.5C7.5 9.5 8 5 9.5 5C11 5 11 7 11 7C11 7 11.5 4 13 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                Vimeo
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
