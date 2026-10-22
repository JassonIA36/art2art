import React, { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 1, prefix: 'Desde ', suffix: ' unidad', label: 'Sin pedido mínimo' },
  { value: 300, suffix: ' DPI', label: 'Resolución DTF' },
  { value: 50, prefix: '+', suffix: ' lavadas', label: 'Fijación garantizada' },
  { value: 20, suffix: '%', label: 'Descuento por volumen' },
];

const CountUp: React.FC<{ to: number }> = ({ to }) => {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setN(to);
      return;
    }
    let raf = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / 1200, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return <span ref={ref}>{n}</span>;
};

export const StatsStrip: React.FC = () => (
  <div className="relative mx-auto mt-14 w-full max-w-[1280px] px-6 sm:px-8">
    <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl bg-black/10 border border-black/10">
      {STATS.map((s) => (
        <div key={s.label} className="bg-white/90 backdrop-blur px-5 py-6 text-center">
          <dt className="text-[28px] sm:text-[34px] font-semibold tracking-[-0.05em] text-black">
            {s.prefix}
            <CountUp to={s.value} />
            {s.suffix}
          </dt>
          <dd className="mt-1 text-xs sm:text-sm text-black/55">{s.label}</dd>
        </div>
      ))}
    </dl>
  </div>
);
