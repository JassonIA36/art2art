import React from 'react';
import { getWhatsAppLink } from '../data/mockData';

export const ImproveYourBusinessSection: React.FC = () => {
  return (
    <section className="relative w-full py-24 sm:py-36 bg-white text-[#0b0e17] border-b border-slate-200 overflow-hidden">
      {/* 3D Orb Lighting / Glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#dc0c1c]/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Geometric SVG Wireframes (Exact eXelentex Corner Figures) */}
      <div className="absolute top-10 left-8 sm:left-16 opacity-40 pointer-events-none">
        <svg width="42" height="42" viewBox="0 0 39 38" fill="none">
          <line x1="0.65" y1="37.65" x2="16.97" y2="21.32" stroke="#94a3b8" strokeWidth="1.5" />
          <path d="M38 37.3L19.85 19.15L38 1" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="absolute bottom-12 right-8 sm:right-16 opacity-40 pointer-events-none">
        <svg width="34" height="34" viewBox="0 0 32 31" fill="none">
          <line x1="0.65" y1="30.65" x2="13.88" y2="17.41" stroke="#94a3b8" strokeWidth="1.5" />
          <path d="M16.28 15.72L31 1" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <span className="text-xs uppercase tracking-[0.25em] text-[#dc0c1c] font-semibold inline-block">
          Capacidad de Taller Boutique
        </span>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light text-[#0b0e17] tracking-tight leading-tight">
          Impulsa tu Marca Textil
        </h2>

        <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
          Optimizamos tus diseños y elevamos la calidad de tus prendas con estampados duraderos, asesoría técnica experta y tiempos de entrega garantizados en Buga y toda Colombia.
        </p>

        {/* The Signature eXelentex Circular Read More Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href={getWhatsAppLink('Hola Art2Art, deseo cotizar la producción de un lote de prendas.')}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-5 focus:outline-none"
          >
            <span className="text-sm sm:text-base font-semibold tracking-wider uppercase text-[#0b0e17] group-hover:text-[#dc0c1c] transition-colors">
              Iniciar Proyecto por WhatsApp
            </span>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform transition-transform duration-500 group-hover:scale-105" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="38"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  className="group-hover:stroke-[#dc0c1c] transition-colors"
                />
                <path
                  d="M28 40H52M52 40L43 32M52 40L43 48"
                  fill="none"
                  stroke="#dc0c1c"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>

          <a
            href="#personalizador"
            className="text-xs uppercase tracking-wider text-slate-500 hover:text-[#0b0e17] font-medium underline underline-offset-4 transition-colors"
          >
            O simular en el personalizador 2D en vivo
          </a>
        </div>
      </div>
    </section>
  );
};
