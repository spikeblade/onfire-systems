import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/__tests__/**/*.test.ts'],
    // env vars mínimos para que supabase.ts no falle al importar
    env: {
      PUBLIC_SUPABASE_URL: 'http://localhost:54321',
      PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      include: ['src/lib/**/*.ts', 'src/pages/sitemap.xml.ts'],
      exclude: ['src/lib/supabase.ts'], // solo wrappers de cliente externo
    },
  },
})
