import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, unlinkSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { writeFile } from 'fs/promises';

const CONFIG_FILE = join(process.cwd(), 'app/admin/config/hero-background.json');
const PUBLIC_DIR = join(process.cwd(), 'public');
const HERO_IMAGE_PATH = join(PUBLIC_DIR, 'hero-background.jpg');

interface HeroBackgroundConfig {
  imageUrl: string | null;
  filename: string | null;
}

function getConfig(): HeroBackgroundConfig {
  try {
    if (existsSync(CONFIG_FILE)) {
      const content = readFileSync(CONFIG_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.error('Error reading hero background config:', error);
  }
  return { imageUrl: null, filename: null };
}

function saveConfig(config: HeroBackgroundConfig): void {
  try {
    const dir = join(process.cwd(), 'app', 'admin', 'config');
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving hero background config:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const config = getConfig();
    
    // Check if the image file exists
    if (config.imageUrl && existsSync(HERO_IMAGE_PATH)) {
      // Return config with timestamp to prevent caching issues
      return NextResponse.json({
        ...config,
        imageUrl: `/hero-background.jpg?t=${Date.now()}`,
      });
    } else if (config.imageUrl && !existsSync(HERO_IMAGE_PATH)) {
      // Image URL exists in config but file is missing - clear config
      const clearedConfig = { imageUrl: null, filename: null };
      saveConfig(clearedConfig);
      return NextResponse.json(clearedConfig);
    }
    
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error fetching hero background config:', error);
    return NextResponse.json(
      { error: 'Failed to fetch config' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!imageFile.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (imageFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Image size must be less than 5MB' },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure public directory exists
    if (!existsSync(PUBLIC_DIR)) {
      mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    // Delete old image if it exists
    if (existsSync(HERO_IMAGE_PATH)) {
      try {
        unlinkSync(HERO_IMAGE_PATH);
      } catch (error) {
        console.error('Error deleting old image:', error);
      }
    }

    // Save new image
    await writeFile(HERO_IMAGE_PATH, buffer);

    // Update config
    const config: HeroBackgroundConfig = {
      imageUrl: '/hero-background.jpg',
      filename: imageFile.name,
    };
    saveConfig(config);

    return NextResponse.json({
      success: true,
      imageUrl: config.imageUrl,
      filename: config.filename,
    });
  } catch (error) {
    console.error('Error uploading hero background:', error);
    return NextResponse.json(
      { error: 'Failed to upload image', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    // Delete image file
    if (existsSync(HERO_IMAGE_PATH)) {
      try {
        unlinkSync(HERO_IMAGE_PATH);
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    }

    // Clear config
    const config: HeroBackgroundConfig = {
      imageUrl: null,
      filename: null,
    };
    saveConfig(config);

    return NextResponse.json({
      success: true,
      message: 'Background image deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting hero background:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}

