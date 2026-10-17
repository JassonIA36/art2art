import React, { useState } from 'react';
import { COMPANY_INFO, getWhatsAppLink } from '../data/mockData';

export const LocationSection: React.FC = () => {
  const [useInteractiveMap, setUseInteractiveMap] = useState(false);

  return (
    <section className="w-full py-16 sm:py-24 bg-white text-[#0b0e17] border-t border-slate-200" id="ubicacion">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-800">
              <span className="w-2 h-2 rounded-full bg-[#dc0c1c]"></span>
              <span>Visítanos en Guadalajara de Buga</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display text-[#0b0e17] tracking-wider">
              Nuestra Ubicación
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
              Encuéntranos en pleno centro de Buga. Atendemos solicitudes presenciales y realizamos despachos a todo el Valle del Cauca y Colombia.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => setUseInteractiveMap(!useInteractiveMap)}
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px] text-[#dc0c1c]">
                {useInteractiveMap ? 'image' : 'layers'}
              </span>
              <span>{useInteractiveMap ? 'Ver foto de referencia' : 'Ver mapa interactivo'}</span>
            </button>

            <a
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 hover:border-[#dc0c1c] transition-colors shadow-sm"
              href={COMPANY_INFO.mapsUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px] text-[#dc0c1c]">open_in_new</span>
              <span>Abrir en Google Maps</span>
            </a>
          </div>
        </div>

        {/* Map & Contact Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Contact Details Left */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#dc0c1c]/10 text-[#dc0c1c] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">location_on</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Dirección del Taller</p>
                  <p className="text-sm text-slate-600 mt-0.5">{COMPANY_INFO.address}</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">chat</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">WhatsApp Oficial</p>
                  <a
                    className="text-sm text-[#25D366] font-semibold hover:underline block mt-0.5"
                    href={getWhatsAppLink('Hola Art2Art, deseo consultar sobre su taller en Buga.')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {COMPANY_INFO.whatsappDisplay}
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Respuesta rápida en horario laboral
                  </p>
                </div>
              </div>

              {/* Phone Line */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0b0e17] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">call</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Línea Telefónica</p>
                  <a
                    className="text-sm text-slate-700 font-semibold hover:underline block mt-0.5"
                    href={`tel:+57${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#dc0c1c]/10 text-[#dc0c1c] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">schedule</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Horario de Atención</p>
                  <p className="text-sm text-slate-600 mt-0.5">{COMPANY_INFO.schedule}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Nuestras Redes Oficiales</h4>
              <p className="text-xs text-slate-600">
                Mira fotos de producciones reales, historias y novedades:
              </p>
              <div className="flex items-center gap-2 pt-1">
                <a
                  className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-semibold text-center flex items-center justify-center gap-1.5 border border-slate-200 hover:border-[#dc0c1c] transition-all shadow-sm"
                  href={COMPANY_INFO.instagramUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#dc0c1c]">photo_camera</span>
                  <span>Instagram</span>
                </a>
                <a
                  className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-semibold text-center flex items-center justify-center gap-1.5 border border-slate-200 hover:border-[#dc0c1c] transition-all shadow-sm"
                  href={COMPANY_INFO.facebookUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#0b0e17]">groups</span>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Styled Map Right */}
          <div className="lg:col-span-7 h-[380px] lg:h-auto min-h-[380px] rounded-2xl overflow-hidden shadow-sm relative border border-slate-200 bg-slate-100">
            {useInteractiveMap ? (
              <iframe
                title="Ubicación Art2Art Estampados Buga"
                src="https://maps.google.com/maps?q=Cra+9A+%2312-53+Guadalajara+de+Buga+Valle+del+Cauca&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 min-h-[380px]"
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
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-md flex items-center gap-2 border border-slate-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dc0c1c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#dc0c1c]"></span>
              </span>
              <span className="text-xs font-bold text-slate-900">
                Art2Art Estampados • Guadalajara de Buga
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
