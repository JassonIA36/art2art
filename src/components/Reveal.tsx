import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      // Las secciones fuera de pantalla no se maquetan ni pintan hasta que se acercan: la carga inicial es más liviana
      style={{ transitionDelay: `${delay}ms`, contentVisibility: 'auto', containIntrinsicSize: 'auto 720px' }}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
};
