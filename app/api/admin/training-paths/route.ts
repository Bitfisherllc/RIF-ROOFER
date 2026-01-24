import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { trainingPaths, type TrainingPath } from '@/app/training/data/training-paths';

const TRAINING_PATHS_FILE_PATH = path.join(process.cwd(), 'app/training/data/training-paths.ts');

// GET - Fetch all training paths
export async function GET() {
  try {
    return NextResponse.json({ trainingPaths });
  } catch (error) {
    console.error('Error fetching training paths:', error);
    return NextResponse.json(
      { error: 'Failed to fetch training paths' },
      { status: 500 }
    );
  }
}

// PUT - Update training path
export async function PUT(request: NextRequest) {
  try {
    const trainingPathData: TrainingPath = await request.json();
    
    if (!trainingPathData.id) {
      return NextResponse.json(
        { error: 'Training path ID is required' },
        { status: 400 }
      );
    }

    // Read current file
    let fileContent = fs.readFileSync(TRAINING_PATHS_FILE_PATH, 'utf-8');
    
    // Find the training path by ID
    const pathPattern = new RegExp(
      `\\{[\\s\\S]*?id:\\s*'${trainingPathData.id.replace(/'/g, "\\'")}'[\\s\\S]*?\\}`,
      'g'
    );
    
    const match = fileContent.match(pathPattern);
    if (!match) {
      return NextResponse.json(
        { error: 'Training path not found' },
        { status: 404 }
      );
    }

    // Format the updated training path
    const newPathString = formatTrainingPathForFile(trainingPathData);
    
    // Replace the old path with the new one
    fileContent = fileContent.replace(pathPattern, newPathString);

    fs.writeFileSync(TRAINING_PATHS_FILE_PATH, fileContent, 'utf-8');

    return NextResponse.json({ trainingPath: trainingPathData });
  } catch (error) {
    console.error('Error updating training path:', error);
    return NextResponse.json(
      { error: 'Failed to update training path' },
      { status: 500 }
    );
  }
}

// POST - Create new training path
export async function POST(request: NextRequest) {
  try {
    const trainingPathData: Omit<TrainingPath, 'id'> = await request.json();
    
    // Generate ID from title
    const id = trainingPathData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    const newPath: TrainingPath = {
      ...trainingPathData,
      id,
    };

    // Read current file
    let fileContent = fs.readFileSync(TRAINING_PATHS_FILE_PATH, 'utf-8');
    
    // Find the closing bracket of the trainingPaths array
    const closingBracketIndex = fileContent.lastIndexOf('];');
    if (closingBracketIndex === -1) {
      throw new Error('Could not find insertion point');
    }

    // Insert new path before closing bracket
    const newPathString = formatTrainingPathForFile(newPath);
    const needsComma = !fileContent.slice(0, closingBracketIndex).trim().endsWith('[');
    
    const updatedContent = 
      fileContent.slice(0, closingBracketIndex) +
      (needsComma ? ',\n' : '') +
      newPathString +
      '\n' +
      fileContent.slice(closingBracketIndex);

    fs.writeFileSync(TRAINING_PATHS_FILE_PATH, updatedContent, 'utf-8');

    return NextResponse.json({ trainingPath: newPath });
  } catch (error) {
    console.error('Error creating training path:', error);
    return NextResponse.json(
      { error: 'Failed to create training path' },
      { status: 500 }
    );
  }
}

// DELETE - Delete training path
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Training path ID is required' },
        { status: 400 }
      );
    }

    // Read current file
    let fileContent = fs.readFileSync(TRAINING_PATHS_FILE_PATH, 'utf-8');
    
    // Find and remove the training path
    const pathPattern = new RegExp(
      `\\{[\\s\\S]*?id:\\s*'${id.replace(/'/g, "\\'")}'[\\s\\S]*?\\},\\s*`,
      'g'
    );
    
    fileContent = fileContent.replace(pathPattern, '');
    
    // Also handle if it's the last path (no trailing comma)
    const pathPatternNoComma = new RegExp(
      `,\\s*\\{[\\s\\S]*?id:\\s*'${id.replace(/'/g, "\\'")}'[\\s\\S]*?\\}`,
      'g'
    );
    
    fileContent = fileContent.replace(pathPatternNoComma, '');

    fs.writeFileSync(TRAINING_PATHS_FILE_PATH, fileContent, 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting training path:', error);
    return NextResponse.json(
      { error: 'Failed to delete training path' },
      { status: 500 }
    );
  }
}

function formatTrainingPathForFile(path: TrainingPath): string {
  const escapeString = (str: string) => str.replace(/'/g, "\\'").replace(/\n/g, '\\n');
  
  return `  {
    id: '${path.id}',
    title: '${escapeString(path.title)}',
    description: '${escapeString(path.description)}',
    longDescription: '${escapeString(path.longDescription)}',
    icon: '${path.icon}',
    duration: '${path.duration}',
    format: '${path.format}',
    topics: [
${path.topics.map(topic => `      '${escapeString(topic)}'`).join(',\n')}
    ],
    benefits: [
${path.benefits.map(benefit => `      '${escapeString(benefit)}'`).join(',\n')}
    ],
    ${path.upcomingSessions !== undefined ? `upcomingSessions: ${path.upcomingSessions},` : ''}
  }`;
}






