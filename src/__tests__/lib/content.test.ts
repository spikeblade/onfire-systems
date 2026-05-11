import { describe, it, expect } from 'vitest'
import { get } from '../../lib/content'

const map = {
  hero:  { title: 'Hola', subtitle: 'Mundo' },
  stats: { years: '7', uptime: '99.9%' },
  empty: { blank: '' },
}

describe('get()', () => {
  it('devuelve el valor cuando sección y clave existen', () => {
    expect(get(map, 'hero', 'title')).toBe('Hola')
  })

  it('devuelve el fallback cuando la clave no existe en la sección', () => {
    expect(get(map, 'hero', 'missing', 'default')).toBe('default')
  })

  it('devuelve string vacío como fallback por defecto', () => {
    expect(get(map, 'hero', 'missing')).toBe('')
  })

  it('devuelve fallback cuando la sección no existe', () => {
    expect(get(map, 'inexistente', 'key', 'fb')).toBe('fb')
  })

  it('no usa fallback cuando el valor es string vacío (comportamiento ??)', () => {
    // ?? hace fallback solo en null/undefined, no en ''
    expect(get(map, 'empty', 'blank', 'default')).toBe('')
  })

  it('devuelve correctamente números como string', () => {
    expect(get(map, 'stats', 'years')).toBe('7')
    expect(get(map, 'stats', 'uptime')).toBe('99.9%')
  })
})
