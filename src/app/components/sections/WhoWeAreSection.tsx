'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Compass, Layers, Rocket } from 'lucide-react';
import { FadeInUp, StaggerChildren, StaggerItem } from '../animations';
import { SectionTypewriter } from '../animations/SectionTypewriter';

// Hook per rilevare dispositivi touch
function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };
    checkTouch();
  }, []);

  return isTouch;
}

const features = [
  {
    id: 'architect',
    number: '01',
    icon: Compass,
    title: 'Architect',
    subtitle: 'System Design & Orchestration',
    description:
      'We design the architecture, governance and AI-powered tools that orchestrate our ventures and partners across Italy and the UK. Our system connects every layer of the innovation ecosystem.',
    color: 'primary' as const,
    accent: '#8B5CF6',
    accentLight: '#A78BFA',
    accentGlow: 'rgba(139, 92, 246, 0.5)',
  },
  {
    id: 'builders',
    number: '02',
    icon: Layers,
    title: 'Builders',
    subtitle: 'AI & Green Innovation Labs',
    description:
      'We launch and manage thematic venture builders in AI and green/circular innovation. Each builder is co-designed with scientific and industrial partners to solve real problems.',
    color: 'synxay' as const,
    accent: '#A855F7',
    accentLight: '#C084FC',
    accentGlow: 'rgba(168, 85, 247, 0.5)',
  },
  {
    id: 'ventures',
    number: '03',
    icon: Rocket,
    title: 'Ventures',
    subtitle: 'Science-to-Market Pipeline',
    description:
      'We co-create and validate science-backed startups, transforming lab results and field data into products, pilots and successful spin-offs ready for market.',
    color: 'kirevya' as const,
    accent: '#14F195',
    accentLight: '#5EEAD4',
    accentGlow: 'rgba(20, 241, 149, 0.5)',
  },
];

// Neural network particle system
function NeuralParticles({ 
  color, 
  isHovered 
}: { 
  color: string;
  isHovered: boolean;
}) {
  const particleCount = 25;
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));

  // Create connections between nearby particles
  const connections = [];
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 35) {
        connections.push({
          id: `${i}-${j}`,
          x1: particles[i].x,
          y1: particles[i].y,
          x2: particles[j].x,
          y2: particles[j].y,
          opacity: 1 - distance / 35,
        });
      }
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Neural connections */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((conn) => (
          <motion.line
            key={conn.id}
            x1={`${conn.x1}%`}
            y1={`${conn.y1}%`}
            x2={`${conn.x2}%`}
            y2={`${conn.y2}%`}
            stroke={color}
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isHovered ? conn.opacity * 0.6 : conn.opacity * 0.15,
              strokeWidth: isHovered ? 1 : 0.5,
            }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </svg>

      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            boxShadow: `0 0 ${particle.size * 4}px ${color}`,
          }}
          animate={{
            scale: isHovered ? [1, 1.5, 1] : [0.5, 1, 0.5],
            opacity: isHovered ? [0.5, 1, 0.5] : [0.2, 0.4, 0.2],
            x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20],
            y: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Data stream effect
function DataStream({ color, isHovered }: { color: string; isHovered: boolean }) {
  const streams = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: 15 + (i * 14),
    delay: i * 0.3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute w-[2px] h-full"
          style={{ left: `${stream.x}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.3 }}
        >
          <motion.div
            className="w-full h-16 rounded-full"
            style={{
              background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
              boxShadow: `0 0 10px ${color}`,
            }}
            animate={{
              y: ['-100%', '500%'],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: stream.delay,
              ease: 'linear',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// Holographic border effect
function HoloBorder({ color, isHovered }: { color: string; isHovered: boolean }) {
  return (
    <>
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `linear-gradient(90deg, ${color}, transparent, ${color})`,
          backgroundSize: '200% 100%',
          padding: '1px',
        }}
        animate={{
          backgroundPosition: isHovered ? ['0% 0%', '200% 0%'] : '0% 0%',
          opacity: isHovered ? 0.8 : 0.3,
        }}
        transition={{
          backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' },
          opacity: { duration: 0.3 },
        }}
      >
        <div className="absolute inset-[1px] rounded-3xl bg-bg-surface" />
      </motion.div>

      {/* Corner accents */}
      {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map(
        (position, i) => (
          <motion.div
            key={i}
            className={`absolute w-8 h-8 ${position}`}
            style={{
              borderColor: color,
              borderWidth: '2px',
              borderStyle: 'solid',
              borderRadius: i === 0 ? '24px 0 0 0' : i === 1 ? '0 24px 0 0' : i === 2 ? '0 0 0 24px' : '0 0 24px 0',
              borderTopWidth: i < 2 ? '2px' : '0',
              borderBottomWidth: i >= 2 ? '2px' : '0',
              borderLeftWidth: i % 2 === 0 ? '2px' : '0',
              borderRightWidth: i % 2 === 1 ? '2px' : '0',
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          />
        )
      )}
    </>
  );
}

// 3D tilt card wrapper with touch awareness
function TiltCard({
  children,
  feature,
  isHovered,
  onHover,
  onLeave,
}: {
  children: React.ReactNode;
  feature: typeof features[0];
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);
  
  // Hook per spotlight effect - sempre chiamato (regole hooks React)
  const spotlightX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const spotlightY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disabilita tilt 3D su touch devices
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onLeave();
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isTouch ? 0 : rotateX,
        rotateY: isTouch ? 0 : rotateY,
        transformStyle: isTouch ? undefined : 'preserve-3d',
      }}
      className="relative h-full"
    >
      {children}
      
      {/* Spotlight effect following cursor - solo desktop */}
      {!isTouch && (
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${feature.accentGlow}, transparent 40%)`,
            // @ts-ignore - framer-motion supporta MotionValue come CSS custom property
            '--spotlight-x': spotlightX,
            '--spotlight-y': spotlightY,
            opacity: isHovered ? 0.6 : 0,
          }}
        />
      )}
    </motion.div>
  );
}

// Main Feature Card
function FeatureCard({ 
  feature, 
  hoveredId,
  setHoveredId,
}: { 
  feature: typeof features[0];
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}) {
  const isHovered = hoveredId === feature.id;
  const hasHovered = hoveredId !== null;
  const [showContent, setShowContent] = useState(false);
  const Icon = feature.icon;

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <StaggerItem>
      <motion.div
        className="h-full perspective-1000"
        animate={{
          opacity: hasHovered && !isHovered ? 0.6 : 1,
          filter: hasHovered && !isHovered ? 'blur(1px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.4 }}
      >
        <TiltCard
          feature={feature}
          isHovered={isHovered}
          onHover={() => setHoveredId(feature.id)}
          onLeave={() => setHoveredId(null)}
        >
          <div className="relative h-full group">
            {/* Background layers */}
            <div 
              className="absolute inset-0 rounded-3xl"
              style={{
                background: `linear-gradient(135deg, 
                  ${feature.color === 'primary' ? 'rgba(139, 92, 246, 0.08)' : 
                    feature.color === 'synxay' ? 'rgba(168, 85, 247, 0.08)' : 
                    'rgba(20, 241, 149, 0.08)'} 0%, 
                  var(--bg-surface) 50%, 
                  var(--bg-elevated) 100%)`,
              }}
            />

            {/* Neural network particles */}
            <NeuralParticles color={feature.accent} isHovered={isHovered} />
            
            {/* Data streams */}
            <DataStream color={feature.accent} isHovered={isHovered} />

            {/* Holographic border */}
            <HoloBorder color={feature.accent} isHovered={isHovered} />

            {/* Glass overlay */}
            <div 
              className="absolute inset-0 rounded-3xl backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 100%)',
              }}
            />

            {/* Content */}
            <div className="relative z-10 h-full p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                {/* Number with pulse effect */}
                <motion.div
                  className="relative"
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span
                    className="relative z-10 font-mono text-sm font-bold px-4 py-2 rounded-xl"
                    style={{
                      color: feature.accent,
                      background: `${feature.accent}15`,
                      border: `1px solid ${feature.accent}40`,
                    }}
                  >
                    {feature.number}
                  </span>
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{ background: feature.accentGlow }}
                    animate={{
                      scale: isHovered ? [1, 1.5, 1] : 1,
                      opacity: isHovered ? [0.5, 0, 0.5] : 0,
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>

                {/* Icon with orbital ring */}
                <motion.div
                  className="relative"
                  animate={{
                    scale: isHovered ? 1.15 : 1,
                    rotate: isHovered ? 10 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  {/* Orbital ring */}
                  <motion.div
                    className="absolute inset-[-8px] rounded-full border"
                    style={{ borderColor: `${feature.accent}30` }}
                    animate={{
                      rotate: isHovered ? 360 : 0,
                      scale: isHovered ? 1.1 : 1,
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{
                      rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 0.3 },
                      opacity: { duration: 0.3 },
                    }}
                  >
                    <div
                      className="absolute w-2 h-2 rounded-full -top-1 left-1/2 -translate-x-1/2"
                      style={{ background: feature.accent, boxShadow: `0 0 10px ${feature.accent}` }}
                    />
                  </motion.div>

                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${feature.accent}20, ${feature.accent}05)`,
                      border: `1px solid ${feature.accent}30`,
                      boxShadow: isHovered ? `0 0 30px ${feature.accentGlow}` : 'none',
                    }}
                  >
                    <Icon
                      className="w-7 h-7"
                      style={{ color: feature.accent }}
                      strokeWidth={1.5}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Title */}
              <motion.h3
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3"
                style={{ 
                  color: 'var(--text-primary)',
                  textShadow: isHovered ? `0 0 30px ${feature.accentGlow}` : 'none',
                }}
                animate={{
                  color: isHovered ? feature.accentLight : 'var(--text-primary)',
                }}
                transition={{ duration: 0.3 }}
              >
                {feature.title}
              </motion.h3>

              {/* Subtitle - Enhanced visibility */}
              <motion.p
                className="text-sm sm:text-base font-semibold mb-4 sm:mb-5 md:mb-6 tracking-wide"
                style={{
                  color: feature.accent,
                  textShadow: `0 0 20px ${feature.accentGlow}`,
                }}
                animate={{
                  opacity: isHovered ? 1 : 0.85,
                  y: isHovered ? 0 : 2,
                }}
                transition={{ duration: 0.3 }}
              >
                {feature.subtitle}
              </motion.p>

              {/* Description */}
              <motion.p
                className="text-sm sm:text-base leading-relaxed flex-grow"
                style={{ color: 'var(--text-tertiary)' }}
                animate={{
                  color: isHovered ? 'var(--text-secondary)' : 'var(--text-tertiary)',
                }}
                transition={{ duration: 0.3 }}
              >
                {feature.description}
              </motion.p>

              {/* Bottom accent line with animated glow */}
              <motion.div
                className="mt-6 sm:mt-8 h-[2px] rounded-full overflow-hidden"
                style={{ background: `${feature.accent}20` }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)`,
                    boxShadow: `0 0 20px ${feature.accent}`,
                  }}
                  initial={{ x: '-100%', width: '50%' }}
                  animate={{
                    x: isHovered ? ['100%', '-100%'] : '-100%',
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: isHovered ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>

              {/* Hover indicator dots */}
              <div className="flex justify-center gap-2 mt-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: feature.accent }}
                    animate={{
                      scale: isHovered ? [1, 1.5, 1] : 1,
                      opacity: isHovered ? 1 : 0.3,
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: isHovered ? Infinity : 0,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Scan line effect */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="absolute left-0 right-0 h-[2px]"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)`,
                      boxShadow: `0 0 20px ${feature.accent}`,
                    }}
                    animate={{
                      top: ['0%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </TiltCard>
      </motion.div>
    </StaggerItem>
  );
}

export function WhoWeAreSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="who-we-are" className="section relative overflow-hidden">
      {/* Clean elegant background */}
      <div className="absolute inset-0">
        {/* Subtle top gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 100% 50% at 50% 0%, rgba(139, 92, 246, 0.04) 0%, transparent 60%)',
          }}
        />

        {/* Animated grid pattern */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 70%)',
          }}
        />

        {/* Diagonal lines */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 100px,
              rgba(255, 255, 255, 0.006) 100px,
              rgba(255, 255, 255, 0.006) 101px
            )`,
          }}
          animate={{
            backgroundPosition: ['0px 0px', '200px 200px'],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="container relative z-10 px-4 sm:px-6">
        {/* Header with AI Typewriter */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 max-w-4xl mx-auto">
          <FadeInUp>
            <span className="eyebrow mb-4 sm:mb-6 inline-flex">Who We Are</span>
          </FadeInUp>

          <div className="mb-6 sm:mb-8">
            <SectionTypewriter
              text="A vertical venture architect for science-backed innovation"
              highlightWords={['science-backed']}
            />
          </div>

          <FadeInUp delay={0.3}>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-text-tertiary px-4">
              Fyndiax is the{' '}
              <span className="font-semibold text-text-secondary">
                system architect
              </span>{' '}
              at the core of a multi-layer venture ecosystem.
              We start from concrete problems and work with universities, research labs and
              corporate partners to turn them into{' '}
              <span className="font-semibold text-text-secondary">
                validated ventures
              </span>.
            </p>
          </FadeInUp>
        </div>

        {/* Feature Cards - Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
            />
          ))}
        </StaggerChildren>

        {/* Connecting flow visualization - hide on small mobile */}
        <motion.div
          className="mt-10 sm:mt-12 md:mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 sm:gap-4">
            {['#8B5CF6', '#A855F7', '#14F195'].map((color, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 sm:gap-4"
              >
                <motion.div
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                  style={{ 
                    background: color,
                    boxShadow: `0 0 15px ${color}`,
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
                {i < 2 && (
                  <motion.div
                    className="w-8 sm:w-12 md:w-16 h-[2px] rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${color}, ${['#A855F7', '#14F195'][i]})`,
                    }}
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3 + 0.15,
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhoWeAreSection;
