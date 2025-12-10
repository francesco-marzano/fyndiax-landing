'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

const navLinks = [
  { label: 'Model', href: '#model' },
  { label: 'Builders', href: '#builders' },
  { label: 'Startup', href: '#ventures' },
  { label: 'Partners', href: '#partners' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY > 100);
      setHasScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setIsMobileMenuOpen(false);
    window.lenis?.scrollTo(href);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 px-4"
          >
            <nav 
              className={`
                flex items-center justify-center gap-1
                px-4 py-2.5 rounded-full
                transition-all duration-500 ease-out
                ${hasScrolled 
                  ? 'bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20' 
                  : 'bg-black/60 backdrop-blur-lg border border-white/5'
                }
              `}
            >
              {/* Logo */}
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 font-bold text-white hover:text-accent-primary transition-colors tracking-wider text-sm"
              >
                FYNDIAX
              </a>

              {/* Separator - Desktop only */}
              <div className="hidden md:block w-px h-4 bg-white/20 mx-2" />

              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Separator - Desktop only */}
              <div className="hidden md:block w-px h-4 bg-white/20 mx-2" />

              {/* CTA Button - Desktop */}
              <Button
                variant="primary"
                size="default"
                onClick={() => handleNavClick('#contact')}
                className="hidden md:inline-flex !py-1.5 !px-4 !text-sm !rounded-full"
              >
                Talk to us
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-white/90 hover:text-white transition-colors rounded-full hover:bg-white/10 ml-1"
                aria-label="Apri menu"
              >
                <Menu size={20} />
              </button>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            {/* Close button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-3 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
              aria-label="Chiudi menu"
            >
              <X size={24} />
            </button>

            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold text-white tracking-widest mb-10"
            >
              FYNDIAX
            </motion.a>

            {/* Nav links */}
            <div className="flex flex-col items-center gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="text-2xl font-medium text-white/70 hover:text-white transition-colors py-3 px-6 rounded-xl hover:bg-white/5"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.05 + 0.1 }}
              className="mt-10"
            >
              <Button 
                variant="primary" 
                size="large" 
                onClick={() => handleNavClick('#contact')}
                className="!rounded-full !px-8"
              >
                Talk to us
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
