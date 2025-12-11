'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

// AI Typewriter Component - The core visual element
function AITypewriter({ 
  text, 
  onComplete,
  className = '',
}: { 
  text: string;
  onComplete?: () => void;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [glitchChar, setGlitchChar] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Glitch characters for the "thinking" effect
  const glitchChars = '█▓▒░@#$%&*!?<>[]{}|/\\~`´';

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;
    
    const typeNextChar = () => {
      if (currentIndex < text.length) {
        const char = text[currentIndex];
        
        // Random glitch effect before some characters (occasional)
        if (Math.random() > 0.88 && char !== ' ') {
          // Show glitch character first
          setGlitchChar(currentIndex);
          setDisplayText(text.slice(0, currentIndex) + glitchChars[Math.floor(Math.random() * glitchChars.length)]);
          
          // Then show real character after short delay
          setTimeout(() => {
            setGlitchChar(null);
            setDisplayText(text.slice(0, currentIndex + 1));
            currentIndex++;
            
            // Natural typing speed with variation
            const baseDelay = 40;
            const variation = Math.random() * 45;
            const pauseAfterSpace = char === ' ' ? 20 : 0;
            const pauseAfterPunctuation = '.!?,'.includes(char) ? 140 : 0;
            
            timeoutId = setTimeout(typeNextChar, baseDelay + variation + pauseAfterSpace + pauseAfterPunctuation);
          }, 50);
        } else {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
          
          // Natural typing speed - feels human
          const baseDelay = 35;
          const variation = Math.random() * 40;
          const pauseAfterSpace = char === ' ' ? 15 : 0;
          const pauseAfterPunctuation = '.!?,'.includes(char) ? 120 : 0;
          
          timeoutId = setTimeout(typeNextChar, baseDelay + variation + pauseAfterSpace + pauseAfterPunctuation);
        }
      } else {
        setIsTyping(false);
        onComplete?.();
      }
    };

    // Start typing after brief pause (natural feel)
    timeoutId = setTimeout(typeNextChar, 400);

    return () => clearTimeout(timeoutId);
  }, [text, onComplete]);

  // Find highlight ranges
  const highlightStart = text.indexOf('thematic innovation');
  const highlightEnd = highlightStart + 19;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <h1 className="relative inline" style={{ textWrap: 'balance' }}>
        {displayText.split('').map((char, i) => {
          const isGlitching = glitchChar === i;
          const isHighlighted = i >= highlightStart && i < highlightEnd;
          
          return (
            <motion.span
              key={i}
              className={`inline-block ${isHighlighted && !isGlitching ? 'gradient-text' : ''}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ 
                opacity: 1, 
                y: 0,
              }}
              transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                color: isGlitching 
                  ? 'var(--accent-primary)' 
                  : undefined,
                textShadow: isHighlighted
                  ? '0 0 20px rgba(0, 212, 255, 0.4)'
                  : undefined,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          );
        })}
        
        {/* Blinking cursor */}
        <span
          className="inline-block w-[3px] h-[0.9em] ml-1 align-middle rounded-full animate-cursor-blink"
          style={{
            background: 'linear-gradient(180deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
            boxShadow: '0 0 20px var(--accent-primary), 0 0 40px rgba(0, 212, 255, 0.6)',
          }}
        />
      </h1>
      
      {/* Particle burst on character appearance */}
      <ParticleField isActive={isTyping} />
    </div>
  );
}

// Floating particles that create atmosphere - optimized
function ParticleField({ isActive }: { isActive: boolean }) {
  // Reduced from 30 to 12 particles for better performance
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 4 + 3, // Slower, smoother animation
    delay: Math.random() * 2,
    color: i % 3 === 0 ? '0, 212, 255' : '139, 92, 246',
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: -1 }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, rgba(${particle.color}, ${isActive ? 0.7 : 0.3}) 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 60, 0],
            y: [0, (Math.random() - 0.5) * 50, 0],
            opacity: isActive ? [0.3, 0.7, 0.3] : [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}

// AI Response animation for subtitle - smooth and natural
function AIResponse({ 
  show, 
  children 
}: { 
  show: boolean; 
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Elegant ambient background - simplified for performance
function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Subtle central gradient - static, no animation */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(139, 92, 246, 0.06) 0%, transparent 60%)',
        }}
      />

      {/* Static diagonal lines - CSS animation instead of Framer Motion */}
      <div
        className="absolute inset-0 diagonal-lines"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 80px,
            rgba(255, 255, 255, 0.008) 80px,
            rgba(255, 255, 255, 0.008) 81px
          )`,
        }}
      />

      {/* Edge accent lines - static */}
      <div 
        className="absolute left-0 top-[20%] bottom-[20%] w-px"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.2), rgba(0, 212, 255, 0.15), transparent)',
          opacity: 0.5,
        }}
      />
      <div 
        className="absolute right-0 top-[20%] bottom-[20%] w-px"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(0, 212, 255, 0.15), rgba(139, 92, 246, 0.2), transparent)',
          opacity: 0.5,
        }}
      />
    </div>
  );
}

// AI Prompt indicator
function AIPromptBadge() {
  return (
    <motion.div
      className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent-primary/30 bg-accent-primary/5 backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {/* Pulsing dot */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary" />
      </span>
      
      <span className="text-sm font-mono text-accent-primary tracking-wide">
        AI generating...
      </span>
    </motion.div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [titleComplete, setTitleComplete] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  const handleTitleComplete = useCallback(() => {
    setTitleComplete(true);
    // Natural pause before subtitle
    setTimeout(() => setShowSubtitle(true), 250);
    // CTA appears after subtitle settles
    setTimeout(() => setShowCTA(true), 700);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Deep background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 100% at 50% 50%, rgba(12, 12, 18, 1) 0%, var(--bg-void) 100%)
          `,
        }}
      />

      {/* Ambient glows */}
      <AmbientBackground />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* AI Status Badge */}
        <div className="mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Vertical Venture Architect · Italy — UK</span>
              <span className="sm:hidden">Venture Architect · IT — UK</span>
            </span>
          </motion.div>
        </div>

        {/* AI Prompt indicator - shows while typing */}
        <AnimatePresence>
          {!titleComplete && (
            <motion.div 
              className="mb-4 sm:mb-6"
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <AIPromptBadge />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main AI-generated title */}
        <div className="mb-6 sm:mb-8 md:mb-10 max-w-4xl">
          <AITypewriter
            text="Building the future of thematic innovation"
            onComplete={handleTitleComplete}
            className="text-center"
          />
        </div>

        {/* AI Response - Subheadline */}
        <AIResponse show={showSubtitle}>
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[1.65rem] text-text-primary max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed font-medium px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Fyndiax is a vertical venture architect that turns real-world problems into{' '}
            <span 
              className="relative font-bold gradient-text"
              style={{
                textShadow: '0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(0, 212, 255, 0.3)',
              }}
            >
              AI-driven and green ventures
            </span>
            , through deep partnerships with universities, research centres and corporates.
          </motion.p>
        </AIResponse>


        {/* CTA - Premium AI-style button */}
        <AnimatePresence>
          {showCTA && (
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <button 
                onClick={() => {
                  window.lenis?.scrollTo('#contact');
                }}
                className="ai-button-wrapper group"
              >
                <span className="ai-button-inner">
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Sparkles className="w-6 h-6 text-accent-primary" />
                  </motion.span>
                  Talk to us
                </span>
              </button>
              
              {/* Micro-tagline */}
              <motion.p
                className="text-sm text-text-muted italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                From scientific insight and real-world problems to market-ready ventures.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator - hidden on very small screens */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-3 hidden xs:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: showCTA ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <span className="text-xs sm:text-sm text-text-muted font-medium tracking-wider uppercase">
          Discover
        </span>
        <motion.div
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border-medium flex items-center justify-center backdrop-blur-sm"
          style={{
            background: 'rgba(139, 92, 246, 0.08)',
          }}
          animate={{
            y: [0, 6, 0],
            borderColor: [
              'rgba(255, 255, 255, 0.15)',
              'rgba(139, 92, 246, 0.5)',
              'rgba(255, 255, 255, 0.15)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg-void via-bg-void/80 to-transparent pointer-events-none" />
    </section>
  );
}

export default HeroSection;
