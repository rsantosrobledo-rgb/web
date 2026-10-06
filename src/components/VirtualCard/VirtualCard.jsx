import React from 'react'
import './VirtualCard.css'

export default function VirtualCard() {
  const handleSaveContact = (e) => {
    e.preventDefault()
    // Trigger download of the vCard file
    const vcardContent = `BEGIN:VCARD
VERSION:3.0
N:Santos;Rodrigo;;;
FN:Rodrigo Santos
TITLE:Dirección creativa
ORG:Rodrigo Santos
TEL;TYPE=CELL,VOICE:+34649185386
EMAIL;TYPE=INTERNET,PREF:r.santosrobledo@gmail.com
URL:https://rodrigosantos.es
ADR;TYPE=WORK:;;;Madrid;;;Spain
NOTE:Dirección creativa enfocada en branding, web y contenido con calidad de agencia.
END:VCARD`

    try {
      const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'Rodrigo_Santos.vcf')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch {
      // Fallback direct navigation
      window.location.href = '/rodrigo-santos.vcf'
    }
  }

  return (
    <div className="vcard-page" id="vcard-page">
      <main className="vcard-container" id="vcard-container">
        {/* Header Section */}
        <header className="vcard-header">
          <div className="vcard-brand">
            <h1 className="vcard-name">
              <span>rodrigo</span>
              <span>santos</span>
            </h1>
            <h2 className="vcard-role">Dirección creativa</h2>
            <p className="vcard-tags">Branding • Web • Piezas visuales</p>
          </div>
          <hr className="vcard-divider" />
        </header>

        {/* Content Body */}
        <div className="vcard-body">
          {/* Section: sobre mí */}
          <section className="vcard-section vcard-section--about">
            <h3 className="vcard-section__title">sobre mí</h3>
            <p className="vcard-section__text">
              Dirección creativa enfocada en branding, web y contenido con calidad de agencia.
            </p>
          </section>

          {/* Section: servicios */}
          <section className="vcard-section vcard-section--services">
            <h3 className="vcard-section__title">servicios</h3>
            <div className="vcard-services-list">
              <div className="vcard-service-row">
                <span className="vcard-service-name">Branding</span>
                <span className="vcard-service-desc">Identidad y rebranding</span>
              </div>
              <div className="vcard-service-row">
                <span className="vcard-service-name">Web</span>
                <span className="vcard-service-desc">Diseño y desarrollo</span>
              </div>
              <div className="vcard-service-row">
                <span className="vcard-service-name">Contenido</span>
                <span className="vcard-service-desc">Piezas visuales para campañas</span>
              </div>
            </div>
          </section>

          {/* Section: trabajos */}
          <section className="vcard-section vcard-section--work">
            <h3 className="vcard-section__title">trabajos</h3>
            <a
              href="/"
              className="vcard-work-card"
              id="vcard-work-link"
              aria-label="Ver proyectos en rodrigosantos.es"
            >
              <div className="vcard-work-card__top">VER PROYECTOS</div>
              <div className="vcard-work-card__main">
                <span className="vcard-work-card__domain">rodrigosantos.es</span>
                <svg
                  className="vcard-work-card__arrow"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </a>
            <p className="vcard-work-credits">
              Mazda España • Ameba Studios • Cannes Lions 2026
            </p>
          </section>
        </div>

        {/* Action Buttons */}
        <section className="vcard-actions" aria-label="Acciones de contacto">
          <button
            type="button"
            className="vcard-btn vcard-btn--primary"
            onClick={handleSaveContact}
            id="vcard-btn-save"
          >
            GUARDAR CONTACTO
          </button>

          <div className="vcard-btn-group">
            <a
              href="https://wa.me/34649185386?text=Hola%20Rodrigo"
              target="_blank"
              rel="noopener noreferrer"
              className="vcard-btn vcard-btn--secondary"
              id="vcard-btn-whatsapp"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            <a
              href="mailto:r.santosrobledo@gmail.com"
              className="vcard-btn vcard-btn--secondary"
              id="vcard-btn-email"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="16" x="2" y="4" rx="1.5" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>Email</span>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="vcard-footer">
          <hr className="vcard-footer-divider" />
          <div className="vcard-footer-content">
            <span className="vcard-footer-author">RODRIGO SANTOS — DIRECCIÓN CREATIVA</span>
            <span className="vcard-footer-location">MADRID</span>
          </div>
        </footer>
      </main>
    </div>
  )
}
