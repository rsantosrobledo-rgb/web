import { useState, useEffect, useCallback, useRef } from 'react'
import homeReal from '../../assets/home_real.jpg'
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

  return (
    <div
      className={`intro ${phase === 'ZOOM_OUT' ? 'intro--zoom-out' : ''}`}
      id="intro-sequence"
    >
      {/* Zooming Camera Viewport: background photo zooms out on swipe */}
      <div className="intro__camera">
        <img
          src={homeReal}
          alt="Rodrigo Santos Portfolio"
          className="intro__bg-img"
          fetchPriority="high"
          loading="eager"
        />
      </div>

      {/* Text — Take a look */}
      <div className="intro__text">
        <h1 className="intro__heading">Take a look</h1>
      </div>

      {/* Center trigger — clicking in the center of the photo (the eye) starts the animation */}
      <button
        type="button"
        className="intro__center-trigger"
        onClick={triggerTransition}
        aria-label="Click to enter portfolio"
        id="center-photo-trigger"
      />

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
