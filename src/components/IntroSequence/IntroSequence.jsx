import { useState, useEffect, useCallback, useRef } from 'react'
import bgDesert from '../../assets/bg_desert.webp'
import bgMeadow from '../../assets/bg_meadow.webp'
import bgBeach from '../../assets/bg_beach.webp'
import bgRoom from '../../assets/bg_room.webp'
import entityFront from '../../assets/entity_front.webp'
import entityBack from '../../assets/entity_back.webp'
import './IntroSequence.css'

const backgrounds = [bgDesert, bgMeadow, bgBeach, bgRoom]
const BG_INTERVAL = 1500

export default function IntroSequence({ onComplete }) {
  const [phase, setPhase] = useState('IDLE') // 'IDLE' | 'ZOOMING' | 'DONE'
  const [isBackView, setIsBackView] = useState(false)
  const [isCreamBg, setIsCreamBg] = useState(false)
  const [activeBg, setActiveBg] = useState(0)
  const [bgLoaded, setBgLoaded] = useState(true)
  const intervalRef = useRef(null)

  // Preload all backgrounds in parallel
  useEffect(() => {
    let loaded = 0
    backgrounds.forEach((bg) => {
      const img = new Image()
      img.onload = () => {
        loaded++
        if (loaded >= 1) setBgLoaded(true)
      }
      img.onerror = () => {
        loaded++
        if (loaded >= 1) setBgLoaded(true)
      }
      img.src = bg
    })
  }, [])

  // Cycle backgrounds every 1.5s during IDLE and initial zoom (until cream transition)
  useEffect(() => {
    if (isCreamBg || !bgLoaded) return
    intervalRef.current = setInterval(() => {
      setActiveBg((prev) => (prev + 1) % backgrounds.length)
    }, BG_INTERVAL)
    return () => clearInterval(intervalRef.current)
  }, [isCreamBg, bgLoaded])

  const handleClick = useCallback(() => {
    if (phase !== 'IDLE') return

    // 1. Click at t = 0: Button & text disappear immediately, front entity appears on chair at 1x
    // Camera stays static for 2 full seconds (1s extra requested by user)
    setPhase('SEATED')
    setActiveBg((prev) => (prev + 1) % backgrounds.length)

    // 2. Exactly 2.0s after click (t = 2.0s):
    // Zoom starts, keeping front entity on screen for 0.5s of zoom
    setTimeout(() => {
      setPhase('ZOOMING')
    }, 2000)

    // 3. Exactly 2.5s after click:
    // Swap to back entity and fade into solid cream background while zoom continues
    setTimeout(() => {
      clearInterval(intervalRef.current)
      setIsCreamBg(true)
      setIsBackView(true)
    }, 2500)

    // 4. At t = 4.8s:
    // Once we reach the back entity, execute automatic zoom-in directly into MY WORK
    setTimeout(() => {
      setPhase('DIVING')
      onComplete()
    }, 4800)

    // 5. At t = 5.6s:
    // Diving zoom completes and intro unmounts
    setTimeout(() => {
      setPhase('DONE')
    }, 5600)
  }, [phase, onComplete])

  // Touch & Wheel gesture handling: swipe up to trigger intro transition
  const touchStartYRef = useRef(null)
  const touchStartXRef = useRef(null)

  useEffect(() => {
    if (phase !== 'IDLE') return

    const handleTouchStart = (e) => {
      touchStartYRef.current = e.touches[0].clientY
      touchStartXRef.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e) => {
      if (touchStartYRef.current === null) return
      const dy = e.changedTouches[0].clientY - touchStartYRef.current
      const dx = e.changedTouches[0].clientX - (touchStartXRef.current || 0)
      touchStartYRef.current = null
      touchStartXRef.current = null

      // Upward swipe: dy < -25 and predominantly vertical
      if (dy < -25 && Math.abs(dy) > Math.abs(dx) * 0.8) {
        handleClick()
      }
    }

    const handleWheel = (e) => {
      // Any vertical swipe or scroll gesture on desktop triggers the transition
      if (Math.abs(e.deltaY) > 20 && Math.abs(e.deltaY) > Math.abs(e.deltaX) * 1.2) {
        handleClick()
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        handleClick()
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [phase, handleClick])

  return (
    <div
      className={`intro intro--${phase.toLowerCase()} ${isCreamBg ? 'intro--cream' : ''} ${isBackView ? 'intro--back-view' : ''}`}
      id="intro-sequence"
    >
      {/* Solid fallback */}
      <div className="intro__fallback-bg" />

      {/* Zooming Camera Viewport: background + cream overlay + entities zoom together in 100% lockstep */}
      <div className="intro__camera">
        {/* Background slideshow */}
        <div className="intro__backgrounds">
          {backgrounds.map((bg, i) => (
            <img
              key={i}
              src={bg}
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'low'}
              className={`intro__bg-img ${i === activeBg ? 'intro__bg-img--active' : ''}`}
            />
          ))}
        </div>

        {/* Cream overlay (fades in at 1s) */}
        <div className={`intro__cream-overlay ${isCreamBg ? 'intro__cream-overlay--active' : ''}`} />

        {/* Entity PNGs */}
        <div className="intro__entities">
          <img
            src={entityFront}
            alt=""
            className={`intro__entity intro__entity--front ${phase !== 'IDLE' && !isBackView ? 'intro__entity--visible' : ''
              }`}
          />
          <img
            src={entityBack}
            alt=""
            className={`intro__entity intro__entity--back ${isBackView ? 'intro__entity--visible' : ''
              }`}
          />
        </div>
      </div>

      {/* Text — Welcome to my portfolio with TAKE A SEAT subtitle (strictly only in IDLE phase) */}
      {phase === 'IDLE' && (
        <div className="intro__text">
          <h1 className="intro__heading">Welcome to my portfolio</h1>
          <p className="intro__subheading">TAKE A SEAT</p>
        </div>
      )}

      {/* Swipe button on the chair (strictly only in IDLE phase) */}
      {phase === 'IDLE' && (
        <button
          type="button"
          className="intro__swipe-btn"
          onClick={handleClick}
          aria-label="Swipe up to enter portfolio"
          id="chair-swipe-button"
        >
          <span className="intro__swipe-text">Swipe</span>
          <svg
            className="intro__swipe-icon"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}

      {/* Bottom footer text: RODRIGO SANTOS - CREATIVE DIRECTION (strictly only in IDLE phase) */}
      {phase === 'IDLE' && (
        <div className="intro__footer">
          <span className="intro__footer-text">
            <span className="intro__footer-name">RODRIGO SANTOS</span>
            <span className="intro__footer-sep"> - </span>
            <span className="intro__footer-sub">CREATIVE DIRECTION</span>
          </span>
        </div>
      )}

      {/* Final fade overlay */}
      <div className="intro__final-overlay" />
    </div>
  )
}
