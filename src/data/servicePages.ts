// Contenido de las páginas por servicio (se generan como HTML al compilar; ver scripts/prerender.mjs).
// Todo lo que dice cada página sale de aquí. Los datos del negocio se confirmaron con la dueña/el dueño:
// 10 años de experiencia, desde 1 unidad, entrega el mismo día o máximo en 2 días (pedidos pequeños),
// camiseta piel de durazno desde $25.000, DTF también en gorras, sublimación de mugs y camisetas en telas blancas,
// horario de lunes a sábado de 8:30 AM a 6:30 PM.

export interface ServicePageData {
  slug: string
  navLabel: string
  title: string
  metaDescription: string
  eyebrow: string
  h1: string
  lead: string
  facts: string[]
  image: { src: string; alt: string }
  sections: { heading: string; paragraphs?: string[]; bullets?: string[] }[]
  steps: string[]
  faqs: { q: string; a: string }[]
  whatsappMessage: string
}

export const SITE = {
  origin: 'https://art2artestampados.com',
  name: 'Art2Art Estampados',
  schedule: 'Lunes a sábado: 8:30 AM – 6:30 PM',
  address: 'Cra 9A #12-53, Guadalajara de Buga, Valle del Cauca',
  whatsappDisplay: '+57 318 266 0432',
  whatsappRaw: '573182660432',
}

const PASOS_DISENO =
  'Envíanos tu diseño por WhatsApp. Lo ideal es un PNG con fondo transparente a 300 DPI o un archivo vectorial (PDF, AI o SVG); si lo tienes en JPG de buena resolución, te ayudamos a prepararlo.'

export const SERVICE_PAGES: ServicePageData[] = [
  {
    slug: 'estampados-dtf-buga',
    navLabel: 'Estampado DTF',
    title: 'Estampados DTF en Buga desde 1 unidad | Art2Art Estampados',
    metaDescription:
      'Estampado DTF a todo color en Buga: camisetas de algodón, piel de durazno y oversize, gorras y más desde 1 unidad. Entrega en 1 a 2 días.',
    eyebrow: 'Taller de estampados · Guadalajara de Buga',
    h1: 'Estampados DTF en Buga',
    lead:
      'Imprimimos tu diseño a todo color con tecnología DTF sobre camisetas de algodón, piel de durazno y oversize, gorras y más prendas, desde una sola unidad y con entrega el mismo día o máximo en 2 días.',
    facts: ['Desde 1 unidad', 'Entrega en 1 a 2 días', '10 años de experiencia'],
    image: { src: '/mockups/tshirt_black.webp', alt: 'Camiseta negra lista para estampado DTF en el taller Art2Art de Buga' },
    sections: [
      {
        heading: '¿Qué es el estampado DTF?',
        paragraphs: [
          'DTF significa Direct to Film. Tu diseño se imprime a todo color sobre una película especial, se le aplica un adhesivo en polvo y después se transfiere a la prenda con calor y presión. El resultado es un estampado flexible, de colores vivos y con detalles finos.',
          'A diferencia de la serigrafía, no se necesitan pantallas ni un mínimo de prendas, y el costo no depende de cuántos colores tenga tu diseño. Por eso las fotografías, los degradados y los logos complejos se imprimen igual de bien.',
        ],
      },
      {
        heading: 'Ventajas del DTF',
        bullets: [
          'Full color con degradados y fotografías, sin límite de colores.',
          'Funciona en algodón, poliéster y mezclas, en prendas claras u oscuras.',
          'Sin mínimos: puedes estampar una sola prenda.',
          'Ideal para muestras, regalos, emprendimientos y pedidos pequeños o medianos.',
          'Estampado flexible, pensado para lavados frecuentes con el cuidado adecuado.',
        ],
      },
      {
        heading: 'Dónde lo aplicamos',
        bullets: [
          'Camisetas de algodón.',
          'Camisetas piel de durazno.',
          'Camisetas oversize.',
          'Gorras.',
          'Hoodies, busos y otras prendas: pregúntanos por la que tienes en mente.',
          'Tote bags, bolsas de tela, uniformes y dotaciones pequeñas.',
        ],
      },
      {
        heading: 'Cómo cuidar tu prenda estampada',
        paragraphs: [
          'Lava la prenda del revés, con agua fría o tibia, y evita planchar directamente sobre el estampado. Así se mantiene como nuevo por más tiempo.',
        ],
      },
    ],
    steps: [
      PASOS_DISENO,
      'Te confirmamos precio y tiempo, y apruebas el arte antes de estampar.',
      'Estampamos y te entregamos el mismo día o máximo en 2 días. Si estás fuera de Buga, te lo enviamos por transportadora.',
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta estampar en DTF?',
        a: 'El precio depende del tamaño del diseño, de la prenda y de la cantidad. Escríbenos por WhatsApp con tu diseño y te cotizamos al instante. Manejamos descuentos por volumen desde 6 prendas del mismo tipo.',
      },
      { q: '¿Se puede estampar una sola prenda?', a: 'Sí. En DTF no hay mínimo: puedes estampar desde 1 unidad.' },
      {
        q: '¿En qué prendas se puede estampar con DTF?',
        a: 'Estampamos camisetas de algodón, camisetas piel de durazno, camisetas oversize y gorras, entre otras prendas. Si tienes una prenda distinta, escríbenos y te confirmamos si se puede.',
      },
      {
        q: '¿Estampan gorras con DTF?',
        a: 'Sí, las gorras también entran en el estampado DTF.',
      },
      {
        q: '¿Cuánto demora el pedido?',
        a: 'Los pedidos pequeños, desde 1 unidad, se entregan el mismo día o máximo en 2 días una vez aprobado el diseño. Si estás fuera de Buga, el tiempo del envío depende de la transportadora.',
      },
      {
        q: '¿Es mejor DTF o serigrafía?',
        a: 'Si tu diseño tiene muchos colores o degradados, o necesitas pocas prendas, el DTF es la mejor opción. Si necesitas muchas prendas con pocos colores planos, la serigrafía suele salir más económica por unidad.',
      },
    ],
    whatsappMessage: 'Hola Art2Art, quiero cotizar un estampado en DTF.',
  },
  {
    slug: 'serigrafia-buga',
    navLabel: 'Serigrafía',
    title: 'Serigrafía en Buga para camisetas y uniformes | Art2Art',
    metaDescription:
      'Serigrafía textil en Buga para camisetas, uniformes y dotaciones. Ideal para pedidos de 12 o más prendas con pocos colores. 10 años de experiencia.',
    eyebrow: 'Taller de estampados · Guadalajara de Buga',
    h1: 'Serigrafía en Buga',
    lead:
      'Estampado de serigrafía para camisetas, uniformes y dotaciones. Es la técnica más económica por unidad cuando necesitas varias prendas con el mismo diseño.',
    facts: ['Desde 12 unidades', 'Ideal para pocos colores', '10 años de experiencia'],
    image: { src: '/mockups/tshirt.webp', alt: 'Camiseta blanca para estampar en serigrafía en Buga' },
    sections: [
      {
        heading: '¿Qué es la serigrafía?',
        paragraphs: [
          'La serigrafía pasa la tinta a través de una malla (pantalla) en la que se graba tu diseño. Se usa una pantalla por cada color y la tinta se aplica sobre la prenda, por eso el resultado es resistente y de colores firmes.',
          'Preparar las pantallas tiene un costo fijo. Por eso, mientras más prendas estampes con el mismo diseño, más baja es el precio por unidad.',
        ],
      },
      {
        heading: 'Cuándo conviene la serigrafía',
        bullets: [
          'Pedidos de 12 o más prendas con el mismo diseño.',
          'Diseños de pocos colores planos: logos, textos y figuras.',
          'Uniformes, dotaciones de empresa, eventos, colegios y equipos.',
          'Producciones donde buscas el menor precio por unidad y una alta durabilidad.',
        ],
      },
      {
        heading: 'Tintas y acabados',
        paragraphs: [
          'Trabajamos con tintas plastisol, discharge y base agua, y con acabados especiales como dorado, plateado y relieve. Cuéntanos qué quieres lograr y te recomendamos la mejor opción para tu prenda.',
        ],
      },
    ],
    steps: [
      'Cuéntanos cuántas prendas necesitas y envíanos tu diseño por WhatsApp.',
      'Te cotizamos, defines colores y prendas, y apruebas el arte.',
      'Preparamos las pantallas, estampamos y te entregamos en Buga o te enviamos a todo el país.',
    ],
    faqs: [
      {
        q: '¿Cuál es el mínimo para serigrafía?',
        a: 'Sugerimos desde 12 unidades para que el costo de las pantallas se reparta y el precio por prenda sea el más bajo. Para menos prendas, el DTF o el vinilo suelen ser mejores opciones.',
      },
      {
        q: '¿Hay descuentos por cantidad?',
        a: 'Sí. Manejamos descuentos por volumen y tarifas especiales para más de 50 unidades. Escríbenos con tu pedido y te cotizamos.',
      },
      {
        q: '¿Qué tan duradero es el estampado?',
        a: 'La serigrafía es una de las técnicas más resistentes al lavado, porque la tinta queda fijada sobre la fibra. Lava la prenda del revés para que dure más.',
      },
      {
        q: '¿Puedo estampar un diseño con muchos colores o fotografías?',
        a: 'La serigrafía rinde mejor con pocos colores planos. Para fotografías o degradados te recomendamos DTF o sublimación.',
      },
      {
        q: '¿Cuánto tarda un pedido de serigrafía?',
        a: 'Depende de la cantidad y del diseño. Cuando nos envías tu pedido te confirmamos la fecha de entrega.',
      },
    ],
    whatsappMessage: 'Hola Art2Art, quiero cotizar un pedido en serigrafía.',
  },
  {
    slug: 'sublimacion-buga',
    navLabel: 'Sublimación',
    title: 'Sublimación en Buga: mugs y camisetas | Art2Art Estampados',
    metaDescription:
      'Sublimación en Buga: mugs personalizados, camisetas y más sobre telas blancas, desde 1 unidad. Colores vivos y entrega en 1 a 2 días.',
    eyebrow: 'Taller de estampados · Guadalajara de Buga',
    h1: 'Sublimación en Buga',
    lead:
      'Sublimamos mugs personalizados, camisetas y otros productos sobre telas blancas, con colores vivos y detalle fotográfico, desde una sola unidad.',
    facts: ['Desde 1 unidad', 'Entrega en 1 a 2 días', '10 años de experiencia'],
    image: { src: '/mockups/mug.svg', alt: 'Mug blanco para sublimación personalizada en Art2Art, Buga' },
    sections: [
      {
        heading: '¿Qué es la sublimación?',
        paragraphs: [
          'La sublimación imprime tu diseño con tintas especiales sobre papel y lo transfiere con calor. La tinta se convierte en gas y se integra a las fibras de la tela o a la capa especial de objetos como los mugs. Por eso el estampado no se siente al tacto, no se agrieta y no se despega.',
        ],
      },
      {
        heading: 'Qué sublimamos en Art2Art',
        bullets: [
          'Mugs personalizados.',
          'Camisetas sobre telas blancas.',
          'Otros productos y prendas en tela blanca: pregúntanos por lo que tienes en mente.',
          'Regalos y recuerdos con fotografías a todo color, desde 1 unidad.',
        ],
      },
      {
        heading: 'Lo que debes saber',
        paragraphs: [
          'La sublimación se ve mejor sobre telas blancas o claras y sobre superficies preparadas para sublimar. No funciona bien sobre algodón ni sobre prendas oscuras. Si tu prenda es de algodón o de color oscuro, la mejor opción es el estampado DTF.',
        ],
      },
    ],
    steps: [
      'Escríbenos por WhatsApp y cuéntanos qué quieres personalizar: mug, camiseta u otro producto.',
      'Envíanos tu imagen o diseño. Te confirmamos precio y tiempo, y apruebas el arte.',
      'Sublimamos y te entregamos el mismo día o máximo en 2 días. Si estás fuera de Buga, te lo enviamos.',
    ],
    faqs: [
      { q: '¿Se puede sublimar un solo mug?', a: 'Sí. Puedes pedir desde 1 unidad, sin mínimos.' },
      {
        q: '¿Pueden sublimar camisetas?',
        a: 'Sí, sublimamos camisetas sobre telas blancas. Para prendas oscuras o de algodón te recomendamos DTF.',
      },
      {
        q: '¿La imagen se nota al tacto o se desgasta?',
        a: 'No. En la sublimación la tinta se integra a la fibra, por eso no se siente, no se agrieta y no se despega con el uso normal.',
      },
      {
        q: '¿Cuánto demora el pedido?',
        a: 'Los pedidos pequeños desde 1 unidad se entregan el mismo día o máximo en 2 días, una vez aprobado el diseño.',
      },
      {
        q: '¿Qué diferencia hay entre sublimación y DTF?',
        a: 'La sublimación va sobre telas blancas o claras y objetos preparados, y no se siente al tacto. El DTF sirve en algodón y en prendas oscuras. Te ayudamos a elegir según tu pedido.',
      },
    ],
    whatsappMessage: 'Hola Art2Art, quiero cotizar un pedido en sublimación.',
  },
  {
    slug: 'vinilo-textil-buga',
    navLabel: 'Vinilo textil',
    title: 'Vinilo textil en Buga: nombres, números y logos | Art2Art',
    metaDescription:
      'Vinilo textil en Buga para nombres, números, logos y uniformes: colores sólidos, reflectivo y acabados especiales. Desde 1 unidad.',
    eyebrow: 'Taller de estampados · Guadalajara de Buga',
    h1: 'Vinilo textil en Buga',
    lead:
      'Cortamos tu diseño en vinilo termoadhesivo y lo aplicamos con calor. Perfecto para nombres, números, logos y uniformes, incluso una sola prenda.',
    facts: ['Desde 1 unidad', 'Entrega en 1 a 2 días', '10 años de experiencia'],
    image: { src: '/mockups/hoodie.webp', alt: 'Buso con capota listo para personalizar con vinilo textil en Buga' },
    sections: [
      {
        heading: '¿Qué es el vinilo textil?',
        paragraphs: [
          'Es un vinilo especial que se corta con precisión mediante una máquina de corte, se retira el sobrante y se aplica sobre la prenda con calor y presión. Da bordes nítidos y colores sólidos y uniformes.',
        ],
      },
      {
        heading: 'Para qué lo usamos',
        bullets: [
          'Nombres y números de camisetas de fútbol y de equipos.',
          'Logos y textos de uno o dos colores.',
          'Uniformes y dotaciones con nombre distinto en cada prenda.',
          'Acabados especiales: reflectivo, metalizado, glitter y otros.',
        ],
      },
      {
        heading: 'Cuándo elegir otra técnica',
        paragraphs: [
          'El vinilo es ideal para formas y colores planos. Si tu diseño tiene fotografías o degradados, te recomendamos DTF. Si necesitas muchas prendas con el mismo diseño, la serigrafía puede salir más económica.',
        ],
      },
    ],
    steps: [
      'Escríbenos por WhatsApp con el diseño o el texto, y la cantidad de prendas.',
      'Te confirmamos precio, colores y tiempo, y apruebas el arte.',
      'Cortamos, aplicamos y te entregamos el mismo día o máximo en 2 días; también enviamos a todo el país.',
    ],
    faqs: [
      { q: '¿Hay un mínimo de prendas?', a: 'No. Puedes personalizar desde 1 unidad.' },
      {
        q: '¿Pueden poner nombres y números distintos en cada camiseta?',
        a: 'Sí. Es una de las aplicaciones más comunes del vinilo textil: nombre y número individual en cada prenda de un equipo o grupo.',
      },
      {
        q: '¿Tienen vinilo reflectivo o de otros acabados?',
        a: 'Sí, trabajamos acabados especiales como reflectivo, metalizado y glitter. Pregúntanos por la disponibilidad de colores.',
      },
      {
        q: '¿Cuánto demora?',
        a: 'Los pedidos pequeños desde 1 unidad se entregan el mismo día o máximo en 2 días, una vez aprobado el diseño.',
      },
    ],
    whatsappMessage: 'Hola Art2Art, quiero cotizar un trabajo en vinilo textil.',
  },
  {
    slug: 'camisetas-personalizadas-buga',
    navLabel: 'Camisetas personalizadas',
    title: 'Camisetas personalizadas en Buga desde 1 unidad | Art2Art',
    metaDescription:
      'Camisetas personalizadas en Buga desde 1 unidad: DTF, sublimación, vinilo y serigrafía. Piel de durazno desde $25.000. Entrega en 1 a 2 días.',
    eyebrow: 'Taller de estampados · Guadalajara de Buga',
    h1: 'Camisetas personalizadas en Buga',
    lead:
      'Estampamos tu diseño en camisetas desde una sola unidad, con la técnica que mejor se adapte a tu pedido, y te las entregamos el mismo día o máximo en 2 días.',
    facts: ['Desde 1 unidad', 'Piel de durazno desde $25.000', 'Entrega en 1 a 2 días'],
    image: { src: '/mockups/tshirt.webp', alt: 'Camiseta lista para personalizar en el taller Art2Art de Buga' },
    sections: [
      {
        heading: 'Camiseta piel de durazno estampada desde $25.000',
        paragraphs: [
          'Nuestra camiseta piel de durazno estampada parte desde $25.000. Es una tela suave y liviana, ideal para regalos, grupos, familias, eventos y emprendimientos. El precio final depende del diseño y de la cantidad; escríbenos por WhatsApp y te cotizamos al instante.',
        ],
      },
      {
        heading: 'Elige la técnica según tu pedido',
        bullets: [
          'Camisetas de algodón, piel de durazno u oversize, con muchos colores o fotografías: estampado DTF.',
          'Camisetas sobre tela blanca con imagen a todo color: sublimación.',
          'Nombres, números y logos sencillos: vinilo textil.',
          '12 o más camisetas con pocos colores: serigrafía.',
        ],
      },
      {
        heading: 'Ideal para',
        bullets: [
          'Equipos deportivos, colegios y grupos.',
          'Empresas, uniformes y eventos.',
          'Regalos, cumpleaños y recuerdos familiares.',
          'Emprendimientos que quieren probar su diseño con pocas unidades.',
        ],
      },
      {
        heading: 'Prueba tu diseño antes de escribirnos',
        paragraphs: [
          'En nuestra página principal puedes ver cómo se vería tu diseño sobre la prenda con el personalizador en línea, y luego pedir tu cotización por WhatsApp.',
        ],
      },
    ],
    steps: [
      PASOS_DISENO,
      'Te confirmamos la técnica, el precio y el tiempo, y apruebas el arte.',
      'Estampamos y te entregamos el mismo día o máximo en 2 días. Si estás fuera de Buga, te las enviamos a todo el país.',
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta una camiseta personalizada?',
        a: 'La camiseta piel de durazno estampada parte desde $25.000. El precio final depende del diseño, de la técnica y de la cantidad, y manejamos descuentos por volumen desde 6 prendas del mismo tipo.',
      },
      { q: '¿Puedo pedir una sola camiseta?', a: 'Sí. No hay mínimo para DTF, sublimación ni vinilo: puedes pedir desde 1 unidad.' },
      {
        q: '¿Cuánto demora?',
        a: 'Los pedidos pequeños desde 1 unidad se entregan el mismo día o máximo en 2 días una vez aprobado el diseño. Si estás fuera de Buga, el envío depende de la transportadora.',
      },
      {
        q: '¿En qué formato envío mi diseño?',
        a: 'Lo ideal es un PNG con fondo transparente a 300 DPI o un archivo vectorial (PDF, AI o SVG). Si lo tienes en JPG de buena resolución, también te ayudamos a prepararlo.',
      },
      {
        q: '¿Hacen envíos fuera de Buga?',
        a: 'Sí, enviamos a toda Colombia por transportadora.',
      },
    ],
    whatsappMessage: 'Hola Art2Art, quiero cotizar camisetas personalizadas.',
  },
]
