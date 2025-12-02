'use client';

import { ReactNode } from 'react';
import { cn } from '@/app/lib/utils/cn';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  hover?: boolean;
}

export function GlassPanel({
  children,
  className = '',
  padding = 'medium',
  hover = true,
}: GlassPanelProps) {
  const paddingStyles = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  };

  return (
    <div
      className={cn(
        'glass-panel',
        paddingStyles[padding],
        hover && 'transition-[border-color,box-shadow] duration-300',
        className
      )}
    >
      {children}
    </div>
  );
}

export default GlassPanel;

