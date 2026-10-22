import React from 'react';
import { COMPANY_INFO, getWhatsAppLink } from '../data/mockData';

export const MmmLocation: React.FC = () => {
  return (
    <section id="contacto" className="bg-white py-20 border-t border-black/5">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-5 text-center mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1 text-xs sm:text-sm font-medium text-black">
            Ubicación & Taller
          </span>

          <h2 className="text-[32px] sm:text-[44px] font-semibold leading-[1.1] tracking-[-0.05em] text-black max-w-[620px]">
            Taller de estampados en Guadalajara de Buga
          </h2>

          <p className="text-[17px] sm:text-[18px] tracking-[-0.025em] text-black/60 max-w-[500px]">
            Taller boutique y punto de entrega en el Valle del Cauca. Ven a conocer las telas y acabados en persona.
          </p>
        </div>

        {/* 2 Column Layout: Details & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Details Card */}
          <div className="lg:col-span-5 rounded-2xl bg-neutral-50 p-8 sm:p-10 border border-black/5 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-mono tracking-widest text-[#dc0c1c]">
                  Taller & Atelier Textil
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-black">
                  Art2Art Estampados
                </h3>
                <p className="text-sm text-black/60 leading-relaxed">
                  Más de 10 años vistiendo marcas locales, emprendimientos y empresas con técnicas de alta durabilidad.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-black/10 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-base">📍</span>
                  <div>
                    <span className="font-semibold text-black block">Dirección</span>
                    <span className="text-black/70">{COMPANY_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-base">⏰</span>
                  <div>
                    <span className="font-semibold text-black block">Horario de Atención</span>
                    <span className="text-black/70">{COMPANY_INFO.schedule}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-base">📞</span>
                  <div>
                    <span className="font-semibold text-black block">Teléfono / WhatsApp</span>
                    <span className="text-black/70">{COMPANY_INFO.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-black/10">
              <a
                href={COMPANY_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white text-black hover:bg-neutral-100 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <span>Abrir en Google Maps</span>
              </a>

              <a
                href={getWhatsAppLink('Hola Art2Art, quiero pasar por el taller a ver muestras.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black text-white hover:bg-neutral-800 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <span>Agendar visita</span>
              </a>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-black/10 min-h-[380px] shadow-sm relative bg-neutral-100">
            <iframe
              title="Ubicación Art2Art Buga"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.882412204735!2d-76.30560932412803!3d3.901594896072124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e39c4e2ef3f5a1f%3A0xb35a09ad7f5f9923!2sCra.%209a%20%2312-53%2C%20Buga%2C%20Valle%20del%20Cauca!5e0!3m2!1ses!2sco!4v1715000000000!5m2!1ses!2sco"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
