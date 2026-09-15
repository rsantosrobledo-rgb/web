import { useState, useCallback, useEffect } from 'react'
import IntroSequence from './components/IntroSequence/IntroSequence.jsx'
import StickerBoard from './components/StickerBoard/StickerBoard.jsx'
import projects from './data/projects.js'

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [introKey, setIntroKey] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)

  // Preload project stickers in background while intro is playing
  useEffect(() => {
    projects.forEach((p) => {
      const img = new Image()
      img.src = p.sticker
    })
  }, [])

  const handleIntroComplete = useCallback(() => {
    // Mount board immediately under intro so entity matches seamlessly
    setIntroComplete(true)
    // After intro finishes fading out (0.5s), unmount it
    setTimeout(() => {
      setShowIntro(false)
    }, 600)
  }, [])

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
