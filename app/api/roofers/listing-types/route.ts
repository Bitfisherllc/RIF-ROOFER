import { NextResponse } from 'next/server';
import { getAllRoofers } from '@/app/roofers/data/roofers';

export type RooferListingType = 'preferred' | 'sponsored' | 'general';

/**
 * GET /api/roofers/listing-types
 * Returns a map of roofer id -> listing type for enriching favorite roofers on the client.
 */
export async function GET() {
  try {
    const roofers = getAllRoofers();
    const map: Record<string, RooferListingType> = {};
    for (const r of roofers) {
      if (r.category === 'preferred' || r.isPreferred) {
        map[r.id] = 'preferred';
      } else if (r.category === 'sponsored') {
        map[r.id] = 'sponsored';
      } else {
        map[r.id] = 'general';
      }
    }
    return NextResponse.json(map);
  } catch (error) {
    console.error('Error building roofer listing types:', error);
    return NextResponse.json({ error: 'Failed to load listing types' }, { status: 500 });
  }
}
