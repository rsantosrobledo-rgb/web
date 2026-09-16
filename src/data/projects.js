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
 * Organizados directamente por FILAS (Row 1 a Row 5).
 * Cada proyecto define su fila, orden, configuración visual de sticker,
 * storytelling conciso (Challenge / Concept / Impact) y proceso visual (si aplica).
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
    description: 'Creative and conceptual direction for a contemporary campaign. Deconstruction and reinterpretation of urban visual codes to articulate a disruptive, forward-thinking brand narrative.',
    story: {
      challenge: 'Bridge the divide between a corporate tech brand and genuine contemporary underground culture without feeling contrived.',
      concept: 'Deconstruct raw subcultural visual codes, kinetic typography, and glitch aesthetics into an authoritative, forward-thinking design system.',
      impact: 'Redefined brand perception across creative leaders, establishing a high-energy benchmark summit.',
    },
    processComparison: {
      before: '/proyectos/decoding media/Untitled.png',
      beforeLabel: 'Subcultural Layout Study',
      after: '/proyectos/decoding media/cartel.png',
      afterLabel: 'Final Summit Key Visual',
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
    category: 'Creative Direction · Global Event & Experience',
    year: '2025',
    description: 'Creative direction for the Making Science annual flagship event, coordinating talent, messaging, and high-impact audiovisual resources.',
    story: {
      challenge: 'Transform dense data-driven marketing concepts into an engaging, inspirational stage experience for global C-level executives.',
      concept: 'Anchor the narrative on journalism’s fundamental 5 Ws, visualized through cinematic motion graphics and striking live-stage screen choreography.',
      impact: 'Sold-out international live stream with widespread media coverage and heightened key client retention.',
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
    category: 'Creative Direction · Film & Holiday Campaign',
    year: '2026',
    description: 'Making Science 2026 holiday campaign. Narrative conceptualization, cinematic tone, and staging connecting with audiences through warmth, humor, and human innovation.',
    story: {
      challenge: 'Cut through an oversaturated holiday advertising landscape where sentimentality is often dismissed as cliché.',
      concept: 'Craft a cinematic holiday film marrying gentle humor, genuine human warmth, and an optimistic technological subtext.',
      impact: 'Achieved company-record organic engagement and industry acclaim for emotional brand storytelling.',
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
    description: "Creative direction for Making Science's debut at Cannes 2026. Creation of the 'That's Noise' concept, driving the visual strategy, bold disruptive tone, and high-impact multimedia assets.",
    story: {
      challenge: 'Make a bold, indelible debut at the world’s most demanding creative summit: Cannes Lions 2026.',
      concept: 'Launch "That’s Noise" — a provocative creative platform calling out superficial industry chatter with radical typographic candor.',
      impact: 'Established instant global brand credibility, keynote attention, and multiple cross-border agency opportunities.',
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
    description: 'A success case study film crafted for Mazda Spain, documenting the commercial and emotional power of the open-doors initiative.',
    story: {
      challenge: 'Drive physical footfall to dealership showrooms among modern motorists numb to conventional auto advertising.',
      concept: 'A cinematic documentary approach capturing genuine driving emotion, mechanical elegance, and unpretentious human passion.',
      impact: 'Generated historic dealership traffic spikes across Spain and benchmark view-through performance on digital platforms.',
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
    category: 'Creative Direction · Storytelling & Visual Strategy',
    year: '2026',
    description: 'Visual storytelling and brand experience development for the Helios Partner tool. Translating advanced technology capabilities into an approachable, aspirational, and memorable brand.',
    story: {
      challenge: 'Demystify complex proprietary AI algorithmic pipelines for enterprise partners who demand clear business value.',
      concept: 'Envision an "AI Factory" architectural metaphor where data synthesis is staged as pure light sculpture and kinetic motion.',
      impact: 'Accelerated partner onboarding velocity and elevated B2B product pitch conversion rates.',
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
    category: 'Creative Direction · Global Identity & Branding',
    year: '2026',
    description: 'Comprehensive creative direction for the relaunch of Ameba Studios. Defining the conceptual vision, design universe, brand tone of voice, and art direction across all touchpoints.',
    story: {
      challenge: 'Evolve a boutique production collective into a high-tier digital studio capable of winning global CGI and AI contracts.',
      concept: 'An organic visual identity system inspired by cellular metamorphosis, procedural growth, and cutting-edge digital rendering.',
      impact: 'Successfully doubled international incoming briefs and earned widespread acclaim across digital design communities.',
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
    category: 'Creative Direction · AI & Holiday Campaign',
    year: '2024',
    description: 'Making Science holiday campaign exploring artificial intelligence, robotics, and human connection through a heartwarming cinematic narrative.',
    story: {
      challenge: 'Humanize artificial intelligence and robotics during a season strictly defined by organic human nostalgia.',
      concept: 'Follow a miniature robot discovering empathy and camaraderie, subtly proving technology can elevate the human heart.',
      impact: 'Surpassed 250,000 organic impressions with exceptionally high positive audience sentiment.',
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
    name: 'The AI Desert',
    category: 'Creative Direction · AI & CGI Film',
    year: '2025',
    description: 'An immersive visual narrative exploring the convergence of human introspection, artificial intelligence, and surreal cosmic landscapes.',
    story: {
      challenge: 'Confront the existential unease of human identity within an increasingly synthetic, algorithmic world.',
      concept: 'A contemplative CGI odyssey pairing infinite cosmic deserts with towering monoliths and solitary human scale.',
      impact: 'Selected for independent digital film retrospectives and recognized for exquisite atmospheric direction.',
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
    category: 'Creative Direction · Social Impact Campaign',
    year: '2025',
    description: 'Making Science 2025 International Women’s Day campaign. A contemporary visual narrative built with sensitivity, empowerment, and graphic strength.',
    story: {
      challenge: 'Craft an authentic International Women’s Day campaign that shuns corporate tokenism in favor of genuine resonance.',
      concept: 'Bold high-contrast portraiture amplified by raw, direct testimonies celebrating pioneering women across tech disciplines.',
      impact: 'Sparked company-wide cultural pride and earned strong organic amplification across industry networks.',
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
    description: 'Visual identity and motion exploration combining dynamic sphere geometry with high-impact CGI and spatial aesthetics.',
    story: {
      challenge: 'Push the limits of real-time procedural caustics, refractive glass, and kinetic geometric motion in 3D space.',
      concept: 'A hypnotic physics simulation exploring light dispersion and fluid geometry in a pure, sterile spatial void.',
      impact: 'Serves as an internal benchmark for advanced CGI lighting and technical material design.',
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
    description: 'A speculative brand project developed as a Bachelor’s Degree Final Thesis (TFG) in Communication Studies.',
    story: {
      challenge: 'Reinvent fast-food packaging and brand identity into an electric, high-energy pop ecosystem targeting Gen Z.',
      concept: 'A retro-futuristic culinary universe fusing punchy typography, warm saturated colors, and dynamic editorial photography.',
      impact: 'Graduated with Highest Academic Honors (TFG) and serves as a premier case study in speculative consumer branding.',
    },
    processComparison: {
      before: '/proyectos/Mach/abuela ad 2.png',
      beforeLabel: 'Character & Narrative Concept',
      after: '/proyectos/Mach/ad prod.png',
      afterLabel: 'Final Commercial Key Visual',
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
    category: 'Creative Direction & Film · Venture Studio',
    year: '2026',
    description: 'Audiovisual creative development for Awake Venture Studio. Crafting a distinctive, cinematic aesthetic to project the studio’s entrepreneurial ecosystem and talent.',
    story: {
      challenge: 'Convey the high velocity, intellectual rigor, and visionary risk of venture studio founders to institutional investors.',
      concept: 'High-contrast cinematic documentary directing gritty founder moments against bold architectural framing.',
      impact: 'Core centerpiece for institutional roadshows, cementing strategic partnership conversations.',
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
    category: 'Creative Direction · Global Event & 3D',
    year: '2026',
    description: 'Making Science 2026 annual flagship event. Visual and narrative conceptualization exploring the synergy between human talent and artificial intelligence.',
    story: {
      challenge: 'Delineate the subtle inflection point where human intuition steers artificial intelligence computational scale.',
      concept: 'Kinetic 3D choreography of synthetic biomechanical filaments expanding and responding dynamically to human contact.',
      impact: 'Flagship audiovisual world premiere, praised as a masterclass in conceptual technology storytelling.',
    },
    processComparison: {
      before: '/proyectos/Hybrid intelligence/FS_2026_01.jpeg',
      beforeLabel: '3D Procedural Exploration',
      after: '/proyectos/Hybrid intelligence/FS_2026_02.png',
      afterLabel: 'Final Key Visual Render',
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
