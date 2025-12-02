import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'bg-void': 'var(--bg-void)',
        'bg-elevated': 'var(--bg-elevated)',
        'bg-surface': 'var(--bg-surface)',
        'bg-glass': 'var(--bg-glass)',
        // Borders
        'border-subtle': 'var(--border-subtle)',
        'border-medium': 'var(--border-medium)',
        'border-glow': 'var(--border-glow)',
        // Text
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'text-muted': 'var(--text-muted)',
        // Accents
        'accent-primary': 'var(--accent-primary)',
        'accent-secondary': 'var(--accent-secondary)',
        'accent-synxay': 'var(--accent-synxay)',
        'accent-synxay-light': 'var(--accent-synxay-light)',
        'accent-kirevya': 'var(--accent-kirevya)',
        'accent-kirevya-light': 'var(--accent-kirevya-light)',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(48px, 8vw, 96px)', { lineHeight: '1.05', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(36px, 5vw, 56px)', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(20px, 2.5vw, 28px)', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
      },
      spacing: {
        'section': 'var(--section-padding)',
        'container': 'var(--container-padding)',
      },
      maxWidth: {
        'container': 'var(--container-max-width)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'glow': 'var(--shadow-glow)',
        'glow-synxay': 'var(--shadow-glow-synxay)',
        'glow-kirevya': 'var(--shadow-glow-kirevya)',
        'glass': 'var(--glass-shadow)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'gradient': 'gradient-shift 8s ease infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'mesh': 'mesh-move 20s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
};

export default config;
