import React, { useState } from 'react';
import { WORKSHOP_DATA, getWhatsAppLink } from '../data/mockData';

export const WorkshopsSection: React.FC = () => {
  const [showCurriculum, setShowCurriculum] = useState(false);

  const modules = [
    { num: '01', title: 'Diseño, Fotolitos y Preparación', desc: 'Separación de colores, marcos de madera/aluminio y tensado.' },
    { num: '02', title: 'Emulsionado y Grabado UV', desc: 'Tipos de emulsión, cuarto oscuro, tiempos de exposición y revelado con agua.' },
    { num: '03', title: 'Química de Tintas y Colorimetría', desc: 'Plastisol, base agua, aditivos retardantes, tintas ecológicas y acabados.' },
    { num: '04', title: 'Impresión en Pulpo y Termofijado', desc: 'Registro micrométrico multicolor, planchas térmicas y pruebas de lavado.' },
  ];

  return (
    <section className="w-full py-16 sm:py-24 bg-white border-t border-black/10" id="talleres">
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8">
        <div className="bg-black text-white rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Image side */}
          <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[480px]">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              alt="Clase práctica de serigrafía textil en el taller de Art2Art Buga"
              src={WORKSHOP_DATA.imageUrl}
              loading="lazy"
            />
            <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1.5 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-[#ffd60a] animate-ping"></span>
              <span className="text-xs font-medium tracking-wide">Próxima cohorte en curso • Buga</span>
            </div>
          </div>

          {/* Content side */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#ffd60a]">
                  Taller de estampados • Buga
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-[#dc0c1c]/20 text-[#ff6b75] border border-[#dc0c1c]/40 font-semibold">
                  ¡Solo {WORKSHOP_DATA.availableSeats} cupos disponibles!
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em]">{WORKSHOP_DATA.title}</h2>
              <p className="text-white/70 text-base">{WORKSHOP_DATA.subtitle}</p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <p className="text-sm text-white/90 leading-relaxed">{WORKSHOP_DATA.description}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#ffd60a]">
                  <li>✓ Práctico 100%</li>
                  <li>✓ Materiales incluidos</li>
                  <li>✓ Cupos limitados</li>
                </ul>
                <p className="text-xs text-white/60">
                  {WORKSHOP_DATA.duration} · {WORKSHOP_DATA.schedule}
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setShowCurriculum(!showCurriculum)}
                  className="text-xs text-white/70 hover:text-white transition-colors"
                >
                  {showCurriculum ? 'Ocultar temario detallado ▲' : 'Ver módulos y contenido del curso ▼'}
                </button>

                {showCurriculum && (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {modules.map((m) => (
                      <div key={m.num} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                        <span className="text-[#ffd60a] font-bold text-[11px]">Módulo {m.num}</span>
                        <p className="text-white font-medium">{m.title}</p>
                        <p className="text-white/60 text-[11px] leading-tight">{m.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                className="inline-flex items-center gap-2 rounded-full bg-white text-black hover:bg-neutral-200 text-sm font-medium h-11 px-6 transition-all active:scale-95"
                href={getWhatsAppLink(WORKSHOP_DATA.quoteMessage)}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>Inscribirme al Taller</span>
                <span aria-hidden>→</span>
              </a>
              <span className="text-sm text-white/70">Sede Guadalajara de Buga</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
