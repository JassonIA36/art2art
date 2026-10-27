// Página estática por servicio. No lleva JavaScript: es HTML que Google lee de inmediato y carga muy rápido.
import React from 'react'
import { SERVICE_PAGES, SITE, type ServicePageData } from '../data/servicePages'

const wa = (message: string) => `https://wa.me/${SITE.whatsappRaw}?text=${encodeURIComponent(message)}`

const BotonWhatsApp: React.FC<{ message: string; className?: string; children: React.ReactNode }> = ({ message, className = '', children }) => (
  <a
    href={wa(message)}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center gap-2 rounded-full bg-black text-white hover:bg-neutral-800 text-sm font-medium h-12 px-6 transition-colors ${className}`}
  >
    <span className="w-2 h-2 rounded-full bg-[#25D366]" aria-hidden="true"></span>
    {children}
  </a>
)

export const ServicePage: React.FC<{ page: ServicePageData }> = ({ page }) => {
  const otros = SERVICE_PAGES.filter((p) => p.slug !== page.slug)

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-black/10">
        <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between px-5 sm:px-8 py-3">
          <a href="/" className="flex items-center gap-2.5" aria-label="Art2Art Estampados, ir al inicio">
            <img src="/logo.png" alt="Logo de Art2Art Estampados" width={48} height={48} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
            <span className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-bold tracking-[-0.04em]">art2art</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc0c1c]"></span>
            </span>
          </a>
          <BotonWhatsApp message={page.whatsappMessage} className="h-10 px-4 sm:px-5">
            Cotizar por WhatsApp
          </BotonWhatsApp>
        </div>
      </header>

      <main className="flex-grow">
        {/* Migas de pan */}
        <nav aria-label="Ruta de navegación" className="mx-auto w-full max-w-[1100px] px-5 sm:px-8 pt-6 text-sm text-black/70">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <a href="/" className="hover:text-black underline-offset-4 hover:underline">Inicio</a>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-black" aria-current="page">{page.navLabel}</li>
          </ol>
        </nav>

        {/* Portada */}
        <section className="mx-auto w-full max-w-[1100px] px-5 sm:px-8 py-10 sm:py-14 grid gap-10 md:grid-cols-[1.15fr_0.85fr] items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs sm:text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc0c1c]" aria-hidden="true"></span>
              {page.eyebrow}
            </p>
            <h1 className="mt-5 text-[40px] sm:text-[56px] font-semibold leading-[1.04] tracking-[-0.05em]">{page.h1}</h1>
            <p className="mt-5 text-[17px] sm:text-[19px] leading-relaxed text-black/70 max-w-[560px]">{page.lead}</p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {page.facts.map((f) => (
                <li key={f} className="rounded-full border border-black/10 bg-white px-4 py-1.5 text-sm font-medium">
                  ✓ {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <BotonWhatsApp message={page.whatsappMessage}>Cotizar por WhatsApp</BotonWhatsApp>
              <a
                href="/#personalizador"
                className="inline-flex items-center justify-center rounded-full border border-black/15 hover:bg-black/5 text-sm font-medium h-12 px-6 transition-colors"
              >
                Probar mi diseño en línea
              </a>
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-[#fbe9ec] via-white to-[#eef3fb] p-6 sm:p-10">
            <img src={page.image.src} alt={page.image.alt} width={1000} height={1000} className="w-full h-auto object-contain mix-blend-multiply" />
          </div>
        </section>

        {/* Contenido */}
        <div className="mx-auto w-full max-w-[820px] px-5 sm:px-8 pb-6 space-y-12">
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-[26px] sm:text-[32px] font-semibold leading-[1.15] tracking-[-0.04em]">{s.heading}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p} className="mt-4 text-[17px] leading-relaxed text-black/70">{p}</p>
              ))}
              {s.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[17px] leading-relaxed text-black/70">
                      <span className="mt-2.5 w-1.5 h-1.5 shrink-0 rounded-full bg-[#dc0c1c]" aria-hidden="true"></span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Cómo pedir */}
          <section>
            <h2 className="text-[26px] sm:text-[32px] font-semibold leading-[1.15] tracking-[-0.04em]">Cómo hacer tu pedido</h2>
            <ol className="mt-6 space-y-5">
              {page.steps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-black text-white text-sm font-semibold">{i + 1}</span>
                  <p className="pt-1 text-[17px] leading-relaxed text-black/70">{s}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Preguntas frecuentes */}
          <section>
            <h2 className="text-[26px] sm:text-[32px] font-semibold leading-[1.15] tracking-[-0.04em]">Preguntas frecuentes</h2>
            <div className="mt-4 divide-y divide-black/10 border-y border-black/10">
              {page.faqs.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium">
                    {f.q}
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-black/5 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="pt-3 pr-10 text-[16px] leading-relaxed text-black/70">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Otros servicios */}
          <section>
            <h2 className="text-[26px] sm:text-[32px] font-semibold leading-[1.15] tracking-[-0.04em]">Otros servicios del taller</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {otros.map((o) => (
                <li key={o.slug}>
                  <a href={`/${o.slug}`} className="block rounded-2xl border border-black/10 p-5 hover:bg-black/5 transition-colors">
                    <span className="block text-lg font-semibold tracking-tight">{o.navLabel} en Buga</span>
                    <span className="mt-1 block text-sm text-black/70">{o.lead.split('. ')[0].replace(/\.$/, '')}.</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Datos del taller */}
          <section className="rounded-3xl bg-neutral-50 border border-black/5 p-6 sm:p-8">
            <h2 className="text-[24px] sm:text-[28px] font-semibold tracking-[-0.04em]">Visítanos en Buga</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-3 text-[16px]">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-black/70">Dirección</dt>
                <dd className="mt-1 text-black/80">{SITE.address}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-black/70">Horario</dt>
                <dd className="mt-1 text-black/80">{SITE.schedule}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-black/70">WhatsApp</dt>
                <dd className="mt-1 text-black/80">{SITE.whatsappDisplay}</dd>
              </div>
            </dl>
            <div className="mt-6">
              <BotonWhatsApp message={page.whatsappMessage}>Escribir por WhatsApp</BotonWhatsApp>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-black/10 py-8 mt-10">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col sm:flex-row items-center justify-between gap-3 px-5 sm:px-8 text-xs text-black/70">
          <p>© {new Date().getFullYear()} {SITE.name}. Guadalajara de Buga, Colombia.</p>
          <a href="/" className="hover:text-black underline-offset-4 hover:underline">Volver al inicio</a>
        </div>
      </footer>
    </div>
  )
}
