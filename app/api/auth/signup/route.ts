import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'app/api/auth/users.json');

interface User {
  id: string;
  email: string;
  fullName: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

// Ensure users file exists
function ensureUsersFile() {
  try {
    const dir = path.dirname(USERS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(USERS_FILE)) {
      // Try to write, but handle read-only filesystem (e.g., Vercel)
      try {
        fs.writeFileSync(USERS_FILE, JSON.stringify({ users: [] }, null, 2));
      } catch (writeError) {
        // If write fails (read-only filesystem), log but continue
        // The file will be created on first write operation
        console.warn('Could not create users.json file (may be read-only filesystem):', writeError);
      }
    }
  } catch (error) {
    console.warn('Error ensuring users file:', error);
  }
}

function getUsers(): User[] {
  ensureUsersFile();
  try {
    const fileContent = fs.readFileSync(USERS_FILE, 'utf-8');
    const data = JSON.parse(fileContent);
    return data.users || [];
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
}

function saveUsers(users: User[]) {
  ensureUsersFile();
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2), 'utf-8');
    return true;
  } catch (error: any) {
    // On Vercel or read-only filesystems, file writes may fail
    // This is expected - in production, use a database instead
    console.error('Error writing users file (read-only filesystem?):', error);
    // Return false to indicate failure, but don't crash
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, password } = body;

    // Validation
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
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

    // Check if user already exists
    const users = getUsers();
    const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: email.toLowerCase().trim(),
      fullName: fullName.trim(),
      passwordHash,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save user
    users.push(newUser);
    const saved = saveUsers(users);

    if (!saved) {
      return NextResponse.json(
        { error: 'Failed to create account. Please try again.' },
        { status: 500 }
      );
    }

    // Return success (don't return password hash)
    const { passwordHash: _, ...userWithoutPassword } = newUser;
    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

