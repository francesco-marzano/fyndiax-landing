'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, Target, Leaf, FlaskConical, Recycle, ArrowRight, ChevronDown } from 'lucide-react';
import { SectionTypewriter } from '../animations/SectionTypewriter';

// ============================================
// DATA
// ============================================

const builders = [
  {
    id: 'synxay',
    name: 'Synxai',
    tagline: 'AI Venture Builder',
    subtitle: 'AI-driven discovery and cultural intelligence',
    description:
      'Synxai is our AI venture builder. It uses AI-driven discovery engines and cultural intelligence platforms to scan emerging patterns, identify real-world problems and generate new data-first ventures. We collaborate with universities, social scientists and corporate innovation teams to transform insights into companies.',
    features: [
      { icon: Sparkles, text: 'AI-based scouting of weak signals and emerging behaviours' },
      { icon: Brain, text: 'Science-informed opportunity mapping in culture, media and society' },
      { icon: Target, text: 'First ventures: cultural intelligence and knowledge platforms' },
    ],
    accentColor: '#A78BFA',
    secondaryColor: '#818CF8',
    gradient: 'from-[#A78BFA] via-[#818CF8] to-[#6366F1]',
  },
  {
    id: 'kirevya',
    name: 'Kirevya',
    tagline: 'Green & Circular Venture Builder',
    subtitle: 'Food, biomaterials & circular manufacturing',
    description:
      'Kirevya connects food & agritech, biomaterials, biotechnology and circular manufacturing to develop regenerative solutions. We work with agrifood research centres, biochemistry labs and industrial partners to move from experimental results to market-ready ventures.',
    features: [
      { icon: Leaf, text: 'Precision food, biomass regeneration' },
      { icon: FlaskConical, text: 'Bio-based materials, circular processes' },
      { icon: Recycle, text: 'Strong collaboration with labs and R&D' },
    ],
    accentColor: '#4ADE80',
    secondaryColor: '#22D3EE',
    gradient: 'from-[#4ADE80] via-[#34D399] to-[#22D3EE]',
  },
];

// ============================================
// HOOKS
// ============================================

function useMediaQuery(query: string): boolean {
  const getMatches = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  }, [query]);

  const [matches, setMatches] = useState(false);

  useEffect(() => {
    setMatches(getMatches());
    
    const media = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [query, getMatches]);

  return matches;
}

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

// ============================================
// MOBILE BUILDER CARD
// ============================================

function MobileBuilderCard({ 
  builder, 
  isExpanded, 
  onToggle 
}: { 
  builder: typeof builders[0]; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        background: `linear-gradient(135deg, ${builder.accentColor}08, transparent 50%, ${builder.secondaryColor}05)`,
        border: `1px solid ${builder.accentColor}20`,
      }}
    >
      {/* Header - Always visible */}
      <button
        onClick={onToggle}
        className="w-full p-5 sm:p-6 flex items-center justify-between text-left"
      >
        <div className="flex-1">
          {/* Tagline */}
          <span 
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase mb-3"
            style={{
              background: `${builder.accentColor}15`,
              color: builder.accentColor,
              border: `1px solid ${builder.accentColor}30`,
            }}
          >
            <span 
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: builder.accentColor }}
            />
            {builder.tagline}
          </span>
          
          {/* Name */}
          <h3
            className={`text-3xl sm:text-4xl font-black bg-gradient-to-r ${builder.gradient} bg-clip-text text-transparent`}
          >
            {builder.name}
          </h3>
          
          {/* Subtitle */}
          <p className="text-sm sm:text-base text-white/50 mt-2">
            {builder.subtitle}
          </p>
        </div>
        
        {/* Toggle indicator */}
        <motion.div
          className="ml-4 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: `${builder.accentColor}15`,
            border: `1px solid ${builder.accentColor}30`,
          }}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5" style={{ color: builder.accentColor }} />
        </motion.div>
      </button>
      
      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-6">
              {/* Description */}
              <p className="text-sm sm:text-base text-white/40 leading-relaxed mb-6">
                {builder.description}
              </p>
              
              {/* Features */}
              <div className="space-y-3">
                {builder.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div 
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${builder.accentColor}20, ${builder.secondaryColor}10)`,
                        border: `1px solid ${builder.accentColor}30`,
                      }}
                    >
                      <feature.icon 
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        style={{ color: builder.accentColor }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="text-white/70 text-sm sm:text-base font-medium pt-2">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              {/* CTA */}
              <motion.button
                className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${builder.accentColor}, ${builder.secondaryColor})`,
                  color: '#000',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Explore {builder.name}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Bottom accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{
          background: `linear-gradient(90deg, transparent, ${builder.accentColor}, transparent)`,
          opacity: isExpanded ? 1 : 0.3,
        }}
      />
    </motion.div>
  );
}

// ============================================
// TABLET BUILDER CARD
// ============================================

function TabletBuilderCard({ 
  builder, 
  isActive, 
  onClick 
}: { 
  builder: typeof builders[0]; 
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer h-full"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      animate={{
        scale: isActive ? 1.02 : 1,
        boxShadow: isActive 
          ? `0 0 40px ${builder.accentColor}30` 
          : '0 0 0px transparent',
      }}
      style={{
        background: `linear-gradient(135deg, ${builder.accentColor}${isActive ? '15' : '08'}, transparent 60%, ${builder.secondaryColor}${isActive ? '10' : '05'})`,
        border: `1px solid ${builder.accentColor}${isActive ? '40' : '20'}`,
      }}
    >
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: `linear-gradient(${builder.accentColor}08 1px, transparent 1px),
                            linear-gradient(90deg, ${builder.accentColor}08 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: isActive ? 0.5 : 0.1,
        }}
      />
      
      <div className="relative z-10 p-5 md:p-6 h-full flex flex-col">
        {/* Tagline */}
        <span 
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase mb-4 self-start"
          style={{
            background: `${builder.accentColor}15`,
            color: builder.accentColor,
            border: `1px solid ${builder.accentColor}30`,
          }}
        >
          <motion.span 
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: builder.accentColor }}
            animate={isActive ? { scale: [1, 1.5, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
          {builder.tagline}
        </span>
        
        {/* Name */}
        <motion.h3
          className={`text-4xl lg:text-5xl font-black bg-gradient-to-r ${builder.gradient} bg-clip-text text-transparent mb-3`}
          animate={{ scale: isActive ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {builder.name}
        </motion.h3>
        
        {/* Subtitle */}
        <p className="text-base text-white/50 mb-4">
          {builder.subtitle}
        </p>
        
        {/* Description - shown when active */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-1"
            >
              <p className="text-sm text-white/40 leading-relaxed mb-4">
                {builder.description}
              </p>
              
              {/* Features - compact */}
              <div className="space-y-2">
                {builder.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <feature.icon 
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: builder.accentColor }}
                      strokeWidth={1.5}
                    />
                    <span className="text-white/60 text-sm">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Tap indicator */}
        <div className="mt-auto pt-4">
          <span 
            className="text-xs text-white/30 font-mono"
            style={{ color: isActive ? builder.accentColor : undefined }}
          >
            {isActive ? '● ACTIVE' : 'TAP TO EXPLORE'}
          </span>
        </div>
      </div>
      
      {/* Bottom accent */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${builder.accentColor}, ${builder.secondaryColor})`,
        }}
        animate={{ opacity: isActive ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// ============================================
// DESKTOP INTERACTIVE SECTION
// ============================================

function DesktopBuildersInteractive() {
  const [activeBuilder, setActiveBuilder] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  
  const leftWidth = useTransform(smoothX, [0, 1], ['70%', '30%']);
  const rightWidth = useTransform(smoothX, [0, 1], ['30%', '70%']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    mouseX.set(x);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    setActiveBuilder(null);
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative h-[65vh] min-h-[550px] lg:h-[70vh] lg:min-h-[600px] flex cursor-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      {builders.map((builder, index) => {
        const isLeft = index === 0;
        const isActive = activeBuilder === builder.id;
        const otherActive = activeBuilder !== null && activeBuilder !== builder.id;
        
        return (
          <motion.div
            key={builder.id}
            className="relative overflow-hidden"
            style={{ 
              width: isLeft ? leftWidth : rightWidth,
            }}
            onMouseEnter={() => setActiveBuilder(builder.id)}
          >
            {/* Background layer */}
            <div 
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                background: `linear-gradient(${isLeft ? '135deg' : '225deg'}, 
                  ${builder.accentColor}08 0%, 
                  transparent 50%,
                  ${builder.secondaryColor}05 100%)`,
                opacity: isActive ? 1 : 0.3,
              }}
            />

            {/* Animated gradient orb */}
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${builder.accentColor}20 0%, transparent 70%)`,
                left: isLeft ? '-20%' : 'auto',
                right: isLeft ? 'auto' : '-20%',
                top: '10%',
              }}
              animate={{
                scale: isActive ? 1.3 : 1,
                opacity: isActive ? 1 : 0.5,
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />

            {/* Grid pattern */}
            <div 
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                backgroundImage: `linear-gradient(${builder.accentColor}08 1px, transparent 1px),
                                  linear-gradient(90deg, ${builder.accentColor}08 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
                opacity: isActive ? 0.5 : 0.1,
              }}
            />

            {/* Vertical separator line */}
            {!isLeft && (
              <div 
                className="absolute left-0 top-0 bottom-0 w-px"
                style={{
                  background: `linear-gradient(180deg, transparent, ${activeBuilder === 'synxay' ? builders[0].accentColor : activeBuilder === 'kirevya' ? builders[1].accentColor : 'rgba(255,255,255,0.1)'}40, transparent)`,
                }}
              />
            )}

            {/* Content */}
            <div className={`relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 ${isLeft ? 'items-start' : 'items-end'}`}>
              {/* Tagline pill */}
              <motion.div
                className="mb-6"
                animate={{ 
                  opacity: otherActive ? 0.3 : 1,
                  x: isActive ? 0 : (isLeft ? -20 : 20),
                }}
                transition={{ duration: 0.5 }}
              >
                <span 
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase"
                  style={{
                    background: `${builder.accentColor}15`,
                    color: builder.accentColor,
                    border: `1px solid ${builder.accentColor}30`,
                  }}
                >
                  <motion.span 
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: builder.accentColor }}
                    animate={{ scale: isActive ? [1, 1.5, 1] : 1 }}
                    transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                  />
                  {builder.tagline}
                </span>
              </motion.div>

              {/* Name */}
              <motion.h3
                className={`text-6xl md:text-8xl lg:text-9xl font-black mb-4 bg-gradient-to-r ${builder.gradient} bg-clip-text text-transparent ${isLeft ? 'text-left' : 'text-right'}`}
                animate={{ 
                  opacity: otherActive ? 0.2 : 1,
                  scale: isActive ? 1.05 : 1,
                  x: isActive ? 0 : (isLeft ? -30 : 30),
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {builder.name}
              </motion.h3>

              {/* Subtitle */}
              <motion.p
                className={`text-xl md:text-2xl text-white/60 mb-8 max-w-md ${isLeft ? 'text-left' : 'text-right'}`}
                animate={{ 
                  opacity: isActive ? 1 : 0.4,
                  y: isActive ? 0 : 10,
                }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {builder.subtitle}
              </motion.p>

              {/* Description - only visible when active */}
              <motion.p
                className={`text-base text-white/40 mb-10 max-w-lg leading-relaxed ${isLeft ? 'text-left' : 'text-right'}`}
                animate={{ 
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 20,
                }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                {builder.description}
              </motion.p>

              {/* Features */}
              <motion.div 
                className={`space-y-4 ${isLeft ? 'items-start' : 'items-end'} flex flex-col`}
                animate={{ 
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : (isLeft ? -40 : 40),
                }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {builder.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    className={`flex items-center gap-4 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0,
                      x: isActive ? 0 : (isLeft ? -30 : 30),
                    }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  >
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                      style={{
                        background: `linear-gradient(135deg, ${builder.accentColor}20, ${builder.secondaryColor}10)`,
                        border: `1px solid ${builder.accentColor}30`,
                      }}
                    >
                      <feature.icon 
                        className="w-5 h-5"
                        style={{ color: builder.accentColor }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="text-white/70 text-sm md:text-base font-medium">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.button
                className={`mt-10 group flex items-center gap-3 px-6 py-3 rounded-full text-sm font-semibold transition-all ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                style={{
                  background: isActive ? `linear-gradient(135deg, ${builder.accentColor}, ${builder.secondaryColor})` : 'transparent',
                  color: isActive ? '#000' : builder.accentColor,
                  border: `2px solid ${builder.accentColor}`,
                }}
                animate={{ 
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 20,
                }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Explore {builder.name}</span>
                <ArrowRight className={`w-4 h-4 transition-transform ${isLeft ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1 rotate-180'}`} />
              </motion.button>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute bottom-0 w-full h-32 pointer-events-none"
              style={{
                background: `linear-gradient(to top, ${builder.accentColor}10, transparent)`,
              }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        );
      })}

      {/* Center indicator */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
        animate={{ 
          opacity: activeBuilder === null ? 1 : 0,
          scale: activeBuilder === null ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <motion.div
            className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm bg-white/5"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute w-2 h-2 rounded-full bg-[#A78BFA] top-2 left-1/2 -translate-x-1/2" />
            <div className="absolute w-2 h-2 rounded-full bg-[#4ADE80] bottom-2 left-1/2 -translate-x-1/2" />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/40 text-xs font-mono">HOVER</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function BuildersSection() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isTouch = useIsTouchDevice();
  
  // For mobile: accordion-style expansion
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>(null);
  
  // For tablet: toggle active card
  const [activeTabletId, setActiveTabletId] = useState<string | null>(null);

  return (
    <section id="builders" className="relative min-h-screen overflow-hidden bg-[#030305]">
      {/* Clean dark background */}
      <div className="absolute inset-0">
        {/* Subtle center gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)',
          }}
        />
        
        {/* Animated diagonal lines */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 100px,
              rgba(255, 255, 255, 0.004) 100px,
              rgba(255, 255, 255, 0.004) 101px
            )`,
          }}
          animate={{
            backgroundPosition: ['0px 0px', '200px 200px'],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-20 pt-20 sm:pt-24 md:pt-32 pb-8 sm:pb-12 md:pb-16 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-mono font-semibold tracking-wider uppercase mb-6 sm:mb-8 bg-white/5 border border-white/10 text-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#4ADE80]" />
            Venture Builders
          </span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <SectionTypewriter 
            text="Two engines of thematic innovation"
            highlightWords={['thematic', 'innovation']}
          />
        </motion.div>
        
        <motion.p
          className="text-sm sm:text-base md:text-lg text-white/40 max-w-xl mx-auto mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {isMobile || isTouch 
            ? 'Tap to explore our specialized venture builders.'
            : 'Explore our specialized venture builders. Hover to discover.'}
        </motion.p>
      </div>

      {/* Responsive Content */}
      {isMobile ? (
        // Mobile: Vertical accordion cards
        <div className="relative z-10 px-4 pb-8 space-y-4">
          {builders.map((builder) => (
            <MobileBuilderCard
              key={builder.id}
              builder={builder}
              isExpanded={expandedMobileId === builder.id}
              onToggle={() => setExpandedMobileId(
                expandedMobileId === builder.id ? null : builder.id
              )}
            />
          ))}
        </div>
      ) : isTablet || isTouch ? (
        // Tablet or touch device: Side-by-side tap cards
        <div className="relative z-10 px-4 pb-8">
          <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
            {builders.map((builder) => (
              <TabletBuilderCard
                key={builder.id}
                builder={builder}
                isActive={activeTabletId === builder.id}
                onClick={() => setActiveTabletId(
                  activeTabletId === builder.id ? null : builder.id
                )}
              />
            ))}
          </div>
        </div>
      ) : (
        // Desktop: Interactive split screen
        <DesktopBuildersInteractive />
      )}

      {/* Bottom stats bar */}
      <motion.div
        className="relative z-20 py-8 sm:py-10 md:py-12 border-t border-white/5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-24">
            {[
              { value: '2', label: 'Venture Builders' },
              { value: '6+', label: 'Core Capabilities' },
              { value: '∞', label: 'Possibilities' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-white/40 font-mono uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default BuildersSection;
