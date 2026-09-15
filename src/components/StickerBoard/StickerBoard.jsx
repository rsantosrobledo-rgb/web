import { useState, useEffect, useCallback, useRef } from 'react'
import entityBack from '../../assets/entity_back.png'
import EditorialShowcase from '../EditorialShowcase/EditorialShowcase.jsx'
import './StickerBoard.css'

export default function StickerBoard({ projects, onSelectProject }) {
  const [scrollProgress, setScrollProgress] = useState(0) // 0 = Seated figure, 1 = Editorial showcase
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)
  const boardRef = useRef(null)
  const editorialScrollRef = useRef(null)

  // 1. Mouse wheel handling
  const handleWheel = useCallback((e) => {
    // If a project detail is open, do not handle wheel in board (it belongs to project detail)
    if (document.querySelector('.project-detail')) {
      return
    }

    // If transitioning from hero to editorial showcase:
    if (currentProgressRef.current < 0.92) {
      e.preventDefault()
      const delta = e.deltaY * 0.0022
      targetProgressRef.current = Math.max(0, Math.min(1, targetProgressRef.current + delta))
    }
  }, [])

  useEffect(() => {
    const el = boardRef.current
    if (!el) return
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel])

  // 2. Gentle mouse tilt during hero view
  const handleMouseMove = useCallback((e) => {
    if (currentProgressRef.current > 0.6) return
    const xRatio = (e.clientX / window.innerWidth) - 0.5
    const yRatio = (e.clientY / window.innerHeight) - 0.5
    setTilt({
      x: yRatio * -4,
      y: xRatio * 5,
    })
  }, [])

  // 3. Smooth animation loop
  useEffect(() => {
    let animId
    const loop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current
      if (Math.abs(diff) > 0.001) {
        currentProgressRef.current += diff * 0.12
        setScrollProgress(currentProgressRef.current)
      }
      animId = requestAnimationFrame(loop)
    }
    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [])

  // 4. Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.querySelector('.project-detail')) return

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        if (targetProgressRef.current < 0.95) {
          e.preventDefault()
          targetProgressRef.current = 1
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // 5. Touch swipe handling for mobile / tablets
  const touchStartY = useRef(null)
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
  }
  const handleTouchMove = (e) => {
    if (document.querySelector('.project-detail')) return
    if (touchStartY.current === null) return
    const deltaY = touchStartY.current - e.touches[0].clientY

    if (currentProgressRef.current < 0.92) {
      if (Math.abs(deltaY) > 10) {
        targetProgressRef.current = deltaY > 0 ? 1 : 0
      }
    }
  }

  // Quick navigation helpers
  const advanceToEditorial = () => {
    targetProgressRef.current = 1
  }
  const returnToHero = () => {
    targetProgressRef.current = 0
  }

  const isPassed = scrollProgress > 0.5
  const isEditorialActive = scrollProgress > 0.75

  return (
    <div
      className="board"
      id="sticker-board"
      ref={boardRef}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >

      {/* ========================================================
          HERO TITLE: Centered over seated person
          Glides up and fades away when user scrolls down
          ======================================================== */}
      <div
        className="board__hero-title-wrap"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 2.8),
          transform: `translate(-50%, calc(-50% - ${scrollProgress * 120}px))`,
          pointerEvents: scrollProgress > 0.2 ? 'none' : 'auto',
        }}
      >
        <h1 className="board__hero-name">RODRIGO SANTOS</h1>
        <p className="board__hero-sub">CREATIVE DIRECTION</p>

        {/* Actionable scroll cue */}
        <button
          type="button"
          className="board__scroll-cue"
          onClick={advanceToEditorial}
          aria-label="Explore work"
        >
          <span className="board__scroll-text">EXPLORE WORK</span>
          <svg className="board__scroll-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 13l5 5 5-5M12 6v12" />
          </svg>
        </button>
      </div>

      {/* ========================================================
          ESCORZO ENTITY (PERSON SEATED FROM BEHIND)
          Starts at foreground chair escorzo;
          as you scroll forward, it sinks, zooms past and stays behind.
          ======================================================== */}
      <div
        className="board__entity"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 2.2),
          transform: `translateX(-50%) translate3d(${tilt.y * -1.2}px, calc(${tilt.x * -1.0}px + ${scrollProgress * 260}px), 0) scale(${1 + scrollProgress * 0.42})`,
          visibility: scrollProgress > 0.55 ? 'hidden' : 'visible',
          pointerEvents: 'none',
        }}
      >
        <img
          src={entityBack}
          alt="Rodrigo Santos back view"
          className="board__entity-img"
          draggable={false}
        />
      </div>

      {/* ========================================================
          EDITORIAL SHOWCASE: High-contrast serif typography + stickers
          Emerges smoothly as the person is left behind.
          ======================================================== */}
      <div
        className="board__editorial-wrap"
        ref={editorialScrollRef}
        style={{
          opacity: Math.min(1, Math.max(0, (scrollProgress - 0.25) * 1.55)),
          transform: `translateY(${(1 - scrollProgress) * 70}px)`,
          pointerEvents: isEditorialActive ? 'auto' : 'none',
          visibility: scrollProgress < 0.2 ? 'hidden' : 'visible',
        }}
      >
        <EditorialShowcase
          projects={projects}
          onSelectProject={onSelectProject}
          onReturnToHero={returnToHero}
        />
      </div>
    </div>
  )
}
