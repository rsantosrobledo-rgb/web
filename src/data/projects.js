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
import stickerMazda from '../assets/stickers/mazda.webp'
import stickerRobot from '../assets/stickers/robot.webp'
import stickerGeosphere from '../assets/stickers/geosphere.webp'
import stickerThatsNoise from '../assets/stickers/thats noise.webp'

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
    hidden: true, // Temporalmente oculto a petición del usuario
    name: 'Decoding Culture',
    category: 'Creative Direction · Campaign & Event',
    year: '2026',
    description: 'Dirección creativa y concepto narrativo: deconstrucción y reinterpretación de códigos visuales urbanos para articular un universo de marca disruptivo, donde la cultura de calle colisiona con el diseño editorial.',
    story: {
      dream: 'Bridge the gap between a tech brand and contemporary urban culture through an authentic visual narrative.',
      onGround: 'Developed a high-contrast visual language colliding raw street typography with swiss editorial grids, pacing the narrative with abrupt kinetic transitions.',
      harvest: 'Established a fresh cultural benchmark for the brand, redefining its perception among creative and urban communities.',
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
    description: 'Dirección creativa y guion para el evento insignia de Making Science. Una puesta en escena inmersiva articulada a través del ritmo audiovisual, tensión escénica y tipografía cinética de gran formato.',
    story: {
      dream: 'Translate core marketing concepts into a dynamic, cinematic stage experience for event attendees.',
      onGround: 'Reinterpreted the foundational 5 Ws through a relentless kinetic tempo, fusing architectural screen choreography with typographic scale to command the auditorium’s focus.',
      harvest: 'Transformed dense strategic theory into an electric stage experience, setting an ambitious new bar for the company’s flagship brand summits.',
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
  {
    id: 14,
    row: 1,
    order: 3,
    name: 'Mazda Exclusive Days',
    category: 'Creative Direction · Case Study Film',
    year: '2026',
    description: 'Dirección creativa y estructura narrativa para el caso de éxito de Mazda España. Un tratamiento visual dinámico que hibrida estética publicitaria automovilística con tensión documental y ritmo de alta velocidad.',
    story: {
      dream: 'Document the open-doors commercial initiative with an engaging, documentary-style case film.',
      onGround: 'Elevated the traditional B2B case study through visceral sound design, kinetic match cuts, and atmospheric driving sequences aligned with Mazda’s Jinba Ittai philosophy.',
      harvest: 'Reframed a retail sales operation into a cinematic proof-of-performance story, setting a premier showcase standard across the network.',
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
  // FILA 2 — Drift hacia la derecha
  // ========================================================
  {
    id: 3,
    row: 2,
    order: 1,
    name: 'Christmas Chronicles',
    category: 'Creative Direction · Holiday Film',
    year: '2026',
    description: 'Dirección creativa y concepto narrativo para la campaña navideña de Making Science. Una aproximación cinematográfica construida desde el humor inteligente, la intimidad y la desmitificación de los clichés corporativos.',
    story: {
      dream: 'Create a holiday story that connects through humor and warmth rather than conventional advertising tropes.',
      onGround: 'Structured an understated, character-first staging with intimate camera proximity, naturalistic lighting, and comedic deadpan timing that subverts typical holiday advertising.',
      harvest: 'Generated unprecedented organic resonance across internal and external audiences, proving that vulnerability and sharp humor outperform corporate grandstanding.',
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
    description: "Dirección creativa y guion manifiesto para el debut de Making Science en Cannes 2026. Creación del concepto 'That's Noise': una declaración anti-artificio que corta la sobrecarga informativa mediante brutalismo visual y pureza tipográfica.",
    story: {
      dream: 'Present a bold, focused creative statement for Making Science’s presence at Cannes.',
      onGround: 'Conceived a provocative, hard-hitting manifesto paired with abrasive visual cuts, stark monochromatic framing, and relentless typographic pacing designed to shatter festival clutter.',
      harvest: 'Positioned the agency as a fearless challenger brand on the world’s most demanding creative stage, sparking immediate industry conversation.',
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
    description: 'Dirección creativa y guion narrativo para Helios Partner. Traducción de capacidades algorítmicas invisibles en una metáfora visual tangible: una arquitectura industrial abstracta dominada por luz, precisión y diseño de movimiento.',
    story: {
      dream: 'Communicate proprietary technological solutions clearly to partners and prospective clients.',
      onGround: 'Designed a monolithic, dark-room industrial aesthetic where data flows like physical material, pairing elegant camera choreographies with minimalist technical diagrams.',
      harvest: 'Demystified enterprise AI for top-tier decision makers, elevating partner trust and establishing Helios as a premium technological benchmark.',
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
    description: 'Dirección creativa integral y guion para el relanzamiento de Ameba Studios. Conceptualización de un universo de diseño orgánico y mutante, estableciendo un nuevo tono de voz, directrices de arte y piezas audiovisuales cinematográficas.',
    story: {
      dream: 'Develop a fresh, contemporary brand identity and visual language for the studio relaunch.',
      onGround: 'Engineered a dynamic brand language inspired by cellular evolution, combining sculptural 3D forms, iridescent lighting, and typographic fluidity to signal the studio’s rebirth.',
      harvest: 'Successfully repositioned the studio’s market aura, attracting avant-garde commercial partners and signaling a bold new creative chapter.',
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
    description: 'Pieza navideña de autor en Full 3D cinematográfico. Dirección artística, guion y dirección técnica integral: una exploración de la emoción mecánica a través de shaders táctiles de imperfección, iluminación cálida de estudio y animación puramente artesanal.',
    story: {
      dream: 'Build a holiday short story centered on an expressive mechanical character.',
      onGround: 'Built an emotionally resonant world through tactile micro-surface imperfections, warm cinematic depth of field, and nuanced physical timing, deliberately honoring raw 3D craftsmanship.',
      harvest: 'Stood out as a masterclass in independent craft and narrative warmth, demonstrating deep emotional resonance through pure 3D direction.',
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
    description: 'Universo cinematográfico contemplativo creado mediante arte digital 2D y composición avanzada sin simulación 3D. Dirección visual y guion poético: construcción de atmósferas envolventes mediante gradación de luz crepuscular, capas pictóricas y diseño de movimiento meditativo.',
    story: {
      dream: 'Explore human introspection and solitude through a contemplative desert landscape.',
      onGround: 'Crafted a painterly, slow-burning visual rhythm using optical parallax planes, atmospheric air dust density, and twilight color palettes to evoke a haunting sense of isolation.',
      harvest: 'Created a hypnotic sensory signature that captivated audiences, proving that disciplined 2D compositing can rival any high-end spatial render.',
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
    description: 'Dirección creativa y guion narrativo para la campaña 8M de Making Science. Una pieza de impacto social donde el diseño visual sobrio y el retrato en alto contraste ceden todo el protagonismo a la voz y la verdad de las protagonistas.',
    story: {
      dream: 'Create a genuine International Women’s Day piece highlighting real voices and experiences in tech.',
      onGround: 'Stripped away visual gimmicks in favor of chiaroscuro portrait framing, stark graphic interventions, and intimate editorial cadence to maximize testimonial authenticity.',
      harvest: 'Generated deep internal pride and broad social engagement, setting an uncompromising standard for authentic corporate advocacy.',
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
    description: 'Dirección creativa y desarrollo procedural en CGI: una investigación sobre la belleza matemática de la refracción, cáusticas volumétricas de luz y física cinética aplicada a la geometría abstracta.',
    story: {
      dream: 'Study light refraction, procedural dispersion, and kinetic movement in 3D geometry.',
      onGround: 'Explored procedural photon physics and chromatic aberration curves, directing fluid transformations that shift between mineral fragility and liquid tension.',
      harvest: 'Established a sophisticated R&D visual library of high-end shaders and optical phenomena directly deployable in luxury and tech brand campaigns.',
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
    description: 'Dirección creativa integral para un proyecto de marca especulativo (TFG en Comunicación). Creación de un universo pop retrofuturista de alta energía: dirección de arte editorial, diseño de packaging cromático y narrativa publicitaria irreverente.',
    story: {
      dream: 'Develop an energetic, pop-inspired fast-food brand concept for younger audiences.',
      onGround: 'Blended nostalgic 90s fast-food tropes with hyperbolic, acid color saturation and surrealist editorial staging to build an unapologetic youth subculture brand.',
      harvest: 'Delivered a cohesive, 360° commercial universe that demonstrated how bold art direction can revolutionize commodity food packaging.',
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
    description: 'Dirección creativa y guion para Awake Venture Studio. Creación de una narrativa visual de pulso moderno, combinando estética cinematográfica, arquitectura y retratos espontáneos para proyectar la visión transformadora de sus fundadores.',
    story: {
      dream: 'Capture the energy, rhythm, and vision of studio founders in a sharp documentary format.',
      onGround: 'Directed a crisp architectural cinematography that mirrors the precision of venture building, pacing rapid-fire founder interactions with resonant stillness.',
      harvest: 'Solidified the studio’s prestige among Tier-1 venture ecosystems, defining an inspiring visual standard for portfolio talent attraction.',
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
    description: 'Película insignia de Making Science. Concepto original, guion y dirección creativa: una exploración pionera que orquesta modelos generativos de IA con composición 2D milimétrica y postproducción de alta fidelidad.',
    story: {
      dream: 'Explore the dialogue between human creative direction and generative tools in a unified film.',
      onGround: 'Choreographed a dialectic between organic human vulnerability and synthetic generative hallucinations, curating AI outputs as raw film stock shaped by tight color science and deliberate temporal rhythm.',
      harvest: 'Became the defining manifesto of the company’s technological evolution, showcasing how visionary creative direction can master AI into cinematic poetry.',
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

// Filtramos proyectos ocultos temporalmente
const visibleProjects = projects.filter((p) => !p.hidden)

export { projects as allProjects }
export default visibleProjects
