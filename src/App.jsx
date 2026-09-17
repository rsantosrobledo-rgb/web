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

  // Preload project stickers and home video in background while intro is playing
  useEffect(() => {
    projects.forEach((p) => {
      const img = new Image()
      img.src = p.sticker
    })
    const video = document.createElement('video')
    video.src = '/home.webm'
    video.preload = 'auto'
  }, [])

  const handleIntroComplete = useCallback(() => {
    // Mount board immediately under intro so entity matches seamlessly
    setIntroComplete(true)
    // After intro finishes fading out (0.5s), unmount it
    setTimeout(() => {
      setShowIntro(false)
    }, 600)
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
      {/* Intro sequence — sits on top (z-index: 200), fades out when done */}
      {showIntro && (
        <IntroSequence key={introKey} onComplete={handleIntroComplete} />
      )}

      {/* Sticker board — revealed when intro completes */}
      {introComplete && (
        <div className="board-reveal board-reveal--visible">
          <StickerBoard
            projects={projects}
            onSelectProject={setSelectedProject}
          />
        </div>
      )}
    </>
  )
}
