/** Design tokens pulled from the Figma "Final Screens" page. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Mobile-first. `col` = the centred 480 px app column (tablets / large phones); listed first
    // so larger breakpoints still win in the cascade.
    screens: { col: '481px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
    extend: {
      fontFamily: { sans: ['Poppins', 'system-ui', 'sans-serif'] },
      colors: {
        // Brand orange is #FF7900 everywhere (fills, borders, selected states, decoration); filled
        // orange buttons use white text (product-owner decision — note white on #FF7900 is 2.6:1,
        // below WCAG AA). Orange TEXT on light backgrounds uses #A34D00 (kit's #B55600 deepened; ≥ 5.2:1 on white, tint and canvas).
        brand: {
          DEFAULT: '#ff7900',
          hover: '#e86e00', // hover/pressed fill
          bright: '#ff7900', // decorative (progress fill, illustrations) — alias of DEFAULT
          600: '#a34d00', // orange text & overline labels (kit #B55600, deepened to pass AA on tints)
          700: '#a34d00', // outline button text/border
          50: '#fff2e6', // outline button fill
        },
        danger: { DEFAULT: '#b54a45', 50: '#fbeceb' }, // kit red (due dates, errors) — 5.2:1 on white
        section: {
          // From the HPC design kit (S01-02); A and B share blue in the kit
          a: '#2f4fb3', 'a-bg': '#e6edff',
          b: '#2f4fb3', 'b-bg': '#e6edff',
          c: '#6a3fc4', 'c-bg': '#efe8ff',
          d: '#b0305e', 'd-bg': '#fde7ef',
        },
        provenance: {
          teacher: '#a34d00', 'teacher-bg': '#fff2e6',
          student: '#6a3fc4', 'student-bg': '#efe8ff',
          peer: '#1f6f5c', 'peer-bg': '#e3f4ef', // proposed (OQ-SEC-5)
          vsk: '#2f5fa0', 'vsk-bg': '#eaf1fa',
        },
        cream: { DEFAULT: '#fff9f2', border: '#e7d9ca' },
        ink: { DEFAULT: '#221f26', 2: '#3f3d45', muted: '#625f6a' },
        line: '#e4e1dd',
        surface: '#f4f2ef',
        appbar: '#fffaf6',
        slate: { 500: '#64748b', 900: '#0f172a' },
      },
      boxShadow: {
        card: '0px 2px 4px rgba(0,0,0,0.03), 0px 8px 12px rgba(0,0,0,0.06)',
      },
      keyframes: {
        'slide-in-right': { from: { transform: 'translateX(24%)', opacity: 0 }, to: { transform: 'none', opacity: 1 } },
        'slide-in-left': { from: { transform: 'translateX(-24%)', opacity: 0 }, to: { transform: 'none', opacity: 1 } },
        'fade-up': { from: { transform: 'translateY(12px)', opacity: 0 }, to: { transform: 'none', opacity: 1 } },
        'fade-in': { from: { opacity: 0 }, to: { opacity: 1 } },
        'sheet-up': { from: { transform: 'translateY(100%)' }, to: { transform: 'none' } },
        'pop-in': { '0%': { transform: 'scale(.9)', opacity: 0 }, '60%': { transform: 'scale(1.03)', opacity: 1 }, '100%': { transform: 'scale(1)' } },
        'check-pop': { '0%': { transform: 'scale(.6)' }, '60%': { transform: 'scale(1.15)' }, '100%': { transform: 'scale(1)' } },
        shake: { '0%,100%': { transform: 'none' }, '20%,60%': { transform: 'translateX(-6px)' }, '40%,80%': { transform: 'translateX(6px)' } },
        shimmer: { from: { backgroundPosition: '-400px 0' }, to: { backgroundPosition: '400px 0' } },
        'grow-x': { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
        'grow-y': { from: { transform: 'scaleY(0)' }, to: { transform: 'scaleY(1)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        drift: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(12px,-10px) scale(1.06)' } },
      },
      animation: {
        'slide-in-right': 'slide-in-right .32s cubic-bezier(.2,.8,.2,1) both',
        'slide-in-left': 'slide-in-left .32s cubic-bezier(.2,.8,.2,1) both',
        'fade-up': 'fade-up .4s cubic-bezier(.2,.8,.2,1) both',
        'fade-in': 'fade-in .2s ease-out both',
        'sheet-up': 'sheet-up .32s cubic-bezier(.2,.8,.2,1) both',
        'pop-in': 'pop-in .32s cubic-bezier(.2,.8,.2,1) both',
        'check-pop': 'check-pop .25s ease-out both',
        shake: 'shake .4s ease-in-out',
        shimmer: 'shimmer 1.2s linear infinite',
        'grow-x': 'grow-x .8s cubic-bezier(.2,.8,.2,1) both',
        'grow-y': 'grow-y .8s cubic-bezier(.2,.8,.2,1) both',
        float: 'float 4s ease-in-out infinite',
        drift: 'drift 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
