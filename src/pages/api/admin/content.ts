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

export const PUT: APIRoute = async ({ request }) => {
  const client = await getAuthClient(request)
  if (!client) return new Response('Unauthorized', { status: 401 })

  const { page, section, key, value } = await request.json()
  if (!page || !section || !key) return new Response('Bad request', { status: 400 })

  const { error } = await client
    .from('page_content')
    .upsert({ page, section, key, value }, { onConflict: 'page,section,key' })

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  return new Response(JSON.stringify({ ok: true }))
}

export const GET: APIRoute = async ({ request }) => {
  const client = await getAuthClient(request)
  if (!client) return new Response('Unauthorized', { status: 401 })

  const { data, error } = await client
    .from('page_content')
    .select('*')
    .order('page')
    .order('section')
    .order('key')

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
}
