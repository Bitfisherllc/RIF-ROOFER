import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONFIG_FILE = path.join(process.cwd(), 'app/admin/config/site-config.json');

function getConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const fileContent = fs.readFileSync(CONFIG_FILE, 'utf-8');
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error('Error reading config file:', error);
  }
  return { 
    adminEmail: 'info@roofersinflorida.com',
    adminPasswordNew: 'Hottinroof123#'
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    const config = getConfig();

    // Get admin credentials from config
    const adminEmail = config.adminEmail || 'info@roofersinflorida.com';
    const adminPassword = config.adminPasswordNew || config.adminPassword || 'Hottinroof123#';

    // Normalize email (lowercase, trim)
    const normalizedEmail = email?.toLowerCase().trim();
    const normalizedAdminEmail = adminEmail.toLowerCase().trim();

    // Debug logging (remove in production)
    console.log('Admin login attempt:', {
      providedEmail: normalizedEmail,
      expectedEmail: normalizedAdminEmail,
      emailMatch: normalizedEmail === normalizedAdminEmail,
      passwordLength: password?.length,
      passwordMatch: password === adminPassword,
    });

    // Verify both email and password
    if (normalizedEmail === normalizedAdminEmail && password === adminPassword) {
      // Set cookie server-side with proper settings
      const response = NextResponse.json({ success: true });
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 24);
      
      response.cookies.set('admin-password-verified', 'true', {
        expires: expiryDate,
        path: '/',
        httpOnly: false, // Allow client-side access for layout check
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
      
      return response;
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid email or password' 
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Error verifying admin credentials:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Server error. Please try again.' 
    }, { status: 500 });
  }
}


