import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cohere: {
          black: '#000000',
          nearblack: '#17171c',
          green: '#003c33',
          navy: '#071829',
          blue: '#1863dc',
          coral: '#ff7759',
          softcoral: '#ffad9b',
          canvas: '#ffffff',
          stone: '#eeece7',
          greenwash: '#edfce9',
          bluewash: '#f1f5ff',
          cardborder: '#f2f2f2',
          ink: '#212121',
          muted: '#93939f',
          slate: '#75758a',
          hairline: '#d9d9dd',
          borderlight: '#e5e7eb',
          focusblue: '#4c6ee6',
          focusviolet: '#9b60aa',
          error: '#b30000'
        }
      },
      fontFamily: {
        display: ['CohereText', 'Space Grotesk', 'Inter', 'ui-sans-serif', 'system-ui'],
        body: ['"Unica77 Cohere Web"', 'Inter', 'Arial', 'ui-sans-serif', 'system-ui'],
        mono: ['CohereMono', 'Arial', 'ui-sans-serif', 'system-ui']
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '22px',
        'xl': '30px',
        'pill': '32px',
        'full': '9999px'
      },
      spacing: {
        '0.5': '2px',
        '1.5': '6px',
        '2': '8px',
        '2.5': '10px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '5.5': '22px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px',
        '10': '40px',
        '14': '56px',
        '15': '60px',
        '16': '64px',
        '20': '80px'
      }
    }
  },
  plugins: [
    typography,
  ],
}
