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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/80 backdrop-blur-md animate-fadeIn">
      <div className="relative max-w-3xl w-full max-h-[90vh] bg-surface-card rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-surface-border">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-on-surface/70 hover:bg-on-surface text-surface-card transition-colors shadow"
          aria-label="Cerrar visor"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        {/* Image Frame */}
        <div className="relative w-full aspect-[4/3] bg-surface-container overflow-hidden flex items-center justify-center">
          <img
            src={item.imageUrl}
            alt={item.alt}
            className="w-full h-full object-contain bg-black/5"
          />
        </div>

        {/* Image Caption & Actions */}
        <div className="p-4 sm:p-5 bg-surface-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-surface-border">
          <div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm font-semibold">
              Técnica: {item.category}
            </span>
            <h4 className="font-headline-sm text-headline-sm text-on-surface mt-1">
              {item.title}
            </h4>
            <p className="text-xs text-secondary">{item.alt}</p>
          </div>

          <a
            href={getWhatsAppLink(`Hola Art2Art, vi el trabajo "${item.title}" en su galería y deseo cotizar algo similar.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-whatsapp-green hover:bg-whatsapp-dark text-on-primary font-label-md text-label-md shadow transition-all hover:scale-[1.02]"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Cotizar estilo similar</span>
          </a>
        </div>
      </div>
    </div>
  );
};
