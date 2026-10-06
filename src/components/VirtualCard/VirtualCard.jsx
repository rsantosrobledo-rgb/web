import React from 'react'
import './VirtualCard.css'

const translations = {
  es: {
    role: 'Dirección creativa',
    tags: 'Branding • Web • Piezas visuales',
    aboutTitle: 'sobre mí',
    aboutText: 'Dirección creativa independiente. Diseño identidades de marca, plataformas web y narrativa audiovisual con visión estratégica y acabado de agencia.',
    servicesTitle: 'servicios',
    services: [
      { name: 'Branding', desc: 'Identidad y rebranding' },
      { name: 'Web', desc: 'Diseño y desarrollo' },
      { name: 'Contenido', desc: 'Piezas visuales para campañas' },
    ],
    budgetTitle: 'presupuesto',
    budgetText: 'Presupuesto por proyecto según escala y envergadura. Consultas y primeras conversaciones libres y sin compromiso.',
    workTitle: 'trabajos',
    viewProjects: 'VER PROYECTOS',
    credits: 'Mazda España • Ameba Studios • Cannes Lions 2026',
    saveContact: 'GUARDAR CONTACTO',
    whatsappMessage: 'Hola Rodrigo',
    footerAuthor: 'RODRIGO SANTOS — DIRECCIÓN CREATIVA',
    footerLocation: 'MADRID',
    vcardTitle: 'Dirección creativa',
    vcardNote: 'Dirección creativa independiente enfocada en branding, web y contenido con calidad de agencia.',
  },
  en: {
    role: 'Creative direction',
    tags: 'Branding • Web • Visual pieces',
    aboutTitle: 'about me',
    aboutText: 'Independent creative direction. Crafting brand identities, digital platforms, and visual storytelling with strategic vision and agency-grade finish.',
    servicesTitle: 'services',
    services: [
      { name: 'Branding', desc: 'Identity and rebranding' },
      { name: 'Web', desc: 'Design and development' },
      { name: 'Content', desc: 'Visual pieces for campaigns' },
    ],
    budgetTitle: 'budget & scope',
    budgetText: 'Project-based pricing tailored to scale and scope. Initial inquiries and consultations are always free of charge.',
    workTitle: 'work',
    viewProjects: 'VIEW PROJECTS',
    credits: 'Mazda Spain • Ameba Studios • Cannes Lions 2026',
    saveContact: 'SAVE CONTACT',
    whatsappMessage: 'Hello Rodrigo',
    footerAuthor: 'RODRIGO SANTOS — CREATIVE DIRECTION',
    footerLocation: 'MADRID',
    vcardTitle: 'Creative Director',
    vcardNote: 'Independent creative direction focused on branding, web and content with agency caliber.',
  },
}

export default function VirtualCard({ lang: propLang }) {
  // Determine language: prop > current URL (/hello or #hello -> 'en') > default 'es'
  const isEnUrl =
    typeof window !== 'undefined' &&
    (window.location.pathname.replace(/\/$/, '') === '/hello' ||
      window.location.hash === '#hello')

  const lang = propLang || (isEnUrl ? 'en' : 'es')
  const t = translations[lang] || translations.es

  const handleSaveContact = (e) => {
    e.preventDefault()
    // Trigger download of the vCard file
    const vcardContent = `BEGIN:VCARD
VERSION:3.0
N:Santos;Rodrigo;;;
FN:Rodrigo Santos
TITLE:${t.vcardTitle}
ORG:Rodrigo Santos
TEL;TYPE=CELL,VOICE;VALUE=uri:tel:+34649185386
EMAIL;TYPE=INTERNET,PREF:r.santosrobledo@gmail.com
URL:https://rodrigosantos.es
ADR;TYPE=WORK:;;;Madrid;;;Spain
NOTE:${t.vcardNote}
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
            <h2 className="vcard-role">{t.role}</h2>
            <p className="vcard-tags">{t.tags}</p>
          </div>
          <hr className="vcard-divider" />
        </header>

        {/* Content Body */}
        <div className="vcard-body">
          {/* Section: about me / sobre mí */}
          <section className="vcard-section vcard-section--about">
            <h3 className="vcard-section__title">{t.aboutTitle}</h3>
            <p className="vcard-section__text">{t.aboutText}</p>
          </section>

          {/* Section: services / servicios */}
          <section className="vcard-section vcard-section--services">
            <h3 className="vcard-section__title">{t.servicesTitle}</h3>
            <div className="vcard-services-list">
              {t.services.map((item) => (
                <div className="vcard-service-row" key={item.name}>
                  <span className="vcard-service-name">{item.name}</span>
                  <span className="vcard-service-desc">{item.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: budget / presupuesto */}
          <section className="vcard-section vcard-section--budget">
            <h3 className="vcard-section__title">{t.budgetTitle}</h3>
            <p className="vcard-section__text vcard-section__text--budget">{t.budgetText}</p>
          </section>

          {/* Section: work / trabajos */}
          <section className="vcard-section vcard-section--work">
            <h3 className="vcard-section__title">{t.workTitle}</h3>
            <a
              href="/"
              className="vcard-work-card"
              id="vcard-work-link"
              aria-label={lang === 'en' ? 'View projects on rodrigosantos.es' : 'Ver proyectos en rodrigosantos.es'}
            >
              <div className="vcard-work-card__top">{t.viewProjects}</div>
              <div className="vcard-work-card__main">
                <span className="vcard-work-card__domain">rodrigosantos.es</span>
                <svg
                  className="vcard-work-card__arrow"
                  width="20"
                  height="20"
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
            <p className="vcard-work-credits">{t.credits}</p>
          </section>
        </div>

        {/* Action Buttons */}
        <section className="vcard-actions" aria-label={lang === 'en' ? 'Contact actions' : 'Acciones de contacto'}>
          <button
            type="button"
            className="vcard-btn vcard-btn--primary"
            onClick={handleSaveContact}
            id="vcard-btn-save"
          >
            {t.saveContact}
          </button>

          <div className="vcard-btn-group">
            <a
              href={`https://wa.me/34649185386?text=${encodeURIComponent(t.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="vcard-btn vcard-btn--secondary"
              id="vcard-btn-whatsapp"
            >
              <svg
                width="16"
                height="16"
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
                width="16"
                height="16"
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
            <span className="vcard-footer-author">{t.footerAuthor}</span>
            <span className="vcard-footer-location">{t.footerLocation}</span>
          </div>
        </footer>
      </main>
    </div>
  )
}
