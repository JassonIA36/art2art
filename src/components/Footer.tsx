import React, { useState } from 'react';
import { COMPANY_INFO, getWhatsAppLink } from '../data/mockData';

export const Footer: React.FC = () => {
  const [careGuideModalOpen, setCareGuideModalOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-[#f8fafc] text-[#0b0e17] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#dc0c1c]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#0b0e17]"></span>
                <span className="font-display text-3xl ml-1 text-[#0b0e17] tracking-tight">
                  Art2Art
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Más de 10 años transformando ideas en realidad textil en Guadalajara de Buga, Valle del Cauca. Calidad garantizada, precisión técnica y pasión por el estampado artesanal e industrial.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1 font-mono">
                  <span className="material-symbols-outlined text-[16px] text-[#dc0c1c]">location_on</span>
                  <span>Sede Buga, Colombia</span>
                </span>
              </div>
            </div>

            {/* Techniques column */}
            <div className="space-y-3">
              <h3 className="font-display text-2xl text-[#0b0e17] tracking-wide">Técnicas</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li>
                  <a
                    className="hover:text-[#dc0c1c] transition-colors flex items-center gap-2"
                    href="#tecnologias"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dc0c1c]"></span>
                    <span>Serigrafía Textil</span>
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#dc0c1c] transition-colors flex items-center gap-2"
                    href="#tecnologias"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dc0c1c]"></span>
                    <span>Sublimación HD</span>
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#dc0c1c] transition-colors flex items-center gap-2"
                    href="#tecnologias"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dc0c1c]"></span>
                    <span>Vinilo Textil & Reflectivo</span>
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#dc0c1c] transition-colors flex items-center gap-2"
                    href="#tecnologias"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dc0c1c]"></span>
                    <span>DTF Directo a Film</span>
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#dc0c1c] transition-colors flex items-center gap-2 font-medium text-[#0b0e17]"
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
              <h3 className="font-display text-2xl text-[#0b0e17] tracking-wide">Contacto Directo</h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#dc0c1c] shrink-0 mt-0.5">
                    location_on
                  </span>
                  <span>{COMPANY_INFO.address}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#25D366] shrink-0">
                    chat
                  </span>
                  <a
                    className="hover:text-[#25D366] hover:underline transition-colors font-medium text-[#0b0e17]"
                    href={getWhatsAppLink('Hola Art2Art, quiero hacer una consulta.')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp: {COMPANY_INFO.whatsappDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-slate-700 shrink-0">
                    call
                  </span>
                  <a
                    className="hover:text-[#dc0c1c] hover:underline transition-colors"
                    href={`tel:+57${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                  >
                    Teléfono: {COMPANY_INFO.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-slate-700 shrink-0">
                    schedule
                  </span>
                  <span>{COMPANY_INFO.schedule}</span>
                </li>
              </ul>
            </div>

            {/* Community column */}
            <div className="space-y-3">
              <h3 className="font-display text-2xl text-[#0b0e17] tracking-wide">Comunidad Textil</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Sigue nuestro taller en tiempo real, mira videos de producciones y entérate de nuevas colecciones e innovaciones textiles.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <a
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-[#0b0e17] text-xs font-semibold border border-slate-200 transition-all shadow-sm hover:border-[#dc0c1c]"
                  href={COMPANY_INFO.instagramUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#dc0c1c]">photo_camera</span>
                  <span>Instagram</span>
                </a>
                <a
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-[#0b0e17] text-xs font-semibold border border-slate-200 transition-all shadow-sm hover:border-slate-400"
                  href={COMPANY_INFO.facebookUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[16px] text-slate-700">groups</span>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 Art2Art Estampados. Todos los derechos reservados. Guadalajara de Buga, Valle del Cauca.</p>
            <div className="flex items-center gap-4">
              <a className="hover:text-[#dc0c1c] transition-colors" href="#inicio">
                Términos & Garantía
              </a>
              <span>•</span>
              <button
                type="button"
                onClick={() => setCareGuideModalOpen(true)}
                className="hover:text-[#dc0c1c] transition-colors font-semibold text-slate-700"
              >
                Guía de Cuidados Textiles
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Care Guide Modal */}
      {careGuideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-2xl space-y-4 border border-slate-200 text-[#0b0e17]">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h4 className="text-2xl font-display text-[#0b0e17] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#dc0c1c] text-[24px]">local_laundry_service</span>
                <span>Guía de Cuidados Textiles Art2Art</span>
              </h4>
              <button
                onClick={() => setCareGuideModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#dc0c1c] text-[20px] shrink-0">wash</span>
                <p><strong className="text-[#0b0e17]">Lavar al revés:</strong> Dale la vuelta a la prenda antes de ingresarla a la lavadora para proteger el estampado del roce.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-slate-700 text-[20px] shrink-0">ac_unit</span>
                <p><strong className="text-[#0b0e17]">Agua fría:</strong> Lava siempre con agua a temperatura ambiente o fría (máximo 30°C). Evita el agua caliente.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-slate-700 text-[20px] shrink-0">iron</span>
                <p><strong className="text-[#0b0e17]">No planchar directo:</strong> Nunca pongas la plancha sobre el estampado DTF, serigrafía o vinilo. Plancha por el reverso.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#dc0c1c] text-[20px] shrink-0">block</span>
                <p><strong className="text-[#0b0e17]">Cero blanqueadores o lejía:</strong> Usa detergentes suaves y evita secadora a altas temperaturas.</p>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setCareGuideModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#dc0c1c] hover:bg-[#b00a16] text-white font-bold text-xs transition-colors shadow-sm"
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
