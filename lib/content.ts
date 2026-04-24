// =============================================================================
// WAMANI CONTENT ARCHITECTURE
// =============================================================================
// Centralized bilingual content for Wamani
// This structure makes it easy to edit content and integrate with a CMS later
//
// STRUCTURE:
// - contactInfo: All contact details (single source of truth)
// - ui: Common UI strings used across components
// - content: All section content, organized by section name
//
// EDITING GUIDE:
// 1. Contact info → Edit contactInfo object
// 2. Section content → Find the section in content object
// 3. UI labels → Edit ui object
// 4. All content is bilingual (es/en)
// =============================================================================

export type Language = "es" | "en"

// Type definitions for content structures
export type Space = {
  id: string
  name: string
  description: string
  fullDescription: string
  atmosphere: string
  stayType: string
  features: string[]
  image: string
  images: string[]
  upcoming?: boolean // Mark spaces that are still in preparation
}

export type Experience = {
  id: string
  name: string
  description: string
  fullDescription: string
  image: string
  images: string[]
}

export type ConservationItem = {
  name: string
  scientificName: string | null
  description: string
  image: string
  notes: string | null
}

export type ConservationSection = {
  id: string
  title: string
  description: string
  fullDescription: string
  icon: string
  items: ConservationItem[]
}

export type GalleryImage = {
  id: string
  src: string
  alt: string
  category: string
}

export type BitacoraEntry = {
  id: string
  title: string
  date: string
  excerpt: string
  content: string
  image: string
  category: string
}

// CENTRALIZED CONTACT INFORMATION - Edit all contact details in ONE place
export const contactInfo = {
  // Human contact point
  contactName: "Cami",

  whatsapp: {
    number: "+5492615741691",
    display: "+54 9 261 574 1691",
    // Direct wa.me link format
    link: "https://wa.me/5492615741691",
  },
  email: "contacto.wamani@gmail.com",
  phone: null, // optional

  // Social media
  social: {
    instagram: {
      handle: "@wamani.campo", // placeholder - update when available
      url: null, // Add URL when Instagram is ready: "https://instagram.com/wamani.campo"
    },
  },

  location: {
    es: "San Carlos, Mendoza, Argentina",
    en: "San Carlos, Mendoza, Argentina",
  },
  coordinates: {
    lat: -34.490038,
    lng: -69.30818,
  },

  // Bilingual labels
  labels: {
    es: {
      contactPerson: "Contacto directo",
      contactDescription:
        "Para consultas, reservas o cualquier otra duda, podés contactarte por WhatsApp con alguien de nuestro equipo o escribirnos directamente por mail.",
      whatsappLabel: "WhatsApp",
      emailLabel: "Email",
      instagramLabel: "Instagram",
      instagramSoon: "Próximamente",
    },
    en: {
      contactPerson: "Direct contact",
      contactDescription:
        "For inquiries, reservations, or any questions, you can reach out via WhatsApp to someone from our team or write to us directly by email.",
      whatsappLabel: "WhatsApp",
      emailLabel: "Email",
      instagramLabel: "Instagram",
      instagramSoon: "Coming soon",
    },
  },

  cta: {
    es: {
      consultar: "Consultar",
      contacto: "Contacto",
      whatsapp: "WhatsApp principal",
      email: "Enviar email",
    },
    en: {
      consultar: "Inquire",
      contacto: "Contact",
      whatsapp: "Primary WhatsApp",
      email: "Send email",
    },
  },
}

// SHARED UI STRINGS - Common labels used across multiple components
export const ui = {
  es: {
    viewMore: "Ver más",
    close: "Cerrar",
    features: "Características",
    gallery: "Galería",
    species: "especies",
    registeredItems: "elementos registrados",
    openGoogleMaps: "Ir a Google Maps",
    loading: "Cargando...",
    error: "Error",
    retry: "Reintentar",
    comingSoon: "Próximamente",
    upcomingSpace: "Espacio en preparación",
  },
  en: {
    viewMore: "View more",
    close: "Close",
    features: "Features",
    gallery: "Gallery",
    species: "species",
    registeredItems: "registered items",
    openGoogleMaps: "Open in Google Maps",
    loading: "Loading...",
    error: "Error",
    retry: "Retry",
    comingSoon: "Coming soon",
    upcomingSpace: "Space in preparation",
  },
}

export const content = {
  meta: {
    es: {
      title: "Wamani | Campo y Montaña en Mendoza",
      description:
        "Una experiencia de campo y montaña en el sudoeste mendocino: espacio, silencio y una forma distinta de habitar el paisaje.",
    },
    en: {
      title: "Wamani | Field & Mountain in Mendoza",
      description:
        "A field and mountain experience in southwest Mendoza: space, silence, and a different way of inhabiting the landscape.",
    },
  },

  popup: {
    es: {
      headline: "¿Listo para vivir Wamani?",
      supporting: "Naturaleza, aventura y pausa en un solo lugar.",
      cta: "Descubrir Wamani",
    },
    en: {
      headline: "Ready to experience Wamani?",
      supporting: "Nature, adventure, and a slower pace in one place.",
      cta: "Discover Wamani",
    },
  },

  nav: {
    es: {
      menu: "Menú",
      items: [
        { label: "Wamani", href: "#wamani" },
        { label: "Espacios", href: "#espacios" },
        { label: "Experiencias", href: "#experiencias" },
        { label: "Galería", href: "/galeria" },
        { label: "Dónde estamos", href: "#donde-estamos" },
        { label: "Cómo llegar", href: "#como-llegar" },
        { label: "Conservación", href: "/conservacion" },
        { label: "Antes de venir", href: "#antes-de-venir" },
        { label: "Bitácora", href: "#bitacora" },
      ],
    },
    en: {
      menu: "Menu",
      items: [
        { label: "Wamani", href: "#wamani" },
        { label: "Spaces", href: "#espacios" },
        { label: "Experiences", href: "#experiencias" },
        { label: "Gallery", href: "/galeria" },
        { label: "Where we are", href: "#donde-estamos" },
        { label: "How to get here", href: "#como-llegar" },
        { label: "Conservation", href: "/conservacion" },
        { label: "Before you come", href: "#antes-de-venir" },
        { label: "Journal", href: "#bitacora" },
      ],
    },
  },

  hero: {
    es: {
      subtitle: "Explorar, desconectar y vivir el campo y la montaña desde adentro.",
      cta1: "Descubrir Wamani",
      cta2: "Consultar disponibilidad",
    },
    en: {
      subtitle: "Explore, slow down, and experience the countryside and mountains from within.",
      cta1: "Discover Wamani",
      cta2: "Check availability",
    },
  },

  wamani: {
    es: {
      title: "Wamani",
      subtitle: "Un destino remoto de campo y montaña",
      intro:
        "Wamani es un destino remoto de campo y montaña en San Carlos, Mendoza, al sudoeste de Pareditas. En sus 32.000 hectáreas de campo, precordillera y montaña, donde la intervención humana sigue siendo mínima, Wamani propone una escala poco habitual: espacio, distancia y una forma más lenta de habitar el paisaje.",
      description:
        "Es un lugar para hacer una pausa, explorar, hacer turismo aventura, recorrer caminos internos, vivir la cultura del campo y habitar Mendoza de otra manera. Llanura y montaña. Hospitalidad auténtica. Una forma distinta de viajar.",
      features: [
        "Silencio y espacio",
        "Turismo aventura",
        "Cultura de campo",
        "Llanura y montaña",
        "Hospitalidad auténtica",
        "Caminos internos",
      ],
    },
    en: {
      title: "Wamani",
      subtitle: "A remote countryside and mountain destination",
      intro:
        "Wamani is a remote countryside and mountain destination in San Carlos, Mendoza, southwest of Pareditas. Across its 32,000 hectares (about 79,000 acres) of open country, foothills, and mountain, where human intervention remains minimal, Wamani offers an uncommon scale: space, distance, and a slower way to experience the landscape.",
      description:
        "It is a place to pause, explore, seek outdoor adventure, wander through the property's internal trails, experience countryside culture, and experience Mendoza differently. Plains and mountains. Authentic hospitality. A different way of traveling.",
      features: [
        "Silence and space",
        "Outdoor adventure",
        "Country life",
        "Plains and mountains",
        "Authentic hospitality",
        "Back roads",
      ],
    },
  },

  meaning: {
    es: {
      title: "Qué significa Wamani",
      short:
        "Wamani es una palabra del mundo andino. En quechua puede significar territorio o provincia, pero su sentido más profundo es otro: el espíritu protector de la montaña. El nombre honra al Pico Wamani, que alcanza los 5.000 metros y se alza dentro de la propiedad como una presencia real del paisaje.",
      long: {
        title: "El espíritu de la montaña",
        paragraphs: [
          "En la cosmovisión andina, Wamani no es solo una palabra. Es la presencia que habita las cumbres, el guardián silencioso que observa desde la altura, el espíritu que cuida a quienes caminan sus laderas.",
          "Es pertenencia. Es memoria. Es el hilo que conecta a quienes recorren la tierra con quienes la habitaron antes, con quienes la cuidaron y la nombraron.",
          "El Cerro Wamani se levanta en el corazón de esta propiedad como un ancla, como un recordatorio de que hay lugares donde el paisaje todavía tiene voz, donde la montaña todavía significa algo.",
          "Elegimos este nombre porque creemos que algunos territorios merecen ser habitados con respeto, con pausa, con la conciencia de que somos visitantes en una historia mucho más larga que la nuestra. Venir a Wamani es entrar en esa historia.",
        ],
      },
    },
    en: {
      title: "What Wamani means",
      short:
        "Wamani is a word from the Andean world. In Quechua it can mean territory or province, but its deeper meaning is something else: the protective spirit of the mountain. The name honors Wamani Peak, which reaches 5,000 meters and rises within the property as a real presence in the landscape.",
      long: {
        title: "The spirit of the mountain",
        paragraphs: [
          "In the Andean worldview, Wamani is not just a word. It is the presence that dwells on the peaks, the silent guardian that watches from the heights, the spirit that cares for those who walk its slopes.",
          "It is belonging. It is memory. It is the thread that connects those who travel the land with those who lived here before, with those who cared for it and named it.",
          "A wamani hill stands at the heart of the property like an anchor, like a reminder that there are places where the landscape still has a voice, where the mountain still means something.",
          "We chose this name because we believe some territories deserve to be lived in with respect, with pause, with the awareness that we are visitors in a story much longer than our own. To come to Wamani is to enter that story.",
        ],
      },
    },
  },

  experienceModes: {
    es: {
      title: "Viví Wamani a tu manera",
      subtitle: "Cuatro formas de vivir Wamani, según tu propio ritmo.",
      modes: [
        {
          title: "Pausa",
          description:
            "Silencio, paisaje, fuego, comida casera y un ritmo más lento. Para quienes vienen a descansar y habitar el tiempo de otra manera.",
          icon: "pause",
        },
        {
          title: "Exploración",
          description:
            "Caminatas, bicicleta, montaña, rutas internas, campamentos y cabalgatas. Para quienes quieren recorrer, descubrir y moverse.",
          icon: "compass",
        },
        {
          title: "Cultura viva",
          description:
            "Hospitalidad, historias locales, comida regional, tradiciones, baqueanos y puesteros. Para quienes buscan una inmersión en el campo mendocino.",
          icon: "users",
        },
        {
          title: "A medida",
          description:
            "Combinaciones personalizadas según el visitante. Pausa y aventura. Cultura y exploración. Tu propia versión de Wamani.",
          icon: "settings",
        },
      ],
    },
    en: {
      title: "Experience Wamani your way",
      subtitle: "Four ways to experience Wamani, at your own pace.",
      modes: [
        {
          title: "Pause",
          description:
            "Silence, landscape, fire, homemade food, and a slower rhythm. For those who come to rest and inhabit time differently.",
          icon: "pause",
        },
        {
          title: "Exploration",
          description:
            "Walks, biking, mountain, internal routes, and adventure. For those who want to travel, discover, and move.",
          icon: "compass",
        },
        {
          title: "Living culture",
          description:
            "Hospitality, local stories, regional food, traditions, baqueanos and puesteros. For those seeking immersion in Mendoza's countryside.",
          icon: "users",
        },
        {
          title: "Custom",
          description:
            "Personalized combinations for each visitor. Pause and adventure. Culture and exploration. Your own version of Wamani.",
          icon: "settings",
        },
      ],
    },
  },

  espacios: {
    es: {
      title: "Espacios",
      subtitle:
        "Wamani se vive desde distintos puntos de la propiedad, cada uno con su propio ritmo, paisaje y forma de estar.",
      closeButton: "Cerrar",
      spaces: [
        {
          id: "casco",
          name: "Casco Principal",
          description: "El corazón compartido de Wamani.",
          fullDescription:
            "El antiguo puesto restaurado que dio origen al lugar. Reúne la galería, la cocina, la sala de estar y el espacio común donde transcurre gran parte de la vida compartida en Wamani. Cálido, rústico, íntimo y social, es la base del sector donde también se encuentran los Dormis, el fogón, las churrasqueras y parte de la vida de campo cotidiana.",
          atmosphere: "Cálido y social",
          stayType: "Vida compartida",
          features: ["Galería", "Cocina", "Sala de estar", "Espacio común", "Fogón y churrasqueras"],
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/casco%20principal-my0NPpjT2onfJNeco2EQjQdhfc4PaM.jpg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/casco%20principal-my0NPpjT2onfJNeco2EQjQdhfc4PaM.jpg",
          ],
        },
        {
          id: "dormis",
          name: "Dormis",
          description: "Descanso privado junto al casco.",
          fullDescription:
            "Cinco habitaciones ubicadas a pocos metros del Casco Principal, cada una con cama, baño, pequeña estufa a leña y vista a la montaña. Permiten descansar con privacidad sin perder cercanía con el espacio común del casco, donde se comparte la cocina, el comedor y la vida cotidiana del sector.",
          atmosphere: "Íntimo y conectado",
          stayType: "Privacidad con comunidad",
          features: ["Cama", "Baño privado", "Estufa a leña", "Vista a la montaña", "Cercanía al casco"],
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dormis%202.png-NSXuH7a0Ig7T784CXaG8IgMCaJYBCr.jpeg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dormis%202.png-NSXuH7a0Ig7T784CXaG8IgMCaJYBCr.jpeg",
          ],
        },
        {
          id: "domo",
          name: "Domo Amarillo",
          description: "Más aislado, más privado, más aventura.",
          fullDescription:
            "Ubicado a unos 13 km al oeste del Casco Principal, al pie de los cerros, propone una experiencia más apartada y aventurera. Tiene capacidad para 3 o 4 personas, baño con ducha y un exterior con pérgola, mesa, espacio para fuego y sector para cocinar al aire libre.",
          atmosphere: "Aventurero y apartado",
          stayType: "Glamping independiente",
          features: [
            "Capacidad 3-4 personas",
            "Baño con ducha",
            "Pérgola exterior",
            "Espacio para fuego",
            "Cocina al aire libre",
          ],
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/domo%20amarillo%204.png-Pa9P5IOL7wZojktUAvYpYuSd3zgZ7z.jpeg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/domo%20amarillo%204.png-Pa9P5IOL7wZojktUAvYpYuSd3zgZ7z.jpeg",
          ],
        },
        {
          id: "domos-selerpe",
          name: "Domos El Selerpe",
          description: "Entre cerros, agua y silencio andino.",
          fullDescription:
            "A unos 25 km al noroeste del Casco Principal, este conjunto de 5 estructuras ofrece una experiencia inmersiva en la montaña. Incluye 4 domos dormitorio con cama y baño, y un domo principal central con cocina, comedor y sala de estar. Un entorno de cerros, vegas, agua cercana y una escala más panorámica del paisaje.",
          atmosphere: "Inmerso en montaña",
          stayType: "Refugio apartado",
          features: [
            "4 domos dormitorio",
            "Domo central con cocina",
            "Comedor y sala de estar",
            "Entorno de cerros y vegas",
            "Agua cercana",
          ],
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/domos%20selerpe-6zYF7xtFcJWHfYAspk8KW6RRoTyeYM.jpg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/domos%20selerpe-6zYF7xtFcJWHfYAspk8KW6RRoTyeYM.jpg",
          ],
        },
        {
          id: "puesto-lolo",
          name: "Puesto Lolo",
          description: "Una joya histórica en medio del campo.",
          fullDescription:
            "El antiguo puesto de Lolo, conservado y refaccionado con respeto por su historia, su paisaje y su forma original de habitar Wamani. Próximamente.",
          atmosphere: "Histórico y auténtico",
          stayType: "Campo tradicional",
          features: ["Arquitectura histórica", "Conservación patrimonial", "Paisaje único"],
          image: "/images/espacios/puesto-lolo.jpg",
          images: ["/images/espacios/puesto-lolo.jpg"],
          upcoming: true,
        },
        {
          id: "puesto-selerpe",
          name: "Puesto El Selerpe",
          description: "Un refugio restaurado con memoria de montaña.",
          fullDescription:
            "Una antigua casa de campo en proceso de restauración, recuperada con respeto por su historia, su materialidad y su vínculo con el paisaje. Próximamente.",
          atmosphere: "Histórico y contemplativo",
          stayType: "Patrimonio rural",
          features: ["Restauración respetuosa", "Memoria histórica", "Vínculo con el paisaje"],
          image: "/images/espacios/puesto-selerpe.jpg",
          images: ["/images/espacios/puesto-selerpe.jpg"],
          upcoming: true,
        },
      ],
    },
    en: {
      title: "Spaces",
      subtitle:
        "Wamani is lived from different points across the property, each with its own rhythm, landscape, and way of staying.",
      closeButton: "Close",
      spaces: [
        {
          id: "casco",
          name: "Main House",
          description: "The shared heart of Wamani.",
          fullDescription:
            "The restored historic outpost that gave birth to the place. It brings together the gallery, kitchen, living room, and common space where much of Wamani's shared life unfolds. Warm, rustic, intimate, and social, it's the base of the sector where you'll also find the Dormis, the fire pit, the grills, and part of everyday campo life.",
          atmosphere: "Warm and social",
          stayType: "Shared living",
          features: ["Gallery", "Kitchen", "Living room", "Common space", "Fire pit and grills"],
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/casco%20principal-my0NPpjT2onfJNeco2EQjQdhfc4PaM.jpg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/casco%20principal-my0NPpjT2onfJNeco2EQjQdhfc4PaM.jpg",
          ],
        },
        {
          id: "dormis",
          name: "Dormis",
          description: "Private rest near the main house.",
          fullDescription:
            "Five rooms located just meters from the Main House, each with a bed, bathroom, small wood stove, and mountain views. They allow you to rest with privacy without losing proximity to the common space of the casco, where the kitchen, dining room, and daily life of the sector are shared.",
          atmosphere: "Intimate and connected",
          stayType: "Privacy with community",
          features: ["Bed", "Private bathroom", "Wood stove", "Mountain views", "Close to main house"],
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dormis%202.png-NSXuH7a0Ig7T784CXaG8IgMCaJYBCr.jpeg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dormis%202.png-NSXuH7a0Ig7T784CXaG8IgMCaJYBCr.jpeg",
          ],
        },
        {
          id: "domo",
          name: "Yellow Dome",
          description: "More isolated, more private, more adventure.",
          fullDescription:
            "Located about 13 km west of the Main House, at the foot of the hills, it offers a more remote and adventurous experience. It has capacity for 3-4 people, a bathroom with shower, and an exterior with pergola, table, fire space, and outdoor cooking area.",
          atmosphere: "Adventurous and remote",
          stayType: "Independent glamping",
          features: [
            "Capacity 3-4 people",
            "Bathroom with shower",
            "Exterior pergola",
            "Fire space",
            "Outdoor cooking",
          ],
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/domo%20amarillo%204.png-Pa9P5IOL7wZojktUAvYpYuSd3zgZ7z.jpeg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/domo%20amarillo%204.png-Pa9P5IOL7wZojktUAvYpYuSd3zgZ7z.jpeg",
          ],
        },
        {
          id: "domos-selerpe",
          name: "El Selerpe Domes",
          description: "Among hills, water, and Andean silence.",
          fullDescription:
            "About 25 km northwest of the Main House, this set of 5 structures offers a more immersive mountain experience. It includes 4 bedroom domes with bed and bathroom, and a central main dome with kitchen, dining room, and living room. An environment of hills, meadows, nearby water, and a more panoramic scale of the landscape.",
          atmosphere: "Immersed in mountain",
          stayType: "Secluded refuge",
          features: [
            "4 bedroom domes",
            "Central dome with kitchen",
            "Dining and living room",
            "Hills and meadows setting",
            "Nearby water",
          ],
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/domos%20selerpe-6zYF7xtFcJWHfYAspk8KW6RRoTyeYM.jpg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/domos%20selerpe-6zYF7xtFcJWHfYAspk8KW6RRoTyeYM.jpg",
          ],
        },
        {
          id: "puesto-lolo",
          name: "Puesto Lolo",
          description: "A historic gem in the middle of the campo.",
          fullDescription:
            "The old Lolo outpost, preserved and renovated with respect for its history, its landscape, and its original way of inhabiting Wamani. Coming soon.",
          atmosphere: "Historic and authentic",
          stayType: "Traditional campo",
          features: ["Historic architecture", "Heritage preservation", "Unique landscape"],
          image: "/images/espacios/puesto-lolo.jpg",
          images: ["/images/espacios/puesto-lolo.jpg"],
          upcoming: true,
        },
        {
          id: "puesto-selerpe",
          name: "Puesto El Selerpe",
          description: "A restored refuge with mountain memory.",
          fullDescription:
            "An old campo house in the process of restoration, recovered with respect for its history, its materiality, and its bond with the landscape. Coming soon.",
          atmosphere: "Historic and contemplative",
          stayType: "Rural heritage",
          features: ["Respectful restoration", "Historic memory", "Bond with landscape"],
          image: "/images/espacios/puesto-selerpe.jpg",
          images: ["/images/espacios/puesto-selerpe.jpg"],
          upcoming: true,
        },
      ],
    },
  },

  experiencias: {
    es: {
      title: "Experiencias",
      subtitle: "Actividades que se adaptan a vos, no al revés",
      intro:
        "En Wamani las experiencias no son paquetes rígidos. Son posibilidades que se coordinan según el clima, el interés y el ritmo de cada visitante.",
      note:
        "Algunas experiencias culturales se desarrollan principalmente en español. El acompañamiento bilingüe puede coordinarse según disponibilidad.",
      experiences: [
        {
          id: "mountain-bike",
          name: "Mountain bike",
          description: "Pedalear Wamani entre caminos, desnivel y paisaje abierto.",
          fullDescription:
            "Wamani ofrece más de 75 kilómetros de caminos internos para recorrer en bicicleta, entre paisaje de campo, vistas de montaña y rutas de tierra que permiten vivir el territorio desde adentro.\n\nPueden venir grupos con sus propias bicicletas o aprovechar las disponibles en el campo: bicicletas mountain bike y mountain bikes eléctricas, según disponibilidad. Los recorridos pueden adaptarse en distancia, exigencia y ritmo, desde salidas más accesibles hasta trazados más físicos y desafiantes.\n\nEs una experiencia que combina esfuerzo, aventura y paisaje. Pedalear en Wamani no es solo hacer deporte: es moverse por un territorio amplio, silencioso y real, con una escala difícil de encontrar en otros lugares.",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mountain%20bike%20%281%29.png-npxPUsGIcehDZ0Z5KdhMo9n1WSpNFI.jpeg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mountain%20bike%20%281%29.png-npxPUsGIcehDZ0Z5KdhMo9n1WSpNFI.jpeg",
          ],
        },
        {
          id: "trekking",
          name: "Trekking",
          description: "Caminatas para entrar en el paisaje a otro ritmo.",
          fullDescription:
            "En Wamani se puede caminar de muchas maneras. Desde recorridos simples por los alrededores de los espacios y sus distintos entornos, hasta caminatas más largas y exigentes hacia cerros y sectores de mayor altura.\n\nAlgunas pueden hacerse de forma autónoma y otras requieren acompañamiento o guía, según la dificultad, la duración y el terreno. La experiencia cambia según el recorrido: a veces es una caminata serena para observar el paisaje; otras, una salida más física y desafiante para ganar altura y perspectiva.\n\nEs una forma directa de habitar la montaña y el campo, sintiendo el ritmo del terreno, el silencio y la dimensión del lugar.",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/expediciones%20de%20monta%C3%B1a%20%283%29.png-CEBRpDcDZgcG5HI9u8gAVqv4rESuTT.jpeg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/expediciones%20de%20monta%C3%B1a%20%283%29.png-CEBRpDcDZgcG5HI9u8gAVqv4rESuTT.jpeg",
          ],
        },
        {
          id: "cabalgatas",
          name: "Cabalgatas",
          description: "Recorridos a caballo por el campo, entre paisaje, silencio y tradición.",
          fullDescription:
            "Las cabalgatas permiten recorrer Wamani desde una lógica más ligada a la historia del lugar y a la forma en que siempre se transitó este territorio. Pueden ser paseos breves por los alrededores o salidas más largas entre paisajes abiertos, conectando un espacio con otro.\n\nEl ritmo a caballo cambia la percepción del paisaje: permite mirar distinto, moverse con más calma y entrar en relación con la escala del campo de una manera más profunda.\n\nSegún el recorrido y la experiencia de quienes participan, pueden plantearse opciones más tranquilas o travesías más extensas y aventureras.",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cabalgata%20%283%29.png-Hs3gabiXZzDGcZhP2rfBsRtvZHRKmT.jpeg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cabalgata%20%283%29.png-Hs3gabiXZzDGcZhP2rfBsRtvZHRKmT.jpeg",
          ],
        },
        {
          id: "exploracion",
          name: "Exploración interna",
          description: "Recorridos en camioneta o vehículo 4x4 por los caminos internos de Wamani.",
          fullDescription:
            "La exploración interna permite entender la escala real de Wamani recorriendo sus caminos en camioneta 4x4. Es una manera de conectar distintos sectores del campo, atravesar paisajes cambiantes y llegar a puntos que muestran mejor la amplitud, la geografía y el carácter remoto del lugar.\n\nMás que un simple traslado, es una experiencia en sí misma: abrirse paso por rutas de tierra, ver cómo cambia el entorno y descubrir rincones del campo que no se alcanzan a percibir desde un solo espacio.\n\nIdeal para quienes quieren conocer el territorio más a fondo, moverse con comodidad y sumar una dosis de aventura sin necesidad de hacerlo a pie o en bicicleta.",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exploracion%20interna.png-XDA8YJHOzm1ysJ7KQDBeUW3zoxoWL9.jpeg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exploracion%20interna.png-XDA8YJHOzm1ysJ7KQDBeUW3zoxoWL9.jpeg",
          ],
        },
        {
          id: "cultura",
          name: "Cultura de campo",
          description: "Compartir el campo con quienes lo conocen de verdad.",
          fullDescription:
            "Una de las experiencias más valiosas de Wamani es la posibilidad de compartir tiempo con baqueanos y gente de campo que viven —o han vivido siempre— en la zona. No como una representación para turistas, sino como un acercamiento real a una cultura que sigue viva.\n\nEso puede tomar distintas formas: acompañar una cabalgata, escuchar historias del lugar, compartir mates, conocer su forma de trabajo, visitar sus animales o incluso participar de experiencias más inmersivas, como pasar un día siguiendo su rutina: salir temprano a caballo, recorrer el campo, buscar y cuidar animales, y entender el territorio desde su mirada.\n\nTambién pueden organizarse encuentros más íntimos, como compartir un almuerzo en su casa, ser recibidos con su hospitalidad natural y conocer de cerca una manera de vivir profundamente ligada al paisaje.\n\nNota: algunas de estas experiencias se desarrollan principalmente en español y pueden requerir coordinación previa.",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cultura%20de%20campo%20%282%29.png-MgrwQNIDvWTzy58OvQmUYmCpZSZHA5.jpeg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cultura%20de%20campo%20%282%29.png-MgrwQNIDvWTzy58OvQmUYmCpZSZHA5.jpeg",
          ],
        },
        {
          id: "comida",
          name: "Comida regional",
          description: "Sabores caseros, locales y compartidos.",
          fullDescription:
            "La propuesta gastronómica de Wamani no busca lo gourmet ni lo sofisticado. Busca algo más auténtico: comidas caseras, locales y tradicionales, preparadas por gente de la zona y ligadas a la cultura mendocina.\n\nEmpanadas, asado, pan casero, sopaipillas, dulces y conservas forman parte de una cocina que no se vive solo en el plato, sino también en el proceso: prender el fuego, esperar, conversar, compartir un vino, aprender un repulgue, hacer una mermelada o entender por qué el asado es mucho más que alguien cocinando carne.\n\nSegún el momento y la disponibilidad, también pueden organizarse experiencias participativas para aprender a cocinar, cebar mate o compartir la mesa desde un lugar más cercano y tradicional.",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/comida%20regional%202.png-FjQFjNAQzPFHq0ZeWfNAKiTKVB7glU.jpeg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/comida%20regional%202.png-FjQFjNAQzPFHq0ZeWfNAKiTKVB7glU.jpeg",
          ],
        },
        {
          id: "cielos",
          name: "Cielos de montaña",
          description: "Noches de cielo abierto y silencio profundo.",
          fullDescription:
            "En Wamani, la noche también es parte de la experiencia. La escasa contaminación lumínica y la amplitud del paisaje hacen que el cielo se vea con una claridad y una profundidad poco comunes.\n\nA veces alcanza con sentarse junto al fogón en el Casco Principal y mirar hacia arriba. Otras veces, si el clima acompaña, pueden organizarse pequeñas caminatas nocturnas para apreciar mejor el cielo, el silencio y la sensación de inmensidad que aparece cuando baja la luz del día.\n\nNo se trata solo de observar estrellas, sino de vivir una noche distinta: más quieta, más abierta y más conectada con el paisaje.",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cielos%20de%20monta%C3%B1a-QpYkUxQrVk7cauBQ6ydWauEiF7h5Rd.jpg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cielos%20de%20monta%C3%B1a-QpYkUxQrVk7cauBQ6ydWauEiF7h5Rd.jpg",
          ],
        },
        {
          id: "expediciones",
          name: "Expediciones de montaña",
          description: "Salidas para quienes quieren ir más allá.",
          fullDescription:
            "Para quienes buscan una experiencia más exigente y aventurera, Wamani también puede abrir la puerta a salidas de montaña más intensas: campamentos, travesías o expediciones pensadas según el clima, el terreno y el nivel del grupo. Una de las posibilidades es coordinar una expedición al Pico Wamani, que alcanza los 5.000 metros.\n\nEstas experiencias requieren planificación y coordinación previa, y están más ligadas a la lógica de exploración, esfuerzo y permanencia en el paisaje que a una actividad puntual.\n\nEs la versión más remota y exigente de Wamani: menos comodidad, más territorio, más montaña y más sensación de estar realmente adentro del lugar.",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/expediciones%20de%20monta%C3%B1a%20%282%29.png-6QvAwcfpt81o7YVkU4pSkCAw1lL1N0.jpeg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/expediciones%20de%20monta%C3%B1a%20%282%29.png-6QvAwcfpt81o7YVkU4pSkCAw1lL1N0.jpeg",
          ],
        },
      ],
    },
    en: {
      title: "Experiences",
      subtitle: "Activities that adapt to you, not the other way around",
      intro:
        "At Wamani, experiences are not rigid packages. They are possibilities coordinated according to weather, interest, and each visitor's rhythm.",
      note:
        "Some cultural experiences are primarily in Spanish. Bilingual accompaniment may be coordinated upon request, depending on availability.",
      experiences: [
        {
          id: "mountain-bike",
          name: "Mountain bike",
          description: "Ride through Wamani across dirt roads, changing elevation, and wide open landscapes.",
          fullDescription:
            "Wamani offers more than 75 kilometers of internal roads to explore by bicycle, through open field landscapes, mountain views, and dirt tracks that let visitors experience the territory from within.\n\nGroups may arrive with their own bikes or use the bicycles available on site, including mountain bikes and electric mountain bikes, depending on availability. Routes can be adapted in distance, difficulty, and pace, from more accessible rides to physically demanding and challenging circuits.\n\nIt is an experience that combines effort, adventure, and landscape. Riding in Wamani is not just about sport: it is about moving through a vast, silent, and real territory on a scale that is hard to find elsewhere.",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mountain%20bike%20%281%29.png-npxPUsGIcehDZ0Z5KdhMo9n1WSpNFI.jpeg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mountain%20bike%20%281%29.png-npxPUsGIcehDZ0Z5KdhMo9n1WSpNFI.jpeg",
          ],
        },
        {
          id: "trekking",
          name: "Trekking",
          description: "Walk into the landscape at a different pace.",
          fullDescription:
            "In Wamani, walking can take many forms. From easy walks around the different spaces and surrounding environments to longer, more demanding hikes toward hills and higher elevations.\n\nSome can be done independently, while others require a guide or accompaniment depending on the difficulty, duration, and terrain. The experience changes with each route: sometimes it is a calm walk to observe the landscape; other times it is a more physical and challenging outing to gain altitude and perspective.\n\nIt is a direct way of inhabiting both mountain and field, feeling the rhythm of the land, the silence, and the scale of the place.",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/expediciones%20de%20monta%C3%B1a%20%283%29.png-CEBRpDcDZgcG5HI9u8gAVqv4rESuTT.jpeg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/expediciones%20de%20monta%C3%B1a%20%283%29.png-CEBRpDcDZgcG5HI9u8gAVqv4rESuTT.jpeg",
          ],
        },
        {
          id: "cabalgatas",
          name: "Horseback riding",
          description: "Horseback rides across the field, through landscape, silence, and tradition.",
          fullDescription:
            "Horseback riding allows visitors to experience Wamani through a logic more closely tied to the history of the place and the way this territory has always been traveled. It can take the form of short rides around the area or longer outings through open landscapes, connecting one space to another.\n\nThe pace of riding changes the way the landscape is perceived: it allows a different gaze, a calmer rhythm, and a deeper connection with the scale of the field.\n\nDepending on the route and the riders' experience, the outing can be more relaxed or become a longer and more adventurous crossing.",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cabalgata%20%283%29.png-Hs3gabiXZzDGcZhP2rfBsRtvZHRKmT.jpeg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cabalgata%20%283%29.png-Hs3gabiXZzDGcZhP2rfBsRtvZHRKmT.jpeg",
          ],
        },
        {
          id: "exploracion",
          name: "Internal exploration",
          description: "Explore Wamani's internal roads by truck or 4x4 vehicle.",
          fullDescription:
            "Internal exploration makes it possible to understand the true scale of Wamani by traveling its roads in a 4x4 vehicle. It is a way of connecting different parts of the property, crossing changing landscapes, and reaching places that better reveal the vastness, geography, and remote character of the land.\n\nMore than a simple transfer, it is an experience in itself: moving along dirt tracks, watching the environment change, and discovering corners of the field that cannot be understood from just one base.\n\nIt is ideal for those who want to know the territory more deeply, move comfortably, and add a sense of adventure without having to do it on foot or by bicycle.",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exploracion%20interna.png-XDA8YJHOzm1ysJ7KQDBeUW3zoxoWL9.jpeg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exploracion%20interna.png-XDA8YJHOzm1ysJ7KQDBeUW3zoxoWL9.jpeg",
          ],
        },
        {
          id: "cultura",
          name: "Field culture",
          description: "Share the field with those who truly know it.",
          fullDescription:
            "One of the most valuable experiences in Wamani is the possibility of spending time with local baqueanos and field people who live — or have always lived — in the area. Not as a staged performance for tourists, but as a real encounter with a culture that is still alive.\n\nThis can take different forms: joining a horseback outing, listening to stories of the place, sharing mate, learning how they work, visiting their animals, or even taking part in more immersive experiences such as spending a day following their routine: heading out early on horseback, crossing the field, searching for and caring for animals, and understanding the territory through their perspective.\n\nMore intimate encounters can also be organized, such as sharing lunch at their home, being welcomed with their natural hospitality, and getting close to a way of life deeply tied to the landscape.\n\nNote: some of these experiences take place mainly in Spanish and may require prior coordination.",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cultura%20de%20campo%20%282%29.png-MgrwQNIDvWTzy58OvQmUYmCpZSZHA5.jpeg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cultura%20de%20campo%20%282%29.png-MgrwQNIDvWTzy58OvQmUYmCpZSZHA5.jpeg",
          ],
        },
        {
          id: "comida",
          name: "Regional cuisine",
          description: "Homemade, local, shared flavors.",
          fullDescription:
            "Wamani's food experience does not aim to be gourmet or overly sophisticated. It aims for something more authentic: homemade, local, and traditional meals prepared by people from the area and closely tied to Mendoza's culture.\n\nEmpanadas, asado, homemade bread, sopaipillas, jams, and preserves are part of a cuisine that is not only about what is served on the plate, but also about the process: lighting the fire, waiting, talking, sharing wine, learning how to seal an empanada, making jam, or understanding why asado is much more than someone simply cooking meat.\n\nDepending on the moment and availability, participatory experiences can also be organized to learn cooking, mate preparation, or to share the table in a closer and more traditional way.",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/comida%20regional%202.png-FjQFjNAQzPFHq0ZeWfNAKiTKVB7glU.jpeg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/comida%20regional%202.png-FjQFjNAQzPFHq0ZeWfNAKiTKVB7glU.jpeg",
          ],
        },
        {
          id: "cielos",
          name: "Mountain skies",
          description: "Open skies and deep mountain silence.",
          fullDescription:
            "At Wamani, night is also part of the experience. The low light pollution and the openness of the landscape allow the sky to be seen with unusual clarity and depth.\n\nSometimes it is enough to sit by the fire at the Casco Principal and look up. Other times, if the weather allows, small night walks can be organized to better appreciate the sky, the silence, and the feeling of vastness that arrives when daylight fades.\n\nIt is not only about observing stars, but about living a different kind of night: quieter, more open, and more connected to the landscape.",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cielos%20de%20monta%C3%B1a-QpYkUxQrVk7cauBQ6ydWauEiF7h5Rd.jpg",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cielos%20de%20monta%C3%B1a-QpYkUxQrVk7cauBQ6ydWauEiF7h5Rd.jpg",
          ],
        },
        {
          id: "expediciones",
          name: "Mountain expeditions",
          description: "For those who want to go further.",
          fullDescription:
            "For those seeking a more demanding and adventurous experience, Wamani can also open the door to more intense mountain outings: camps, crossings, or expeditions planned according to weather, terrain, and the group's level. One possibility is coordinating an expedition to Wamani Peak, which reaches 5,000 meters.\n\nThese experiences require planning and prior coordination, and are more closely tied to exploration, effort, and staying in the landscape than to a one-off activity.\n\nIt is Wamani's most remote and demanding version: less comfort, more territory, more mountain, and a stronger feeling of truly being inside the place.",
          image: "/images/experiencias/expediciones.jpg",
          images: ["/images/experiencias/expediciones.jpg"],
        },
      ],
    },
  },

  galeria: {
    es: {
      title: "Galería",
      subtitle: "Imágenes que cuentan lo que las palabras no alcanzan",
      cta: "Ver galería completa",
      categories: {
        all: "Todo",
        landscape: "Paisaje",
        spaces: "Espacios",
        adventure: "Aventura",
        life: "Vida de campo",
      },
      featured: {
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/L1002444-4tVHGYfq3QWXUZGzS5eWfKSicKsxvu.jpg",
        caption: "Caminantes en la inmensidad del valle, con el cerro volcánico de fondo",
        alt: "Dos caminantes en pradera verde con cerro volcánico y cielo azul",
      },
      images: [
        {
          id: "paisaje-1",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/81.png-TIvvf9xkVX5WDcjyPB4rA9256WVymj.jpeg",
          alt: "Cordones montañosos con tonos ocres y verdes bajo cielo nublado",
          category: "landscape",
        },
        {
          id: "paisaje-2",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/87.JPG-aiFr0SflJ3kFBHvXyU2JWXxLXdJ65q.jpeg",
          alt: "Volcán nevado en invierno con paisaje blanco",
          category: "landscape",
        },
        {
          id: "vida-1",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/70-ZSMGoZ4rxAoECHp324zhA5MAsyEZ6z.jpg",
          alt: "Baqueano con caballos de carga en blanco y negro",
          category: "life",
        },
        {
          id: "aventura-1",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/L1002424-X6g6cpfgWgJ2ahyiVs7vSMwO0b7CL1.jpg",
          alt: "Caminante solitario en la inmensidad de la montaña, blanco y negro",
          category: "adventure",
        },
        {
          id: "vida-2",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/74.png-WVdWVEP27gzR14yxZr5HGrWcZoLtyF.jpeg",
          alt: "Guanaco joven en ladera de montaña bajo cielo nublado",
          category: "life",
        },
        {
          id: "aventura-2",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/L1000056-s0s8CcTvDNroLxNY5Zz4N1jH5AjPGc.jpg",
          alt: "Jinete con caballo blanco en valle verde con volcán de fondo",
          category: "adventure",
        },
        {
          id: "paisaje-3",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3653-CM9ZjP5fxxPga9jBuua4fuCbYwCM1b.jpg",
          alt: "Amanecer espectacular desde cumbre de montaña con carpa",
          category: "landscape",
        },
        {
          id: "vida-3",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/L1000086-EVj9ieDqio8WjsSVeeulPk5bU86vWd.jpg",
          alt: "Caballo blanco ensillado en primer plano, blanco y negro",
          category: "life",
        },
        {
          id: "aventura-3",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/L1002591-DN63T6aej5XYEC7seC2jLboK9HCvIk.jpg",
          alt: "Caminante en terreno rocoso con cumbres nevadas al fondo",
          category: "adventure",
        },
        {
          id: "paisaje-4",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/85.png-pdPqFw35LLV29As8pumTkc4EfInT8V.jpeg",
          alt: "Imponente cerro nevado con cielo azul despejado",
          category: "landscape",
        },
        {
          id: "paisaje-5",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/84.png-98xfuZSMTpVBarpR9Q8DuhL2dgly6l.jpeg",
          alt: "Cono volcánico nevado perfectamente simétrico",
          category: "landscape",
        },
        {
          id: "aventura-4",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/L1002459-ZBQEoqlfqiuWbwX6qH45MC7OMkFffl.jpg",
          alt: "Tres caballos en valle verde con formaciones rocosas rojas",
          category: "adventure",
        },
        {
          id: "paisaje-6",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/100-m3vlUkOLAMkxuOyz6TRIGoSxz7ZVnv.jpg",
          alt: "Paisaje volcánico con nubes dramáticas, blanco y negro",
          category: "landscape",
        },
        {
          id: "vida-4",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/95.png-3wobM0lqXjHQDyp6SQkMc01pyqUgAQ.jpeg",
          alt: "Loica posada en rama con volcán nevado de fondo",
          category: "life",
        },
        {
          id: "espacios-1",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/96.png-6F833SZjGt1vnqkWQJqEx5a7Qs9HOb.jpeg",
          alt: "Paneles solares con volcán nevado y ramas en primer plano",
          category: "spaces",
        },
      ],
    },
    en: {
      title: "Gallery",
      subtitle: "Images that tell what words cannot reach",
      cta: "View full gallery",
      categories: {
        all: "All",
        landscape: "Landscape",
        spaces: "Spaces",
        adventure: "Adventure",
        life: "Country life",
      },
      featured: {
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/L1002444-4tVHGYfq3QWXUZGzS5eWfKSicKsxvu.jpg",
        caption: "Hikers in the vastness of the valley, with a volcanic peak in the background",
        alt: "Two hikers on green meadow with volcanic mountain and blue sky",
      },
      images: [
        {
          id: "paisaje-1",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/81.png-TIvvf9xkVX5WDcjyPB4rA9256WVymj.jpeg",
          alt: "Mountain ridges with ochre and green tones under cloudy sky",
          category: "landscape",
        },
        {
          id: "paisaje-2",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/87.JPG-aiFr0SflJ3kFBHvXyU2JWXxLXdJ65q.jpeg",
          alt: "Snow-covered volcano in winter landscape",
          category: "landscape",
        },
        {
          id: "vida-1",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/70-ZSMGoZ4rxAoECHp324zhA5MAsyEZ6z.jpg",
          alt: "Baqueano with pack horses in black and white",
          category: "life",
        },
        {
          id: "aventura-1",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/L1002424-X6g6cpfgWgJ2ahyiVs7vSMwO0b7CL1.jpg",
          alt: "Lone hiker in the vastness of the mountain, black and white",
          category: "adventure",
        },
        {
          id: "vida-2",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/74.png-WVdWVEP27gzR14yxZr5HGrWcZoLtyF.jpeg",
          alt: "Young guanaco on mountain slope under cloudy sky",
          category: "life",
        },
        {
          id: "aventura-2",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/L1000056-s0s8CcTvDNroLxNY5Zz4N1jH5AjPGc.jpg",
          alt: "Rider with white horse in green valley with volcano backdrop",
          category: "adventure",
        },
        {
          id: "paisaje-3",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3653-CM9ZjP5fxxPga9jBuua4fuCbYwCM1b.jpg",
          alt: "Spectacular sunrise from mountain summit with tent",
          category: "landscape",
        },
        {
          id: "vida-3",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/L1000086-EVj9ieDqio8WjsSVeeulPk5bU86vWd.jpg",
          alt: "White saddled horse close-up, black and white",
          category: "life",
        },
        {
          id: "aventura-3",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/L1002591-DN63T6aej5XYEC7seC2jLboK9HCvIk.jpg",
          alt: "Hiker on rocky terrain with snow-capped peaks behind",
          category: "adventure",
        },
        {
          id: "paisaje-4",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/85.png-pdPqFw35LLV29As8pumTkc4EfInT8V.jpeg",
          alt: "Imposing snow-covered mountain under clear blue sky",
          category: "landscape",
        },
        {
          id: "paisaje-5",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/84.png-98xfuZSMTpVBarpR9Q8DuhL2dgly6l.jpeg",
          alt: "Perfectly symmetrical snow-covered volcanic cone",
          category: "landscape",
        },
        {
          id: "aventura-4",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/L1002459-ZBQEoqlfqiuWbwX6qH45MC7OMkFffl.jpg",
          alt: "Three horses in green valley with red rock formations",
          category: "adventure",
        },
        {
          id: "paisaje-6",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/100-m3vlUkOLAMkxuOyz6TRIGoSxz7ZVnv.jpg",
          alt: "Volcanic landscape with dramatic clouds, black and white",
          category: "landscape",
        },
        {
          id: "vida-4",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/95.png-3wobM0lqXjHQDyp6SQkMc01pyqUgAQ.jpeg",
          alt: "Long-tailed meadowlark perched on branch with snowy volcano",
          category: "life",
        },
        {
          id: "espacios-1",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/96.png-6F833SZjGt1vnqkWQJqEx5a7Qs9HOb.jpeg",
          alt: "Solar panels with snowy volcano and branches in foreground",
          category: "spaces",
        },
      ],
    },
  },

  dondeEstamos: {
    es: {
      title: "Dónde estamos",
      subtitle: "Una ubicación remota en el corazón de Mendoza",
      intro:
        "Wamani está ubicado en San Carlos, en el Valle de Uco, una de las zonas más auténticas y menos exploradas de Mendoza. Un territorio de campo y precordillera alejado de los circuitos turísticos tradicionales.",
      argentina: "Argentina",
      mendoza: "Mendoza",
      sanCarlos: "San Carlos",
      valleDeUco: "Valle de Uco",
    },
    en: {
      title: "Where we are",
      subtitle: "A remote location in the heart of Mendoza",
      intro:
        "Wamani is located in San Carlos, in the Uco Valley, one of Mendoza's most authentic and least explored areas. A territory of countryside and foothills away from traditional tourist circuits.",
      argentina: "Argentina",
      mendoza: "Mendoza",
      sanCarlos: "San Carlos",
      valleDeUco: "Uco Valley",
    },
  },

  comoLlegar: {
    es: {
      title: "Cómo llegar",
      subtitle: "El viaje es parte de la experiencia",
      intro:
        "Parte de lo que hace especial a Wamani es que llegar todavía requiere decisión. No está pensado para el apuro, sino para personas que entienden que algunos lugares conservan su magia precisamente porque no están al alcance fácil.",
      details: [
        {
          title: "Tiempo de viaje",
          description: "Aproximadamente 3 horas en vehículo desde la ciudad de Mendoza.",
        },
        {
          title: "Vehículo recomendado",
          description:
            "Pick-up, 4x4 o vehículo alto para mayor comodidad. Otros vehículos pueden llegar, solo más lento y con cuidado en el tramo de ripio.",
        },
        {
          title: "Tramo final",
          description: "El último tramo es camino de ripio. Parte del encanto de llegar.",
        },
        {
          title: "Vuelos privados",
          description:
            "La propiedad cuenta con pista de aterrizaje y podemos ayudar con la gestión del vuelo privado.",
        },
      ],
      mapLabel: "Ver ubicación en mapa",
    },
    en: {
      title: "How to get here",
      subtitle: "The journey is part of the experience",
      intro:
        "Part of what makes Wamani special is that getting here still requires intention. It is not made for rush, but for people who understand that some places preserve their magic precisely because they are not easy to reach.",
      details: [
        {
          title: "Travel time",
          description: "Approximately 3 hours by vehicle from Mendoza city.",
        },
        {
          title: "Recommended vehicle",
          description:
            "Pickup, 4x4, or high-clearance vehicle for comfort. Other vehicles can arrive, just slower and more carefully on the gravel stretch.",
        },
        {
          title: "Final stretch",
          description: "The last stretch is gravel road. Part of the charm of arriving.",
        },
        {
          title: "Private flights",
          description:
            "The property has its own airstrip, and we can help coordinate private flight arrangements.",
        },
      ],
      mapLabel: "View location on map",
    },
  },

  conservacion: {
    es: {
      title: "Conservación",
      subtitle: "Conocer un paisaje es la primera forma de empezar a cuidarlo.",
      intro:
        "Wamani existe en un paisaje que merece ser cuidado. Creemos que la mejor forma de proteger un territorio es habitarlo con respeto, conocerlo de cerca y entender que somos parte de algo más grande.",
      closeButton: "Cerrar",
      sections: [
        {
          id: "paisaje",
          title: "Paisaje y escala",
          description:
            "Miles de hectáreas de campo y montaña con baja intervención humana. Un territorio donde la naturaleza todavía marca el ritmo.",
          fullDescription:
            "El paisaje de Wamani abarca miles de hectáreas de campo y precordillera con mínima intervención humana. Esta escala permite que los procesos naturales sigan su curso, que las especies se muevan libremente y que el territorio mantenga su carácter original.",
          icon: "mountain",
          items: [
            {
              name: "Precordillera andina",
              scientificName: null,
              description:
                "Formaciones geológicas de millones de años que definen el paisaje y crean microclimas únicos.",
              image: "/images/conservacion/precordillera.jpg",
              notes: "Alturas entre 1.800 y 3.500 msnm",
            },
            {
              name: "Llanura de jarillal",
              scientificName: null,
              description:
                "Extensiones de monte bajo dominadas por arbustos adaptados a la aridez.",
              image: "/images/conservacion/jarillal.jpg",
              notes: "Ecosistema característico del monte cuyano",
            },
          ],
        },
        {
          id: "flora",
          title: "Flora nativa",
          description:
            "Vegetación de monte y precordillera adaptada a la aridez y la altura. Especies que sobreviven porque el lugar las deja ser.",
          fullDescription:
            "La flora de Wamani es un muestrario de adaptación a condiciones extremas: aridez, amplitud térmica y suelos pobres. Cada especie que habita aquí lo hace porque encontró su nicho en este paisaje exigente.",
          icon: "leaf",
          items: [
            {
              name: "Jarilla",
              scientificName: "Larrea cuneifolia",
              description:
                "Arbusto resinoso dominante del monte, adaptado a la sequía extrema. Sus hojas liberan un aroma característico después de la lluvia.",
              image: "/images/conservacion/jarilla.jpg",
              notes: "Especie emblema del monte cuyano",
            },
            {
              name: "Algarrobo",
              scientificName: "Prosopis flexuosa",
              description:
                "Árbol legendario del desierto, capaz de alcanzar aguas subterráneas profundas. Sus vainas fueron alimento ancestral.",
              image: "/images/conservacion/algarrobo.jpg",
              notes: "Puede vivir varios siglos",
            },
            {
              name: "Chañar",
              scientificName: "Geoffroea decorticans",
              description:
                "Árbol de frutos dulces y corteza que se desprende en placas. Importante recurso para la fauna local.",
              image: "/images/conservacion/chanar.jpg",
              notes: null,
            },
            {
              name: "Zampa",
              scientificName: "Atriplex lampa",
              description:
                "Arbusto de suelos salinos que indica la presencia de napas cercanas.",
              image: "/images/conservacion/zampa.jpg",
              notes: "Indicador de aguas subterráneas",
            },
          ],
        },
        {
          id: "fauna",
          title: "Fauna",
          description:
            "Guanacos, zorros, águilas, cóndores y otras especies que habitan el territorio. Avistajes posibles según temporada y suerte.",
          fullDescription:
            "La fauna de Wamani incluye especies emblemáticas de la precordillera argentina. Los avistajes dependen de la temporada, el clima y el silencio con que uno se mueva por el territorio.",
          icon: "bird",
          items: [
            {
              name: "Guanaco",
              scientificName: "Lama guanicoe",
              description:
                "Camélido silvestre que habita las laderas y planicies. Se mueve en grupos familiares y es símbolo del paisaje patagónico y cuyano.",
              image: "/images/conservacion/guanaco.jpg",
              notes: "Mejor época: otoño e invierno",
            },
            {
              name: "Cóndor andino",
              scientificName: "Vultur gryphus",
              description:
                "El ave voladora más grande del hemisferio occidental. Planea sobre las corrientes térmicas de la cordillera.",
              image: "/images/conservacion/condor.jpg",
              notes: "Envergadura hasta 3,2 metros",
            },
            {
              name: "Zorro colorado",
              scientificName: "Lycalopex culpaeus",
              description:
                "Cánido adaptable que recorre grandes distancias. Activo principalmente al amanecer y atardecer.",
              image: "/images/conservacion/zorro.jpg",
              notes: "Especie crepuscular",
            },
            {
              name: "Águila mora",
              scientificName: "Geranoaetus melanoleucus",
              description:
                "Rapaz de gran tamaño que caza liebres y roedores. Común en zonas abiertas de montaña.",
              image: "/images/conservacion/aguila.jpg",
              notes: null,
            },
            {
              name: "Puma",
              scientificName: "Puma concolor",
              description:
                "El gran felino de América. Presente en el territorio pero de avistaje muy poco frecuente debido a sus hábitos esquivos.",
              image: "/images/conservacion/puma.jpg",
              notes: "Especie elusiva, rara vez avistada",
            },
            {
              name: "Zorro gris",
              scientificName: "Lycalopex griseus",
              description:
                "Cánido pequeño y ágil de pelaje gris plateado. Habita las zonas abiertas y se alimenta de roedores, insectos y frutos.",
              image: "/images/conservacion/zorro-gris.jpg",
              notes: "Más pequeño que el zorro colorado",
            },
            {
              name: "Ñandú petiso",
              scientificName: "Rhea pennata",
              description:
                "Ave corredora no voladora endémica de Sudamérica. Habita las estepas y pastizales abiertos, donde se mueve en pequeños grupos.",
              image: "/images/conservacion/nandu.jpg",
              notes: "Especie vulnerable",
            },
          ],
        },
        {
          id: "agua",
          title: "Agua y silencio",
          description:
            "Arroyos, vertientes y el sonido del viento. Recursos que cuidamos porque entendemos su valor.",
          fullDescription:
            "En una región semiárida, el agua es el recurso más valioso. Wamani cuenta con arroyos permanentes, vertientes, vegas y napas que sostienen la vida del territorio. El silencio, igualmente escaso en el mundo actual, es otro recurso que protegemos.",
          icon: "droplets",
          items: [
            {
              name: "Arroyos",
              scientificName: null,
              description:
                "Tres arroyos atraviesan la propiedad: Arroyo Hondo, Arroyo La Faja y Arroyo Las Cortaderas. Son parte de la lógica hídrica permanente del territorio.",
              image: "/images/conservacion/arroyo.jpg",
              notes: "Cursos de agua permanentes",
            },
            {
              name: "Vegas",
              scientificName: null,
              description:
                "Humedales de altura que funcionan como esponjas naturales: absorben agua cuando abunda y la liberan lentamente en épocas secas, sosteniendo arroyos y creando refugios verdes vitales.",
              image: "/images/conservacion/vegas.jpg",
              notes: "Ecosistemas frágiles y vitales",
            },
            {
              name: "Vertientes",
              scientificName: null,
              description:
                "Afloramientos naturales de agua subterránea que crean oasis de vegetación en el paisaje árido.",
              image: "/images/conservacion/vertiente.jpg",
              notes: "Puntos de encuentro para la fauna",
            },
            {
              name: "Silencio natural",
              scientificName: null,
              description:
                "Ausencia de contaminación sonora. Solo el viento, los pájaros y el agua en movimiento.",
              image: "/images/conservacion/silencio.jpg",
              notes: "Menos de 20 dB en noches calmas",
            },
          ],
        },
      ],
      future:
        "Estamos abiertos a alianzas y colaboraciones con organizaciones de conservación que compartan nuestra visión.",
    },
    en: {
      title: "Conservation",
      subtitle: "To know a landscape is the first step toward caring for it.",
      intro:
        "Wamani exists in a landscape that deserves to be cared for. We believe the best way to protect a territory is to inhabit it with respect, know it closely, and understand that we are part of something larger.",
      closeButton: "Close",
      sections: [
        {
          id: "paisaje",
          title: "Landscape and scale",
          description:
            "Thousands of hectares of field and mountain with low human intervention. A territory where nature still sets the rhythm.",
          fullDescription:
            "Wamani's landscape spans thousands of hectares of field and foothills with minimal human intervention. This scale allows natural processes to run their course, species to move freely, and the territory to maintain its original character.",
          icon: "mountain",
          items: [
            {
              name: "Andean foothills",
              scientificName: null,
              description:
                "Geological formations millions of years old that define the landscape and create unique microclimates.",
              image: "/images/conservacion/precordillera.jpg",
              notes: "Elevations between 1,800 and 3,500 masl",
            },
            {
              name: "Jarillal plains",
              scientificName: null,
              description:
                "Extensions of low scrubland dominated by shrubs adapted to aridity.",
              image: "/images/conservacion/jarillal.jpg",
              notes: "Characteristic ecosystem of the Cuyo monte",
            },
          ],
        },
        {
          id: "flora",
          title: "Native flora",
          description:
            "Scrubland and foothill vegetation adapted to aridity and altitude. Species that survive because the place lets them be.",
          fullDescription:
            "Wamani's flora is a showcase of adaptation to extreme conditions: aridity, thermal amplitude, and poor soils. Every species that lives here does so because it found its niche in this demanding landscape.",
          icon: "leaf",
          items: [
            {
              name: "Jarilla",
              scientificName: "Larrea cuneifolia",
              description:
                "Dominant resinous shrub of the monte, adapted to extreme drought. Its leaves release a characteristic scent after rain.",
              image: "/images/conservacion/jarilla.jpg",
              notes: "Emblematic species of the Cuyo monte",
            },
            {
              name: "Algarrobo",
              scientificName: "Prosopis flexuosa",
              description:
                "Legendary desert tree, capable of reaching deep underground water. Its pods were ancestral food.",
              image: "/images/conservacion/algarrobo.jpg",
              notes: "Can live several centuries",
            },
            {
              name: "Chañar",
              scientificName: "Geoffroea decorticans",
              description:
                "Tree with sweet fruits and bark that peels in plates. Important resource for local wildlife.",
              image: "/images/conservacion/chanar.jpg",
              notes: null,
            },
            {
              name: "Zampa",
              scientificName: "Atriplex lampa",
              description:
                "Saline soil shrub that indicates the presence of nearby water tables.",
              image: "/images/conservacion/zampa.jpg",
              notes: "Groundwater indicator",
            },
          ],
        },
        {
          id: "fauna",
          title: "Wildlife",
          description:
            "Guanacos, foxes, eagles, condors, and other species that inhabit the territory. Sightings possible depending on season and luck.",
          fullDescription:
            "Wamani's wildlife includes emblematic species of the Argentine foothills. Sightings depend on the season, weather, and the silence with which one moves through the territory.",
          icon: "bird",
          items: [
            {
              name: "Guanaco",
              scientificName: "Lama guanicoe",
              description:
                "Wild camelid that inhabits the slopes and plains. Moves in family groups and is a symbol of the Patagonian and Cuyo landscape.",
              image: "/images/conservacion/guanaco.jpg",
              notes: "Best season: autumn and winter",
            },
            {
              name: "Andean condor",
              scientificName: "Vultur gryphus",
              description:
                "The largest flying bird in the Western Hemisphere. Glides on the thermal currents of the mountain range.",
              image: "/images/conservacion/condor.jpg",
              notes: "Wingspan up to 3.2 meters",
            },
            {
              name: "Culpeo fox",
              scientificName: "Lycalopex culpaeus",
              description:
                "Adaptable canid that covers large distances. Active mainly at dawn and dusk.",
              image: "/images/conservacion/zorro.jpg",
              notes: "Crepuscular species",
            },
            {
              name: "Black-chested buzzard-eagle",
              scientificName: "Geranoaetus melanoleucus",
              description:
                "Large raptor that hunts hares and rodents. Common in open mountain areas.",
              image: "/images/conservacion/aguila.jpg",
              notes: null,
            },
            {
              name: "Puma",
              scientificName: "Puma concolor",
              description:
                "The great American feline. Present in the territory but very rarely sighted due to its elusive habits.",
              image: "/images/conservacion/puma.jpg",
              notes: "Elusive species, rarely seen",
            },
            {
              name: "South American gray fox",
              scientificName: "Lycalopex griseus",
              description:
                "A small, agile canid with silvery-gray fur. Inhabits open areas and feeds on rodents, insects, and fruits.",
              image: "/images/conservacion/zorro-gris.jpg",
              notes: "Smaller than the culpeo fox",
            },
            {
              name: "Lesser rhea",
              scientificName: "Rhea pennata",
              description:
                "A flightless running bird endemic to South America. Inhabits steppes and open grasslands, moving in small groups.",
              image: "/images/conservacion/nandu.jpg",
              notes: "Vulnerable species",
            },
          ],
        },
        {
          id: "agua",
          title: "Water and silence",
          description:
            "Streams, springs, and the sound of wind. Resources we care for because we understand their value.",
          fullDescription:
            "In a semi-arid region, water is the most valuable resource. Wamani has permanent streams, springs, vegas, and aquifers that sustain the territory's life. Silence, equally scarce in today's world, is another resource we protect.",
          icon: "droplets",
          items: [
            {
              name: "Streams",
              scientificName: null,
              description:
                "Three streams cross the property: Arroyo Hondo, Arroyo La Faja, and Arroyo Las Cortaderas. They are part of the territory's permanent water system.",
              image: "/images/conservacion/arroyo.jpg",
              notes: "Permanent watercourses",
            },
            {
              name: "Vegas",
              scientificName: null,
              description:
                "High-altitude wetlands that act as natural sponges: they absorb water when abundant and release it slowly during dry periods, sustaining streams and creating vital green refuges.",
              image: "/images/conservacion/vegas.jpg",
              notes: "Fragile and vital ecosystems",
            },
            {
              name: "Springs",
              scientificName: null,
              description:
                "Natural groundwater outcrops that create oases of vegetation in the arid landscape.",
              image: "/images/conservacion/vertiente.jpg",
              notes: "Meeting points for wildlife",
            },
            {
              name: "Natural silence",
              scientificName: null,
              description:
                "Absence of noise pollution. Only wind, birds, and water in movement.",
              image: "/images/conservacion/silencio.jpg",
              notes: "Less than 20 dB on calm nights",
            },
          ],
        },
      ],
      future:
        "We are open to alliances and collaborations with conservation organizations that share our vision.",
    },
  },

  antesDeVenir: {
    es: {
      title: "Antes de venir",
      subtitle: "Lo que necesitás saber para planificar tu visita",
      items: [
        {
          title: "Acceso y vehículo",
          content:
            "Recomendamos vehículo alto (pick-up, 4x4 o similar). El tramo final de ripio requiere altura. Podemos coordinar traslados si es necesario.",
        },
        {
          title: "Qué incluye la estadía",
          content:
            "Alojamiento, comidas caseras, acceso a la propiedad y coordinación de experiencias básicas. Consultar por detalles específicos.",
        },
        {
          title: "Servicios opcionales",
          content:
            "Algunas actividades pueden tener costo adicional: cabalgatas extendidas, guías especializados, traslados, vuelos privados.",
        },
        {
          title: "Conectividad",
          content:
            "Contamos con Starlink para conectividad básica. Sin embargo, el foco de Wamani es la desconexión. Recomendamos aprovechar el silencio.",
        },
        {
          title: "Clima y temporadas",
          content:
            "El clima varía según la época del año. Veranos cálidos, inviernos fríos con posible nieve. Algunas actividades dependen de condiciones climáticas.",
        },
        {
          title: "Qué traer",
          content:
            "Ropa cómoda para campo, capas para frío, protección solar, calzado para caminar. Consultanos antes de venir para recomendaciones específicas.",
        },
        {
          title: "Distancias internas",
          content:
            "La propiedad es grande. Algunos puntos requieren traslado en vehículo. Las experiencias se coordinan considerando estas distancias.",
        },
        {
          title: "Coordinación previa",
          content:
            "Algunas experiencias requieren planificación anticipada. Recomendamos consultar con tiempo para armar tu estadía a medida.",
        },
      ],
    },
    en: {
      title: "Before you come",
      subtitle: "What you need to know to plan your visit",
      items: [
        {
          title: "Access and vehicle",
          content:
            "We recommend a high-clearance vehicle (pickup, 4x4, or similar). The final gravel stretch requires clearance. We can coordinate transfers if needed.",
        },
        {
          title: "What's included",
          content:
            "Accommodation, homemade meals, property access, and coordination of basic experiences. Ask for specific details.",
        },
        {
          title: "Optional services",
          content:
            "Some activities may have additional cost: extended horseback rides, specialized guides, transfers, private flights.",
        },
        {
          title: "Connectivity",
          content:
            "We have Starlink for basic connectivity. However, Wamani's focus is disconnection. We recommend embracing the silence.",
        },
        {
          title: "Climate and seasons",
          content:
            "Weather varies by season. Warm summers, cold winters with possible snow. Some activities depend on weather conditions.",
        },
        {
          title: "What to bring",
          content:
            "Comfortable field clothes, layers for cold, sun protection, walking shoes. Contact us before coming for specific recommendations.",
        },
        {
          title: "Internal distances",
          content:
            "The property is large. Some points require vehicle transfer. Experiences are coordinated considering these distances.",
        },
        {
          title: "Prior coordination",
          content:
            "Some experiences require advance planning. We recommend contacting us early to build your custom stay.",
        },
      ],
    },
  },

  bitacora: {
    es: {
      title: "Bitácora",
      subtitle: "Un espacio para historias, anécdotas y memorias del campo.",
      emptyState: {
        message: "Próximamente: relatos desde Wamani",
        description:
          "Este espacio irá creciendo con historias del territorio, sus estaciones, su gente y los momentos que solo suceden aquí.",
      },
      placeholderCategories: ["Estaciones", "Paisaje", "Cielos", "Sabores"],
      entries: [],
    },
    en: {
      title: "Journal",
      subtitle: "A space for stories, anecdotes, and memories from the field.",
      emptyState: {
        message: "Coming soon: stories from Wamani",
        description:
          "This space will grow with tales of the territory, its seasons, its people, and the moments that only happen here.",
      },
      placeholderCategories: ["Seasons", "Landscape", "Skies", "Flavors"],
      entries: [],
    },
  },

  contacto: {
    es: {
      title: "¿Querés conocer Wamani?",
      subtitle:
        "Escribinos por WhatsApp, mail o completá el formulario para empezar a planear tu experiencia.",
      description:
        "Cada estadía puede comenzar con una conversación y armarse en torno a la calma, la aventura, la cultura o una mezcla personalizada.",
      form: {
        name: "Nombre",
        email: "Email",
        message: "Contanos qué tipo de experiencia te interesa",
        submit: "Enviar consulta",
        success: "Gracias por tu mensaje. Te responderemos pronto.",
      },
    },
    en: {
      title: "Interested in Wamani?",
      subtitle:
        "Message us on WhatsApp, send us an email, or fill out the form to start planning your stay.",
      description:
        "Each stay can begin with a conversation and take shape around calm, adventure, culture, or a tailored mix.",
      form: {
        name: "Name",
        email: "Email",
        message: "Tell us what kind of experience interests you",
        submit: "Send inquiry",
        success: "Thank you for your message. We will respond soon.",
      },
    },
  },

  footer: {
    es: {
      copyright: "Wamani. Todos los derechos reservados.",
    },
    en: {
      copyright: "Wamani. All rights reserved.",
    },
  },
}