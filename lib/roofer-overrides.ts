/**
 * Roofer Overrides Storage using Vercel Blob
 * 
 * Stores only the fields that can be edited via admin UI:
 * - category (listing type)
 * - isPreferred
 * - isHidden
 * - phone, email, websiteUrl, googleBusinessUrl (contact info)
 * - serviceAreas
 * 
 * Base roofer data (name, slug, aboutText, etc.) comes from roofers.ts
 * Overrides are merged on top of base data when reading.
 */

import { put, head } from '@vercel/blob';

const BLOB_KEY = 'roofer-overrides.json';

export interface RooferOverride {
  slug: string;
  category?: 'preferred' | 'sponsored' | 'general';
  isPreferred?: boolean;
  isHidden?: boolean;
  phone?: string;
  email?: string;
  websiteUrl?: string;
  googleBusinessUrl?: string;
  serviceAreas?: {
    regions?: string[];
    counties?: string[];
    cities?: string[];
  };
}

export type RooferOverrides = Record<string, RooferOverride>;

/**
 * Get all roofer overrides from Blob storage
 */
export async function getRooferOverrides(): Promise<RooferOverrides> {
  try {
    const blobInfo = await head(BLOB_KEY);
    // Fetch the blob content from its URL
    const response = await fetch(blobInfo.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch blob: ${response.statusText}`);
    }
    const text = await response.text();
    return JSON.parse(text) as RooferOverrides;
  } catch (error: any) {
    // If blob doesn't exist yet, return empty object
    if (error?.status === 404 || error?.code === 'BLOB_NOT_FOUND' || error?.message?.includes('404')) {
      return {};
    }
    console.error('Error reading roofer overrides from Blob:', error);
    return {};
  }
}

/**
 * Save roofer overrides to Blob storage
 */
export async function saveRooferOverrides(overrides: RooferOverrides): Promise<void> {
  try {
    const json = JSON.stringify(overrides, null, 2);
    await put(BLOB_KEY, json, {
      access: 'public',
      contentType: 'application/json',
    });
  } catch (error) {
    console.error('Error saving roofer overrides to Blob:', error);
    throw new Error('Failed to save roofer overrides');
  }
}

/**
 * Update a single roofer's overrides
 */
export async function updateRooferOverride(
  slug: string,
  override: Partial<RooferOverride>
): Promise<void> {
  const overrides = await getRooferOverrides();
  overrides[slug] = {
    ...overrides[slug],
    ...override,
    slug, // Ensure slug is set
  };
  await saveRooferOverrides(overrides);
}

/**
 * Update multiple roofer overrides at once
 */
export async function updateRooferOverrides(
  updates: Array<{ slug: string; override: Partial<RooferOverride> }>
): Promise<void> {
  const overrides = await getRooferOverrides();
  
  for (const { slug, override } of updates) {
    overrides[slug] = {
      ...overrides[slug],
      ...override,
      slug, // Ensure slug is set
    };
  }
  
  await saveRooferOverrides(overrides);
}

/**
 * Merge base roofer data with overrides
 */
export function mergeRooferWithOverride<T extends { slug: string }>(
  baseRoofer: T,
  override?: RooferOverride
): T {
  if (!override) return baseRoofer;
  
  return {
    ...baseRoofer,
    // Only merge fields that are in the override
    ...(override.category !== undefined && { category: override.category }),
    ...(override.isPreferred !== undefined && { isPreferred: override.isPreferred }),
    ...(override.isHidden !== undefined && { isHidden: override.isHidden }),
    ...(override.phone !== undefined && { phone: override.phone }),
    ...(override.email !== undefined && { email: override.email }),
    ...(override.websiteUrl !== undefined && { websiteUrl: override.websiteUrl }),
    ...(override.googleBusinessUrl !== undefined && { googleBusinessUrl: override.googleBusinessUrl }),
    ...(override.serviceAreas !== undefined && { serviceAreas: override.serviceAreas }),
  } as T;
}
