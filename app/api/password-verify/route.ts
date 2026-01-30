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
  return { passwordProtected: false, password: 'Hottinroof123#' };
}

/** GET: whether the site gate is enabled (for PasswordGate component). Does not expose the password. */
export async function GET() {
  const config = getConfig();
  return NextResponse.json({ passwordProtected: !!config.passwordProtected });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;
    const config = getConfig();

    if (password === config.password) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false }, { status: 401 });
    }
  } catch (error) {
    console.error('Error verifying password:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}


