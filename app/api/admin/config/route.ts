import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONFIG_FILE = path.join(process.cwd(), 'app/admin/config/site-config.json');

// Default config
const DEFAULT_CONFIG = {
  passwordProtected: false,
  password: 'letmein',
};

function getConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const fileContent = fs.readFileSync(CONFIG_FILE, 'utf-8');
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error('Error reading config file:', error);
  }
  return DEFAULT_CONFIG;
}

function saveConfig(config: any) {
  try {
    const dir = path.dirname(CONFIG_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving config file:', error);
    return false;
  }
}

export async function GET() {
  const config = getConfig();
  return NextResponse.json(config);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const config = {
      passwordProtected: body.passwordProtected || false,
      password: 'letmein', // Password is fixed
    };
    
    if (saveConfig(config)) {
      return NextResponse.json({ success: true, config });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to save config' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating config:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}


