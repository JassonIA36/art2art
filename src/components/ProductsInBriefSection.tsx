import React from 'react';
import { getWhatsAppLink } from '../data/mockData';

export const ProductsInBriefSection: React.FC = () => {
  const products = [
    {
      id: '01',
      title: 'Camisetas Premium 100% Algodón',
      technique: 'DTF Full Color & Serigrafía',
      desc: 'Tejido de 180 gramos con tacto suave, costuras reforzadas y fijación permanente de pigmentos.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASy1AQePV9CPVv3AWh-5p_DqrSEkUak45nyw-WUVtghZrA3N-EDT4lxBj6plsnjekB6MFnn8hXvZir6iu4FTwDygv9FC0iNzVYDP0QRQ06VF_3dXbXrBEMDKfoi-b8TLtkHufyT3tP1bsdtb9yvm_qb7wSdmgVXLGZdGhT-64xG5JG73XoSo1ogI7YXbjFRNBAHR_rTLpsZRT4zO6vnbCqSJFVaeBEdewyiJGLo2m9XXN3jPJgj7dp',
      badge: 'Algodón 180g',
    },
    {
      id: '02',
      title: 'Hoodies y Busos Perchados',
      technique: 'DTF de Alta Definición & Vinilo Textil',
      desc: 'Algodón perchado pesado de 280 gramos con bolsillo canguro y cordones al tono para marcas de streetwear.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9AhnpBE7xjCzhHX5qLuFCl80s7Eg5eL7ehKfjpTakENralmE6tYbWrd8oQAV9w0jWR-v0uqshfNaUozDQxo4cVYVzhmaAVVfeBBGA2An95HuvbbDqTqgSzXM4pdlqiUrZvXDe3NutiyBk8NqJjiMSiqZsbMRMSDpG1CQdinXHh_PiezxgtTas55xjAVtvA52EQJdKEMcVp8NebuM0jNt-5oEmLbHmTFd776SgHXBSKZvJJaPagEf_',
      badge: 'Perchado 280g',
    },
    {
      id: '03',
      title: 'Cerámica y Artículos Sublimados',
      technique: 'Sublimación Digital HD Cero Tacto',
      desc: 'Mugs cerámicos de 11oz, cojines y artículos promocionales con fidelidad fotográfica indestructible al lavado.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmZII0K5oegwUCrHxt9_wDBZ0T212sJjdCoR6wtj5K8rArnsfwl2bFxbvo2O0xapM9fboqg7HM2jcwBOTGoIVL0nGgdORfokloJQi0kfHklTRzeHyn87GyiOvcQ71-Bg5FZBuuQYYHuvRGs3UCOL9_FQjAzazFB_3_vV22Mlc4w2x82mG6jl3eNOWZ-PyVDONFNVlnDIqRyVLRkQlsvp1DeOol7t8JHxKomyRudPviJXWFYJkt1gB8',
      badge: 'Cero Tacto',
    },
    {
      id: '04',
      title: 'Tote Bags y Gorras Urbanas',
      technique: 'DTF Neón & Vinilo de Precisión',
      desc: 'Bolsas ecológicas de lienzo de alta densidad y gorras trucker/dril personalizadas desde 1 unidad.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQp9y1IBSnMSfR90FWCTVMreFPCvoGJ4-EyTkK4FQhDAVjlHZ6qR35OLno2sf7uZEDJkyY-m83QPu8r9-EV0wCM_A6fVa4ZqzYLnTDjao20S4L6xzB2qPgdrvhE3PcjVdsWsQVSrv_LEJrO6EFN4EJf1uZWo3njXy_MuA5ustva9-2l8MU6sW7_ArF29x0qAjShrSCTKzWrQMG5on2x7NdzpAAil4BVaziRj7-Mp4Puc_wxIluXEhr',
      badge: 'Eco & Street',
    },
  ];

  return (
    <section className="w-full py-20 sm:py-28 bg-white text-[#0b0e17] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-slate-500 font-semibold flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#dc0c1c]"></span>
            <span>Nuestros productos</span>
          </span>

          <h2 className="text-3xl sm:text-5xl font-light text-[#0b0e17] tracking-tight max-w-3xl leading-snug">
            Prendas y soportes de calidad superior listos para estampar con tu identidad.
          </h2>
        </div>

        {/* Products List in Brief (eXelentex Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {products.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#dc0c1c]/50 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Preview with Hover Zoom */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>

                {/* Number Badge */}
                <span className="absolute top-4 left-4 text-xs font-mono tracking-widest text-[#0b0e17] bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 shadow-sm font-semibold">
                  {item.id} / 04
                </span>

                <span className="absolute top-4 right-4 text-xs tracking-wider uppercase text-[#dc0c1c] bg-white/95 border border-[#dc0c1c]/30 px-3 py-1 rounded-full font-semibold shadow-sm">
                  {item.badge}
                </span>
              </div>

              {/* Text & Actions */}
              <div className="p-6 sm:p-8 space-y-4">
                <span className="text-xs uppercase tracking-widest text-slate-500 font-medium block">
                  {item.technique}
                </span>

                <h3 className="text-2xl sm:text-3xl font-light text-[#0b0e17] group-hover:text-[#dc0c1c] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>

                {/* Footer with Circular Action Icon */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <a
                    href="#personalizador"
                    className="text-xs uppercase tracking-wider text-[#0b0e17] font-semibold hover:text-[#dc0c1c] transition-colors flex items-center gap-2"
                  >
                    <span>Personalizar en línea</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>

                  <a
                    href={getWhatsAppLink(`Hola Art2Art, deseo cotizar ${item.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#dc0c1c] text-[#0b0e17] hover:text-white border border-slate-200 flex items-center justify-center transition-all shadow-sm group-hover:scale-110"
                    title="Consultar por WhatsApp"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
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
