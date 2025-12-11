'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionTitleProps {
  text: string;
  highlightWords?: string[];
  className?: string;
}

export function SectionTypewriter({
  text,
  highlightWords = [],
  className = '',
}: SectionTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // Split text into words
  const words = text.split(' ');

  // Check if word should be highlighted
  const isHighlighted = (word: string) => {
    return highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase()));
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <h2 style={{ textWrap: 'balance' }}>
        {words.map((word, wordIndex) => {
          const highlighted = isHighlighted(word);
          
          return (
            <motion.span
              key={wordIndex}
              className={`inline-block whitespace-nowrap mr-[0.3em] ${highlighted ? 'gradient-text' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0, 
              } : {}}
              transition={{ 
                duration: 0.4,
                delay: wordIndex * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {word}
            </motion.span>
          );
        })}
      </h2>
    </div>
  );
}

export default SectionTypewriter;
