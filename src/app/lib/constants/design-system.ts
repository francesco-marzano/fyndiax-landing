// Design System Constants for Fyndiax
// "Scientific Futurism meets Venture Architecture"

export const colors = {
  // Background layers
  bg: {
    void: '#030305',
    elevated: '#0A0A0F',
    glass: 'rgba(255,255,255,0.02)',
  },
  // Border colors
  border: {
    subtle: 'rgba(255,255,255,0.06)',
    glow: 'rgba(255,255,255,0.12)',
  },
  // Text colors
  text: {
    primary: '#F1F5F9',
    secondary: '#94A3B8',
    muted: '#475569',
  },
  // Accent colors
  accent: {
    architect: {
      from: '#6366F1',
      to: '#06B6D4',
      gradient: 'linear-gradient(135deg, #6366F1, #06B6D4)',
    },
    synxay: {
      base: '#A78BFA',
      glow: 'rgba(167,139,250,0.15)',
    },
    kirevya: {
      base: '#84CC16',
      glow: 'rgba(132,204,22,0.15)',
    },
  },
} as const;

export const typography = {
  fonts: {
    display: 'var(--font-inter-tight)',
    body: 'var(--font-inter)',
    mono: 'var(--font-jetbrains-mono)',
  },
  sizes: {
    h1: {
      desktop: { size: '72px', lineHeight: '1.1', weight: '700', letterSpacing: '-0.03em' },
      mobile: { size: '40px', lineHeight: '1.1', weight: '700', letterSpacing: '-0.02em' },
    },
    h2: {
      desktop: { size: '48px', lineHeight: '1.2', weight: '600', letterSpacing: '-0.02em' },
      mobile: { size: '32px', lineHeight: '1.2', weight: '600', letterSpacing: '-0.01em' },
    },
    h3: {
      desktop: { size: '24px', lineHeight: '1.3', weight: '600', letterSpacing: '-0.01em' },
      mobile: { size: '20px', lineHeight: '1.3', weight: '600', letterSpacing: '0' },
    },
    eyebrow: {
      size: '12px',
      lineHeight: '1.4',
      weight: '500',
      letterSpacing: '0.08em',
    },
    body: {
      size: '17px',
      lineHeight: '1.7',
      weight: '400',
    },
    bodySmall: {
      size: '15px',
      lineHeight: '1.6',
      weight: '400',
    },
  },
} as const;

export const spacing = {
  containerMaxWidth: '1280px',
  containerPadding: {
    mobile: '24px',
    desktop: '48px',
  },
  sectionPadding: {
    mobile: '80px',
    desktop: '120px',
  },
  cardGap: '24px',
} as const;

export const borderRadius = {
  card: '24px',
  buttonPill: '12px',
  buttonStandard: '8px',
  input: '8px',
} as const;

export const animation = {
  duration: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.6s',
    xslow: '1s',
  },
  easing: {
    default: 'cubic-bezier(0.16, 1, 0.3, 1)', // ease-out-expo
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

export const shadows = {
  glass: `
    0 0 0 1px rgba(255,255,255,0.03) inset,
    0 4px 24px rgba(0,0,0,0.4)
  `,
  glow: '0 0 20px rgba(99, 102, 241, 0.3)',
  glowSynxay: '0 0 20px rgba(167, 139, 250, 0.3)',
  glowKirevya: '0 0 20px rgba(132, 204, 22, 0.3)',
} as const;

// Glassmorphism recipe
export const glassmorphism = {
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  boxShadow: shadows.glass,
} as const;

