import React, { useState, useEffect } from 'react';
import { COMPANY_INFO, getWhatsAppLink } from '../data/mockData';
import { SERVICE_PAGES } from '../data/servicePages';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['inicio', 'catalogo', 'personalizador', 'servicios', 'caracteristicas', 'talleres', 'opiniones', 'faq', 'contacto'];
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
    { label: 'Catálogo', href: '#catalogo', id: 'catalogo' },
    { label: 'Estudio en Vivo', href: '#personalizador', id: 'personalizador' },
    { label: 'Servicios', href: '#servicios', id: 'servicios', submenu: true },
    { label: 'Taller', href: '#talleres', id: 'talleres' },
    { label: 'Opiniones', href: '#opiniones', id: 'opiniones' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-black/10 py-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
            : 'bg-white py-5'
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 sm:px-8">
          {/* Left Column: Navigation Links (mmmmenu style) */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const linkClass = `inline-flex items-center justify-center gap-1 rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                isActive
                  ? 'bg-black/5 font-semibold text-black'
                  : 'text-black/70 hover:bg-black/5 hover:text-black font-normal'
              }`;
              if (!link.submenu) {
                return (
                  <a key={link.label} href={link.href} className={linkClass}>
                    <span data-edit={`nav_${link.id}`}>{link.label}</span>
                  </a>
                );
              }
              // "Servicios" abre una lista con las páginas por técnica (con el mouse o con el teclado; en celular se usa el menú lateral)
              return (
                <div key={link.label} className="group relative">
                  <a href={link.href} className={linkClass} aria-haspopup="true">
                    <span data-edit={`nav_${link.id}`}>{link.label}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="opacity-60 transition-transform group-hover:rotate-180 group-focus-within:rotate-180">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </a>
                  <div className="invisible absolute left-0 top-full z-10 w-72 pt-2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="rounded-2xl border border-black/10 bg-white p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.10)]">
                      {SERVICE_PAGES.map((p) => (
                        <li key={p.slug}>
                          <a href={`/${p.slug}`} className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-black/80 transition-colors hover:bg-black/5 hover:text-black">
                            {p.navLabel} en Buga
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Column: Logo / Wordmark (Centered like mmmmenu) */}
          <a
            href="#inicio"
            className="flex items-center gap-2.5 focus:outline-none group"
            aria-label="Art2Art inicio"
          >
            <img
              src="/logo.png"
              data-edit-img="logo_principal"
              alt="Art2Art Logo"
              className="w-11 h-11 sm:w-14 sm:h-14 object-contain group-hover:scale-105 transition-transform"
            />
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-2xl font-bold tracking-[-0.04em] text-black group-hover:opacity-80 transition-opacity">
                art2art
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc0c1c]"></span>
              <span className="hidden sm:inline-block text-[11px] font-mono tracking-wider text-black/50 uppercase ml-1">
                Buga
              </span>
            </div>
          </a>

          {/* Right Column: CTA Buttons (mmmmenu style) */}
          <div className="flex items-center gap-2.5">
            <a
              href="#personalizador"
              className="hidden sm:inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-black text-white hover:bg-neutral-800 text-sm font-medium h-10 px-3.5 sm:px-5 transition-all shadow-sm active:scale-95"
            >
              <span data-edit="header_boton_personalizar">Personalizar prenda</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hidden sm:inline-block"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label="Abrir menú de navegación"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-full text-black hover:bg-black/5 transition-colors border border-black/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[120] lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white text-black p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-250">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-black/10">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/logo.png"
                    data-edit-img="logo_principal"
                    alt="Art2Art Logo"
                    className="w-11 h-11 object-contain"
                  />
                  <span className="font-bold tracking-[-0.04em] text-lg text-black">
                    art2art
                  </span>
                </div>
                <button
                  type="button"
                  aria-label="Cerrar menú"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-black/5 text-black/70"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-1.5 mt-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-black/80 hover:bg-black/5 transition-colors"
                  >
                    <span data-edit={`nav_${link.id}`}>{link.label}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-black/40"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </a>
                ))}

                <p className="mt-5 px-3.5 text-[11px] font-bold uppercase tracking-widest text-black/50">Servicios en Buga</p>
                {SERVICE_PAGES.map((p) => (
                  <a
                    key={p.slug}
                    href={`/${p.slug}`}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-black/80 hover:bg-black/5 transition-colors"
                  >
                    <span>{p.navLabel}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black/40" aria-hidden="true">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </a>
                ))}

                <a
                  href="#personalizador"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-black text-white text-sm font-medium shadow-sm"
                >
                  <span data-edit="menu_boton_personalizar">Ir al Personalizador</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-black/10 space-y-3">
              <a
                href={getWhatsAppLink('Hola Art2Art, quiero cotizar un pedido textil.')}
                data-edit-href="hero_boton_whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-black font-semibold text-xs uppercase tracking-wider py-3 shadow-md"
              >
                <span data-edit="menu_boton_whatsapp_texto">Chatear por WhatsApp</span>
              </a>
              <p className="text-center text-xs text-black/50" data-edit="contacto_direccion">
                {COMPANY_INFO.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
