# Changelog — OnFire Systems

Todos los cambios notables del proyecto se documentan aquí.  
Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).

---

## [Unreleased] — develop

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
