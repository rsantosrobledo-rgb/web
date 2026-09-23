import { useState, useEffect, useCallback, useRef } from 'react'
import homeEye from '../../assets/home_eye.webp'
import './IntroSequence.css'

export default function IntroSequence({ onStartTransition, onComplete }) {
  const [phase, setPhase] = useState('IDLE') // 'IDLE' | 'ZOOM_OUT'
  const hasTriggeredRef = useRef(false)

  const triggerTransition = useCallback(() => {
    if (hasTriggeredRef.current) return
    hasTriggeredRef.current = true

    setPhase('ZOOM_OUT')
    if (onStartTransition) {
      onStartTransition()
    }

    // After zoom-out and opacity animation completes (750ms), notify parent to unmount
    setTimeout(() => {
      onComplete?.()
    }, 750)
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
      className={`intro ${phase === 'ZOOM_OUT' ? 'intro--zoom-out' : ''}`}
      id="intro-sequence"
    >
      {/* Zooming Camera Viewport: contains marquee carousel ribbon and centered eye photo */}
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

        {/* Eye image: sits in front of the marquee */}
        <img
          src={homeEye}
          alt="Rodrigo Santos Portfolio"
          className="intro__bg-img"
          fetchPriority="high"
          loading="eager"
        />

        {/* Center trigger — clicking in the center of the photo (the eye) starts the animation */}
        <button
          type="button"
          className="intro__center-trigger"
          onClick={triggerTransition}
          aria-label="Click to enter portfolio"
          id="center-photo-trigger"
        />
      </div>

      {/* Header — Take a look */}
      <div className="intro__text">
        <h1 className="intro__heading">Take a look</h1>
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
