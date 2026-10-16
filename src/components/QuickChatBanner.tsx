import React from 'react';
import { getWhatsAppLink } from '../data/mockData';

export const QuickChatBanner: React.FC = () => {
  return (
    <section className="w-full bg-[#141418] py-12 border-y border-[#2a2a36]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1a1a20] rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#2a2a36] hover:border-[#25D366]/40 transition-colors">
          <div className="flex items-center gap-5 text-center sm:text-left flex-col sm:flex-row">
            <div className="w-14 h-14 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[32px]">support_agent</span>
            </div>
            <div>
              <h3 className="text-3xl font-display text-white tracking-wide">
                ¿Tienes dudas sobre tu diseño o técnica?
              </h3>
              <p className="text-sm text-[#9ca3af] leading-relaxed">
                Escríbenos directamente a WhatsApp. Te asesoramos sin costo en la preparación de tus archivos y el tipo de estampado ideal.
              </p>
            </div>
          </div>

          <a
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1da851] text-[#0f0f12] font-bold text-sm shadow-whatsapp-glow transition-all hover:scale-105 active:scale-95"
            href={getWhatsAppLink('Hola Art2Art 👋, deseo asesoría técnica sobre mi diseño y cotización.')}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span>Hablar con un Asesor</span>
          </a>
        </div>
      </div>
    </section>
  );
};
