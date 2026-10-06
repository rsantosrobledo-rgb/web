import React from 'react'
import './VirtualCard.css'

const translations = {
  es: {
    badge: 'DIRECTOR CREATIVO',
    nameLead: 'rodrig',
    nameSecond: 'santos',
    services: [
      'Diseño de marca ◆',
      'Web ◆',
      'Piezas visuales◆',
    ],
    workLabel: 'TRABAJOS',
    workDomain: 'rodrigosantos.es',
    budgetText: [
      'Presupuesto por proyecto según escala y envergadura.',
      'Consultas y primeras conversaciones libres y sin compromiso.',
    ],
    saveContact: 'GUARDAR CONTACTO',
    whatsappMessage: 'Hola Rodrigo',
    vcardTitle: 'Director Creativo',
    vcardNote: 'Director Creativo enfocado en diseño de marca, web y piezas visuales.',
  },
  en: {
    badge: 'CREATIVE DIRECTOR',
    nameLead: 'rodrig',
    nameSecond: 'santos',
    services: [
      'Brand Design ◆',
      'Web ◆',
      'Visual Pieces◆',
    ],
    workLabel: 'WORK',
    workDomain: 'rodrigosantos.es',
    budgetText: [
      'Project-based pricing tailored to scale and scope.',
      'Initial inquiries and consultations are always free of charge.',
    ],
    saveContact: 'SAVE CONTACT',
    whatsappMessage: 'Hello Rodrigo',
    vcardTitle: 'Creative Director',
    vcardNote: 'Creative Director focused on brand design, web and visual pieces.',
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
        {/* Top Header: DIRECTOR CREATIVO + rodrigo santos (with animated eye) */}
        <header className="vcard-header">
          <span className="vcard-badge">{t.badge}</span>
          <h1 className="vcard-title">
            <span className="vcard-name-line vcard-name-line--rodrigo">
              {t.nameLead}
              <span className="vcard-eye-letter" aria-label="o">
                <svg
                  viewBox="0 0 100 100"
                  className="vcard-eye-svg"
                  aria-hidden="true"
                >
                  <defs>
                    <clipPath id="eye-sclera-clip">
                      <circle cx="50" cy="50" r="26" />
                    </clipPath>
                  </defs>
                  {/* Outer geometric black 'o' */}
                  <circle cx="50" cy="50" r="48" fill="#000000" />
                  {/* White sclera / eyeball */}
                  <circle cx="50" cy="50" r="26" fill="#FFFFFF" />
                  {/* Pupil & Iris drifting calmly from side to side */}
                  <g className="vcard-eye-pupil" clipPath="url(#eye-sclera-clip)">
                    {/* Sky blue iris matching the artwork */}
                    <circle cx="50" cy="50" r="14" fill="#7FAEDB" />
                    {/* Dark inner pupil */}
                    <circle cx="50" cy="50" r="7.5" fill="#111111" />
                    {/* White specular catchlight */}
                    <circle cx="47" cy="46" r="2.8" fill="#FFFFFF" />
                  </g>
                </svg>
              </span>
            </span>
            <span className="vcard-name-line">{t.nameSecond}</span>
          </h1>
        </header>

        {/* Services List: Lightweight typography with trailing diamond */}
        <section className="vcard-services-block" aria-label="Servicios">
          {t.services.map((service, index) => (
            <p className="vcard-service-item" key={index}>
              {service}
            </p>
          ))}
        </section>

        {/* Work / Trabajos link to rodrigosantos.es */}
        <section className="vcard-work-block" aria-label="Trabajos">
          <span className="vcard-work-label">{t.workLabel}</span>
          <a
            href="/"
            className="vcard-work-domain"
            id="vcard-work-link"
            aria-label={lang === 'en' ? 'Go to rodrigosantos.es' : 'Ir a rodrigosantos.es'}
          >
            {t.workDomain}
          </a>
        </section>

        {/* Budget note */}
        <section className="vcard-budget-block" aria-label="Presupuesto">
          <p className="vcard-budget-text">
            <span>{t.budgetText[0]}</span>
            <span>{t.budgetText[1]}</span>
          </p>
        </section>

        {/* Action Buttons in White */}
        <footer className="vcard-actions-block" aria-label="Contacto">
          <button
            type="button"
            className="vcard-action-btn vcard-action-btn--primary"
            onClick={handleSaveContact}
            id="vcard-btn-save"
          >
            {t.saveContact}
          </button>

          <div className="vcard-action-grid">
            <a
              href={`https://wa.me/34649185386?text=${encodeURIComponent(t.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="vcard-action-btn vcard-action-btn--secondary"
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
              className="vcard-action-btn vcard-action-btn--secondary"
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
        </footer>
      </main>
    </div>
  )
}
