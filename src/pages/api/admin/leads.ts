import type { APIRoute } from 'astro'
import { supabaseWithToken, getCookieToken } from '../../../lib/supabase'

async function getAuthClient(request: Request) {
  const token = getCookieToken(request.headers.get('cookie'))
  if (!token) return null
  const client = supabaseWithToken(token)
  const { data: { user } } = await client.auth.getUser()
  if (!user) return null
  return client
}

export const PATCH: APIRoute = async ({ request }) => {
  const client = await getAuthClient(request)
  if (!client) return new Response('Unauthorized', { status: 401 })

  const { id } = await request.json()
  if (!id) return new Response('Bad request', { status: 400 })

  const { error } = await client.from('leads').update({ read: true }).eq('id', id)
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  return new Response(JSON.stringify({ ok: true }))
}
