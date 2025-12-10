'use client';

import { useEffect, ReactNode } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: ReactNode;
}

// Estendi Window per includere lenis
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    // Esponi Lenis globalmente per permettere scrollTo da altri componenti
    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}

export default SmoothScroll;
