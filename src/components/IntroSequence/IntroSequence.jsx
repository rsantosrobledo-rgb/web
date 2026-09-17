import { useState, useEffect, useCallback, useRef } from 'react'
import bgDesert from '../../assets/bg_desert.jpg'
import bgMeadow from '../../assets/bg_meadow.jpg'
import bgBeach from '../../assets/bg_beach.jpg'
import bgRoom from '../../assets/bg_room.jpg'
import entityFront from '../../assets/entity_front.png'
import entityBack from '../../assets/entity_back.png'
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

    // 4. At t = 5.4s (2.0s static + 3.2s zoom + 0.2s handoff buffer):
    // Zoom completes into exact reference escorzo
    setTimeout(() => {
      setPhase('DONE')
      onComplete()
    }, 5400)
  }, [phase, onComplete])

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

      {/* Text — Welcome to my portfolio with TAKE A SEAT subtitle */}
      <div className="intro__text">
        <h1 className="intro__heading">Welcome to my portfolio</h1>
        <p className="intro__subheading">TAKE A SEAT</p>
      </div>

      {/* CLICK button on the chair */}
      <button
        className="intro__click-btn"
        onClick={handleClick}
        aria-label="Take a seat"
        id="chair-click-button"
      >
        <span className="intro__click-label">CLICK</span>
      </button>

      {/* Bottom footer text: RODRIGO SANTOS - CREATIVE DIRECTION */}
      <div className="intro__footer">
        <span className="intro__footer-text">
          <span className="intro__footer-name">RODRIGO SANTOS</span>
          <span className="intro__footer-sep"> - </span>
          <span className="intro__footer-sub">CREATIVE DIRECTION</span>
        </span>
      </div>

      {/* Final fade overlay */}
      <div className="intro__final-overlay" />
    </div>
  )
}
