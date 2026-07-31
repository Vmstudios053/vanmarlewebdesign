# Van Marle Webdesign

Cinematische 3D-website voor vanmarlewebdesign.nl — 3D-websites voor klusbedrijven en zzp'ers, met online agenda/afsprakenmodule en SEO.

## Techstack

- [Vite](https://vitejs.dev/) + React
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [drei](https://github.com/pmndrs/drei) — 3D-scene (huis dat zichzelf opbouwt tijdens het scrollen)
- [GSAP ScrollTrigger](https://gsap.com/scrolltrigger/) — scroll-animaties
- [Lenis](https://lenis.darkroom.engineering/) — smooth scroll
- [Tailwind CSS v4](https://tailwindcss.com/)

## Ontwikkelen

```bash
npm install
npm run dev      # dev-server op http://localhost:5173
npm run build    # productie-build naar dist/
npm run preview  # bekijk de productie-build lokaal
```

## Deploy

`npm run build` genereert een statische site in `dist/` — te hosten op elke statische host (GitHub Pages, Netlify, Vercel, eigen server).
