import React, { useState } from 'react';
import { SERVICES_DATA, getWhatsAppLink } from '../data/mockData';
import type { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectTechnique: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectTechnique,
}) => {
  const [filter, setFilter] = useState<'all' | 'serigrafia' | 'sublimacion' | 'vinilo-textil' | 'dtf'>('all');

  const filteredServices = filter === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.id === filter);

  return (
    <section className="w-full py-16 sm:py-24 bg-[#0f0f12] text-white border-t border-[#2a2a36]" id="nuestros-servicios-de-estampado">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a1a20] border border-[#2a2a36] text-xs font-semibold uppercase tracking-wider text-[#00b4d8]">
              <span className="w-2 h-2 rounded-full bg-[#00b4d8]"></span>
              <span>Técnicas Profesionales de Estampado</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display text-white tracking-wider">
              Nuestros Servicios de Estampado
            </h2>
            <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
              Tecnología de última generación y más de 10 años de experiencia para garantizar resultados excepcionales y duraderos en cada textil.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2.5">
            <span className="text-xs text-[#9ca3af] font-semibold uppercase tracking-wider">
              Filtrar por técnica:
            </span>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-[#1a1a20] rounded-xl border border-[#2a2a36]">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  filter === 'all'
                    ? 'bg-[#e6197e] text-white shadow-md'
                    : 'text-[#9ca3af] hover:text-white'
                }`}
              >
                Todas
              </button>
              {SERVICES_DATA.map((srv) => (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => setFilter(srv.id as any)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    filter === srv.id
                      ? 'bg-[#22222b] text-white border border-[#2a2a36] shadow-md'
                      : 'text-[#9ca3af] hover:text-white'
                  }`}
                >
                  {srv.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => {
            const getBadgeClasses = (color: string) => {
              switch (color) {
                case 'petal-yellow':
                  return 'bg-[#ffd60a] text-[#0f0f12] font-bold shadow-md';
                case 'petal-red':
                  return 'bg-[#e6197e] text-white font-bold shadow-md';
                case 'petal-orange':
                  return 'bg-[#f37023] text-white font-bold shadow-md';
                case 'petal-cyan':
                  return 'bg-[#00b4d8] text-[#0f0f12] font-bold shadow-md';
                default:
                  return 'bg-[#e6197e] text-white font-bold shadow-md';
              }
            };

            const getHoverBorder = (color: string) => {
              switch (color) {
                case 'petal-yellow':
                  return 'hover:border-[#ffd60a] hover:shadow-[0_10px_30px_-5px_rgba(255,214,10,0.25)]';
                case 'petal-red':
                  return 'hover:border-[#e6197e] hover:shadow-[0_10px_30px_-5px_rgba(230,25,126,0.3)]';
                case 'petal-orange':
                  return 'hover:border-[#f37023] hover:shadow-[0_10px_30px_-5px_rgba(243,112,35,0.25)]';
                case 'petal-cyan':
                  return 'hover:border-[#00b4d8] hover:shadow-[0_10px_30px_-5px_rgba(0,180,216,0.25)]';
                default:
                  return 'hover:border-[#e6197e] hover:shadow-[0_10px_30px_-5px_rgba(230,25,126,0.3)]';
              }
            };

            return (
              <div
                key={service.id}
                className={`bg-[#1a1a20] rounded-2xl overflow-hidden border border-[#2a2a36] hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between shadow-xl ${getHoverBorder(
                  service.badgeColor
                )}`}
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141418]">
                    <img
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      src={service.imageUrl}
                      alt={service.imageAlt}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a20] via-transparent to-transparent opacity-50"></div>
                    <span
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs ${getBadgeClasses(
                        service.badgeColor
                      )}`}
                    >
                      {service.badge}
                    </span>

                    {/* Quick Specs overlay button */}
                    <button
                      type="button"
                      onClick={() => onSelectTechnique(service)}
                      className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 hover:bg-black text-white text-xs backdrop-blur-md transition-opacity opacity-0 group-hover:opacity-100 flex items-center gap-1 shadow-md border border-white/20"
                    >
                      <span className="material-symbols-outlined text-[14px]">info</span>
                      <span>Ficha técnica</span>
                    </button>
                  </div>

                  {/* Body description */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-display text-white group-hover:text-[#e6197e] transition-colors">
                        {service.name}
                      </h3>
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: service.dotColor }}
                        title={`Técnica ${service.name}`}
                      ></span>
                    </div>

                    <p className="text-xs text-[#9ca3af] leading-relaxed line-clamp-4">
                      {service.shortDesc}
                    </p>

                    {/* Material tags */}
                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {service.materials.slice(0, 2).map((mat) => (
                        <span
                          key={mat}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-[#22222b] text-[#9ca3af] border border-[#2a2a36]"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions Bottom */}
                <div className="p-5 pt-0 space-y-2">
                  <a
                    className="w-full py-2.5 rounded-xl bg-[#e6197e] hover:bg-[#c9126b] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                    href={getWhatsAppLink(service.quoteMessage)}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Cotizar {service.name.split(' ')[0]}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onSelectTechnique(service)}
                    className="w-full py-1.5 text-center text-xs font-semibold text-[#9ca3af] hover:text-white transition-colors flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">visibility</span>
                    <span>Ver detalles y ficha</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
