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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-[#1a1a20] max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl border border-[#2a2a36] my-6 relative max-h-[90vh] flex flex-col">
        {/* Top Image Banner */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#141418] shrink-0">
          <img
            src={service.imageUrl}
            alt={service.imageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a20] via-transparent to-transparent opacity-80"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md transition-colors"
            aria-label="Cerrar modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#e6197e] text-white shadow-lg">
              {service.badge}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-display text-white tracking-wide">
              {service.name}
            </h3>
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: service.dotColor }}
            ></span>
          </div>

          <p className="text-sm text-[#9ca3af] leading-relaxed">
            {service.fullDesc}
          </p>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#141418] border border-[#2a2a36] space-y-1.5">
              <span className="text-xs text-[#9ca3af] font-semibold">Telas y Materiales Compatibles:</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {service.materials.map((m) => (
                  <span
                    key={m}
                    className="text-xs px-2.5 py-0.5 rounded-md bg-[#22222b] text-white border border-[#2a2a36]"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#141418] border border-[#2a2a36] space-y-1.5">
              <span className="text-xs text-[#9ca3af] font-semibold">Resistencia & Durabilidad:</span>
              <p className="text-sm text-white font-bold">
                {service.durability}
              </p>
              <span className="text-xs text-[#00b4d8] block mt-1">
                Cantidad mínima recomendada: <strong>{service.minQuantity}</strong>
              </span>
            </div>
          </div>

          {/* Key Advantages */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Ventajas Principales:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#25D366] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span className="text-[#9ca3af]">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-[#141418] border-t border-[#2a2a36] flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#22222b] hover:bg-[#2c2c38] text-[#9ca3af] hover:text-white border border-[#2a2a36] text-xs font-semibold transition-colors shadow-sm"
          >
            Cerrar
          </button>

          <a
            href={getWhatsAppLink(service.quoteMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1da851] text-[#0f0f12] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-whatsapp-glow hover:scale-105"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Cotizar {service.name.split(' ')[0]} por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
