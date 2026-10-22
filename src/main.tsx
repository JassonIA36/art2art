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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
