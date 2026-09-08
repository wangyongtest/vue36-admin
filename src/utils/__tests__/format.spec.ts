import { describe, it, expect } from 'vitest'
import { formatDate, formatBytes } from '../format'

describe('format utils', () => {
  it('formatDate returns placeholder for empty', () => {
    expect(formatDate(null)).toBe('-')
    expect(formatDate('')).toBe('-')
  })

  it('formatDate formats ISO string', () => {
    expect(formatDate('2026-09-08T12:00:00.000Z')).toMatch(/2026-09-08/)
  })

  it('formatBytes formats size', () => {
    expect(formatBytes(0)).toBe('0 B')
    expect(formatBytes(1024)).toBe('1.00 KB')
  })
})
