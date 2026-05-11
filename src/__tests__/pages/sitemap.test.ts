import { describe, it, expect } from 'vitest'
import { GET } from '../../pages/sitemap.xml'

describe('GET /sitemap.xml', () => {
  it('devuelve status 200', async () => {
    const res = await GET()
    expect(res.status).toBe(200)
  })

  it('usa Content-Type application/xml', async () => {
    const res = await GET()
    expect(res.headers.get('Content-Type')).toContain('application/xml')
  })

  it('devuelve XML bien formado', async () => {
    const text = await (await GET()).text()
    expect(text).toMatch(/^<\?xml version="1\.0"/)
    expect(text).toContain('<urlset')
    expect(text).toContain('</urlset>')
  })

  it('incluye las 5 páginas públicas', async () => {
    const text = await (await GET()).text()
    const pages = ['/', '/servicios', '/contacto', '/nosotros', '/proceso']
    for (const page of pages) {
      expect(text).toContain(`https://onfiresystems.co${page}`)
    }
  })

  it('lastmod coincide con la fecha de hoy', async () => {
    const today = new Date().toISOString().split('T')[0]
    const text = await (await GET()).text()
    expect(text).toContain(`<lastmod>${today}</lastmod>`)
  })

  it('home tiene la máxima prioridad (1.0)', async () => {
    const text = await (await GET()).text()
    // Extrae el bloque <url> de la home (entre la primera <url> y </url>)
    const start = text.indexOf('<url>')
    const end = text.indexOf('</url>') + '</url>'.length
    const homeBlock = text.slice(start, end)
    expect(homeBlock).toContain('onfiresystems.co/')
    expect(homeBlock).toContain('<priority>1.0</priority>')
  })
})
