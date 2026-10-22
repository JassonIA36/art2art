import React from 'react';
import { getWhatsAppLink } from '../data/mockData';
import { Reveal } from './Reveal';
import { StatsStrip } from './StatsStrip';
import { selectGarmentInStudio } from '../utils/studioEvents';
import type { MockupGarmentId } from '../types';

export const MmmHero: React.FC = () => {
  const marqueeItems = [
    {
      id: 'dtf-streetwear',
      garment: 'camiseta' as MockupGarmentId,
      title: 'Camiseta Streetwear Cyber Striker',
      badge: 'DTF Full Color • Algodón 180g',
      sub: 'Resolución fotográfica 300 DPI',
      bgColor: '#f4a4c0',
      textColor: 'text-neutral-900',
      badgeBg: 'bg-black/10 text-black',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASy1AQePV9CPVv3AWh-5p_DqrSEkUak45nyw-WUVtghZrA3N-EDT4lxBj6plsnjekB6MFnn8hXvZir6iu4FTwDygv9FC0iNzVYDP0QRQ06VF_3dXbXrBEMDKfoi-b8TLtkHufyT3tP1bsdtb9yvm_qb7wSdmgVXLGZdGhT-64xG5JG73XoSo1ogI7YXbjFRNBAHR_rTLpsZRT4zO6vnbCqSJFVaeBEdewyiJGLo2m9XXN3jPJgj7dp',
    },
    {
      id: 'hoodie-urban',
      garment: 'hoodie' as MockupGarmentId,
      title: 'Buso con Capota Urban Tribe',
      badge: 'Hoodie 280g • Curado Térmico',
      sub: 'Algodón perchado pesado premium',
      bgColor: '#123071',
      textColor: 'text-white',
      badgeBg: 'bg-white/20 text-white',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9AhnpBE7xjCzhHX5qLuFCl80s7Eg5eL7ehKfjpTakENralmE6tYbWrd8oQAV9w0jWR-v0uqshfNaUozDQxo4cVYVzhmaAVVfeBBGA2An95HuvbbDqTqgSzXM4pdlqiUrZvXDe3NutiyBk8NqJjiMSiqZsbMRMSDpG1CQdinXHh_PiezxgtTas55xjAVtvA52EQJdKEMcVp8NebuM0jNt-5oEmLbHmTFd776SgHXBSKZvJJaPagEf_',
    },
    {
      id: 'serigrafia-vintage',
      garment: 'camiseta' as MockupGarmentId,
      title: 'Camisetas Algodón Crudo Clásicas',
      badge: 'Serigrafía Tradicional • Alto Volumen',
      sub: 'Tintas plastisol ecológicas y suaves',
      bgColor: '#ffe9d6',
      textColor: 'text-neutral-900',
      badgeBg: 'bg-black/10 text-black',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-jPs4gtwgmJMQM8_e8WYtQnivIRACIu6aNLwcv9ZhtnO9k2s5eCN7NXrpYmZDLIqhMP_Jdj3oRbEs4eKOvPvlPF1UU4EDDUtkgU10jxpb-CfQ_fh4EimReOenxCJ5oj7w3A_AC7nnCdlw3tTSWKah8IS-NHa-fjuYs7oDGHxNAIUgvlKmZEsuAniyp57_LQwj0AwiERFZBPiXtVOx-zdhflygM0l10hxw7ZqB8sffGKIt5KIT1cfB',
    },
    {
      id: 'tote-cap',
      garment: 'totebag' as MockupGarmentId,
      title: 'Tote Bags Ecológicas & Gorras',
      badge: 'Lienzo Pesado & Vinilo Textil',
      sub: 'Personalización nítida y durable',
      bgColor: '#0d2b2a',
      textColor: 'text-white',
      badgeBg: 'bg-white/20 text-white',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQp9y1IBSnMSfR90FWCTVMreFPCvoGJ4-EyTkK4FQhDAVjlHZ6qR35OLno2sf7uZEDJkyY-m83QPu8r9-EV0wCM_A6fVa4ZqzYLnTDjao20S4L6xzB2qPgdrvhE3PcjVdsWsQVSrv_LEJrO6EFN4EJf1uZWo3njXy_MuA5ustva9-2l8MU6sW7_ArF29x0qAjShrSCTKzWrQMG5on2x7NdzpAAil4BVaziRj7-Mp4Puc_wxIluXEhr',
    },
    {
      id: 'sublimacion-sport',
      garment: 'mug' as MockupGarmentId,
      title: 'Prendas Deportivas & Mugs Cerámicos',
      badge: 'Sublimación HD • Cero Tacto',
      sub: 'Fidelidad fotográfica indestructible',
      bgColor: '#520000',
      textColor: 'text-white',
      badgeBg: 'bg-white/20 text-white',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmZII0K5oegwUCrHxt9_wDBZ0T212sJjdCoR6wtj5K8rArnsfwl2bFxbvo2O0xapM9fboqg7HM2jcwBOTGoIVL0nGgdORfokloJQi0kfHklTRzeHyn87GyiOvcQ71-Bg5FZBuuQYYHuvRGs3UCOL9_FQjAzazFB_3_vV22Mlc4w2x82mG6jl3eNOWZ-PyVDONFNVlnDIqRyVLRkQlsvp1DeOol7t8JHxKomyRudPviJXWFYJkt1gB8',
    },
    {
      id: 'atelier-edition',
      garment: 'camiseta' as MockupGarmentId,
      title: 'Muestras de Taller & Línea de Autor',
      badge: 'Boutique Atelier • Buga, Valle',
      sub: 'Control de calidad prenda por prenda',
      bgColor: '#eeede8',
      textColor: 'text-neutral-900',
      badgeBg: 'bg-black/10 text-black',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn-1tQdg8zjBCyC2ITqYgtLM3wK3g-mGaGx5NBxR0cMCKbGGbH6CXxSrPJKdqhVuOxZcvR0lS2qvUuMXkEUjJh3vTqdT15HQYfJc0TkjVVzXBAgDWfVHWrBKRCi9dwLEI5q_2lAtBURIeBxvyrEiLB9Ajp7yEHi3rKstpsL5J-kfUWlvMCy3LTl5z507zNOKJPaY_R_M6HFBpSAuaH8tVwNYwaY8fZsrItLyZJfJEkjkZx_BAmJ_Ms',
    },
    {
      id: 'vinilo-deportivo',
      garment: 'camiseta' as MockupGarmentId,
      title: 'Numeración & Vinilo Textil Especial',
      badge: 'Corte Vectorial • Reflectivo & Neón',
      sub: 'Precisión milimétrica para uniformes',
      bgColor: '#0f2418',
      textColor: 'text-white',
      badgeBg: 'bg-white/20 text-white',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEekKmgynNv_bCwRBIZMHQyiAmnzMg6M1c8vhvfR3oKPA9fh0stm7va37rHuFeSPUT2S21ORUMzq5cN6M9dK9Di3qxs2cL7_Er4espV6G4-1hchtVe4JVHBJFyRa9z2iZey9bW0LGy9KGqpbkTsBvFK0hfUQuPbqCXVVHWdHqK0XHpbn1jBpsz7qH29yWIea4-k0rC9gO9FiiZHpKO-wofzLsgwlYUsdM6nIm2qqp-qu_ySO_14M64',
    },
  ];

  return (
    <section id="inicio" className="relative bg-white pt-12 sm:pt-16 pb-16 overflow-hidden">
      {/* Soft animated gradient blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-[8%] h-[420px] w-[420px] rounded-full bg-[#f4a4c0]/40 blur-[110px] animate-blob" />
        <div className="absolute top-10 right-[6%] h-[380px] w-[380px] rounded-full bg-[#ffe9d6]/70 blur-[110px] animate-blob [animation-delay:-6s]" />
        <div className="absolute top-40 left-[40%] h-[300px] w-[300px] rounded-full bg-[#9db7ff]/30 blur-[110px] animate-blob [animation-delay:-12s]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col px-6 sm:px-8">
        <div className="mx-auto flex max-w-[760px] flex-col items-center gap-5 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1 text-xs sm:text-sm font-medium text-black">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc0c1c] animate-pulse"></span>
              <span data-edit="hero_etiqueta">Personalización Textil & Estampados • Buga, Valle</span>
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-[40px] sm:text-[54px] lg:text-[62px] font-semibold leading-[1.05] tracking-[-0.05em] text-black">
              <span data-edit="hero_titulo">Estampados en Buga de alta calidad para</span>{' '}
              <span className="text-shimmer" data-edit="hero_titulo_destacado">tu marca</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p data-edit="hero_descripcion" className="text-[17px] sm:text-[19px] tracking-[-0.025em] text-black/60 max-w-[580px] leading-relaxed">
              Taller de estampados en Guadalajara de Buga. Diseña tus prendas en línea, elige entre DTF full color, serigrafía y vinilo de precisión, y cotiza al instante por WhatsApp. Sin mínimos y con envíos a todo el país.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="#personalizador"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-black text-white hover:bg-neutral-800 h-12 px-7 text-base font-medium transition-all shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] active:scale-95"
              >
                <span data-edit="hero_boton_personalizar">Personalizar en vivo</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>

              <a
                href={getWhatsAppLink('Hola Art2Art, me gustaría cotizar un pedido textil.')}
                data-edit-href="hero_boton_whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white/80 backdrop-blur text-black hover:bg-black/5 h-12 px-6 text-base font-medium transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
                <span data-edit="hero_boton_whatsapp_texto">Cotizar por WhatsApp</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-4 text-xs sm:text-sm text-black/70">
              {['✓ Desde 1 unidad', '✓ DTF 300 DPI Ultra HD', '✓ Descuento por volumen hasta 20%', '✓ Despachos a toda Colombia'].map((t, i) => (
                <span key={t} data-edit={`hero_ventaja_${i + 1}`} className="inline-flex items-center gap-1.5 rounded-full bg-white/70 border border-black/5 px-3 py-1 font-medium">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Continuous marquee showcase with faded edges */}
      <div
        className="relative mt-14 overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        aria-label="Prendas hechas en Art2Art"
      >
        <div className="flex w-max animate-menu-marquee hover-pause">
          {[0, 1].map((loop) => (
            <div key={loop} className="flex gap-4 pr-4" aria-hidden={loop === 1 ? true : undefined}>
              {marqueeItems.map((item) => (
                <a
                  key={`${item.id}-${loop}`}
                  href="#personalizador"
                  onClick={() => selectGarmentInStudio(item.garment)}
                  tabIndex={loop === 1 ? -1 : undefined}
                  className="group flex h-[480px] w-[380px] max-md:h-[350px] max-md:w-[280px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-sm relative"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <div className="relative z-10 flex flex-col gap-2">
                    <span data-edit={`hero_${item.id}_etiqueta`} className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium w-fit ${item.badgeBg}`}>
                      {item.badge}
                    </span>
                    <h3 data-edit={`hero_${item.id}_titulo`} className={`text-lg sm:text-xl font-bold tracking-tight leading-snug ${item.textColor}`}>{item.title}</h3>
                    <p data-edit={`hero_${item.id}_detalle`} className={`text-xs sm:text-sm opacity-80 ${item.textColor}`}>{item.sub}</p>
                  </div>

                  <div className="relative z-10 w-full flex items-center justify-center pt-2">
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm p-2 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.3)] ring-1 ring-black/10 group-hover:scale-105 group-hover:-rotate-1 transition-transform duration-500">
                      <img src={item.imageUrl} data-edit-img={`hero_${item.id}_foto`} alt={item.title} className="w-full h-full object-cover rounded-lg" loading="lazy" />
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between pt-3 border-t border-black/10">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${item.textColor}`}>Personalizar este modelo</span>
                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <StatsStrip />
    </section>
  );
};
