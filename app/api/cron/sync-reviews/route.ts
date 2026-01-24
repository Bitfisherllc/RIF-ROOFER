/**
 * Cron endpoint for weekly review sync
 * 
 * This endpoint is called by a cron service (Vercel Cron, GitHub Actions, etc.)
 * to automatically sync reviews every week.
 * 
 * Setup:
 * 1. Add cron job that calls: POST /api/cron/sync-reviews
 * 2. Set REVIEWS_SYNC_API_KEY in environment variables
 * 3. Configure cron to run weekly (e.g., every Monday at 2 AM)
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Verify cron secret (if using Vercel Cron)
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Call the sync endpoint
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                  request.nextUrl.origin;
  
  try {
    const syncResponse = await fetch(`${baseUrl}/api/sync-google-reviews`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REVIEWS_SYNC_API_KEY || ''}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await syncResponse.json();

    if (!syncResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data.error || 'Sync failed',
          message: data.message,
        },
        { status: syncResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Weekly review sync completed',
      data,
      syncedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Cron sync error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Cron sync failed',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// Also support POST for flexibility
export const POST = GET;

















