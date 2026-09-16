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
import stickerRobot from '../assets/stickers/robot.png'
import stickerGeosphere from '../assets/stickers/geosphere.png'
import stickerThatsNoise from '../assets/stickers/thats noise.png'

/**
 * PROYECTOS DEL PORTFOLIO
 * Organizados por FILAS (Row 1 a Row 5).
 * 
 * Rodrigo es el máximo responsable creativo y artífice de la dirección
 * técnica (CGI, 3D, IA) y guion / script creation en todos los proyectos de vídeo.
 * 
 * En Inspiración y Moodboard SÓLO se muestran las imágenes exactas
 * depositadas dentro de las carpetas de moodboard creadas por el usuario.
 */
const projects = [
  // ========================================================
  // FILA 1 — Drift hacia la izquierda
  // ========================================================
  {
    id: 1,
    row: 1,
    order: 1,
    name: 'Decoding Culture',
    category: 'Creative Direction · Campaign & Event',
    year: '2026',
    description: 'Creación de guion y dirección creativa integral por Rodrigo Santos Robledo. Deconstrucción y reinterpretación de códigos visuales urbanos para articular una narrativa de marca disruptiva y vanguardista.',
    story: {
      dream: 'Bridge the gap between a tech brand and contemporary urban culture through an authentic visual narrative.',
      onGround: 'Original scriptwriting combined with street typography, kinetic dynamics, and editorial layouts into a unified event design.',
      harvest: 'A distinct visual identity and event system aligning contemporary street codes with brand communication.',
    },
    processComparison: {
      beforeLabel: 'Cultural Movement & Street Moodboard',
      moodboard: [
        '/proyectos/decoding media/Moodboard/3433584c5f02a685e612a63d9ad3ad9b.jpg',
        '/proyectos/decoding media/Moodboard/1518ecf132a48225b8cc50ee61c90a91.jpg',
        '/proyectos/decoding media/Moodboard/descarga (6).png',
      ],
      after: '/proyectos/decoding media/cartel.png',
      afterLabel: 'Final Event Key Visual & Poster',
    },
    sticker: stickerDecoding,
    stickerConfig: {
      rotate: -4,
      hoverRotate: -2,
      width: 'clamp(115px, 9.8vw, 194px)',
      overlap: '-14px',
    },
    videoEmbed: '/proyectos/decoding media/Teaser_presentacion_soft.mp4',
    secondaryMedia: [
      { id: 'dec-1', type: 'image', src: '/proyectos/decoding media/cartel.png' },
      { id: 'dec-2', type: 'image', src: '/proyectos/decoding media/logo evento.png' },
      { id: 'dec-3', type: 'image', src: '/proyectos/decoding media/JL.png' },
      { id: 'dec-4', type: 'image', src: '/proyectos/decoding media/Untitled.png' },
    ],
  },
  {
    id: 4,
    row: 1,
    order: 2,
    name: '5W of Marketing',
    category: 'Creative Direction · Flagship Event',
    year: '2025',
    description: 'Creación de guion y dirección creativa para el evento insignia de Making Science. Coordinación de narrativa, ritmo audiovisual y recursos de alto impacto escénico.',
    story: {
      dream: 'Translate core marketing concepts into a dynamic, cinematic stage experience for event attendees.',
      onGround: 'Authored the central script based on journalism’s 5 Ws, directing stage screens, kinetic typography, and motion pacing.',
      harvest: 'A cohesive stage and motion package that gave clear visual rhythm to the presentation and event screens.',
    },
    sticker: sticker5w,
    stickerConfig: {
      rotate: 6,
      hoverRotate: 3,
      width: 'clamp(108px, 8.9vw, 180px)',
      overlap: '-12px',
    },
    videoEmbed: 'https://www.youtube.com/embed/QScPYHLlSbA?si=kO0wBLo_6vtEyLaR&autoplay=1&playsinline=1',
    secondaryMedia: [],
  },

  // ========================================================
  // FILA 2 — Drift hacia la derecha
  // ========================================================
  {
    id: 3,
    row: 2,
    order: 1,
    name: 'Christmas Chronicles',
    category: 'Creative Direction · Holiday Film',
    year: '2026',
    description: 'Creación de guion y dirección creativa para la campaña navideña de Making Science. Conceptualización narrativa, tono cinematográfico y puesta en escena con humor, calidez e innovación.',
    story: {
      dream: 'Create a holiday story that connects through humor and warmth rather than conventional advertising tropes.',
      onGround: 'Authored the narrative script and directed the staging, balancing human warmth with lighthearted comedic moments.',
      harvest: 'A character-driven holiday piece shared across company digital channels.',
    },
    sticker: stickerChristmas,
    stickerConfig: {
      rotate: -4,
      hoverRotate: -2,
      width: 'clamp(115px, 9.8vw, 194px)',
      overlap: '-14px',
    },
    videoEmbed: 'https://www.youtube.com/embed/zswd19kHTdU?si=n3qoIPd1om-tR7J5&autoplay=1&playsinline=1',
    secondaryMedia: [],
  },
  {
    id: 6,
    row: 2,
    order: 2,
    name: "That's Noise",
    category: 'Creative Direction · Cannes 2026',
    year: '2026',
    description: "Creación del guion manifiesto y dirección creativa para el debut de Making Science en Cannes 2026. Creación del concepto 'That's Noise', dirección visual y piezas multimedia de alto impacto.",
    story: {
      dream: 'Present a bold, focused creative statement for Making Science’s presence at Cannes.',
      onGround: 'Wrote the "That’s Noise" manifesto script focusing on substance over buzzwords, paired with bold typographic direction.',
      harvest: 'A punchy manifesto film and visual package created for international event screens.',
    },
    sticker: stickerThatsNoise,
    stickerConfig: {
      rotate: 5,
      hoverRotate: 2,
      width: 'clamp(122px, 10.1vw, 200px)',
      overlap: '-14px',
    },
    videoEmbed: 'https://www.youtube.com/embed/niXm3XkXzk4?si=zfVG_CWhNCEuEU2l&autoplay=1&playsinline=1',
    secondaryMedia: [],
  },
  {
    id: 14,
    row: 2,
    order: 3,
    name: 'Mazda Exclusive Days',
    category: 'Creative Direction · Case Study Film',
    year: '2026',
    description: 'Creación de guion narrativo y dirección creativa de la película de caso de éxito para Mazda España, documentando la eficacia comercial de las jornadas de puertas abiertas.',
    story: {
      dream: 'Document the open-doors commercial initiative with an engaging, documentary-style case film.',
      onGround: 'Wrote the script structure and directed a case film blending driving footage, customer reactions, and dynamic editing.',
      harvest: 'A finished case study video capturing the real-world initiative across participating dealerships.',
    },
    sticker: stickerMazda,
    stickerConfig: {
      rotate: -4,
      hoverRotate: -2,
      width: 'clamp(103px, 8.4vw, 166px)',
      overlap: '-12px',
    },
    videoEmbed: '/proyectos/Mazda/5. Mazda Exclusive Days - Eficacia_VF.mp4',
    secondaryMedia: [],
  },

  // ========================================================
  // FILA 3 — Drift hacia la izquierda
  // ========================================================
  {
    id: 7,
    row: 3,
    order: 1,
    name: 'Helios AI Factory',
    category: 'Creative Direction · Visual Strategy & 3D',
    year: '2026',
    description: 'Creación de guion explicativo y dirección creativa para Helios Partner. Traducción de complejas capacidades algorítmicas en una narrativa visual aspiracional y memorable.',
    story: {
      dream: 'Communicate proprietary technological solutions clearly to partners and prospective clients.',
      onGround: 'Structured the narrative script around an "AI Factory" metaphor, directing motion graphics and visual explanations.',
      harvest: 'A clear visual presentation translating complex technical concepts into accessible storytelling.',
    },
    sticker: stickerHelios,
    stickerConfig: {
      rotate: -4,
      hoverRotate: -2,
      width: 'clamp(115px, 9.5vw, 187px)',
      overlap: '-14px',
    },
    videoEmbed: 'https://www.youtube.com/embed/R5YrakYxFjw?si=an-bG28bkL58kxwn&autoplay=1&playsinline=1',
    secondaryMedia: [],
  },
  {
    id: 2,
    row: 3,
    order: 2,
    name: 'Ameba Studios',
    category: 'Creative Direction · Studio Relaunch & CGI',
    year: '2026',
    description: 'Creación de guion de presentación y dirección creativa integral para el relanzamiento de Ameba Studios. Definición de la visión conceptual, universo de diseño, tono de voz y dirección de arte.',
    story: {
      dream: 'Develop a fresh, contemporary brand identity and visual language for the studio relaunch.',
      onGround: 'Authored the relaunch manifesto and developed an organic visual identity system with 3D elements and motion.',
      harvest: 'A complete visual identity and presentation film defining the studio’s new creative direction.',
    },
    sticker: stickerAmeba,
    stickerConfig: {
      rotate: 5,
      hoverRotate: 2,
      width: 'clamp(122px, 10.1vw, 202px)',
      overlap: '-14px',
    },
    videoEmbed: 'https://www.youtube.com/embed/rP8g-CrPobo?si=D6gHJHT0hezx2NQk&autoplay=1&playsinline=1',
    secondaryMedia: [],
  },
  {
    id: 13,
    row: 3,
    order: 3,
    name: 'Robot Christmas',
    category: 'Creative Direction · Full 3D & Animation',
    year: '2024',
    description: 'Película navideña creada íntegramente en Full 3D. Creación de guion y dirección técnica y artística por Rodrigo Santos Robledo: diseño de personaje, modelado, texturas físicas, iluminación y animación sin IA.',
    story: {
      dream: 'Build a holiday short story centered on an expressive mechanical character.',
      onGround: 'Authored the script and built the entire scene in Full 3D — character modeling, texturing, lighting, and animation without AI.',
      harvest: 'A finished 3D animation piece focused on character expression, lighting, and handcrafted craft.',
    },
    sticker: stickerRobot,
    stickerConfig: {
      rotate: -4,
      hoverRotate: -2,
      width: 'clamp(85px, 6.8vw, 136px)',
      overlap: '-12px',
    },
    videoEmbed: 'https://www.youtube.com/embed/1PqZWPiJ-SQ?si=N3Ww2ItvlCXpTPgr&autoplay=1&playsinline=1',
    secondaryMedia: [],
  },

  // ========================================================
  // FILA 4 — Drift hacia la derecha
  // ========================================================
  {
    id: 5,
    row: 4,
    order: 1,
    name: 'The Desert',
    category: 'Creative Direction · 2D Art & Compositing Film',
    year: '2024',
    description: 'Universo cinematográfico contemplativo creado mediante arte digital 2D y composición avanzada. Cero simulación 3D — Creación de guion y dirección técnica y visual por Rodrigo Santos Robledo: composición por capas, gradación de atmósfera y diseño de movimiento.',
    story: {
      dream: 'Explore human introspection and solitude through a contemplative desert landscape.',
      onGround: 'Wrote the poetic script and built the visual world through 2D digital art, atmospheric lighting, and layered composition — zero 3D simulation.',
      harvest: 'A contemplative audiovisual piece combining layered 2D digital art, atmospheric color grading, and poetic pacing.',
    },
    processComparison: {
      beforeLabel: 'Atmospheric Inspiration & Moodboard',
      moodboard: [
        '/proyectos/desert/Inspiration and moodboard/678d1cdf88e31a63e48b17118fab32ea.jpg',
        '/proyectos/desert/Inspiration and moodboard/44cd992faca7dfaae0ed15c6bfccfd80.jpg',
        '/proyectos/desert/Inspiration and moodboard/8134f2a0a1d2a250447e6124a2ec1ea7.jpg',
        '/proyectos/desert/Inspiration and moodboard/ae495e8fb7fcd8f91ece04bd2495abc2.jpg',
        '/proyectos/desert/Inspiration and moodboard/ee194b8145d36c995cb27a83a9de4e1d.jpg',
      ],
      after: '/proyectos/desert/desert_final.webm',
      afterLabel: 'Final 2D & Composited Film',
      afterType: 'video',
    },
    sticker: stickerDesert,
    stickerConfig: {
      rotate: -5,
      hoverRotate: -2,
      width: 'clamp(103px, 8.4vw, 166px)',
      overlap: '-12px',
    },
    videoEmbed: '/proyectos/desert/desert_final.webm',
    secondaryMedia: [],
  },
  {
    id: 8,
    row: 4,
    order: 2,
    name: '8M Equal Voice',
    category: 'Creative Direction · Social Impact Film',
    year: '2025',
    description: 'Creación de guion narrativo y dirección creativa para la campaña del 8M de Making Science. Una narrativa contemporánea construida con sensibilidad, empoderamiento y fuerza gráfica.',
    story: {
      dream: 'Create a genuine International Women’s Day piece highlighting real voices and experiences in tech.',
      onGround: 'Authored the voiceover script and directed high-contrast portraiture paired with authentic testimonials.',
      harvest: 'A focused, sensitive piece celebrating women in tech through honest storytelling and graphic simplicity.',
    },
    sticker: sticker8M,
    stickerConfig: {
      rotate: 6,
      hoverRotate: 3,
      width: 'clamp(98px, 7.9vw, 158px)',
      overlap: '-12px',
    },
    videoEmbed: 'https://www.youtube.com/embed/u42Nvr0U9y0?si=nl7jbAgi6vl8BQ4F&autoplay=1&playsinline=1',
    secondaryMedia: [],
  },
  {
    id: 9,
    row: 4,
    order: 3,
    name: 'Geo Sphere',
    category: 'Creative Direction · Motion & CGI',
    year: '2026',
    description: 'Guion técnico y dirección creativa por Rodrigo Santos Robledo: exploración de geometría esférica, shaders de cáusticas procedurales, refracción de luz y simulación cinética.',
    story: {
      dream: 'Study light refraction, procedural dispersion, and kinetic movement in 3D geometry.',
      onGround: 'Scripted the procedural animation and developed custom materials for light dispersion and reflective surfaces.',
      harvest: 'A technical visual study exploring real-time materials, caustic light behavior, and kinetic motion.',
    },
    sticker: stickerGeosphere,
    stickerConfig: {
      rotate: -3,
      hoverRotate: 0,
      width: 'clamp(130px, 10.5vw, 205px)',
      overlap: '-14px',
    },
    videoEmbed: '/proyectos/Geo Sphere/compressed-Geo-sphere-v12.mp4',
    secondaryMedia: [],
  },

  // ========================================================
  // FILA 5 — Drift hacia la izquierda
  // ========================================================
  {
    id: 10,
    row: 5,
    order: 1,
    name: 'Mach Food Branding',
    category: 'Creative Direction · Degree Thesis (TFG)',
    year: '2026',
    description: 'Proyecto de marca especulativo desarrollado como Trabajo de Fin de Grado (TFG) en Comunicación. Dirección creativa integral, universo pop retrofuturista, fotografía editorial, packaging y piezas publicitarias.',
    story: {
      dream: 'Develop an energetic, pop-inspired fast-food brand concept for younger audiences.',
      onGround: 'Directed the visual universe across packaging mockups, saturated photography, typography, and promotional pieces.',
      harvest: 'A complete speculative branding project spanning packaging design, editorial photography, and campaign pieces.',
    },
    processComparison: {
      beforeLabel: 'Pop Culture Inspiration & Moodboard',
      moodboard: [
        '/proyectos/Mach/Moodboard/98e9d41f65d2901bb78d311fe01aa962.jpg',
        '/proyectos/Mach/Moodboard/8ea78aeb28f4d8d038b1c10650511928.jpg',
        '/proyectos/Mach/Moodboard/f9d5de69ce98aa808df05127af0f90c8.jpg',
        '/proyectos/Mach/Moodboard/6df288397f8c77ddc22445efc00cfbab.jpg',
        '/proyectos/Mach/Moodboard/descarga (7).png',
      ],
      after: '/proyectos/Mach/ad prod.png',
      afterLabel: 'Final Commercial Campaign',
    },
    sticker: stickerMach,
    stickerConfig: {
      rotate: 5,
      hoverRotate: 2,
      width: 'clamp(98px, 7.9vw, 158px)',
      overlap: '-12px',
    },
    videoEmbed: null,
    secondaryMedia: [
      { id: 'mach-1', type: 'image', src: '/proyectos/Mach/logo_mach.jpg' },
      { id: 'mach-2', type: 'image', src: '/proyectos/Mach/ad prod.png' },
      { id: 'mach-3', type: 'image', src: '/proyectos/Mach/abuela ad 2.png' },
      { id: 'mach-4', type: 'image', src: '/proyectos/Mach/ameba-Dutch_angle_close_up.jpg' },
      { id: 'mach-5', type: 'image', src: '/proyectos/Mach/ameba-eye_level_medium_shot.jpg' },
      { id: 'mach-6', type: 'image', src: '/proyectos/Mach/1000029087.jpg' },
      { id: 'mach-7', type: 'image', src: '/proyectos/Mach/Captura de pantalla 2026-09-16 a las 10.15.11.png' },
      { id: 'mach-8', type: 'image', src: '/proyectos/Mach/Enhance_quality_eliminating_arti…_202605061106.jpeg' },
    ],
  },
  {
    id: 11,
    row: 5,
    order: 2,
    name: 'Awake Venture Studio',
    category: 'Creative Direction · Venture Film',
    year: '2026',
    description: 'Creación de guion y desarrollo audiovisual para Awake Venture Studio por Rodrigo Santos Robledo. Creación de una estética cinematográfica distintiva para proyectar el talento y visión de los fundadores.',
    story: {
      dream: 'Capture the energy, rhythm, and vision of studio founders in a sharp documentary format.',
      onGround: 'Wrote the script and directed high-contrast cinematography highlighting founder moments and architecture.',
      harvest: 'A finished brand piece conveying the studio’s environment and approach to founders and partners.',
    },
    sticker: stickerAwake,
    stickerConfig: {
      rotate: 0,
      hoverRotate: 0,
      width: 'clamp(103px, 8.4vw, 170px)',
      overlap: '-12px',
    },
    videoEmbed: 'https://www.youtube.com/embed/yOK8O5pV8bQ?si=yyDovq7dmFql6oHU&autoplay=1&playsinline=1',
    secondaryMedia: [],
  },
  {
    id: 12,
    row: 5,
    order: 3,
    name: 'Hybrid Intelligence',
    category: 'Creative Direction · AI & 2D Composition Film',
    year: '2026',
    description: 'Película insignia de Making Science. Creación de guion original y dirección creativa por Rodrigo Santos Robledo: integración de modelos generativos de IA con composición visual 2D y postproducción avanzada.',
    story: {
      dream: 'Explore the dialogue between human creative direction and generative tools in a unified film.',
      onGround: 'Authored the narrative screenplay and combined generative visual exploration with meticulous 2D composition and editing.',
      harvest: 'The centerpiece film for the flagship event, integrating narrative pacing, 2D composition, and generative visuals.',
    },
    processComparison: {
      beforeLabel: 'Creative Direction Moodboard & Visual R&D',
      moodboard: [
        '/proyectos/Hybrid intelligence/Inspiration and moodboard/90a9de1aebc125f5907f6615fdff6504.jpg',
        '/proyectos/Hybrid intelligence/Inspiration and moodboard/1eb1b3dc1a910df5efdac7bb8d86cce6.jpg',
        '/proyectos/Hybrid intelligence/Inspiration and moodboard/3c2d4f929430b36d4c2a45af1a0450ca.jpg',
        '/proyectos/Hybrid intelligence/Inspiration and moodboard/Captura de pantalla 2026-09-16 a las 13.19.33.png',
      ],
      after: '/proyectos/Hybrid intelligence/FS_2026_02.png',
      afterLabel: 'Final AI & 2D Composited Key Visual',
    },
    sticker: stickerHybrid,
    stickerConfig: {
      rotate: 6,
      hoverRotate: 3,
      width: 'clamp(98px, 7.9vw, 161px)',
      overlap: '-12px',
    },
    videoEmbed: '/proyectos/Hybrid intelligence/INTRO_Flagship2026.webm',
    secondaryMedia: [
      { id: 'hyb-1', type: 'image', src: '/proyectos/Hybrid intelligence/FS_2026_01.jpeg' },
      { id: 'hyb-2', type: 'image', src: '/proyectos/Hybrid intelligence/FS_2026_02.png' },
      { id: 'hyb-3', type: 'image', src: '/proyectos/Hybrid intelligence/FS_2026_06 (1).jpeg' },
      { id: 'hyb-4', type: 'video', src: '/proyectos/Hybrid intelligence/Teaser2_Flagship_2026_v01.webm' },
      { id: 'hyb-5', type: 'video', src: 'https://www.youtube.com/embed/lgGXCguwf1U?si=gvX4rzRekyO_QM2p&autoplay=1&playsinline=1' },
    ],
  },
]

export default projects
