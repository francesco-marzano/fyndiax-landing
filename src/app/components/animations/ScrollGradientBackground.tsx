'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

/**
 * ScrollGradientBackground - Optimized Version
 * 
 * Creates a continuous animated background with parallax orbs that change color
 * based on scroll position, providing visual continuity between sections.
 * 
 * Optimizations:
 * - Reduced from 5 orbs to 3 orbs
 * - Removed FloatingParticles (20 animated elements)
 * - Simplified spring config for less CPU usage
 * - Removed scale breathing effect
 */

// Lighter spring config for better performance
const springConfig = { stiffness: 30, damping: 25, mass: 1 };

// Color keyframes for scroll interpolation
const colorKeyframes = {
  primary: ['#8B5CF6', '#A855F7', '#8B5CF6', '#A855F7', '#14F195', '#8B5CF6', '#050508'],
  secondary: ['#00D4FF', '#14F195', '#A855F7', '#00D4FF', '#A855F7', '#14F195', '#050508'],
};

// Scroll progress breakpoints (0-1 range)
const scrollBreakpoints = [0, 0.12, 0.25, 0.45, 0.65, 0.85, 1];

interface ParallaxOrbProps {
  color: MotionValue<string>;
  size: number;
  blur: number;
  opacity: number;
  initialX: string;
  initialY: string;
  parallaxFactor: number;
  scrollYProgress: MotionValue<number>;
}

function ParallaxOrb({
  color,
  size,
  blur,
  opacity,
  initialX,
  initialY,
  parallaxFactor,
  scrollYProgress,
}: ParallaxOrbProps) {
  // Calculate parallax offset based on scroll - simplified, no horizontal drift
  const yOffset = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vh', `${-100 * parallaxFactor}vh`]
  );

  // Smooth the movement
  const smoothY = useSpring(yOffset, springConfig);

  return (
    <motion.div
      className="parallax-orb will-change-transform"
      style={{
        width: size,
        height: size,
        left: initialX,
        top: initialY,
        y: smoothY,
        background: useTransform(color, (c) => 
          `radial-gradient(circle, ${c}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`
        ),
        filter: `blur(${blur}px)`,
      }}
    />
  );
}

// Gradient mesh that provides base color continuity - simplified
function GradientMesh({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const meshOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.3, 0.4, 0.4, 0.2]
  );

  return (
    <motion.div
      className="parallax-mesh"
      style={{
        opacity: meshOpacity,
      }}
    />
  );
}

export function ScrollGradientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end end'],
  });

  // Smooth the overall scroll progress
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // Interpolate colors for each orb layer
  const primaryColor = useTransform(
    smoothProgress,
    scrollBreakpoints,
    colorKeyframes.primary
  );

  const secondaryColor = useTransform(
    smoothProgress,
    scrollBreakpoints,
    colorKeyframes.secondary
  );

  // Overall background opacity - fades at very end
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.95, 1],
    [1, 1, 0.8]
  );

  return (
    <motion.div
      ref={containerRef}
      className="scroll-gradient-background"
      style={{ opacity: bgOpacity }}
      aria-hidden="true"
    >
      {/* Base gradient mesh */}
      <GradientMesh scrollYProgress={smoothProgress} />

      {/* Layer 1: Large slow-moving orb (background) */}
      <ParallaxOrb
        color={primaryColor}
        size={800}
        blur={100}
        opacity={0.12}
        initialX="20%"
        initialY="10%"
        parallaxFactor={0.3}
        scrollYProgress={smoothProgress}
      />

      {/* Layer 2: Medium orb (midground) */}
      <ParallaxOrb
        color={secondaryColor}
        size={500}
        blur={80}
        opacity={0.1}
        initialX="70%"
        initialY="40%"
        parallaxFactor={0.5}
        scrollYProgress={smoothProgress}
      />

      {/* Layer 3: Smaller orb (foreground) */}
      <ParallaxOrb
        color={primaryColor}
        size={350}
        blur={60}
        opacity={0.08}
        initialX="40%"
        initialY="70%"
        parallaxFactor={0.6}
        scrollYProgress={smoothProgress}
      />

      {/* Subtle scan lines overlay - CSS only, no JS animation */}
      <div className="parallax-scanlines" />
    </motion.div>
  );
}

export default ScrollGradientBackground;
