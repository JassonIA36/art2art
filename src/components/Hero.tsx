import React from 'react';
import { getWhatsAppLink } from '../data/mockData';

interface HeroProps {
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  return (
    <section id="inicio" className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-low via-background to-background py-space-xl pt-28 sm:pt-32">
      <div className="max-w-7xl mx-auto px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Left Column: Copy & Conversions */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-space-md z-10">
            {/* Chromatic Pill Tag */}
            <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container shadow-sm border border-surface-border/60">
              <span className="flex h-2 w-2 rounded-full bg-petal-yellow"></span>
              <span className="flex h-2 w-2 rounded-full bg-petal-red"></span>
              <span className="flex h-2 w-2 rounded-full bg-petal-orange"></span>
              <span className="flex h-2 w-2 rounded-full bg-petal-cyan"></span>
              <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider ml-1">
                Taller Creativo en Buga
              </span>
            </div>

            {/* Main Impact Title */}
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight leading-tight">
              Transforma tus ideas en{' '}
              <span className="relative inline-block text-primary">
                Arte Impreso
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-petal-yellow -z-10"
                  fill="currentColor"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 12"
                >
                  <path d="M0,8 Q50,0 100,6 L100,12 Q50,6 0,12 Z"></path>
                </svg>
              </span>
            </h1>

            {/* Body Description */}
            <p className="font-body-lg text-body-lg text-secondary max-w-xl">
              Ofrecemos las mejores técnicas de estampados en Buga y alrededores con tecnología de vanguardia y más de 10 años de experiencia para garantizar resultados de alta fidelidad textil.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs w-full sm:w-auto">
              <a
                className="w-full sm:w-auto text-center font-label-lg text-label-lg px-space-lg py-space-sm rounded-full bg-primary text-on-primary shadow-md hover:bg-primary-container transition-all hover:scale-[1.02] active:scale-[0.98]"
                href="#nuestros-servicios-de-estampado"
              >
                Explorar Servicios
              </a>

              <a
                className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs font-label-lg text-label-lg px-space-md py-space-sm rounded-full bg-surface-card hover:bg-surface-bright text-on-surface border border-petal-yellow/60 shadow-sm hover:border-primary/40 transition-all hover:scale-[1.02]"
                href="#simulador"
              >
                <span className="material-symbols-outlined text-petal-red text-[20px]">palette</span>
                <span>Simulador 2D</span>
              </a>

              <a
                className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs font-label-lg text-label-lg px-space-md py-space-sm rounded-full bg-whatsapp-green text-on-primary shadow-[0_8px_20px_-4px_rgba(37,211,102,0.35)] hover:bg-whatsapp-dark transition-all hover:scale-[1.02] active:scale-[0.98]"
                href={getWhatsAppLink('Hola, deseo cotizar un proyecto de estampado.')}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs font-label-lg text-label-lg px-space-md py-space-sm rounded-full bg-surface-card hover:bg-surface-bright text-on-surface border border-surface-border shadow-sm hover:border-primary/40 transition-all hover:scale-[1.02]"
              >
                <span className="material-symbols-outlined text-primary text-[20px]">calculate</span>
                <span>Cotizador</span>
              </button>
            </div>

            {/* Value Chips Bar */}
            <div className="pt-space-md grid grid-cols-3 gap-space-sm w-full">
              <div className="bg-surface-card rounded-lg p-space-sm shadow-sm flex flex-col border border-surface-border/50 hover:border-primary/30 transition-colors">
                <span className="font-headline-sm text-headline-sm text-primary">+10 Años</span>
                <span className="font-label-sm text-label-sm text-secondary">de Experiencia</span>
              </div>
              <div className="bg-surface-card rounded-lg p-space-sm shadow-sm flex flex-col border border-surface-border/50 hover:border-tertiary/30 transition-colors">
                <span className="font-headline-sm text-headline-sm text-tertiary">Mayor y Detal</span>
                <span className="font-label-sm text-label-sm text-secondary">Desde 1 unidad</span>
              </div>
              <div className="bg-surface-card rounded-lg p-space-sm shadow-sm flex flex-col border border-surface-border/50 hover:border-petal-orange/30 transition-colors">
                <span className="font-headline-sm text-headline-sm text-petal-orange">100% Local</span>
                <span className="font-label-sm text-label-sm text-secondary">Envíos Valle</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition / Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl bg-surface-container-high border border-white/60 group">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="High quality studio mockup of custom printed colorful apparel from Art2Art workshop including vivid parrot illustration on cotton t-shirt, sublimation tote bag, thermo mug, and embroidered cap arranged with screen printing squeegees in clean studio daylight."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEIkXMs1qcd-j2xy7OeGhviO-NURx1q-SfiHd0MmjFmogXuCGbHZ6x2FkCySoWVgKWAArjb8oW557dH29Qj3BTQ4L9qCMjs78gS-We4ltmVAiYGSxk7ocFKv1oEeZ1ygsO5BqoahizKF7oTWck2rnkgYZvY8TwL2MgnZAJttnQ5uE-8gEuqOHmJyjhDEfqN61CMgmY_o15oGlQT3fOTKbwb0eXb2e42DRsyzEeb0d7K9rDxdG-q8-n"
                loading="eager"
              />

              {/* Floating Technique Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-surface-card/95 backdrop-blur-md p-space-md rounded-lg shadow-lg flex items-center justify-between border border-white/50">
                <div className="flex items-center gap-space-sm">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-whatsapp-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-whatsapp-green"></span>
                  </span>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">Taller Activo en Guadalajara de Buga</p>
                    <p className="font-body-sm text-body-sm text-secondary">Pedidos urgentes y producciones masivas</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-primary text-[24px]" title="Taller verificado">
                  verified
                </span>
              </div>
            </div>

            {/* Decorative Color Blobs */}
            <div className="absolute -top-6 -right-6 w-36 h-36 bg-petal-yellow/30 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse-glow"></div>
            <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-petal-cyan/30 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse-glow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
