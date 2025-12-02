'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface CursorState {
  isHovering: boolean;
  label: string;
  scale: number;
}

export function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    label: '',
    scale: 1,
  });
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Mouse position with spring animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    
    if (!isVisible) {
      setIsVisible(true);
    }
  }, [mouseX, mouseY, isVisible]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Check if device has touch (mobile)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Add cursor-none class to body
    document.body.classList.add('custom-cursor-active');

    // Setup hover detection for interactive elements
    const setupHoverListeners = () => {
      // Links and buttons
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor], input, textarea, select'
      );

      interactiveElements.forEach((el) => {
        const element = el as HTMLElement;
        
        element.addEventListener('mouseenter', () => {
          const cursorLabel = element.dataset.cursor || getCursorLabel(element);
          setCursorState({
            isHovering: true,
            label: cursorLabel,
            scale: 1.5,
          });
        });

        element.addEventListener('mouseleave', () => {
          setCursorState({
            isHovering: false,
            label: '',
            scale: 1,
          });
        });
      });
    };

    // Initial setup
    setupHoverListeners();

    // Re-run on DOM changes (for dynamically added elements)
    const observer = new MutationObserver(() => {
      setupHoverListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('custom-cursor-active');
      observer.disconnect();
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  // Determine cursor label based on element type
  const getCursorLabel = (element: HTMLElement): string => {
    const tagName = element.tagName.toLowerCase();
    const href = element.getAttribute('href');
    const type = element.getAttribute('type');

    if (tagName === 'a') {
      if (href?.startsWith('#')) return 'Scroll';
      if (href?.startsWith('mailto:')) return 'Email';
      if (href?.startsWith('tel:')) return 'Call';
      return 'View →';
    }
    
    if (tagName === 'button') {
      if (type === 'submit') return 'Submit';
      return 'Click';
    }

    if (['input', 'textarea', 'select'].includes(tagName)) {
      return 'Type';
    }

    return '';
  };

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Inner dot */}
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: cursorState.isHovering ? 0 : 8,
            height: cursorState.isHovering ? 0 : 8,
          }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* Outer ring (appears on hover) */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white flex items-center justify-center"
          animate={{
            width: cursorState.isHovering ? 80 : 0,
            height: cursorState.isHovering ? 80 : 0,
            opacity: cursorState.isHovering ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Label inside ring */}
          <motion.span
            className="text-white text-xs font-medium whitespace-nowrap"
            animate={{
              opacity: cursorState.isHovering && cursorState.label ? 1 : 0,
              scale: cursorState.isHovering && cursorState.label ? 1 : 0.8,
            }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            {cursorState.label}
          </motion.span>
        </motion.div>
      </motion.div>
    </>
  );
}

export default CustomCursor;

