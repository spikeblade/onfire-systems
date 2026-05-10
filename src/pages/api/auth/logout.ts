import type { APIRoute } from 'astro'

export const POST: APIRoute = async () => {
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/admin/login',
      'Set-Cookie': 'sb-token=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    },
  })
}
