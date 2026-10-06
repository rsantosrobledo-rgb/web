import React from 'react'
import './VirtualCard.css'

const translations = {
  es: {
    saveContact: 'GUARDAR CONTACTO',
    whatsappMessage: 'Hola Rodrigo',
    vcardTitle: 'Director Creativo',
    vcardNote: 'Director Creativo enfocado en diseño de marca, web y piezas visuales.',
  },
  en: {
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
      <main className="vcard-container" id="vcard-container">
        {/* Vector Card Artwork — Exact Illustrator Geometry (viewBox: 0 0 155.91 240.94) */}
        <div className="vcard-svg-wrapper">
          <svg
            id="Capa_1"
            data-name="Capa 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 155.91 240.94"
            className="vcard-artwork-svg"
            role="img"
            aria-label="Rodrigo Santos — Director Creativo"
          >
            {/* Card Background */}
            <rect className="vcard-cls-bg" width="155.91" height="240.94" />

            {/* DIRECTOR CREATIVO */}
            <text
              className="vcard-cls-sans vcard-cls-fill"
              style={{ fontSize: '5px' }}
              transform="translate(2.2 39.29)"
            >
              {lang === 'en' ? (
                <tspan x="0" y="0">CREATIVE DIRECTOR</tspan>
              ) : (
                <>
                  <tspan x="0" y="0">DIREC</tspan>
                  <tspan style={{ letterSpacing: '-.03em' }} x="15.15" y="0">T</tspan>
                  <tspan x="17.57" y="0">OR CRE</tspan>
                  <tspan style={{ letterSpacing: '-.05em' }} x="36.17" y="0">A</tspan>
                  <tspan x="39.16" y="0">TI</tspan>
                  <tspan style={{ letterSpacing: '-.02em' }} x="42.98" y="0">V</tspan>
                  <tspan x="46.15" y="0">O</tspan>
                </>
              )}
            </text>

            {/* Animated Eye in the 'o' (Center: cx=132.12, cy=49.67, r=2.79) */}
            <g className="vcard-eye-layer">
              {/* White sclera base */}
              <circle cx="132.12" cy="49.67" r="2.79" fill="#fffef7" />
              {/* Blue iris circle from Illustrator */}
              <circle
                className="vcard-cls-eye-stroke"
                cx="132.12"
                cy="49.67"
                r="2.79"
              />
              {/* Calm, relaxed pupil drifting horizontally */}
              <g className="vcard-eye-drift">
                <circle cx="132.12" cy="49.67" r="1.45" fill="#221f20" />
                <circle cx="131.5" cy="49.1" r="0.45" fill="#ffffff" />
              </g>
            </g>

            {/* rodrigo santos display title */}
            <text className="vcard-cls-title vcard-cls-fill" transform="translate(0 60.72)">
              <tspan style={{ letterSpacing: '0em' }} x="0" y="0">r</tspan>
              <tspan x="16.45" y="0">od</tspan>
              <tspan style={{ letterSpacing: '0em' }} x="65.48" y="0">r</tspan>
              <tspan x="81.79" y="0">igo </tspan>
              <tspan x="0" y="25">san</tspan>
              <tspan style={{ letterSpacing: '0em' }} x="65.59" y="25">t</tspan>
              <tspan x="78.96" y="25">os</tspan>
            </text>

            {/* Services with diamonds */}
            <text
              className="vcard-cls-sans vcard-cls-fill"
              style={{ fontSize: '11px' }}
              transform="translate(.63 117.04)"
            >
              {lang === 'en' ? (
                <>
                  <tspan x="0" y="0">Brand Design </tspan>
                  <tspan className="vcard-cls-diamond" x="80.0" y="0">◆ </tspan>
                  <tspan style={{ letterSpacing: '-.04em' }} x="0" y="13">W</tspan>
                  <tspan x="10.41" y="13">eb </tspan>
                  <tspan className="vcard-cls-diamond" x="26.43" y="13">◆</tspan>
                  <tspan x="0" y="26">Visual Pieces</tspan>
                  <tspan className="vcard-cls-diamond" x="72.0" y="26">◆</tspan>
                </>
              ) : (
                <>
                  <tspan x="0" y="0">Diseño de mar</tspan>
                  <tspan style={{ letterSpacing: '-.01em' }} x="74.46" y="0">c</tspan>
                  <tspan x="80.99" y="0">a </tspan>
                  <tspan className="vcard-cls-diamond" x="89.11" y="0">◆ </tspan>
                  <tspan style={{ letterSpacing: '-.04em' }} x="0" y="13">W</tspan>
                  <tspan x="10.41" y="13">eb </tspan>
                  <tspan className="vcard-cls-diamond" x="26.43" y="13">◆</tspan>
                  <tspan x="33.18" y="13"> </tspan>
                  <tspan x="0" y="26">Piezas visuales</tspan>
                  <tspan className="vcard-cls-diamond" x="76.16" y="26">◆</tspan>
                </>
              )}
            </text>

            {/* TRABAJOS label */}
            <text
              className="vcard-cls-sans vcard-cls-fill"
              style={{ fontSize: '5px' }}
              transform="translate(2.38 165.6)"
            >
              <tspan x="0" y="0">{lang === 'en' ? 'WORK ' : 'TRABAJOS '}</tspan>
            </text>

            {/* rodrigosantos.es domain link */}
            <a href="/" className="vcard-domain-link" aria-label="rodrigosantos.es">
              <text
                className="vcard-cls-sans vcard-cls-fill vcard-domain-text"
                style={{ fontSize: '16px' }}
                transform="translate(2.38 180.38)"
              >
                <tspan x="0" y="0">rodrigo</tspan>
                <tspan style={{ letterSpacing: '0em' }} x="56.88" y="0">s</tspan>
                <tspan x="64.91" y="0">an</tspan>
                <tspan style={{ letterSpacing: '-.02em' }} x="83.21" y="0">t</tspan>
                <tspan x="89.02" y="0">os.es</tspan>
              </text>
            </a>

            {/* Presupuesto note */}
            <text
              className="vcard-cls-sans vcard-cls-fill"
              style={{ fontSize: '4px' }}
              transform="translate(6.86 227.36)"
            >
              {lang === 'en' ? (
                <>
                  <tspan x="0" y="0">Project-based pricing tailored to scale and scope.</tspan>
                  <tspan x="0" y="6">Initial inquiries and consultations are always free of charge.</tspan>
                </>
              ) : (
                <>
                  <tspan x="0" y="0">Presupues</tspan>
                  <tspan style={{ letterSpacing: '-.02em' }} x="20.21" y="0">t</tspan>
                  <tspan x="21.66" y="0">o por pr</tspan>
                  <tspan style={{ letterSpacing: '-.01em' }} x="36.33" y="0">oy</tspan>
                  <tspan style={{ letterSpacing: '0em' }} x="41.02" y="0">ec</tspan>
                  <tspan style={{ letterSpacing: '-.02em' }} x="45.92" y="0">t</tspan>
                  <tspan x="47.37" y="0">o según es</tspan>
                  <tspan style={{ letterSpacing: '-.01em' }} x="67.57" y="0">c</tspan>
                  <tspan x="69.94" y="0">ala y e</tspan>
                  <tspan style={{ letterSpacing: '0em' }} x="81.36" y="0">nv</tspan>
                  <tspan x="85.64" y="0">ergadura. </tspan>
                  <tspan style={{ letterSpacing: '-.01em' }} x="0" y="6">C</tspan>
                  <tspan x="3.1" y="6">onsul</tspan>
                  <tspan style={{ letterSpacing: '-.02em' }} x="13.23" y="6">t</tspan>
                  <tspan x="14.7" y="6">as y primeras co</tspan>
                  <tspan style={{ letterSpacing: '-.01em' }} x="44.92" y="6">nv</tspan>
                  <tspan style={{ letterSpacing: '0em' }} x="49.2" y="6">er</tspan>
                  <tspan style={{ letterSpacing: '0em' }} x="53.04" y="6">s</tspan>
                  <tspan x="55.04" y="6">aciones libres y sin compromiso.</tspan>
                </>
              )}
            </text>
          </svg>
        </div>

        {/* Action Buttons in White at Bottom */}
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
                width="15"
                height="15"
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
                width="15"
                height="15"
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

