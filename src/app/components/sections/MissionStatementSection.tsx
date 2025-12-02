'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function MissionStatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(168, 85, 247, 0.06) 0%, transparent 60%)',
        }}
      />

      <div className="container relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Card with gradient border */}
          <div className="relative group">
            {/* Glow effect behind card */}
            <div 
              className="absolute -inset-1 rounded-3xl opacity-60 blur-xl transition-opacity duration-500 group-hover:opacity-80"
              style={{
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(139, 92, 246, 0.15) 100%)',
              }}
            />
            
            {/* Gradient border */}
            <div 
              className="absolute -inset-[1px] rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.5) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(168, 85, 247, 0.3) 100%)',
              }}
            />
            
            {/* Card content */}
            <div 
              className="relative rounded-3xl p-10 md:p-14"
              style={{
                background: 'linear-gradient(135deg, rgba(12, 12, 18, 0.98) 0%, rgba(18, 18, 26, 0.95) 100%)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Inner top glow */}
              <div 
                className="absolute top-0 left-0 right-0 h-32 rounded-t-3xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
                }}
              />

              <div className="relative flex flex-col items-center text-center space-y-6">
              {/* Eyebrow */}
              <motion.span 
                className="text-xs font-mono text-accent-synxay/70 tracking-[0.15em] uppercase"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Our Approach
              </motion.span>

              {/* Main text */}
              <motion.p
                className="text-lg md:text-xl lg:text-[1.4rem] text-text-secondary leading-relaxed max-w-3xl"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{ textWrap: 'balance' }}
              >
                From our binational{' '}
                <span className="text-white font-medium">Italy–UK ecosystem</span>
                , we design and govern thematic venture builders in domains such as{' '}
                <span className="text-white">artificial intelligence</span>,{' '}
                <span className="text-white">food & agritech</span>,{' '}
                <span className="text-white">biomaterials</span> and{' '}
                <span className="text-white">circular manufacturing</span>.
              </motion.p>

              {/* Secondary line */}
              <motion.p
                className="text-base md:text-lg text-text-tertiary max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                We connect scientific research, industry challenges and entrepreneurial talent 
                into a single, integrated architecture.
              </motion.p>
            </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default MissionStatementSection;

