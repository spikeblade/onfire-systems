import { vi, describe, it, expect } from 'vitest'

// Mock del cliente de Supabase antes de importar el módulo
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({})),
}))

import { getCookieToken } from '../../lib/supabase'

describe('getCookieToken()', () => {
  it('extrae el token de un header de cookies válido', () => {
    expect(getCookieToken('sb-token=abc123; Path=/')).toBe('abc123')
  })

  it('devuelve null cuando el header es null', () => {
    expect(getCookieToken(null)).toBeNull()
  })

  it('devuelve null cuando no hay cookie sb-token', () => {
    expect(getCookieToken('session=xyz; user=foo')).toBeNull()
  })

  it('decodifica un token URI-encoded', () => {
    const encoded = encodeURIComponent('tok/en+val=ue')
    expect(getCookieToken(`sb-token=${encoded}`)).toBe('tok/en+val=ue')
  })

  it('extrae sb-token cuando hay varias cookies', () => {
    expect(getCookieToken('other=val; sb-token=mytoken; another=thing')).toBe('mytoken')
  })

  it('devuelve null con string vacío', () => {
    expect(getCookieToken('')).toBeNull()
  })
})
