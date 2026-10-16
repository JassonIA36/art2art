import React from 'react';
import { getWhatsAppLink } from '../data/mockData';

export const TechnologiesSection: React.FC = () => {
  const technologies = [
    {
      id: '01',
      title: 'DTF Direct to Film',
      tag: 'Digital a todo color',
      desc: 'Impresión digital directa a película termofijable con base de tinta blanca. Permite reproducir ilustraciones hiperdetalladas, mangas anime y degradados fotográficos sobre cualquier color de tela con tacto suave y gran elasticidad sin cuartearse.',
      quoteMsg: 'Hola Art2Art, deseo cotizar estampado en DTF.',
    },
    {
      id: '02',
      title: 'Serigrafía Artesanal & Industrial',
      tag: 'Grandes tirajes',
      desc: 'El estándar de oro mundial para producciones a escala. Utilizamos tintas plastisol, discharge y base agua ecológicas que garantizan una fijación permanente a la fibra de algodón y el costo por unidad más competitivo del mercado para dotaciones y marcas.',
      quoteMsg: 'Hola Art2Art, deseo cotizar estampado en Serigrafía.',
    },
    {
      id: '03',
      title: 'Sublimación Digital HD',
      tag: 'Cero tacto',
      desc: 'Integración química molecular en tejidos de poliéster, microfibra deportiva y superficies de cerámica. El estampado se vuelve parte intrínseca de la fibra, haciéndolo 100% transpirable y resistente a lavados continuos.',
      quoteMsg: 'Hola Art2Art, deseo cotizar estampado en Sublimación.',
    },
    {
      id: '04',
      title: 'Vinilo Textil Térmico de Precisión',
      tag: 'Personalización unitaria',
      desc: 'Corte vectorial computarizado en vinilo termoadhesivo de alta resistencia. Ideal para números y nombres en camisetas deportivas, así como acabados de alta visibilidad reflectiva de seguridad vial o colores neón.',
      quoteMsg: 'Hola Art2Art, deseo cotizar estampado en Vinilo Textil.',
    },
  ];

  return (
    <section id="tecnologias" className="w-full py-20 sm:py-28 bg-[#0a0d14] text-white border-b border-[#25293d]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8691a8] font-semibold flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#dc0c1c]"></span>
            <span>Tecnologías de Estampado</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight max-w-3xl leading-snug">
            Procesos técnicos certificados para cada tipo de tejido y volumen.
          </h2>
        </div>

        {/* eXelentex style List of Technologies */}
        <div className="divide-y divide-[#25293d]/60 border-y border-[#25293d]/60">
          {technologies.map((tech) => (
            <div
              key={tech.id}
              className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline group hover:bg-[#121622]/40 transition-colors px-2 sm:px-4 rounded-xl"
            >
              {/* Left Column: Number & Title */}
              <div className="lg:col-span-5 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#dc0c1c] tracking-widest">
                    {tech.id}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#8691a8]">
                    {tech.tag}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white group-hover:text-[#dc0c1c] transition-colors leading-tight">
                  {tech.title}
                </h3>
              </div>

              {/* Right Column: Description & Action */}
              <div className="lg:col-span-7 space-y-4">
                <p className="text-sm sm:text-base text-[#8691a8] leading-relaxed">
                  {tech.desc}
                </p>

                <div className="pt-2">
                  <a
                    href={getWhatsAppLink(tech.quoteMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-white hover:text-[#dc0c1c] font-semibold transition-colors"
                  >
                    <span>Cotizar en esta técnica</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
