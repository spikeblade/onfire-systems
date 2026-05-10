import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.PUBLIC_SUPABASE_URL
const anon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(url, anon)

export function supabaseWithToken(token: string) {
  return createClient(url, anon, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  })
}

export function getCookieToken(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null
  const match = cookieHeader.match(/sb-token=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}
