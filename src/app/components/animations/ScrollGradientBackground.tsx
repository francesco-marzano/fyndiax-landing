'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

/**
 * ScrollGradientBackground
 * 
 * Creates a continuous animated background with parallax orbs that change color
 * based on scroll position, providing visual continuity between sections.
 * 
 * Color scheme per section:
 * - Hero → WhoWeAre: Primary Purple (#8B5CF6) + Cyan (#00D4FF)
 * - MissionStatement → Model: Synxay (#A855F7) + Green (#14F195)
 * - WhyNow → Ventures: Purple/Synxay blend
 * - Team → Partners: Balanced mix
 * - Builders: Split purple/green
 * - Contact → Footer: Fade to void
 */

// Smooth spring config for fluid animations
const springConfig = { stiffness: 50, damping: 30, mass: 1 };

// Color keyframes for scroll interpolation
const colorKeyframes = {
  // Primary orb colors (dominant)
  primary: ['#8B5CF6', '#A855F7', '#8B5CF6', '#A855F7', '#14F195', '#8B5CF6', '#050508'],
  // Secondary orb colors (accent)
  secondary: ['#00D4FF', '#14F195', '#A855F7', '#00D4FF', '#A855F7', '#14F195', '#050508'],
  // Tertiary orb colors (subtle)
  tertiary: ['#14F195', '#8B5CF6', '#00D4FF', '#14F195', '#8B5CF6', '#00D4FF', '#030305'],
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
  // Calculate parallax offset based on scroll
  const yOffset = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vh', `${-100 * parallaxFactor}vh`]
  );

  // Smooth the movement
  const smoothY = useSpring(yOffset, springConfig);

  // Subtle horizontal drift based on scroll
  const xDrift = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['0%', `${parallaxFactor * 10}%`, '0%']
  );
  const smoothX = useSpring(xDrift, springConfig);

  // Scale variation for breathing effect
  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1, 1.1, 0.95, 1.05, 1]
  );
  const smoothScale = useSpring(scale, { stiffness: 30, damping: 20 });

  return (
    <motion.div
      className="parallax-orb"
      style={{
        width: size,
        height: size,
        left: initialX,
        top: initialY,
        y: smoothY,
        x: smoothX,
        scale: smoothScale,
        background: useTransform(color, (c) => 
          `radial-gradient(circle, ${c}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`
        ),
        filter: `blur(${blur}px)`,
      }}
    />
  );
}

// Floating particle system for additional depth
function FloatingParticles({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: `${(i * 17 + 5) % 100}%`,
    y: `${(i * 23 + 10) % 100}%`,
    size: 2 + (i % 3),
    delay: i * 0.1,
    parallax: 0.2 + (i % 5) * 0.1,
  }));

  return (
    <div className="parallax-particles">
      {particles.map((particle) => {
        const particleY = useTransform(
          scrollYProgress,
          [0, 1],
          ['0vh', `${-50 * particle.parallax}vh`]
        );

        return (
          <motion.div
            key={particle.id}
            className="parallax-particle"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              y: particleY,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
          />
        );
      })}
    </div>
  );
}

// Subtle scan lines for cohesive futuristic feel
function ScanLines() {
  return (
    <div className="parallax-scanlines" />
  );
}

// Gradient mesh that provides base color continuity
function GradientMesh({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const meshOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.3, 0.4, 0.4, 0.2]
  );

  const meshRotation = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 15]
  );

  return (
    <motion.div
      className="parallax-mesh"
      style={{
        opacity: meshOpacity,
        rotate: meshRotation,
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

  const tertiaryColor = useTransform(
    smoothProgress,
    scrollBreakpoints,
    colorKeyframes.tertiary
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
        opacity={0.15}
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
        opacity={0.12}
        initialX="70%"
        initialY="30%"
        parallaxFactor={0.5}
        scrollYProgress={smoothProgress}
      />

      {/* Layer 3: Smaller faster orb (foreground) */}
      <ParallaxOrb
        color={tertiaryColor}
        size={350}
        blur={60}
        opacity={0.1}
        initialX="40%"
        initialY="60%"
        parallaxFactor={0.7}
        scrollYProgress={smoothProgress}
      />

      {/* Additional accent orbs for depth */}
      <ParallaxOrb
        color={secondaryColor}
        size={250}
        blur={50}
        opacity={0.08}
        initialX="85%"
        initialY="70%"
        parallaxFactor={0.4}
        scrollYProgress={smoothProgress}
      />

      <ParallaxOrb
        color={primaryColor}
        size={300}
        blur={70}
        opacity={0.1}
        initialX="10%"
        initialY="80%"
        parallaxFactor={0.6}
        scrollYProgress={smoothProgress}
      />

      {/* Floating particles */}
      <FloatingParticles scrollYProgress={smoothProgress} />

      {/* Subtle scan lines overlay */}
      <ScanLines />
    </motion.div>
  );
}

export default ScrollGradientBackground;

