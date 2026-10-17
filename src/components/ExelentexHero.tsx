import React from 'react';
import { ThreeBackground } from './ThreeBackground';
import { getWhatsAppLink } from '../data/mockData';

export const ExelentexHero: React.FC = () => {
  return (
    <div id="main-screen" className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between pt-28 sm:pt-36 pb-12 overflow-hidden bg-white text-[#0b0e17] border-b border-slate-200">
      {/* Three.js Interactive 3D Particle Wave & Sphere Background */}
      <ThreeBackground showSphere={true} />

      {/* Hero Content Container */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
        {/* Top Categorical Breadcrumb with eXelentex Diagonal Slashes */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-xs sm:text-sm uppercase tracking-[0.2em] text-slate-500 mb-8 sm:mb-12 font-medium">
          <span>SERIGRAFÍA</span>
          <svg width="18" height="18" viewBox="0 0 21 20" fill="none" className="opacity-60">
            <line x1="1.29" y1="19.29" x2="19.67" y2="0.9" stroke="#94a3b8" strokeWidth="2" />
          </svg>
          <span className="text-[#0b0e17] font-semibold">DTF FULL COLOR</span>
          <svg width="18" height="18" viewBox="0 0 21 20" fill="none" className="opacity-60">
            <line x1="1.29" y1="19.29" x2="19.67" y2="0.9" stroke="#94a3b8" strokeWidth="2" />
          </svg>
          <span>SUBLIMACIÓN</span>
          <svg width="18" height="18" viewBox="0 0 21 20" fill="none" className="opacity-60">
            <line x1="1.29" y1="19.29" x2="19.67" y2="0.9" stroke="#94a3b8" strokeWidth="2" />
          </svg>
          <span className="text-[#dc0c1c] font-semibold">VINILO TEXTIL</span>
        </div>

        {/* Signature Staggered Slogan Grid */}
        <div className="space-y-4 sm:space-y-6 max-w-5xl">
          {/* Row 1 */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
            <span className="text-lg sm:text-2xl text-slate-500 font-light tracking-wide">
              Hoy en Buga
            </span>
            <span className="text-5xl sm:text-7xl lg:text-9xl font-extralight tracking-tight text-[#0b0e17] leading-none font-display uppercase">
              creamos
            </span>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 sm:pl-16 lg:pl-28">
            <span className="text-lg sm:text-2xl text-slate-500 font-light tracking-wide">
              prendas que son
            </span>
            <span className="text-5xl sm:text-7xl lg:text-9xl font-extralight tracking-tight text-[#0b0e17] leading-none font-display uppercase flex items-baseline gap-2">
              <span>únicas</span>
              <span className="text-[#dc0c1c] text-3xl sm:text-5xl lg:text-7xl">&</span>
            </span>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 sm:pl-32 lg:pl-56">
            <span className="text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight leading-none font-display uppercase text-shimmer">
              duraderas
            </span>
            <span className="text-lg sm:text-2xl text-slate-500 font-light tracking-wide">
              para tu marca
            </span>
          </div>
        </div>

        {/* Call to Actions inspired by eXelentex Circular Design */}
        <div className="pt-12 sm:pt-16 flex flex-wrap items-center gap-6 sm:gap-10">
          {/* Signature Circular Read More Link */}
          <a
            href="#personalizador"
            className="group flex items-center gap-5 focus:outline-none"
          >
            <span className="text-sm sm:text-base font-semibold tracking-wider uppercase text-[#0b0e17] group-hover:text-[#dc0c1c] transition-colors">
              Personaliza tu Pedido
            </span>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform transition-transform duration-500 group-hover:rotate-45" viewBox="0 0 80 80">
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

          {/* Secondary WhatsApp Pill */}
          <a
            href={getWhatsAppLink('Hola Art2Art, deseo cotizar un proyecto de estampado.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 text-xs sm:text-sm font-medium tracking-wide transition-all shadow-sm hover:border-[#dc0c1c]/50"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
            <span>Chatear por WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Bottom Scroll Indicator with fine line */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 flex items-center justify-between text-xs text-slate-500 uppercase tracking-[0.25em]">
        <span className="flex items-center gap-3">
          <span className="w-8 h-[1px] bg-slate-300"></span>
          <span>Boutique Atelier • Buga, Valle</span>
        </span>

        <a
          href="#que-hacemos"
          className="flex items-center gap-2 hover:text-[#0b0e17] transition-colors"
        >
          <span>Scroll</span>
          <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
        </a>
      </div>
    </div>
  );
};
