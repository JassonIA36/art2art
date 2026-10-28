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
    <meta property="og:image" content="${SITE.origin}/og-art2art.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${esc(page.image.alt)}" />
    <meta property="og:locale" content="es_CO" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${SITE.origin}/og-art2art.png" />
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

  // 4. Página 404: se muestra con código 404 en cualquier dirección que no existe (wrangler.toml: 404-page).
  //    Lleva noindex y estilos propios (no depende del CSS compilado) y enlaza a la portada y a los servicios.
  const enlaces = paginas
    .map((p) => `<li><a href="/${p.page.slug}">${esc(p.page.navLabel)} en Buga</a></li>`)
    .join('')
  await writeFile(
    path.join(dist, '404.html'),
    `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex, follow" />
<title>Página no encontrada | ${esc(modulo.SITE.name)}</title>
<link rel="icon" type="image/png" href="/logo.png" />
<style>
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#fff;color:#0b0e17;font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
main{width:100%;max-width:520px}
img{width:56px;height:56px;object-fit:contain}
h1{margin:20px 0 8px;font-size:clamp(32px,8vw,44px);line-height:1.05;letter-spacing:-.04em}
p{margin:0 0 24px;font-size:17px;line-height:1.5;color:rgba(0,0,0,.65)}
a.btn{display:inline-flex;align-items:center;height:48px;padding:0 24px;border-radius:999px;background:#000;color:#fff;font-weight:600;font-size:15px;text-decoration:none}
a.btn:hover{background:#262626}
h2{margin:32px 0 10px;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(0,0,0,.5)}
ul{margin:0;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:8px}
li a{display:inline-flex;align-items:center;min-height:40px;padding:0 16px;border:1px solid rgba(0,0,0,.12);border-radius:999px;color:#0b0e17;font-size:14px;text-decoration:none}
li a:hover{background:rgba(0,0,0,.05)}
</style>
</head>
<body>
<main>
<img src="/logo.png" alt="Logo de ${esc(modulo.SITE.name)}" width="56" height="56" />
<h1>Esta página no existe</h1>
<p>Puede que la dirección esté mal escrita o que la página ya no esté disponible.</p>
<a class="btn" href="/">Ir al inicio</a>
<h2>Nuestros servicios</h2>
<ul>${enlaces}</ul>
</main>
</body>
</html>
`,
  )
  console.log('prerender: 404.html')

  // 5. Lista de páginas editables: el Worker la lee para saber qué rutas son páginas por servicio,
  //    armar el selector "Páginas" del panel y enlazar el script que abre el editor (el mismo de la portada).
  const script = (original.match(/<script type="module"[^>]*src="(\/assets\/[^"]+\.js)"/) || [])[1]
  if (!script) throw new Error('No encuentro el script principal en dist/index.html')
  await writeFile(
    path.join(dist, 'paginas.json'),
    JSON.stringify({ editor: script, pages: paginas.map((p) => ({ slug: p.page.slug, label: p.page.navLabel })) }),
  )
} catch (e) {
  console.warn('prerender: no se pudo generar el HTML previo; la página se dibuja con JavaScript como antes.\n', e)
} finally {
  await rm(salidaSsr, { recursive: true, force: true })
}
