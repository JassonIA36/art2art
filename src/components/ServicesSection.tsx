import React, { useState } from 'react';
import { SERVICES_DATA, getWhatsAppLink } from '../data/mockData';
import type { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectTechnique: (service: ServiceItem) => void;
  onOpenQuoteWithTechnique: (techniqueId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectTechnique,
  onOpenQuoteWithTechnique,
}) => {
  const [filter, setFilter] = useState<'all' | 'serigrafia' | 'sublimacion' | 'vinilo-textil' | 'dtf'>('all');

  const filteredServices = filter === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.id === filter);

  return (
    <section className="w-full py-space-xl bg-surface-subtle" id="nuestros-servicios-de-estampado">
      <div className="max-w-7xl mx-auto px-margin space-y-space-lg">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="space-y-space-xs max-w-2xl">
            <div className="inline-flex items-center gap-space-xs font-label-sm text-label-sm uppercase tracking-wider text-primary">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span>Precisión & Color</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Nuestros Servicios de Estampado
            </h2>
            <p className="font-body-md text-body-md text-secondary">
              Ofrecemos las mejores técnicas de estampados en Buga y alrededores con tecnología de vanguardia y años de experiencia para garantizar resultados excepcionales en cada prenda.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="font-label-md text-label-md text-secondary flex items-center gap-space-xs">
              <span>Selecciona tu técnica preferida</span>
              <span className="material-symbols-outlined text-[18px]">south</span>
            </div>

            {/* Quick Filter Chips */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-surface-container rounded-full border border-surface-border/60">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full font-label-sm text-label-sm transition-all ${
                  filter === 'all'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-secondary hover:text-on-surface'
                }`}
              >
                Todas
              </button>
              {SERVICES_DATA.map((srv) => (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => setFilter(srv.id as any)}
                  className={`px-3 py-1 rounded-full font-label-sm text-label-sm transition-all ${
                    filter === srv.id
                      ? 'bg-on-surface text-surface-card shadow-sm'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  {srv.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {filteredServices.map((service) => {
            const getBadgeClasses = (color: string) => {
              switch (color) {
                case 'petal-yellow':
                  return 'bg-petal-yellow text-on-surface';
                case 'petal-red':
                  return 'bg-petal-red text-on-primary';
                case 'petal-orange':
                  return 'bg-petal-orange text-on-primary';
                case 'petal-cyan':
                  return 'bg-petal-cyan text-on-primary';
                default:
                  return 'bg-primary text-on-primary';
              }
            };

            return (
              <div
                key={service.id}
                className="bg-surface-card rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between border border-surface-border/60 hover:border-primary/30"
              >
                <div>
                  {/* Image container with floating badge */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={service.imageUrl}
                      alt={service.imageAlt}
                      loading="lazy"
                    />
                    <span
                      className={`absolute top-3 left-3 px-space-sm py-1 rounded-full font-label-sm text-label-sm shadow-sm ${getBadgeClasses(
                        service.badgeColor
                      )}`}
                    >
                      {service.badge}
                    </span>

                    {/* Quick Specs overlay button */}
                    <button
                      type="button"
                      onClick={() => onSelectTechnique(service)}
                      className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-on-surface/80 hover:bg-on-surface text-surface-card text-xs font-label-sm backdrop-blur-md transition-opacity opacity-0 group-hover:opacity-100 flex items-center gap-1 shadow"
                    >
                      <span className="material-symbols-outlined text-[14px]">info</span>
                      <span>Ficha técnica</span>
                    </button>
                  </div>

                  {/* Body description */}
                  <div className="p-space-md space-y-space-xs">
                    <div className="flex items-center justify-between">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                        {service.name}
                      </h3>
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: service.dotColor }}
                        title={`Color distintivo ${service.name}`}
                      ></span>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary line-clamp-4">
                      {service.shortDesc}
                    </p>

                    {/* Material tags preview */}
                    <div className="pt-2 flex flex-wrap gap-1">
                      {service.materials.slice(0, 2).map((mat) => (
                        <span
                          key={mat}
                          className="inline-block text-[11px] px-2 py-0.5 rounded bg-surface-container-low text-secondary"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions bottom */}
                <div className="p-space-md pt-0 space-y-2">
                  <a
                    className="w-full py-2.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-space-xs transition-colors shadow-sm active:scale-[0.98]"
                    href={getWhatsAppLink(service.quoteMessage)}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Cotizar {service.name.split(' ')[0]}</span>
                  </a>

                  <div className="flex items-center justify-between gap-1 text-xs">
                    <button
                      type="button"
                      onClick={() => onSelectTechnique(service)}
                      className="flex-1 py-1 text-center font-label-sm text-secondary hover:text-primary transition-colors flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">visibility</span>
                      <span>Ver detalles</span>
                    </button>
                    <span className="text-surface-border">|</span>
                    <button
                      type="button"
                      onClick={() => onOpenQuoteWithTechnique(service.id)}
                      className="flex-1 py-1 text-center font-label-sm text-tertiary hover:underline flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">calculate</span>
                      <span>Simular costo</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
