// Comprehensive search data for all service areas
// This file contains all regions, counties, cities, towns, neighborhoods, and districts

export interface SearchResult {
  type: 'region' | 'county' | 'city';
  name: string;
  slug: string;
  path: string;
  county?: string;
  region?: string;
}

// Helper to create city path
function cityPath(region: string, county: string, city: string): string {
  const citySlug = city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `/service-areas/${region}/${county}/${citySlug}`;
}

// Helper to create county path
function countyPath(region: string, county: string): string {
  return `/service-areas/${region}/${county}`;
}

export const searchData: SearchResult[] = [
  // ===== REGIONS =====
  { type: 'region', name: 'Sun Coast', slug: 'sun-coast', path: '/service-areas/sun-coast' },
  { type: 'region', name: 'Treasure Coast', slug: 'treasure-coast', path: '/service-areas/treasure-coast' },
  { type: 'region', name: 'Southwest Florida', slug: 'southwest-florida', path: '/service-areas/southwest-florida' },
  { type: 'region', name: 'South Florida', slug: 'south-florida', path: '/service-areas/south-florida' },
  { type: 'region', name: 'North Florida', slug: 'north-florida', path: '/service-areas/north-florida' },
  { type: 'region', name: 'Florida Panhandle', slug: 'florida-panhandle', path: '/service-areas/florida-panhandle' },
  { type: 'region', name: 'First Coast', slug: 'first-coast', path: '/service-areas/first-coast' },
  { type: 'region', name: 'Central Florida', slug: 'central-florida', path: '/service-areas/central-florida' },

  // ===== SUN COAST COUNTIES =====
  { type: 'county', name: 'Hillsborough County', slug: 'hillsborough', path: countyPath('sun-coast', 'hillsborough'), region: 'Sun Coast' },
  { type: 'county', name: 'Pinellas County', slug: 'pinellas', path: countyPath('sun-coast', 'pinellas'), region: 'Sun Coast' },
  { type: 'county', name: 'Pasco County', slug: 'pasco', path: countyPath('sun-coast', 'pasco'), region: 'Sun Coast' },
  { type: 'county', name: 'Hernando County', slug: 'hernando', path: countyPath('sun-coast', 'hernando'), region: 'Sun Coast' },

  // ===== TREASURE COAST COUNTIES =====
  { type: 'county', name: 'Indian River County', slug: 'indian-river', path: countyPath('treasure-coast', 'indian-river'), region: 'Treasure Coast' },
  { type: 'county', name: 'St. Lucie County', slug: 'st-lucie', path: countyPath('treasure-coast', 'st-lucie'), region: 'Treasure Coast' },
  { type: 'county', name: 'Martin County', slug: 'martin', path: countyPath('treasure-coast', 'martin'), region: 'Treasure Coast' },
  { type: 'county', name: 'Palm Beach County', slug: 'palm-beach', path: countyPath('treasure-coast', 'palm-beach'), region: 'Treasure Coast' },

  // ===== SOUTHWEST FLORIDA COUNTIES =====
  { type: 'county', name: 'Sarasota County', slug: 'sarasota', path: countyPath('southwest-florida', 'sarasota'), region: 'Southwest Florida' },
  { type: 'county', name: 'Charlotte County', slug: 'charlotte', path: countyPath('southwest-florida', 'charlotte'), region: 'Southwest Florida' },
  { type: 'county', name: 'Lee County', slug: 'lee', path: countyPath('southwest-florida', 'lee'), region: 'Southwest Florida' },
  { type: 'county', name: 'Collier County', slug: 'collier', path: countyPath('southwest-florida', 'collier'), region: 'Southwest Florida' },

  // ===== SOUTH FLORIDA COUNTIES =====
  { type: 'county', name: 'Miami-Dade County', slug: 'miami-dade', path: countyPath('south-florida', 'miami-dade'), region: 'South Florida' },
  { type: 'county', name: 'Broward County', slug: 'broward', path: countyPath('south-florida', 'broward'), region: 'South Florida' },
  { type: 'county', name: 'Palm Beach County', slug: 'palm-beach-south', path: countyPath('south-florida', 'palm-beach-south'), region: 'South Florida' },
  { type: 'county', name: 'Monroe County', slug: 'monroe', path: countyPath('south-florida', 'monroe'), region: 'South Florida' },

  // ===== NORTH FLORIDA COUNTIES =====
  { type: 'county', name: 'Duval County', slug: 'duval', path: countyPath('north-florida', 'duval'), region: 'North Florida' },
  { type: 'county', name: 'St. Johns County', slug: 'st-johns', path: countyPath('north-florida', 'st-johns'), region: 'North Florida' },
  { type: 'county', name: 'Alachua County', slug: 'alachua', path: countyPath('north-florida', 'alachua'), region: 'North Florida' },
  { type: 'county', name: 'Clay County', slug: 'clay', path: countyPath('north-florida', 'clay'), region: 'North Florida' },

  // ===== FLORIDA PANHANDLE COUNTIES =====
  { type: 'county', name: 'Escambia County', slug: 'escambia', path: countyPath('florida-panhandle', 'escambia'), region: 'Florida Panhandle' },
  { type: 'county', name: 'Santa Rosa County', slug: 'santa-rosa', path: countyPath('florida-panhandle', 'santa-rosa'), region: 'Florida Panhandle' },
  { type: 'county', name: 'Okaloosa County', slug: 'okaloosa', path: countyPath('florida-panhandle', 'okaloosa'), region: 'Florida Panhandle' },
  { type: 'county', name: 'Bay County', slug: 'bay', path: countyPath('florida-panhandle', 'bay'), region: 'Florida Panhandle' },
  { type: 'county', name: 'Leon County', slug: 'leon', path: countyPath('florida-panhandle', 'leon'), region: 'Florida Panhandle' },

  // ===== FIRST COAST COUNTIES =====
  { type: 'county', name: 'Duval County', slug: 'duval-fc', path: countyPath('first-coast', 'duval-fc'), region: 'First Coast' },
  { type: 'county', name: 'St. Johns County', slug: 'st-johns-fc', path: countyPath('first-coast', 'st-johns-fc'), region: 'First Coast' },
  { type: 'county', name: 'Nassau County', slug: 'nassau', path: countyPath('first-coast', 'nassau'), region: 'First Coast' },
  { type: 'county', name: 'Clay County', slug: 'clay-fc', path: countyPath('first-coast', 'clay-fc'), region: 'First Coast' },

  // ===== CENTRAL FLORIDA COUNTIES =====
  { type: 'county', name: 'Orange County', slug: 'orange', path: countyPath('central-florida', 'orange'), region: 'Central Florida' },
  { type: 'county', name: 'Seminole County', slug: 'seminole', path: countyPath('central-florida', 'seminole'), region: 'Central Florida' },
  { type: 'county', name: 'Osceola County', slug: 'osceola', path: countyPath('central-florida', 'osceola'), region: 'Central Florida' },
  { type: 'county', name: 'Polk County', slug: 'polk', path: countyPath('central-florida', 'polk'), region: 'Central Florida' },
  { type: 'county', name: 'Lake County', slug: 'lake', path: countyPath('central-florida', 'lake'), region: 'Central Florida' },

  // ===== HILLSBOROUGH COUNTY CITIES =====
  { type: 'city', name: 'Tampa', slug: 'tampa', path: cityPath('sun-coast', 'hillsborough', 'Tampa'), county: 'Hillsborough County', region: 'Sun Coast' },
  { type: 'city', name: 'Brandon', slug: 'brandon', path: cityPath('sun-coast', 'hillsborough', 'Brandon'), county: 'Hillsborough County', region: 'Sun Coast' },
  { type: 'city', name: 'Plant City', slug: 'plant-city', path: cityPath('sun-coast', 'hillsborough', 'Plant City'), county: 'Hillsborough County', region: 'Sun Coast' },
  { type: 'city', name: 'Temple Terrace', slug: 'temple-terrace', path: cityPath('sun-coast', 'hillsborough', 'Temple Terrace'), county: 'Hillsborough County', region: 'Sun Coast' },
  { type: 'city', name: 'Riverview', slug: 'riverview', path: cityPath('sun-coast', 'hillsborough', 'Riverview'), county: 'Hillsborough County', region: 'Sun Coast' },
  { type: 'city', name: 'Ybor City', slug: 'ybor-city', path: cityPath('sun-coast', 'hillsborough', 'Ybor City'), county: 'Hillsborough County', region: 'Sun Coast' },
  { type: 'city', name: 'South Tampa', slug: 'south-tampa', path: cityPath('sun-coast', 'hillsborough', 'South Tampa'), county: 'Hillsborough County', region: 'Sun Coast' },
  { type: 'city', name: 'Westchase', slug: 'westchase', path: cityPath('sun-coast', 'hillsborough', 'Westchase'), county: 'Hillsborough County', region: 'Sun Coast' },
  { type: 'city', name: 'Carrollwood', slug: 'carrollwood', path: cityPath('sun-coast', 'hillsborough', 'Carrollwood'), county: 'Hillsborough County', region: 'Sun Coast' },
  { type: 'city', name: 'Downtown Tampa', slug: 'downtown-tampa', path: cityPath('sun-coast', 'hillsborough', 'Downtown Tampa'), county: 'Hillsborough County', region: 'Sun Coast' },
  { type: 'city', name: 'Hyde Park', slug: 'hyde-park', path: cityPath('sun-coast', 'hillsborough', 'Hyde Park'), county: 'Hillsborough County', region: 'Sun Coast' },
  { type: 'city', name: 'New Tampa', slug: 'new-tampa', path: cityPath('sun-coast', 'hillsborough', 'New Tampa'), county: 'Hillsborough County', region: 'Sun Coast' },
  { type: 'city', name: 'Westshore', slug: 'westshore', path: cityPath('sun-coast', 'hillsborough', 'Westshore'), county: 'Hillsborough County', region: 'Sun Coast' },
  { type: 'city', name: 'Davis Islands', slug: 'davis-islands', path: cityPath('sun-coast', 'hillsborough', 'Davis Islands'), county: 'Hillsborough County', region: 'Sun Coast' },
  { type: 'city', name: 'Sulphur Springs', slug: 'sulphur-springs', path: cityPath('sun-coast', 'hillsborough', 'Sulphur Springs'), county: 'Hillsborough County', region: 'Sun Coast' },

  // ===== PINELLAS COUNTY CITIES =====
  { type: 'city', name: 'St. Petersburg', slug: 'st-petersburg', path: cityPath('sun-coast', 'pinellas', 'St. Petersburg'), county: 'Pinellas County', region: 'Sun Coast' },
  { type: 'city', name: 'Clearwater', slug: 'clearwater', path: cityPath('sun-coast', 'pinellas', 'Clearwater'), county: 'Pinellas County', region: 'Sun Coast' },
  { type: 'city', name: 'Largo', slug: 'largo', path: cityPath('sun-coast', 'pinellas', 'Largo'), county: 'Pinellas County', region: 'Sun Coast' },
  { type: 'city', name: 'Pinellas Park', slug: 'pinellas-park', path: cityPath('sun-coast', 'pinellas', 'Pinellas Park'), county: 'Pinellas County', region: 'Sun Coast' },
  { type: 'city', name: 'Dunedin', slug: 'dunedin', path: cityPath('sun-coast', 'pinellas', 'Dunedin'), county: 'Pinellas County', region: 'Sun Coast' },
  { type: 'city', name: 'Treasure Island', slug: 'treasure-island', path: cityPath('sun-coast', 'pinellas', 'Treasure Island'), county: 'Pinellas County', region: 'Sun Coast' },
  { type: 'city', name: 'St. Pete Beach', slug: 'st-pete-beach', path: cityPath('sun-coast', 'pinellas', 'St. Pete Beach'), county: 'Pinellas County', region: 'Sun Coast' },
  { type: 'city', name: 'Madeira Beach', slug: 'madeira-beach', path: cityPath('sun-coast', 'pinellas', 'Madeira Beach'), county: 'Pinellas County', region: 'Sun Coast' },
  { type: 'city', name: 'Redington Beach', slug: 'redington-beach', path: cityPath('sun-coast', 'pinellas', 'Redington Beach'), county: 'Pinellas County', region: 'Sun Coast' },
  { type: 'city', name: 'Indian Rocks Beach', slug: 'indian-rocks-beach', path: cityPath('sun-coast', 'pinellas', 'Indian Rocks Beach'), county: 'Pinellas County', region: 'Sun Coast' },
  { type: 'city', name: 'Belleair', slug: 'belleair', path: cityPath('sun-coast', 'pinellas', 'Belleair'), county: 'Pinellas County', region: 'Sun Coast' },
  { type: 'city', name: 'Safety Harbor', slug: 'safety-harbor', path: cityPath('sun-coast', 'pinellas', 'Safety Harbor'), county: 'Pinellas County', region: 'Sun Coast' },
  { type: 'city', name: 'Oldsmar', slug: 'oldsmar', path: cityPath('sun-coast', 'pinellas', 'Oldsmar'), county: 'Pinellas County', region: 'Sun Coast' },
  { type: 'city', name: 'Tarpon Springs', slug: 'tarpon-springs', path: cityPath('sun-coast', 'pinellas', 'Tarpon Springs'), county: 'Pinellas County', region: 'Sun Coast' },
  { type: 'city', name: 'Palm Harbor', slug: 'palm-harbor', path: cityPath('sun-coast', 'pinellas', 'Palm Harbor'), county: 'Pinellas County', region: 'Sun Coast' },
  { type: 'city', name: 'East Lake', slug: 'east-lake', path: cityPath('sun-coast', 'pinellas', 'East Lake'), county: 'Pinellas County', region: 'Sun Coast' },
  { type: 'city', name: 'Seminole', slug: 'seminole', path: cityPath('sun-coast', 'pinellas', 'Seminole'), county: 'Pinellas County', region: 'Sun Coast' },
  { type: 'city', name: 'Gulfport', slug: 'gulfport', path: cityPath('sun-coast', 'pinellas', 'Gulfport'), county: 'Pinellas County', region: 'Sun Coast' },
  { type: 'city', name: 'South Pasadena', slug: 'south-pasadena', path: cityPath('sun-coast', 'pinellas', 'South Pasadena'), county: 'Pinellas County', region: 'Sun Coast' },
  { type: 'city', name: 'Kenneth City', slug: 'kenneth-city', path: cityPath('sun-coast', 'pinellas', 'Kenneth City'), county: 'Pinellas County', region: 'Sun Coast' },
  { type: 'city', name: 'South Highpoint', slug: 'south-highpoint', path: cityPath('sun-coast', 'pinellas', 'South Highpoint'), county: 'Pinellas County', region: 'Sun Coast' },

  // ===== PASCO COUNTY CITIES =====
  { type: 'city', name: 'New Port Richey', slug: 'new-port-richey', path: cityPath('sun-coast', 'pasco', 'New Port Richey'), county: 'Pasco County', region: 'Sun Coast' },
  { type: 'city', name: 'Dade City', slug: 'dade-city', path: cityPath('sun-coast', 'pasco', 'Dade City'), county: 'Pasco County', region: 'Sun Coast' },
  { type: 'city', name: 'Zephyrhills', slug: 'zephyrhills', path: cityPath('sun-coast', 'pasco', 'Zephyrhills'), county: 'Pasco County', region: 'Sun Coast' },
  { type: 'city', name: 'Port Richey', slug: 'port-richey', path: cityPath('sun-coast', 'pasco', 'Port Richey'), county: 'Pasco County', region: 'Sun Coast' },
  { type: 'city', name: 'Wesley Chapel', slug: 'wesley-chapel', path: cityPath('sun-coast', 'pasco', 'Wesley Chapel'), county: 'Pasco County', region: 'Sun Coast' },
  { type: 'city', name: 'Hudson', slug: 'hudson', path: cityPath('sun-coast', 'pasco', 'Hudson'), county: 'Pasco County', region: 'Sun Coast' },
  { type: 'city', name: 'Land O\' Lakes', slug: 'land-o-lakes', path: cityPath('sun-coast', 'pasco', 'Land O\' Lakes'), county: 'Pasco County', region: 'Sun Coast' },
  { type: 'city', name: 'Trinity', slug: 'trinity', path: cityPath('sun-coast', 'pasco', 'Trinity'), county: 'Pasco County', region: 'Sun Coast' },
  { type: 'city', name: 'Odessa', slug: 'odessa', path: cityPath('sun-coast', 'pasco', 'Odessa'), county: 'Pasco County', region: 'Sun Coast' },
  { type: 'city', name: 'San Antonio', slug: 'san-antonio', path: cityPath('sun-coast', 'pasco', 'San Antonio'), county: 'Pasco County', region: 'Sun Coast' },
  { type: 'city', name: 'St. Leo', slug: 'st-leo', path: cityPath('sun-coast', 'pasco', 'St. Leo'), county: 'Pasco County', region: 'Sun Coast' },

  // ===== HERNANDO COUNTY CITIES =====
  { type: 'city', name: 'Brooksville', slug: 'brooksville', path: cityPath('sun-coast', 'hernando', 'Brooksville'), county: 'Hernando County', region: 'Sun Coast' },
  { type: 'city', name: 'Spring Hill', slug: 'spring-hill', path: cityPath('sun-coast', 'hernando', 'Spring Hill'), county: 'Hernando County', region: 'Sun Coast' },
  { type: 'city', name: 'Weeki Wachee', slug: 'weeki-wachee', path: cityPath('sun-coast', 'hernando', 'Weeki Wachee'), county: 'Hernando County', region: 'Sun Coast' },
  { type: 'city', name: 'Ridge Manor', slug: 'ridge-manor', path: cityPath('sun-coast', 'hernando', 'Ridge Manor'), county: 'Hernando County', region: 'Sun Coast' },
  { type: 'city', name: 'Masaryktown', slug: 'masaryktown', path: cityPath('sun-coast', 'hernando', 'Masaryktown'), county: 'Hernando County', region: 'Sun Coast' },
  { type: 'city', name: 'Nobleton', slug: 'nobleton', path: cityPath('sun-coast', 'hernando', 'Nobleton'), county: 'Hernando County', region: 'Sun Coast' },

  // ===== ORANGE COUNTY CITIES (Central Florida) =====
  { type: 'city', name: 'Orlando', slug: 'orlando', path: cityPath('central-florida', 'orange', 'Orlando'), county: 'Orange County', region: 'Central Florida' },
  { type: 'city', name: 'Winter Park', slug: 'winter-park', path: cityPath('central-florida', 'orange', 'Winter Park'), county: 'Orange County', region: 'Central Florida' },
  { type: 'city', name: 'Apopka', slug: 'apopka', path: cityPath('central-florida', 'orange', 'Apopka'), county: 'Orange County', region: 'Central Florida' },
  { type: 'city', name: 'Windermere', slug: 'windermere', path: cityPath('central-florida', 'orange', 'Windermere'), county: 'Orange County', region: 'Central Florida' },
  { type: 'city', name: 'Ocoee', slug: 'ocoee', path: cityPath('central-florida', 'orange', 'Ocoee'), county: 'Orange County', region: 'Central Florida' },
  { type: 'city', name: 'Maitland', slug: 'maitland', path: cityPath('central-florida', 'orange', 'Maitland'), county: 'Orange County', region: 'Central Florida' },
  { type: 'city', name: 'Eatonville', slug: 'eatonville', path: cityPath('central-florida', 'orange', 'Eatonville'), county: 'Orange County', region: 'Central Florida' },
  { type: 'city', name: 'Edgewood', slug: 'edgewood', path: cityPath('central-florida', 'orange', 'Edgewood'), county: 'Orange County', region: 'Central Florida' },
  { type: 'city', name: 'Oakland', slug: 'oakland', path: cityPath('central-florida', 'orange', 'Oakland'), county: 'Orange County', region: 'Central Florida' },
  { type: 'city', name: 'Belle Isle', slug: 'belle-isle', path: cityPath('central-florida', 'orange', 'Belle Isle'), county: 'Orange County', region: 'Central Florida' },
  { type: 'city', name: 'Lake Buena Vista', slug: 'lake-buena-vista', path: cityPath('central-florida', 'orange', 'Lake Buena Vista'), county: 'Orange County', region: 'Central Florida' },
  { type: 'city', name: 'Bay Lake', slug: 'bay-lake', path: cityPath('central-florida', 'orange', 'Bay Lake'), county: 'Orange County', region: 'Central Florida' },
  { type: 'city', name: 'Downtown Orlando', slug: 'downtown-orlando', path: cityPath('central-florida', 'orange', 'Downtown Orlando'), county: 'Orange County', region: 'Central Florida' },
  { type: 'city', name: 'College Park', slug: 'college-park', path: cityPath('central-florida', 'orange', 'College Park'), county: 'Orange County', region: 'Central Florida' },
  { type: 'city', name: 'Thornton Park', slug: 'thornton-park', path: cityPath('central-florida', 'orange', 'Thornton Park'), county: 'Orange County', region: 'Central Florida' },

  // ===== SEMINOLE COUNTY CITIES =====
  { type: 'city', name: 'Sanford', slug: 'sanford', path: cityPath('central-florida', 'seminole', 'Sanford'), county: 'Seminole County', region: 'Central Florida' },
  { type: 'city', name: 'Altamonte Springs', slug: 'altamonte-springs', path: cityPath('central-florida', 'seminole', 'Altamonte Springs'), county: 'Seminole County', region: 'Central Florida' },
  { type: 'city', name: 'Oviedo', slug: 'oviedo', path: cityPath('central-florida', 'seminole', 'Oviedo'), county: 'Seminole County', region: 'Central Florida' },
  { type: 'city', name: 'Lake Mary', slug: 'lake-mary', path: cityPath('central-florida', 'seminole', 'Lake Mary'), county: 'Seminole County', region: 'Central Florida' },
  { type: 'city', name: 'Longwood', slug: 'longwood', path: cityPath('central-florida', 'seminole', 'Longwood'), county: 'Seminole County', region: 'Central Florida' },
  { type: 'city', name: 'Casselberry', slug: 'casselberry', path: cityPath('central-florida', 'seminole', 'Casselberry'), county: 'Seminole County', region: 'Central Florida' },
  { type: 'city', name: 'Winter Springs', slug: 'winter-springs', path: cityPath('central-florida', 'seminole', 'Winter Springs'), county: 'Seminole County', region: 'Central Florida' },

  // ===== OSCEOLA COUNTY CITIES =====
  { type: 'city', name: 'Kissimmee', slug: 'kissimmee', path: cityPath('central-florida', 'osceola', 'Kissimmee'), county: 'Osceola County', region: 'Central Florida' },
  { type: 'city', name: 'St. Cloud', slug: 'st-cloud', path: cityPath('central-florida', 'osceola', 'St. Cloud'), county: 'Osceola County', region: 'Central Florida' },
  { type: 'city', name: 'Celebration', slug: 'celebration', path: cityPath('central-florida', 'osceola', 'Celebration'), county: 'Osceola County', region: 'Central Florida' },
  { type: 'city', name: 'Poinciana', slug: 'poinciana', path: cityPath('central-florida', 'osceola', 'Poinciana'), county: 'Osceola County', region: 'Central Florida' },
  { type: 'city', name: 'Four Corners', slug: 'four-corners', path: cityPath('central-florida', 'osceola', 'Four Corners'), county: 'Osceola County', region: 'Central Florida' },

  // ===== POLK COUNTY CITIES =====
  { type: 'city', name: 'Lakeland', slug: 'lakeland', path: cityPath('central-florida', 'polk', 'Lakeland'), county: 'Polk County', region: 'Central Florida' },
  { type: 'city', name: 'Winter Haven', slug: 'winter-haven', path: cityPath('central-florida', 'polk', 'Winter Haven'), county: 'Polk County', region: 'Central Florida' },
  { type: 'city', name: 'Bartow', slug: 'bartow', path: cityPath('central-florida', 'polk', 'Bartow'), county: 'Polk County', region: 'Central Florida' },
  { type: 'city', name: 'Haines City', slug: 'haines-city', path: cityPath('central-florida', 'polk', 'Haines City'), county: 'Polk County', region: 'Central Florida' },
  { type: 'city', name: 'Auburndale', slug: 'auburndale', path: cityPath('central-florida', 'polk', 'Auburndale'), county: 'Polk County', region: 'Central Florida' },

  // ===== LAKE COUNTY CITIES =====
  { type: 'city', name: 'Clermont', slug: 'clermont', path: cityPath('central-florida', 'lake', 'Clermont'), county: 'Lake County', region: 'Central Florida' },
  { type: 'city', name: 'Tavares', slug: 'tavares', path: cityPath('central-florida', 'lake', 'Tavares'), county: 'Lake County', region: 'Central Florida' },
  { type: 'city', name: 'Leesburg', slug: 'leesburg', path: cityPath('central-florida', 'lake', 'Leesburg'), county: 'Lake County', region: 'Central Florida' },
  { type: 'city', name: 'Mount Dora', slug: 'mount-dora', path: cityPath('central-florida', 'lake', 'Mount Dora'), county: 'Lake County', region: 'Central Florida' },
  { type: 'city', name: 'Eustis', slug: 'eustis', path: cityPath('central-florida', 'lake', 'Eustis'), county: 'Lake County', region: 'Central Florida' },

  // ===== MIAMI-DADE COUNTY CITIES =====
  { type: 'city', name: 'Miami', slug: 'miami', path: cityPath('south-florida', 'miami-dade', 'Miami'), county: 'Miami-Dade County', region: 'South Florida' },
  { type: 'city', name: 'Miami Beach', slug: 'miami-beach', path: cityPath('south-florida', 'miami-dade', 'Miami Beach'), county: 'Miami-Dade County', region: 'South Florida' },
  { type: 'city', name: 'Coral Gables', slug: 'coral-gables', path: cityPath('south-florida', 'miami-dade', 'Coral Gables'), county: 'Miami-Dade County', region: 'South Florida' },
  { type: 'city', name: 'Homestead', slug: 'homestead', path: cityPath('south-florida', 'miami-dade', 'Homestead'), county: 'Miami-Dade County', region: 'South Florida' },
  { type: 'city', name: 'Key Biscayne', slug: 'key-biscayne', path: cityPath('south-florida', 'miami-dade', 'Key Biscayne'), county: 'Miami-Dade County', region: 'South Florida' },
  { type: 'city', name: 'Aventura', slug: 'aventura', path: cityPath('south-florida', 'miami-dade', 'Aventura'), county: 'Miami-Dade County', region: 'South Florida' },
  { type: 'city', name: 'Doral', slug: 'doral', path: cityPath('south-florida', 'miami-dade', 'Doral'), county: 'Miami-Dade County', region: 'South Florida' },
  { type: 'city', name: 'Hialeah', slug: 'hialeah', path: cityPath('south-florida', 'miami-dade', 'Hialeah'), county: 'Miami-Dade County', region: 'South Florida' },
  { type: 'city', name: 'Kendall', slug: 'kendall', path: cityPath('south-florida', 'miami-dade', 'Kendall'), county: 'Miami-Dade County', region: 'South Florida' },
  { type: 'city', name: 'Coconut Grove', slug: 'coconut-grove', path: cityPath('south-florida', 'miami-dade', 'Coconut Grove'), county: 'Miami-Dade County', region: 'South Florida' },
  { type: 'city', name: 'Brickell', slug: 'brickell', path: cityPath('south-florida', 'miami-dade', 'Brickell'), county: 'Miami-Dade County', region: 'South Florida' },
  { type: 'city', name: 'Downtown Miami', slug: 'downtown-miami', path: cityPath('south-florida', 'miami-dade', 'Downtown Miami'), county: 'Miami-Dade County', region: 'South Florida' },

  // ===== BROWARD COUNTY CITIES =====
  { type: 'city', name: 'Fort Lauderdale', slug: 'fort-lauderdale', path: cityPath('south-florida', 'broward', 'Fort Lauderdale'), county: 'Broward County', region: 'South Florida' },
  { type: 'city', name: 'Hollywood', slug: 'hollywood', path: cityPath('south-florida', 'broward', 'Hollywood'), county: 'Broward County', region: 'South Florida' },
  { type: 'city', name: 'Pompano Beach', slug: 'pompano-beach', path: cityPath('south-florida', 'broward', 'Pompano Beach'), county: 'Broward County', region: 'South Florida' },
  { type: 'city', name: 'Coral Springs', slug: 'coral-springs', path: cityPath('south-florida', 'broward', 'Coral Springs'), county: 'Broward County', region: 'South Florida' },
  { type: 'city', name: 'Plantation', slug: 'plantation', path: cityPath('south-florida', 'broward', 'Plantation'), county: 'Broward County', region: 'South Florida' },
  { type: 'city', name: 'Weston', slug: 'weston', path: cityPath('south-florida', 'broward', 'Weston'), county: 'Broward County', region: 'South Florida' },
  { type: 'city', name: 'Davie', slug: 'davie', path: cityPath('south-florida', 'broward', 'Davie'), county: 'Broward County', region: 'South Florida' },
  { type: 'city', name: 'Sunrise', slug: 'sunrise', path: cityPath('south-florida', 'broward', 'Sunrise'), county: 'Broward County', region: 'South Florida' },
  { type: 'city', name: 'Tamarac', slug: 'tamarac', path: cityPath('south-florida', 'broward', 'Tamarac'), county: 'Broward County', region: 'South Florida' },
  { type: 'city', name: 'Lauderdale Lakes', slug: 'lauderdale-lakes', path: cityPath('south-florida', 'broward', 'Lauderdale Lakes'), county: 'Broward County', region: 'South Florida' },

  // ===== LEE COUNTY CITIES =====
  { type: 'city', name: 'Fort Myers', slug: 'fort-myers', path: cityPath('southwest-florida', 'lee', 'Fort Myers'), county: 'Lee County', region: 'Southwest Florida' },
  { type: 'city', name: 'Cape Coral', slug: 'cape-coral', path: cityPath('southwest-florida', 'lee', 'Cape Coral'), county: 'Lee County', region: 'Southwest Florida' },
  { type: 'city', name: 'Sanibel Island', slug: 'sanibel-island', path: cityPath('southwest-florida', 'lee', 'Sanibel Island'), county: 'Lee County', region: 'Southwest Florida' },
  { type: 'city', name: 'Bonita Springs', slug: 'bonita-springs', path: cityPath('southwest-florida', 'lee', 'Bonita Springs'), county: 'Lee County', region: 'Southwest Florida' },
  { type: 'city', name: 'Estero', slug: 'estero', path: cityPath('southwest-florida', 'lee', 'Estero'), county: 'Lee County', region: 'Southwest Florida' },
  { type: 'city', name: 'Lehigh Acres', slug: 'lehigh-acres', path: cityPath('southwest-florida', 'lee', 'Lehigh Acres'), county: 'Lee County', region: 'Southwest Florida' },
  { type: 'city', name: 'North Fort Myers', slug: 'north-fort-myers', path: cityPath('southwest-florida', 'lee', 'North Fort Myers'), county: 'Lee County', region: 'Southwest Florida' },

  // ===== COLLIER COUNTY CITIES =====
  { type: 'city', name: 'Naples', slug: 'naples', path: cityPath('southwest-florida', 'collier', 'Naples'), county: 'Collier County', region: 'Southwest Florida' },
  { type: 'city', name: 'Marco Island', slug: 'marco-island', path: cityPath('southwest-florida', 'collier', 'Marco Island'), county: 'Collier County', region: 'Southwest Florida' },
  { type: 'city', name: 'Immokalee', slug: 'immokalee', path: cityPath('southwest-florida', 'collier', 'Immokalee'), county: 'Collier County', region: 'Southwest Florida' },
  { type: 'city', name: 'Everglades City', slug: 'everglades-city', path: cityPath('southwest-florida', 'collier', 'Everglades City'), county: 'Collier County', region: 'Southwest Florida' },
  { type: 'city', name: 'Golden Gate', slug: 'golden-gate', path: cityPath('southwest-florida', 'collier', 'Golden Gate'), county: 'Collier County', region: 'Southwest Florida' },

  // ===== SARASOTA COUNTY CITIES =====
  { type: 'city', name: 'Sarasota', slug: 'sarasota', path: cityPath('southwest-florida', 'sarasota', 'Sarasota'), county: 'Sarasota County', region: 'Southwest Florida' },
  { type: 'city', name: 'Venice', slug: 'venice', path: cityPath('southwest-florida', 'sarasota', 'Venice'), county: 'Sarasota County', region: 'Southwest Florida' },
  { type: 'city', name: 'North Port', slug: 'north-port', path: cityPath('southwest-florida', 'sarasota', 'North Port'), county: 'Sarasota County', region: 'Southwest Florida' },
  { type: 'city', name: 'Longboat Key', slug: 'longboat-key', path: cityPath('southwest-florida', 'sarasota', 'Longboat Key'), county: 'Sarasota County', region: 'Southwest Florida' },
  { type: 'city', name: 'Siesta Key', slug: 'siesta-key', path: cityPath('southwest-florida', 'sarasota', 'Siesta Key'), county: 'Sarasota County', region: 'Southwest Florida' },

  // ===== DUVAL COUNTY CITIES (North Florida) =====
  { type: 'city', name: 'Jacksonville', slug: 'jacksonville', path: cityPath('north-florida', 'duval', 'Jacksonville'), county: 'Duval County', region: 'North Florida' },
  { type: 'city', name: 'Jacksonville Beach', slug: 'jacksonville-beach', path: cityPath('north-florida', 'duval', 'Jacksonville Beach'), county: 'Duval County', region: 'North Florida' },
  { type: 'city', name: 'Atlantic Beach', slug: 'atlantic-beach', path: cityPath('north-florida', 'duval', 'Atlantic Beach'), county: 'Duval County', region: 'North Florida' },
  { type: 'city', name: 'Neptune Beach', slug: 'neptune-beach', path: cityPath('north-florida', 'duval', 'Neptune Beach'), county: 'Duval County', region: 'North Florida' },
  { type: 'city', name: 'Orange Park', slug: 'orange-park', path: cityPath('north-florida', 'duval', 'Orange Park'), county: 'Duval County', region: 'North Florida' },

  // ===== ST. JOHNS COUNTY CITIES =====
  { type: 'city', name: 'St. Augustine', slug: 'st-augustine', path: cityPath('north-florida', 'st-johns', 'St. Augustine'), county: 'St. Johns County', region: 'North Florida' },
  { type: 'city', name: 'Ponte Vedra Beach', slug: 'ponte-vedra-beach', path: cityPath('north-florida', 'st-johns', 'Ponte Vedra Beach'), county: 'St. Johns County', region: 'North Florida' },
  { type: 'city', name: 'Vilano Beach', slug: 'vilano-beach', path: cityPath('north-florida', 'st-johns', 'Vilano Beach'), county: 'St. Johns County', region: 'North Florida' },
  { type: 'city', name: 'Crescent Beach', slug: 'crescent-beach', path: cityPath('north-florida', 'st-johns', 'Crescent Beach'), county: 'St. Johns County', region: 'North Florida' },
  { type: 'city', name: 'Hastings', slug: 'hastings', path: cityPath('north-florida', 'st-johns', 'Hastings'), county: 'St. Johns County', region: 'North Florida' },

  // ===== ALACHUA COUNTY CITIES (North Florida) =====
  { type: 'city', name: 'Gainesville', slug: 'gainesville', path: cityPath('north-florida', 'alachua', 'Gainesville'), county: 'Alachua County', region: 'North Florida' },

  // ===== ESCAMBIA COUNTY CITIES (Panhandle) =====
  { type: 'city', name: 'Pensacola', slug: 'pensacola', path: cityPath('florida-panhandle', 'escambia', 'Pensacola'), county: 'Escambia County', region: 'Florida Panhandle' },
  { type: 'city', name: 'Pensacola Beach', slug: 'pensacola-beach', path: cityPath('florida-panhandle', 'escambia', 'Pensacola Beach'), county: 'Escambia County', region: 'Florida Panhandle' },
  { type: 'city', name: 'Gulf Breeze', slug: 'gulf-breeze', path: cityPath('florida-panhandle', 'escambia', 'Gulf Breeze'), county: 'Escambia County', region: 'Florida Panhandle' },
  { type: 'city', name: 'Perdido Key', slug: 'perdido-key', path: cityPath('florida-panhandle', 'escambia', 'Perdido Key'), county: 'Escambia County', region: 'Florida Panhandle' },

  // ===== LEON COUNTY CITIES =====
  { type: 'city', name: 'Tallahassee', slug: 'tallahassee', path: cityPath('florida-panhandle', 'leon', 'Tallahassee'), county: 'Leon County', region: 'Florida Panhandle' },

  // Add more cities as needed...
];
















