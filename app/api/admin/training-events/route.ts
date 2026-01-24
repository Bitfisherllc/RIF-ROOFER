/**
 * Admin API for managing training events
 * GET: List all training events
 * POST: Create a new training event
 * DELETE: Delete a training event (via query param)
 */

import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, statSync } from 'fs';
import { join } from 'path';
import type { TrainingEvent } from '@/app/training/data/events';

const EVENTS_FILE_PATH = join(process.cwd(), 'app', 'training', 'data', 'events.ts');

/**
 * Read events from events.ts file
 * Reads file directly and parses to bypass module cache completely
 */
async function readEvents(): Promise<Record<string, TrainingEvent>> {
  try {
    // First, try to clear module cache
    try {
      const modulePath = require.resolve('@/app/training/data/events');
      if (require.cache && require.cache[modulePath]) {
        delete require.cache[modulePath];
      }
    } catch (e) {
      // Module might not be in cache yet, that's fine
    }
    
    // Read file directly to bypass all caching
    const content = readFileSync(EVENTS_FILE_PATH, 'utf-8');
    
    // Extract the trainingEvents object using regex
    const match = content.match(/export const trainingEvents:\s*Record<string,\s*TrainingEvent>\s*=\s*\{([\s\S]*?)\};/);
    
    if (!match) {
      // Fallback to import if regex fails
      const eventsModule = await import('@/app/training/data/events');
      return eventsModule.trainingEvents || {};
    }
    
    // Parse the events from the file content
    // Use a safer evaluation method
    const eventsContent = match[1];
    
    try {
      // Use Function constructor to safely evaluate the object
      // This bypasses module cache completely
      const eventsObj = new Function(`
        const trainingEvents = {${eventsContent}};
        return trainingEvents;
      `)();
      
      if (eventsObj && typeof eventsObj === 'object') {
        return eventsObj;
      }
    } catch (evalError) {
      console.error('Error evaluating events content:', evalError);
      // Fall through to import fallback
    }
    
    // Fallback to import if regex parsing failed
    const eventsModule = await import('@/app/training/data/events');
    return eventsModule.trainingEvents || {};
  } catch (error) {
    console.error('Error reading events file:', error);
    // Fallback to import
    try {
      const eventsModule = await import('@/app/training/data/events');
      return eventsModule.trainingEvents || {};
    } catch (importError) {
      console.error('Import fallback also failed:', importError);
      return {};
      return {};
    }
  }
}

/**
 * Write events to events.ts file
 * Clears module cache after writing to ensure fresh reads
 */
async function writeEvents(events: Record<string, TrainingEvent>): Promise<void> {
  try {
    // Read the original file to preserve imports and types
    const originalContent = readFileSync(EVENTS_FILE_PATH, 'utf-8');
    
    // Extract the header (everything before trainingEvents)
    const headerMatch = originalContent.match(/^([\s\S]*?)(export const trainingEvents)/);
    const header = headerMatch ? headerMatch[1] : '';
    
    // Extract the footer (everything after the closing brace and semicolon)
    const footerMatch = originalContent.match(/\};\s*([\s\S]*)$/);
    const footer = footerMatch ? footerMatch[1] : '';
    
    // Build the events object string
    const eventsEntries = Object.entries(events)
      .map(([id, event]) => {
        const eventStr = `  '${id}': {
    id: '${event.id}',
    title: ${JSON.stringify(event.title)},
    description: ${JSON.stringify(event.description)},
    date: '${event.date}',
    time: '${event.time}',
    location: ${JSON.stringify(event.location)},
    ${event.fullAddress ? `fullAddress: ${JSON.stringify(event.fullAddress)},` : ''}
    city: ${JSON.stringify(event.city)},
    state: ${JSON.stringify(event.state)},
    zipCode: '${event.zipCode}',
    ${event.lat !== undefined ? `lat: ${event.lat},` : ''}
    ${event.lng !== undefined ? `lng: ${event.lng},` : ''}
    eventbriteUrl: ${JSON.stringify(event.eventbriteUrl)},${event.instructor ? `\n    instructor: ${JSON.stringify(event.instructor)},` : ''}${event.maxAttendees ? `\n    maxAttendees: ${event.maxAttendees},` : ''}
    category: '${event.category}',
    deliveryMode: '${event.deliveryMode}',
    isActive: ${event.isActive},${event.sortOrder !== undefined ? `\n    sortOrder: ${event.sortOrder},` : ''}
    createdAt: '${event.createdAt}',
    updatedAt: '${event.updatedAt}',
  }`;
        return eventStr;
      })
      .join(',\n');

    const newContent = `${header}export const trainingEvents: Record<string, TrainingEvent> = {
${eventsEntries}
};${footer}`;

    // Write the file synchronously
    writeFileSync(EVENTS_FILE_PATH, newContent, 'utf-8');
    
    // Verify file was written by reading it back
    try {
      const verifyContent = readFileSync(EVENTS_FILE_PATH, 'utf-8');
      if (!verifyContent.includes(`'${Object.keys(events)[0]}'`)) {
        console.error('Warning: File write verification failed');
      }
    } catch (e) {
      console.error('Could not verify file write:', e);
    }
    
    // Wait a moment to ensure file system has flushed
    await new Promise(resolve => setTimeout(resolve, 150));
    
    // Aggressively clear module cache
    for (let i = 0; i < 5; i++) {
      try {
        const modulePath = require.resolve('@/app/training/data/events');
        if (require.cache && require.cache[modulePath]) {
          delete require.cache[modulePath];
        }
      } catch (e) {
        // Module might not be cached yet or path different
      }
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    
    console.log(`Successfully wrote ${Object.keys(events).length} events to file`);
  } catch (error) {
    console.error('Error writing events file:', error);
    throw error;
  }
}

// GET - List all events
export async function GET() {
  try {
    // Always read fresh data, clearing cache first
    const allEvents = await readEvents();
    
    return NextResponse.json({
      events: Object.values(allEvents).sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (dateA !== dateB) {
          return dateA - dateB;
        }
        return (a.sortOrder || 999) - (b.sortOrder || 999);
      }),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to load events', message: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      date,
      time,
      location,
      fullAddress,
      city,
      state,
      zipCode,
      lat,
      lng,
      eventbriteUrl,
      instructor,
      maxAttendees,
      category = 'both',
      deliveryMode = 'in-person',
      isActive = true,
      sortOrder,
    } = body;

    // Validate required fields
    if (!title || !description || !date || !time || !location || !city || !state || !zipCode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate category
    if (!['sales', 'installation', 'both'].includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category. Must be "sales", "installation", or "both"' },
        { status: 400 }
      );
    }

    // Validate deliveryMode
    if (!['in-person', 'virtual', 'hybrid'].includes(deliveryMode)) {
      return NextResponse.json(
        { error: 'Invalid deliveryMode. Must be "in-person", "virtual", or "hybrid"' },
        { status: 400 }
      );
    }

    // Import existing events
    const allEvents = await readEvents();

    // Generate ID
    const id = body.id || `rif-certification-${city.toLowerCase().replace(/\s+/g, '-')}-${date.replace(/-/g, '')}`;
    
    // Check if ID already exists
    if (allEvents[id]) {
      return NextResponse.json(
        { error: 'Event with this ID already exists' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const newEvent: TrainingEvent = {
      id,
      title,
      description,
      date,
      time,
      location,
      fullAddress: fullAddress || undefined,
      city,
      state,
      zipCode,
      lat: lat !== undefined && lat !== null && lat !== '' ? (typeof lat === 'string' ? parseFloat(lat) : lat) : undefined,
      lng: lng !== undefined && lng !== null && lng !== '' ? (typeof lng === 'string' ? parseFloat(lng) : lng) : undefined,
      eventbriteUrl: eventbriteUrl || '',
      instructor: instructor || undefined,
      maxAttendees: maxAttendees ? parseInt(maxAttendees) : undefined,
      category: category as 'sales' | 'installation' | 'both',
      deliveryMode: deliveryMode as 'in-person' | 'virtual' | 'hybrid',
      isActive: isActive !== false,
      sortOrder: sortOrder ? parseInt(sortOrder) : undefined,
      createdAt: now,
      updatedAt: now,
    };

    allEvents[id] = newEvent;

    // Write back to file
    await writeEvents(allEvents);
    
    // Verify the write by reading back
    const verifyEvents = await readEvents();
    if (!verifyEvents[id]) {
      console.error('Warning: Event not found after write, possible cache issue');
    }

    return NextResponse.json({ success: true, event: newEvent });
  } catch (error: any) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event', message: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update an existing event
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      title,
      description,
      date,
      time,
      location,
      fullAddress,
      city,
      state,
      zipCode,
      lat,
      lng,
      eventbriteUrl,
      instructor,
      maxAttendees,
      category,
      deliveryMode,
      isActive,
      sortOrder,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!title || !description || !date || !time || !location || !city || !state || !zipCode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate category
    if (category && !['sales', 'installation', 'both'].includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category. Must be "sales", "installation", or "both"' },
        { status: 400 }
      );
    }

    // Validate deliveryMode
    if (deliveryMode && !['in-person', 'virtual', 'hybrid'].includes(deliveryMode)) {
      return NextResponse.json(
        { error: 'Invalid deliveryMode. Must be "in-person", "virtual", or "hybrid"' },
        { status: 400 }
      );
    }

    // Import existing events
    const allEvents = await readEvents();

    if (!allEvents[id]) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Update the event
    const existingEvent = allEvents[id];
    const updatedEvent: TrainingEvent = {
      ...existingEvent,
      title,
      description,
      date,
      time,
      location,
      fullAddress: fullAddress !== undefined ? fullAddress : existingEvent.fullAddress,
      city,
      state,
      zipCode,
      lat: lat !== undefined && lat !== null && lat !== '' ? (typeof lat === 'string' ? parseFloat(lat) : lat) : existingEvent.lat,
      lng: lng !== undefined && lng !== null && lng !== '' ? (typeof lng === 'string' ? parseFloat(lng) : lng) : existingEvent.lng,
      eventbriteUrl: eventbriteUrl || '',
      instructor: instructor || undefined,
      maxAttendees: maxAttendees ? parseInt(maxAttendees) : undefined,
      category: category || existingEvent.category,
      deliveryMode: deliveryMode || existingEvent.deliveryMode,
      isActive: isActive !== undefined ? isActive : existingEvent.isActive,
      sortOrder: sortOrder !== undefined && sortOrder !== '' ? parseInt(sortOrder) : undefined,
      updatedAt: new Date().toISOString(),
    };

    allEvents[id] = updatedEvent;

    // Write back to file
    await writeEvents(allEvents);
    
    // Verify the update by reading back
    const verifyEvents = await readEvents();
    if (verifyEvents[id]?.updatedAt !== updatedEvent.updatedAt) {
      console.error('Warning: Event update not reflected, possible cache issue');
    }

    return NextResponse.json({ success: true, event: updatedEvent });
  } catch (error: any) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event', message: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete an event
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

    // Import existing events
    const allEvents = await readEvents();

    if (!allEvents[id]) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Delete the event
    delete allEvents[id];

    // Write back to file
    await writeEvents(allEvents);
    
    // Verify the deletion by reading back
    const verifyEvents = await readEvents();
    if (verifyEvents[id]) {
      console.error('Warning: Event still exists after delete, possible cache issue');
      // Try one more time with fresh read
      const freshEvents = await readEvents();
      delete freshEvents[id];
      await writeEvents(freshEvents);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event', message: error.message },
      { status: 500 }
    );
  }
}

