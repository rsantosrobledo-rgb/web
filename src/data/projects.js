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
    brandAssets: [
      { id: 'dec-vid', type: 'video', title: 'Teaser Presentación (Primary Film)', src: '/proyectos/decoding media/Teaser_presentacion_soft.mp4' },
      { id: 'dec-1', type: 'image', title: 'Official Event Poster', src: '/proyectos/decoding media/cartel.png' },
      { id: 'dec-2', type: 'image', title: 'Event Logomark', src: '/proyectos/decoding media/logo evento.png' },
      { id: 'dec-3', type: 'image', title: 'JL Graphic Element', src: '/proyectos/decoding media/JL.png' },
      { id: 'dec-4', type: 'image', title: 'Abstract Artwork Graphic', src: '/proyectos/decoding media/Untitled.png' },
    ],
    colorPalette: ['#FF00DC', '#0031D6', '#030304', '#FFFFFF'],
    editorialNarrative: [
      "When tech companies try to speak the language of youth or street culture, it usually feels forced—like a corporate giant trying on sneakers that don't fit.",
      "With Decoding Culture, the ambition was never to mimic urban trends, but to truly deconstruct them. We took raw street typography, underground posters, and kinetic rhythms, colliding them against a rigid Swiss editorial framework.",
      "The result was an event identity that felt genuine, bold, and untamed, proving that a brand can participate in contemporary culture without losing its institutional weight.",
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
    brandAssets: [
      { id: '5w-vid', type: 'video', title: '5W of Marketing · Stage Keynote Film', src: 'https://www.youtube.com/embed/QScPYHLlSbA?si=kO0wBLo_6vtEyLaR&autoplay=1&playsinline=1' },
    ],
    colorPalette: ['#A942B4', '#452162', '#000000', '#FFFFFF'],
    editorialNarrative: [
      "Every year, Making Science feels that urge to innovate—that need to raise its voice above the noise and claim what is rightfully theirs.",
      "The throne of Artificial Intelligence applied to marketing has belonged to them for years, and once again, we had to make that crystal clear.",
      "This year's concept revolved around how complexity always stems from something remarkably simple. Yet that is something you can only truly recognize through experience—something Making Science has in spades.",
      "Combining such a potent concept with the brand’s existing aesthetic gave birth to the visual identity for this event, brought to life across key videos, large-scale posters, and diverse social media releases.",
    ],
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
    brandAssets: [
      { id: 'mazda-vid', type: 'video', title: 'Mazda Exclusive Days · Eficacia Case Study Film', src: '/proyectos/Mazda/5. Mazda Exclusive Days - Eficacia_VF.mp4' },
    ],
    colorPalette: ['#08080A', '#8C8C94', '#1A1A1D', '#FFFFFF'],
    editorialNarrative: [
      "This case film was crafted to compete in top-tier industry festivals: the Eficacia Awards, IAB Awards, and BestIn Auto.",
      "Submissions for these awards tend to skew either towards comedy or overly stiff corporate presentations. We chose to break that mold.",
      "Advocating for a more poetic visual style, we never lost sight of what matters most in this format: the data. We seamlessly united both worlds with elegance and credibility.",
      "An elegant campaign, for an elegant brand.",
    ],
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
    brandAssets: [
      { id: 'xmas-vid', type: 'video', title: 'Christmas Chronicles · Holiday Campaign Film', src: 'https://www.youtube.com/embed/zswd19kHTdU?si=n3qoIPd1om-tR7J5&autoplay=1&playsinline=1' },
    ],
    editorialNarrative: [
      "Holiday campaigns are a double-edged sword for creative teams. Most agencies fall into the exact same trap year after year: forced tears, cliché family dinners, and sentimental piano music that everyone forgets five minutes later.",
      "We wanted none of that. We decided to approach Christmas through character-driven comedy, deadpan timing, and genuine internal quirks that people inside the company could actually laugh about.",
      "Balancing warmth with self-deprecating humor turned out to be our biggest asset. It didn’t just entertain—it became an instant piece of company lore shared enthusiastically across every channel.",
    ],
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
    brandAssets: [
      { id: 'noise-vid', type: 'video', title: "That's Noise · Cannes 2026 Manifesto Film", src: 'https://www.youtube.com/embed/niXm3XkXzk4?si=zfVG_CWhNCEuEU2l&autoplay=1&playsinline=1' },
    ],
    colorPalette: ['#000000', '#F8F8F8', '#222222', '#555555'],
    editorialNarrative: [
      "Landing in Cannes for the very first time with Making Science was a defining milestone, but Cannes is also the loudest room on the planet. Everyone is trying to out-shout each other with dazzling gimmicks, trendy buzzwords, and spectacle.",
      "We quickly realized that adding more visual glitter to the noise was a losing game. The only way to command real attention was to deliver a sharp, fearless provocation: call out the industry's obsession with hype and strip everything back to pure, unvarnished substance.",
      "That gave birth to 'That’s Noise'—an unapologetic manifesto built on stark monochrome contrasts, abrupt sonic cuts, and heavyweight typography that dared the creative world to look in the mirror.",
    ],
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
    brandAssets: [
      { id: 'helios-vid', type: 'video', title: 'Helios AI Factory · Launch Film', src: 'https://www.youtube.com/embed/R5YrakYxFjw?si=an-bG28bkL58kxwn&autoplay=1&playsinline=1' },
    ],
    colorPalette: ['#E7BE7D', '#6F3518', '#080505', '#FFFFFF'],
    editorialNarrative: [
      "Rooted in a deep affinity with celestial bodies and cosmology, Awake Venture Studio launched Helios AI Factory.",
      "The moment the name was shared with us, the core idea sparked naturally. We merged the mythological realm with high technology—two worlds that, paradoxically, seem fundamentally intertwined.",
      "The result was a go-to-market launch defined by bold personality and visual distinction.",
    ],
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
    brandAssets: [
      { id: 'ameba-vid', type: 'video', title: 'Ameba Studios · Relaunch Manifesto Film', src: 'https://www.youtube.com/embed/rP8g-CrPobo?si=D6gHJHT0hezx2NQk&autoplay=1&playsinline=1' },
      { id: 'ameba-logo', type: 'image', title: 'Official Studio Logomark', src: '/proyectos/Ameba/ameba_logo.png' },
    ],
    logo: '/proyectos/Ameba/ameba_logo.png',
    webPreview: {
      url: 'https://amebastudios.com',
      title: 'amebastudios.com',
    },
    colorPalette: ['#D4FF00', '#0A0A0A', '#FFFFFF', '#2A2A2A'],
    editorialNarrative: [
      "The brand building of Ameba Studios was unexpected, but at the same time, it was an entirely necessary strategic move.",
      "Making Science Studios was the previous name of this division. Making Science is a company with numerous branches, but what stands out about most of them is their independence from the parent company—the opportunity each has to carve out a name for itself beyond its heritage. This could be no exception.",
      "Ameba Studios is (pardon the redundancy) a studio focused on AI-driven audiovisual creation. It serves as a creative branch dedicated to safeguarding both Making Science’s own creative standard and that of many of its clients.",
      "The identity, color palette, and overall vibe of the brand were built entirely around this ethos.",
      "Making Science Studios is now Ameba Studios, standing with an identity of its own.",
      "The rollout of this brand encompassed a promotional launch film, a dedicated website, alongside the complete suite of assets that make up the visual identity.",
    ],
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
    brandAssets: [
      { id: 'robot-vid', type: 'video', title: 'Robot Christmas · Full 3D Short Film', src: 'https://www.youtube.com/embed/1PqZWPiJ-SQ?si=N3Ww2ItvlCXpTPgr&autoplay=1&playsinline=1' },
      { id: 'robot-1', type: 'image', title: 'Full 3D Character Model', src: '/proyectos/Robot Christmas/robot.png' },
    ],
    editorialNarrative: [
      "In an era where AI can generate plausible scenes in seconds, we felt an intense desire to create a story that stood for the pure, patient craft of hand-made 3D animation.",
      "Zero generative prompts, zero procedural shortcuts. We modeled, textured, rigged, and animated a mechanical character from scratch, obsessing over the tiny imperfections: the faint scratches on the metal joints, the warm falloff of studio key lights, and the subtle hesitation in the robot's physical movement.",
      "It was a love letter to classical animation craft, proving that true emotional warmth doesn't come from technology itself, but from the human hand directing every frame.",
    ],
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
    brandAssets: [
      { id: 'desert-vid', type: 'video', title: 'The Desert · 2D Compositing Film', src: '/proyectos/desert/desert_final.webm' },
      { id: 'desert-key', type: 'image', title: 'The Desert · Creatividad General Key Visual', src: '/proyectos/desert/Creatividad general.jpg' },
      { id: 'desert-promo', type: 'image', title: 'The Desert · YouTube Promo Release', src: '/proyectos/desert/youtube_promo.png' },
    ],
    colorPalette: ['#0D0E68', '#050614', '#2A1846', '#FAF0FB'],

    editorialNarrative: [
      "Everyone assumed this piece was built inside a high-end 3D physics engine. The truth is there is zero 3D simulation in the entire film.",
      "The Desert was an uncompromising exercise in 2D digital art, multi-plane optical compositing, and atmospheric color science. We wanted to capture the heavy, contemplative solitude of vast dunes at twilight—where time slows down and silence feels palpable.",
      "By layering hand-painted textures, optical atmospheric haze, and meditative camera drifts, we achieved a hypnotic cinematic depth that challenges the assumption that you always need heavy CGI to create immersive worlds.",
    ],
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
    brandAssets: [
      { id: '8m-vid', type: 'video', title: '8M Equal Voice · Manifesto Film', src: 'https://www.youtube.com/embed/u42Nvr0U9y0?si=nl7jbAgi6vl8BQ4F&autoplay=1&playsinline=1' },
    ],
    colorPalette: ['#782078', '#DA7B79', '#120E16', '#FFFFFF'],
    editorialNarrative: [
      "The International Women’s Day campaign is one of the most significant initiatives for Making Science each year. For a long time, these pieces focused on our industry, or even on our company. While meaningful, we felt we weren’t connecting with enough people—we were speaking to an overly narrow niche.",
      "With this film, our aim was to talk about courage and self-worth: that holy grail everyone searches for, yet which we all inherently possess from the moment we are born. For women, this journey is particularly critical, as society often makes this search especially unforgiving.",
      "The 8M campaign is exclusively video-based, distributed across YouTube and major social channels.",
    ],
  },
  {
    id: 9,
    row: 4,
    order: 3,
    name: 'Geo Trace',
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
    brandAssets: [
      { id: 'geo-vid', type: 'video', title: 'Geo Trace · Procedural CGI Film', src: '/proyectos/Geo Sphere/compressed-Geo-sphere-v12.mp4' },
    ],

    editorialNarrative: [
      "GEO is on everyone's radar right now, but it is a trend that is definitively here to stay.",
      "Adopting a playful, Gen-Z and naif aesthetic, we introduced this new tool with modern culture pulsing through its veins.",
      "The piece took the form of a dynamic promotional film launched across YouTube and primary social platforms.",
    ],
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
    coverImage: '/proyectos/Mach/logo_mach.jpg',
    brandAssets: [
      { id: 'mach-logo', type: 'image', title: 'Official Mach Logomark (Primary Asset)', src: '/proyectos/Mach/logo_mach.jpg' },
      { id: 'mach-1', type: 'image', title: 'Campaign Hero Print Ad', src: '/proyectos/Mach/ad prod.png' },
      { id: 'mach-2', type: 'image', title: 'Abuela Ad Campaign Poster', src: '/proyectos/Mach/abuela ad 2.png' },
      { id: 'mach-3', type: 'image', title: 'Dutch Angle Editorial Shot', src: '/proyectos/Mach/ameba-Dutch_angle_close_up.jpg' },
      { id: 'mach-4', type: 'image', title: 'Eye Level Medium Shot', src: '/proyectos/Mach/ameba-eye_level_medium_shot.jpg' },
      { id: 'mach-5', type: 'image', title: 'Physical Packaging Prototype', src: '/proyectos/Mach/1000029087.jpg' },
      { id: 'mach-6', type: 'image', title: 'Graphic Artwork Screenshot', src: '/proyectos/Mach/Captura de pantalla 2026-09-16 a las 10.15.11.png' },
      { id: 'mach-7', type: 'image', title: 'Enhanced Quality Detail Render', src: '/proyectos/Mach/Enhance_quality_eliminating_arti…_202605061106.jpeg' },
    ],
    colorPalette: ['#D24A00', '#FA980B', '#111111', '#FFF8E6'],
    editorialNarrative: [
      "Mach began as a Degree Thesis project in Communication, but we treated it from day one as if it were a multi-million-dollar rebellious brand ready to hit the streets.",
      "Traditional fast food has grown dull and overly corporate. We took inspiration from 90s retrofuturism, hyperbolic Japanese packaging, and surrealist editorial fashion photography to build an unashamed, high-octane food universe.",
      "Spanning everything from physical box prototypes and saturated product photography to provocative ad layouts, Mach showed how fearlessness in art direction can turn a commodity product into a coveted subculture icon.",
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
    brandAssets: [
      { id: 'awake-vid', type: 'video', title: 'Awake Venture Studio · Documentary Film', src: 'https://www.youtube.com/embed/yOK8O5pV8bQ?si=yyDovq7dmFql6oHU&autoplay=1&playsinline=1' },
    ],
    colorPalette: ['#00A6DD', '#002850', '#0B0E14', '#FFFFFF'],
    editorialNarrative: [
      "Venture studios often struggle to communicate their soul on film. They either produce dry corporate interviews behind glass desks or fast-paced promo reels with zero emotional resonance.",
      "With Awake, we wanted to capture the invisible electricity that happens when founders meet: the obsessive energy, the intense debates, and the shared vision of building companies from nothing.",
      "We paired clean, modern architectural framing with intimate, spontaneous moments, letting the natural rhythm of the space and the people tell the story without artificial hype.",
    ],
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
    brandAssets: [
      { id: 'hyb-intro', type: 'video', title: 'Intro Flagship 2026 (Primary Film)', src: '/proyectos/Hybrid intelligence/INTRO_Flagship2026.webm' },
      { id: 'hyb-1', type: 'image', title: 'Key Visual Frame 01', src: '/proyectos/Hybrid intelligence/FS_2026_01.jpeg' },
      { id: 'hyb-2', type: 'image', title: 'Key Visual Frame 02', src: '/proyectos/Hybrid intelligence/FS_2026_02.png' },
      { id: 'hyb-3', type: 'image', title: 'Key Visual Frame 03', src: '/proyectos/Hybrid intelligence/FS_2026_06 (1).jpeg' },
      { id: 'hyb-signage-1', type: 'image', title: 'Event Window Graphics 01 (176x233cm)', src: '/proyectos/Hybrid intelligence/MS_FS_VENTANAS_SOLUCIONES_176x233cm-01.png' },
      { id: 'hyb-signage-2', type: 'image', title: 'Event Window Graphics 02 (176x233cm)', src: '/proyectos/Hybrid intelligence/MS_FS_VENTANAS_SOLUCIONES_176x233cm -2-01.png' },
      { id: 'hyb-signage-3', type: 'image', title: 'Event Window Graphics 03 (176x233cm)', src: '/proyectos/Hybrid intelligence/MS_FS_VENTANAS_SOLUCIONES_176x233cm-03.png' },
      { id: 'hyb-4', type: 'video', title: 'Teaser 2 Motion Cut', src: '/proyectos/Hybrid intelligence/Teaser2_Flagship_2026_v01.webm' },
      { id: 'hyb-5', type: 'video', title: 'Keynote Film (YouTube)', src: 'https://www.youtube.com/embed/lgGXCguwf1U?si=gvX4rzRekyO_QM2p&autoplay=1&playsinline=1' },
    ],
    colorPalette: ['#00ADEA', '#012457', '#06070B', '#FFFFFF'],
    editorialNarrative: [
      "The brief this year was straightforward: Making Science, as a pioneer in Artificial Intelligence, stands at the center of the conversation. It is admired and frequently emulated.",
      "Yet vanity is never the answer. The path exists to be led—to guide clients and other companies toward that promised horizon.",
      "The Hybrid Intelligence is the spiritual heir to all previous event brand identities. It serves as a reminder of what has been championed over the years, but also as a definitive statement of intent.",
      "Out of this came a powerful concept, translated into multiple film pieces, event signage, and social media campaigns.",
    ],
  },
]

// Filtramos proyectos ocultos temporalmente
const visibleProjects = projects.filter((p) => !p.hidden)

export { projects as allProjects }
export default visibleProjects
