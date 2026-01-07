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
  return { adminPassword: 'Willy123#' };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;
    const config = getConfig();

    // Default password if not set in config
    const adminPassword = config.adminPassword || 'Willy123#';

    if (password === adminPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false }, { status: 401 });
    }
  } catch (error) {
    console.error('Error verifying admin password:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

