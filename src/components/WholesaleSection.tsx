import React from 'react';
import { PORTFOLIO_ITEMS, getWhatsAppLink } from '../data/mockData';
import type { PortfolioItem } from '../types';

interface WholesaleSectionProps {
  onOpenLightbox: (item: PortfolioItem) => void;
}

export const WholesaleSection: React.FC<WholesaleSectionProps> = ({
  onOpenLightbox,
}) => {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#f8fafc] text-[#0b0e17] border-t border-slate-200" id="nosotros">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Storytelling and Wholesale Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-800 shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-[#dc0c1c]">military_tech</span>
              <span>Compromiso y Experiencia</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-display text-[#0b0e17] tracking-wider">
              Más de 10 años transformando ideas en realidad impresa
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              En Art2Art, somos especialistas en técnicas de estampado profesional. Combinamos experiencia, tecnología de última generación y pasión por el arte para ofrecer servicios de serigrafía, sublimación, vinilo textil y DTF de la más alta calidad en Guadalajara de Buga y el Valle del Cauca.
            </p>

            {/* Wholesale Banner */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hover:border-[#dc0c1c]/40 transition-colors shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#dc0c1c]/10 text-[#dc0c1c] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[28px]">inventory_2</span>
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-display text-slate-900 tracking-wide">
                    Venta de camisetas al por mayor y detal
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Precios especiales para marcas independientes, dotaciones empresariales y colegios.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm shrink-0 hover:scale-105"
                  href={getWhatsAppLink('Hola Art2Art, deseo solicitar la lista de precios mayorista.')}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Lista Mayorista</span>
                </a>
              </div>
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1.5 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <span className="material-symbols-outlined text-[#dc0c1c] text-[24px]">verified_user</span>
                <h5 className="font-display text-xl text-slate-900">
                  Calidad Garantizada
                </h5>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Tintas resistentes al lavado frecuente y tacto suave.
                </p>
              </div>

              <div className="space-y-1.5 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <span className="material-symbols-outlined text-[#0b0e17] text-[24px]">palette</span>
                <h5 className="font-display text-xl text-slate-900">
                  Asesoría Gratuita
                </h5>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Optimizamos tus vectores y colores sin costo extra.
                </p>
              </div>

              <div className="space-y-1.5 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <span className="material-symbols-outlined text-[#25D366] text-[24px]">bolt</span>
                <h5 className="font-display text-xl text-slate-900">
                  Tiempos Ágiles
                </h5>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Entregas en Buga y envíos directos a toda Colombia.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Gallery of Completed Works */}
          <div className="lg:col-span-5" id="galeria">
            <div className="mb-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#dc0c1c] uppercase tracking-wider mb-1">
                <span className="material-symbols-outlined text-[16px]">photo_library</span>
                <span>Portafolio Real</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display text-[#0b0e17] tracking-wide">
                Galería de Trabajos Realizados
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {PORTFOLIO_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onOpenLightbox(item)}
                  className="aspect-square rounded-2xl overflow-hidden shadow-sm bg-slate-100 cursor-pointer group relative border border-slate-200 hover:border-[#dc0c1c] hover:-translate-y-1 transition-all duration-300"
                  title="Ver imagen en alta resolución"
                >
                  <img
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    alt={item.alt}
                    src={item.imageUrl}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#dc0c1c] text-white shadow-md">
                    {item.category}
                  </span>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <p className="text-xs font-semibold text-white truncate">
                      {item.title}
                    </p>
                  </div>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2.5 rounded-full bg-white text-black material-symbols-outlined text-[22px] shadow-2xl">
                      zoom_in
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
