// Solo se usa al compilar: genera el HTML de la página para que Google y WhatsApp reciban el texto
// sin esperar a que se ejecute JavaScript. En el navegador, main.tsx vuelve a dibujar la misma página.
import { renderToString } from 'react-dom/server'
import App from './App.tsx'

export function render(): string {
  return renderToString(<App />)
}
