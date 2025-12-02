'use client';

import { cn } from '@/app/lib/utils/cn';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  color?: 'default' | 'synxay' | 'kirevya';
}

export function Chip({
  label,
  selected = false,
  onClick,
  color = 'default',
}: ChipProps) {
  const colorStyles = {
    default: selected
      ? 'bg-gradient-to-r from-[var(--accent-architect-from)] to-[var(--accent-architect-to)] border-transparent text-white'
      : 'bg-transparent border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--border-glow)] hover:text-[var(--text-secondary)]',
    synxay: selected
      ? 'bg-[var(--accent-synxay)] border-transparent text-white'
      : 'bg-transparent border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--accent-synxay)] hover:text-[var(--accent-synxay)]',
    kirevya: selected
      ? 'bg-[var(--accent-kirevya)] border-transparent text-[var(--bg-void)]'
      : 'bg-transparent border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--accent-kirevya)] hover:text-[var(--accent-kirevya)]',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-full border text-sm font-medium',
        'transition-all duration-200 ease-out',
        colorStyles[color]
      )}
    >
      {label}
    </button>
  );
}

export default Chip;

