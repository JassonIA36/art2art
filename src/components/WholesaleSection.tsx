import React from 'react';
import { PORTFOLIO_ITEMS, getWhatsAppLink } from '../data/mockData';
import type { PortfolioItem } from '../types';

interface WholesaleSectionProps {
  onOpenLightbox: (item: PortfolioItem) => void;
  onOpenQuoteModal: () => void;
}

export const WholesaleSection: React.FC<WholesaleSectionProps> = ({
  onOpenLightbox,
  onOpenQuoteModal,
}) => {
  return (
    <section className="w-full py-space-xl bg-surface-container-low" id="nosotros">
      <div className="max-w-7xl mx-auto px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Left: Storytelling and Wholesale Proposition */}
          <div className="lg:col-span-7 space-y-space-md">
            {/* Tag */}
            <div className="inline-flex items-center gap-space-xs font-label-sm text-label-sm text-primary uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">military_tech</span>
              <span>Compromiso y Experiencia</span>
            </div>

            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Más de 10 años transformando ideas en realidad impresa
            </h2>

            <p className="font-body-md text-body-md text-secondary leading-relaxed">
              En Art2Art, somos especialistas en técnicas de estampado profesional. Combinamos experiencia, tecnología de última generación y pasión por el arte para ofrecer servicios de serigrafía, sublimación, vinilo textil y DTF de la más alta calidad.
            </p>

            <p className="font-body-md text-body-md text-secondary leading-relaxed">
              Nuestro compromiso va más allá del servicio: compartimos conocimiento a través de talleres especializados, formando a nuevos profesionales en el arte del estampado. Cada proyecto es una oportunidad para superar expectativas y crear resultados excepcionales.
            </p>

            {/* Highlight Banner for Venta Mayorista */}
            <div className="bg-surface-card p-space-md rounded-lg shadow-sm border border-surface-border/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md hover:border-tertiary/40 transition-colors">
              <div className="flex items-center gap-space-md">
                <div className="w-12 h-12 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[28px]">inventory_2</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface">
                    Venta de camisetas al por mayor y detal
                  </h4>
                  <p className="font-body-sm text-body-sm text-secondary">
                    Precios especiales para marcas independientes, empresas y dotaciones escolares.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="w-full sm:w-auto text-center px-space-md py-2 rounded-full bg-surface-card hover:bg-surface-bright text-primary border border-primary/30 font-label-md text-label-md transition-colors shrink-0 shadow-sm flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">calculate</span>
                  <span>Calcular Lote</span>
                </button>
                <a
                  className="w-full sm:w-auto text-center px-space-md py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors shrink-0 shadow-sm"
                  href={getWhatsAppLink('Hola, deseo cotizar camisetas al por mayor.')}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Solicitar Lista
                </a>
              </div>
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md pt-space-xs">
              <div className="space-y-1 p-2 rounded-lg bg-surface-card/40 border border-surface-border/40">
                <span className="material-symbols-outlined text-primary text-[24px]">verified_user</span>
                <h5 className="font-headline-sm text-headline-sm text-on-surface text-[16px]">
                  Calidad Garantizada
                </h5>
                <p className="font-body-sm text-body-sm text-secondary">
                  Tintas ecológicas resistentes al lavado frecuente.
                </p>
              </div>

              <div className="space-y-1 p-2 rounded-lg bg-surface-card/40 border border-surface-border/40">
                <span className="material-symbols-outlined text-tertiary text-[24px]">palette</span>
                <h5 className="font-headline-sm text-headline-sm text-on-surface text-[16px]">
                  Asesoría de Diseño
                </h5>
                <p className="font-body-sm text-body-sm text-secondary">
                  Optimizamos tus vectores y artes sin costo extra.
                </p>
              </div>

              <div className="space-y-1 p-2 rounded-lg bg-surface-card/40 border border-surface-border/40">
                <span className="material-symbols-outlined text-whatsapp-green text-[24px]">bolt</span>
                <h5 className="font-headline-sm text-headline-sm text-on-surface text-[16px]">
                  Tiempos Ágiles
                </h5>
                <p className="font-body-sm text-body-sm text-secondary">
                  Despacho puntual y entregas en Buga y Valle.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Mosaic Portfolio Preview */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-space-sm">
            {/* Column 1 */}
            <div className="space-y-space-sm">
              <div
                onClick={() => onOpenLightbox(PORTFOLIO_ITEMS[0])}
                className="aspect-square rounded-lg overflow-hidden shadow-sm bg-surface-container cursor-pointer group relative border border-white/60"
                title="Ver imagen en alta resolución"
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={PORTFOLIO_ITEMS[0].alt}
                  src={PORTFOLIO_ITEMS[0].imageUrl}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-on-surface/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 rounded-full bg-white/90 text-on-surface material-symbols-outlined text-[20px]">
                    zoom_in
                  </span>
                </div>
              </div>

              <div
                onClick={() => onOpenLightbox(PORTFOLIO_ITEMS[1])}
                className="aspect-[4/5] rounded-lg overflow-hidden shadow-sm bg-surface-container cursor-pointer group relative border border-white/60"
                title="Ver imagen en alta resolución"
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={PORTFOLIO_ITEMS[1].alt}
                  src={PORTFOLIO_ITEMS[1].imageUrl}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-on-surface/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 rounded-full bg-white/90 text-on-surface material-symbols-outlined text-[20px]">
                    zoom_in
                  </span>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-space-sm pt-space-md">
              <div
                onClick={() => onOpenLightbox(PORTFOLIO_ITEMS[2])}
                className="aspect-[4/5] rounded-lg overflow-hidden shadow-sm bg-surface-container cursor-pointer group relative border border-white/60"
                title="Ver imagen en alta resolución"
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={PORTFOLIO_ITEMS[2].alt}
                  src={PORTFOLIO_ITEMS[2].imageUrl}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-on-surface/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 rounded-full bg-white/90 text-on-surface material-symbols-outlined text-[20px]">
                    zoom_in
                  </span>
                </div>
              </div>

              <div
                onClick={() => onOpenLightbox(PORTFOLIO_ITEMS[3])}
                className="aspect-square rounded-lg overflow-hidden shadow-sm bg-surface-container cursor-pointer group relative border border-white/60"
                title="Ver imagen en alta resolución"
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={PORTFOLIO_ITEMS[3].alt}
                  src={PORTFOLIO_ITEMS[3].imageUrl}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-on-surface/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 rounded-full bg-white/90 text-on-surface material-symbols-outlined text-[20px]">
                    zoom_in
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
