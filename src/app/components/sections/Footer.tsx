'use client';

import { motion } from 'framer-motion';
import { Linkedin, Twitter, ArrowUp } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 border-t border-border-subtle overflow-hidden">
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

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-6">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="text-xl font-bold text-text-primary hover:text-accent-primary transition-colors"
            >
              FYNDIAX
            </a>
            <span className="text-text-muted text-sm">
              © {currentYear} Fyndiax. All rights reserved.
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            {/* Social */}
            <div className="flex items-center gap-4">
              <motion.a
                href="#"
                className="w-10 h-10 rounded-xl bg-bg-glass border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border-medium transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 rounded-xl bg-bg-glass border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border-medium transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
            </div>

            {/* Legal */}
            <div className="flex items-center gap-6 text-sm text-text-muted">
              <a href="#" className="hover:text-text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-text-primary transition-colors">
                Terms
              </a>
            </div>

            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary hover:bg-accent-primary/20 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
