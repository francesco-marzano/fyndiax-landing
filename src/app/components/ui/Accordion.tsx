'use client';

import { ReactNode } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/app/lib/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionProps {
  items: {
    id: string;
    title: string;
    content: ReactNode;
  }[];
  className?: string;
}

export function Accordion({ items, className = '' }: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      className={cn('space-y-4', className)}
    >
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.id}
          value={item.id}
          className="group"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger
              className={cn(
                'flex items-center justify-between w-full py-4',
                'text-left text-[var(--text-primary)] font-medium',
                'border-b border-[var(--border-subtle)]',
                'transition-colors duration-300',
                'hover:text-[var(--text-primary)]',
                'group-data-[state=open]:border-[var(--border-glow)]'
              )}
            >
              <span>{item.title}</span>
              <span className="ml-4 flex-shrink-0">
                <Plus className="h-5 w-5 text-[var(--text-muted)] group-data-[state=open]:hidden transition-transform duration-300" />
                <Minus className="h-5 w-5 text-[var(--text-muted)] hidden group-data-[state=open]:block transition-transform duration-300" />
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content
            className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-4 text-[var(--text-secondary)] text-[15px] leading-relaxed"
            >
              {item.content}
            </motion.div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

export default Accordion;

