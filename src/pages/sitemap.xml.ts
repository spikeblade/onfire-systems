export async function GET() {
  const SITE = 'https://onfiresystems.co'
  const today = new Date().toISOString().split('T')[0]

  const pages = [
    { url: '/',          priority: '1.0', changefreq: 'weekly'  },
    { url: '/servicios', priority: '0.9', changefreq: 'monthly' },
    { url: '/contacto',  priority: '0.8', changefreq: 'monthly' },
    { url: '/nosotros',  priority: '0.7', changefreq: 'monthly' },
    { url: '/proceso',   priority: '0.7', changefreq: 'monthly' },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages.map(p => `  <url>
    <loc>${SITE}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
