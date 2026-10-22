import React from 'react';
import { getWhatsAppLink } from '../data/mockData';

export const MmmHowItWorks: React.FC = () => {
  return (
    <section id="como-funciona" className="bg-white pt-20 pb-20 border-t border-black/5">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-5 text-center mb-16">
          <span data-edit="como_etiqueta" className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1 text-xs sm:text-sm font-medium text-black">
            Cómo funciona
          </span>

          <h2 data-edit="como_titulo" className="text-[32px] sm:text-[44px] font-semibold leading-[1.1] tracking-[-0.05em] text-black max-w-[620px]">
            Cómo crear tus prendas personalizadas
          </h2>

          <p data-edit="como_descripcion" className="text-[17px] sm:text-[18px] tracking-[-0.025em] text-black/60 max-w-[500px]">
            Elige tu prenda base, personaliza tu arte con nuestro estudio y recibe cotización con descuento instantáneo por WhatsApp.
          </p>
        </div>

        {/* 3 Step Interactive Grid (Exact mmmmenu layout) */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-3 gap-8">
          {/* STEP 1 */}
          <div className="flex flex-col gap-6">
            <span data-edit="como_paso_1_etiqueta" className="inline-flex items-center rounded-full bg-black/5 px-3 py-0.5 text-xs font-semibold text-black w-fit">
              Paso 1
            </span>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                </svg>
                <h3 data-edit="como_paso_1_titulo" className="text-base font-semibold text-black">
                  Elige tu prenda y base
                </h3>
              </div>
              <p data-edit="como_paso_1_texto" className="text-sm leading-relaxed text-black/60">
                Selecciona entre camisetas 100% algodón, hoodies pesados, siluetas oversize, gorras o tote bags.
              </p>
            </div>

            {/* Simulated UI Card 1 (mmmmenu style preview) */}
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl p-6 min-h-[300px] bg-gradient-to-br from-pink-100 via-rose-50 to-orange-100 ring-1 ring-black/5 shadow-sm">
              <div className="relative z-20 flex w-full max-w-[240px] flex-col rounded-xl bg-white p-4 shadow-[0px_4px_24px_-6px_rgba(0,0,0,0.18)] ring-1 ring-black/10">
                <div className="flex items-center justify-between pb-2 border-b border-black/10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-black">
                    Prendas Base
                  </span>
                  <span className="text-[10px] font-mono text-black/50">3 opciones</span>
                </div>

                <div className="flex flex-col divide-y divide-black/5">
                  <div className="flex items-center gap-2 py-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-black/30"></span>
                    <div className="flex flex-1 items-center justify-between">
                      <span data-edit="como_prenda_1_nombre" className="truncate text-xs font-semibold text-black">
                        Camiseta 100% Algodón
                      </span>
                      <span data-edit="como_prenda_1_precio" className="text-xs font-mono text-black/70">$18k</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 py-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dc0c1c]"></span>
                    <div className="flex flex-1 items-center justify-between">
                      <span data-edit="como_prenda_2_nombre" className="truncate text-xs font-semibold text-black">
                        Hoodie Perchado 280g
                      </span>
                      <span data-edit="como_prenda_2_precio" className="text-xs font-mono text-black/70">$48k</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 py-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-black/30"></span>
                    <div className="flex flex-1 items-center justify-between">
                      <span data-edit="como_prenda_3_nombre" className="truncate text-xs font-semibold text-black">
                        Gorra Trucker Dril
                      </span>
                      <span data-edit="como_prenda_3_precio" className="text-xs font-mono text-black/70">$12k</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="flex flex-col gap-6">
            <span data-edit="como_paso_2_etiqueta" className="inline-flex items-center rounded-full bg-black/5 px-3 py-0.5 text-xs font-semibold text-black w-fit">
              Paso 2
            </span>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="m13 7-6 6" />
                  <path d="m17 11-6 6" />
                  <path d="m19 13-4 4" />
                  <circle cx="18" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                </svg>
                <h3 data-edit="como_paso_2_titulo" className="text-base font-semibold text-black">
                  Personaliza diseño y técnica
                </h3>
              </div>
              <p data-edit="como_paso_2_texto" className="text-sm leading-relaxed text-black/60">
                Sube tu logo o arte, ajusta color y escala en vivo, y elige entre DTF, serigrafía o vinilo.
              </p>
            </div>

            {/* Simulated UI Card 2 (mmmmenu style preview) */}
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl p-6 min-h-[300px] bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 ring-1 ring-black/5 shadow-sm">
              <div className="relative z-20 flex w-full max-w-[250px] flex-col rounded-xl bg-white p-4 shadow-[0px_4px_24px_-6px_rgba(0,0,0,0.18)] ring-1 ring-black/10 divide-y divide-black/10">
                <div className="flex items-center justify-between pb-2">
                  <span className="text-xs font-semibold text-black">LOGOTIPO / ARTE</span>
                  <span className="text-[11px] rounded bg-emerald-50 text-emerald-700 px-2 py-0.5 font-medium">
                    Vector listo
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-xs font-semibold text-black">COLOR BASE</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#18181B] ring-2 ring-black"></span>
                    <span className="w-5 h-5 rounded-full bg-[#F5F5F0] ring-1 ring-black/15"></span>
                    <span className="w-5 h-5 rounded-full bg-[#DC0C1C]"></span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-xs font-semibold text-black">TÉCNICA</span>
                  <span className="text-xs font-bold rounded-full bg-black text-white px-2.5 py-0.5">
                    DTF Full Color
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-semibold text-black">ESCALA / ÁREA</span>
                  <div className="flex items-center gap-2 rounded-full bg-black/5 px-2 py-0.5 text-xs font-mono font-medium">
                    <span>-</span>
                    <span>85%</span>
                    <span>+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="flex flex-col gap-6">
            <span data-edit="como_paso_3_etiqueta" className="inline-flex items-center rounded-full bg-black/5 px-3 py-0.5 text-xs font-semibold text-black w-fit">
              Paso 3
            </span>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <h3 data-edit="como_paso_3_titulo" className="text-base font-semibold text-black">
                  Cotiza en WhatsApp & Recibe
                </h3>
              </div>
              <p data-edit="como_paso_3_texto" className="text-sm leading-relaxed text-black/60">
                Aplica hasta 20% de descuento por volumen y recibe directo en tu puerta en Buga o cualquier ciudad.
              </p>
            </div>

            {/* Simulated UI Card 3 (mmmmenu style preview) */}
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl p-6 min-h-[300px] bg-gradient-to-br from-emerald-100 via-teal-50 to-green-100 ring-1 ring-black/5 shadow-sm">
              <div className="relative z-20 flex w-full max-w-[240px] flex-col items-center gap-3 rounded-xl bg-white p-5 shadow-[0px_4px_24px_-6px_rgba(0,0,0,0.18)] ring-1 ring-black/10 text-center">
                <span className="text-xs font-medium text-black/60">Listo para producir</span>

                <div className="flex items-center justify-center gap-2">
                  <span data-edit="como_precio_final" className="text-2xl font-bold text-black tracking-tight">$24.000</span>
                  <span data-edit="como_precio_tachado" className="text-xs text-black/40 line-through">$30.000</span>
                </div>

                <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2.5 py-0.5">
                  -20% Descuento aplicado
                </span>

                <a
                  href={getWhatsAppLink('Hola Art2Art, quiero hacer un pedido con descuento por volumen.')}
                  data-edit-href="como_boton_whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 transition-colors py-2 px-3 text-xs font-medium text-white shadow-sm mt-1"
                >
                  <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
                  <span>Cotizar por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Big CTA underneath steps */}
        <div className="mt-14 flex justify-center">
          <a
            href="#personalizador"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-black text-white hover:bg-neutral-800 h-12 px-8 text-base font-medium transition-all shadow-sm active:scale-95"
          >
            <span data-edit="como_boton_personalizador">Abrir personalizador en vivo</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
