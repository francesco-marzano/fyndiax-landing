'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { FadeInUp } from '../animations';
import { SectionTypewriter } from '../animations/SectionTypewriter';

const ventures = [
  {
    id: 'cultray',
    name: 'Cultray',
    builder: 'Synxay',
    category: 'AI & Culture',
    description: 'AI-powered cultural intelligence platform that helps organisations map narratives, cultures and emerging behaviours. Built with researchers and domain experts, it turns complex cultural signals into actionable insights for strategy, media and product design.',
    color: 'synxay',
    size: 'large',
  },
  {
    id: 'mavyeda',
    name: 'Mavyeda',
    builder: 'Kirevya',
    category: 'Precision Food',
    description: 'Science-backed nutrition from everyday salads. Mavyeda develops fresh, biofortified salads and food products enriched with proteins, vitamin B12 and key micronutrients to tackle hidden hunger and redefine daily nutrition.',
    color: 'kirevya',
    size: 'medium',
  },
  {
    id: 'bloomind',
    name: 'Bloomind',
    builder: 'Kirevya',
    category: 'Smart Design & Water Saving',
    description: 'Smart vessels for sustainable wellbeing. Bloomind merges nature, design and smart technology to create plant vessels that optimise water use and microclimates, bringing regenerative experiences into homes, offices and hospitality spaces.',
    color: 'kirevya',
    size: 'medium',
  },
  {
    id: 'regena',
    name: 'Regena',
    builder: 'Kirevya',
    category: 'Biomass Regeneration',
    description: 'Regenerative biotech for biomass. Regena develops microalgae-based solutions and bioreactors that convert industrial by-products into high-value resources for nutraceuticals, superfoods and sustainable materials.',
    color: 'kirevya',
    size: 'small',
  },
  {
    id: 'transwood',
    name: 'TransWood',
    builder: 'Kirevya',
    category: 'Circular Manufacturing',
    description: 'Biotransparent materials for greenhouses and building. TransWood is an innovative, biotransparent material designed to improve light performance and energy efficiency in greenhouses and building components.',
    color: 'kirevya',
    size: 'wide',
  },
];

// Clean elegant background for Ventures
function VenturesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep dark base */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #030305 0%, #050508 50%, #030305 100%)',
        }}
      />

      {/* Subtle top gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 100% 50% at 50% 0%, rgba(139, 92, 246, 0.025) 0%, transparent 50%)',
        }}
      />

      {/* Animated diagonal lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 80px,
            rgba(255, 255, 255, 0.005) 80px,
            rgba(255, 255, 255, 0.005) 81px
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

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.12), rgba(0, 212, 255, 0.15), rgba(139, 92, 246, 0.12), transparent)',
        }}
        animate={{
          top: ['0%', '100%'],
          opacity: [0, 0.6, 0.6, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

export function VenturesSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="ventures" className="section relative overflow-hidden">
      {/* Dynamic Dark Background */}
      <VenturesBackground />

      <div className="container relative z-10 px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
          <div className="max-w-3xl">
            <FadeInUp>
              <span className="eyebrow mb-4 sm:mb-6 inline-flex">Ventures</span>
            </FadeInUp>
            
            <FadeInUp delay={0.1}>
              <SectionTypewriter 
                text="A growing portfolio of thematic ventures"
                highlightWords={['thematic', 'ventures']}
              />
            </FadeInUp>
          </div>

          <FadeInUp delay={0.2}>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative">
                <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-text-primary leading-none">
                  5
                </div>
                <motion.div 
                  className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2"
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent-primary" />
                </motion.div>
              </div>
              <div className="text-sm sm:text-base md:text-lg text-text-tertiary leading-tight">
                Active<br />Ventures
              </div>
            </div>
          </FadeInUp>
        </div>

        {/* Ventures Directory List */}
        <div className="relative">
          {/* Top border */}
          <motion.div 
            className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {ventures.map((venture, index) => {
            const isHovered = hoveredId === venture.id;
            const isActive = activeId === venture.id;
            const accentColor = venture.color === 'synxay' 
              ? 'var(--accent-synxay)' 
              : 'var(--accent-kirevya)';
            const glowColor = venture.color === 'synxay'
              ? 'rgba(168, 85, 247, 0.3)'
              : 'rgba(20, 241, 149, 0.3)';

            return (
              <motion.div
                key={venture.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredId(venture.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveId(isActive ? null : venture.id)}
                >
                  {/* Background glow on hover */}
                  <motion.div
                    className="absolute inset-0 -mx-2 sm:-mx-4 md:-mx-8 rounded-xl sm:rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: isHovered ? 1 : 0,
                      background: `radial-gradient(ellipse 100% 100% at 50% 50%, ${glowColor} 0%, transparent 70%)`
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Content */}
                  <div className="relative py-5 sm:py-6 md:py-8 lg:py-10">
                    {/* Main row */}
                    <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:gap-8">
                      {/* Top row on mobile: Index + Name */}
                      <div className="flex items-center gap-3 sm:gap-4 lg:gap-8 lg:flex-1">
                        {/* Index number */}
                        <motion.div 
                          className="font-mono text-xs sm:text-sm text-text-muted w-8 sm:w-10 lg:w-12 shrink-0"
                          animate={{ 
                            color: isHovered || isActive ? accentColor : 'var(--text-muted)',
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </motion.div>

                        {/* Name - Responsive Typography */}
                        <motion.h3 
                          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight flex-1 leading-[0.95]"
                          animate={{ 
                            color: isHovered || isActive ? '#FFFFFF' : 'var(--text-secondary)',
                            x: isHovered ? 4 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {venture.name}
                        </motion.h3>

                        {/* Arrow - hidden on mobile, shown on lg+ inline */}
                        <motion.div
                          className="hidden lg:flex w-10 h-10 xl:w-12 xl:h-12 rounded-full items-center justify-center shrink-0"
                          style={{
                            background: venture.color === 'synxay'
                              ? 'rgba(168, 85, 247, 0.1)'
                              : 'rgba(20, 241, 149, 0.1)',
                            border: `1px solid ${venture.color === 'synxay' 
                              ? 'rgba(168, 85, 247, 0.2)' 
                              : 'rgba(20, 241, 149, 0.2)'}`,
                          }}
                          animate={{
                            scale: isHovered ? 1.1 : 1,
                            rotate: isHovered ? 45 : 0,
                            background: isHovered 
                              ? venture.color === 'synxay'
                                ? 'rgba(168, 85, 247, 0.2)'
                                : 'rgba(20, 241, 149, 0.2)'
                              : venture.color === 'synxay'
                                ? 'rgba(168, 85, 247, 0.1)'
                                : 'rgba(20, 241, 149, 0.1)',
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowUpRight 
                            className="w-4 h-4 xl:w-5 xl:h-5"
                            style={{ color: accentColor }}
                          />
                        </motion.div>
                      </div>

                      {/* Bottom row on mobile: Category & Builder */}
                      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 ml-11 sm:ml-14 lg:ml-0 shrink-0 flex-wrap">
                        <motion.span 
                          className="text-xs sm:text-sm md:text-base font-medium"
                          animate={{ color: isHovered || isActive ? accentColor : 'var(--text-tertiary)' }}
                          transition={{ duration: 0.3 }}
                        >
                          {venture.category}
                        </motion.span>

                        <span 
                          className="px-2 py-1 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider"
                          style={{
                            background: venture.color === 'synxay'
                              ? 'rgba(168, 85, 247, 0.15)'
                              : 'rgba(20, 241, 149, 0.15)',
                            color: accentColor,
                            border: `1px solid ${venture.color === 'synxay' 
                              ? 'rgba(168, 85, 247, 0.3)' 
                              : 'rgba(20, 241, 149, 0.3)'}`,
                          }}
                        >
                          {venture.builder}
                        </span>

                        {/* Arrow - shown only on mobile/tablet */}
                        <motion.div
                          className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center ml-auto"
                          style={{
                            background: venture.color === 'synxay'
                              ? 'rgba(168, 85, 247, 0.1)'
                              : 'rgba(20, 241, 149, 0.1)',
                            border: `1px solid ${venture.color === 'synxay' 
                              ? 'rgba(168, 85, 247, 0.2)' 
                              : 'rgba(20, 241, 149, 0.2)'}`,
                          }}
                          animate={{
                            rotate: isActive ? 90 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowUpRight 
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                            style={{ color: accentColor }}
                          />
                        </motion.div>
                      </div>
                    </div>

                    {/* Description - Reveals on hover/click */}
                    <AnimatePresence>
                      {(isHovered || isActive) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 sm:pt-5 md:pt-6 lg:pt-8 ml-11 sm:ml-14 lg:ml-0 lg:pl-20">
                            <motion.p 
                              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-text-secondary max-w-3xl leading-relaxed font-light"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: 20, opacity: 0 }}
                              transition={{ duration: 0.4, delay: 0.1 }}
                            >
                              {venture.description}
                            </motion.p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Bottom border with animation */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{
                      background: isHovered || isActive
                        ? `linear-gradient(90deg, transparent, ${accentColor}, transparent)`
                        : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                    }}
                    animate={{
                      opacity: isHovered || isActive ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <FadeInUp delay={0.5}>
          <motion.p 
            className="text-center mt-10 sm:mt-12 md:mt-16 lg:mt-20 text-sm sm:text-base md:text-lg text-text-muted px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            + More ventures in development. New AI and green ventures are currently in research 
            and validation, in collaboration with our academic and corporate partners.
          </motion.p>
        </FadeInUp>
      </div>
    </section>
  );
}

export default VenturesSection;
