import React from 'react';
import type { ServiceItem } from '../types';
import { getWhatsAppLink } from '../data/mockData';

interface TechniqueDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const TechniqueDetailModal: React.FC<TechniqueDetailModalProps> = ({
  service,
  onClose,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-white max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 my-6 relative max-h-[90vh] flex flex-col text-[#0b0e17]">
        {/* Top Image Banner */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 shrink-0">
          <img
            src={service.imageUrl}
            alt={service.imageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white text-slate-800 backdrop-blur-md transition-colors shadow-md"
            aria-label="Cerrar modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#dc0c1c] text-white shadow-md">
              {service.badge}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-display text-[#0b0e17] tracking-wide">
              {service.name}
            </h3>
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: service.dotColor }}
            ></span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed font-light">
            {service.fullDesc}
          </p>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-xs text-slate-500 font-semibold">Telas y Materiales Compatibles:</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {service.materials.map((m) => (
                  <span
                    key={m}
                    className="text-xs px-2.5 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200 shadow-sm"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-xs text-slate-500 font-semibold">Resistencia & Durabilidad:</span>
              <p className="text-sm text-[#0b0e17] font-bold">
                {service.durability}
              </p>
              <span className="text-xs text-[#dc0c1c] block mt-1 font-medium">
                Cantidad mínima recomendada: <strong>{service.minQuantity}</strong>
              </span>
            </div>
          </div>

          {/* Key Advantages */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold text-[#0b0e17] uppercase tracking-wider">Ventajas Principales:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#25D366] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span className="text-slate-600">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold transition-colors shadow-sm"
          >
            Cerrar
          </button>

          <a
            href={getWhatsAppLink(service.quoteMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1da851] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:scale-105"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Cotizar {service.name.split(' ')[0]} por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
