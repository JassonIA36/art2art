import React from 'react';
import type { ServiceItem } from '../types';
import { getWhatsAppLink } from '../data/mockData';

interface TechniqueDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenQuoteWithTechnique: (techniqueId: string) => void;
}

export const TechniqueDetailModal: React.FC<TechniqueDetailModalProps> = ({
  service,
  onClose,
  onOpenQuoteWithTechnique,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-on-surface/60 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-surface-card max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl border border-surface-border my-6 relative max-h-[90vh] flex flex-col">
        {/* Top Image Banner */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-container shrink-0">
          <img
            src={service.imageUrl}
            alt={service.imageAlt}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-on-surface/60 hover:bg-on-surface text-surface-card backdrop-blur-md transition-colors"
            aria-label="Cerrar modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span
              className="px-3 py-1 rounded-full font-label-sm text-label-sm text-on-surface shadow-md bg-surface-card"
            >
              {service.badge}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-lg text-headline-md sm:text-headline-lg text-on-surface">
              {service.name}
            </h3>
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: service.dotColor }}
            ></span>
          </div>

          <p className="font-body-md text-body-md text-secondary leading-relaxed">
            {service.fullDesc}
          </p>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-surface-container-low border border-surface-border space-y-1">
              <span className="text-xs text-secondary font-medium">Telas y Materiales Compatibles:</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {service.materials.map((m) => (
                  <span
                    key={m}
                    className="text-xs px-2.5 py-0.5 rounded-full bg-surface-card text-on-surface border border-surface-border"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-low border border-surface-border space-y-1">
              <span className="text-xs text-secondary font-medium">Resistencia & Durabilidad:</span>
              <p className="font-label-md text-label-md text-on-surface font-semibold">
                {service.durability}
              </p>
              <span className="text-xs text-secondary block mt-1">
                Cantidad mínima recomendada: <strong>{service.minQuantity}</strong>
              </span>
            </div>
          </div>

          {/* Key Advantages */}
          <div className="space-y-2 pt-2">
            <h4 className="font-label-md text-label-md text-on-surface">Ventajas Principales:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-whatsapp-green shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span className="text-secondary">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-surface-container border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenQuoteWithTechnique(service.id);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-surface-card hover:bg-surface-bright text-on-surface border border-surface-border text-xs font-label-md flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">calculate</span>
            <span>Calcular presupuesto con {service.name.split(' ')[0]}</span>
          </button>

          <a
            href={getWhatsAppLink(service.quoteMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Cotizar en WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
