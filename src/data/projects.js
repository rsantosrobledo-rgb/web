import sticker5w from '../assets/stickers/5w.png'
import sticker8M from '../assets/stickers/8M.png'
import stickerAmeba from '../assets/stickers/ameba.png'
import stickerAwake from '../assets/stickers/awake.png'
import stickerChristmas from '../assets/stickers/christmas.png'
import stickerDecoding from '../assets/stickers/decoding.png'
import stickerDesert from '../assets/stickers/desert.png'
import stickerHelios from '../assets/stickers/helios.png'
import stickerHybrid from '../assets/stickers/hybrid.png'
import stickerMach from '../assets/stickers/mach.png'
import stickerMazda from '../assets/stickers/mazda.png'
import stickerSiever from '../assets/stickers/siever.png'
import stickerThatsNoise from '../assets/stickers/thats noise.png'

const projects = [
  // --- PLANO 1 ---
  {
    id: 1,
    name: 'Decoding Culture',
    category: 'Creative Direction · Campaign & Event',
    year: '2025',
    description: 'Creative and conceptual direction for a contemporary campaign. Deconstruction and reinterpretation of urban visual codes to articulate a disruptive, forward-thinking brand narrative.',
    sticker: stickerDecoding,
    level: 1,
    position: { x: 20, y: 56, z: -700 },
    size: 420,
    videoEmbed: '/proyectos/decoding media/Teaser_presentacion_soft.mp4',
    secondaryMedia: [
      { id: 'dec-1', type: 'image', src: '/proyectos/decoding media/cartel.png' },
      { id: 'dec-2', type: 'image', src: '/proyectos/decoding media/logo evento.png' },
      { id: 'dec-3', type: 'image', src: '/proyectos/decoding media/JL.png' },
      { id: 'dec-4', type: 'image', src: '/proyectos/decoding media/Untitled.png' },
    ],
  },
  {
    id: 2,
    name: 'Ameba Studios',
    category: 'Creative Direction · Global Identity & Branding',
    year: '2024',
    description: 'Comprehensive creative direction for the relaunch of Ameba Studios. Defining the conceptual vision, design universe, brand tone of voice, and art direction across all touchpoints.',
    sticker: stickerAmeba,
    level: 1,
    position: { x: 50, y: 43, z: -760 },
    size: 440,
    videoEmbed: 'https://www.youtube.com/embed/rP8g-CrPobo?si=D6gHJHT0hezx2NQk',
    secondaryMedia: [],
  },
  {
    id: 3,
    name: 'Christmas Chronicles',
    category: 'Creative Direction · Film & Holiday Campaign',
    year: '2026',
    description: 'Making Science 2026 holiday campaign. Narrative conceptualization, cinematic tone, and staging connecting with audiences through warmth, humor, and human innovation.',
    sticker: stickerChristmas,
    level: 1,
    position: { x: 80, y: 56, z: -700 },
    size: 410,
    videoEmbed: 'https://www.youtube.com/embed/zswd19kHTdU?si=n3qoIPd1om-tR7J5',
    secondaryMedia: [],
  },

  // --- PLANO 2 ---
  {
    id: 4,
    name: '5W of Marketing',
    category: 'Creative Direction · Global Event & Experience',
    year: '2025',
    description: 'Creative direction for the Making Science annual flagship event, coordinating talent, messaging, and high-impact audiovisual resources.',
    sticker: sticker5w,
    level: 2,
    position: { x: 21, y: 56, z: -1380 },
    size: 420,
    videoEmbed: 'https://www.youtube.com/embed/QScPYHLlSbA?si=kO0wBLo_6vtEyLaR',
    secondaryMedia: [],
  },
  {
    id: 5,
    name: 'Mazda Exclusive Days',
    category: 'Creative Direction · Case Study',
    year: '2025',
    description: 'A success case study film crafted for Mazda Spain.',
    sticker: stickerMazda,
    level: 2,
    position: { x: 50, y: 43, z: -1440 },
    size: 410,
    videoEmbed: '/proyectos/Mazda/5. Mazda Exclusive Days - Eficacia_VF.mp4',
    secondaryMedia: [],
  },
  {
    id: 6,
    name: "That's Noise",
    category: 'Creative Direction · Cannes 2026',
    year: '2026',
    description: "Creative direction for Making Science's debut at Cannes 2026. Creation of the 'That's Noise' concept, driving the visual strategy, bold disruptive tone, and high-impact multimedia assets.",
    sticker: stickerThatsNoise,
    level: 2,
    position: { x: 79, y: 56, z: -1380 },
    size: 450,
    videoEmbed: 'https://www.youtube.com/embed/niXm3XkXzk4?si=zfVG_CWhNCEuEU2l',
    secondaryMedia: [],
  },

  // --- PLANO 3 ---
  {
    id: 7,
    name: 'Helios AI Factory',
    category: 'Creative Direction · Storytelling & Visual Strategy',
    year: '2024',
    description: 'Visual storytelling and brand experience development for the Helios Partner tool. Translating advanced technology capabilities into an approachable, aspirational, and memorable brand.',
    sticker: stickerHelios,
    level: 3,
    position: { x: 21, y: 56, z: -2060 },
    size: 420,
    videoEmbed: 'https://www.youtube.com/embed/R5YrakYxFjw?si=an-bG28bkL58kxwn',
    secondaryMedia: [],
  },
  {
    id: 8,
    name: '8M Equal Voice',
    category: 'Creative Direction · Social Impact Campaign',
    year: '2025',
    description: 'Making Science 2025 International Women’s Day campaign. A contemporary visual narrative built with sensitivity, empowerment, and graphic strength.',
    sticker: sticker8M,
    level: 3,
    position: { x: 50, y: 43, z: -2120 },
    size: 410,
    videoEmbed: 'https://www.youtube.com/embed/u42Nvr0U9y0?si=nl7jbAgi6vl8BQ4F',
    secondaryMedia: [],
  },
  {
    id: 9,
    name: 'Siever Design Core',
    category: 'Creative Direction · Visual Identity & Digital Product',
    year: '2024',
    description: 'Visual identity and creative asset development for the Siever digital product tool.',
    sticker: stickerSiever,
    level: 3,
    position: { x: 79, y: 56, z: -2060 },
    size: 420,
    videoEmbed: 'https://www.youtube.com/embed/Y36_MxJxmQE?si=fh3gws95xcH5Hyeq',
    secondaryMedia: [],
  },

  // --- PLANO 4 ---
  {
    id: 10,
    name: 'Mach Food Branding',
    category: 'Creative Direction · Degree Thesis (TFG)',
    year: '2023',
    description: 'A speculative brand project developed as a Bachelor’s Degree Final Thesis (TFG) in Communication Studies.',
    sticker: stickerMach,
    level: 4,
    position: { x: 20, y: 56, z: -2740 },
    size: 420,
    videoEmbed: null,
    secondaryMedia: [
      { id: 'mach-1', type: 'image', src: '/proyectos/Mach/logo_mach.jpg' },
      { id: 'mach-2', type: 'image', src: '/proyectos/Mach/ad prod.png' },
      { id: 'mach-3', type: 'image', src: '/proyectos/Mach/abuela ad 2.png' },
      { id: 'mach-4', type: 'image', src: '/proyectos/Mach/ameba-Dutch_angle_close_up.jpg' },
      { id: 'mach-5', type: 'image', src: '/proyectos/Mach/ameba-eye_level_medium_shot.jpg' },
    ],
  },
  {
    id: 11,
    name: 'Awake Venture Studio',
    category: 'Creative Direction & Film · Venture Studio',
    year: '2025',
    description: 'Audiovisual creative development for Awake Venture Studio. Crafting a distinctive, cinematic aesthetic to project the studio’s entrepreneurial ecosystem and talent.',
    sticker: stickerAwake,
    level: 4,
    position: { x: 50, y: 43, z: -2800 },
    size: 380,
    videoEmbed: 'https://www.youtube.com/embed/yOK8O5pV8bQ?si=yyDovq7dmFql6oHU',
    secondaryMedia: [],
  },
  {
    id: 12,
    name: 'Hybrid Intelligence',
    category: 'Creative Direction · Global Event & 3D',
    year: '2026',
    description: 'Making Science 2026 annual flagship event. Visual and narrative conceptualization exploring the synergy between human talent and artificial intelligence.',
    sticker: stickerHybrid,
    level: 4,
    position: { x: 80, y: 56, z: -2740 },
    size: 410,
    videoEmbed: 'https://www.youtube.com/embed/lgGXCguwf1U?si=gvX4rzRekyO_QM2p',
    secondaryMedia: [
      { id: 'hyb-1', type: 'image', src: '/proyectos/Hybrid intelligence/FS_2026_01.jpeg' },
      { id: 'hyb-2', type: 'image', src: '/proyectos/Hybrid intelligence/FS_2026_02.png' },
      { id: 'hyb-3', type: 'image', src: '/proyectos/Hybrid intelligence/FS_2026_06 (1).jpeg' },
      { id: 'hyb-4', type: 'video', src: '/proyectos/Hybrid intelligence/Teaser2_Flagship_2026_v01.webm' },
    ],
  },
]

export default projects
