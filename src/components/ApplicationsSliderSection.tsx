import React, { useState } from 'react';

export const ApplicationsSliderSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const applications = [
    {
      tabLabel: 'Streetwear & Marcas',
      title: 'Marcas de Streetwear & Creadores Independientes',
      lead: 'Ayudamos a marcas emergentes y consolidadas a materializar colecciones textiles con acabados de alta fidelidad, tacto suave y durabilidad extrema.',
      cols: [
        {
          title: 'Estampado DTF Full Color',
          desc: 'Impresión digital con tinta blanca sobre prendas oscuras sin límite de degradados ni colores.',
        },
        {
          title: 'Tacto y Transpirabilidad',
          desc: 'Curado térmico con presión controlada para evitar sensación plástica rígida.',
        },
        {
          title: 'Etiquetado Personalizado',
          desc: 'Estampado de marquillas internas con instrucciones de cuidado y logo de tu marca.',
        },
        {
          title: 'Producción desde 1 unidad',
          desc: 'Prototipos para sesiones fotográficas antes de lanzar tirajes a gran escala.',
        },
        {
          title: 'Pruebas de Lavado',
          desc: 'Ensayos de resistencia a 50+ ciclos para asegurar fidelidad cromática prolongada.',
        },
      ],
    },
    {
      tabLabel: 'Dotaciones Empresariales',
      title: 'Dotaciones Corporativas & Empresas',
      lead: 'Fortalecemos la presencia corporativa de negocios e instituciones con uniformes textiles resistentes al trabajo diario y lavados industriales.',
      cols: [
        {
          title: 'Serigrafía Plastisol & Base Agua',
          desc: 'El estándar más económico y duradero para dotaciones masivas a partir de 20 unidades.',
        },
        {
          title: 'Vinilo Reflectivo de Seguridad',
          desc: 'Aplicación de cintas y logos reflectivos con certificación de visibilidad para chalecos y overoles.',
        },
        {
          title: 'Identidad Cromática Corporativa',
          desc: 'Igualación de colores Pantone para respetar las guías de marca de tu compañía.',
        },
        {
          title: 'Prendas Antifluido y Algodón',
          desc: 'Compatibilidad con camisas polo, overoles, delantales y chalecos de dril.',
        },
        {
          title: 'Facturación y Cumplimiento',
          desc: 'Entregas programadas por lotes y cotizaciones formales para compras institucionales.',
        },
      ],
    },
    {
      tabLabel: 'Colegios & Eventos',
      title: 'Instituciones Educativas, Promociones & Eventos',
      lead: 'Acompañamos a promociones escolares, intercolegiados y festivales culturales en la confección y estampado de sus prendas conmemorativas.',
      cols: [
        {
          title: 'Hoodies y Chaquetas Prom',
          desc: 'Estampados frontales, de espalda y mangas con nombres personalizados de cada estudiante.',
        },
        {
          title: 'Numeración Deportiva',
          desc: 'Corte de vinilo termoadhesivo con tipografías deportivas para uniformes de juego.',
        },
        {
          title: 'Bolsas y Souvenirs',
          desc: 'Tote bags de lienzo y artículos para entrega en congresos, ferias y aniversarios.',
        },
        {
          title: 'Precios de Lote Escolar',
          desc: 'Tarifas preferenciales para grupos y directivas de instituciones en Buga y Valle.',
        },
        {
          title: 'Despacho Unificado',
          desc: 'Empaque individual por estudiante para facilitar la distribución en el aula.',
        },
      ],
    },
    {
      tabLabel: 'Academia & Talleres',
      title: 'Formación Presencial en Serigrafía Textil',
      lead: 'Compartimos conocimiento artesanal e industrial para que nuevos emprendedores aprendan a estampar sus propias prendas desde cero.',
      cols: [
        {
          title: 'Preparación de Matrices UV',
          desc: 'Tensado de marcos, emulsión fotosensible y revelado en cuarto oscuro.',
        },
        {
          title: 'Colorimetría de Tintas',
          desc: 'Mezcla de plastisoles, bases al agua y aditivos retardantes para impresión profesional.',
        },
        {
          title: 'Registro Micrométrico',
          desc: 'Técnica de calce multicolor en pulpo manual de serigrafía sin desfasar colores.',
        },
        {
          title: 'Termofijado y Curado',
          desc: 'Uso correcto de planchas térmicas y pistolas de calor para evitar desprendimiento.',
        },
        {
          title: 'Cupos Reducidos (Máx 6)',
          desc: 'Atención personalizada directamente en el taller físico de Art2Art en Buga.',
        },
      ],
    },
  ];

  const current = applications[activeTab];

  return (
    <section className="w-full py-20 sm:py-28 bg-[#f8fafc] text-[#0b0e17] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-slate-500 font-semibold flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#dc0c1c]"></span>
            <span>Aplicaciones de nuestra experiencia</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-[#0b0e17] tracking-tight">
            Sectores que confían en nuestro taller
          </h2>
        </div>

        {/* Horizontal Bullet Tabs (eXelentex Swiper Pagination style) */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 sm:mb-14 scrollbar-none border-b border-slate-200">
          {applications.map((app, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={app.tabLabel}
                type="button"
                onClick={() => setActiveTab(index)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide uppercase transition-all shrink-0 border ${
                  isActive
                    ? 'bg-[#dc0c1c] text-white border-[#dc0c1c] shadow-md shadow-[#dc0c1c]/20'
                    : 'bg-white text-slate-600 border-slate-200 hover:text-[#0b0e17] hover:border-slate-300 shadow-sm'
                }`}
              >
                {app.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Active Content Display */}
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h3 className="text-2xl sm:text-4xl font-light text-[#0b0e17] tracking-tight mb-3">
              {current.title}
            </h3>
            <p className="text-base sm:text-lg text-slate-600 max-w-4xl leading-relaxed">
              {current.lead}
            </p>
          </div>

          {/* 3-Column Detailed Technical Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {current.cols.map((col, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-slate-200 hover:border-[#dc0c1c]/40 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc0c1c]"></span>
                  <h4 className="text-sm font-semibold text-[#0b0e17] tracking-wide">
                    {col.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {col.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
