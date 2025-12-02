'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, FlaskConical, Cpu } from 'lucide-react';
import { FadeInUp } from '../animations';
import { SectionTypewriter } from '../animations/SectionTypewriter';

const timelineItems = [
  {
    number: '01',
    icon: Target,
    title: 'Real Problems First',
    description:
      'We start from real-world challenges in food systems, health, materials, climate and culture — not from abstract ideas. Every venture thesis is grounded in concrete industry needs.',
    color: 'primary',
  },
  {
    number: '02',
    icon: FlaskConical,
    title: 'Science + Execution',
    description:
      'Our ventures are built on research and lab results, co-developed with universities and validated with corporate partners. We bridge the gap between scientific discovery and market impact.',
    color: 'synxay',
  },
  {
    number: '03',
    icon: Cpu,
    title: 'AI as a System Layer',
    description:
      'AI helps us scan signals, model opportunities, and de-risk venture creation across our builders and startups. It\'s woven into every layer of our architecture.',
    color: 'kirevya',
  },
];

// Hook per media query
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

// Mobile Timeline Item
function MobileTimelineItem({ item, index }: { item: typeof timelineItems[0]; index: number }) {
  const accentColor = item.color === 'primary' 
    ? 'rgba(129,140,248'
    : item.color === 'synxay'
    ? 'rgba(167,139,250'
    : 'rgba(74,222,128';
    
  const cssColor = item.color === 'primary' 
    ? 'var(--accent-primary)'
    : item.color === 'synxay'
    ? 'var(--accent-synxay)'
    : 'var(--accent-kirevya)';

  return (
    <motion.div
      className="relative flex gap-4 sm:gap-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Left side: Icon Node + Line */}
      <div className="flex flex-col items-center">
        {/* Icon Node */}
        <motion.div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 z-10"
          style={{
            background: `linear-gradient(135deg, ${accentColor},0.2), ${accentColor},0.05))`,
            border: `1px solid ${accentColor},0.3)`,
            backdropFilter: 'blur(10px)',
          }}
          whileInView={{
            boxShadow: `0 0 25px ${accentColor},0.4)`,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <item.icon 
            className="w-5 h-5 sm:w-6 sm:h-6"
            style={{ color: cssColor }}
            strokeWidth={1.5}
          />
        </motion.div>
        
        {/* Connecting Line */}
        {index < timelineItems.length - 1 && (
          <div 
            className="w-0.5 flex-1 min-h-[80px] mt-3"
            style={{
              background: `linear-gradient(to bottom, ${accentColor},0.5), ${accentColor},0.1))`,
            }}
          />
        )}
      </div>

      {/* Right side: Content */}
      <div className="flex-1 pb-8 sm:pb-10">
        <motion.div
          className="glass-panel p-4 sm:p-6"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span 
              className="number-badge text-xs sm:text-sm"
              style={{
                color: cssColor,
                borderColor: `${accentColor},0.3)`,
                background: `${accentColor},0.1)`,
              }}
            >
              {item.number}
            </span>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-text-primary">
              {item.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-text-tertiary leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Desktop Timeline Item
function DesktopTimelineItem({ item, index }: { item: typeof timelineItems[0]; index: number }) {
  const isEven = index % 2 === 0;
  
  const accentColor = item.color === 'primary' 
    ? 'rgba(129,140,248'
    : item.color === 'synxay'
    ? 'rgba(167,139,250'
    : 'rgba(74,222,128';
    
  const cssColor = item.color === 'primary' 
    ? 'var(--accent-primary)'
    : item.color === 'synxay'
    ? 'var(--accent-synxay)'
    : 'var(--accent-kirevya)';

  return (
    <motion.div
      className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Content card */}
      <div className={`w-[calc(50%-40px)] ${isEven ? 'pr-0 text-right' : 'pl-0 text-left'}`}>
        <motion.div
          className="glass-panel p-6 lg:p-8 inline-block text-left"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
            <span 
              className="number-badge"
              style={{
                color: cssColor,
                borderColor: `${accentColor},0.3)`,
                background: `${accentColor},0.1)`,
              }}
            >
              {item.number}
            </span>
            <h3 className="text-lg lg:text-xl font-semibold text-text-primary">
              {item.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm lg:text-base text-text-tertiary leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      </div>

      {/* Center node */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${accentColor},0.2), ${accentColor},0.05))`,
            border: `1px solid ${accentColor},0.3)`,
            backdropFilter: 'blur(10px)',
          }}
          whileInView={{
            boxShadow: `0 0 30px ${accentColor},0.4)`,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <item.icon 
            className="w-5 h-5 lg:w-6 lg:h-6"
            style={{ color: cssColor }}
            strokeWidth={1.5}
          />
        </motion.div>
      </div>

      {/* Empty space for the other side */}
      <div className="w-[calc(50%-40px)]" />
    </motion.div>
  );
}

export function WhyNowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery('(max-width: 767px)');
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section ref={sectionRef} id="why-now" className="section relative overflow-hidden">
      {/* Clean background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)',
          }}
        />
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
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 mb-12 sm:mb-16 md:mb-20">
          <div>
            <FadeInUp>
              <span className="eyebrow mb-4 sm:mb-6 inline-flex">Why Now</span>
            </FadeInUp>
            
            <FadeInUp delay={0.1}>
              <SectionTypewriter 
                text="Why now: vertical, science-backed and binational"
                highlightWords={['binational']}
              />
            </FadeInUp>
          </div>
          
          <div className="flex items-end">
            <FadeInUp delay={0.2}>
              <p className="text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed">
                Innovation is shifting from generic startups to deep, thematic ecosystems. 
                Industries need solutions built on real problems, solid research and fast 
                entrepreneurial execution. At the same time, AI and green technologies are 
                reshaping how we discover, validate and scale new ventures.
              </p>
            </FadeInUp>
          </div>
        </div>

        {/* Timeline - Mobile */}
        {isMobile ? (
          <div className="relative max-w-lg mx-auto pl-2">
            {timelineItems.map((item, index) => (
              <MobileTimelineItem key={item.number} item={item} index={index} />
            ))}
          </div>
        ) : (
          /* Timeline - Desktop/Tablet */
          <div className="relative max-w-4xl mx-auto">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-border-subtle rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full rounded-full"
                style={{
                  height: lineHeight,
                  background: 'var(--accent-gradient)',
                }}
              />
            </div>

            {/* Timeline items */}
            <div className="space-y-16 md:space-y-20 lg:space-y-24">
              {timelineItems.map((item, index) => (
                <DesktopTimelineItem key={item.number} item={item} index={index} />
              ))}
            </div>

            {/* End node */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-0 w-3 h-3 md:w-4 md:h-4 rounded-full"
              style={{
                background: 'var(--accent-gradient)',
                boxShadow: '0 0 20px rgba(129,140,248,0.5)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default WhyNowSection;
