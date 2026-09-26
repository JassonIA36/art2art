import React, { useState } from 'react';
import { COMPANY_INFO, getWhatsAppLink } from '../data/mockData';

export const LocationSection: React.FC = () => {
  const [useInteractiveMap, setUseInteractiveMap] = useState(false);

  return (
    <section className="w-full py-space-xl bg-background" id="ubicacion">
      <div className="max-w-7xl mx-auto px-margin space-y-space-lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="space-y-space-xs">
            <div className="inline-flex items-center gap-space-xs font-label-sm text-label-sm uppercase tracking-wider text-tertiary">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span>Visítanos en Guadalajara de Buga</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Nuestra Ubicación
            </h2>
            <p className="font-body-md text-body-md text-secondary">
              Encuéntranos en pleno corazón de Buga. Atendemos solicitudes presenciales y envíos a todo el departamento.
            </p>
          </div>

          <div className="flex items-center gap-space-sm flex-wrap">
            <button
              type="button"
              onClick={() => setUseInteractiveMap(!useInteractiveMap)}
              className="inline-flex items-center gap-space-xs font-label-md text-label-md px-space-md py-2 rounded-full bg-surface-card hover:bg-surface-bright text-on-surface border border-surface-border transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">
                {useInteractiveMap ? 'image' : 'layers'}
              </span>
              <span>{useInteractiveMap ? 'Ver mapa de referencia' : 'Ver mapa interactivo'}</span>
            </button>

            <a
              className="inline-flex items-center gap-space-xs font-label-md text-label-md px-space-md py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors shadow-sm"
              href={COMPANY_INFO.mapsUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              <span>Abrir en Google Maps</span>
            </a>
          </div>
        </div>

        {/* Map & Contact Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          {/* Contact Details Left */}
          <div className="lg:col-span-5 bg-surface-card p-space-lg rounded-xl shadow-sm border border-surface-border/60 flex flex-col justify-between space-y-space-lg">
            <div className="space-y-space-md">
              {/* Address */}
              <div className="flex items-start gap-space-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">location_on</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">Dirección Taller</p>
                  <p className="font-body-md text-body-md text-secondary">{COMPANY_INFO.address}</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-space-sm">
                <div className="w-10 h-10 rounded-full bg-whatsapp-green/10 text-whatsapp-green flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">WhatsApp Oficial</p>
                  <a
                    className="font-body-md text-body-md text-whatsapp-dark font-medium hover:underline block"
                    href={getWhatsAppLink('Hola Art2Art, me gustaría consultar información sobre su taller en Buga.')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {COMPANY_INFO.whatsappDisplay}
                  </a>
                  <p className="font-body-sm text-body-sm text-secondary">
                    Respuesta inmediata en horario comercial
                  </p>
                </div>
              </div>

              {/* Phone Line */}
              <div className="flex items-start gap-space-sm">
                <div className="w-10 h-10 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">call</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">Línea Telefónica</p>
                  <a
                    className="font-body-md text-body-md text-tertiary font-medium hover:underline block"
                    href={`tel:+57${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex items-start gap-space-sm">
                <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">schedule</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">Horario de Atención</p>
                  <p className="font-body-md text-body-md text-secondary">{COMPANY_INFO.schedule}</p>
                </div>
              </div>
            </div>

            {/* Social Links Module */}
            <div className="pt-space-md bg-surface-container-low p-space-md rounded-lg space-y-space-xs border border-surface-border/40">
              <h4 className="font-label-md text-label-md text-on-surface">Nuestras Redes Sociales</h4>
              <p className="font-body-sm text-body-sm text-secondary">
                Descubre nuevos lanzamientos, muestras y tutoriales:
              </p>
              <div className="flex items-center gap-space-xs pt-1">
                <a
                  className="flex-1 py-2 px-space-sm rounded-full bg-surface-card hover:bg-surface-bright text-on-surface font-label-sm text-label-sm text-center shadow-sm flex items-center justify-center gap-1 border border-surface-border/50 hover:border-primary/40 transition-all hover:scale-[1.02]"
                  href={COMPANY_INFO.instagramUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[16px] text-petal-red">photo_camera</span>
                  <span>Instagram</span>
                </a>
                <a
                  className="flex-1 py-2 px-space-sm rounded-full bg-surface-card hover:bg-surface-bright text-on-surface font-label-sm text-label-sm text-center shadow-sm flex items-center justify-center gap-1 border border-surface-border/50 hover:border-tertiary/40 transition-all hover:scale-[1.02]"
                  href={COMPANY_INFO.facebookUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[16px] text-tertiary">groups</span>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Styled Map Right */}
          <div className="lg:col-span-7 h-[380px] lg:h-auto min-h-[360px] rounded-xl overflow-hidden shadow-sm relative border border-surface-border/60">
            {useInteractiveMap ? (
              <iframe
                title="Ubicación Art2Art Estampados Buga"
                src="https://maps.google.com/maps?q=Cra+9A+%2312-53+Guadalajara+de+Buga+Valle+del+Cauca&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 min-h-[360px]"
                loading="lazy"
              ></iframe>
            ) : (
              <div
                className="w-full h-full bg-cover bg-center transition-all duration-300"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8Kbnj-VJlznYur0EU-iDKOO6Laa2LSEp39l23KaM5MzOV1I_ziCDMEw1_1Qerb4qoeDpsiVefcpLD_wdb2rre95sXotNAqQbgLpiHAv6VD6c0mnIjREs9aN9UixPU_u6lK6V8B4aMUVHrTOgi2CfyeBmB3N9a2XvD5OqPuy3h95RfJzdomrS-wTnTe5DHdWPRjDffIoxMYVW_8II_rvMQvvOCUxq8Eoq8GEloCCej_JsYCK5sFZV0')`,
                }}
              ></div>
            )}

            {/* Map Overlay Label */}
            <div className="absolute bottom-4 left-4 bg-surface-card/95 backdrop-blur-md px-space-md py-space-xs rounded-full shadow-lg flex items-center gap-space-xs border border-white/60">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="font-label-md text-label-md text-on-surface">
                Art2Art Estampados • Buga
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
