import React, { useRef } from 'react';
import { getWhatsAppLink } from '../data/mockData';
import { selectGarmentInStudio } from '../utils/studioEvents';
import type { MockupGarmentId } from '../types';

export const MmmTemplatesCarousel: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const templates = [
    {
      id: 'camiseta-algodon',
      garment: 'camiseta' as MockupGarmentId,
      title: 'Camiseta 100% Algodón',
      subtitle: 'Tejido de 180g peinado con costuras reforzadas.',
      badge: 'Algodón 180g',
      price: '$18.000',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASy1AQePV9CPVv3AWh-5p_DqrSEkUak45nyw-WUVtghZrA3N-EDT4lxBj6plsnjekB6MFnn8hXvZir6iu4FTwDygv9FC0iNzVYDP0QRQ06VF_3dXbXrBEMDKfoi-b8TLtkHufyT3tP1bsdtb9yvm_qb7wSdmgVXLGZdGhT-64xG5JG73XoSo1ogI7YXbjFRNBAHR_rTLpsZRT4zO6vnbCqSJFVaeBEdewyiJGLo2m9XXN3jPJgj7dp',
    },
    {
      id: 'hoodie',
      garment: 'hoodie' as MockupGarmentId,
      title: 'Hoodie con Capota',
      subtitle: 'Algodón perchado pesado de 280g con bolsillo canguro.',
      badge: 'Perchado 280g',
      price: '$48.000',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9AhnpBE7xjCzhHX5qLuFCl80s7Eg5eL7ehKfjpTakENralmE6tYbWrd8oQAV9w0jWR-v0uqshfNaUozDQxo4cVYVzhmaAVVfeBBGA2An95HuvbbDqTqgSzXM4pdlqiUrZvXDe3NutiyBk8NqJjiMSiqZsbMRMSDpG1CQdinXHh_PiezxgtTas55xjAVtvA52EQJdKEMcVp8NebuM0jNt-5oEmLbHmTFd776SgHXBSKZvJJaPagEf_',
    },
    {
      id: 'oversize',
      garment: 'oversize' as MockupGarmentId,
      title: 'Camiseta Oversize Streetwear',
      subtitle: 'Corte boxy contemporáneo con cuello en rib grueso.',
      badge: 'Streetwear Fit',
      price: '$24.000',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn-1tQdg8zjBCyC2ITqYgtLM3wK3g-mGaGx5NBxR0cMCKbGGbH6CXxSrPJKdqhVuOxZcvR0lS2qvUuMXkEUjJh3vTqdT15HQYfJc0TkjVVzXBAgDWfVHWrBKRCi9dwLEI5q_2lAtBURIeBxvyrEiLB9Ajp7yEHi3rKstpsL5J-kfUWlvMCy3LTl5z507zNOKJPaY_R_M6HFBpSAuaH8tVwNYwaY8fZsrItLyZJfJEkjkZx_BAmJ_Ms',
    },
    {
      id: 'gorra',
      garment: 'gorra' as MockupGarmentId,
      title: 'Gorra Trucker & Dril',
      subtitle: 'Broche ajustable y frente reforzado para estampación frontal.',
      badge: 'Gorra Estructurada',
      price: '$12.000',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEekKmgynNv_bCwRBIZMHQyiAmnzMg6M1c8vhvfR3oKPA9fh0stm7va37rHuFeSPUT2S21ORUMzq5cN6M9dK9Di3qxs2cL7_Er4espV6G4-1hchtVe4JVHBJFyRa9z2iZey9bW0LGy9KGqpbkTsBvFK0hfUQuPbqCXVVHWdHqK0XHpbn1jBpsz7qH29yWIea4-k0rC9gO9FiiZHpKO-wofzLsgwlYUsdM6nIm2qqp-qu_ySO_14M64',
    },
    {
      id: 'totebag',
      garment: 'totebag' as MockupGarmentId,
      title: 'Tote Bag Ecológica',
      subtitle: 'Lienzo resistente 100% algodón ideal para marcas y eventos.',
      badge: 'Lienzo Eco',
      price: '$8.500',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQp9y1IBSnMSfR90FWCTVMreFPCvoGJ4-EyTkK4FQhDAVjlHZ6qR35OLno2sf7uZEDJkyY-m83QPu8r9-EV0wCM_A6fVa4ZqzYLnTDjao20S4L6xzB2qPgdrvhE3PcjVdsWsQVSrv_LEJrO6EFN4EJf1uZWo3njXy_MuA5ustva9-2l8MU6sW7_ArF29x0qAjShrSCTKzWrQMG5on2x7NdzpAAil4BVaziRj7-Mp4Puc_wxIluXEhr',
    },
    {
      id: 'mug',
      garment: 'mug' as MockupGarmentId,
      title: 'Mug Cerámico 11oz',
      subtitle: 'Cerámica polimerizada con estampado digital HD sin límites.',
      badge: 'Cero Tacto HD',
      price: '$9.000',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmZII0K5oegwUCrHxt9_wDBZ0T212sJjdCoR6wtj5K8rArnsfwl2bFxbvo2O0xapM9fboqg7HM2jcwBOTGoIVL0nGgdORfokloJQi0kfHklTRzeHyn87GyiOvcQ71-Bg5FZBuuQYYHuvRGs3UCOL9_FQjAzazFB_3_vV22Mlc4w2x82mG6jl3eNOWZ-PyVDONFNVlnDIqRyVLRkQlsvp1DeOol7t8JHxKomyRudPviJXWFYJkt1gB8',
    },
  ];

  return (
    <section id="catalogo" className="bg-white py-20 overflow-hidden border-t border-black/5">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-5 text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1 text-xs sm:text-sm font-medium text-black">
            Catálogo
          </span>

          <h2 className="text-[32px] sm:text-[44px] font-semibold leading-[1.1] tracking-[-0.05em] text-black max-w-[620px]">
            Prendas y soportes para cada negocio y marca
          </h2>

          <p className="text-[17px] sm:text-[18px] tracking-[-0.025em] text-black/60 max-w-[540px]">
            Explora siluetas seleccionadas listas para estampar. Desde streetwear y dotaciones corporativas hasta colecciones de autor.
          </p>
        </div>

        {/* Carousel Container with Floating Glass Arrow Buttons (Directly like mmmmenu.app) */}
        <div className="relative w-full pt-4">
          {/* Floating glass arrows */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-30 flex -translate-y-1/2 justify-between px-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="pointer-events-auto size-12 sm:size-14 rounded-full bg-white/70 shadow-[0px_4px_20px_rgba(0,0,0,0.12)] ring-1 ring-black/10 backdrop-blur-xl hover:bg-white flex items-center justify-center transition-all text-black hover:scale-105 active:scale-95"
              aria-label="Anterior prenda"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => scroll('right')}
              className="pointer-events-auto size-12 sm:size-14 rounded-full bg-white/70 shadow-[0px_4px_20px_rgba(0,0,0,0.12)] ring-1 ring-black/10 backdrop-blur-xl hover:bg-white flex items-center justify-center transition-all text-black hover:scale-105 active:scale-95"
              aria-label="Siguiente prenda"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Scrollable Track */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
          >
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                className="flex w-[300px] sm:w-[320px] shrink-0 flex-col gap-4 rounded-2xl bg-neutral-50/70 p-4 border border-black/5 hover:border-black/15 transition-all group"
              >
                {/* Image Container with subtle rounded top */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-200/50">
                  <img
                    src={tpl.imageUrl}
                    alt={tpl.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-black shadow-sm ring-1 ring-black/5">
                    {tpl.badge}
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-full bg-black text-white px-2.5 py-0.5 text-xs font-mono font-medium shadow-sm">
                    {tpl.price}
                  </span>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-black group-hover:opacity-80 transition-opacity">
                    {tpl.title}
                  </h3>
                  <p className="text-xs text-black/60 line-clamp-2 leading-relaxed">
                    {tpl.subtitle}
                  </p>
                </div>

                {/* Action Link */}
                <div className="pt-2 border-t border-black/5 flex items-center justify-between">
                  <a
                    href="#personalizador"
                    onClick={() => selectGarmentInStudio(tpl.garment)}
                    className="text-xs font-semibold text-black hover:text-[#dc0c1c] transition-colors inline-flex items-center gap-1"
                  >
                    <span>Personalizar esta silueta</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>

                  <a
                    href={getWhatsAppLink(`Hola Art2Art, quiero cotizar ${tpl.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white hover:bg-black hover:text-white text-black ring-1 ring-black/10 flex items-center justify-center transition-all text-xs"
                    title="Cotizar por WhatsApp"
                  >
                    💬
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
