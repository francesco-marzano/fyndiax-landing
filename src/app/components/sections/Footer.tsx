'use client';

import { motion } from 'framer-motion';
import { Linkedin, ArrowUp } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-10 sm:py-12 md:py-16 border-t border-border-subtle overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.div
          className="text-[20vw] font-bold tracking-tighter whitespace-nowrap"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          FYNDIAX
        </motion.div>
      </div>

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Logo & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="text-lg sm:text-xl font-bold text-text-primary hover:text-accent-primary transition-colors"
            >
              FYNDIAX
            </a>
            <span className="text-text-muted text-xs sm:text-sm">
              © {currentYear} Fyndiax. All rights reserved.
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            {/* Social */}
            <div className="flex items-center gap-3 sm:gap-4">
              <motion.a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-bg-glass border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border-medium transition-all min-w-[44px] min-h-[44px]"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
            </div>

            {/* Legal */}
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-text-muted">
              <a href="#" className="hover:text-text-primary transition-colors py-2">
                Privacy
              </a>
              <a href="#" className="hover:text-text-primary transition-colors py-2">
                Terms
              </a>
            </div>

            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary hover:bg-accent-primary/20 transition-all min-w-[44px] min-h-[44px]"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
