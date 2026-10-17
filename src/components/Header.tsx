import React, { useState, useEffect } from 'react';
import { COMPANY_INFO, getWhatsAppLink } from '../data/mockData';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('main-screen');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['main-screen', 'que-hacemos', 'productos', 'personalizador', 'aplicaciones', 'tecnologias', 'faq', 'contacto'];
      const scrollPos = window.scrollY + 140;

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
    { label: 'Qué Hacemos', href: '#que-hacemos', id: 'que-hacemos' },
    { label: 'Productos', href: '#productos', id: 'productos' },
    { label: 'Personalizador', href: '#personalizador', id: 'personalizador' },
    { label: 'Aplicaciones', href: '#aplicaciones', id: 'aplicaciones' },
    { label: 'Tecnologías', href: '#tecnologias', id: 'tecnologias' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/90 py-3 shadow-sm'
            : 'bg-transparent py-5 sm:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          {/* Logo brand */}
          <a
            href="#main-screen"
            className="flex items-center gap-3.5 group focus:outline-none"
          >
            <div className="relative">
              <img
                alt="Art2Art Logo"
                className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-300 group-hover:ring-[#dc0c1c] transition-all"
                src={COMPANY_INFO.avatarUrl}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#25D366] border-2 border-white rounded-full"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-light tracking-[0.15em] text-[#0b0e17] uppercase group-hover:text-[#dc0c1c] transition-colors font-display">
                Art2Art
              </span>
              <span className="text-[10px] tracking-[0.2em] text-slate-500 uppercase font-mono">
                Atelier Buga
              </span>
            </div>
          </a>

          {/* Desktop Navigation in eXelentex Minimalist Style */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación Principal">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.18em] transition-all relative py-1 hover:text-[#0b0e17] ${
                    isActive ? 'text-[#0b0e17] font-semibold' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#dc0c1c]"></span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Header Action: Contact Button with Circular Arrow */}
          <div className="flex items-center gap-4">
            <a
              href={getWhatsAppLink('Hola Art2Art, me gustaría cotizar un pedido.')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[#0b0e17] hover:text-[#dc0c1c] transition-colors font-medium"
            >
              <span>Contactar</span>
              <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:border-[#dc0c1c] transition-colors">
                <svg width="12" height="12" viewBox="0 0 22 8" fill="none">
                  <path d="M0 7H18L10.95 2V5.21" stroke="#DC0C1C" strokeWidth="2" />
                </svg>
              </div>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              aria-label="Abrir Menú"
              className="lg:hidden flex items-center justify-center p-2 text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors"
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Drawer content */}
          <div className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white text-[#0b0e17] border-l border-slate-200 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-300">
            <div>
              {/* Drawer header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <img
                    alt="Art2Art Logo"
                    className="w-9 h-9 rounded-full object-cover"
                    src={COMPANY_INFO.avatarUrl}
                  />
                  <div>
                    <span className="text-xl font-display uppercase tracking-widest text-[#0b0e17]">Art2Art</span>
                    <span className="text-[10px] text-slate-500 block uppercase tracking-wider">Atelier Buga</span>
                  </div>
                </div>
                <button
                  aria-label="Cerrar Menú"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="material-symbols-outlined text-[24px]">close</span>
                </button>
              </div>

              {/* Navigation links */}
              <nav className="flex flex-col gap-2 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-3 text-[#0b0e17] hover:text-[#dc0c1c] text-sm uppercase tracking-[0.18em] transition-colors border-b border-slate-100"
                  >
                    <span>{link.label}</span>
                    <span className="material-symbols-outlined text-[16px] text-slate-400">arrow_forward</span>
                  </a>
                ))}

                <a
                  href="#personalizador"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-4 flex items-center justify-between px-4 py-3 rounded-xl bg-[#dc0c1c] text-white text-xs uppercase tracking-widest font-semibold"
                >
                  <span>Personalizador en Vivo</span>
                  <span className="material-symbols-outlined text-[18px]">palette</span>
                </a>
              </nav>
            </div>

            {/* Drawer footer */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <a
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-[#0a0d14] font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-lg transition-all"
                href={getWhatsAppLink('Hola Art2Art, deseo cotizar por WhatsApp.')}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Chatear en WhatsApp</span>
              </a>

              <div className="text-center text-xs text-slate-500 space-y-1">
                <p>{COMPANY_INFO.address}</p>
                <p className="text-[10px] opacity-70">{COMPANY_INFO.schedule}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
