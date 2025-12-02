'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface SectionBackgroundProps {
  variant?: 'default' | 'dark' | 'subtle';
  showGrid?: boolean;
  showScanLine?: boolean;
  showDiagonals?: boolean;
  accentColor?: 'purple' | 'cyan' | 'green' | 'mixed';
}

/**
 * SectionBackground - Elegant, minimal animated background
 * Creates a cohesive visual experience across all sections
 */
export function SectionBackground({
  variant = 'default',
  showGrid = true,
  showScanLine = false,
  showDiagonals = true,
  accentColor = 'purple',
}: SectionBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Smooth parallax for light beam
  const beamX = useTransform(scrollYProgress, [0, 1], ['-10%', '110%']);
  const smoothBeamX = useSpring(beamX, { stiffness: 50, damping: 30 });

  // Subtle opacity shift
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  // Accent color mapping
  const accentColors = {
    purple: 'rgba(139, 92, 246, 0.08)',
    cyan: 'rgba(0, 212, 255, 0.06)',
    green: 'rgba(20, 241, 149, 0.05)',
    mixed: 'rgba(139, 92, 246, 0.04)',
  };

  const baseOpacity = variant === 'dark' ? 0.6 : variant === 'subtle' ? 0.3 : 0.5;

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - very subtle */}
      <div 
        className="absolute inset-0"
        style={{
          background: variant === 'dark' 
            ? 'linear-gradient(180deg, #030305 0%, #050508 50%, #030305 100%)'
            : 'linear-gradient(180deg, transparent 0%, rgba(5, 5, 8, 0.3) 50%, transparent 100%)',
        }}
      />

      {/* Subtle top accent glow */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[40%]"
        style={{
          background: `radial-gradient(ellipse 100% 100% at 50% -20%, ${accentColors[accentColor]} 0%, transparent 70%)`,
          opacity: contentOpacity,
        }}
      />

      {/* Grid pattern */}
      {showGrid && (
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.012) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.012) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black 0%, transparent 70%)',
            opacity: baseOpacity,
          }}
        />
      )}

      {/* Animated diagonal lines */}
      {showDiagonals && (
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 80px,
              rgba(255, 255, 255, 0.006) 80px,
              rgba(255, 255, 255, 0.006) 81px
            )`,
          }}
          animate={{
            backgroundPosition: ['0px 0px', '160px 160px'],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {/* Moving light beam */}
      <motion.div
        className="absolute top-0 bottom-0 w-[300px]"
        style={{
          left: smoothBeamX,
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.015), transparent)',
          filter: 'blur(40px)',
        }}
      />

      {/* Horizontal scan line */}
      {showScanLine && (
        <motion.div
          className="absolute left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(139, 92, 246, 0.2) 30%, 
              rgba(0, 212, 255, 0.25) 50%, 
              rgba(139, 92, 246, 0.2) 70%, 
              transparent 100%
            )`,
          }}
          animate={{
            top: ['5%', '95%', '5%'],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Edge glow lines */}
      <div 
        className="absolute left-0 top-[15%] bottom-[15%] w-px"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.15), rgba(0, 212, 255, 0.1), transparent)',
          opacity: 0.4,
        }}
      />
      <div 
        className="absolute right-0 top-[15%] bottom-[15%] w-px"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(0, 212, 255, 0.1), rgba(139, 92, 246, 0.15), transparent)',
          opacity: 0.4,
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Bottom edge fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{
          background: 'linear-gradient(to top, rgba(5, 5, 8, 0.5), transparent)',
        }}
      />
    </div>
  );
}

export default SectionBackground;

