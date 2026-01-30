import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { verifyTurnstileToken } from '@/lib/turnstile';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) return false;
  record.count++;
  return true;
}

const NEED_LABELS: Record<string, string> = {
  websites: 'Website (new or refresh)',
  print: 'Print collateral (brochures, flyers, business cards)',
  marketing: 'Marketing & campaigns',
  seo: 'SEO (search visibility)',
  branding: 'Branding & identity',
  other: 'Other',
};

const URGENCY_LABELS: Record<string, string> = {
  asap: 'ASAP',
  '1-3months': 'Within 1–3 months',
  '3-6months': 'Within 3–6 months',
  exploring: 'Just exploring',
  norush: 'No rush',
};

const PAID_SERVICE_LABELS: Record<string, string> = {
  google_ads: 'Google Ads',
  social_ads: 'Facebook / Instagram ads',
  seo_company: 'SEO company',
  web_designer: 'Web designer or agency',
  print_mail: 'Print or mail vendor',
  other_paid: 'Other',
};

const SUCCESS_LABELS: Record<string, string> = {
  '1': '1 - Struggling',
  '2': '2 - Below average',
  '3': '3 - Average',
  '4': '4 - Good',
  '5': '5 - Thriving',
};

const HOW_FIND_LABELS: Record<string, string> = {
  referrals: 'Referrals / word of mouth',
  google: 'Google / search',
  social: 'Social media',
  repeat: 'Repeat customers',
  other_find: 'Other',
};

const CURRENT_BRAND_LABELS: Record<string, string> = {
  yes: 'Yes',
  no: 'No',
  partial: 'Partially—could refine',
};

function buildEmailContent(body: Record<string, any>): string {
  const needs = Array.isArray(body.needs) ? body.needs : [];
  const needLines = needs.length
    ? needs.map((id: string) => `  - ${NEED_LABELS[id] || id}`).join('\n')
    : '  (none selected)';

  const paidServices = Array.isArray(body.paidServices) ? body.paidServices : [];
  const paidLines = paidServices.length
    ? paidServices.map((id: string) => `  - ${PAID_SERVICE_LABELS[id] || id}`).join('\n')
    : '  (none selected)';

  const howFind = Array.isArray(body.howCustomersFindYou) ? body.howCustomersFindYou : [];
  const howFindLines = howFind.length
    ? howFind.map((id: string) => `  - ${HOW_FIND_LABELS[id] || id}`).join('\n')
    : '  (none selected)';

  return `
Marketing design needs – RIF Full Package questionnaire

Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}

--- CONTACT INFORMATION ---
Name: ${body.name || ''}
Email: ${body.email || ''}
Phone: ${body.phone || ''}
Company name: ${body.companyName || '(not provided)'}
Website address: ${body.companyWebsite || '(not provided)'}

--- URGENCY OF NEEDS ---
${URGENCY_LABELS[body.urgency] || body.urgency || '(not selected)'}

--- MARKETING NEEDS (check all that apply) ---
${needLines}
${body.needs?.includes('other') && body.otherDescription ? `Other: ${body.otherDescription}` : ''}

--- PAID SERVICES CURRENTLY USING ---
${paidLines}
${body.paidServices?.includes('other_paid') && body.otherPaidDescription ? `Other: ${body.otherPaidDescription}` : ''}

--- HOW THEY RATE CURRENT MARKETING SUCCESS (1–5) ---
${SUCCESS_LABELS[body.marketingSuccessRating] || body.marketingSuccessRating || '(not selected)'}

--- BIGGEST MARKETING CHALLENGE ---
${body.biggestChallenge || '(not provided)'}

--- HOW CUSTOMERS FIND THEM TODAY ---
${howFindLines}
${body.howCustomersFindYou?.includes('other_find') && body.otherHowFindDescription ? `Other: ${body.otherHowFindDescription}` : ''}

--- CURRENT BRAND (LOGO, COLORS) ---
${CURRENT_BRAND_LABELS[body.currentBrand] || body.currentBrand || '(not selected)'}

--- SUCCESS IN 12 MONTHS (THEIR VISION) ---
${body.successIn12Months || '(not provided)'}

--- ADDITIONAL MESSAGE ---
${body.message || '(none)'}

---
This was submitted via the RIF Marketing / Full Package contact form at roofersinflorida.com/marketing/contact
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    let body: Record<string, any>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    if (body.website && String(body.website).trim() !== '') {
      return NextResponse.json({ success: true, message: 'Thank you for your submission.' }, { status: 200 });
    }

    if (body.turnstileToken) {
      const isValid = await verifyTurnstileToken(body.turnstileToken, ip);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Security verification failed. Please try again.' },
          { status: 400 }
        );
      }
    } else if (process.env.TURNSTILE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Security verification required.' },
        { status: 400 }
      );
    }

    if (!body.name?.trim() || !body.email?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { error: 'Please provide your name, email, and phone.' },
        { status: 400 }
      );
    }

    if (!resend) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later or call 410-430-6904.' },
        { status: 500 }
      );
    }

    const emailContent = buildEmailContent(body);
    const toEmail = 'craig@bitfisher.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'RIF Marketing <onboarding@resend.dev>';

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `Marketing design needs: ${body.name}${body.companyName ? ` (${body.companyName})` : ''}`,
      text: emailContent,
      replyTo: body.email?.trim() || undefined,
    });

    if (error) {
      console.error('Marketing contact email error:', error);
      return NextResponse.json(
        { error: 'Failed to send. Please try again or call 410-430-6904.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Thank you. We\'ll be in touch soon.' });
  } catch (err) {
    console.error('Marketing contact API error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or call 410-430-6904.' },
      { status: 500 }
    );
  }
}
