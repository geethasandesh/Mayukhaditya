import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// ── Environment helpers ──────────────────────────────────────────────

const REQUIRED_ENV = [
  'MS_TENANT_ID',
  'MS_CLIENT_ID',
  'MS_CLIENT_SECRET',
  'MAIL_SENDER',
  'HOST_EMAIL',
  'TURNSTILE_SECRET_KEY',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
]

function assertEnv() {
  const missing = REQUIRED_ENV.filter((k) => !process.env[k])
  if (missing.length) {
    console.error(`[contact] Missing env vars: ${missing.join(', ')}`)
    const err = new Error('Server configuration error.')
    err.statusCode = 500
    throw err
  }
}

// ── HTML escaper ─────────────────────────────────────────────────────

function escapeHtml(text) {
  if (!text) return ''
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// ── Microsoft Graph: token cache + helpers ───────────────────────────

let cachedToken = null
let tokenExpiresAt = 0

async function getGraphToken() {
  const now = Date.now()
  if (cachedToken && now < tokenExpiresAt) return cachedToken

  const tenantId = process.env.MS_TENANT_ID
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: process.env.MS_CLIENT_ID,
    client_secret: process.env.MS_CLIENT_SECRET,
    scope: 'https://graph.microsoft.com/.default',
  })

  const res = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    }
  )

  if (!res.ok) {
    const text = await res.text()
    console.error('[contact] Graph token request failed:', res.status, text)
    throw new Error('Failed to authenticate with mail service.')
  }

  const data = await res.json()
  cachedToken = data.access_token
  // Expire 60 s early to avoid edge-case clock drift
  tokenExpiresAt = now + (data.expires_in - 60) * 1000
  return cachedToken
}

/**
 * Send an email via Microsoft Graph sendMail.
 * @param {{ from: string, to: string, replyTo?: string, subject: string, html: string }} opts
 */
async function sendGraphMail({ from, to, replyTo, subject, html }) {
  const token = await getGraphToken()

  // Sanitise subject: strip CR/LF, cap at 200 chars
  const safeSubject = subject.replace(/[\r\n]+/g, ' ').slice(0, 200)

  const message = {
    subject: safeSubject,
    body: { contentType: 'HTML', content: html },
    toRecipients: [{ emailAddress: { address: to } }],
  }
  if (replyTo) {
    message.replyTo = [{ emailAddress: { address: replyTo } }]
  }

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(from)}/sendMail`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, saveToSentItems: false }),
    }
  )

  if (!res.ok) {
    const text = await res.text()
    console.error(`[contact] Graph sendMail failed (${res.status}):`, text)
    throw new Error(`Graph sendMail returned ${res.status}`)
  }
}

// ── Rate limiters (Upstash sliding window) ───────────────────────────

let ipLimiter = null
let emailLimiter = null

function getRateLimiters() {
  if (ipLimiter && emailLimiter) return { ipLimiter, emailLimiter }

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })

  ipLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    prefix: 'contact:ip',
  })

  emailLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '1 d'),
    prefix: 'contact:email',
  })

  return { ipLimiter, emailLimiter }
}

// ── Turnstile verification ───────────────────────────────────────────

async function verifyTurnstile(token, remoteIp) {
  const res = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: remoteIp || '',
      }),
    }
  )
  const data = await res.json()
  return data.success === true
}

// ── Validation ───────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateFields(data) {
  const errors = []

  if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
    errors.push('Name is required.')
  } else if (data.name.length > 100) {
    errors.push('Name must be 100 characters or fewer.')
  }

  if (!data.email || typeof data.email !== 'string' || !data.email.trim()) {
    errors.push('Email is required.')
  } else if (data.email.length > 254) {
    errors.push('Email must be 254 characters or fewer.')
  } else if (!EMAIL_RE.test(data.email)) {
    errors.push('Please provide a valid email address.')
  }

  if (!data.message || typeof data.message !== 'string' || !data.message.trim()) {
    errors.push('Message is required.')
  } else if (data.message.length > 5000) {
    errors.push('Message must be 5 000 characters or fewer.')
  }

  if (data.company && data.company.length > 150) {
    errors.push('Company must be 150 characters or fewer.')
  }

  return errors
}

// ── Email builders ───────────────────────────────────────────────────

function buildHostEmail({ safeName, safeCompany, safeEmail, safeInterest, safeMessage, submissionTime, mailSender, hostRecipient, name, email, interest, company }) {
  const subject = `New Inquiry: ${name} (${company || 'Individual'}) - ${interest || 'Supply Chain'}`
  return {
    from: mailSender,
    to: hostRecipient,
    replyTo: email,
    subject,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry Notification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      color: #1f2937;
    }
  </style>
</head>
<body style="margin: 0; padding: 28px 12px; background-color: #f3f4f6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); border: 1px solid #e5e7eb;" cellpadding="0" cellspacing="0" border="0">
          
          <!-- Top Sunrise Gradient Line -->
          <tr>
            <td height="4" style="background: linear-gradient(90deg, #f5c842, #e8a020, #d4620a); font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Header / Brand Section -->
          <tr>
            <td style="background-color: #0c0c0c; padding: 26px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" valign="middle">
                    <div style="font-size: 20px; font-weight: 800; letter-spacing: 2px; color: #f5c842; text-transform: uppercase;">
                      MAYUKHADITYA
                    </div>
                    <div style="font-size: 10px; color: #9ca3af; letter-spacing: 1.2px; text-transform: uppercase; font-weight: 600; margin-top: 2px;">
                      SAP Digital Supply Chain Solutions
                    </div>
                  </td>                  
                  <!-- Right: Company Logo -->
                  <td align="right" valign="middle" width="140"
                    style="width:140px; padding-left:12px;
                    text-align:right;">

                    <img
                      src="https://mayukhaditya.com/logobg.png"
                      alt="Mayukhaditya Logo"
                      width="130"
                      style="display:block;
	      filter: brightness(1.5);
                      width:130px;
                      max-width:130px;
                      height:auto;
                      margin-left:auto;
                      border:0;
                      outline:none;
                      text-decoration:none;"
                    />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 36px 32px 28px;">
              
              <!-- Lead Introduction -->
              <h2 style="margin: 0 0 6px; font-size: 22px; font-weight: 800; color: #111827; letter-spacing: -0.3px;">
                New Inquiry from ${safeName}
              </h2>
              <p style="margin: 0 0 24px; font-size: 14px; color: #6b7280; line-height: 1.5;">
                A new client inquiry was submitted through the official website contact form.
              </p>

              <!-- Lead Details Grid / Table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; margin-bottom: 24px; overflow: hidden;">
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e5e7eb; width: 50%; vertical-align: top;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #9a6700; font-weight: 700; margin-bottom: 4px;">
                      CLIENT NAME
                    </div>
                    <div style="font-size: 15px; font-weight: 600; color: #111827;">
                      ${safeName}
                    </div>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e5e7eb; width: 50%; vertical-align: top; border-left: 1px solid #e5e7eb;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #9a6700; font-weight: 700; margin-bottom: 4px;">
                      COMPANY
                    </div>
                    <div style="font-size: 15px; font-weight: 600; color: #111827;">
                      ${safeCompany}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; width: 50%; vertical-align: top;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #9a6700; font-weight: 700; margin-bottom: 4px;">
                      EMAIL ADDRESS
                    </div>
                    <div style="font-size: 14px; font-weight: 600;">
                      <a href="mailto:${safeEmail}" style="color: #d4620a; text-decoration: underline;">${safeEmail}</a>
                    </div>
                  </td>
                  <td style="padding: 16px 20px; width: 50%; vertical-align: top; border-left: 1px solid #e5e7eb;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #9a6700; font-weight: 700; margin-bottom: 4px;">
                      AREA OF INTEREST
                    </div>
                    <div style="font-size: 14px; font-weight: 600; color: #111827;">
                      <span style="display: inline-block; background-color: #fef3c7; color: #92400e; padding: 3px 10px; border-radius: 6px; font-size: 13px; font-weight: 600;">
                        ${safeInterest}
                      </span>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Client Message Box -->
              <div style="margin-bottom: 32px;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; font-weight: 700; margin-bottom: 8px;">
                  INQUIRY MESSAGE
                </div>
                <div style="background-color: #fafaf9; border-left: 4px solid #e8a020; border-top: 1px solid #e7e5e4; border-right: 1px solid #e7e5e4; border-bottom: 1px solid #e7e5e4; border-radius: 0 10px 10px 0; padding: 18px 20px; font-size: 14px; line-height: 1.6; color: #292524; white-space: pre-wrap;">${safeMessage}</div>
              </div>

              <!-- Action Button -->
              <div style="text-align: center; margin-bottom: 12px;">
                <a href="mailto:${safeEmail}?subject=Re: Your Inquiry with Mayukhaditya" style="display: inline-block; background: linear-gradient(135deg, #f5c842, #e8a020, #d4620a); color: #ffffff !important; text-decoration: none !important; font-weight: 700; font-size: 15px; padding: 14px 34px; border-radius: 8px; box-shadow: 0 4px 15px rgba(232, 160, 32, 0.35); letter-spacing: 0.3px;">
                  <span style="color: #ffffff !important; text-decoration: none !important; font-weight: 700;">Reply to ${safeName}</span>
                </a>
              </div>
              <div style="text-align: center; font-size: 12px; color: #9ca3af;">
                Clicking reply will open an email directly addressed to ${safeEmail}
              </div>

            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td style="background-color: #f9fafb; border-top: 1px solid #e5e7eb; padding: 20px 32px; text-align: center;">
              <p style="margin: 0 0 4px; font-size: 12px; font-weight: 600; color: #4b5563;">
                Mayukhaditya Private Limited &bull; Enterprise Lead Dispatcher
              </p>
              <p style="margin: 0; font-size: 11px; color: #9ca3af;">
                Received on ${submissionTime} IST &bull; Routed automatically from mayukhaditya.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  }
}

function buildClientEmail({ safeName, safeCompany, safeInterest, mailSender, hostRecipient, email }) {
  return {
    from: mailSender,
    to: email,
    replyTo: hostRecipient,
    subject: 'Thank you for contacting Mayukhaditya',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Mayukhaditya</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      color: #1f2937;
    }
  </style>
</head>
<body style="margin: 0; padding: 28px 12px; background-color: #f3f4f6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); border: 1px solid #e5e7eb;" cellpadding="0" cellspacing="0" border="0">
          
          <!-- Top Sunrise Gradient Line -->
          <tr>
            <td height="4" style="background: linear-gradient(90deg, #f5c842, #e8a020, #d4620a); font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Header / Brand Section -->
          <tr>
            <td style="background-color: #0c0c0c; padding: 26px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" valign="middle">
                    <div style="font-size: 20px; font-weight: 800; letter-spacing: 2px; color: #f5c842; text-transform: uppercase;">
                      MAYUKHADITYA
                    </div>
                    <div style="font-size: 10px; color: #9ca3af; letter-spacing: 1.2px; text-transform: uppercase; font-weight: 600; margin-top: 2px;">
                      SAP Digital Supply Chain Solutions
                    </div>
                  </td>
                  <!-- Right: Company Logo -->
                  <td align="right" valign="middle" width="140"
                    style="width:140px; padding-left:12px;
                    text-align:right;">
                    <img
                      src="https://mayukhaditya.com/logobg.png"
                      alt="Mayukhaditya Logo"
                      width="130"
                      style="display:block;
		                  filter: brightness(2.5);
                      width:130px;
                      max-width:130px;
                      height:auto;
                      margin-left:auto;
                      border:0;
                      outline:none;
                      text-decoration:none;"
                    />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Section -->
          <tr>
            <td style="padding: 36px 32px 28px;">
              <div style="font-size: 18px; font-weight: 700; color: #111827; margin-bottom: 14px;">
                Dear ${safeName},
              </div>
              <p style="margin: 0 0 14px; font-size: 15px; color: #4b5563; line-height: 1.6;">
                Thank you for contacting <strong>Mayukhaditya</strong>. We have successfully received your inquiry regarding <strong style="color: #d4620a;">${safeInterest}</strong>.
              </p>
              <p style="margin: 0 0 24px; font-size: 15px; color: #4b5563; line-height: 1.6;">
                Our team of SAP Digital Supply Chain specialists is currently reviewing your project requirements. A dedicated consultant will reach out to you within one business day.
              </p>

              <!-- Submission Summary Card (company + interest only, no message) -->
              <div style="background-color: #fafaf9; border: 1px solid #e7e5e4; border-radius: 12px; padding: 20px 24px; margin-bottom: 24px;">
                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #9a6700; margin-bottom: 12px;">
                  SUMMARY OF YOUR INQUIRY
                </div>
                <div style="font-size: 14px; color: #444; margin-bottom: 8px;">
                  <strong style="color: #111827;">Company:</strong> ${safeCompany}
                </div>
                <div style="font-size: 14px; color: #444;">
                  <strong style="color: #111827;">Area of Interest:</strong> ${safeInterest}
                </div>
              </div>

              <p style="font-size: 14px; color: #6b7280; line-height: 1.6; margin: 0 0 24px;">
                If you have additional details or urgent questions, you can reply directly to this email or reach us at <a href="mailto:info@mayukhaditya.com" style="color: #d4620a; font-weight: 600; text-decoration: underline;">info@mayukhaditya.com</a>.
              </p>

              <p style="margin: 0; font-size: 14px; color: #111827; line-height: 1.5;">
                Warm regards,<br>
                <strong>The Mayukhaditya Consulting Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td style="background-color: #0c0c0c; color: #9ca3af; text-align: center; padding: 24px 32px; font-size: 12px; line-height: 1.6;">
              <p style="margin: 0 0 6px; font-weight: 600; color: #ffffff;">Mayukhaditya Private Limited</p>
              <p style="margin: 0 0 8px; color: #9ca3af;">Hyderabad, India &bull; Dubai, UAE</p>
              <p style="margin: 0;">
                <a href="mailto:info@mayukhaditya.com" style="color: #f5c842; text-decoration: none;">info@mayukhaditya.com</a> &bull; 
                <a href="https://mayukhaditya.com" style="color: #f5c842; text-decoration: none;">mayukhaditya.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  }
}

// ── Main handler ─────────────────────────────────────────────────────

export default async function handler(req, res) {
  // CORS pre-flight
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST')
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Only POST is accepted.' })
  }

  try {
    // ── 0. Env check ──
    assertEnv()

    // ── 1. Parse body ──
    let data = req.body
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data)
      } catch {
        return res.status(400).json({ error: 'Invalid JSON request payload.' })
      }
    }
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Invalid or missing request body.' })
    }

    // ── 2. Honeypot ──
    if (typeof data.hp_ref_code === 'string' && data.hp_ref_code.trim().length > 0) {
      console.log('[contact] honeypot triggered')
      return res.status(200).json({ success: true, message: 'Inquiry received and emails dispatched successfully.' })
    }

    // ── 3. Validation ──
    const errors = validateFields(data)
    if (errors.length) {
      return res.status(400).json({ error: errors.join(' ') })
    }

    // ── 4. Client IP ──
    const forwarded = req.headers['x-forwarded-for']
    const clientIp = forwarded ? String(forwarded).split(',')[0].trim() : '127.0.0.1'

    // ── 5. Turnstile verification ──
    if (!data.turnstileToken) {
      return res.status(400).json({ error: 'CAPTCHA verification is required. Please complete the challenge.' })
    }
    const turnstileOk = await verifyTurnstile(data.turnstileToken, clientIp)
    if (!turnstileOk) {
      return res.status(400).json({ error: 'CAPTCHA verification failed. Please try again.' })
    }

    // ── 6. Rate limiting ──
    const { ipLimiter, emailLimiter } = getRateLimiters()

    const [ipResult, emailResult] = await Promise.all([
      ipLimiter.limit(clientIp),
      emailLimiter.limit(data.email.toLowerCase().trim()),
    ])

    if (!ipResult.success || !emailResult.success) {
      return res.status(429).json({
        error: 'You have sent too many inquiries recently. Please wait a while and try again.',
      })
    }

    // ── 7. Build emails ──
    const { name, company, email, interest, message } = data
    const mailSender = process.env.MAIL_SENDER.trim()
    const hostRecipient = process.env.HOST_EMAIL.trim()

    const safeName = escapeHtml(name)
    const safeCompany = escapeHtml(company || 'Individual / Not Specified')
    const safeEmail = escapeHtml(email)
    const safeInterest = escapeHtml(interest || 'General Inquiry')
    const safeMessage = escapeHtml(message)
    const submissionTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    })

    const templateData = {
      safeName, safeCompany, safeEmail, safeInterest, safeMessage,
      submissionTime, mailSender, hostRecipient,
      name, email, interest, company,
    }

    const hostMail = buildHostEmail(templateData)
    const clientMail = buildClientEmail(templateData)

    // ── 8. Send both emails ──
    const results = await Promise.allSettled([
      sendGraphMail(hostMail),
      sendGraphMail(clientMail),
    ])

    // Host notification MUST succeed
    if (results[0].status === 'rejected') {
      console.error('[contact] Host notification failed:', results[0].reason?.message)
      return res.status(502).json({ error: 'Unable to process your inquiry right now. Please try again later.' })
    }

    // Log but don't fail on confirmation email failure
    if (results[1].status === 'rejected') {
      console.warn('[contact] Client confirmation email failed:', results[1].reason?.message)
    }

    return res.status(200).json({ success: true, message: 'Inquiry received and emails dispatched successfully.' })
  } catch (err) {
    console.error('[contact] Handler error:', err.message)
    const status = err.statusCode || 500
    return res.status(status).json({ error: status === 500 ? 'An unexpected error occurred. Please try again later.' : err.message })
  }
}
