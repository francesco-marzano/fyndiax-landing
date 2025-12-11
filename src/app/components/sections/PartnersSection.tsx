'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Building2, GraduationCap, Wallet, Zap, ArrowRight } from 'lucide-react';
import { FadeInUp } from '../animations';
import { SectionTypewriter } from '../animations/SectionTypewriter';

// ============================================
// PARTNER DATA
// ============================================

const partners = [
  {
    id: 'corporates',
    icon: Building2,
    title: 'Corporates & Industrial Groups',
    shortTitle: 'Corporates',
    description: 'Innovation, R&D and strategy teams seeking AI, food & agritech, and biomaterials ventures.',
    accent: '#A855F7',
    accentRgb: '168, 85, 247',
    angle: -30, // degrees from center
  },
  {
    id: 'universities',
    icon: GraduationCap,
    title: 'Universities & Research Centres',
    shortTitle: 'Academia',
    description: 'Labs transforming research, IP and experiments into validated commercial ventures.',
    accent: '#00D4FF',
    accentRgb: '0, 212, 255',
    angle: 0,
  },
  {
    id: 'investors',
    icon: Wallet,
    title: 'Investors & Family Offices',
    shortTitle: 'Investors',
    description: 'Early-stage investors seeking architect–builder–venture ecosystem exposure.',
    accent: '#14F195',
    accentRgb: '20, 241, 149',
    angle: 30,
  },
];

const collaborationItems = [
  {
    id: 'mapping',
    number: '01',
    title: 'Problem & Opportunity Mapping',
    content: 'We start from the real problems of your industry or research field, and we frame them as thematic venture opportunities. Our AI-driven tools help identify patterns and weak signals that point to emerging market needs.',
    icon: '🔍',
  },
  {
    id: 'validation',
    number: '02',
    title: 'Science-backed Validation',
    content: 'Together with labs and scientific partners, we validate hypotheses, technologies and impact before scaling. We ensure every venture thesis is grounded in solid research and real-world evidence.',
    icon: '🧬',
  },
  {
    id: 'programs',
    number: '03',
    title: 'Co-building Programmes',
    content: 'We design joint programmes with universities and corporates to explore, prototype and launch new ventures. These structured programmes align incentives and accelerate time-to-market.',
    icon: '🚀',
  },
  {
    id: 'governance',
    number: '04',
    title: 'Investment & Governance',
    content: 'We structure aligned governance and investment models so every partner shares both risk and upside. Our transparent approach ensures long-term collaboration and sustainable growth.',
    icon: '⚖️',
  },
];

// ============================================
// ENERGY BEAM COMPONENT - Animated flowing beam
// ============================================

function EnergyBeam({ 
  partner, 
  index,
  isHovered,
  onHover,
}: { 
  partner: typeof partners[0];
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}) {
  const Icon = partner.icon;
  
  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => onHover(partner.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Main Card Container */}
      <motion.div
        className="relative overflow-hidden rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 h-full min-h-[240px] sm:min-h-[260px] md:min-h-[280px]"
        style={{
          background: `linear-gradient(135deg, rgba(12, 12, 18, 0.95) 0%, rgba(18, 18, 28, 0.9) 100%)`,
          border: `1px solid rgba(${partner.accentRgb}, ${isHovered ? 0.5 : 0.15})`,
          boxShadow: isHovered 
            ? `0 0 60px rgba(${partner.accentRgb}, 0.3), inset 0 0 40px rgba(${partner.accentRgb}, 0.05)` 
            : 'none',
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
          y: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(${partner.accentRgb}, 0.15) 0%, transparent 70%)`,
          }}
        />

        {/* Scanning Line Animation */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${partner.accent}, transparent)`,
          }}
          animate={isHovered ? {
            y: [0, 280, 0],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Top Border Glow */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${partner.accent} 50%, transparent 100%)`,
          }}
          animate={{
            opacity: isHovered ? [0.5, 1, 0.5] : 0.3,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon Container */}
          <motion.div
            className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6"
            style={{
              background: `rgba(${partner.accentRgb}, 0.1)`,
              border: `1px solid rgba(${partner.accentRgb}, 0.3)`,
            }}
            animate={{
              scale: isHovered ? 1.1 : 1,
              boxShadow: isHovered 
                ? `0 0 30px rgba(${partner.accentRgb}, 0.5)` 
                : `0 0 0px rgba(${partner.accentRgb}, 0)`,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Rotating Ring - hide on mobile */}
            <motion.div
              className="absolute inset-[-4px] rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 hidden sm:block"
              style={{
                border: `1px dashed rgba(${partner.accentRgb}, 0.5)`,
              }}
              animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Pulse Ring */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 rounded-lg sm:rounded-xl hidden sm:block"
                  style={{
                    border: `2px solid ${partner.accent}`,
                  }}
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </AnimatePresence>

            <Icon 
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-all duration-300"
              style={{ color: partner.accent }}
              strokeWidth={1.5}
            />
          </motion.div>

          {/* Title */}
          <motion.h4 
            className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-4 transition-colors duration-300"
            style={{ 
              color: isHovered ? partner.accent : 'var(--text-primary)',
            }}
          >
            {partner.title}
          </motion.h4>

          {/* Description */}
          <p className="text-text-tertiary text-sm sm:text-[15px] leading-relaxed">
            {partner.description}
          </p>

          {/* Bottom Indicator */}
          <motion.div
            className="mt-4 sm:mt-5 md:mt-6 flex items-center gap-2 text-xs sm:text-sm font-medium"
            style={{ color: partner.accent }}
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
              Learn more
            </span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        </div>

        {/* Corner Accents */}
        <div 
          className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-sm transition-all duration-300"
          style={{ 
            borderColor: isHovered ? partner.accent : `rgba(${partner.accentRgb}, 0.2)`,
            boxShadow: isHovered ? `0 0 10px ${partner.accent}` : 'none',
          }}
        />
        <div 
          className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 rounded-tr-sm transition-all duration-300"
          style={{ 
            borderColor: isHovered ? partner.accent : `rgba(${partner.accentRgb}, 0.2)`,
            boxShadow: isHovered ? `0 0 10px ${partner.accent}` : 'none',
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 rounded-bl-sm transition-all duration-300"
          style={{ 
            borderColor: isHovered ? partner.accent : `rgba(${partner.accentRgb}, 0.2)`,
            boxShadow: isHovered ? `0 0 10px ${partner.accent}` : 'none',
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-sm transition-all duration-300"
          style={{ 
            borderColor: isHovered ? partner.accent : `rgba(${partner.accentRgb}, 0.2)`,
            boxShadow: isHovered ? `0 0 10px ${partner.accent}` : 'none',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ============================================
// CONVERGENCE HUB VISUAL
// ============================================

function ConvergenceVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  
  // Generate particles with deterministic pseudo-random offsets based on index
  const particles = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => {
      // Deterministic pseudo-random using sine function
      const pseudoRandomX = Math.sin(i * 12.9898) * 43758.5453 % 1;
      const pseudoRandomY = Math.sin(i * 78.233) * 43758.5453 % 1;
      return {
        id: i,
        color: partners[i % 3].accent,
        delay: i * 0.1,
        duration: 3 + (i % 3),
        size: 2 + (i % 4),
        path: i % 3,
        offsetX: (pseudoRandomX - 0.5) * 100,
        offsetY: (pseudoRandomY - 0.5) * 50,
      };
    }),
  []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* Center Glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
        }}
        animate={isInView ? {
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Animated Particles */}
      {isInView && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            left: '50%',
            top: '50%',
          }}
          initial={{ 
            x: 0, 
            y: 0,
            opacity: 0,
          }}
          animate={{
            x: [
              0,
              (particle.path === 0 ? -200 : particle.path === 1 ? 0 : 200) + particle.offsetX,
            ],
            y: [
              0,
              (particle.path === 0 ? -100 : particle.path === 1 ? -150 : -100) + particle.offsetY,
            ],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Energy Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          {partners.map((p) => (
            <linearGradient key={p.id} id={`grad-${p.id}`} x1="50%" y1="50%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={p.accent} stopOpacity="0" />
              <stop offset="100%" stopColor={p.accent} stopOpacity="0.5" />
            </linearGradient>
          ))}
        </defs>
        
        {isInView && (
          <>
            {/* Left beam */}
            <motion.path
              d="M 50% 50% Q 30% 40% 10% 20%"
              fill="none"
              stroke="url(#grad-corporates)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
            />
            {/* Center beam */}
            <motion.path
              d="M 50% 50% L 50% 10%"
              fill="none"
              stroke="url(#grad-universities)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.4 }}
            />
            {/* Right beam */}
            <motion.path
              d="M 50% 50% Q 70% 40% 90% 20%"
              fill="none"
              stroke="url(#grad-investors)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.6 }}
            />
          </>
        )}
      </svg>
    </div>
  );
}

// ============================================
// DNA HELIX STEP COMPONENT
// ============================================

function HelixStep({ 
  item, 
  index,
  isActive, 
  onHover,
  isLast,
}: { 
  item: typeof collaborationItems[0]; 
  index: number;
  isActive: boolean;
  onHover: (id: string | null) => void;
  isLast: boolean;
}) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Connection Line to Next */}
      {!isLast && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-full w-[2px] h-20"
          style={{
            background: isActive 
              ? 'linear-gradient(180deg, var(--accent-primary), rgba(139, 92, 246, 0.1))'
              : 'linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))',
          }}
        >
          {/* Flowing Energy Animation */}
          {isActive && (
            <motion.div
              className="absolute top-0 left-0 right-0 h-4 rounded-full"
              style={{
                background: 'linear-gradient(180deg, var(--accent-primary), transparent)',
                boxShadow: '0 0 10px var(--accent-primary)',
              }}
              animate={{ y: [0, 80, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </motion.div>
      )}

      <motion.div
        onMouseEnter={() => onHover(item.id)}
        onMouseLeave={() => onHover(null)}
        className={`
          relative w-full text-left rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8
          transition-all duration-500 cursor-pointer
          ${isActive 
            ? 'bg-gradient-to-br from-[rgba(139,92,246,0.15)] to-transparent border-accent-primary/40' 
            : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1]'}
          border overflow-hidden group
        `}
      >
        {/* Active State Background Effects */}
        {isActive && (
          <>
            {/* Glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Corner Pulse */}
            <motion.div
              className="absolute top-0 left-0 w-24 h-24"
              style={{
                background: 'radial-gradient(circle at 0% 0%, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </>
        )}

        <div className="relative z-10 flex items-start gap-3 sm:gap-4 md:gap-6">
          {/* Number Badge */}
          <motion.div
            className={`
              relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl flex items-center justify-center
              font-mono text-base sm:text-lg font-bold transition-all duration-300
              ${isActive 
                ? 'bg-accent-primary/20 text-accent-primary border-accent-primary/50' 
                : 'bg-white/[0.05] text-text-muted border-white/[0.1]'}
              border
            `}
            animate={isActive ? {
              boxShadow: ['0 0 0px rgba(139, 92, 246, 0)', '0 0 30px rgba(139, 92, 246, 0.5)', '0 0 0px rgba(139, 92, 246, 0)'],
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Inner Glow Ring */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-accent-primary"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1.3, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            
            <span className="text-lg sm:text-xl md:text-2xl">{item.icon}</span>
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
              <span 
                className={`
                  font-mono text-[10px] sm:text-xs tracking-wider uppercase transition-colors duration-300
                  ${isActive ? 'text-accent-primary' : 'text-text-muted'}
                `}
              >
                Phase {item.number}
              </span>
              
              {/* Status Indicator */}
              <motion.div
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${isActive ? 'bg-accent-primary' : 'bg-white/20'}
                `}
                animate={isActive ? {
                  scale: [1, 1.5, 1],
                  boxShadow: ['0 0 0px var(--accent-primary)', '0 0 12px var(--accent-primary)', '0 0 0px var(--accent-primary)'],
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>

            <h4 
              className={`
                text-base sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2 transition-colors duration-300
                ${isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}
              `}
            >
              {item.title}
            </h4>

            <AnimatePresence mode="wait">
              {isActive && (
                <motion.p
                  className="text-text-tertiary text-[15px] leading-relaxed"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.content}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Expand Hint */}
            {!isActive && (
              <motion.span 
                className="text-text-muted text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ y: 5 }}
                animate={{ y: 0 }}
              >
                Click to expand →
              </motion.span>
            )}
          </div>

          {/* Active Indicator Arrow */}
          <motion.div
            className={`
              flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center
              transition-all duration-300
              ${isActive 
                ? 'bg-accent-primary/20 rotate-90' 
                : 'bg-white/[0.05] group-hover:bg-white/[0.08]'}
            `}
          >
            <Zap 
              className={`
                w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300
                ${isActive ? 'text-accent-primary' : 'text-text-muted'}
              `}
              strokeWidth={1.5}
            />
          </motion.div>
        </div>

        {/* Bottom Progress Line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
          }}
          initial={{ width: 0 }}
          animate={{ width: isActive ? '100%' : '0%' }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}

// ============================================
// MAIN PARTNERS SECTION
// ============================================

export function PartnersSection() {
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={sectionRef}
      id="partners" 
      className="section relative overflow-hidden"
    >
      {/* Clean elegant background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle top glow */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 100% 50% at 50% 0%, rgba(139, 92, 246, 0.025) 0%, transparent 50%)',
          }}
        />
        
        {/* Grid Pattern - very subtle */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 70%)',
          }}
        />

        {/* Animated diagonals */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 100px,
              rgba(255, 255, 255, 0.005) 100px,
              rgba(255, 255, 255, 0.005) 101px
            )`,
          }}
          animate={{
            backgroundPosition: ['0px 0px', '200px 200px'],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="container relative z-10 px-4 sm:px-6">
        {/* ============================================
            SECTION 1: WHO WE WORK WITH
            ============================================ */}
        <div className="mb-20 sm:mb-24 md:mb-32">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16 max-w-3xl mx-auto">
            <FadeInUp>
              <span className="eyebrow mb-4 sm:mb-6 inline-flex">Partners</span>
            </FadeInUp>
            
            <FadeInUp delay={0.1}>
              <SectionTypewriter 
                text="Where science, industry and venture building meet"
                highlightWords={['venture', 'building']}
                className="mb-4 sm:mb-6"
              />
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <p className="text-base sm:text-lg text-text-tertiary leading-relaxed px-4">
                We unite the forces that drive deep-tech innovation: visionary corporates, 
                breakthrough research, and strategic capital.
              </p>
            </FadeInUp>
          </div>

          {/* Partner Cards - Convergence Grid */}
          <div className="relative">
            {/* Visual Convergence Element - Only on larger screens */}
            <div className="hidden lg:block">
              <ConvergenceVisual />
            </div>

            {/* Partner Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {partners.map((partner, index) => (
                <EnergyBeam
                  key={partner.id}
                  partner={partner}
                  index={index}
                  isHovered={hoveredPartner === partner.id}
                  onHover={setHoveredPartner}
                />
              ))}
            </div>

          </div>
        </div>

        {/* ============================================
            SECTION 2: HOW WE COLLABORATE
            ============================================ */}
        <div>
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16 max-w-3xl mx-auto">
            <FadeInUp>
              <span className="eyebrow mb-4 sm:mb-6 inline-flex">Process</span>
            </FadeInUp>
            
            <FadeInUp delay={0.1}>
              <SectionTypewriter 
                text="How we collaborate"
                highlightWords={['collaborate']}
                className="mb-4 sm:mb-6"
              />
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <p className="text-base sm:text-lg text-text-tertiary leading-relaxed px-4">
                A structured approach that transforms ideas into market-ready ventures 
                through scientific validation and aligned partnerships.
              </p>
            </FadeInUp>
          </div>

          {/* Helix Steps */}
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4 sm:space-y-6">
              {collaborationItems.map((item, index) => (
                <HelixStep
                  key={item.id}
                  item={item}
                  index={index}
                  isActive={activeStep === item.id}
                  onHover={setActiveStep}
                  isLast={index === collaborationItems.length - 1}
                />
              ))}
            </div>

            {/* Progress Indicator */}
            <FadeInUp delay={0.6}>
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-3">
                  {collaborationItems.map((item) => (
                    <motion.div
                      key={item.id}
                      onMouseEnter={() => setActiveStep(item.id)}
                      onMouseLeave={() => setActiveStep(null)}
                      className={`
                        relative w-12 h-1.5 rounded-full transition-all duration-300 overflow-hidden cursor-pointer
                        ${activeStep === item.id ? 'bg-accent-primary/30' : 'bg-white/10'}
                      `}
                      whileHover={{ scale: 1.1 }}
                    >
                      {activeStep === item.id && (
                        <motion.div
                          className="absolute inset-0 bg-accent-primary rounded-full"
                          layoutId="activeStep"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PartnersSection;
