import React from 'react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Elige tu Prenda y Color',
      description: 'Selecciona entre camisetas 100% algodón, hoodies perchados, siluetas oversize o gorras con una amplia paleta de tonos.',
      icon: 'checkroom',
      color: 'border-[#e6197e] text-[#e6197e]',
      badgeBg: 'bg-[#e6197e]/10 text-[#e6197e]',
    },
    {
      number: '02',
      title: 'Sube tu Arte y Posición',
      description: 'Carga tu logo o ilustración. Define si lo quieres en el pecho, espalda o ambos lados con controles interactivos de tamaño.',
      icon: 'upload_file',
      color: 'border-[#00b4d8] text-[#00b4d8]',
      badgeBg: 'bg-[#00b4d8]/10 text-[#00b4d8]',
    },
    {
      number: '03',
      title: 'Revisión Técnica y Descuento',
      description: 'Obtén precio en vivo con descuentos de hasta el 20% por volumen. Optimizamos tus vectores y colores sin costo extra.',
      icon: 'auto_fix_high',
      color: 'border-[#ffd60a] text-[#ffd60a]',
      badgeBg: 'bg-[#ffd60a]/10 text-[#ffd60a]',
    },
    {
      number: '04',
      title: 'Estampado y Entrega Rápida',
      description: 'Producimos con tintas de alta duración. Recoge directamente en nuestro taller en Buga o recibe a domicilio en todo el país.',
      icon: 'local_shipping',
      color: 'border-[#25D366] text-[#25D366]',
      badgeBg: 'bg-[#25D366]/10 text-[#25D366]',
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 bg-white text-[#0b0e17] relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-800">
            <span className="w-2 h-2 rounded-full bg-[#dc0c1c] animate-pulse"></span>
            <span>Paso a Paso Transparente</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-display text-[#0b0e17] tracking-wider">
            ¿Cómo Funciona tu Pedido?
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Del archivo digital a la prenda real en 4 pasos sencillos con asesoría directa en cada etapa.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#dc0c1c]/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group shadow-sm hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-2xl font-display px-3 py-1 rounded-lg ${step.badgeBg} font-bold`}>
                    {step.number}
                  </span>
                  <div className={`w-12 h-12 rounded-xl bg-slate-50 border ${step.color} border-opacity-30 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-[26px]">
                      {step.icon}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-display text-[#0b0e17] tracking-wide mb-2 group-hover:text-[#dc0c1c] transition-colors">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500">
                <span className="material-symbols-outlined text-[16px] text-[#25D366]">verified</span>
                <span>Garantía de taller Art2Art</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
