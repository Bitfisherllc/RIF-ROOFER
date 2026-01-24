import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { verifyTurnstileToken } from '@/lib/turnstile';

const MAILING_LIST_FILE_PATH = join(process.cwd(), 'data', 'mailing-list.json');

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = dirname(MAILING_LIST_FILE_PATH);
  try {
    mkdirSync(dataDir, { recursive: true });
  } catch (error) {
    // Directory might already exist, ignore error
  }
}

interface MailingListEntry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  allowPhoneContact: boolean;
  signedUpAt: string;
}

// Simple in-memory rate limiting
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

function readMailingList(): MailingListEntry[] {
  try {
    const content = readFileSync(MAILING_LIST_FILE_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    // If file doesn't exist or is invalid, return empty array
    return [];
  }
}

function writeMailingList(entries: MailingListEntry[]): void {
  try {
    ensureDataDirectory();
    writeFileSync(MAILING_LIST_FILE_PATH, JSON.stringify(entries, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing mailing list:', error);
    throw new Error(`Failed to save mailing list entry: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
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
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Honeypot check - if website field is filled, it's a bot
    if (body.website && body.website.trim() !== '') {
      // Silently reject - don't let bots know they were caught
      return NextResponse.json(
        { success: true, message: 'Thank you for signing up!' },
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
      companyName,
      address,
      city,
      state,
      zipCode,
      allowPhoneContact,
    } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !companyName || !address || !city || !state || !zipCode) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEntries = readMailingList();
    const emailExists = existingEntries.some(entry => entry.email.toLowerCase() === email.toLowerCase());
    
    if (emailExists) {
      return NextResponse.json(
        { error: 'This email address is already registered' },
        { status: 400 }
      );
    }

    // Create new entry
    const newEntry: MailingListEntry = {
      id: `ml-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      companyName: companyName.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim().toUpperCase(),
      zipCode: zipCode.trim(),
      allowPhoneContact: allowPhoneContact || false,
      signedUpAt: new Date().toISOString(),
    };

    // Add to mailing list
    existingEntries.push(newEntry);
    writeMailingList(existingEntries);

    return NextResponse.json(
      { success: true, message: 'Successfully added to mailing list' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Mailing list submission error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('Error details:', { errorMessage, errorStack });
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: errorMessage,
        ...(process.env.NODE_ENV === 'development' && errorStack ? { stack: errorStack } : {})
      },
      { status: 500 }
    );
  }
}

