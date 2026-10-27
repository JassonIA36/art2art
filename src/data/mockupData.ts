import type { MockupGarmentConfig, MockupColorOption, MockupPresetGraphic } from '../types';

export interface GarmentZone {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GarmentViewConfig extends MockupGarmentConfig {
  printZone: GarmentZone;
  description: string;
  photoUrl: string;
  blackPhotoUrl?: string;
}

export const MOCKUP_GARMENTS: GarmentViewConfig[] = [
  {
    id: 'camiseta',
    name: 'Camiseta Cuello Redondo',
    badge: '100% Algodón 180g',
    printableWidthCm: 32,
    printableHeightCm: 42,
    defaultTechniqueId: 'dtf',
    quoteGarmentId: 'camiseta-algodon',
    printZone: { x: 195, y: 180, width: 210, height: 260 },
    description: 'Camiseta clásica premium de corte unisex con costuras reforzadas.',
    photoUrl: '/mockups/tshirt.webp',
    blackPhotoUrl: '/mockups/tshirt_black.webp',
  },
  {
    id: 'hoodie',
    name: 'Hoodie / Buso con Capota',
    badge: 'Perchado Grueso 280g',
    printableWidthCm: 30,
    printableHeightCm: 28,
    defaultTechniqueId: 'dtf',
    quoteGarmentId: 'hoodie',
    printZone: { x: 200, y: 220, width: 200, height: 180 },
    description: 'Buso con capota de doble forro, cordones al tono y bolsillo canguro.',
    photoUrl: '/mockups/hoodie.webp',
  },
  {
    id: 'oversize',
    name: 'Camiseta Oversize',
    badge: 'Streetwear Drop Shoulder',
    printableWidthCm: 35,
    printableHeightCm: 48,
    defaultTechniqueId: 'dtf',
    quoteGarmentId: 'camiseta-algodon',
    printZone: { x: 185, y: 190, width: 230, height: 270 },
    description: 'Silueta amplia y relajada estilo urbano de hombros caídos.',
    photoUrl: '/mockups/tshirt.webp',
    blackPhotoUrl: '/mockups/tshirt_black.webp',
  },
  {
    id: 'totebag',
    name: 'Tote Bag Ecológica',
    badge: 'Lienzo Crudo 240g',
    printableWidthCm: 28,
    printableHeightCm: 32,
    defaultTechniqueId: 'sublimacion',
    quoteGarmentId: 'tula',
    printZone: { x: 195, y: 260, width: 210, height: 230 },
    description: 'Bolsa ecológica de tela lienzo reutilizable con asas de alta resistencia.',
    photoUrl: '/mockups/totebag.webp',
  },
  {
    id: 'gorra',
    name: 'Gorra Urbana',
    badge: 'Trucker / Dril',
    printableWidthCm: 14,
    printableHeightCm: 8,
    defaultTechniqueId: 'dtf',
    quoteGarmentId: 'gorra',
    printZone: { x: 220, y: 190, width: 160, height: 100 },
    description: 'Gorra estructurada de 5 paneles con visera curva preformada.',
    photoUrl: '/mockups/cap.webp',
  },
  {
    id: 'mug',
    name: 'Mug Cerámico 11oz',
    badge: 'Sublimación HD',
    printableWidthCm: 20,
    printableHeightCm: 9,
    defaultTechniqueId: 'sublimacion',
    quoteGarmentId: 'mug',
    printZone: { x: 140, y: 215, width: 230, height: 225 },
    description: 'Taza de cerámica blanca de 11oz con recubrimiento polimérico para sublimación a todo color.',
    photoUrl: '/mockups/mug.svg',
  },
];

export const MOCKUP_COLORS: MockupColorOption[] = [
  { name: 'Negro Grafito', hex: '#18181B', isDark: true },
  { name: 'Blanco Puro', hex: '#F8FAFC', isDark: false },
  { name: 'Gris Jaspe', hex: '#64748B', isDark: false },
  { name: 'Azul Marino', hex: '#0F172A', isDark: true },
  { name: 'Verde Oliva Militar', hex: '#2D3A2F', isDark: true },
  { name: 'Rojo Carmín Art2Art', hex: '#991B1B', isDark: true },
  { name: 'Beige Arena', hex: '#E2D8C3', isDark: false },
  { name: 'Mostaza / Ocre', hex: '#D97706', isDark: false },
  { name: 'Terracota Cálido', hex: '#9A3412', isDark: true },
  { name: 'Azul Eléctrico', hex: '#1D4ED8', isDark: true },
];

export const MOCKUP_PRESETS: MockupPresetGraphic[] = [
  {
    id: 'cyberpunk-tiger',
    name: 'Cyber Tiger Art2Art',
    tag: 'DTF Streetwear',
    url: '/samples/cyberpunk-tiger.webp',
  },
  {
    id: 'tropical-toucan',
    name: 'Tucán Buga Valle',
    tag: 'Full Color HD',
    url: '/samples/tropical-toucan.webp',
  },
  {
    id: 'art2art-vector-badge',
    name: 'Insignia Art2Art Buga',
    tag: 'Emblema Vectorial',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300"><circle cx="150" cy="150" r="140" fill="%23111c2d" stroke="%23F9DF1B" stroke-width="8"/><circle cx="150" cy="150" r="126" fill="none" stroke="%23E02424" stroke-width="2" stroke-dasharray="6 4"/><text x="150" y="85" fill="%23FFFFFF" font-family="sans-serif" font-size="22" font-weight="900" text-anchor="middle" letter-spacing="4">ART2ART</text><text x="150" y="115" fill="%23F9DF1B" font-family="sans-serif" font-size="14" font-weight="700" text-anchor="middle" letter-spacing="2">ESTAMPADOS</text><path d="M90 155 Q150 120 210 155 Q150 190 90 155 Z" fill="%2300A5E3"/><circle cx="150" cy="155" r="16" fill="%23F9DF1B"/><text x="150" y="225" fill="%23FFFFFF" font-family="sans-serif" font-size="18" font-weight="800" text-anchor="middle">BUGA • COLOMBIA</text><text x="150" y="250" fill="%2394A3B8" font-family="sans-serif" font-size="12" font-weight="600" text-anchor="middle">DESDE 2014</text></svg>`,
  },
  {
    id: 'streetwear-typography',
    name: 'Lettering Buga 1570',
    tag: 'Estilo Urbano',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 160" width="360" height="160"><rect width="100%25" height="100%25" fill="none"/><text x="180" y="65" fill="%23F9DF1B" font-family="sans-serif" font-size="44" font-weight="900" text-anchor="middle" letter-spacing="4">BUGA</text><text x="180" y="105" fill="%23FFFFFF" font-family="sans-serif" font-size="24" font-weight="800" text-anchor="middle" letter-spacing="8">VALLE TEXTIL</text><line x1="60" y1="120" x2="300" y2="120" stroke="%23E02424" stroke-width="4"/><text x="180" y="142" fill="%2300A5E3" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle" letter-spacing="3">ORIGINAL STREETWEAR LAB</text></svg>`,
  },
];
