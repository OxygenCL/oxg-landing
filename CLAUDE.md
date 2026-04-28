@AGENTS.md

# Oxygen Web — oxg-landing

## Repositorio y deploy
- **GitHub:** https://github.com/OxygenCL/oxg-landing
- **Rama principal:** `main`
- **Deploy automático:** Vercel → oxygen.tech (cada push a main se publica en ~2 min)
- **Local:** `C:/Users/arman/Desktop/Code/oxg-landing`

## Stack
- Next.js 16 App Router (TypeScript)
- Tailwind CSS
- Vercel

## Flujo de trabajo
1. Hacer cambios en archivos locales
2. `git add` + `git commit` + `git push origin main`
3. Vercel despliega automáticamente
4. **Siempre** hacer `git pull origin main` antes de pushear (V0 puede haber pusheado cambios)

## Estructura del proyecto
- `/app/page.tsx` — Home
- `/app/[pagina]/page.tsx` — Páginas internas
- `/components/navbar.tsx` — Navbar con menú móvil accordion
- `/components/footer.tsx` — Footer
- `/components/home/` — Secciones de la home
- `/public/` — Assets estáticos (logos, videos, imágenes)

## Reglas importantes
- Trabajar siempre en `main`, no crear ramas salvo que el usuario lo pida
- V0 (editor visual) crea sus propias ramas y hace PR → se mergea a main automáticamente
- Si hay conflicto al pushear: `git pull origin main --rebase` y luego push

## Convenciones de código — Mobile responsive
- **Patrón de padding móvil:** `py-24` → `py-12 sm:py-24`
- **Gaps:** `gap-16` → `gap-8 sm:gap-16`
- **Padding horizontal:** `px-6` → `px-4 sm:px-6`
- Animaciones desktop-only: usar `hidden md:block` o detectar con `window.innerWidth < 768`
- Dividers en flex-col/row: usar `divide-y sm:divide-y-0 sm:divide-x` en el contenedor

## Integraciones activas
- **Google Analytics:** `G-M686HVFHCG`
- **Google Tag Manager:** `GTM-MJTFLPVC`
- **Apollo Tracker:** appId `69bbfba25adf46001526766e`
- **Sitemap:** https://www.oxygen.tech/sitemap.xml (26 URLs)

## Favicon
- `app/icon.png` — favicon principal (32x32)
- `public/icon-light-32x32.png` — modo claro
- `public/icon-dark-32x32.png` — modo oscuro
- `app/apple-icon.png` — iOS (180x180)
- Fuente: `C:/Users/arman/Downloads/Logos Oxygen/Isotipo White.png`

## Productos Oxygen
- **OxyPulse** — CMMS, producto principal, operativo
- **OxyPlanner** — Planificación con IA, en desarrollo
- **Advisory** — Diagnóstico e implementación industrial
