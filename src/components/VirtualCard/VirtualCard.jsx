import React from 'react'
import './VirtualCard.css'

const translations = {
  es: {
    badge: 'DIRECTOR CREATIVO',
    services: [
      { text: 'Diseño de marca', diamond: true },
      { text: 'Contenido audiovisual', diamond: true },
      { text: 'Diseño web', diamond: true },
    ],
    workLabel: 'TRABAJOS',
    workDomain: 'rodrigosantos.es',
    budgetText: [
      'Proyectos con presupuesto cerrado o colaboración continua',
      'con fee mensual. Primeras conversaciones sin compromiso.',
    ],
    saveContact: 'GUARDAR CONTACTO',
    whatsappMessage: 'Hola Rodrigo',
    vcardTitle: 'Director Creativo',
    vcardNote: 'Director Creativo enfocado en diseño de marca, contenido audiovisual y diseño web.',
  },
  en: {
    badge: 'CREATIVE DIRECTOR',
    services: [
      { text: 'Brand Design', diamond: true },
      { text: 'Audiovisual Content', diamond: true },
      { text: 'Web Design', diamond: true },
    ],
    workLabel: 'WORK',
    workDomain: 'rodrigosantos.es',
    budgetText: [
      'Fixed-fee projects or ongoing monthly retainer.',
      'Initial inquiries and conversations without commitment.',
    ],
    saveContact: 'SAVE CONTACT',
    whatsappMessage: 'Hello Rodrigo',
    vcardTitle: 'Creative Director',
    vcardNote: 'Creative Director focused on brand design, audiovisual content and web design.',
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

  const [isAnimating, setIsAnimating] = React.useState(true)

  React.useEffect(() => {
    // Hold on black back for ~0.6s, then smooth 3D flip to front (~1.4s) -> total 2.0s
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSaveContact = (e) => {
    e.preventDefault()
    if (e.stopPropagation) e.stopPropagation()
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
      window.location.href = '/rodrigo-santos.vcf'
    }
  }

  return (
    <div className="vcard-page" id="vcard-page">
      <div className="vcard-perspective-viewport">
        <main
          className={`vcard-flipper ${
            isAnimating ? 'vcard-flipper--autoflip' : ''
          }`}
          id="vcard-container"
        >
          {/* Front Face (White warm artboard paper) */}
          <div className="vcard-face vcard-face--front">
            {/* Exact Vector Artboard from Illustrator (viewBox: 0 0 155.91 240.94) */}
            <div className="vcard-svg-wrapper">
          <svg
            id="vcard-artboard"
            viewBox="0 0 155.91 240.94"
            className="vcard-artwork-svg"
            role="img"
            aria-label={`Rodrigo Santos — ${t.badge}`}
          >
            <defs>
              <clipPath id="vcard-eye-hole-clip">
                <circle cx="129.12" cy="49.67" r="6.0" />
              </clipPath>
            </defs>

            {/* Background artboard warm paper */}
            <rect width="155.91" height="240.94" fill="#FFFEF7" />

            {/* 1. DIRECTOR CREATIVO (exact translate 2.2 39.29, font-size 5px) */}
            <text
              className="vcard-cls-sans vcard-cls-fill"
              style={{ fontSize: '5px', letterSpacing: '0.04em' }}
              transform="translate(2.2 39.29)"
            >
              {t.badge}
            </text>

            {/* 2. Animated Eye Unit (sits centered in the o, moving smoothly across both extremes) */}
            <g className="vcard-eye-drift" clipPath="url(#vcard-eye-hole-clip)">
              {/* White sclera base */}
              <circle cx="129.12" cy="49.67" r="2.79" fill="#FFFEF7" />
              {/* Fine black eye border stroke */}
              <circle
                className="vcard-cls-eye-stroke"
                cx="129.12"
                cy="49.67"
                r="2.79"
              />
              {/* Dark pupil */}
              <circle cx="129.12" cy="49.67" r="1.45" fill="#221F20" />
              {/* Specular highlight */}
              <circle cx="128.45" cy="48.95" r="0.45" fill="#FFFFFF" />
            </g>

            {/* 3. rodrigo santos display title (exact translate 0 60.72) */}
            <text className="vcard-cls-title vcard-cls-fill" transform="translate(0 60.72)">
              <tspan x="0" y="0">r</tspan>
              <tspan x="16.45" y="0">od</tspan>
              <tspan x="65.48" y="0">r</tspan>
              <tspan x="81.79" y="0">igo </tspan>
              <tspan x="0" y="27">san</tspan>
              <tspan x="65.59" y="27">t</tspan>
              <tspan x="78.96" y="27">os</tspan>
            </text>

            {/* 4. Services with diamonds (exact translate .63 117.04, font-size 11px) */}
            <text
              className="vcard-cls-sans vcard-cls-fill"
              style={{ fontSize: '11px' }}
              transform="translate(.63 117.04)"
            >
              <tspan x="0" y="0">{t.services[0].text} <tspan className="vcard-cls-diamond">◆</tspan></tspan>
              <tspan x="0" y="13">{t.services[1].text} <tspan className="vcard-cls-diamond">◆</tspan></tspan>
              <tspan x="0" y="26">{t.services[2].text} <tspan className="vcard-cls-diamond">◆</tspan></tspan>
            </text>

            {/* 5. TRABAJOS (translate 2.38 163, font-size 5px) */}
            <text
              className="vcard-cls-sans vcard-cls-fill"
              style={{ fontSize: '5px', letterSpacing: '0.05em' }}
              transform="translate(2.38 163)"
            >
              {t.workLabel}
            </text>

            {/* 6. rodrigosantos.es domain link — bigger, clearly clickable with arrow */}
            <a href="/" className="vcard-domain-link" aria-label="rodrigosantos.es">
              <text
                className="vcard-cls-sans vcard-cls-fill vcard-domain-text"
                style={{ fontSize: '18px', letterSpacing: '-0.025em' }}
                transform="translate(2.38 179)"
              >
                {t.workDomain}
                <tspan className="vcard-link-arrow" dx="2" dy="-2" style={{ fontSize: '12px' }}>↗</tspan>
              </text>
            </a>

            {/* 7. Presupuesto note */}
            <text
              className="vcard-cls-sans vcard-cls-fill"
              style={{ fontSize: '5.2px', letterSpacing: '-0.025em' }}
              transform="translate(2.38 193)"
            >
              <tspan x="0" y="0">{t.budgetText[0]}</tspan>
              <tspan x="0" y="7.4">{t.budgetText[1]}</tspan>
            </text>
          </svg>
        </div>

        {/* 8. Action Buttons at Bottom */}
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
              className="vcard-action-btn vcard-action-btn--secondary"
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
        </footer>
      </div>

      {/* Back Face (Deep Black with White Textured Eye Logo) */}
      <div
        className="vcard-face vcard-face--back"
        aria-hidden={!isAnimating}
      >
        <div className="vcard-back-content">
          <img
            src="/eye-back-logo.png"
            alt="Rodrigo Santos Eye Logo"
            className="vcard-back-logo"
            draggable="false"
          />
        </div>
      </div>
    </main>
  </div>
</div>
  )
}
