import React from 'react';

export const WhatWeDoSection: React.FC = () => {
  return (
    <section id="que-hacemos" className="w-full py-20 sm:py-28 bg-[#0b0e17] text-white border-b border-[#25293d]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large Lead Headline in eXelentex style */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-tight max-w-5xl tracking-tight mb-16 sm:mb-20">
          Desarrollamos soluciones textiles de vanguardia para transformar la identidad de tu marca a través del{' '}
          <span className="text-[#dc0c1c] font-normal">estampado de alta definición</span>.
        </h2>

        {/* Description Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-8 border-t border-[#25293d]/50">
          {/* Left Title Box: Small uppercase label with slash */}
          <div className="lg:col-span-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8691a8] font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#dc0c1c]"></span>
              <span>Qué hacemos</span>
            </span>
          </div>

          {/* Right Text Box: Important text block */}
          <div className="lg:col-span-9 space-y-6">
            <p className="text-lg sm:text-2xl text-[#f3f4f6] font-light leading-relaxed">
              Art2Art es un taller boutique textil en Guadalajara de Buga especializado en DTF (Direct to Film) de última generación, Serigrafía artesanal e industrial, Sublimación de rango fotográfico y Vinilo térmico de precisión.
            </p>

            <p className="text-sm sm:text-base text-[#8691a8] leading-relaxed">
              Nuestro dominio técnico de los pigmentos, el curado térmico y las fibras de algodón y poliéster nos otorga una efectividad insuperable en la personalización textil. Atendemos marcas de streetwear, uniformes empresariales, dotaciones escolares y proyectos de autor con entregas locales y despachos a todo el país.
            </p>

            {/* Micro Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[#25293d]/40">
              <div>
                <span className="text-3xl sm:text-4xl font-display text-white block">+10</span>
                <span className="text-xs uppercase tracking-wider text-[#8691a8]">Años de Experiencia</span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-display text-[#dc0c1c] block">300 DPI</span>
                <span className="text-xs uppercase tracking-wider text-[#8691a8]">Resolución DTF</span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-display text-white block">100%</span>
                <span className="text-xs uppercase tracking-wider text-[#8691a8]">Fijación al Lavado</span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-display text-[#25D366] block">24-48H</span>
                <span className="text-xs uppercase tracking-wider text-[#8691a8]">Tiempos Express</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
