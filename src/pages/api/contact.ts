import type { APIRoute } from 'astro'
import { Resend } from 'resend'
import { supabase } from '../../lib/supabase'

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, string>
  try {
    body = await request.json()
  } catch {
    return new Response('Bad request', { status: 400 })
  }

  const { name, email, company, phone, service, message, timeline } = body

  if (!name?.trim() || !email?.trim() || !message?.trim() || !service?.trim()) {
    return new Response(JSON.stringify({ error: 'Campos requeridos faltantes' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { error: dbError } = await supabase.from('leads').insert({
    name: name.trim(),
    email: email.trim(),
    company: company?.trim() || null,
    phone: phone?.trim() || null,
    message: `Servicio: ${service}\nPlazo: ${timeline || 'No especificado'}\n\n${message.trim()}`,
  })

  if (dbError) {
    console.error('Supabase insert error:', dbError)
    return new Response(JSON.stringify({ error: 'Error guardando el mensaje' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const resendKey = import.meta.env.RESEND_API_KEY
  const toEmail = import.meta.env.CONTACT_TO_EMAIL || 'hola@onfiresystems.co'

  if (resendKey && resendKey !== 're_REEMPLAZA_CON_TU_API_KEY') {
    const esc = (s: string) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

    try {
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from: 'OnFire Systems <noreply@onfiresystems.co>',
        to: toEmail,
        replyTo: email.trim(),
        subject: `Nuevo lead: ${name.trim()} — ${service}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f5f5f0;">
            <div style="background:#e8231a;height:4px;margin-bottom:32px;"></div>
            <h1 style="font-size:1.5rem;font-weight:800;color:#090909;margin-bottom:24px;">Nuevo mensaje de contacto</h1>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:12px 0;border-bottom:1px solid #ddd;font-weight:600;color:#333;width:140px;">Nombre</td><td style="padding:12px 0;border-bottom:1px solid #ddd;color:#555;">${esc(name)}</td></tr>
              <tr><td style="padding:12px 0;border-bottom:1px solid #ddd;font-weight:600;color:#333;">Email</td><td style="padding:12px 0;border-bottom:1px solid #ddd;color:#555;">${esc(email)}</td></tr>
              ${company ? `<tr><td style="padding:12px 0;border-bottom:1px solid #ddd;font-weight:600;color:#333;">Empresa</td><td style="padding:12px 0;border-bottom:1px solid #ddd;color:#555;">${esc(company)}</td></tr>` : ''}
              ${phone ? `<tr><td style="padding:12px 0;border-bottom:1px solid #ddd;font-weight:600;color:#333;">Teléfono</td><td style="padding:12px 0;border-bottom:1px solid #ddd;color:#555;">${esc(phone)}</td></tr>` : ''}
              <tr><td style="padding:12px 0;border-bottom:1px solid #ddd;font-weight:600;color:#333;">Servicio</td><td style="padding:12px 0;border-bottom:1px solid #ddd;color:#555;">${esc(service)}</td></tr>
              ${timeline ? `<tr><td style="padding:12px 0;border-bottom:1px solid #ddd;font-weight:600;color:#333;">Plazo</td><td style="padding:12px 0;border-bottom:1px solid #ddd;color:#555;">${esc(timeline)}</td></tr>` : ''}
            </table>
            <div style="margin-top:24px;padding:20px;background:#fff;border-radius:4px;">
              <p style="font-weight:600;color:#333;margin-bottom:8px;">Mensaje:</p>
              <p style="color:#555;line-height:1.7;white-space:pre-wrap;">${esc(message)}</p>
            </div>
            <p style="margin-top:32px;font-size:0.8rem;color:#999;">OnFire Systems — onfiresystems.co</p>
          </div>
        `,
      })
    } catch (emailErr) {
      console.error('Resend error:', emailErr)
    }
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
