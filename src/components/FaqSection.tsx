import React, { useState } from 'react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Cuáles son los tiempos de entrega de los pedidos?',
      a: 'Para pedidos unitarios o muestras en DTF, vinilo o sublimación, el tiempo habitual es de 2 a 4 días hábiles una vez aprobado el arte. Para producciones medianas o grandes en serigrafía (más de 20 a 500 prendas), el tiempo estándar oscila entre 5 y 8 días hábiles. También manejamos servicio express para pedidos urgentes previa consulta de agenda.',
      icon: 'schedule',
    },
    {
      q: '¿Hacen envíos fuera de Guadalajara de Buga?',
      a: '¡Sí, despachamos a todo el país! Hacemos entregas locales directas en Buga y enviamos mediante transportadoras certificadas (Interrapidísimo, Servientrega, Envía) a Cali, Palmira, Tuluá, Buenaventura y cualquier rincón de Colombia. El costo del flete se coordina de manera transparente.',
      icon: 'local_shipping',
    },
    {
      q: '¿En qué formatos y calidad debo enviar mi diseño?',
      a: 'Recomendamos enviar archivos en formato PNG con fondo transparente a 300 DPI, o archivos vectoriales en PDF, Illustrator (.AI) o CorelDraw. Si tu diseño está en JPG de buena resolución, en nuestro taller te ayudamos a optimizarlo y adaptarlo a la técnica elegida para garantizar la máxima nitidez.',
      icon: 'image',
    },
    {
      q: '¿Cuál es el pedido mínimo para estampar?',
      a: '¡No hay mínimo para técnicas digitales! En DTF Direct to Film, Vinilo Textil y Sublimación puedes personalizar desde 1 sola prenda. En Serigrafía tradicional el pedido mínimo sugerido es de 12 unidades para amortizar las matrices y pantallas, ofreciéndote el precio por unidad más competitivo del mercado.',
      icon: 'format_list_numbered',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 sm:py-20 bg-[#f8fafc] text-[#0b0e17] relative overflow-hidden border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-800 shadow-sm">
            <span className="material-symbols-outlined text-[16px] text-[#dc0c1c]">help</span>
            <span>Resolvemos tus Dudas</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-display text-[#0b0e17] tracking-wider">
            Preguntas Frecuentes
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Información clara sobre tiempos, logística, especificaciones técnicas y mínimos de compra.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#dc0c1c]/60 shadow-md'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#dc0c1c]/10 text-[#dc0c1c]'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        {faq.icon}
                      </span>
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-slate-900 tracking-tight">
                      {faq.q}
                    </span>
                  </div>

                  <span
                    className={`material-symbols-outlined text-[24px] text-slate-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#dc0c1c]' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1 animate-fadeIn">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
