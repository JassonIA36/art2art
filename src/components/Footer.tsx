import React, { useState } from 'react';
import { COMPANY_INFO, getWhatsAppLink } from '../data/mockData';

export const Footer: React.FC = () => {
  const [careGuideModalOpen, setCareGuideModalOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-[#0a0a0c] text-white border-t border-[#2a2a36]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#00b4d8]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffd60a]"></div>
                <div className="w-3 h-3 rounded-full bg-[#e6197e]"></div>
                <span className="font-display text-3xl ml-1 text-white">
                  Art2Art
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                Más de 10 años transformando ideas en realidad textil en Guadalajara de Buga, Valle del Cauca. Calidad garantizada, precisión técnica y pasión por el estampado artesanal e industrial.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-[#9ca3af] uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#e6197e]">location_on</span>
                  <span>Sede Buga, Colombia</span>
                </span>
              </div>
            </div>

            {/* Techniques column */}
            <div className="space-y-3">
              <h3 className="font-display text-2xl text-white tracking-wide">Técnicas</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#9ca3af]">
                <li>
                  <a
                    className="hover:text-[#ffd60a] transition-colors flex items-center gap-2"
                    href="#nuestros-servicios-de-estampado"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffd60a]"></span>
                    <span>Serigrafía Textil</span>
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#e6197e] transition-colors flex items-center gap-2"
                    href="#nuestros-servicios-de-estampado"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e6197e]"></span>
                    <span>Sublimación HD</span>
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#f37023] transition-colors flex items-center gap-2"
                    href="#nuestros-servicios-de-estampado"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f37023]"></span>
                    <span>Vinilo Textil & Reflectivo</span>
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#00b4d8] transition-colors flex items-center gap-2"
                    href="#nuestros-servicios-de-estampado"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00b4d8]"></span>
                    <span>DTF Directo a Film</span>
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#25D366] transition-colors flex items-center gap-2"
                    href="#personalizador"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                    <span>Personalizador en Vivo</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Direct contact column */}
            <div className="space-y-3">
              <h3 className="font-display text-2xl text-white tracking-wide">Contacto Directo</h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#9ca3af]">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#e6197e] shrink-0 mt-0.5">
                    location_on
                  </span>
                  <span>{COMPANY_INFO.address}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#25D366] shrink-0">
                    chat
                  </span>
                  <a
                    className="hover:text-[#25D366] hover:underline transition-colors"
                    href={getWhatsAppLink('Hola Art2Art, quiero hacer una consulta.')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp: {COMPANY_INFO.whatsappDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#00b4d8] shrink-0">
                    call
                  </span>
                  <a
                    className="hover:text-[#00b4d8] hover:underline transition-colors"
                    href={`tel:+57${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                  >
                    Teléfono: {COMPANY_INFO.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#ffd60a] shrink-0">
                    schedule
                  </span>
                  <span>{COMPANY_INFO.schedule}</span>
                </li>
              </ul>
            </div>

            {/* Community column */}
            <div className="space-y-3">
              <h3 className="font-display text-2xl text-white tracking-wide">Comunidad Textil</h3>
              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                Sigue nuestro taller en tiempo real, mira videos de producciones y entérate de nuevos talleres presenciales.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <a
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1a1a20] hover:bg-[#22222b] text-white text-xs font-semibold border border-[#2a2a36] hover:border-[#e6197e] transition-all"
                  href={COMPANY_INFO.instagramUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#e6197e]">photo_camera</span>
                  <span>Instagram</span>
                </a>
                <a
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1a1a20] hover:bg-[#22222b] text-white text-xs font-semibold border border-[#2a2a36] hover:border-[#00b4d8] transition-all"
                  href={COMPANY_INFO.facebookUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#00b4d8]">groups</span>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-[#2a2a36] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#9ca3af]">
            <p>© 2026 Art2Art Estampados. Todos los derechos reservados. Guadalajara de Buga, Valle del Cauca.</p>
            <div className="flex items-center gap-4">
              <a className="hover:text-white transition-colors" href="#inicio">
                Términos & Garantía
              </a>
              <span>•</span>
              <button
                type="button"
                onClick={() => setCareGuideModalOpen(true)}
                className="hover:text-[#ffd60a] transition-colors font-semibold"
              >
                Guía de Cuidados Textiles
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Care Guide Modal */}
      {careGuideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#1a1a20] max-w-lg w-full rounded-2xl p-6 shadow-2xl space-y-4 border border-[#2a2a36]">
            <div className="flex items-center justify-between border-b border-[#2a2a36] pb-3">
              <h4 className="text-2xl font-display text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#e6197e] text-[24px]">local_laundry_service</span>
                <span>Guía de Cuidados Textiles Art2Art</span>
              </h4>
              <button
                onClick={() => setCareGuideModalOpen(false)}
                className="p-1.5 rounded-lg text-[#9ca3af] hover:text-white hover:bg-[#22222b]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#9ca3af]">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#ffd60a] text-[20px] shrink-0">wash</span>
                <p><strong className="text-white">Lavar al revés:</strong> Dale la vuelta a la prenda antes de ingresarla a la lavadora para proteger el estampado del roce.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#00b4d8] text-[20px] shrink-0">ac_unit</span>
                <p><strong className="text-white">Agua fría:</strong> Lava siempre con agua a temperatura ambiente o fría (máximo 30°C). Evita el agua caliente.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#f37023] text-[20px] shrink-0">iron</span>
                <p><strong className="text-white">No planchar directo:</strong> Nunca pongas la plancha sobre el estampado DTF, serigrafía o vinilo. Plancha por el reverso.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#e6197e] text-[20px] shrink-0">block</span>
                <p><strong className="text-white">Cero blanqueadores o lejía:</strong> Usa detergentes suaves y evita secadora a altas temperaturas.</p>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setCareGuideModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#e6197e] hover:bg-[#c9126b] text-white font-bold text-xs"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
