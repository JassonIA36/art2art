import React from 'react';
import { COMPANY_INFO, getWhatsAppLink } from '../data/mockData';

export const MmmFooter: React.FC = () => {
  return (
    <footer className="w-full bg-white text-black border-t border-black/10 py-16">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-black/10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-[-0.04em] text-black">
                art2art
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc0c1c]"></span>
            </div>
            <p className="text-xs sm:text-sm text-black/60 leading-relaxed font-normal">
              Taller de estampación textil de alta precisión en Guadalajara de Buga, Valle del Cauca. Soluciones para marcas, empresas y creadores con DTF, serigrafía y vinilo.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-black/50">
              <span>📍 {COMPANY_INFO.address}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-black">
              Explorar
            </h4>
            <ul className="space-y-2 text-sm text-black/70">
              <li>
                <a href="#catalogo" className="hover:text-black transition-colors">
                  Catálogo de Prendas
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-black transition-colors">
                  Cómo Funciona el Pedido
                </a>
              </li>
              <li>
                <a href="#personalizador" className="hover:text-black transition-colors font-medium text-black">
                  Personalizador en Vivo
                </a>
              </li>
              <li>
                <a href="#caracteristicas" className="hover:text-black transition-colors">
                  Técnicas y Ventajas
                </a>
              </li>
              <li>
                <a href="#opiniones" className="hover:text-black transition-colors">
                  Opiniones de Clientes
                </a>
              </li>
            </ul>
          </div>

          {/* Techniques */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-black">
              Técnicas
            </h4>
            <ul className="space-y-2 text-sm text-black/70">
              <li>
                <span className="text-black font-medium">DTF Full Color 300 DPI</span>
              </li>
              <li>
                <span>Serigrafía Textil Tradicional</span>
              </li>
              <li>
                <span>Sublimación Digital HD</span>
              </li>
              <li>
                <span>Vinilo Textil Térmico & Reflectivo</span>
              </li>
              <li>
                <span>Bordado & Acabados de Autor</span>
              </li>
            </ul>
          </div>

          {/* Direct WhatsApp CTA */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-black">
              Contacto Inmediato
            </h4>
            <p className="text-xs text-black/60 leading-relaxed">
              Atención directa por WhatsApp de lunes a sábado de 8:00 AM a 6:30 PM.
            </p>
            <a
              href={getWhatsAppLink('Hola Art2Art, quiero hacer una consulta sobre un pedido.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-black text-white hover:bg-neutral-800 text-xs font-semibold uppercase tracking-wider py-3 px-5 transition-all shadow-sm w-full"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
              <span>Chatear en WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-black/50">
          <p>© {new Date().getFullYear()} Art2Art Estampados. Todos los derechos reservados. Guadalajara de Buga, Colombia.</p>
          <div className="flex items-center gap-4">
            <a href={COMPANY_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
              Instagram
            </a>
            <a href={COMPANY_INFO.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
              Facebook
            </a>
            <a href={COMPANY_INFO.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
              Google Maps
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
