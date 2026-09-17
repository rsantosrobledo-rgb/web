import EditorialShowcase from '../EditorialShowcase/EditorialShowcase.jsx'

export default function StickerBoard({ projects, onSelectProject }) {
  return (
    <EditorialShowcase
      projects={projects}
      onSelectProject={onSelectProject}
    />
  )
}

