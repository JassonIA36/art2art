import React, { useState } from 'react';
import { getWhatsAppLink } from '../data/mockData';

export const MmmFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Cuáles son los tiempos de entrega de los pedidos?',
      a: 'Para pedidos unitarios o muestras en DTF, vinilo o sublimación, el tiempo habitual es de 2 a 4 días hábiles una vez aprobado el arte. Para producciones medianas o grandes en serigrafía (más de 20 a 500 prendas), el tiempo estándar oscila entre 5 y 8 días hábiles. También manejamos servicio express para pedidos urgentes.',
    },
    {
      q: '¿Hacen envíos fuera de Guadalajara de Buga?',
      a: '¡Sí, despachamos a todo el país! Hacemos entregas locales en Buga y enviamos mediante transportadoras certificadas (Interrapidísimo, Servientrega, Envía) a Cali, Palmira, Tuluá, Medellín, Bogotá y cualquier rincón de Colombia.',
    },
    {
      q: '¿En qué formato y calidad debo enviar mi diseño?',
      a: 'Recomendamos enviar archivos en formato PNG con fondo transparente a 300 DPI, o archivos vectoriales en PDF, Illustrator (.AI) o SVG. Si tu diseño está en JPG de buena resolución, en nuestro taller te ayudamos a optimizarlo y adaptarlo sin costo adicional.',
    },
    {
      q: '¿Cuál es el pedido mínimo para estampar?',
      a: '¡No hay mínimo para técnicas digitales! En DTF Direct to Film, Vinilo Textil y Sublimación puedes estampar desde 1 sola prenda. En Serigrafía tradicional el pedido mínimo sugerido es de 12 unidades para amortizar las matrices y ofrecerte el precio unitario más bajo.',
    },
    {
      q: '¿Hay descuentos por volumen?',
      a: 'Sí. Ofrecemos descuentos desde 6 prendas del mismo tipo y tarifas especiales para tirajes de más de 50 unidades. Escríbenos por WhatsApp con tu diseño y te cotizamos al instante.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section id="faq" className="bg-white py-20 border-t border-black/5">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto flex w-full max-w-[840px] flex-col px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-5 text-center mb-12">
          <span data-edit="faq_etiqueta" className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1 text-xs sm:text-sm font-medium text-black">
            Preguntas Frecuentes
          </span>

          <h2 data-edit="faq_titulo" className="text-[32px] sm:text-[42px] font-semibold leading-[1.1] tracking-[-0.05em] text-black">
            Resolvemos tus dudas sobre estampados
          </h2>

          <p data-edit="faq_descripcion" className="text-[17px] sm:text-[18px] tracking-[-0.025em] text-black/60 max-w-[500px]">
            Información clara sobre tiempos, logística, archivos técnicos y mínimos de compra.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col divide-y divide-black/10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.q} className="py-5">
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between text-left gap-4 group focus:outline-none"
                >
                  <span data-edit={`faq_${index + 1}_pregunta`} className="text-base sm:text-lg font-medium text-black tracking-tight group-hover:opacity-75 transition-opacity">
                    {faq.q}
                  </span>
                  <div
                    className={`size-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-black text-white rotate-45' : 'bg-black/5 text-black'
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-3 pr-8 text-sm sm:text-base leading-relaxed text-black/60 animate-in fade-in duration-200">
                    <p data-edit={`faq_${index + 1}_respuesta`}>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom prompt */}
        <div className="mt-12 rounded-xl bg-neutral-50 p-6 border border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 data-edit="faq_banner_titulo" className="text-sm font-semibold text-black">
              ¿Tienes otra pregunta sobre tu diseño?
            </h4>
            <p data-edit="faq_banner_texto" className="text-xs text-black/60">
              Escríbenos en WhatsApp y te respondemos en pocos minutos.
            </p>
          </div>
          <a
            href={getWhatsAppLink('Hola Art2Art, tengo una duda antes de hacer mi pedido.')}
            data-edit-href="faq_boton_whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-black text-white hover:bg-neutral-800 text-xs uppercase tracking-wider font-semibold px-5 py-2.5 transition-all shadow-sm shrink-0"
          >
            <span data-edit="faq_boton_whatsapp_texto">Preguntar en WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
