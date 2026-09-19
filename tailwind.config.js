/** @type {import('tailwindcss').Config} */

/* Every colour here resolves to a role token from src/styles/tokens.css.
   No literal hex belongs in this file — that is what made the old palette
   impossible to theme. */
const token = (name) => `var(--io-color-${name})`;

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Surfaces
        surface: token('background-neutral-base'),
        'surface-minimal': token('background-neutral-minimal'),
        'surface-subtle': token('background-neutral-subtle'),
        'surface-moderate': token('background-neutral-moderate'),
        'surface-translucent': token('background-neutral-translucent'),
        'surface-bold': token('background-neutral-bold'),
        'surface-contrast': token('background-neutral-contrast'),
        'surface-inverted': token('background-inverted-base'),
        'surface-inverted-minimal': token('background-inverted-minimal'),
        'surface-inverted-moderate': token('background-inverted-moderate'),

        // Text
        heading: token('text-neutral-strong'),
        body: token('text-neutral'),
        muted: token('text-neutral-variant'),
        subtle: token('text-neutral-subtle'),
        'on-contrast': token('text-neutral-on-contrast'),
        inverted: token('text-inverted'),

        // Brand
        brand: token('background-brand-bold'),
        'brand-hovered': token('background-brand-bold-hovered'),
        'brand-pressed': token('background-brand-bold-pressed'),
        'brand-moderate': token('background-brand-moderate'),
        'brand-subtle': token('background-brand-subtle'),
        'brand-minimal': token('background-brand-minimal'),
        'brand-text': token('text-brand'),
        'on-brand': token('text-brand-on-bold'),

        // Status
        danger: token('background-danger-bold'),
        'danger-minimal': token('background-danger-minimal'),
        'danger-text': token('text-danger'),
        success: token('background-success-bold'),
        'success-minimal': token('background-success-minimal'),
        'success-text': token('text-success'),
        info: token('background-info-bold'),
        'info-minimal': token('background-info-minimal'),
        'info-text': token('text-info'),
      },
      borderColor: {
        DEFAULT: token('border-neutral-subtle'),
        subtle: token('border-neutral-subtle'),
        moderate: token('border-neutral-moderate'),
        bold: token('border-neutral-bold'),
        'brand-subtle': token('border-brand-subtle'),
        'brand-moderate': token('border-brand-moderate'),
        'brand-bold': token('border-brand-bold'),
        focused: token('border-focused'),
      },
      fontFamily: {
        sans: [
          'Hanken Grotesk',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      // Spaceship's radius scale — large by convention; buttons are pills.
      borderRadius: {
        '3x-small': 'var(--io-radius-3x-small)',
        '2x-small': 'var(--io-radius-2x-small)',
        'x-small': 'var(--io-radius-x-small)',
        small: 'var(--io-radius-small)',
        medium: 'var(--io-radius-medium)',
        large: 'var(--io-radius-large)',
        'x-large': 'var(--io-radius-x-large)',
        '2x-large': 'var(--io-radius-2x-large)',
      },
      boxShadow: {
        bevel: 'var(--io-shadow-bevel)',
        raised: 'var(--io-shadow-raised)',
        'raised-variant': 'var(--io-shadow-raised-variant)',
        overlay: 'var(--io-shadow-overlay)',
      },
      // 4px base, matching the token scale's used steps.
      spacing: {
        section: 'var(--io-space-2400)',
        'section-sm': 'var(--io-space-1600)',
      },
      maxWidth: {
        content: '75rem',
        prose: '44rem',
      },
      transitionTimingFunction: {
        io: 'var(--io-ease)',
        'io-out': 'var(--io-ease-out)',
      },
      transitionDuration: {
        fast: 'var(--io-duration-fast)',
        base: 'var(--io-duration-base)',
        slow: 'var(--io-duration-slow)',
      },
      keyframes: {
        'io-rise': {
          '0%': { opacity: '0', transform: 'translateY(1.5rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'io-rise': 'io-rise 600ms var(--io-ease-out) both',
      },
    },
  },
  plugins: [],
};
