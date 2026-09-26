import React from 'react';
import { getWhatsAppLink } from '../data/mockData';

export const QuickChatBanner: React.FC = () => {
  return (
    <section className="w-full bg-surface-container py-space-lg border-y border-surface-border/40">
      <div className="max-w-4xl mx-auto px-margin">
        <div className="bg-surface-card rounded-xl p-space-md sm:p-space-lg shadow-md flex flex-col sm:flex-row items-center justify-between gap-space-md border border-surface-border/70 hover:border-whatsapp-green/40 transition-colors">
          <div className="flex items-center gap-space-md text-center sm:text-left flex-col sm:flex-row">
            <div className="w-14 h-14 rounded-full bg-whatsapp-green/10 text-whatsapp-green flex items-center justify-center shrink-0 shadow-inner">
              <span className="material-symbols-outlined text-[32px]">support_agent</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Hola 👋, Bienvenido a Art2Art
              </h3>
              <p className="font-body-md text-body-md text-secondary">
                ¿Cómo podemos ayudarte hoy? Cotiza de forma ágil y recibe asesoría técnica personalizada.
              </p>
            </div>
          </div>

          <a
            className="shrink-0 inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-whatsapp-green hover:bg-whatsapp-dark text-on-primary font-label-md text-label-md shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            href={getWhatsAppLink('Hola 👋 Bienvenido a Art2art deseo asesoria inmediata.')}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span>Iniciar Chat</span>
          </a>
        </div>
      </div>
    </section>
  );
};
