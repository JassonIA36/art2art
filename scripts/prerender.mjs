// Después de `vite build`: genera el HTML de la página y lo mete dentro de dist/index.html.
// Si algo falla, la compilación sigue con la página de siempre (se dibuja con JavaScript) y avisa por consola.
import { build } from 'vite'
import { readFile, writeFile, rm } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
const salidaSsr = path.join(raiz, 'dist-ssr')
const indice = path.join(raiz, 'dist', 'index.html')

try {
  await build({
    root: raiz,
    logLevel: 'warn',
    build: { ssr: 'src/entry-server.tsx', outDir: salidaSsr, emptyOutDir: true, copyPublicDir: false },
  })
  const modulo = await import(pathToFileURL(path.join(salidaSsr, 'entry-server.js')).href)
  const html = modulo.render()

  const original = await readFile(indice, 'utf8')
  if (!original.includes('<div id="root"></div>')) throw new Error('No encuentro <div id="root"></div> en dist/index.html')
  await writeFile(indice, original.replace('<div id="root"></div>', `<div id="root">${html}</div>`))
  console.log(`prerender: ${Math.round(html.length / 1024)} KB de HTML metidos en dist/index.html`)
} catch (e) {
  console.warn('prerender: no se pudo generar el HTML previo; la página se dibuja con JavaScript como antes.\n', e)
} finally {
  await rm(salidaSsr, { recursive: true, force: true })
}
