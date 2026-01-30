import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { getRooferFullApplyNotificationEmailHtml } from '@/lib/email-templates';
import { FORM_SUBMISSION_EMAIL } from '@/lib/email-config';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

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

function buildEmailContent(body: Record<string, any>): string {
  const regions = Array.isArray(body.regions) ? body.regions : [];
  const counties = Array.isArray(body.counties) ? body.counties : [];
  const specialties = Array.isArray(body.specialties) ? body.specialties : [];

  return `
Preferred Contractor Application – RIF Roofing

Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}

--- BUSINESS INFORMATION ---
Company name: ${body.companyName || ''}
DBA / Trade name: ${body.dba || ''}
Phone: ${body.phone || ''}
Email: ${body.email || ''}
Website: ${body.websiteUrl || ''}
Address: ${body.address || ''}
City: ${body.city || ''}
State: ${body.state || 'FL'}
ZIP: ${body.zipCode || ''}

--- PRIMARY CONTACT ---
Name: ${body.contactName || ''}
Title: ${body.contactTitle || ''}
Preferred contact: ${body.preferredContact || 'phone'}

--- LICENSING & INSURANCE ---
Florida roofing license number: ${body.licenseNumber || ''}
General liability insurance: ${body.liabilityInsurance || ''}
${body.liabilityInsurance === 'yes' ? `Liability carrier: ${body.liabilityCarrier || ''}\nLiability policy: ${body.liabilityPolicy || ''}` : ''}
Workers comp insurance: ${body.workersComp || ''}
${body.workersComp === 'yes' ? `Workers comp details: ${body.workersCompDetails || ''}` : ''}
BBB accredited: ${body.bbbAccredited || ''}
${body.bbbAccredited === 'yes' ? `BBB URL: ${body.bbbUrl || ''}` : ''}

--- SERVICE AREAS ---
Regions: ${regions.length ? regions.join(', ') : 'None selected'}
Counties: ${counties.length ? counties.join(', ') : 'None selected'}
Additional cities/areas: ${body.additionalCities || ''}

--- COMPANY PROFILE ---
Years in business: ${body.yearsInBusiness || ''}
Specialties: ${specialties.length ? specialties.join(', ') : 'None selected'}
Google Business URL: ${body.googleBusinessUrl || ''}

Company description:
${body.aboutText || ''}

--- OTHER ---
How did you hear about us: ${body.hearAboutUs || ''}
Additional comments:
${body.message || ''}

---
This application was submitted via the Preferred Contractor application form at roofersinflorida.com.
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

    if (!body.companyName || !body.phone || !body.email || !body.contactName) {
      return NextResponse.json(
        { error: 'Missing required fields: company name, phone, email, and primary contact name.' },
        { status: 400 }
      );
    }
    if (!body.licenseNumber) {
      return NextResponse.json({ error: 'Florida roofing license number is required.' }, { status: 400 });
    }
    if (!body.address || !body.city || !body.zipCode) {
      return NextResponse.json({ error: 'Business address (street, city, ZIP) is required.' }, { status: 400 });
    }
    if (!body.liabilityInsurance || !body.workersComp) {
      return NextResponse.json(
        { error: 'Please confirm liability and workers comp insurance status.' },
        { status: 400 }
      );
    }
    const regions = Array.isArray(body.regions) ? body.regions : [];
    const counties = Array.isArray(body.counties) ? body.counties : [];
    if (regions.length === 0 && counties.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one region or county you serve.' },
        { status: 400 }
      );
    }
    const aboutText = String(body.aboutText || '').trim();
    if (aboutText.length < 50) {
      return NextResponse.json(
        { error: 'Please provide a company description (at least 50 characters).' },
        { status: 400 }
      );
    }

    const notificationHtml = getRooferFullApplyNotificationEmailHtml(body, 'Preferred Contractor Application');

    if (!resend) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact the administrator.' },
        { status: 500 }
      );
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || `RIF Roofing <${FORM_SUBMISSION_EMAIL}>`;
    const targetEmail = FORM_SUBMISSION_EMAIL;
    const verifiedEmail = process.env.RESEND_VERIFIED_EMAIL || 'craig@bitfisher.com';

    let { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [targetEmail],
      subject: `Preferred Contractor Application: ${body.companyName}`,
      html: notificationHtml,
      replyTo: body.email,
    });

    const errObj = error as any;
    const statusCode = errObj?.statusCode;
    const errMsg = errObj?.message || '';
    const isVerificationError =
      error &&
      (statusCode === 403 ||
        String(statusCode) === '403' ||
        errMsg.includes('verify') ||
        errMsg.includes('testing emails') ||
        errMsg.includes('your own email address'));

    if (isVerificationError) {
      const fallbackNote = `<p style="margin:24px 40px 0;padding:12px;background:#f0f9ff;border-radius:8px;font-size:14px;color:#0c4a6e;border:1px solid #bae6fd;">Please forward to ${targetEmail}. Reply to: ${body.email}</p></body>`;
      const fallback = await resend.emails.send({
        from: fromEmail,
        to: [verifiedEmail],
        subject: `[FORWARD] Preferred Contractor Application: ${body.companyName}`,
        html: notificationHtml.replace('</body>', fallbackNote),
        replyTo: body.email,
      });
      if (fallback.error) {
        console.error('Fallback email error:', fallback.error);
        return NextResponse.json(
          { error: 'Failed to send application. Please try again or contact us directly.' },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { success: true, message: 'Application submitted successfully.' },
        { status: 200 }
      );
    }

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send application. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Application submitted successfully.', data },
      { status: 200 }
    );
  } catch (err) {
    console.error('Preferred contractor apply error:', err);
    return NextResponse.json(
      { error: 'Internal server error', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
