import React, { useState } from 'react';
import { COMPANY_INFO, getWhatsAppLink } from '../data/mockData';

export const Footer: React.FC = () => {
  const [careGuideModalOpen, setCareGuideModalOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-surface-container-low text-on-surface mt-space-xl border-t border-surface-border/50">
        <div className="max-w-7xl mx-auto px-margin py-space-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl">
            {/* Brand column */}
            <div className="space-y-space-sm">
              <div className="flex items-center gap-space-xs">
                <div className="w-3 h-3 rounded-full bg-petal-cyan"></div>
                <div className="w-3 h-3 rounded-full bg-petal-orange"></div>
                <div className="w-3 h-3 rounded-full bg-petal-yellow"></div>
                <div className="w-3 h-3 rounded-full bg-petal-red"></div>
                <span className="font-headline-sm text-headline-sm ml-space-xs text-on-surface">
                  Art2Art
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Más de 10 años transformando ideas en realidad textil en Guadalajara de Buga, Valle del Cauca. Calidad garantizada, precisión técnica y pasión por el estampado artesanal e industrial.
              </p>
              <div className="flex items-center gap-space-sm pt-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                  <span>Sede Buga, Colombia</span>
                </span>
              </div>
            </div>

            {/* Techniques column */}
            <div className="space-y-space-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Técnicas</h3>
              <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li>
                  <a
                    className="hover:text-primary transition-colors flex items-center gap-space-xs"
                    href="#nuestros-servicios-de-estampado"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-petal-yellow"></span>
                    <span>Serigrafía Textil</span>
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-primary transition-colors flex items-center gap-space-xs"
                    href="#nuestros-servicios-de-estampado"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-petal-red"></span>
                    <span>Sublimación HD</span>
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-primary transition-colors flex items-center gap-space-xs"
                    href="#nuestros-servicios-de-estampado"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-petal-orange"></span>
                    <span>Vinilo Textil & Reflectivo</span>
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-primary transition-colors flex items-center gap-space-xs"
                    href="#nuestros-servicios-de-estampado"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-petal-cyan"></span>
                    <span>DTF Directo a Film</span>
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-primary transition-colors flex items-center gap-space-xs"
                    href="#nosotros"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    <span>Camisetas al por mayor</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Direct contact column */}
            <div className="space-y-space-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Contacto Directo</h3>
              <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-[20px] text-primary shrink-0 mt-0.5">
                    location_on
                  </span>
                  <span>{COMPANY_INFO.address}</span>
                </li>
                <li className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[20px] text-whatsapp-green shrink-0">
                    chat
                  </span>
                  <a
                    className="hover:text-whatsapp-dark hover:underline transition-colors"
                    href={getWhatsAppLink('Hola Art2Art, quiero hacer una consulta.')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp: {COMPANY_INFO.whatsappDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[20px] text-tertiary shrink-0">
                    call
                  </span>
                  <a
                    className="hover:text-tertiary hover:underline transition-colors"
                    href={`tel:+57${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                  >
                    Teléfono: {COMPANY_INFO.phone}
                  </a>
                </li>
                <li className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[20px] text-secondary shrink-0">
                    schedule
                  </span>
                  <span>{COMPANY_INFO.schedule}</span>
                </li>
              </ul>
            </div>

            {/* Community column */}
            <div className="space-y-space-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Comunidad Textil</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Sigue nuestro taller en tiempo real, procesos de producción y cursos presenciales de serigrafía.
              </p>
              <div className="flex items-center gap-space-xs pt-space-xs">
                <a
                  className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all shadow-sm hover:scale-[1.02]"
                  href={COMPANY_INFO.instagramUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[18px] text-petal-red">photo_camera</span>
                  <span>Instagram</span>
                </a>
                <a
                  className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all shadow-sm hover:scale-[1.02]"
                  href={COMPANY_INFO.facebookUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[18px] text-tertiary">groups</span>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-space-xl pt-space-md border-t border-surface-border/40 flex flex-col md:flex-row items-center justify-between gap-space-md font-body-sm text-body-sm text-on-secondary-container">
            <p>© 2026 Art2Art Estampados. Todos los derechos reservados. Guadalajara de Buga, Valle del Cauca.</p>
            <div className="flex items-center gap-space-md font-label-sm text-label-sm">
              <a
                className="hover:text-on-surface transition-colors"
                href="#inicio"
              >
                Términos & Garantía
              </a>
              <span className="text-secondary/40">•</span>
              <a
                className="hover:text-on-surface transition-colors"
                href="#inicio"
              >
                Política de Privacidad
              </a>
              <span className="text-secondary/40">•</span>
              <button
                type="button"
                onClick={() => setCareGuideModalOpen(true)}
                className="hover:text-primary transition-colors font-semibold"
              >
                Guía de Cuidados Textiles
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Care Guide Modal */}
      {careGuideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-card max-w-lg w-full rounded-2xl p-6 shadow-2xl space-y-4 border border-surface-border">
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">local_laundry_service</span>
                <span>Guía de Cuidados Textiles Art2Art</span>
              </h4>
              <button
                onClick={() => setCareGuideModalOpen(false)}
                className="p-1 rounded-full text-secondary hover:text-on-surface hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 font-body-sm text-body-sm text-secondary">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-petal-yellow text-[20px] shrink-0">wash</span>
                <p><strong>Lavar al revés:</strong> Dale la vuelta a la prenda antes de ingresarla a la lavadora para proteger el estampado del roce.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-petal-cyan text-[20px] shrink-0">ac_unit</span>
                <p><strong>Agua fría:</strong> Lava siempre con agua a temperatura ambiente o fría (máximo 30°C). Evita el agua caliente.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-petal-orange text-[20px] shrink-0">iron</span>
                <p><strong>No planchar directo:</strong> Nunca pongas la plancha sobre el estampado DTF, serigrafía o vinilo. Plancha por el reverso o usa papel siliconado.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-petal-red text-[20px] shrink-0">block</span>
                <p><strong>Cero blanqueadores o lejía:</strong> Usa detergentes suaves y evita secadora a altas temperaturas.</p>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setCareGuideModalOpen(false)}
                className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md"
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
