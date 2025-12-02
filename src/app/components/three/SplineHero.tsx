'use client';

import { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Lazy load Spline to avoid SSR issues
const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineHeroProps {
  className?: string;
}

export function SplineHero({ className = '' }: SplineHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Show fallback after a timeout if Spline doesn't load
    const timeout = setTimeout(() => {
      if (!isLoaded) {
        setShowFallback(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isLoaded]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Fallback animated background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <FallbackVisual />
      </motion.div>

      {/* Spline 3D Scene */}
      {!showFallback && (
        <Suspense fallback={null}>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <Spline
              scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
              onLoad={() => setIsLoaded(true)}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>
        </Suspense>
      )}
    </div>
  );
}

// Fallback animated visual when Spline doesn't load
function FallbackVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central glowing core */}
      <motion.div
        className="absolute w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)',
          boxShadow: '0 0 60px rgba(99,102,241,0.3)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Orbiting nodes */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full"
          style={{
            background: i < 2 
              ? 'var(--accent-synxay)' 
              : 'var(--accent-kirevya)',
            boxShadow: i < 2 
              ? '0 0 20px var(--accent-synxay)' 
              : '0 0 20px var(--accent-kirevya)',
          }}
          animate={{
            x: [
              Math.cos((i * 72 * Math.PI) / 180) * (100 + i * 20),
              Math.cos(((i * 72 + 360) * Math.PI) / 180) * (100 + i * 20),
            ],
            y: [
              Math.sin((i * 72 * Math.PI) / 180) * (80 + i * 15),
              Math.sin(((i * 72 + 360) * Math.PI) / 180) * (80 + i * 15),
            ],
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.2 }}>
        <motion.line
          x1="50%"
          y1="50%"
          x2="30%"
          y2="30%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.line
          x1="50%"
          y1="50%"
          x2="70%"
          y2="35%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
        <motion.line
          x1="50%"
          y1="50%"
          x2="75%"
          y2="65%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-architect-from)" />
            <stop offset="100%" stopColor="var(--accent-architect-to)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Atmospheric glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 40% 40%, rgba(167,139,250,0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 60% 60%, rgba(132,204,22,0.08) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
}

export default SplineHero;

