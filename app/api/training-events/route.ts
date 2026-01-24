/**
 * Public API for training events
 * GET: List all active upcoming training events
 * 
 * This endpoint reads the events file directly to ensure
 * fresh data after admin changes, bypassing Next.js module cache.
 */

import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { TrainingEvent } from '@/app/training/data/events';

const EVENTS_FILE_PATH = join(process.cwd(), 'app', 'training', 'data', 'events.ts');

// Make this dynamic so it always gets fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Read events directly from file to bypass module cache
 * Uses the same method as admin API to ensure consistency
 */
async function readEventsFromFile(): Promise<Record<string, TrainingEvent>> {
  try {
    // Use the same readEvents function logic as admin API
    // First, try to clear module cache
    for (let i = 0; i < 3; i++) {
      try {
        const modulePath = require.resolve('@/app/training/data/events');
        if (require.cache && require.cache[modulePath]) {
          delete require.cache[modulePath];
        }
      } catch (e) {
        // Module path might not resolve, continue
      }
    }
    
    // Small delay to ensure cache is cleared
    await new Promise(resolve => setTimeout(resolve, 50));
    
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
    
    // Fallback to import
    const eventsModule = await import('@/app/training/data/events');
    return eventsModule.trainingEvents || {};
  } catch (error) {
    console.error('Error reading events file:', error);
    // Final fallback
    try {
      const eventsModule = await import('@/app/training/data/events');
      return eventsModule.trainingEvents || {};
    } catch (importError) {
      console.error('Import fallback also failed:', importError);
      return {};
    }
  }
}

export async function GET() {
  try {
    // Read events directly from file to get fresh data
    const allEvents = await readEventsFromFile();
    
    // Filter for active events (show all active events, not just upcoming)
    // This ensures admin-added events show up immediately
    const activeEvents = Object.values(allEvents)
      .filter(event => event.isActive)
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (dateA !== dateB) {
          return dateA - dateB;
        }
        return (a.sortOrder || 999) - (b.sortOrder || 999);
      });
    
    const response = NextResponse.json({
      events: activeEvents,
    });
    
    // Add headers to prevent caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error: any) {
    console.error('Error loading training events:', error);
    return NextResponse.json(
      { error: 'Failed to load events', message: error.message },
      { status: 500 }
    );
  }
}

