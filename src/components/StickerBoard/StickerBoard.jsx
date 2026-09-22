import EditorialShowcase from '../EditorialShowcase/EditorialShowcase.jsx'

export default function StickerBoard({ projects, onSelectProject, onGoHome }) {
  return (
    <EditorialShowcase
      projects={projects}
      onSelectProject={onSelectProject}
      onGoHome={onGoHome}
    />
  )
}

