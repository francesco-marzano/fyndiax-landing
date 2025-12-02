'use client';

import { useRef, useState, MouseEvent, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/app/lib/utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  tiltEnabled?: boolean;
  glowOnHover?: boolean;
  glowColor?: 'architect' | 'synxay' | 'kirevya';
  onClick?: () => void;
}

export function Card({
  children,
  className = '',
  tiltEnabled = true,
  glowOnHover = true,
  glowColor = 'architect',
  onClick,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate rotation (max 5 degrees)
    if (tiltEnabled) {
      const rotateXValue = ((mouseY - centerY) / (rect.height / 2)) * -5;
      const rotateYValue = ((mouseX - centerX) / (rect.width / 2)) * 5;
      setRotateX(rotateXValue);
      setRotateY(rotateYValue);
    }

    // Calculate glow position
    const glowX = ((mouseX - rect.left) / rect.width) * 100;
    const glowY = ((mouseY - rect.top) / rect.height) * 100;
    setGlowPosition({ x: glowX, y: glowY });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const glowColors = {
    architect: 'rgba(99, 102, 241, 0.15)',
    synxay: 'rgba(167, 139, 250, 0.2)',
    kirevya: 'rgba(132, 204, 22, 0.2)',
  };

  const borderGlowColors = {
    architect: 'rgba(99, 102, 241, 0.4)',
    synxay: 'rgba(167, 139, 250, 0.4)',
    kirevya: 'rgba(132, 204, 22, 0.4)',
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative rounded-[var(--radius-card)] overflow-hidden',
        'bg-[var(--bg-glass)] backdrop-blur-[16px]',
        'border border-[var(--border-subtle)]',
        'transition-[border-color,box-shadow] duration-300',
        onClick && 'cursor-pointer',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={onClick ? { scale: 0.98 } : undefined}
    >
      {/* Glow border effect */}
      {glowOnHover && (
        <motion.div
          className="absolute inset-0 rounded-[var(--radius-card)] pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${borderGlowColors[glowColor]} 0%, transparent 50%)`,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Inner glow */}
      {glowOnHover && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColors[glowColor]} 0%, transparent 60%)`,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Hover border */}
      <motion.div
        className="absolute inset-0 rounded-[var(--radius-card)] pointer-events-none"
        style={{
          border: '1px solid transparent',
          borderColor: isHovered ? 'var(--border-glow)' : 'transparent',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default Card;

