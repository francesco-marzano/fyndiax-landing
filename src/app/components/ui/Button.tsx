'use client';

import { useRef, useState, MouseEvent, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/app/lib/utils/cn';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'large';
  magnetic?: boolean;
  className?: string;
  onClick?: (e?: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  href?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'default',
  magnetic = true,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  href,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!magnetic || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setPosition({
      x: (e.clientX - centerX) * 0.15,
      y: (e.clientY - centerY) * 0.15,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = cn(
    'relative inline-flex items-center justify-center font-semibold transition-all duration-300',
    'rounded-xl overflow-hidden',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-void',
    disabled && 'opacity-50 cursor-not-allowed'
  );

  const variantStyles = {
    primary: cn(
      'text-white',
      'bg-gradient-to-r from-accent-primary to-accent-secondary',
      'shadow-lg shadow-accent-primary/20',
      'hover:shadow-xl hover:shadow-accent-primary/30',
      'hover:scale-[1.02]',
      'active:scale-[0.98]'
    ),
    secondary: cn(
      'text-text-primary',
      'bg-bg-glass border border-border-medium',
      'backdrop-blur-glass',
      'hover:bg-bg-glass-hover hover:border-border-glow',
      'hover:scale-[1.02]',
      'active:scale-[0.98]'
    ),
    ghost: cn(
      'text-text-secondary',
      'bg-transparent',
      'hover:text-text-primary hover:bg-bg-glass',
      'active:scale-[0.98]'
    ),
  };

  const sizeStyles = {
    default: 'px-6 py-3 text-sm gap-2',
    large: 'px-8 py-4 text-base gap-3',
  };

  const Component = href ? 'a' : 'button';

  const content = (
    <motion.span
      className="relative z-10 flex items-center gap-2"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.span>
  );

  const props = {
    ref: buttonRef as React.RefObject<HTMLButtonElement & HTMLAnchorElement>,
    className: cn(baseStyles, variantStyles[variant], sizeStyles[size], className),
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    ...(href ? { href } : { type, onClick, disabled }),
  };

  return <Component {...props}>{content}</Component>;
}

export default Button;
