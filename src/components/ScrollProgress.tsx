import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div aria-hidden="true" className="fixed top-0 left-0 z-[130] h-[3px] w-full pointer-events-none">
      <div className="h-full origin-left bg-[#dc0c1c]" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
};
