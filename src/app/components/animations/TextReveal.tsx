'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  splitBy?: 'word' | 'char';
  staggerDelay?: number;
  triggerOnScroll?: boolean;
}

export function TextReveal({
  children,
  className = '',
  as: Component = 'span',
  splitBy = 'word',
  staggerDelay = 0.05,
  triggerOnScroll = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    const container = containerRef.current;
    const text = children;
    
    // Split text
    const units = splitBy === 'word' 
      ? text.split(' ').map(word => word + ' ')
      : text.split('');

    // Clear container and create spans
    container.innerHTML = '';
    
    units.forEach((unit) => {
      const span = document.createElement('span');
      span.textContent = unit;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px) rotateX(-10deg)';
      span.style.filter = 'blur(5px)';
      span.style.transformOrigin = 'center bottom';
      if (splitBy === 'char' && unit === ' ') {
        span.style.width = '0.3em';
      }
      container.appendChild(span);
    });

    const spans = container.querySelectorAll('span');

    const animate = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      gsap.to(spans, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power3.out',
        stagger: staggerDelay,
      });
    };

    if (triggerOnScroll) {
      ScrollTrigger.create({
        trigger: container,
        start: 'top 80%',
        onEnter: animate,
      });
    } else {
      // Animate immediately with a small delay
      setTimeout(animate, 100);
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [children, splitBy, staggerDelay, triggerOnScroll]);

  return (
    <Component
      ref={containerRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={className}
      style={{ perspective: '1000px' }}
    >
      {children}
    </Component>
  );
}

export default TextReveal;

