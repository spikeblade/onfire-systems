import type { APIRoute } from 'astro'
import { supabase } from '../../../lib/supabase'

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData()
  const email = form.get('email')?.toString() ?? ''
  const password = form.get('password')?.toString() ?? ''

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error || !data.session) {
    return redirect('/admin/login?error=1')
  }

  const token = data.session.access_token
  const expires = new Date(Date.now() + 8 * 60 * 60 * 1000).toUTCString()

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/admin',
      'Set-Cookie': `sb-token=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Expires=${expires}`,
    },
  })
}
