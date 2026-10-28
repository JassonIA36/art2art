import React from 'react';
import { SERVICE_PAGES } from '../data/servicePages';

// Enlaza la portada con las páginas por servicio: es lo que las hace visibles para la gente y para Google.
const primeraFrase = (texto: string) => texto.split('. ')[0].replace(/\.$/, '') + '.';

export const ServiciosSection: React.FC = () => {
  return (
    <section id="servicios" className="bg-neutral-50 py-20 border-t border-black/5 scroll-mt-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col px-6 sm:px-8">
        <div className="flex flex-col items-center gap-5 text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1 text-xs sm:text-sm font-medium text-black">
            Servicios
          </span>
          <h2 className="text-[32px] sm:text-[44px] font-semibold leading-[1.1] tracking-[-0.05em] text-black max-w-[680px]">
            Servicios de estampado en Buga
          </h2>
          <p className="text-[17px] sm:text-[18px] tracking-[-0.025em] text-black/60 max-w-[560px]">
            Elige la técnica que necesitas y mira cómo funciona, los tiempos de entrega y las preguntas frecuentes.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SERVICE_PAGES.map((p) => (
            <li key={p.slug}>
              <a
                href={`/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white transition-colors hover:border-black/30"
              >
                <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-[#fbe9ec] via-white to-[#eef3fb] p-6">
                  <img
                    src={p.image.src}
                    alt={p.image.alt}
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-auto max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-black">{p.navLabel} en Buga</h3>
                  <p className="text-sm leading-relaxed text-black/70">{primeraFrase(p.lead)}</p>
                  <span className="mt-auto pt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-black">
                    Ver servicio
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none">→</span>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
