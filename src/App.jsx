import { useState, useCallback, useEffect } from 'react'
import IntroSequence from './components/IntroSequence/IntroSequence.jsx'
import StickerBoard from './components/StickerBoard/StickerBoard.jsx'
import CurriculumVitae from './components/CurriculumVitae/CurriculumVitae.jsx'
import VirtualCard from './components/VirtualCard/VirtualCard.jsx'
import projects from './data/projects.js'

export default function App() {
  const isInitialHola = () => {
    const path = window.location.pathname.replace(/\/$/, '')
    return path === '/hola' || window.location.hash === '#hola'
  }
  const isInitialHello = () => {
    const path = window.location.pathname.replace(/\/$/, '')
    return path === '/hello' || window.location.hash === '#hello'
  }
  const isInitialCV = () => {
    const path = window.location.pathname.replace(/\/$/, '')
    return path === '/cv' || window.location.hash === '#cv'
  }

  const [showHola, setShowHola] = useState(isInitialHola)
  const [showHello, setShowHello] = useState(isInitialHello)
  const [showCV, setShowCV] = useState(isInitialCV)
  const [introComplete, setIntroComplete] = useState(() => isInitialCV() || isInitialHola() || isInitialHello())
  const [showIntro, setShowIntro] = useState(() => !isInitialCV() && !isInitialHola() && !isInitialHello())
  const [introKey, setIntroKey] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)

  // Listen to hash and location changes
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.replace(/\/$/, '')
      const isHola = path === '/hola' || window.location.hash === '#hola'
      const isHello = path === '/hello' || window.location.hash === '#hello'
      const isCV = path === '/cv' || window.location.hash === '#cv'

      setShowHola(isHola)
      setShowHello(isHello)
      setShowCV(isCV)
      if (isHola || isHello || isCV) {
        setIntroComplete(true)
        setShowIntro(false)
      }
    }
    window.addEventListener('hashchange', handleLocationChange)
    window.addEventListener('popstate', handleLocationChange)
    return () => {
      window.removeEventListener('hashchange', handleLocationChange)
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])

  // Preload project stickers in background while intro is playing
  useEffect(() => {
    projects.forEach((p) => {
      const img = new Image()
      img.src = p.sticker
    })
  }, [])

  const handleIntroStartTransition = useCallback(() => {
    // Mount board immediately under intro so zoom out reveals MY WORK seamlessly
    setIntroComplete(true)
  }, [])

  const handleIntroComplete = useCallback(() => {
    // Cleanly unmount intro after zoom-out and fade out finish
    setShowIntro(false)
  }, [])

  const handleGoHome = useCallback(() => {
    // Reset to the initial home screen with home_real.jpg
    setIntroKey((k) => k + 1)
    setShowIntro(true)
    setTimeout(() => {
      setIntroComplete(false)
    }, 400)
  }, [])

  const handleBackFromCV = useCallback(() => {
    window.location.hash = ''
    setShowCV(false)
    setIntroComplete(true)
    setShowIntro(false)
  }, [])

  if (showHola) {
    return <VirtualCard lang="es" />
  }

  if (showHello) {
    return <VirtualCard lang="en" />
  }

  if (showCV) {
    return <CurriculumVitae onBack={handleBackFromCV} />
  }

  return (
    <>
      {/* Intro sequence — sits on top (z-index: 200), zooms out and fades out when swiped */}
      {showIntro && (
        <IntroSequence
          key={introKey}
          onStartTransition={handleIntroStartTransition}
          onComplete={handleIntroComplete}
        />
      )}

      {/* Sticker board — revealed when intro completes */}
      {introComplete && (
        <div className="board-reveal board-reveal--visible">
          <StickerBoard
            projects={projects}
            onSelectProject={setSelectedProject}
            onGoHome={handleGoHome}
          />
        </div>
      )}
    </>
  )
}
