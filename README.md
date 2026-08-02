# EventHub Campus — Next.js (pages router, JSX)

Standalone Next.js version of the login/register pages. This folder is **not** part of the
Lovable preview app — copy it out and run it locally.

```bash
cd nextjs-app
npm install
npm run dev   # http://localhost:3000
```

## Structure

```
nextjs-app/
  pages/
    _app.jsx        global CSS + toast provider
    _document.jsx   Google Fonts (Sora + Manrope)
    index.jsx       /          login page
    register.jsx    /register  register page (role picker)
  components/
    AuthShell.jsx   split-screen layout with slide-in animations
    ui.jsx          Button / Input / Label / Checkbox primitives
  styles/globals.css  Tailwind + design tokens
  tailwind.config.js  fonts, brand gradient, keyframes
```

All styling is Tailwind CSS (v3), animations are defined in `tailwind.config.js`
(`animate-slide-in-left`, `animate-fade-in`, `animate-grid-in`) with staggered
`animationDelay` values and a `prefers-reduced-motion` fallback.
