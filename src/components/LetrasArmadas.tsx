import React from 'react';

// Pseudoaleatorio fijo (depende solo del índice): el HTML previo y el del navegador salen idénticos.
const azar = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const entre = (n: number, max: number) => ((azar(n) - 0.5) * 2 * max).toFixed(0);

// Muestra un texto cuyas letras entran dispersas y se arman (animación en CSS: .letra en index.css).
// El texto sigue siendo texto normal: cada palabra va en un <span> y las letras en <span> dentro de ella,
// con los espacios como texto entre palabras, así que Google y los lectores de pantalla lo leen completo.
export const LetrasArmadas: React.FC<{ texto: string }> = ({ texto }) => {
  let indice = 0;
  const palabras = texto.split(' ');
  return (
    <>
      {palabras.map((palabra, p) => (
        <React.Fragment key={p}>
          {p > 0 && ' '}
          <span className="palabra">
            {[...palabra].map((letra) => {
              const i = indice++;
              const estilo = {
                '--i': i,
                '--x': `${entre(i, 70)}px`,
                '--y': `${entre(i + 100, 80)}px`,
                '--r': `${entre(i + 200, 40)}deg`,
              } as React.CSSProperties;
              return (
                <span key={i} className="letra" style={estilo}>
                  {letra}
                </span>
              );
            })}
          </span>
        </React.Fragment>
      ))}
    </>
  );
};

/** Cantidad de letras de un texto (sin espacios): sirve para calcular cuándo termina la animación. */
export const contarLetras = (texto: string) => [...texto.replace(/ /g, '')].length;
