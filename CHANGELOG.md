# Changelog — OnFire Systems

Todos los cambios notables del proyecto se documentan aquí.  
Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).

---

## [Unreleased] — develop

### Componentes reutilizables — 2026-05-11

### Added
- `src/components/PageHero.astro` — hero compartido para las 4 páginas interiores (eyebrow, titleHtml, subtitle, accents)
- `src/components/CTAStrip.astro` — franja CTA con variantes `gray` / `dark` y props para heading HTML y botón
- `src/components/SectionHeader.astro` — par section-tag + section-title con animación reveal

### Changed
- `servicios`, `nosotros`, `proceso`, `contacto` — refactorizados para usar los nuevos componentes; eliminados bloques `.cta-strip` duplicados en estilos scoped
- `global.css` — añadidas clases `.cta-strip--gray` y `.cta-strip--dark`

---

### Fixes varios — 2026-05-11

### Added
- `src/pages/404.astro` — página de error 404 con diseño consistente al sitio

### Fixed
- **`/` (index):** Stat "Años de experiencia" era `|| '7'` hardcodeado → cambiado a `|| yearsActive` para que se actualice automáticamente cada año
- **`/api/contact`:** Campos del usuario se interpolaban sin escapar en el HTML del email → añadida función `esc()` para prevenir inyección HTML en notificaciones Resend
- **`/` (index):** Eliminado `.section-tag` duplicado en estilos scoped (ya existía en `global.css` con valores idénticos)

---

### Menú móvil — 2026-05-11

### Fixed
- Menú hamburguesa se renderizaba fuera de pantalla — `backdrop-filter` en `<nav>` creaba un containing block para `position:fixed`, desplazando el overlay. Solución: clase `menu-open` que desactiva `backdrop-filter` solo cuando el menú está abierto
- Menú sin indicador de página activa en móvil — añadido `border-left` de color por ítem activo/hover
- Scroll horizontal forzado al abrir el menú — corregido con `overflow-x: hidden` en `html`

---

### SEO — 2026-05-11

### Added
- `public/og-default.svg` — imagen OG branded 1200×630 (elimina referencia rota a `og-default.jpg`)
- `src/pages/sitemap.xml.ts` — sitemap dinámico: `lastmod` siempre muestra la fecha actual
- Meta `geo.region` y `geo.placename` para targeting Colombia
- Meta `robots` ampliado con `max-snippet:-1` y `max-video-preview:-1`

### Fixed
- Google Fonts movido de `@import` CSS (render-blocking) a `<link rel="preconnect">` en el `<head>` — mejora LCP/Core Web Vitals
- Schema.org `logo` apuntaba a `logo.png` (no existía) → corregido a `favicon.svg`
- `public/sitemap.xml` estático con fechas de mayo 2025 → reemplazado por endpoint dinámico

---

### Responsive & Timeline — 2026-05-11

### Fixed
- **`/` (index):** Título hero recortado en móvil y desktop — el `font-size` máximo de `9rem` hacía que "que encienden" desbordara el contenedor de 1100px y quedara cortado por el `overflow: hidden` de la animación. Reducido a `clamp(3.5rem, 8vw, 7rem)`.
- **`/` (index):** Responsive móvil del hero — añadidos overrides para `≤768px` (`clamp(2.5rem, 11vw, 5rem)`) y `≤480px` (`clamp(2rem, 10vw, 3rem)`).

### Changed
- **`/nosotros`:** Línea de tiempo completamente dinámica. Los años ahora se calculan desde `FOUNDING_YEAR = 2019` para que nunca queden desfasados al cambiar de año. Corregido: antes mostraba 2018 como año 1 (debía ser 2019) y "HOY — 2025" (debía ser 2026).
- **`/nosotros`:** Título del hero, meta title, meta description y contador de años ahora usan `new Date().getFullYear() - 2019` automáticamente.

---

## [1.0.0] — 2026-05-01 · master

### Added
- Sitio web corporativo completo: Home, Servicios, Nosotros, Proceso, Contacto
- Panel admin con autenticación Supabase (cookie `sb-token`), editor de contenido CMS y vista de leads
- SEO completo: meta tags, Open Graph, Twitter Card, Schema.org (Organization + LocalBusiness), sitemap, robots.txt
- Diseño responsive completo para móvil y tablet (breakpoints 768px y 480px)
- Formulario de contacto con envío de email via Resend y guardado de lead en Supabase
- Cursor personalizado animado (desktop only)
- Animaciones de entrada: `slideUp` en hero, `.reveal` con IntersectionObserver en secciones
- Deploy en Netlify con SSR (`@astrojs/netlify`), Node.js 22
