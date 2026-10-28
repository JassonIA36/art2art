import React from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Con `delay` (ms) es una entrada al cargar la página (el hero); sin `delay`, la sección se anima con el scroll. */
  delay?: number;
}

// Sin `delay`: cada sección entra desde abajo y se "recoge" un poco al salir por arriba. El movimiento está en CSS
// (clase .fold en index.css, animaciones ligadas al scroll): no usa JavaScript, y si el navegador no lo soporta la
// sección simplemente se ve completa. El texto siempre está en el HTML, así que Google lo lee igual.
export const Reveal: React.FC<RevealProps> = ({ children, className = '', delay }) => {
  if (delay !== undefined) {
    return (
      <div style={{ animationDelay: `${delay}ms` }} className={`intro ${className}`}>
        {children}
      </div>
    );
  }
  return (
    <div
      // Las secciones fuera de pantalla no se maquetan ni pintan hasta que se acercan: la carga inicial es más liviana
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 720px' }}
      className={`fold ${className}`}
    >
      {children}
    </div>
  );
};
