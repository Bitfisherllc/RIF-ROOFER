/**
 * Admin API for managing training programs
 * GET: List all training programs
 * PUT: Update a training program
 */

import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { TrainingPath } from '@/app/training/data/training-paths';

const PROGRAMS_FILE_PATH = join(process.cwd(), 'app', 'training', 'data', 'training-paths.ts');

/**
 * Read training programs from training-paths.ts file
 * Reads file directly and parses to bypass module cache completely
 */
async function readPrograms(): Promise<Record<string, TrainingPath>> {
  try {
    // First, try to clear module cache
    try {
      const modulePath = require.resolve('@/app/training/data/training-paths');
      if (require.cache && require.cache[modulePath]) {
        delete require.cache[modulePath];
      }
    } catch (e) {
      // Module might not be in cache yet, that's fine
    }
    
    // Read file directly to bypass all caching
    const content = readFileSync(PROGRAMS_FILE_PATH, 'utf-8');
    
    // Extract the trainingPaths object using regex
    const match = content.match(/export const trainingPaths:\s*Record<string,\s*TrainingPath>\s*=\s*\{([\s\S]*?)\};/);
    
    if (!match) {
      // Fallback to import if regex fails
      const programsModule = await import('@/app/training/data/training-paths');
      return programsModule.trainingPaths || {};
    }
    
    // Parse the programs from the file content
    const programsContent = match[1];
    
    try {
      // Use Function constructor to safely evaluate the object
      // This bypasses module cache completely
      const programsObj = new Function(`
        const trainingPaths = {${programsContent}};
        return trainingPaths;
      `)();
      
      if (programsObj && typeof programsObj === 'object') {
        return programsObj;
      }
    } catch (evalError) {
      console.error('Error evaluating programs content:', evalError);
      // Fall through to import fallback
    }
    
    // Fallback to import
    const programsModule = await import('@/app/training/data/training-paths');
    return programsModule.trainingPaths || {};
  } catch (error) {
    console.error('Error reading programs file:', error);
    // Final fallback
    try {
      const programsModule = await import('@/app/training/data/training-paths');
      return programsModule.trainingPaths || {};
    } catch (importError) {
      console.error('Import fallback also failed:', importError);
      return {};
    }
  }
}

/**
 * Write training programs to training-paths.ts file
 * Clears module cache after writing to ensure fresh reads
 */
async function writePrograms(programs: Record<string, TrainingPath>): Promise<void> {
  try {
    // Read the original file to preserve imports and types
    const originalContent = readFileSync(PROGRAMS_FILE_PATH, 'utf-8');
    
    // Extract the header (everything before trainingPaths)
    const headerMatch = originalContent.match(/^([\s\S]*?)(export const trainingPaths)/);
    const header = headerMatch ? headerMatch[1] : '';
    
    // Extract the footer (everything after the closing brace and semicolon)
    const footerMatch = originalContent.match(/\};\s*([\s\S]*)$/);
    const footer = footerMatch ? footerMatch[1] : '';
    
    // Build the programs object string
    const programsEntries = Object.entries(programs)
      .map(([id, program]) => {
        const topicsStr = JSON.stringify(program.topics || []);
        const benefitsStr = JSON.stringify(program.benefits || []);
        const upcomingSessionsStr = program.upcomingSessions !== undefined ? program.upcomingSessions : 'undefined';
        
        return `  '${id}': {
    id: '${program.id}',
    title: ${JSON.stringify(program.title)},
    description: ${JSON.stringify(program.description)},
    longDescription: ${JSON.stringify(program.longDescription)},
    icon: '${program.icon}',
    duration: '${program.duration || ''}',
    format: '${program.format || ''}',
    topics: ${topicsStr},
    benefits: ${benefitsStr},
    upcomingSessions: ${upcomingSessionsStr === 'undefined' ? 'undefined' : upcomingSessionsStr},
  }`;
      })
      .join(',\n');
    
    // Build the new file content
    const newContent = `${header}export const trainingPaths: Record<string, TrainingPath> = {
${programsEntries},
};${footer}`;
    
    // Write the file
    writeFileSync(PROGRAMS_FILE_PATH, newContent, 'utf-8');
    
    // Clear module cache multiple times to ensure it's cleared
    for (let i = 0; i < 3; i++) {
      try {
        const modulePath = require.resolve('@/app/training/data/training-paths');
        if (require.cache && require.cache[modulePath]) {
          delete require.cache[modulePath];
        }
      } catch (e) {
        // Module might not resolve, continue
      }
    }
    
    // Small delay to ensure file system has written
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Verify the write by reading back
    const verifyContent = readFileSync(PROGRAMS_FILE_PATH, 'utf-8');
    if (!verifyContent.includes(programsEntries.split('\n')[0])) {
      throw new Error('Write verification failed');
    }
  } catch (error) {
    console.error('Error writing programs file:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const programs = await readPrograms();
    return NextResponse.json({
      programs: Object.values(programs),
    });
  } catch (error: any) {
    console.error('Error loading training programs:', error);
    return NextResponse.json(
      { error: 'Failed to load programs', message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Program ID is required' },
        { status: 400 }
      );
    }
    
    // Read current programs
    const programs = await readPrograms();
    
    if (!programs[id]) {
      return NextResponse.json(
        { error: 'Program not found' },
        { status: 404 }
      );
    }
    
    // Update the program, but don't allow updates to duration, format, or upcomingSessions
    // These are calculated from events
    const { duration, format, upcomingSessions, ...allowedUpdates } = updates;
    programs[id] = {
      ...programs[id],
      ...allowedUpdates,
      id, // Ensure ID doesn't change
    };
    
    // Write back to file
    await writePrograms(programs);
    
    return NextResponse.json({
      success: true,
      program: programs[id],
    });
  } catch (error: any) {
    console.error('Error updating training program:', error);
    return NextResponse.json(
      { error: 'Failed to update program', message: error.message },
      { status: 500 }
    );
  }
}

