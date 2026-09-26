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
    <section className="w-full py-space-xl bg-background" id="talleres">
      <div className="max-w-7xl mx-auto px-margin">
        <div className="bg-inverse-surface rounded-xl overflow-hidden text-inverse-on-surface shadow-2xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Image side */}
            <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[460px]">
              <img
                className="w-full h-full object-cover"
                alt="Clase práctica de serigrafía textil en el taller de Art2Art Buga"
                src={WORKSHOP_DATA.imageUrl}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-transparent to-transparent lg:hidden"></div>
              
              {/* Floating Live Cohort Tag */}
              <div className="absolute top-4 left-4 bg-on-surface/85 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/20 shadow">
                <span className="w-2 h-2 rounded-full bg-petal-yellow animate-ping"></span>
                <span className="text-xs font-label-sm text-surface-card tracking-wide">
                  Próxima cohorte en curso • Buga
                </span>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-6 p-space-lg lg:p-space-xl flex flex-col justify-between space-y-space-md">
              <div className="space-y-space-md">
                {/* Badge */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-petal-yellow/20 text-petal-yellow font-label-sm text-label-sm uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px]">school</span>
                    <span>Formación Profesional</span>
                  </div>

                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/20 text-petal-red border border-petal-red/30 font-medium">
                    ¡Solo {WORKSHOP_DATA.availableSeats} cupos disponibles!
                  </span>
                </div>

                <h2 className="font-headline-lg text-headline-lg tracking-tight text-surface-card">
                  {WORKSHOP_DATA.title}
                </h2>

                <p className="font-body-md text-body-md text-surface-container">
                  {WORKSHOP_DATA.subtitle}
                </p>

                {/* Info Card */}
                <div className="p-space-md rounded-lg bg-surface-card/5 border border-white/10 space-y-space-xs">
                  <p className="font-body-md text-body-md text-surface-card leading-relaxed">
                    {WORKSHOP_DATA.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs pt-space-xs">
                    <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-petal-yellow">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>Práctico 100%</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-petal-yellow">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>Materiales incluidos</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-petal-yellow">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>Cupos limitados</span>
                    </div>
                  </div>
                </div>

                {/* Syllabus expandable toggle */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowCurriculum(!showCurriculum)}
                    className="text-xs text-tertiary-fixed-dim hover:text-white flex items-center gap-1 font-label-sm transition-colors"
                  >
                    <span>{showCurriculum ? 'Ocultar temario detallado' : 'Ver módulos y contenido del curso'}</span>
                    <span className="material-symbols-outlined text-[16px]">
                      {showCurriculum ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>

                  {showCurriculum && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs animate-fadeIn">
                      {modules.map((m) => (
                        <div key={m.num} className="p-2.5 rounded-lg bg-surface-card/10 border border-white/5 space-y-0.5">
                          <span className="text-petal-yellow font-bold text-[11px]">Módulo {m.num}</span>
                          <p className="text-white font-medium">{m.title}</p>
                          <p className="text-surface-container text-[11px] leading-tight">{m.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Inscription Action */}
              <div className="pt-space-xs flex flex-wrap items-center gap-space-md">
                <a
                  className="font-label-lg text-label-lg px-space-xl py-space-sm rounded-full bg-primary hover:bg-primary-container text-on-primary transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center gap-space-xs"
                  href={getWhatsAppLink(WORKSHOP_DATA.quoteMessage)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Inscribirme al Taller</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
                <span className="font-body-sm text-body-sm text-surface-container opacity-90 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim">location_on</span>
                  <span>Sede Guadalajara de Buga</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
