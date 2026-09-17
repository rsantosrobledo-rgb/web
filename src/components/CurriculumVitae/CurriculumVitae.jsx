import { useEffect } from 'react'
import './CurriculumVitae.css'

export default function CurriculumVitae({ onBack }) {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)
  }, [])

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="cv-view" id="cv-view">
      {/* Floating Toolbar (Screen only, hidden on print) */}
      <header className="cv-toolbar" aria-label="CV controls">
        <button
          type="button"
          className="cv-toolbar__btn cv-toolbar__btn--back"
          onClick={onBack}
          id="cv-btn-back"
          aria-label="Back to portfolio"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Volver a la Web</span>
        </button>

        <div className="cv-toolbar__actions">
          <a
            href="/rodrigo_santos_cv.pdf"
            download="rodrigo_santos_cv.pdf"
            className="cv-toolbar__btn cv-toolbar__btn--download"
            id="cv-btn-download"
            aria-label="Download PDF directly"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Descargar PDF</span>
          </a>

          <button
            type="button"
            className="cv-toolbar__btn cv-toolbar__btn--print"
            onClick={handlePrint}
            id="cv-btn-print"
            aria-label="Print or save as PDF"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect width="12" height="8" x="6" y="14" rx="1" />
            </svg>
            <span>Imprimir</span>
          </button>
        </div>
      </header>

      {/* A4 Printable Sheet */}
      <main className="cv-sheet" id="cv-sheet">
        {/* Header: Name, Title & Contact Info */}
        <header className="cv-header">
          <div className="cv-header__main">
            <h1 className="cv-header__name">
              <span>rodrigo</span>
              <span>santos</span>
            </h1>
            <p className="cv-header__role">Video Editor and Creative Coordinator</p>
            <p className="cv-header__tagline">Creative Direction · CGI · AI Workflows</p>
          </div>

          <aside className="cv-header__contact" aria-label="Contact Information">
            <div className="cv-contact-item">
              <span className="cv-contact-item__text">+34 649 185 386</span>
              <svg className="cv-contact-item__icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>

            <div className="cv-contact-item">
              <a href="https://rodrisanro.com" target="_blank" rel="noopener noreferrer" className="cv-contact-item__link">
                rodrisanro.com
              </a>
              <svg className="cv-contact-item__icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
              </svg>
            </div>

            <div className="cv-contact-item">
              <span className="cv-contact-item__text">Madrid, Spain</span>
              <svg className="cv-contact-item__icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>

            <div className="cv-contact-item">
              <a href="mailto:r.santosrobledo@gmail.com" className="cv-contact-item__link">
                r.santosrobledo@gmail.com
              </a>
              <svg className="cv-contact-item__icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
          </aside>
        </header>

        {/* Timeline Content */}
        <div className="cv-timeline">
          {/* SECTION: About Me */}
          <section className="cv-section">
            <div className="cv-section__marker" aria-hidden="true" />
            <h2 className="cv-section__title">about me</h2>
            <div className="cv-section__content">
              <p className="cv-text">
                A responsible, organized, and creative professional with the ability to generate innovative ideas quickly and efficiently. Has led multiple projects, developing both the creative vision and the management skills required to deliver successful outcomes.
              </p>
              <p className="cv-text">
                Brings experience in automating creative processes, designing and optimizing workflows that enable large-scale production of high-quality content. Combines innovation with efficiency, consistently ensuring strong and distinctive results.
              </p>
            </div>
          </section>

          {/* SECTION: Experience */}
          <section className="cv-section">
            <div className="cv-section__marker" aria-hidden="true" />
            <h2 className="cv-section__title">experience</h2>
            <div className="cv-section__content">
              {/* Job 1 */}
              <article className="cv-entry">
                <div className="cv-entry__head">
                  <h3 className="cv-entry__title">
                    <strong>Making Science</strong> — Video Editor and Creative Coordinator
                  </h3>
                  <span className="cv-entry__date">2021 — PRESENT</span>
                </div>
                <p className="cv-text">
                  Led creative and technical projects, combining innovative idea generation with efficient execution. Designed and implemented automated workflows to optimize creative processes, enabling large-scale production of high-quality content.
                </p>
              </article>

              {/* Job 2 */}
              <article className="cv-entry">
                <div className="cv-entry__head">
                  <h3 className="cv-entry__title">
                    <strong>New Rule Magazine</strong> — Creative
                  </h3>
                  <span className="cv-entry__date">2021</span>
                </div>
                <p className="cv-text">
                  Supported creative projects while beginning to develop skills in both innovative idea generation and technical execution.
                </p>
              </article>
            </div>
          </section>

          {/* SECTION: Education */}
          <section className="cv-section">
            <div className="cv-section__marker" aria-hidden="true" />
            <h2 className="cv-section__title">education</h2>
            <div className="cv-section__content">
              <article className="cv-entry cv-entry--compact">
                <div className="cv-entry__head">
                  <h3 className="cv-entry__title">Motion Graphics & 3D Master</h3>
                  <span className="cv-entry__date">2021 — 2022</span>
                </div>
                <p className="cv-entry__institution">Trazos School</p>
              </article>

              <article className="cv-entry cv-entry--compact">
                <div className="cv-entry__head">
                  <h3 className="cv-entry__title">Cinema and Broadcasting degree</h3>
                  <span className="cv-entry__date">2017 — 2021</span>
                </div>
                <p className="cv-entry__institution">Universidad Rey Juan Carlos</p>
              </article>
            </div>
          </section>

          {/* SECTION: Skills */}
          <section className="cv-section cv-section--last">
            <div className="cv-section__marker" aria-hidden="true" />
            <h2 className="cv-section__title">skills</h2>
            <div className="cv-section__content">
              <div className="cv-skills-grid">
                <div className="cv-skills-col">
                  <div className="cv-skill-item">
                    <span className="cv-skill-item__bullet">•</span>
                    <span className="cv-skill-item__name">After Effects</span>
                  </div>
                  <div className="cv-skill-item">
                    <span className="cv-skill-item__bullet">•</span>
                    <span className="cv-skill-item__name">Premiere</span>
                  </div>
                </div>

                <div className="cv-skills-col">
                  <div className="cv-skill-item">
                    <span className="cv-skill-item__bullet">•</span>
                    <span className="cv-skill-item__name">Houdini</span>
                  </div>
                  <div className="cv-skill-item">
                    <span className="cv-skill-item__bullet">•</span>
                    <span className="cv-skill-item__name">Blender</span>
                  </div>
                </div>

                <div className="cv-skills-col">
                  <div className="cv-skill-item">
                    <span className="cv-skill-item__bullet">•</span>
                    <span className="cv-skill-item__name">ComfyUI</span>
                  </div>
                  <div className="cv-skill-item">
                    <span className="cv-skill-item__bullet">•</span>
                    <span className="cv-skill-item__name">AI tools (Midjourney, Google Veo)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer info */}
        <footer className="cv-footer">
          <span>RODRIGO SANTOS — CREATIVE DIRECTION & EDITORIAL PORTFOLIO</span>
          <span className="cv-footer__site">RODRISANRO.COM</span>
        </footer>
      </main>
    </div>
  )
}
