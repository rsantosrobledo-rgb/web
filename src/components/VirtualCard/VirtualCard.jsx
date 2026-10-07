import React from 'react'
import './VirtualCard.css'

const translations = {
  es: {
    badge: 'DIRECCIÓN CREATIVA',
    services: [
      { text: 'Diseño de marca', diamond: true },
      { text: 'Contenido audiovisual', diamond: true },
      { text: 'Diseño web', diamond: true },
    ],
    workLabel: 'TRABAJOS EN',
    workDomain: 'rodrigosantos.es',
    budgetText: [
      'Proyectos con presupuesto cerrado o colaboración continua',
      'con fee mensual. Primeras conversaciones sin compromiso.',
    ],
    saveContact: 'GUARDAR CONTACTO',
    whatsappMessage: 'Hola Rodrigo',
    vcardTitle: 'Dirección Creativa',
    vcardNote: 'Dirección Creativa enfocada en diseño de marca, contenido audiovisual y diseño web.',
  },
  en: {
    badge: 'CREATIVE DIRECTION',
    services: [
      { text: 'Brand Design', diamond: true },
      { text: 'Audiovisual Content', diamond: true },
      { text: 'Web Design', diamond: true },
    ],
    workLabel: 'WORK AT',
    workDomain: 'rodrigosantos.es',
    budgetText: [
      'Fixed-fee projects or ongoing monthly retainer.',
      'Initial inquiries and conversations without commitment.',
    ],
    saveContact: 'SAVE CONTACT',
    whatsappMessage: 'Hello Rodrigo',
    vcardTitle: 'Creative Direction',
    vcardNote: 'Creative Direction focused on brand design, audiovisual content and web design.',
  },
}

const EYE_TARGETS = [
  { id: 'ro', cx: 28.70, cy: 49.67, clipId: 'vcard-eye-clip-0' },
  { id: 'go', cx: 129.12, cy: 49.67, clipId: 'vcard-eye-clip-1' },
  { id: 'os', cx: 91.21, cy: 76.67, clipId: 'vcard-eye-clip-2' },
]

export default function VirtualCard({ lang: propLang }) {
  // Determine language: prop > current URL (/hello or #hello -> 'en') > default 'es'
  const isEnUrl =
    typeof window !== 'undefined' &&
    (window.location.pathname.replace(/\/$/, '') === '/hello' ||
      window.location.hash === '#hello')

  const lang = propLang || (isEnUrl ? 'en' : 'es')
  const t = translations[lang] || translations.es

  const [isAnimating, setIsAnimating] = React.useState(true)
  const [eyeVisible, setEyeVisible] = React.useState(false)
  const [isInitialFade, setIsInitialFade] = React.useState(true)
  const [activeEyeIndex, setActiveEyeIndex] = React.useState(() => Math.floor(Math.random() * 3))

  React.useEffect(() => {
    // Hold on black back for ~0.6s, then smooth 3D flip to front (~1.4s) -> total 2.0s
    let isMounted = true
    const timer = setTimeout(() => {
      setIsAnimating(false)
      // Once card finishes turning to front, wait for font readiness if needed, then fade in eye over 0.5s
      const revealEye = () => {
        if (!isMounted) return
        setEyeVisible(true)
        setTimeout(() => {
          if (isMounted) setIsInitialFade(false)
        }, 500)
      }

      if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
        document.fonts.ready.then(revealEye).catch(revealEye)
      } else {
        revealEye()
      }
    }, 2000)

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [])

  // Random turns: every 1 second, jump to a different 'o'
  React.useEffect(() => {
    if (!eyeVisible) return

    const interval = setInterval(() => {
      setActiveEyeIndex((current) => {
        const others = [0, 1, 2].filter((i) => i !== current)
        return others[Math.floor(Math.random() * others.length)]
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [eyeVisible])

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
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
          >
            <defs>
              {EYE_TARGETS.map((pos) => (
                <clipPath key={pos.clipId} id={pos.clipId}>
                  <circle cx={pos.cx} cy={pos.cy} r="6.0" />
                </clipPath>
              ))}
            </defs>

            {/* Background artboard warm paper */}
            <rect width="155.91" height="240.94" fill="#FFFEF7" />

            {/* 1. DIRECCIÓN CREATIVA */}
            <text
              className="vcard-cls-sans vcard-cls-fill"
              style={{ fontSize: '4.91px', letterSpacing: '0.01em' }}
              transform="translate(2.2 39.29)"
            >
              {t.badge}
            </text>

            {/* 2. Animated Eye Unit (appears in all the 'o's by random 1-second turns) */}
            {EYE_TARGETS.map((pos, idx) => {
              const isActive = eyeVisible && activeEyeIndex === idx
              return (
                <g
                  key={pos.id}
                  className={`vcard-eye-unit ${isActive ? 'is-active' : ''} ${
                    isInitialFade ? 'is-initial-fade' : ''
                  }`}
                  clipPath={`url(#${pos.clipId})`}
                >
                  <g
                    className="vcard-eye-drift"
                    style={{ transformOrigin: `${pos.cx}px ${pos.cy}px` }}
                  >
                    {/* Eye sclera base with fine black border stroke */}
                    <circle
                      className="vcard-cls-eye-stroke"
                      cx={pos.cx}
                      cy={pos.cy}
                      r="2.79"
                      shapeRendering="geometricPrecision"
                    />
                    {/* Dark pupil */}
                    <circle
                      cx={pos.cx}
                      cy={pos.cy}
                      r="1.45"
                      fill="#221F20"
                      shapeRendering="geometricPrecision"
                    />
                    {/* Specular highlight */}
                    <circle
                      cx={pos.cx - 0.67}
                      cy={pos.cy - 0.72}
                      r="0.45"
                      fill="#FFFFFF"
                      shapeRendering="geometricPrecision"
                    />
                  </g>
                </g>
              )
            })}

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

            {/* 4. Especializaciones / Services with diamonds — linked to website */}
            <a href="/" className="vcard-services-link" aria-label="Ver proyectos en rodrigosantos.es">
              <rect x="0" y="106" width="155.91" height="42" fill="transparent" pointerEvents="all" />
              <text
                className="vcard-cls-sans vcard-cls-fill vcard-services-text"
                style={{ fontSize: '11px' }}
                transform="translate(.63 117.04)"
              >
                <tspan x="0" y="0">{t.services[0].text} <tspan className="vcard-cls-diamond">◆</tspan></tspan>
                <tspan x="0" y="13">{t.services[1].text} <tspan className="vcard-cls-diamond">◆</tspan></tspan>
                <tspan x="0" y="26">{t.services[2].text} <tspan className="vcard-cls-diamond">◆</tspan></tspan>
              </text>
            </a>

            {/* 5 & 6. TRABAJOS EN + rodrigosantos.es domain link */}
            <a href="/" className="vcard-domain-link" aria-label={`Trabajos en ${t.workDomain}`}>
              <rect x="0" y="156" width="155.91" height="28" fill="transparent" pointerEvents="all" />
              <text
                className="vcard-cls-sans vcard-cls-fill"
                style={{ fontSize: '5px', letterSpacing: '0.05em' }}
                transform="translate(2.38 163)"
              >
                {t.workLabel}
              </text>
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
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
