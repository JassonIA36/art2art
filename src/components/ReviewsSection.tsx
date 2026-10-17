import React from 'react';

export const ReviewsSection: React.FC = () => {
  const reviewSlots = [
    {
      id: 1,
      badge: 'Cliente Verificado • Pedido Textil',
      city: 'Guadalajara de Buga',
      rating: 5,
      date: 'Reciente',
      quotePlaceholder: '«Excelente definición en el estampado DTF, los colores quedaron exactamente como en el archivo y la tela de la camiseta es de muy buen gramaje.»',
      note: 'Espacio para reseña real de cliente (Google Maps / WhatsApp)',
    },
    {
      id: 2,
      badge: 'Cliente Verificado • Tiraje Mayorista',
      city: 'Valle del Cauca',
      rating: 5,
      date: 'Reciente',
      quotePlaceholder: '«Mandamos a estampar la dotación completa de nuestro equipo. Cumplieron con el tiempo acordado y el descuento por volumen valió totalmente la pena.»',
      note: 'Espacio para reseña real de cliente (Google Maps / WhatsApp)',
    },
    {
      id: 3,
      badge: 'Cliente Verificado • Personalización Unitaria',
      city: 'Envío Nacional',
      rating: 5,
      date: 'Reciente',
      quotePlaceholder: '«La asesoría por WhatsApp fue rápida y clara para revisar el tamaño del diseño antes de imprimir. Muy recomendado el taller Art2Art.»',
      note: 'Espacio para reseña real de cliente (Google Maps / WhatsApp)',
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-800">
            <span className="material-symbols-outlined text-[16px] text-[#dc0c1c]">star</span>
            <span>Experiencias Reales en Taller</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-display text-[#0b0e17] tracking-wider">
            Opiniones de Nuestros Clientes
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            La confianza de marcas, emprendedores y clientes en Buga y toda Colombia respalda cada trabajo de estampado.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewSlots.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#dc0c1c]/50 flex flex-col justify-between shadow-sm relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#dc0c1c]">
                    {[...Array(item.rating)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[20px] fill">
                        star
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">{item.date}</span>
                </div>

                {/* Quote */}
                <p className="text-sm text-slate-700 italic leading-relaxed mb-4">
                  {item.quotePlaceholder}
                </p>
              </div>

              {/* Author / Placeholder Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
                    <span className="text-xs font-semibold text-slate-900">
                      {item.badge}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 block mt-0.5">
                    {item.city}
                  </span>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-100 text-[#dc0c1c] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
              </div>

              {/* Developer / Client placeholder indicator */}
              <div className="mt-3 py-1 px-2.5 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#dc0c1c]">info</span>
                <span className="truncate">{item.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
