import React from 'react';
import { getWhatsAppLink } from '../data/mockData';

export const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative w-full overflow-hidden bg-[#0f0f12] py-16 pt-28 sm:pt-36 border-b border-[#2a2a36]">
      {/* Ink Glow Background Accents */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#e6197e]/10 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00b4d8]/10 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse-glow"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ffd60a]/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Copy & Conversions */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-5 z-10">
            {/* Chromatic Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1a1a20] shadow-md border border-[#2a2a36] hover:border-[#e6197e]/50 transition-colors">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#ffd60a] ring-2 ring-[#ffd60a]/30"></span>
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#e6197e] ring-2 ring-[#e6197e]/30"></span>
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#00b4d8] ring-2 ring-[#00b4d8]/30"></span>
              <span className="text-xs uppercase tracking-wider ml-1 font-bold text-white">
                Taller Textil Urbano • Buga, Valle
              </span>
            </div>

            {/* Main Impact Title */}
            <h1 className="text-5xl sm:text-7xl font-display text-white tracking-wider leading-[0.95]">
              TRANSFORMA TUS IDEAS EN{' '}
              <span className="relative inline-block text-[#e6197e]">
                <span className="relative z-10 text-shimmer">ARTE IMPRESO</span>
                <span className="absolute -bottom-1 left-0 w-full h-3 bg-[#ffd60a]/20 -z-10 rounded"></span>
              </span>
            </h1>

            {/* Body Description */}
            <p className="text-base sm:text-lg text-[#9ca3af] max-w-xl leading-relaxed">
              Estampado profesional en Buga: Serigrafía, DTF, Sublimación y Vinilo Textil de máxima durabilidad. Personaliza tu prenda en línea y cotiza con hasta 20% de descuento por cantidad.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              {/* Primary CTA: Personaliza ahora */}
              <a
                className="w-full sm:w-auto text-center font-display text-2xl tracking-wider px-8 py-3.5 rounded-xl bg-[#e6197e] hover:bg-[#c9126b] text-white shadow-magenta-glow transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2"
                href="#personalizador"
              >
                <span>Personaliza ahora</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </a>

              {/* Secondary CTA: WhatsApp */}
              <a
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold text-sm px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1da851] text-[#0f0f12] shadow-whatsapp-glow transition-all hover:scale-[1.03] active:scale-[0.98]"
                href={getWhatsAppLink('Hola Art2Art, deseo cotizar un proyecto de estampado.')}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>WhatsApp Directo</span>
              </a>

              {/* Quick Link to Services */}
              <a
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 font-semibold text-sm px-5 py-3.5 rounded-xl bg-[#1a1a20] hover:bg-[#22222b] text-white border border-[#2a2a36] hover:border-[#00b4d8] transition-all"
                href="#nuestros-servicios-de-estampado"
              >
                <span className="material-symbols-outlined text-[#00b4d8] text-[18px]">category</span>
                <span>Ver Servicios</span>
              </a>
            </div>

            {/* Value Chips Bar */}
            <div className="pt-4 grid grid-cols-3 gap-3 w-full">
              <div className="bg-[#1a1a20] rounded-xl p-3.5 border border-[#2a2a36] hover:border-[#e6197e]/50 hover:-translate-y-1 transition-all">
                <span className="text-2xl font-display text-[#e6197e] block">+10 AÑOS</span>
                <span className="text-xs text-[#9ca3af]">Experiencia Real</span>
              </div>
              <div className="bg-[#1a1a20] rounded-xl p-3.5 border border-[#2a2a36] hover:border-[#00b4d8]/50 hover:-translate-y-1 transition-all">
                <span className="text-2xl font-display text-[#00b4d8] block">DESDE 1 UND</span>
                <span className="text-xs text-[#9ca3af]">Mayor y Detal</span>
              </div>
              <div className="bg-[#1a1a20] rounded-xl p-3.5 border border-[#2a2a36] hover:border-[#ffd60a]/50 hover:-translate-y-1 transition-all">
                <span className="text-2xl font-display text-[#ffd60a] block">DESPACHOS</span>
                <span className="text-xs text-[#9ca3af]">Buga y Colombia</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-[#1a1a20] border-2 border-[#2a2a36] group">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Prendas estampadas de alta calidad en el taller Art2Art de Buga con ilustraciones a todo color"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEIkXMs1qcd-j2xy7OeGhviO-NURx1q-SfiHd0MmjFmogXuCGbHZ6x2FkCySoWVgKWAArjb8oW557dH29Qj3BTQ4L9qCMjs78gS-We4ltmVAiYGSxk7ocFKv1oEeZ1ygsO5BqoahizKF7oTWck2rnkgYZvY8TwL2MgnZAJttnQ5uE-8gEuqOHmJyjhDEfqN61CMgmY_o15oGlQT3fOTKbwb0eXb2e42DRsyzEeb0d7K9rDxdG-q8-n"
                loading="eager"
              />

              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-transparent to-transparent opacity-60"></div>

              {/* Floating Workshop Badge */}
              <div className="absolute bottom-4 left-4 right-4 glass-panel p-3.5 sm:p-4 rounded-xl shadow-xl flex items-center justify-between border border-[#2a2a36]">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#25D366]"></span>
                  </span>
                  <div>
                    <p className="text-xs sm:text-sm text-white font-bold tracking-tight">Taller Activo en Guadalajara de Buga</p>
                    <p className="text-[11px] sm:text-xs text-[#9ca3af]">Producción inmediata y atención personalizada</p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#e6197e]/15 text-[#e6197e] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
