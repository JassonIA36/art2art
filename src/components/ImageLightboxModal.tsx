import React, { useEffect } from 'react';
import type { PortfolioItem } from '../types';
import { getWhatsAppLink } from '../data/mockData';

interface ImageLightboxModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-md animate-fadeIn">
      <div className="relative max-w-3xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-slate-200 text-[#0b0e17]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-slate-800 transition-colors shadow-lg"
          aria-label="Cerrar visor"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        {/* Image Frame */}
        <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden flex items-center justify-center">
          <img
            src={item.imageUrl}
            alt={item.alt}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Image Caption & Actions */}
        <div className="p-5 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-200">
          <div>
            <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#dc0c1c] text-white font-bold">
              {item.category}
            </span>
            <h4 className="text-2xl font-display text-[#0b0e17] mt-1">
              {item.title}
            </h4>
            <p className="text-xs text-slate-500 font-light">{item.alt}</p>
          </div>

          <a
            href={getWhatsAppLink(`Hola Art2Art, vi el trabajo "${item.title}" en su galería y deseo cotizar algo similar.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1da851] text-white text-xs font-bold shadow-md transition-all hover:scale-105"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Cotizar este estilo</span>
          </a>
        </div>
      </div>
    </div>
  );
};
