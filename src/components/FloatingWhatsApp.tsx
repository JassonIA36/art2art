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
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip bubble on desktop */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-surface-card text-on-surface px-4 py-2.5 rounded-2xl shadow-xl border border-surface-border text-xs font-label-md animate-in slide-in-from-right duration-300 relative">
          <span>¡Hola! ¿Deseas cotizar tus camisetas hoy? 👋</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-secondary hover:text-on-surface ml-1 p-0.5"
            aria-label="Cerrar mensaje"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
          </button>
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-surface-card rotate-45 border-r border-t border-surface-border"></div>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        aria-label="Chatear por WhatsApp con Art2Art"
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp-green hover:bg-whatsapp-dark text-on-primary shadow-[0_8px_25px_-4px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-110 active:scale-95"
        href={getWhatsAppLink('Hola Art2Art 👋, estoy navegando en su página web y quiero asesoría técnica.')}
        rel="noopener noreferrer"
        target="_blank"
      >
        {/* Pulse radar ring */}
        <span className="absolute -inset-1 rounded-full bg-whatsapp-green opacity-40 animate-ping pointer-events-none"></span>

        <span className="material-symbols-outlined text-[30px]">chat</span>
      </a>
    </div>
  );
};
