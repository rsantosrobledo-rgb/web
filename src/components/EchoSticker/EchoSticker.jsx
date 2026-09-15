import './EchoSticker.css'

export default function EchoSticker({ echo, cameraZ = 0 }) {
  const { sticker, x, y, z, size, rotation, baseOpacity } = echo

  // Relative depth to camera focal plane
  const relZ = z + cameraZ
  const isBehind = relZ > 140
  const dist = Math.abs(relZ)

  let blur = 6
  let opacity = baseOpacity

  if (isBehind) {
    const behindDist = relZ - 120
    blur = Math.min(28, 8 + behindDist * 0.16)
    opacity = Math.max(0, baseOpacity * (1 - behindDist * 0.015))
  } else if (cameraZ <= 80) {
    // Initial hero view (Z = 0)
    const depthFactor = Math.min(1, Math.max(0, (dist - 100) / 800))
    blur = 6 + depthFactor * 8
    opacity = baseOpacity * 1.1
  } else if (dist <= 160) {
    // Closest to camera focal plane
    blur = 2
    opacity = baseOpacity * 1.3
  } else {
    // Progressive deep background blur
    const factor = Math.min(1, (dist - 160) / 950)
    blur = 4.5 + factor * 14
    opacity = Math.max(0.06, baseOpacity * (1 - factor * 0.35))
  }

  if (opacity <= 0.01) return null

  // Wide-angle lens (gran angular) deformation — reduced to half
  const normX = ((x || 50) - 50) / 50
  const normY = ((y || 50) - 50) / 50
  const isHeroIntro = cameraZ <= 80
  const approach = isHeroIntro ? 0 : Math.max(0, (relZ + 520) / 520)
  const wideAngleFactor = Math.min(2.0, Math.pow(approach, 1.7))

  const lensPushX = normX * wideAngleFactor * 21
  const lensPushY = normY * wideAngleFactor * 13
  const stretchX = 1 + wideAngleFactor * (0.06 + Math.abs(normX) * 0.18)
  const stretchY = 1 + wideAngleFactor * (0.035 + Math.abs(normY) * 0.11)
  const rotY = normX * wideAngleFactor * 11
  const rotX = -normY * wideAngleFactor * 8
  const rotZ = (rotation || 0) + normX * normY * wideAngleFactor * 7
  const skewX = -normX * wideAngleFactor * 3

  const transform = [
    `translate3d(calc(-50% + ${lensPushX.toFixed(1)}px), calc(-50% + ${lensPushY.toFixed(1)}px), ${z}px)`,
    `rotateY(${rotY.toFixed(1)}deg)`,
    `rotateX(${rotX.toFixed(1)}deg)`,
    `rotateZ(${rotZ.toFixed(1)}deg)`,
    `skewX(${skewX.toFixed(1)}deg)`,
    `scale3d(${stretchX.toFixed(3)}, ${stretchY.toFixed(3)}, 1)`,
  ].join(' ')

  const style = {
    left: `${x}%`,
    top: `${y}%`,
    transform,
    filter: `blur(${blur.toFixed(1)}px) grayscale(0.12)`,
    opacity: opacity.toFixed(3),
    width: `${size}px`,
  }

  return (
    <div className="echo-sticker" style={style} aria-hidden="true">
      <img
        src={sticker}
        alt=""
        className="echo-sticker__img"
        draggable={false}
      />
    </div>
  )
}
