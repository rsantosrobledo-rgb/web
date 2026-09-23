import { useState, useCallback, useEffect } from 'react'
import IntroSequence from './components/IntroSequence/IntroSequence.jsx'
import StickerBoard from './components/StickerBoard/StickerBoard.jsx'
import CurriculumVitae from './components/CurriculumVitae/CurriculumVitae.jsx'
import projects from './data/projects.js'

export default function App() {
  const [showCV, setShowCV] = useState(() => window.location.hash === '#cv')
  const [introComplete, setIntroComplete] = useState(() => window.location.hash === '#cv')
  const [showIntro, setShowIntro] = useState(() => window.location.hash !== '#cv')
  const [introKey, setIntroKey] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)

  // Listen to hash changes (#cv <-> default)
  useEffect(() => {
    const handleHash = () => {
      const isCV = window.location.hash === '#cv'
      setShowCV(isCV)
      if (isCV) {
        setIntroComplete(true)
        setShowIntro(false)
      }
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
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
