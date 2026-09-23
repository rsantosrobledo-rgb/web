import { useState, useEffect, useCallback, useRef } from 'react'
import homeOjo from '../../assets/home_ojo.webm'
import homeTransicion from '../../assets/home_transicion.webm'
import homeTransicionEye from '../../assets/home_transicion_eye.webp'
import { EYE_CLONES } from './eyeClones.js'
import './IntroSequence.css'

export default function IntroSequence({ onStartTransition, onComplete }) {
  const [phase, setPhase] = useState('IDLE') // 'IDLE' | 'BURST'
  const hasTriggeredRef = useRef(false)
  const videoRef = useRef(null)

  // Ensure video autoplays smoothly on all browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
    }
  }, [phase])

  // Preload transition assets in advance for zero-latency burst
  useEffect(() => {
    const img = new Image()
    img.src = homeTransicionEye
  }, [])

  const triggerTransition = useCallback(() => {
    if (hasTriggeredRef.current) return
    hasTriggeredRef.current = true

    setPhase('BURST')
    if (onStartTransition) {
      onStartTransition()
    }

    // 1-second animation: dense overlapping eyes burst over everything then reveal MY WORK
    setTimeout(() => {
      onComplete?.()
    }, 1150)
  }, [onStartTransition, onComplete])

  // Touch & Wheel gesture handling: swipe or scroll triggers transition
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

      // Any swipe gesture triggers transition
      if (Math.abs(dy) > 20 || Math.abs(dx) > 30) {
        triggerTransition()
      }
    }

    const handleWheel = (e) => {
      // Any vertical swipe or scroll gesture triggers transition
      if (Math.abs(e.deltaY) > 15 || Math.abs(e.deltaX) > 20) {
        triggerTransition()
      }
    }

    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Enter', 'PageDown', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        triggerTransition()
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
  }, [phase, triggerTransition])

  const marqueeItems = ['PORTFOLIO', 'PORTFOLIO', 'PORTFOLIO', 'PORTFOLIO', 'PORTFOLIO']

  return (
    <div
      className={`intro ${phase === 'BURST' ? 'intro--burst' : ''}`}
      id="intro-sequence"
    >
      {/* Viewport Camera: contains marquee, eye video, and surreal burst clones */}
      <div className="intro__camera">
        {/* Infinite Carousel Marquee passing horizontally behind the eye */}
        <div className="intro__marquee" aria-hidden="true">
          <div className="intro__marquee-inner">
            <div className="intro__marquee-group">
              {marqueeItems.map((item, i) => (
                <span key={`m1-${i}`} className="intro__marquee-text">
                  {item}
                </span>
              ))}
            </div>
            <div className="intro__marquee-group">
              {marqueeItems.map((item, i) => (
                <span key={`m2-${i}`} className="intro__marquee-text">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Central Eye Video: switches to homeTransicion when burst starts */}
        <div className={`intro__eye-container ${phase === 'BURST' ? 'intro__eye-container--burst' : ''}`}>
          <video
            ref={videoRef}
            src={phase === 'BURST' ? homeTransicion : homeOjo}
            autoPlay
            loop
            muted
            playsInline
            className="intro__bg-video"
            aria-hidden="true"
          />
        </div>

        {/* Multiplied Eye Clones (densely overlapping, superimposed over everything) */}
        {phase === 'BURST' && (
          <div className="intro__eye-burst-field" aria-hidden="true">
            {EYE_CLONES.map((clone, i) => (
              <img
                key={i}
                src={homeTransicionEye}
                alt=""
                className="intro__eye-clone"
                style={{
                  '--tx': clone.tx,
                  '--ty': clone.ty,
                  '--delay': `${clone.delay}s`,
                  '--scale': clone.scale || 1,
                }}
              />
            ))}
          </div>
        )}

        {/* Center trigger — clicking in the center of the photo (the eye) starts the animation */}
        <button
          type="button"
          className="intro__center-trigger"
          onClick={triggerTransition}
          aria-label="Click to enter portfolio"
          id="center-photo-trigger"
        />
      </div>

      {/* Bottom footer text: RODRIGO SANTOS - CREATIVE DIRECTION in black */}
      <div className="intro__footer">
        <span className="intro__footer-text">
          <span className="intro__footer-name">RODRIGO SANTOS</span>
          <span className="intro__footer-sep"> - </span>
          <span className="intro__footer-sub">CREATIVE DIRECTION</span>
        </span>
      </div>
    </div>
  )
}
