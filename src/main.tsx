import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { startContent } from './editor/content'

// Aplica lo que el dueño editó (si hay algo guardado) sobre el contenido original.
startContent()

// El modo edición solo se descarga cuando el Worker confirma una sesión en /admin.
if (window.__A2A__?.admin) {
  import('./editor/editMode').then((m) => m.startEditMode())
}

// Las páginas por servicio no tienen #root: el Worker solo les agrega este script en /admin/<servicio>
// para abrir el editor sobre su HTML. Sus preguntas frecuentes se abren para poder editar las respuestas.
const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else {
  document.querySelectorAll('details').forEach((d) => d.setAttribute('open', ''))
}
