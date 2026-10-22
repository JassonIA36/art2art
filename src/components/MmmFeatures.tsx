import React from 'react';
import { getWhatsAppLink } from '../data/mockData';

export const MmmFeatures: React.FC = () => {
  const features = [
    {
      title: 'Estudio de Personalización en Vivo',
      desc: 'Visualiza tu logotipo o ilustración a escala exacta sobre diferentes siluetas y colores en tiempo real.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m10 15 5-3-5-3v6Z" />
        </svg>
      ),
    },
    {
      title: 'Tecnología DTF Ultra HD 300 DPI',
      desc: 'Transferencia directa a film con base blanca y degradados fotográficos. Flexible, elástica y de tacto suave.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      ),
    },
    {
      title: 'Descuento Automático por Volumen',
      desc: 'Ahorra 10% a partir de 6 unidades y hasta 20% en pedidos de 12 o más prendas con cotización transparente.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" x2="5" y1="5" y2="19" />
          <circle cx="6.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
      ),
    },
    {
      title: 'Fijación Térmica Garantizada',
      desc: 'Pigmentos industriales curados a presión y temperatura exactas: soportan más de 50 lavadas sin cuartearse.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'Asesoría y Optimización de Archivos',
      desc: 'Revisamos tus vectores, quitamos fondos y adaptamos tu arte a la técnica ideal sin ningún recargo.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m18 15-6-6-6 6" />
          <path d="M12 9v12" />
          <circle cx="12" cy="3" r="1" />
        </svg>
      ),
    },
    {
      title: 'Envíos Nacionales y Entrega en Buga',
      desc: 'Recoge directamente en nuestro taller boutique en Guadalajara de Buga o recibe por encomienda certificada.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
          <path d="M15 18H9" />
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
          <circle cx="17" cy="18" r="2" />
          <circle cx="7" cy="18" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <section id="caracteristicas" className="bg-white py-20 border-t border-black/5">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col px-6 sm:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center gap-5 text-center mb-16">
          <span data-edit="caract_etiqueta" className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1 text-xs sm:text-sm font-medium text-black">
            Características
          </span>

          <h2 data-edit="caract_titulo" className="text-[32px] sm:text-[44px] font-semibold leading-[1.1] tracking-[-0.05em] text-black max-w-[620px]">
            Todo lo que necesitas para crear prendas profesionales
          </h2>

          <p data-edit="caract_descripcion" className="text-[17px] sm:text-[18px] tracking-[-0.025em] text-black/60 max-w-[540px]">
            Calidad industrial, atención boutique y herramientas modernas para que tu marca destaque con cada puntada y estampado.
          </p>
        </div>

        {/* Feature Grid (Clean mmmmenu layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-black">
                  {feature.icon}
                </div>
                <h3 data-edit={`caract_${idx + 1}_titulo`} className="text-base font-semibold text-black tracking-tight">
                  {feature.title}
                </h3>
              </div>
              <p data-edit={`caract_${idx + 1}_texto`} className="text-sm leading-relaxed text-black/60 pl-10">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Highlight Banner with WhatsApp prompt */}
        <div className="mt-16 rounded-2xl bg-black p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 text-center sm:text-left">
            <span data-edit="caract_banner_etiqueta" className="text-xs font-mono uppercase tracking-widest text-[#dc0c1c]">
              ¿Tienes un pedido especial o dudas técnicas?
            </span>
            <h4 data-edit="caract_banner_titulo" className="text-xl sm:text-2xl font-bold tracking-tight">
              Habla directamente con nuestro maestro estampador
            </h4>
            <p data-edit="caract_banner_texto" className="text-xs sm:text-sm text-white/70 max-w-xl">
              Te asesoramos sobre la mejor técnica para tu presupuesto, tiempos y tipo de tejido.
            </p>
          </div>

          <a
            href={getWhatsAppLink('Hola Art2Art, deseo asesoría técnica para mi proyecto textil.')}
            data-edit-href="caract_boton_whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white text-black hover:bg-neutral-100 font-semibold px-6 py-3 text-sm transition-all shrink-0 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
            <span data-edit="caract_boton_whatsapp_texto">Consultar por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
