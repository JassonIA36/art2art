import React, { useState, useEffect } from 'react';
import { COMPANY_INFO, getWhatsAppLink } from '../data/mockData';

interface HeaderProps {
  onOpenQuoteModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['inicio', 'nuestros-servicios-de-estampado', 'simulador', 'talleres', 'nosotros', 'ubicacion'];
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
    { label: 'Simulador 2D', href: '#simulador', id: 'simulador' },
    { label: 'Talleres', href: '#talleres', id: 'talleres' },
    { label: 'Nosotros', href: '#nosotros', id: 'nosotros' },
    { label: 'Ubicación', href: '#ubicacion', id: 'ubicacion' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] py-2'
            : 'bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] py-0'
        }`}
      >
        <div className="h-20 max-w-7xl mx-auto px-margin flex items-center justify-between gap-gutter">
          {/* Logo brand */}
          <a
            href="#inicio"
            className="flex items-center gap-space-sm group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          >
            <div className="relative">
              <img
                alt="Art2Art Logo Profile"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/60 transition-all shadow-sm"
                src={COMPANY_INFO.avatarUrl}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-whatsapp-green border-2 border-white rounded-full"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none group-hover:text-primary transition-colors">
                Art2Art Estampados
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1 flex items-center gap-1">
                <span>Taller & Academia Textil</span>
                <span className="w-1 h-1 rounded-full bg-petal-yellow inline-block"></span>
                <span className="text-secondary font-medium">Buga</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-space-lg" aria-label="Navegación Principal">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`font-label-md text-label-md transition-all relative py-1 hover:text-primary ${
                    isActive ? 'text-primary font-bold' : 'text-on-surface-variant'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-fadeIn"></span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-space-sm sm:gap-space-md">
            {/* Interactive Quote Calculator Trigger */}
            <button
              onClick={onOpenQuoteModal}
              type="button"
              className="hidden md:inline-flex items-center gap-space-xs font-label-md text-label-md px-space-md py-space-sm rounded-full bg-surface-container hover:bg-surface-container-high text-primary border border-primary/20 hover:border-primary/40 transition-all hover:scale-[1.02] shadow-sm"
              title="Calcular presupuesto en línea"
            >
              <span className="material-symbols-outlined text-[18px]">calculate</span>
              <span>Cotizador Rápido</span>
            </button>

            {/* Direct WhatsApp CTA */}
            <a
              className="inline-flex items-center gap-space-xs bg-whatsapp-green hover:bg-whatsapp-dark text-on-primary font-label-md text-label-md px-space-md py-space-sm rounded-full shadow-[0_8px_20px_-4px_rgba(37,211,102,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              href={getWhatsAppLink('Hola Art2Art, deseo cotizar un proyecto de estampado.')}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span className="hidden sm:inline">Cotizar en WhatsApp</span>
              <span className="font-body-sm text-body-sm opacity-90 hidden xl:inline">{COMPANY_INFO.whatsappDisplay}</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              aria-label="Abrir Menú"
              className="lg:hidden flex items-center justify-center p-2 text-on-surface hover:bg-surface-container rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              type="button"
            >
              <span className="material-symbols-outlined text-[26px]">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Drawer content */}
          <div className="fixed top-0 right-0 w-5/6 max-w-sm h-full bg-surface-card p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-300">
            <div>
              {/* Drawer header */}
              <div className="flex items-center justify-between pb-6 border-b border-surface-border">
                <div className="flex items-center gap-2">
                  <img
                    alt="Art2Art Logo"
                    className="w-8 h-8 rounded-full object-cover"
                    src={COMPANY_INFO.avatarUrl}
                  />
                  <span className="font-headline-sm text-headline-sm text-on-surface">Art2Art</span>
                </div>
                <button
                  aria-label="Cerrar Menú"
                  className="p-1 rounded-full text-secondary hover:text-on-surface hover:bg-surface-container"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="material-symbols-outlined text-[24px]">close</span>
                </button>
              </div>

              {/* Navigation links */}
              <nav className="flex flex-col gap-2 mt-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-3 rounded-lg text-on-surface hover:bg-surface-container font-label-md text-label-md transition-colors"
                  >
                    <span>{link.label}</span>
                    <span className="material-symbols-outlined text-[18px] text-secondary">chevron_right</span>
                  </a>
                ))}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuoteModal();
                  }}
                  className="flex items-center justify-between px-3 py-3 rounded-lg text-primary hover:bg-primary-fixed/30 font-label-md text-label-md transition-colors text-left"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">calculate</span>
                    <span>Cotizador Interactivo</span>
                  </span>
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                </button>
              </nav>
            </div>

            {/* Drawer footer */}
            <div className="pt-6 border-t border-surface-border space-y-4">
              <a
                className="w-full inline-flex items-center justify-center gap-2 bg-whatsapp-green hover:bg-whatsapp-dark text-on-primary font-label-md text-label-md py-3 rounded-full shadow-md transition-all"
                href={getWhatsAppLink('Hola Art2Art, deseo cotizar por WhatsApp.')}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>Chatear en WhatsApp</span>
              </a>

              <div className="text-center text-secondary font-body-sm text-body-sm space-y-1">
                <p>{COMPANY_INFO.address}</p>
                <p className="text-xs text-secondary/80">Lunes a Sábado: 8:00 AM - 6:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
