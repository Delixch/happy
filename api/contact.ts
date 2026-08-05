import type { VercelRequest, VercelResponse } from '@vercel/node';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = 'xddswi@gmail.com';
const FROM_EMAIL = 'Happy Beck Kontakt <kontakt@superonline.ch>';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_MAX_LENGTHS: Record<string, number> = {
  company: 200,
  name: 200,
  email: 200,
  phone: 50,
  address: 300,
  message: 5000,
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
// Resets on cold start / across instances, but stops single-instance spam floods.
const rateLimitHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateLimitHits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  rateLimitHits.set(ip, hits);
  return hits.length > RATE_LIMIT_MAX;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests, please try again later' });
  }

  const { company, name, email, phone, address, message } = (req.body ?? {}) as Record<string, unknown>;

  if (typeof email !== 'string' || typeof message !== 'string' || !email.trim() || !message.trim()) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  for (const [field, value] of Object.entries({ company, name, email, phone, address, message })) {
    if (typeof value === 'string' && value.length > FIELD_MAX_LENGTHS[field]) {
      return res.status(400).json({ error: `Field "${field}" exceeds max length` });
    }
  }

  const rows: Array<[string, unknown]> = [
    ['Firma', company],
    ['Name', name],
    ['E-Mail', email],
    ['Telefon', phone],
    ['Adresse', address],
  ];

  const detailsHtml = rows
    .filter(([, value]) => typeof value === 'string' && value.trim())
    .map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value as string)}</p>`)
    .join('');

  const html = `
    <h2>Neue Kontaktanfrage &ndash; Happy Beck</h2>
    ${detailsHtml}
    <p><strong>Nachricht:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
  `;

  const senderLabel = typeof name === 'string' && name.trim() ? name : email;

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        reply_to: email,
        subject: `Neue Kontaktanfrage von ${senderLabel}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      console.error('Resend error:', await resendRes.text());
      return res.status(502).json({ error: 'Email could not be sent' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact form send failed:', err);
    return res.status(500).json({ error: 'Email could not be sent' });
  }
}
