import sticker5w from '../assets/stickers/5w.webp'
import sticker8M from '../assets/stickers/8M.webp'
import stickerAmeba from '../assets/stickers/ameba.webp'
import stickerAwake from '../assets/stickers/awake.webp'
import stickerChristmas from '../assets/stickers/christmas.webp'
import stickerDecoding from '../assets/stickers/decoding.webp'
import stickerDesert from '../assets/stickers/desert.webp'
import stickerHelios from '../assets/stickers/helios.webp'
import stickerHybrid from '../assets/stickers/hybrid.webp'
import stickerMach from '../assets/stickers/mach.webp'
import stickerGeosphere from '../assets/stickers/geosphere.webp'
import stickerThatsNoise from '../assets/stickers/thats noise.webp'

// Atmospheric echoes / afterimages that populate intermediate depths and peripheral canvas space
export const ECHOES = [
  // --- Zwischenraum 0 -> Plano 1 (-380px to -580px) ---
  {
    id: 'echo-1',
    name: 'Awake Echo',
    sticker: stickerAwake,
    x: 9,
    y: 28,
    z: -420,
    size: 260,
    rotation: -9,
    baseOpacity: 0.22,
  },
  {
    id: 'echo-2',
    name: 'Mach Echo',
    sticker: stickerMach,
    x: 90,
    y: 30,
    z: -480,
    size: 250,
    rotation: 12,
    baseOpacity: 0.20,
  },
  {
    id: 'echo-3',
    name: 'Hybrid Echo',
    sticker: stickerHybrid,
    x: 11,
    y: 74,
    z: -580,
    size: 280,
    rotation: -14,
    baseOpacity: 0.18,
  },

  // --- Zwischenraum Plano 1 -> Plano 2 (-950px to -1250px) ---
  {
    id: 'echo-4',
    name: 'Geo Sphere Echo',
    sticker: stickerGeosphere,
    x: 88,
    y: 72,
    z: -980,
    size: 290,
    rotation: 7,
    baseOpacity: 0.22,
  },
  {
    id: 'echo-5',
    name: 'Decoding Echo',
    sticker: stickerDecoding,
    x: 49,
    y: 18,
    z: -1060,
    size: 260,
    rotation: -6,
    baseOpacity: 0.19,
  },
  {
    id: 'echo-6',
    name: '8M Echo',
    sticker: sticker8M,
    x: 8,
    y: 36,
    z: -1160,
    size: 310,
    rotation: 14,
    baseOpacity: 0.24,
  },
  {
    id: 'echo-7',
    name: 'Christmas Echo',
    sticker: stickerChristmas,
    x: 91,
    y: 40,
    z: -1240,
    size: 270,
    rotation: -11,
    baseOpacity: 0.21,
  },

  // --- Zwischenraum Plano 2 -> Plano 3 (-1650px to -1880px) ---
  {
    id: 'echo-8',
    name: 'Ameba Echo',
    sticker: stickerAmeba,
    x: 12,
    y: 22,
    z: -1680,
    size: 300,
    rotation: 8,
    baseOpacity: 0.22,
  },
  {
    id: 'echo-9',
    name: 'Thats Noise Echo',
    sticker: stickerThatsNoise,
    x: 86,
    y: 25,
    z: -1740,
    size: 320,
    rotation: -13,
    baseOpacity: 0.23,
  },
  {
    id: 'echo-10',
    name: '5W Echo',
    sticker: sticker5w,
    x: 48,
    y: 76,
    z: -1840,
    size: 270,
    rotation: 6,
    baseOpacity: 0.18,
  },

  // --- Zwischenraum Plano 3 -> Horizonte (-2300px to -2550px) ---
  {
    id: 'echo-11',
    name: 'Desert Echo',
    sticker: stickerDesert,
    x: 9,
    y: 65,
    z: -2320,
    size: 290,
    rotation: -7,
    baseOpacity: 0.20,
  },
  {
    id: 'echo-12',
    name: 'Helios Echo',
    sticker: stickerHelios,
    x: 89,
    y: 67,
    z: -2390,
    size: 300,
    rotation: 11,
    baseOpacity: 0.22,
  },
  {
    id: 'echo-13',
    name: 'Mach Far Echo',
    sticker: stickerMach,
    x: 48,
    y: 16,
    z: -2480,
    size: 260,
    rotation: -5,
    baseOpacity: 0.18,
  },

  // --- Horizon Depth Echoes (-2950px to -3200px) ---
  {
    id: 'echo-14',
    name: 'Awake Deep Echo',
    sticker: stickerAwake,
    x: 10,
    y: 33,
    z: -2980,
    size: 330,
    rotation: 15,
    baseOpacity: 0.22,
  },
  {
    id: 'echo-15',
    name: 'Decoding Deep Echo',
    sticker: stickerDecoding,
    x: 90,
    y: 28,
    z: -3060,
    size: 310,
    rotation: -8,
    baseOpacity: 0.20,
  },
  {
    id: 'echo-16',
    name: 'Christmas Deep Echo',
    sticker: stickerChristmas,
    x: 50,
    y: 78,
    z: -3140,
    size: 290,
    rotation: 5,
    baseOpacity: 0.16,
  },
]

export default ECHOES
