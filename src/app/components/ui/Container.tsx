import { ReactNode } from 'react';
import { cn } from '@/app/lib/utils/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}

export function Container({
  children,
  className = '',
  size = 'default',
}: ContainerProps) {
  const sizeStyles = {
    default: 'max-w-[1280px]',
    narrow: 'max-w-[720px]',
    wide: 'max-w-[1440px]',
  };

  return (
    <div
      className={cn(
        'mx-auto px-6 md:px-12',
        sizeStyles[size],
        className
      )}
    >
      {children}
    </div>
  );
}

export default Container;

