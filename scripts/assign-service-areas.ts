/**
 * Script to assign service areas (city, county, region) to roofers based on their address
 * This reads all roofers and assigns service areas for those missing them
 */

import fs from 'fs';
import path from 'path';
import { searchData } from '../app/service-areas/data/search-data';

// Normalize city name for matching
function normalizeCityName(city: string): string {
  if (!city) return '';
  return city
    .toLowerCase()
    .trim()
    .replace(/\./g, '')
    .replace(/\s+/g, '-')
    .replace(/saint/gi, 'st')
    .replace(/st\./gi, 'st');
}

// Create slug from city name
function createCitySlug(cityName: string): string {
  return cityName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Find service areas for a city
function findServiceAreasForCity(cityName: string, zipCode?: string): {
  city?: string;
  county?: string;
  region?: string;
} | null {
  if (!cityName) return null;

  const normalizedCity = normalizeCityName(cityName);
  const citySlug = createCitySlug(cityName);

  // First, try exact city match
  const cityMatch = searchData.find(
    (item) => item.type === 'city' && item.slug === citySlug
  );

  if (cityMatch) {
    // Find the county and region for this city
    const countyMatch = searchData.find(
      (item) => 
        item.type === 'county' && 
        cityMatch.county && 
        item.name === cityMatch.county
    );

    const regionMatch = searchData.find(
      (item) => 
        item.type === 'region' && 
        cityMatch.region && 
        item.name === cityMatch.region
    );

    if (countyMatch && regionMatch) {
      return {
        city: cityMatch.slug,
        county: countyMatch.slug,
        region: regionMatch.slug,
      };
    }
  }

  // Try partial city match (e.g., "Ponte Vedra" vs "Ponte Vedra Beach")
  const partialCityMatch = searchData.find(
    (item) => 
      item.type === 'city' && 
      (item.slug.includes(citySlug) || citySlug.includes(item.slug) ||
       item.name.toLowerCase().includes(cityName.toLowerCase()) ||
       cityName.toLowerCase().includes(item.name.toLowerCase()))
  );

  if (partialCityMatch) {
    const countyMatch = searchData.find(
      (item) => 
        item.type === 'county' && 
        partialCityMatch.county && 
        item.name === partialCityMatch.county
    );

    const regionMatch = searchData.find(
      (item) => 
        item.type === 'region' && 
        partialCityMatch.region && 
        item.name === partialCityMatch.region
    );

    if (countyMatch && regionMatch) {
      return {
        city: partialCityMatch.slug,
        county: countyMatch.slug,
        region: regionMatch.slug,
      };
    }
  }

  // Try matching by county name if city contains county name
  const countyMatch = searchData.find(
    (item) => 
      item.type === 'county' && 
      (normalizedCity.includes(item.slug) || 
       item.name.toLowerCase().replace(' county', '').includes(cityName.toLowerCase()))
  );

  if (countyMatch) {
    const regionMatch = searchData.find(
      (item) => 
        item.type === 'region' && 
        countyMatch.region && 
        item.name === countyMatch.region
    );

    if (regionMatch) {
      return {
        county: countyMatch.slug,
        region: regionMatch.slug,
      };
    }
  }

  return null;
}

// Read the roofer data file
const rooferDataPath = path.join(process.cwd(), 'app/roofers/data/roofers.ts');
const rooferDataContent = fs.readFileSync(rooferDataPath, 'utf-8');

// Parse the roofer data (simplified - we'll need to extract it properly)
// This is a complex task because we're dealing with a TypeScript file
// For now, let's create a Node script that can be run separately

console.log('Service area assignment script');
console.log('This script will need to be run to update roofer service areas');
console.log('Based on city and zip code information');

