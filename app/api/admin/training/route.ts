import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { trainingEvents, type TrainingEvent } from '@/app/training/data/events';

const EVENTS_FILE_PATH = path.join(process.cwd(), 'app/training/data/events.ts');

// GET - Fetch all events
export async function GET() {
  try {
    const events = Object.values(trainingEvents);
    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST - Create new event
export async function POST(request: NextRequest) {
  try {
    const eventData: Omit<TrainingEvent, 'id' | 'createdAt' | 'updatedAt'> = await request.json();
    
    // Generate ID from title
    const id = eventData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-' + new Date().getTime();
    
    const newEvent: TrainingEvent = {
      ...eventData,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Read current file
    let fileContent = fs.readFileSync(EVENTS_FILE_PATH, 'utf-8');
    
    // Find the closing brace of the trainingEvents object (before getAllEvents function)
    const getAllEventsIndex = fileContent.indexOf('export function getAllEvents');
    if (getAllEventsIndex === -1) {
      throw new Error('Could not find insertion point');
    }

    // Insert new event before getAllEvents function
    const insertIndex = getAllEventsIndex;
    const newEventString = formatEventForFile(newEvent);
    
    // Check if we need a comma (if there are existing events)
    const needsComma = !fileContent.slice(0, insertIndex).trim().endsWith('{');
    
    const updatedContent = 
      fileContent.slice(0, insertIndex) +
      (needsComma ? ',\n' : '') +
      newEventString +
      '\n' +
      fileContent.slice(insertIndex);

    fs.writeFileSync(EVENTS_FILE_PATH, updatedContent, 'utf-8');

    return NextResponse.json({ event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}

// PUT - Update event
export async function PUT(request: NextRequest) {
  try {
    const { id, ...eventData }: TrainingEvent = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    // Read current file
    let fileContent = fs.readFileSync(EVENTS_FILE_PATH, 'utf-8');
    
    // Find the event by ID (match multiline)
    const eventPattern = new RegExp(
      `'${id.replace(/'/g, "\\'")}':\\s*\\{[\\s\\S]*?\\}`,
      'g'
    );
    
    const match = fileContent.match(eventPattern);
    if (!match) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Update the event
    const updatedEvent: TrainingEvent = {
      ...eventData,
      id,
      updatedAt: new Date().toISOString(),
      createdAt: eventData.createdAt || new Date().toISOString(),
    };

    const newEventString = formatEventForFile(updatedEvent);
    fileContent = fileContent.replace(eventPattern, `'${id}': ${newEventString}`);

    fs.writeFileSync(EVENTS_FILE_PATH, fileContent, 'utf-8');

    return NextResponse.json({ event: updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// DELETE - Delete event
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    // Read current file
    let fileContent = fs.readFileSync(EVENTS_FILE_PATH, 'utf-8');
    
    // Find and remove the event (handle both with and without trailing comma)
    // First try with comma
    let eventPattern = new RegExp(
      `'${id.replace(/'/g, "\\'")}':\\s*\\{[\\s\\S]*?\\},\\s*`,
      'g'
    );
    
    fileContent = fileContent.replace(eventPattern, '');
    
    // If that didn't work, try without comma (last event)
    eventPattern = new RegExp(
      `,\\s*'${id.replace(/'/g, "\\'")}':\\s*\\{[\\s\\S]*?\\}`,
      'g'
    );
    
    fileContent = fileContent.replace(eventPattern, '');
    
    // Also try standalone (first and only event)
    eventPattern = new RegExp(
      `'${id.replace(/'/g, "\\'")}':\\s*\\{[\\s\\S]*?\\}`,
      'g'
    );
    
    fileContent = fileContent.replace(eventPattern, '');

    fs.writeFileSync(EVENTS_FILE_PATH, fileContent, 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}

function formatEventForFile(event: TrainingEvent): string {
  return `  '${event.id}': {
    id: '${event.id}',
    title: '${event.title.replace(/'/g, "\\'")}',
    description: '${event.description.replace(/'/g, "\\'")}',
    date: '${event.date}',
    time: '${event.time}',
    location: '${event.location.replace(/'/g, "\\'")}',
    fullAddress: '${event.fullAddress?.replace(/'/g, "\\'") || ''}',
    city: '${event.city.replace(/'/g, "\\'")}',
    state: '${event.state}',
    zipCode: '${event.zipCode}',
    eventbriteUrl: '${event.eventbriteUrl}',
    ${event.instructor ? `instructor: '${event.instructor.replace(/'/g, "\\'")}',` : ''}
    ${event.maxAttendees ? `maxAttendees: ${event.maxAttendees},` : ''}
    isActive: ${event.isActive},
    ${event.sortOrder !== undefined ? `sortOrder: ${event.sortOrder},` : ''}
    createdAt: '${event.createdAt}',
    updatedAt: '${event.updatedAt}',
  }`;
}

