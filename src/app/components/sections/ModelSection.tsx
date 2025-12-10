'use client';

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { FadeInUp } from '../animations';
import { SectionTypewriter } from '../animations/SectionTypewriter';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(MotionPathPlugin);
}

// ============================================
// RESPONSIVE HOOK
// ============================================

function useMediaQuery(query: string): boolean {
  const getMatches = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  }, [query]);

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const media = window.matchMedia(query);
    
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

// ============================================
// TYPES
// ============================================

interface NodeData {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  colorClass: string;
  isMain?: boolean;
  position: { x: number; y: number };
}

interface PathData {
  id: string;
  from: string;
  to: string;
  color: string;
  path: string;
}

interface RocketInstance {
  id: string;
  pathId: string;
  color: string;
  position: { x: number; y: number; rotation: number };
  visible: boolean;
}

// ============================================
// HUD CARD COMPONENT - Enhanced with Dormant/Active States
// ============================================

function HUDCard({
  node,
  delay = 0,
  isActivated,
}: {
  node: NodeData;
  delay?: number;
  isActivated: boolean;
}) {
  // Determine card state class
  const stateClass = isActivated ? 'hud-card-active' : 'hud-card-dormant';
  
  const cardClasses = `
    hud-card 
    ${stateClass}
    ${node.isMain ? 'hud-card-main' : ''} 
    ${node.colorClass}
  `;

  return (
    <motion.div
      className={`relative ${node.isMain ? 'z-20' : 'z-10'}`}
      initial={{ opacity: 0, y: 40, scale: 0.7 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.7, 
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {/* Multi-layer activation burst effect */}
      <AnimatePresence>
        {isActivated && (
          <>
            {/* Inner ring */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ scale: 1, opacity: 0.9 }}
              animate={{ scale: 1.6, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                clipPath: 'inherit',
                border: `3px solid ${node.color}`,
                boxShadow: `0 0 30px ${node.color}, inset 0 0 20px ${node.color}40`,
              }}
            />
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              style={{
                clipPath: 'inherit',
                border: `2px solid ${node.color}`,
                boxShadow: `0 0 50px ${node.color}`,
              }}
            />
            {/* Energy flash */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                background: `radial-gradient(circle at center, ${node.color}60, transparent 60%)`,
                filter: 'blur(10px)',
              }}
            />
          </>
        )}
      </AnimatePresence>

      <motion.div
        className={cardClasses}
        animate={isActivated ? {
          scale: [1, 1.08, 1],
        } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          padding: node.isMain ? '28px 44px' : '20px 32px',
          minWidth: node.isMain ? '220px' : '160px',
        }}
      >
        {/* Scanline overlay */}
        <div className="hud-scanline" />
        
        {/* Data stream effect (active only) */}
        <div className="hud-data-stream" />
        
        {/* Activation glow overlay */}
        <AnimatePresence>
          {isActivated && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0.2] }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                background: `
                  radial-gradient(ellipse at 50% 0%, ${node.color}40, transparent 50%),
                  radial-gradient(ellipse at 50% 100%, ${node.color}20, transparent 40%)
                `,
              }}
            />
          )}
        </AnimatePresence>
        
        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Status indicator */}
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <div 
              className="hud-status-dot"
              style={{ 
                width: node.isMain ? '10px' : '8px',
                height: node.isMain ? '10px' : '8px',
              }}
            />
            <span 
              className={`hud-status-label font-mono uppercase tracking-[0.2em] ${node.isMain ? 'text-[11px]' : 'text-[10px]'}`}
            >
              {isActivated ? '● ONLINE' : '○ STANDBY'}
            </span>
          </div>
          
          {/* Name */}
          <div
            className={`hud-card-title font-bold tracking-wide ${node.isMain ? 'text-2xl' : 'text-base'}`}
          >
            {node.name}
          </div>
          
          {/* Subtitle */}
          <div
            className={`hud-card-subtitle ${node.isMain ? 'text-sm' : 'text-xs'} mt-1.5 font-medium tracking-wide`}
          >
            {node.subtitle}
          </div>
          
          {/* Power level indicator (active only) */}
          <AnimatePresence>
            {isActivated && (
              <motion.div
                className="mt-3 flex items-center justify-center gap-1"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="rounded-sm"
                    style={{
                      width: node.isMain ? '6px' : '4px',
                      height: node.isMain ? '12px' : '8px',
                      background: node.color,
                      boxShadow: `0 0 6px ${node.color}`,
                    }}
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      scaleY: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Corner accents - show on all cards, enhanced on main */}
        <div 
          className="hud-corner hud-corner-tl" 
          style={{ 
            borderColor: isActivated ? node.color : 'rgba(80, 80, 100, 0.3)',
            width: node.isMain ? '28px' : '20px',
            height: node.isMain ? '28px' : '20px',
          }} 
        />
        <div 
          className="hud-corner hud-corner-tr" 
          style={{ 
            borderColor: isActivated ? node.color : 'rgba(80, 80, 100, 0.3)',
            width: node.isMain ? '28px' : '20px',
            height: node.isMain ? '28px' : '20px',
          }} 
        />
        <div 
          className="hud-corner hud-corner-bl" 
          style={{ 
            borderColor: isActivated ? node.color : 'rgba(80, 80, 100, 0.3)',
            width: node.isMain ? '28px' : '20px',
            height: node.isMain ? '28px' : '20px',
          }} 
        />
        <div 
          className="hud-corner hud-corner-br" 
          style={{ 
            borderColor: isActivated ? node.color : 'rgba(80, 80, 100, 0.3)',
            width: node.isMain ? '28px' : '20px',
            height: node.isMain ? '28px' : '20px',
          }} 
        />
      </motion.div>
    </motion.div>
  );
}

// ============================================
// ROCKET SPRITE COMPONENT (IMPROVED)
// ============================================

function RocketSprite({ 
  color, 
  size = 32,
  className = '',
  id = 'default',
}: { 
  color: string; 
  size?: number;
  className?: string;
  id?: string;
}) {
  // Determine if this is a green rocket and adjust colors for better contrast
  const isGreen = color === '#14F195' || color.toLowerCase().includes('14f195');
  
  // For green rockets, use a darker shade with better contrast
  const bodyColor = isGreen ? '#0D9668' : color;
  const glowColor = color;
  const highlightColor = isGreen ? '#5EEAD4' : 'white';
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={`rocket-glow ${className}`}
      style={{ color: glowColor }}
    >
      {/* Glow effect */}
      <defs>
        <filter id={`rocketGlowFilter-${id}`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={`flameGradient-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#FFD700" />
          <stop offset="60%" stopColor="#FF6B00" />
          <stop offset="100%" stopColor="#FF0000" />
        </linearGradient>
        <linearGradient id={`bodyGradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={highlightColor} stopOpacity="0.3" />
          <stop offset="50%" stopColor={bodyColor} />
          <stop offset="100%" stopColor={bodyColor} />
        </linearGradient>
      </defs>
      
      {/* Outer glow */}
      <ellipse 
        cx="16" 
        cy="16" 
        rx="14" 
        ry="14" 
        fill={glowColor}
        opacity="0.15"
        style={{ filter: 'blur(4px)' }}
      />
      
      {/* Rocket body */}
      <g filter={`url(#rocketGlowFilter-${id})`}>
        {/* Main body with gradient */}
        <path
          d="M16 4 L12 14 L12 22 L16 26 L20 22 L20 14 Z"
          fill={`url(#bodyGradient-${id})`}
          stroke={highlightColor}
          strokeWidth="1"
        />
        
        {/* Body panel lines for detail */}
        <path
          d="M14 8 L14 20"
          stroke={highlightColor}
          strokeWidth="0.5"
          opacity="0.3"
        />
        <path
          d="M18 8 L18 20"
          stroke={highlightColor}
          strokeWidth="0.5"
          opacity="0.3"
        />
        
        {/* Nose cone highlight */}
        <path
          d="M16 4 L14 10 L16 8 L18 10 Z"
          fill={highlightColor}
          opacity="0.6"
        />
        
        {/* Left fin */}
        <path
          d="M12 18 L7 25 L12 22 Z"
          fill={bodyColor}
          stroke={highlightColor}
          strokeWidth="0.5"
        />
        
        {/* Right fin */}
        <path
          d="M20 18 L25 25 L20 22 Z"
          fill={bodyColor}
          stroke={highlightColor}
          strokeWidth="0.5"
        />
        
        {/* Window - outer ring */}
        <circle cx="16" cy="13" r="3" fill={highlightColor} opacity="0.9" />
        {/* Window - inner */}
        <circle cx="16" cy="13" r="2" fill="#0a0a15" />
        {/* Window - reflection */}
        <circle cx="15" cy="12" r="0.8" fill={highlightColor} opacity="0.8" />
      </g>
      
      {/* Flame */}
      <g className="rocket-flame" style={{ transformOrigin: '16px 26px' }}>
        <ellipse cx="16" cy="30" rx="4" ry="5" fill={`url(#flameGradient-${id})`} opacity="0.9" />
        <ellipse cx="16" cy="29" rx="2.5" ry="3.5" fill="#FFD700" opacity="0.9" />
        <ellipse cx="16" cy="28" rx="1.2" ry="2" fill="white" opacity="1" />
      </g>
    </svg>
  );
}

// ============================================
// PARTICLE SYSTEM COMPONENT
// ============================================

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
}

function ParticleTrail({ 
  particles,
}: { 
  particles: Particle[];
}) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// JOURNEY PATH COMPONENT
// ============================================

function JourneyPath({
  pathData,
  progress,
  isActive,
}: {
  pathData: PathData;
  progress: number;
  isActive: boolean;
}) {
  return (
    <g>
      {/* Base path (dim) */}
      <path
        d={pathData.path}
        fill="none"
        stroke={pathData.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="8 8"
        opacity="0.15"
      />
      
      {/* Glow path (animated) */}
      <path
        d={pathData.path}
        fill="none"
        stroke={pathData.color}
        strokeWidth="8"
        strokeLinecap="round"
        opacity={isActive ? 0.3 : 0.05}
        style={{ 
          filter: `blur(6px)`,
          transition: 'opacity 0.3s ease',
        }}
      />
      
      {/* Progress path */}
      <motion.path
        d={pathData.path}
        fill="none"
        stroke={pathData.color}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: progress }}
        transition={{ duration: 0.05, ease: 'linear' }}
        style={{
          filter: `drop-shadow(0 0 4px ${pathData.color})`,
        }}
      />
      
      {/* Core white path */}
      <motion.path
        d={pathData.path}
        fill="none"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: progress }}
        transition={{ duration: 0.05, ease: 'linear' }}
      />
    </g>
  );
}

// ============================================
// RESPONSIVE HUD CARD (Mobile & Tablet)
// ============================================

function ResponsiveHUDCard({
  node,
  delay = 0,
  showConnector = false,
  isActivated = true,
  size = 'default', // 'compact' | 'default' | 'large'
}: {
  node: NodeData;
  delay?: number;
  showConnector?: boolean;
  isActivated?: boolean;
  size?: 'compact' | 'default' | 'large';
}) {
  const stateClass = isActivated ? 'hud-card-active' : 'hud-card-dormant';
  
  // Size-based styling
  const sizeStyles = {
    compact: {
      padding: node.isMain ? '12px 20px' : '10px 16px',
      titleSize: node.isMain ? 'text-base' : 'text-xs',
      subtitleSize: node.isMain ? 'text-[10px]' : 'text-[9px]',
      statusSize: 'text-[8px]',
      dotSize: node.isMain ? '6px' : '5px',
      cornerSize: '12px',
      barWidth: '2px',
      barHeight: node.isMain ? '8px' : '6px',
    },
    default: {
      padding: node.isMain ? '16px 28px' : '14px 22px',
      titleSize: node.isMain ? 'text-lg' : 'text-sm',
      subtitleSize: node.isMain ? 'text-xs' : 'text-[11px]',
      statusSize: node.isMain ? 'text-[10px]' : 'text-[9px]',
      dotSize: node.isMain ? '8px' : '6px',
      cornerSize: '16px',
      barWidth: '3px',
      barHeight: node.isMain ? '10px' : '7px',
    },
    large: {
      padding: node.isMain ? '20px 36px' : '16px 28px',
      titleSize: node.isMain ? 'text-xl' : 'text-base',
      subtitleSize: node.isMain ? 'text-sm' : 'text-xs',
      statusSize: node.isMain ? 'text-[11px]' : 'text-[10px]',
      dotSize: node.isMain ? '10px' : '8px',
      cornerSize: '18px',
      barWidth: '4px',
      barHeight: node.isMain ? '12px' : '9px',
    },
  };
  
  const styles = sizeStyles[size];
  
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Connector Line */}
      {showConnector && (
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-0.5 -top-4 h-4"
          style={{
            background: `linear-gradient(to bottom, ${node.color}60, ${node.color})`,
            boxShadow: `0 0 6px ${node.color}40`,
          }}
        />
      )}
      
      <div
        className={`hud-card ${stateClass} ${node.colorClass}`}
        style={{ padding: styles.padding }}
      >
        <div className="hud-scanline" />
        <div className="hud-data-stream" />
        
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <div 
              className="hud-status-dot"
              style={{ 
                width: styles.dotSize,
                height: styles.dotSize,
              }}
            />
            <span 
              className={`hud-status-label font-mono uppercase tracking-[0.12em] ${styles.statusSize}`}
            >
              {isActivated ? '● ONLINE' : '○ STANDBY'}
            </span>
          </div>
          
          <div
            className={`hud-card-title font-bold tracking-wide ${styles.titleSize} leading-tight`}
          >
            {node.name}
          </div>
          
          <div
            className={`hud-card-subtitle ${styles.subtitleSize} mt-0.5 font-medium tracking-wide`}
          >
            {node.subtitle}
          </div>
          
          {/* Power bars */}
          {isActivated && (
            <motion.div
              className="mt-2 flex items-center justify-center gap-0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="rounded-sm"
                  style={{
                    width: styles.barWidth,
                    height: styles.barHeight,
                    background: node.color,
                    boxShadow: `0 0 3px ${node.color}`,
                  }}
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scaleY: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          )}
        </div>
        
        {/* Corner accents */}
        {['tl', 'tr', 'bl', 'br'].map((corner) => (
          <div 
            key={corner}
            className={`hud-corner hud-corner-${corner}`} 
            style={{ 
              borderColor: node.color,
              width: styles.cornerSize,
              height: styles.cornerSize,
            }} 
          />
        ))}
      </div>
    </motion.div>
  );
}

// ============================================
// MOBILE LAYOUT COMPONENT (< 768px)
// ============================================

function MobileJourneyLayout({ nodes }: { nodes: NodeData[] }) {
  return (
    <div className="flex flex-col items-center gap-3 py-4 px-2">
      {/* FYNDIAX - Main Hub */}
      <ResponsiveHUDCard node={nodes[0]} delay={0} size="default" />
      
      {/* Branching indicator - simplified */}
      <div className="flex items-center gap-4 w-full justify-center py-2">
        <div 
          className="h-0.5 w-10 sm:w-14"
          style={{
            background: 'linear-gradient(to right, transparent, #A855F7)',
            boxShadow: '0 0 6px #A855F750',
          }}
        />
        <motion.div 
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: '#8B5CF6', boxShadow: '0 0 10px #8B5CF6' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div 
          className="h-0.5 w-10 sm:w-14"
          style={{
            background: 'linear-gradient(to left, transparent, #14F195)',
            boxShadow: '0 0 6px #14F19550',
          }}
        />
      </div>
      
      {/* Second Level: Synxai & Kirevya - side by side */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-md px-2">
        <ResponsiveHUDCard node={nodes[1]} delay={0.1} size="compact" />
        <ResponsiveHUDCard node={nodes[2]} delay={0.15} size="compact" />
      </div>
      
      {/* Connection indicator */}
      <div className="flex items-center justify-center gap-6 py-2">
        <div 
          className="w-0.5 h-5"
          style={{
            background: 'linear-gradient(to bottom, #A855F7, #A855F760)',
            boxShadow: '0 0 6px #A855F750',
          }}
        />
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className="w-0.5 h-5"
              style={{
                background: 'linear-gradient(to bottom, #14F195, #14F19560)',
                boxShadow: '0 0 6px #14F19550',
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Third Level: Ventures - Cultrai left, 3 green right */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-md px-2">
        {/* Left column: Cultrai */}
        <div className="flex items-start justify-center">
          <ResponsiveHUDCard node={nodes[3]} delay={0.2} size="compact" />  {/* Cultrai */}
        </div>
        {/* Right column: Mavyeda, TransWood, Regena */}
        <div className="flex flex-col gap-2 sm:gap-3">
          <ResponsiveHUDCard node={nodes[4]} delay={0.25} size="compact" /> {/* Mavyeda */}
          <ResponsiveHUDCard node={nodes[6]} delay={0.3} size="compact" />  {/* TransWood */}
          <ResponsiveHUDCard node={nodes[5]} delay={0.35} size="compact" /> {/* Regena */}
        </div>
      </div>
      
      {/* Mini rocket animation */}
      <motion.div
        className="mt-3"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <RocketSprite color="#8B5CF6" size={28} id="mobile" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ============================================
// TABLET LAYOUT COMPONENT (768px - 1024px)
// ============================================

function TabletJourneyLayout({ nodes }: { nodes: NodeData[] }) {
  return (
    <div className="flex flex-col items-center gap-6 py-6 px-4">
      {/* FYNDIAX - Main Hub - Larger on tablet */}
      <ResponsiveHUDCard node={nodes[0]} delay={0} size="large" />
      
      {/* Branching visual */}
      <div className="flex items-center justify-center w-full max-w-2xl">
        <div 
          className="h-0.5 flex-1 max-w-24"
          style={{
            background: 'linear-gradient(to right, transparent, #A855F7)',
            boxShadow: '0 0 8px #A855F750',
          }}
        />
        <div className="flex flex-col items-center mx-4">
          <div 
            className="w-0.5 h-6"
            style={{
              background: 'linear-gradient(to bottom, #8B5CF6, transparent)',
              boxShadow: '0 0 8px #8B5CF650',
            }}
          />
          <motion.div 
            className="w-3 h-3 rounded-full"
            style={{ background: '#8B5CF6', boxShadow: '0 0 12px #8B5CF6' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <div 
          className="h-0.5 flex-1 max-w-24"
          style={{
            background: 'linear-gradient(to left, transparent, #14F195)',
            boxShadow: '0 0 8px #14F19550',
          }}
        />
      </div>
      
      {/* Second Level: Synxai & Kirevya */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-xl">
        <ResponsiveHUDCard node={nodes[1]} delay={0.1} size="default" />
        <ResponsiveHUDCard node={nodes[2]} delay={0.15} size="default" />
      </div>
      
      {/* Connection lines to ventures */}
      <div className="flex items-center justify-between w-full max-w-xl px-8">
        <div 
          className="w-0.5 h-8"
          style={{
            background: 'linear-gradient(to bottom, #A855F7, #A855F760)',
            boxShadow: '0 0 8px #A855F750',
          }}
        />
        <div className="flex gap-6">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className="w-0.5 h-8"
              style={{
                background: 'linear-gradient(to bottom, #14F195, #14F19560)',
                boxShadow: '0 0 8px #14F19550',
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Third Level: All Ventures - 2x2 grid for better layout */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
        {/* AI Venture - Cultrai */}
        <div className="flex justify-end">
          <ResponsiveHUDCard node={nodes[3]} delay={0.2} size="default" />
        </div>
        {/* Green Ventures */}
        <div className="flex justify-start">
          <ResponsiveHUDCard node={nodes[4]} delay={0.25} size="default" />
        </div>
        <div className="flex justify-end">
          <ResponsiveHUDCard node={nodes[5]} delay={0.3} size="default" />
        </div>
        <div className="flex justify-start">
          <ResponsiveHUDCard node={nodes[6]} delay={0.35} size="default" />
        </div>
      </div>
      
      {/* Rocket animation */}
      <motion.div
        className="mt-4"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <RocketSprite color="#8B5CF6" size={36} id="tablet" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ============================================
// MAIN MODEL SECTION COMPONENT
// ============================================

export function ModelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  
  const [activatedNodes, setActivatedNodes] = useState<Set<string>>(new Set());
  const [particles, setParticles] = useState<Particle[]>([]);
  const [pathProgress, setPathProgress] = useState<Record<string, number>>({});
  const [rockets, setRockets] = useState<RocketInstance[]>([]);
  const [activePaths, setActivePaths] = useState<Set<string>>(new Set());
  
  const particleIdRef = useRef(0);
  const animationStartedRef = useRef(false);

  // SVG viewBox dimensions - increased for larger cards
  const SVG_WIDTH = 1000;
  const SVG_HEIGHT = 500;
  
  // Card dimensions (approximate) for path calculation - increased
  const CARD_HEIGHT_MAIN = 120;
  const CARD_HEIGHT = 95;

  // Calculate centered positions for nodes
  // Level 1: Fyndiax centered at top
  const fyndiaxX = SVG_WIDTH / 2;
  const fyndiaxY = 60;
  
  // Level 2: Synxai left, Kirevya right - more spread out
  const synxayX = 130;
  const synxayY = 210;
  const kirevyaX = SVG_WIDTH - 130;
  const kirevyaY = 210;
  
  // Level 3: Cultrai under Synxai, 3 green nodes centered under Kirevya
  const cultrayX = synxayX;
  const cultrayY = 400;
  
  // Green children: distribute evenly centered under Kirevya
  const greenChildrenSpacing = 200;
  const greenChildrenCenterX = kirevyaX;
  const mavyedaX = greenChildrenCenterX - greenChildrenSpacing;
  const regenaX = greenChildrenCenterX;
  const transwoodX = greenChildrenCenterX + greenChildrenSpacing;
  const greenChildrenY = 400;

  // Node definitions with calculated positions
  const nodes: NodeData[] = useMemo(() => [
    { 
      id: 'fyndiax', 
      name: 'FYNDIAX', 
      subtitle: 'Launchpad', 
      color: '#8B5CF6',
      colorClass: '',
      isMain: true,
      position: { x: fyndiaxX, y: fyndiaxY }
    },
    { 
      id: 'synxay', 
      name: 'Synxai', 
      subtitle: 'AI Builder', 
      color: '#A855F7',
      colorClass: 'hud-card-synxay',
      position: { x: synxayX, y: synxayY }
    },
    { 
      id: 'kirevya', 
      name: 'Kirevya', 
      subtitle: 'Green Builder', 
      color: '#14F195',
      colorClass: 'hud-card-kirevya',
      position: { x: kirevyaX, y: kirevyaY }
    },
    { 
      id: 'cultrai', 
      name: 'Cultrai', 
      subtitle: 'Cultural AI', 
      color: '#A855F7',
      colorClass: 'hud-card-synxay',
      position: { x: cultrayX, y: cultrayY }
    },
    { 
      id: 'mavyeda', 
      name: 'Mavyeda', 
      subtitle: 'Precision Food', 
      color: '#14F195',
      colorClass: 'hud-card-kirevya',
      position: { x: mavyedaX, y: greenChildrenY }
    },
    { 
      id: 'regena', 
      name: 'Regena', 
      subtitle: 'Biomass', 
      color: '#14F195',
      colorClass: 'hud-card-kirevya',
      position: { x: regenaX, y: greenChildrenY }
    },
    { 
      id: 'transwood', 
      name: 'TransWood', 
      subtitle: 'Bio Materials', 
      color: '#14F195',
      colorClass: 'hud-card-kirevya',
      position: { x: transwoodX, y: greenChildrenY }
    },
  ], [fyndiaxX, fyndiaxY, synxayX, synxayY, kirevyaX, kirevyaY, cultrayX, cultrayY, mavyedaX, regenaX, transwoodX, greenChildrenY]);

  // Path definitions - paths connect from bottom-center of source to top-center of target
  const paths: PathData[] = useMemo(() => [
    {
      id: 'fyndiax-synxay',
      from: 'fyndiax',
      to: 'synxay',
      color: '#A855F7',
      path: `M ${fyndiaxX} ${fyndiaxY + CARD_HEIGHT_MAIN/2 + 5} Q ${(fyndiaxX + synxayX)/2} ${(fyndiaxY + synxayY)/2 + 20} ${synxayX} ${synxayY - CARD_HEIGHT/2 - 5}`,
    },
    {
      id: 'synxay-cultray',
      from: 'synxay',
      to: 'cultray',
      color: '#A855F7',
      path: `M ${synxayX} ${synxayY + CARD_HEIGHT/2 + 5} L ${cultrayX} ${cultrayY - CARD_HEIGHT/2 - 5}`,
    },
    {
      id: 'fyndiax-kirevya',
      from: 'fyndiax',
      to: 'kirevya',
      color: '#14F195',
      path: `M ${fyndiaxX} ${fyndiaxY + CARD_HEIGHT_MAIN/2 + 5} Q ${(fyndiaxX + kirevyaX)/2} ${(fyndiaxY + kirevyaY)/2 + 20} ${kirevyaX} ${kirevyaY - CARD_HEIGHT/2 - 5}`,
    },
    {
      id: 'kirevya-mavyeda',
      from: 'kirevya',
      to: 'mavyeda',
      color: '#14F195',
      path: `M ${kirevyaX} ${kirevyaY + CARD_HEIGHT/2 + 5} Q ${(kirevyaX + mavyedaX)/2} ${(kirevyaY + greenChildrenY)/2 + 10} ${mavyedaX} ${greenChildrenY - CARD_HEIGHT/2 - 5}`,
    },
    {
      id: 'kirevya-regena',
      from: 'kirevya',
      to: 'regena',
      color: '#14F195',
      path: `M ${kirevyaX} ${kirevyaY + CARD_HEIGHT/2 + 5} L ${regenaX} ${greenChildrenY - CARD_HEIGHT/2 - 5}`,
    },
    {
      id: 'kirevya-transwood',
      from: 'kirevya',
      to: 'transwood',
      color: '#14F195',
      path: `M ${kirevyaX} ${kirevyaY + CARD_HEIGHT/2 + 5} Q ${(kirevyaX + transwoodX)/2} ${(kirevyaY + greenChildrenY)/2 + 10} ${transwoodX} ${greenChildrenY - CARD_HEIGHT/2 - 5}`,
    },
  ], [fyndiaxX, fyndiaxY, synxayX, synxayY, kirevyaX, kirevyaY, cultrayX, cultrayY, mavyedaX, regenaX, transwoodX, greenChildrenY]);

  // Create particle
  const createParticle = useCallback((x: number, y: number, color: string) => {
    const id = particleIdRef.current++;
    const size = 3 + Math.random() * 6;
    
    const newParticle: Particle = {
      id,
      x: x - size / 2 + (Math.random() - 0.5) * 10,
      y: y - size / 2 + (Math.random() - 0.5) * 10,
      size,
      color,
      opacity: 0.8 + Math.random() * 0.2,
    };

    setParticles(prev => [...prev.slice(-50), newParticle]);

    // Fade out particle
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, 600);
  }, []);

  // Get point on path at progress
  const getPointOnPath = useCallback((pathD: string, progress: number) => {
    if (typeof window === 'undefined') return { x: 0, y: 0, angle: 0 };
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathD);
    svg.appendChild(path);
    document.body.appendChild(svg);
    
    const length = path.getTotalLength();
    const point = path.getPointAtLength(length * progress);
    
    // Look ahead on path for direction
    const lookAheadProgress = Math.min(progress + 0.05, 1);
    const lookAhead = path.getPointAtLength(length * lookAheadProgress);
    
    const dx = lookAhead.x - point.x;
    const dy = lookAhead.y - point.y;
    
    document.body.removeChild(svg);
    
    // Calculate angle
    // atan2 gives: 0° = right, 90° = down, 180°/-180° = left, -90° = up
    // Rocket SVG points UP (which is -90° in atan2 terms)
    // To make rocket point in direction of movement:
    // rotation = atan2(dy, dx) + 90°
    const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI);
    
    return { x: point.x, y: point.y, angle: angleDeg + 90 };
  }, []);

  // Animate a single rocket along a path
  const animateRocketOnPath = useCallback(async (
    rocketId: string,
    pathData: PathData,
    duration: number,
    onComplete: () => void
  ) => {
    const steps = 40; // Faster with fewer steps
    const stepDuration = duration / steps;

    setActivePaths(prev => new Set(prev).add(pathData.id));
    
    // Create rocket
    const initialPoint = getPointOnPath(pathData.path, 0);
    setRockets(prev => [...prev, {
      id: rocketId,
      pathId: pathData.id,
      color: pathData.color,
      position: { x: initialPoint.x, y: initialPoint.y, rotation: initialPoint.angle },
      visible: true,
    }]);

    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;
      const point = getPointOnPath(pathData.path, progress);
      
      setRockets(prev => prev.map(r => 
        r.id === rocketId 
          ? { ...r, position: { x: point.x, y: point.y, rotation: point.angle } }
          : r
      ));

      setPathProgress(prev => ({
        ...prev,
        [pathData.id]: progress,
      }));

      // Create particles more frequently
      if (i % 2 === 0) {
        createParticle(point.x, point.y, pathData.color);
      }

      await new Promise(resolve => setTimeout(resolve, stepDuration));
    }

    // Keep path visible
    setPathProgress(prev => ({
      ...prev,
      [pathData.id]: 1,
    }));

    // Activate destination node
    setActivatedNodes(prev => new Set(prev).add(pathData.to));
    
    // Remove rocket (it disappears at destination)
    setRockets(prev => prev.filter(r => r.id !== rocketId));
    setActivePaths(prev => {
      const newSet = new Set(prev);
      newSet.delete(pathData.id);
      return newSet;
    });

    onComplete();
  }, [getPointOnPath, createParticle]);

  // Animate rockets - parallel from each node
  const animateRocket = useCallback(async () => {
    if (!isInView || animationStartedRef.current) return;
    animationStartedRef.current = true;
    
    // Wait for cards to appear
    await new Promise(resolve => setTimeout(resolve, 600));

    // Activate Fyndiax
    setActivatedNodes(new Set(['fyndiax']));

    // Phase 1: Launch both rockets from Fyndiax simultaneously
    await new Promise<void>(resolve => {
      let completed = 0;
      const checkComplete = () => {
        completed++;
        if (completed === 2) resolve();
      };

      // Rocket to Synxai (purple)
      animateRocketOnPath('rocket-synxay', paths[0], 800, checkComplete);
      // Rocket to Kirevya (green)
      animateRocketOnPath('rocket-kirevya', paths[2], 800, checkComplete);
    });

    // Small pause
    await new Promise(resolve => setTimeout(resolve, 200));

    // Phase 2: Launch child rockets simultaneously
    await new Promise<void>(resolve => {
      let completed = 0;
      const total = 4; // Cultrai + 3 green children
      const checkComplete = () => {
        completed++;
        if (completed === total) resolve();
      };

      // From Synxai to Cultrai
      animateRocketOnPath('rocket-cultray', paths[1], 500, checkComplete);
      
      // From Kirevya to all three children
      animateRocketOnPath('rocket-mavyeda', paths[3], 600, checkComplete);
      animateRocketOnPath('rocket-regena', paths[4], 600, checkComplete);
      animateRocketOnPath('rocket-transwood', paths[5], 600, checkComplete);
    });

  }, [isInView, paths, animateRocketOnPath]);

  // Start animation when in view
  useEffect(() => {
    if (isInView && !animationStartedRef.current) {
      const timer = setTimeout(() => {
        animateRocket();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isInView, animateRocket]);

  // Pre-generate star positions
  const stars = useMemo(() => 
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: (i * 37 + 13) % 100,
      top: (i * 47 + 7) % 100,
      size: 1 + (i % 3),
      duration: 2 + (i % 4),
      delay: (i % 6) * 0.3,
    })),
  []);

  return (
    <section ref={sectionRef} id="model" className="section relative overflow-hidden">
      {/* Clean dark background */}
      <div className="absolute inset-0">
        {/* Base dark gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #030305 0%, #050508 50%, #030305 100%)',
          }}
        />
        
        {/* Subtle grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.012) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.012) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 70%)',
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
            duration: 35,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Tiny stars - kept but more subtle */}
        <div className="absolute inset-0">
          {stars.slice(0, 20).map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: Math.max(1, star.size - 1),
                height: Math.max(1, star.size - 1),
              }}
              animate={{
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: star.duration + 2,
                repeat: Infinity,
                delay: star.delay,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <FadeInUp>
            <span className="eyebrow mb-6 inline-flex">Our Model</span>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <SectionTypewriter 
              text="From architecture to ventures"
              highlightWords={['ventures']}
              className="mb-6"
            />
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="text-lg text-text-tertiary leading-relaxed">
              Fyndiax sits at the top of a lean, modular architecture that connects a central 
              system architect with thematic venture builders and their ventures. At every level, 
              we integrate scientific partners and corporate stakeholders to ensure that each 
              venture is rooted in real problems and solid evidence.
            </p>
          </FadeInUp>
        </div>

        {/* Journey Map - Responsive layouts */}
        {isDesktop && (
          <div 
            ref={containerRef}
            className="relative mx-auto"
            style={{ maxWidth: `${SVG_WIDTH}px`, height: `${SVG_HEIGHT}px` }}
          >
            {/* SVG Layer for Paths */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {paths.map((pathData) => (
                <JourneyPath
                  key={pathData.id}
                  pathData={pathData}
                  progress={pathProgress[pathData.id] || 0}
                  isActive={activePaths.has(pathData.id)}
                />
              ))}
            </svg>

            {/* Particle Trail */}
            <ParticleTrail particles={particles} />

            {/* Multiple Rockets */}
            {rockets.map((rocket) => {
              const rotation = rocket.position.rotation || 0;
              return (
                <div
                  key={rocket.id}
                  className="absolute pointer-events-none z-30"
                  style={{
                    left: rocket.position.x,
                    top: rocket.position.y,
                    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                    opacity: rocket.visible ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  <RocketSprite color={rocket.color} size={32} id={rocket.id} />
                </div>
              );
            })}

            {/* Node Cards - positioned using calculated SVG coordinates */}
            {nodes.map((node, index) => (
              <div 
                key={node.id}
                className="absolute"
                style={{ 
                  left: `${(node.position.x / SVG_WIDTH) * 100}%`,
                  top: `${(node.position.y / SVG_HEIGHT) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <HUDCard
                  node={node}
                  delay={index * 0.05}
                  isActivated={activatedNodes.has(node.id)}
                />
              </div>
            ))}
          </div>
        )}
        
        {/* Journey Map - Tablet */}
        {isTablet && (
          <TabletJourneyLayout nodes={nodes} />
        )}
        
        {/* Journey Map - Mobile */}
        {isMobile && (
          <MobileJourneyLayout nodes={nodes} />
        )}

        {/* Legend - Responsive */}
        <FadeInUp delay={0.5}>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mt-8 md:mt-12 px-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <RocketSprite color="#8B5CF6" size={20} id="legend-purple" />
              </div>
              <span className="text-xs sm:text-sm text-text-muted font-medium">Innovation Rocket</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div 
                className="w-8 sm:w-12 h-1 sm:h-1.5 rounded-full"
                style={{ 
                  background: 'linear-gradient(90deg, #A855F7, #A855F750)',
                  boxShadow: '0 0 12px #A855F7',
                }} 
              />
              <span className="text-xs sm:text-sm text-text-muted font-medium">AI Path</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div 
                className="w-8 sm:w-12 h-1 sm:h-1.5 rounded-full"
                style={{ 
                  background: 'linear-gradient(90deg, #14F195, #14F19550)',
                  boxShadow: '0 0 12px #14F195',
                }} 
              />
              <span className="text-xs sm:text-sm text-text-muted font-medium">Green Path</span>
            </div>
          </div>
        </FadeInUp>

        {/* Tagline */}
        <FadeInUp delay={0.6}>
          <p className="text-center mt-10 text-text-muted text-sm flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-accent-primary" />
            <span>A single architecture: from lab and field data to cross-border, scalable ventures.</span>
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}

export default ModelSection;
