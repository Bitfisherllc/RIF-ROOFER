import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { getEstimateConfirmationEmailHtml } from '@/lib/email-templates';

// Initialize Resend with API key from environment variable
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Simple in-memory rate limiting (can be upgraded to Redis later)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // Max 5 submissions per 15 minutes per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Honeypot check - if website field is filled, it's a bot
    if (body.website && body.website.trim() !== '') {
      // Silently reject - don't let bots know they were caught
      return NextResponse.json(
        { success: true, message: 'Thank you for your submission.' },
        { status: 200 }
      );
    }

    // Verify Turnstile token
    if (body.turnstileToken) {
      const isValid = await verifyTurnstileToken(body.turnstileToken, ip);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Security verification failed. Please try again.' },
          { status: 400 }
        );
      }
    } else if (process.env.TURNSTILE_SECRET_KEY) {
      // If Turnstile is configured but no token provided, reject
      return NextResponse.json(
        { error: 'Security verification required.' },
        { status: 400 }
      );
    }

    const {
      fullName,
      email,
      phone,
      propertyAddress,
      city,
      zipCode,
      propertyType,
      roofType,
      roofAge,
      roofSize,
      stories,
      projectType,
      urgency,
      timeline,
      insuranceClaim,
      claimNumber,
      specificIssues,
      additionalNotes,
      preferredContact,
      bestTimeToContact,
      savedRoofers,
    } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !propertyAddress || !city || !zipCode || !projectType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the email content
    const emailContent = `
New Free Estimate Request from RIF Roofing Website

CONTACT INFORMATION:
- Name: ${fullName}
- Email: ${email}
- Phone: ${phone}

PROPERTY INFORMATION:
- Address: ${propertyAddress}
- City: ${city}
- ZIP Code: ${zipCode}
${propertyType ? `- Property Type: ${propertyType}` : ''}
${stories ? `- Stories: ${stories}` : ''}

CURRENT ROOF DETAILS:
${roofType ? `- Roof Type: ${roofType}` : ''}
${roofAge ? `- Roof Age: ${roofAge}` : ''}
${roofSize ? `- Roof Size: ${roofSize}` : ''}

PROJECT DETAILS:
- Project Type: ${projectType}
${urgency ? `- Urgency: ${urgency}` : ''}
${timeline ? `- Timeline: ${timeline}` : ''}
${specificIssues ? `- Specific Issues:\n${specificIssues}` : ''}

INSURANCE INFORMATION:
${insuranceClaim ? `- Insurance Claim: ${insuranceClaim}` : ''}
${claimNumber ? `- Claim Number: ${claimNumber}` : ''}

ADDITIONAL INFORMATION:
${additionalNotes ? `- Additional Notes:\n${additionalNotes}` : ''}

CONTACT PREFERENCES:
- Preferred Contact Method: ${preferredContact}
${bestTimeToContact ? `- Best Time to Contact: ${bestTimeToContact}` : ''}

${savedRoofers && savedRoofers.length > 0 ? `
SAVED ROOFERS TO CONTACT:
${savedRoofers.map((roofer: any, index: number) => `
${index + 1}. ${roofer.name}
   - ID: ${roofer.id}
   - Slug: ${roofer.slug}
   ${roofer.phone ? `- Phone: ${roofer.phone}` : ''}
   ${roofer.email ? `- Email: ${roofer.email}` : ''}
   ${roofer.websiteUrl ? `- Website: ${roofer.websiteUrl}` : ''}
`).join('')}
` : ''}

---
This email was sent from the RIF Roofing free estimate form.
Submitted on: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
    `.trim();

    // Check if Resend is configured
    if (!resend) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Send email using Resend
    // Note: Resend's free tier only allows sending to verified email addresses
    // To send to info@roofersinflorida.com, you need to verify a domain in Resend
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'RIF Roofing Contact Form <onboarding@resend.dev>';
    const targetEmail = 'info@roofersinflorida.com';
    const verifiedEmail = process.env.RESEND_VERIFIED_EMAIL || 'craig@bitfisher.com';
    
    // Try to send to target email first
    let { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [targetEmail],
      subject: `New Free Estimate Request from ${fullName}`,
      text: emailContent,
      replyTo: email,
    });

    // If error is due to domain verification, send to verified email instead
    const errorObj = error as any;
    const statusCode = errorObj?.statusCode;
    const errorMessage = errorObj?.message || '';
    
    const isVerificationError = error && (
      statusCode === 403 || 
      statusCode === '403' ||
      String(statusCode) === '403' ||
      errorMessage.includes('verify') ||
      errorMessage.includes('testing emails') ||
      errorMessage.includes('your own email address')
    );
    
    console.log('Email send result:', { hasError: !!error, statusCode, errorMessage, isVerificationError });

    if (isVerificationError) {
      console.log('Domain not verified, sending to verified email instead:', verifiedEmail);
      
      const fallbackResult = await resend.emails.send({
        from: fromEmail,
        to: [verifiedEmail],
        subject: `[FORWARD TO ${targetEmail}] New Free Estimate Request from ${fullName}`,
        text: `${emailContent}\n\n---\nNOTE: Please forward this email to ${targetEmail}\nThe form was submitted from: ${email}`,
        replyTo: email,
      });
      
      if (fallbackResult.error) {
        console.error('Fallback email error:', fallbackResult.error);
        return NextResponse.json(
          { 
            error: 'Failed to send email. Please verify your domain in Resend dashboard.',
            details: fallbackResult.error 
          },
          { status: 500 }
        );
      }
      
      // Send confirmation email to user
      try {
        await resend.emails.send({
          from: fromEmail,
          to: [email],
          subject: 'Thank You for Your Free Estimate Request - RIF Roofing',
          html: getEstimateConfirmationEmailHtml({
            fullName,
            email,
            phone,
            propertyAddress,
            city,
            zipCode,
            propertyType,
            roofType,
            roofAge,
            roofSize,
            stories,
            projectType,
            urgency,
            timeline,
            insuranceClaim,
            claimNumber,
            specificIssues,
            additionalNotes,
            preferredContact,
            bestTimeToContact,
          }),
        });
      } catch (confirmationError) {
        console.error('Failed to send confirmation email:', confirmationError);
        // Don't fail the request if confirmation email fails
      }
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Estimate request submitted successfully. Email sent to verified address.',
          data: fallbackResult.data,
          note: 'To send directly to info@roofersinflorida.com, verify a domain in Resend dashboard.'
        },
        { status: 200 }
      );
    }

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    try {
      await resend.emails.send({
        from: fromEmail,
        to: [email],
        subject: 'Thank You for Your Free Estimate Request - RIF Roofing',
        html: getEstimateConfirmationEmailHtml({
          fullName,
          email,
          phone,
          propertyAddress,
          city,
          zipCode,
          propertyType,
          roofType,
          roofAge,
          roofSize,
          stories,
          projectType,
          urgency,
          timeline,
          insuranceClaim,
          claimNumber,
          specificIssues,
          additionalNotes,
          preferredContact,
          bestTimeToContact,
        }),
      });
    } catch (confirmationError) {
      console.error('Failed to send confirmation email:', confirmationError);
      // Don't fail the request if confirmation email fails
    }

    return NextResponse.json(
      { success: true, message: 'Estimate request submitted successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Estimate form error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

