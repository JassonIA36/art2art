export interface ServiceItem {
  id: string;
  name: string;
  badge: string;
  badgeColor: 'petal-yellow' | 'petal-red' | 'petal-orange' | 'petal-cyan';
  dotColor: string;
  shortDesc: string;
  fullDesc: string;
  imageUrl: string;
  imageAlt: string;
  quoteMessage: string;
  features: string[];
  idealFor: string;
  minQuantity: string;
  durability: string;
  materials: string[];
}

export interface WorkshopItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  level: string;
  duration: string;
  schedule: string;
  includes: string[];
  maxSeats: number;
  availableSeats: number;
  imageUrl: string;
  quoteMessage: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Serigrafía' | 'Sublimación' | 'Vinilo' | 'DTF' | 'Streetwear';
  imageUrl: string;
  alt: string;
  aspect: 'square' | 'portrait';
}

export interface GarmentOption {
  id: string;
  name: string;
  basePrice: number; // In COP
  imageIcon: string;
}

export interface TechniqueOption {
  id: string;
  name: string;
  costPerUnit: number; // In COP
  minUnits: number;
  recommendedGarment: string;
}

export interface QuoteCalculation {
  garmentId: string;
  techniqueId: string;
  quantity: number;
  includeDesign: boolean;
  notes: string;
}

export type MockupGarmentId = 'camiseta' | 'hoodie' | 'oversize' | 'totebag' | 'gorra';

export interface MockupGarmentConfig {
  id: MockupGarmentId;
  name: string;
  badge: string;
  printableWidthCm: number;
  printableHeightCm: number;
  defaultTechniqueId: string;
  quoteGarmentId: string;
}

export interface MockupColorOption {
  name: string;
  hex: string;
  isDark: boolean;
}

export interface MockupPresetGraphic {
  id: string;
  name: string;
  tag: string;
  url: string;
}

