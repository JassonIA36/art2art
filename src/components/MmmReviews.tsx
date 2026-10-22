import React from 'react';

export const MmmReviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      author: 'Santiago Morales',
      role: 'Creador de Marca Urbana',
      city: 'Guadalajara de Buga',
      rating: 5,
      date: 'Hace 3 días',
      comment:
        'La nitidez del estampado DTF sobre tela negra superó mis expectativas. Las líneas finas y los degradados quedaron intactos, y la tela de 180g se siente pesada y de calidad.',
    },
    {
      id: 2,
      author: 'Carolina Restrepo',
      role: 'Dotación Empresarial (60 prendas)',
      city: 'Cali, Valle',
      rating: 5,
      date: 'Hace 1 semana',
      comment:
        'Pedimos dotación de polos y camisetas con serigrafía y vinilo reflectivo. Cumplieron exactamente con la fecha prometida y el 20% de descuento por volumen nos ahorró un buen presupuesto.',
    },
    {
      id: 3,
      author: 'David Henao',
      role: 'Colección de Mugs & Hoodies',
      city: 'Envío a Bogotá',
      rating: 5,
      date: 'Hace 2 semanas',
      comment:
        'La asesoría por WhatsApp fue rápida y muy profesional para ajustar el tamaño del diseño en el pecho y espalda. El envío llegó perfectamente empacado y con acabado impecable.',
    },
  ];

  return (
    <section id="opiniones" className="bg-white py-20 border-t border-black/5">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-5 text-center mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1 text-xs sm:text-sm font-medium text-black">
            Opiniones
          </span>

          <h2 className="text-[32px] sm:text-[44px] font-semibold leading-[1.1] tracking-[-0.05em] text-black max-w-[620px]">
            Lo que dicen quienes ya estamparon con nosotros
          </h2>

          <p className="text-[17px] sm:text-[18px] tracking-[-0.025em] text-black/60 max-w-[500px]">
            Marcas independientes, empresas y creadores que confían en la precisión de nuestro taller en Buga.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between rounded-2xl bg-neutral-50/60 p-6 sm:p-7 border border-black/5 hover:border-black/15 transition-all shadow-sm"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-black">
                    {[...Array(rev.rating)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs font-mono text-black/40">{rev.date}</span>
                </div>

                {/* Comment */}
                <p className="text-sm leading-relaxed text-black/80 font-normal">
                  «{rev.comment}»
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-5 mt-6 border-t border-black/5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-black tracking-tight">
                    {rev.author}
                  </h4>
                  <span className="text-xs text-black/50 block">{rev.role}</span>
                </div>
                <span className="inline-flex items-center rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-medium text-black">
                  {rev.city}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
