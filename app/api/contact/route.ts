import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { getContactConfirmationEmailHtml } from '@/lib/email-templates';

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
      userType,
      fullName,
      email,
      phone,
      companyName,
      propertyAddress,
      city,
      zipCode,
      projectType,
      roofSize,
      preferredContact,
      bestTimeToContact,
      message,
      hearAboutUs,
      interestedInFreeEstimate,
      interestedInPartnership,
      productName,
      productDescription,
    } = body;

    // Validate required fields based on user type
    if (!fullName || !email || !phone || !userType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Additional validation based on user type
    if (userType === 'resident' && (!propertyAddress || !city || !zipCode || !projectType)) {
      return NextResponse.json(
        { error: 'Missing required fields for resident' },
        { status: 400 }
      );
    }

    if (userType === 'manufacturer' && (!companyName || !productName || !productDescription)) {
      return NextResponse.json(
        { error: 'Missing required fields for manufacturer' },
        { status: 400 }
      );
    }

    // Format the email content based on user type
    let emailContent = `
New Contact Form Submission from RIF Roofing Website

USER TYPE: ${userType === 'roofer' ? 'Roofer' : userType === 'manufacturer' ? 'Manufacturer' : 'Resident'}

PERSONAL INFORMATION:
- Name: ${fullName}
- Email: ${email}
- Phone: ${phone}
${companyName ? `- Company Name: ${companyName}` : ''}

`;

    if (userType === 'roofer') {
      emailContent += `
ROOFER INFORMATION:
- Interested in Free Estimate: ${interestedInFreeEstimate ? 'Yes' : 'No'}
- Interested in Partnership: ${interestedInPartnership ? 'Yes' : 'No'}
- Message:
${message}
`;
    } else if (userType === 'manufacturer') {
      emailContent += `
PRODUCT INFORMATION:
- Product Name: ${productName}
- Product Description:
${productDescription}

ADDITIONAL INFORMATION:
${message}
`;
    } else {
      emailContent += `
PROPERTY INFORMATION:
- Address: ${propertyAddress}
- City: ${city}
- ZIP Code: ${zipCode}

PROJECT DETAILS:
- Project Type: ${projectType}
- Roof Size: ${roofSize || 'Not specified'}
- Description:
${message}
`;
    }

    emailContent += `
CONTACT PREFERENCES:
- Preferred Contact Method: ${preferredContact}
- Best Time to Contact: ${bestTimeToContact || 'Not specified'}
- How They Heard About Us: ${hearAboutUs || 'Not specified'}

---
This email was sent from the RIF Roofing contact form.
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
    // To send to premiumroofingproducts@gmail.com, you need to verify a domain in Resend
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'RIF Roofing Contact Form <onboarding@resend.dev>';
    const targetEmail = 'premiumroofingproducts@gmail.com';
    const verifiedEmail = process.env.RESEND_VERIFIED_EMAIL || 'craig@bitfisher.com';
    
    // Try to send to target email first
    let { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [targetEmail],
      subject: `New Contact Form Submission from ${fullName}`,
      text: emailContent,
      replyTo: email,
    });

    // If error is due to domain verification (403 or message about verification), send to verified email instead
    // Check error object structure - Resend returns error with statusCode property
    const errorObj = error as any;
    const statusCode = errorObj?.statusCode;
    const errorMessage = errorObj?.message || '';
    
    // Check if this is a domain verification error
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
        subject: `[FORWARD TO ${targetEmail}] New Contact Form Submission from ${fullName}`,
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
      
      // Success - email sent to verified address
      // Send confirmation email to user
      try {
        await resend.emails.send({
          from: fromEmail,
          to: [email],
          subject: 'Thank You for Contacting RIF Roofing',
          html: getContactConfirmationEmailHtml({
            fullName,
            email,
            phone,
            companyName: companyName || '',
            propertyAddress: propertyAddress || '',
            city: city || '',
            zipCode: zipCode || '',
            projectType: projectType || '',
            roofSize: roofSize || '',
            message,
            preferredContact,
            bestTimeToContact: bestTimeToContact || '',
            hearAboutUs: hearAboutUs || '',
            userType: userType || 'resident',
          }),
        });
      } catch (confirmationError) {
        console.error('Failed to send confirmation email:', confirmationError);
        // Don't fail the request if confirmation email fails
      }

      return NextResponse.json(
        { 
          success: true, 
          message: 'Contact form submitted successfully. Email sent to verified address.',
          data: fallbackResult.data,
          note: 'To send directly to premiumroofingproducts@gmail.com, verify a domain in Resend dashboard.'
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
        subject: 'Thank You for Contacting RIF Roofing',
        html: getContactConfirmationEmailHtml({
          fullName,
          email,
          phone,
          propertyAddress,
          city,
          zipCode,
          projectType,
          roofSize,
          message,
          preferredContact,
          bestTimeToContact,
          hearAboutUs,
        }),
      });
    } catch (confirmationError) {
      console.error('Failed to send confirmation email:', confirmationError);
      // Don't fail the request if confirmation email fails
    }

    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

