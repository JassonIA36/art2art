import React, { useState, useEffect } from 'react';
import { COMPANY_INFO, getWhatsAppLink } from '../data/mockData';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['inicio', 'nuestros-servicios-de-estampado', 'personalizador', 'como-funciona', 'opiniones', 'faq', 'nosotros'];
      const scrollPos = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Servicios', href: '#nuestros-servicios-de-estampado', id: 'nuestros-servicios-de-estampado' },
    { label: 'Personalizador', href: '#personalizador', id: 'personalizador' },
    { label: 'Cómo Funciona', href: '#como-funciona', id: 'como-funciona' },
    { label: 'Opiniones', href: '#opiniones', id: 'opiniones' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
    { label: 'Nosotros', href: '#nosotros', id: 'nosotros' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0f0f12]/95 backdrop-blur-xl border-b border-[#2a2a36] py-2.5 shadow-2xl'
            : 'bg-[#0f0f12]/80 backdrop-blur-md border-b border-[#2a2a36]/40 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo brand */}
          <a
            href="#inicio"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative">
              <img
                alt="Art2Art Logo"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#e6197e]/40 group-hover:ring-[#e6197e] transition-all shadow-md"
                src={COMPANY_INFO.avatarUrl}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#25D366] border-2 border-[#0f0f12] rounded-full"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl text-white tracking-wider leading-none group-hover:text-[#e6197e] transition-colors">
                Art2Art
              </span>
              <span className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
                <span>Taller Textil</span>
                <span className="w-1 h-1 rounded-full bg-[#ffd60a]"></span>
                <span className="text-[#00b4d8]">Buga</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Navegación Principal">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-semibold transition-all relative py-1 hover:text-[#e6197e] ${
                    isActive ? 'text-[#e6197e] font-bold' : 'text-[#9ca3af]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#e6197e] rounded-full"></span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Link to Customizer */}
            <a
              href="#personalizador"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl bg-[#e6197e]/15 hover:bg-[#e6197e]/25 text-[#e6197e] border border-[#e6197e]/40 transition-all hover:scale-105"
            >
              <span className="material-symbols-outlined text-[16px]">palette</span>
              <span>Personalizar</span>
            </a>

            {/* Direct WhatsApp CTA */}
            <a
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1da851] text-[#0f0f12] text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-whatsapp-glow transition-all hover:scale-105 active:scale-95"
              href={getWhatsAppLink('Hola Art2Art, deseo cotizar un proyecto de estampado.')}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              aria-label="Abrir Menú"
              className="lg:hidden flex items-center justify-center p-2 text-white hover:bg-[#1a1a20] rounded-xl border border-[#2a2a36] transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Drawer content */}
          <div className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-[#141418] border-l border-[#2a2a36] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-300">
            <div>
              {/* Drawer header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#2a2a36]">
                <div className="flex items-center gap-2.5">
                  <img
                    alt="Art2Art Logo"
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-[#e6197e]"
                    src={COMPANY_INFO.avatarUrl}
                  />
                  <div>
                    <span className="font-display text-2xl text-white">Art2Art</span>
                    <span className="text-[10px] text-[#9ca3af] block">Buga, Valle</span>
                  </div>
                </div>
                <button
                  aria-label="Cerrar Menú"
                  className="p-1.5 rounded-lg text-[#9ca3af] hover:text-white hover:bg-[#22222b]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="material-symbols-outlined text-[22px]">close</span>
                </button>
              </div>

              {/* Navigation links */}
              <nav className="flex flex-col gap-1.5 mt-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-3 rounded-xl text-white hover:bg-[#1a1a20] font-medium text-sm transition-colors border border-transparent hover:border-[#2a2a36]"
                  >
                    <span>{link.label}</span>
                    <span className="material-symbols-outlined text-[18px] text-[#9ca3af]">chevron_right</span>
                  </a>
                ))}

                <a
                  href="#personalizador"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-[#e6197e]/15 text-[#e6197e] font-bold text-sm border border-[#e6197e]/30 mt-2"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">palette</span>
                    <span>Personalizador en Vivo</span>
                  </span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
              </nav>
            </div>

            {/* Drawer footer */}
            <div className="pt-6 border-t border-[#2a2a36] space-y-4">
              <a
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-[#0f0f12] font-bold text-sm py-3 rounded-xl shadow-whatsapp-glow transition-all"
                href={getWhatsAppLink('Hola Art2Art, deseo cotizar por WhatsApp.')}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>Chatear en WhatsApp</span>
              </a>

              <div className="text-center text-xs text-[#9ca3af] space-y-1">
                <p>{COMPANY_INFO.address}</p>
                <p className="text-[11px] text-[#9ca3af]/70">{COMPANY_INFO.schedule}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
