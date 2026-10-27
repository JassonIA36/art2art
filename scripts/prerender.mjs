// Después de `vite build`:
//  1. Genera el HTML de la portada y lo mete dentro de dist/index.html.
//  2. Genera una página HTML por cada servicio (dist/<servicio>.html) con su título, descripción y datos estructurados.
//  3. Escribe dist/sitemap.xml con todas las direcciones.
// Si algo falla, la compilación sigue con la página de siempre (se dibuja con JavaScript) y avisa por consola.
import { build } from 'vite'
import { readFile, writeFile, rm } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
const salidaSsr = path.join(raiz, 'dist-ssr')
const dist = path.join(raiz, 'dist')
const indice = path.join(dist, 'index.html')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c')

function cabezaServicio({ page, SITE, css, tipografias }) {
  const url = `${SITE.origin}/${page.slug}`
  const grafo = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#servicio`,
        name: page.h1,
        serviceType: page.navLabel,
        description: page.metaDescription,
        url,
        inLanguage: 'es-CO',
        provider: { '@id': `${SITE.origin}/#negocio` },
        areaServed: { '@type': 'City', name: 'Guadalajara de Buga' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE.origin}/` },
          { '@type': 'ListItem', position: 2, name: page.navLabel, item: url },
        ],
      },
    ],
  }
  return `<meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/logo.png" />
    <link rel="apple-touch-icon" href="/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(page.title)}</title>
    <meta name="description" content="${esc(page.metaDescription)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="es-CO" href="${url}" />
    <meta name="theme-color" content="#ffffff" />
    <meta name="author" content="${esc(SITE.name)}" />
    <meta name="geo.region" content="CO-VAC" />
    <meta name="geo.placename" content="Guadalajara de Buga" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(SITE.name)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${esc(page.title)}" />
    <meta property="og:description" content="${esc(page.metaDescription)}" />
    <meta property="og:image" content="${SITE.origin}/logo.png" />
    <meta property="og:image:alt" content="Logo de ${esc(SITE.name)}" />
    <meta property="og:locale" content="es_CO" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${esc(page.title)}" />
    <meta name="twitter:description" content="${esc(page.metaDescription)}" />
    <script type="application/ld+json">${json(grafo)}</script>
    ${css}
    ${tipografias}`
}

try {
  await build({
    root: raiz,
    logLevel: 'warn',
    build: { ssr: 'src/entry-server.tsx', outDir: salidaSsr, emptyOutDir: true, copyPublicDir: false },
  })
  const modulo = await import(pathToFileURL(path.join(salidaSsr, 'entry-server.js')).href)

  // 1. Portada
  const original = await readFile(indice, 'utf8')
  if (!original.includes('<div id="root"></div>')) throw new Error('No encuentro <div id="root"></div> en dist/index.html')
  const portada = modulo.render()
  await writeFile(indice, original.replace('<div id="root"></div>', `<div id="root">${portada}</div>`))
  console.log(`prerender: portada, ${Math.round(portada.length / 1024)} KB de HTML metidos en dist/index.html`)

  // 2. Páginas por servicio (mismo CSS y tipografías que la portada)
  const css = (original.match(/<link rel="stylesheet"[^>]*href="\/assets\/[^"]+\.css"[^>]*>/) || [''])[0]
  if (!css) throw new Error('No encuentro la hoja de estilos compilada en dist/index.html')
  const ini = original.indexOf('<!-- Tipografías')
  const fin = original.indexOf('</head>')
  // Solo tipografías y estilos: sin el JavaScript de la portada (las páginas por servicio son HTML puro)
  const tipografias = (ini >= 0 && fin > ini ? original.slice(ini, fin) : '')
    .replace(/<script[^>]*><\/script>/g, '')
    .replace(/<link rel="modulepreload"[^>]*>/g, '')
    .trim()

  const paginas = modulo.renderServicePages()
  for (const { page, html } of paginas) {
    const documento = `<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
  <head>
    ${cabezaServicio({ page, SITE: modulo.SITE, css, tipografias })}
  </head>
  <body class="bg-white text-[#0b0e17] font-sans antialiased min-h-screen">
    ${html}
  </body>
</html>
`
    // <servicio>.html (no carpeta/index.html): así /servicio responde directo, sin redirigir a /servicio/
    await writeFile(path.join(dist, page.slug + '.html'), documento)
  }
  console.log(`prerender: ${paginas.length} páginas por servicio (${paginas.map((p) => p.page.slug).join(', ')})`)

  // 3. Mapa del sitio
  const hoy = new Date().toISOString().slice(0, 10)
  const urls = [
    { loc: `${modulo.SITE.origin}/`, prioridad: '1.0' },
    ...paginas.map((p) => ({ loc: `${modulo.SITE.origin}/${p.page.slug}`, prioridad: '0.8' })),
  ]
  const mapa = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${hoy}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${u.prioridad}</priority>\n  </url>`).join('\n')}
</urlset>
`
  await writeFile(path.join(dist, 'sitemap.xml'), mapa)
  console.log(`prerender: sitemap.xml con ${urls.length} direcciones`)
} catch (e) {
  console.warn('prerender: no se pudo generar el HTML previo; la página se dibuja con JavaScript como antes.\n', e)
} finally {
  await rm(salidaSsr, { recursive: true, force: true })
}
