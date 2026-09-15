import { useState } from 'react'
import './Sticker.css'

export default function Sticker({
  project,
  indexInRow = 0,
  rowDelay = 0.2,
  cameraZ = 0,
  onSelect,
}) {
  const [isHovered, setIsHovered] = useState(false)
  const { name, sticker, position, size, level } = project

  // Calculate relative depth to camera focal plane
  const itemZ = position.z || 0
  const relZ = itemZ + cameraZ
  // Once the sticker has passed behind the camera viewpoint, disable pointer events immediately
  const isBehind = relZ > 70
  const dist = Math.abs(relZ)

  // Depth of Field (DoF) calculation: rich, cinematic bokeh for distant planes
  let blur = 0
  let opacity = 1
  let brightness = 1

  if (isBehind) {
    // Object has passed behind the camera
    const behindDist = relZ - 50
    blur = Math.min(32, 6 + behindDist * 0.18)
    opacity = Math.max(0, 1 - behindDist * 0.015)
  } else if (cameraZ <= 80) {
    // HERO TITLE MODE: Camera is at the initial title view (Z ≈ 0)
    // Background stickers must be heavily diffused to keep focus on Rodrigo Santos
    const depthFactor = Math.min(1, Math.max(0, (dist - 150) / 700))
    blur = 22 + depthFactor * 14
    opacity = Math.max(0.3, 0.65 - depthFactor * 0.3)
    brightness = 0.95
  } else if (dist <= 80) {
    // Sharp in-focus plane
    blur = 0
    opacity = 1
    brightness = 1
  } else if (dist <= 480) {
    // Mid distance DoF: progressive cinematic softening
    const factor = (dist - 80) / 400
    blur = factor * 16.5
    opacity = 1 - factor * 0.22
    brightness = 1 - factor * 0.04
  } else {
    // Far background DoF: deep, creamy bokeh blur
    const factor = Math.min(1, (dist - 480) / 1100)
    blur = 16.5 + factor * 21.5
    opacity = Math.max(0.22, 0.78 - factor * 0.48)
    brightness = 0.96 - factor * 0.08
  }

  // Hover override: snapping sharply into focus
  if (isHovered && !isBehind) {
    blur = 0
    opacity = 1
    brightness = 1.08
  }

  // ----------------------------------------------------
  // WIDE-ANGLE LENS (GRAN ANGULAR) DEFORMATION
  // In a wide-angle lens, as objects approach the camera:
  // - Peripheral anamorphic stretching (stretching outwards towards edges)
  // - Radial barrel push away from optical axis (center of viewport)
  // - Spherical lens dome 3D rotation (tilting tangentially to lens curve)
  // - Corner shearing & internal focal perspective warping
  // ----------------------------------------------------
  const normX = ((position.x || 50) - 50) / 50 // Normalized X (-1 to +1 from optical center)
  const normY = ((position.y || 50) - 50) / 50 // Normalized Y (-1 to +1 from optical center)

  // In the initial hero title view (cameraZ <= 80), keep background stickers calm
  const isHeroIntro = cameraZ <= 80

  // Lens proximity factor: kicks in as camera approaches sticker (relZ > -520px)
  // Accelerates non-linearly as it reaches focal plane (relZ ≈ 0px) and passes lens (relZ > 0)
  const approach = isHeroIntro ? 0 : Math.max(0, (relZ + 520) / 520)
  const wideAngleFactor = Math.min(2.2, Math.pow(approach, 1.7))

  // 1. Radial outward push (barrel deflection away from center) — reduced to half
  const lensPushX = normX * wideAngleFactor * 27
  const lensPushY = normY * wideAngleFactor * 17

  // 2. Anamorphic stretch (elongation along the radial vector) — reduced to half
  const stretchX = 1 + wideAngleFactor * (0.08 + Math.abs(normX) * 0.22)
  const stretchY = 1 + wideAngleFactor * (0.045 + Math.abs(normY) * 0.14)

  // 3. Spherical lens dome 3D rotation — reduced to half
  const lensRotY = normX * wideAngleFactor * 14 // Tilts outward to the sides
  const lensRotX = -normY * wideAngleFactor * 9.5 // Tilts along vertical dome
  const lensRotZ = normX * normY * wideAngleFactor * 8 // Tangential roll

  // 4. Trapezoidal shear / wide-angle corner distortion — reduced to half
  const lensSkewX = -normX * wideAngleFactor * 4
  const lensSkewY = normY * wideAngleFactor * 3.5

  // Hover magnification factor
  const hoverScale = isHovered ? 1.15 : 1

  const transform = [
    `translate3d(calc(-50% + ${lensPushX.toFixed(1)}px), calc(-50% + ${lensPushY.toFixed(1)}px), ${itemZ}px)`,
    `rotateY(${lensRotY.toFixed(1)}deg)`,
    `rotateX(${lensRotX.toFixed(1)}deg)`,
    `rotateZ(${lensRotZ.toFixed(1)}deg)`,
    `skew(${lensSkewX.toFixed(1)}deg, ${lensSkewY.toFixed(1)}deg)`,
    `scale3d(${(stretchX * hoverScale).toFixed(3)}, ${(stretchY * hoverScale).toFixed(3)}, 1)`,
  ].join(' ')

  // Central resource is always placed behind lateral resources
  const isCenter = Math.abs((position.x || 50) - 50) < 12
  // Dynamic focal priority: the closer the sticker is to the focal plane (dist = 0),
  // the higher its zIndex priority in the visual stacking context.
  const focalPriority = Math.max(1, Math.round(60 - dist * 0.04))
  const calculatedZIndex = isCenter ? focalPriority - 6 : focalPriority + 6

  const style = {
    left: `${position.x}%`,
    top: `${position.y}%`,
    transform,
    filter: `blur(${blur.toFixed(1)}px) brightness(${brightness.toFixed(2)})`,
    opacity: opacity.toFixed(2),
    visibility: isBehind || opacity < 0.05 ? 'hidden' : 'visible',
    pointerEvents: isBehind || opacity < 0.12 ? 'none' : 'auto',
    cursor: isBehind || opacity < 0.12 ? 'default' : 'pointer',
    zIndex: isHovered && !isBehind ? 95 : calculatedZIndex,
  }

  // Inner wide-angle perspective warp on the sticker artwork itself — reduced to half
  const innerWarpStyle = {
    transform: `perspective(440px) rotateY(${(normX * wideAngleFactor * 7.5).toFixed(1)}deg) rotateX(${(-normY * wideAngleFactor * 6.5).toFixed(1)}deg)`,
    transformStyle: 'preserve-3d',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <button
      className={`sticker ${isHovered ? 'sticker--hovered' : ''}`}
      style={style}
      id={`sticker-${project.id}`}
      onClick={(e) => {
        e.stopPropagation()
        if (isBehind || opacity < 0.12) return
        onSelect(project)
      }}
      onMouseDown={(e) => {
        e.stopPropagation()
      }}
      onPointerDown={(e) => {
        e.stopPropagation()
      }}
      onMouseEnter={() => {
        if (!isBehind && opacity >= 0.12) setIsHovered(true)
      }}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Proyecto ${name} (Plano ${level})`}
    >
      <div
        className="sticker__anim-wrapper"
        style={{
          animationDelay: `${(rowDelay + indexInRow * 0.09).toFixed(2)}s`,
        }}
      >
        <div className="sticker__lens-warp" style={innerWarpStyle}>
          <img
            src={sticker}
            alt={name}
            className="sticker__img"
            style={{ width: `${size || 215}px` }}
            draggable={false}
          />
        </div>
      </div>
    </button>
  )
}
