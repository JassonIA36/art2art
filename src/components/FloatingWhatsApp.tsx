import React, { useState, useEffect } from 'react';
import { getWhatsAppLink } from '../data/mockData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 4 seconds to invite conversation
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-row-reverse items-center gap-3">
      {/* Tooltip bubble on desktop */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-[#0b0e17] px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200 text-xs font-medium animate-in slide-in-from-left duration-300 relative">
          <span data-edit="flotante_mensaje">¡Hola! ¿Deseas cotizar o asesoría técnica? 👋</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-700 ml-1 p-0.5"
            aria-label="Cerrar mensaje"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
          </button>
          <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-l border-b border-slate-200"></div>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        aria-label="Chatear por WhatsApp con Art2Art"
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp-green hover:bg-whatsapp-dark text-on-primary shadow-whatsapp-glow transition-all duration-300 hover:scale-110 active:scale-95"
        href={getWhatsAppLink('Hola Art2Art 👋, estoy navegando en su página web y quiero asesoría técnica.')}
        data-edit-href="flotante_whatsapp"
        rel="noopener noreferrer"
        target="_blank"
      >
        {/* Pulse radar ring */}
        <span className="absolute -inset-2 rounded-full bg-whatsapp-green/35 animate-radar-wave pointer-events-none"></span>
        <span className="absolute -inset-1 rounded-full bg-whatsapp-green opacity-40 animate-ping pointer-events-none"></span>

        <span className="material-symbols-outlined text-[30px]">chat</span>
      </a>
    </div>
  );
};
