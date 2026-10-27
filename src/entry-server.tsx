// Solo se usa al compilar: genera el HTML de la portada y de las páginas por servicio para que Google y
// WhatsApp reciban el texto sin esperar a que se ejecute JavaScript. En el navegador, main.tsx vuelve a
// dibujar la portada; las páginas por servicio son HTML estático sin JavaScript.
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import App from './App.tsx'
import { ServicePage } from './pages/ServicePage.tsx'
import { SERVICE_PAGES, SITE } from './data/servicePages.ts'

export function render(): string {
  return renderToString(<App />)
}

export function renderServicePages() {
  return SERVICE_PAGES.map((page) => ({ page, html: renderToStaticMarkup(<ServicePage page={page} />) }))
}

export { SERVICE_PAGES, SITE }
