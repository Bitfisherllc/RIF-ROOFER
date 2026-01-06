import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapLocationDot,
  faUsers,
  faCertificate,
  faBoxes,
  faDollarSign,
  faArrowLeft,
  faUmbrellaBeach,
  faTree,
  faLandmark,
  faFish,
  faMountain,
  faWater,
} from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';
import { getCityData, createCitySlug } from '../../../data/cities';
import LocationFavoriteButton from '@/components/LocationFavoriteButton';
import RooferList from '@/components/RooferList';

// Helper to get county name from slug
function getCountyNameFromSlug(countySlug: string): string {
  const nameMap: Record<string, string> = {
    'hillsborough': 'Hillsborough County',
    'pinellas': 'Pinellas County',
    'pasco': 'Pasco County',
    'hernando': 'Hernando County',
    'indian-river': 'Indian River County',
    'st-lucie': 'St. Lucie County',
    'martin': 'Martin County',
    'palm-beach': 'Palm Beach County',
    'sarasota': 'Sarasota County',
    'charlotte': 'Charlotte County',
    'lee': 'Lee County',
    'collier': 'Collier County',
    'miami-dade': 'Miami-Dade County',
    'broward': 'Broward County',
    'palm-beach-south': 'Palm Beach County',
    'monroe': 'Monroe County',
    'duval': 'Duval County',
    'st-johns': 'St. Johns County',
    'alachua': 'Alachua County',
    'clay': 'Clay County',
    'escambia': 'Escambia County',
    'santa-rosa': 'Santa Rosa County',
    'okaloosa': 'Okaloosa County',
    'bay': 'Bay County',
    'leon': 'Leon County',
    'duval-fc': 'Duval County',
    'st-johns-fc': 'St. Johns County',
    'nassau': 'Nassau County',
    'clay-fc': 'Clay County',
    'orange': 'Orange County',
    'seminole': 'Seminole County',
    'osceola': 'Osceola County',
    'polk': 'Polk County',
    'lake': 'Lake County',
  };
  return nameMap[countySlug] || countySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' County';
}

// Helper to get region name from slug
function getRegionNameFromSlug(regionSlug: string): string {
  const nameMap: Record<string, string> = {
    'sun-coast': 'Sun Coast',
    'treasure-coast': 'Treasure Coast',
    'southwest-florida': 'Southwest Florida',
    'south-florida': 'South Florida',
    'north-florida': 'North Florida',
    'florida-panhandle': 'Florida Panhandle',
    'first-coast': 'First Coast',
    'central-florida': 'Central Florida',
  };
  return nameMap[regionSlug] || regionSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// City information database with landmarks, recreation, and local info
function getCityLocalInfo(cityName: string, countyName: string, regionSlug: string) {
  const cityLower = cityName.toLowerCase();
  const info: {
    landmarks: string[];
    recreation: string[];
    about: string;
    neighborhoods?: string[];
  } = {
    landmarks: [],
    recreation: [],
    about: '',
    neighborhoods: [],
  };

  // Brooksville, Hernando County
  if (cityLower.includes('brooksville')) {
    info.landmarks = ['Brooksville Historic District', 'Hernando Heritage Museum', 'Chinsegut Hill Manor'];
    info.recreation = ['Withlacoochee State Forest', 'Weeki Wachee Springs State Park', 'hiking trails', 'fishing'];
    info.about = `Brooksville, the county seat of Hernando County, offers a blend of historic charm and natural beauty. The city's historic downtown district features well-preserved architecture, while nearby natural areas like Withlacoochee State Forest provide outdoor recreation opportunities. Homeowners in Brooksville need roofing systems that can handle both the area's humidity and occasional storm impacts.`;
    info.neighborhoods = ['Historic Downtown', 'Spring Hill area', 'rural properties'];
  }
  // Tampa, Hillsborough County
  else if (cityLower.includes('tampa')) {
    info.landmarks = ['Tampa Riverwalk', 'Ybor City Historic District', 'Tampa Bay History Center', 'Amalie Arena'];
    info.recreation = ['Bayshore Boulevard', 'Tampa Bay', 'waterfront parks', 'professional sports'];
    info.about = `Tampa, Florida's third-largest city, combines urban energy with waterfront living along Tampa Bay. The city's vibrant downtown, historic Ybor City district, and extensive waterfront parks make it a popular destination. Tampa homeowners need roofing that can handle both urban heat island effects and coastal humidity.`;
    info.neighborhoods = ['Downtown Tampa', 'Ybor City', 'Hyde Park', 'South Tampa', 'Westshore'];
  }
  // Miami, Miami-Dade County
  else if (cityLower.includes('miami')) {
    info.landmarks = ['Art Deco Historic District', 'Vizcaya Museum', 'Little Havana', 'Brickell Financial District'];
    info.recreation = ['South Beach', 'Biscayne Bay', 'Everglades National Park', 'waterfront activities'];
    info.about = `Miami is a vibrant international city known for its beaches, nightlife, and cultural diversity. From the Art Deco architecture of South Beach to the financial district of Brickell, Miami's diverse neighborhoods each have unique character. The city's tropical climate and coastal location demand roofing systems rated for hurricane-force winds and salt air.`;
    info.neighborhoods = ['South Beach', 'Brickell', 'Coral Gables', 'Little Havana', 'Wynwood'];
  }
  // Orlando, Orange County
  else if (cityLower.includes('orlando')) {
    info.landmarks = ['Walt Disney World', 'Universal Studios', 'Lake Eola Park', 'Downtown Orlando'];
    info.recreation = ['theme parks', 'Lake Eola', 'bike trails', 'golf courses'];
    info.about = `Orlando, known as the Theme Park Capital of the World, attracts millions of visitors annually. Beyond the theme parks, the city offers a growing downtown, beautiful lakes, and a thriving arts scene. Orlando's inland location means roofs face intense summer heat, frequent thunderstorms, and occasional hurricane impacts.`;
    info.neighborhoods = ['Downtown Orlando', 'Winter Park', 'Dr. Phillips', 'Lake Nona', 'Windermere'];
  }
  // Jacksonville, Duval County
  else if (cityLower.includes('jacksonville')) {
    info.landmarks = ['Jacksonville Landing', 'Cummer Museum', 'Riverside Historic District', 'St. Johns River'];
    info.recreation = ['Jacksonville Beach', 'Timucuan Preserve', 'St. Johns River', 'golf courses'];
    info.about = `Jacksonville, Florida's largest city by area, spans from the Atlantic coast to the St. Johns River. The city's extensive riverfront, beaches, and historic neighborhoods offer diverse living options. Jacksonville's coastal location means roofs must handle both salt air and intense summer heat.`;
    info.neighborhoods = ['Riverside', 'Avondale', 'San Marco', 'Beaches', 'Southside'];
  }
  // St. Petersburg, Pinellas County
  else if (cityLower.includes('st. petersburg') || cityLower.includes('st petersburg')) {
    info.landmarks = ['The Pier', 'Dali Museum', 'Sunken Gardens', 'Historic Old Northeast'];
    info.recreation = ['Gulf beaches', 'Fort De Soto Park', 'waterfront parks', 'museums'];
    info.about = `St. Petersburg, known as the Sunshine City, offers beautiful Gulf Coast beaches, a vibrant downtown arts district, and historic neighborhoods. The city's waterfront location and year-round warm weather make it a popular destination. St. Petersburg roofs face constant Gulf salt air and tropical weather patterns.`;
    info.neighborhoods = ['Old Northeast', 'Historic Kenwood', 'Downtown', 'Snell Isle', 'Shore Acres'];
  }
  // Fort Lauderdale, Broward County
  else if (cityLower.includes('fort lauderdale') || cityLower.includes('lauderdale')) {
    info.landmarks = ['Las Olas Boulevard', 'Fort Lauderdale Beach', 'Bonnet House', 'Historic Stranahan House'];
    info.recreation = ['beaches', 'Intracoastal Waterway', 'Everglades', 'boating'];
    info.about = `Fort Lauderdale, known as the Venice of America, features an extensive canal system and beautiful Atlantic beaches. The city's waterfront lifestyle, upscale shopping on Las Olas, and proximity to the Everglades make it unique. Fort Lauderdale roofs must handle Atlantic salt air, intense sun, and hurricane conditions.`;
    info.neighborhoods = ['Las Olas', 'Victoria Park', 'Coral Ridge', 'Rio Vista', 'Downtown'];
  }
  // Naples, Collier County
  else if (cityLower.includes('naples')) {
    info.landmarks = ['Naples Pier', 'Fifth Avenue South', 'Historic Palm Cottage', 'Naples Botanical Garden'];
    info.recreation = ['Gulf beaches', 'golf courses', 'Everglades', 'fishing'];
    info.about = `Naples, an upscale coastal city on the Gulf of Mexico, is known for its pristine beaches, world-class golf courses, and sophisticated dining. The city's luxury properties and coastal location demand premium roofing materials. Naples roofs face Gulf salt air, intense UV radiation, and hurricane-force winds.`;
    info.neighborhoods = ['Old Naples', 'Aqualane Shores', 'Port Royal', 'Pelican Bay', 'Moorings'];
  }
  // Sarasota, Sarasota County
  else if (cityLower.includes('sarasota')) {
    info.landmarks = ['Ringling Museum', 'Siesta Key Beach', 'Marie Selby Botanical Gardens', 'Historic Burns Court'];
    info.recreation = ['Gulf beaches', 'cultural arts', 'golf courses', 'fishing'];
    info.about = `Sarasota, known for its cultural arts scene and beautiful beaches, offers a sophisticated lifestyle along the Gulf Coast. The city's historic architecture, world-class museums, and pristine beaches attract residents and visitors. Sarasota roofs must handle Gulf salt air and tropical weather.`;
    info.neighborhoods = ['Downtown Sarasota', 'Siesta Key', 'Longboat Key', 'Lido Key', 'Gulf Gate'];
  }
  // Clearwater, Pinellas County
  else if (cityLower.includes('clearwater')) {
    info.landmarks = ['Clearwater Beach', 'Pier 60', 'Clearwater Marine Aquarium', 'Caladesi Island'];
    info.recreation = ['beaches', 'fishing', 'water sports', 'parks'];
    info.about = `Clearwater, home to one of America's best beaches, offers pristine Gulf Coast living. The city's beautiful beaches, waterfront parks, and family-friendly atmosphere make it popular. Clearwater roofs face constant Gulf exposure and tropical weather.`;
    info.neighborhoods = ['Clearwater Beach', 'Island Estates', 'Countryside', 'Belleair', 'Sand Key'];
  }
  // West Palm Beach, Palm Beach County
  else if (cityLower.includes('west palm beach')) {
    info.landmarks = ['Palm Beach', 'Norton Museum', 'Clematis Street', 'Flagler Museum'];
    info.recreation = ['Atlantic beaches', 'golf courses', 'waterfront parks', 'cultural events'];
    info.about = `West Palm Beach, the county seat of Palm Beach County, offers a vibrant downtown and proximity to the upscale island of Palm Beach. The city's waterfront location, cultural attractions, and year-round warm weather make it attractive. West Palm Beach roofs face Atlantic salt air and intense sun.`;
    info.neighborhoods = ['Downtown', 'El Cid', 'Grandview Heights', 'Northwood', 'South End'];
  }
  // Key West, Monroe County
  else if (cityLower.includes('key west')) {
    info.landmarks = ['Duval Street', 'Ernest Hemingway Home', 'Southernmost Point', 'Mallory Square'];
    info.recreation = ['fishing', 'diving', 'water sports', 'sunset celebrations'];
    info.about = `Key West, the southernmost city in the continental United States, offers a unique island lifestyle with historic architecture and vibrant culture. The city's tropical location and ocean exposure demand roofing systems rated for extreme conditions. Key West roofs face constant salt air, intense UV, and hurricane-force winds.`;
    info.neighborhoods = ['Old Town', 'New Town', 'Truman Annex', 'Bahama Village'];
  }
  // Tallahassee, Leon County
  else if (cityLower.includes('tallahassee')) {
    info.landmarks = ['Florida State Capitol', 'Florida State University', 'Tallahassee Museum', 'Cascades Park'];
    info.recreation = ['parks', 'hiking trails', 'college sports', 'cultural events'];
    info.about = `Tallahassee, Florida's state capital, blends government, education, and natural beauty. The city's rolling hills, historic architecture, and college town atmosphere create a unique character. Tallahassee's inland location means roofs face intense summer heat and frequent thunderstorms.`;
    info.neighborhoods = ['Midtown', 'Downtown', 'Southwood', 'Killearn', 'Betton Hills'];
  }
  // Gainesville, Alachua County
  else if (cityLower.includes('gainesville')) {
    info.landmarks = ['University of Florida', 'Florida Museum of Natural History', 'Kanapaha Botanical Gardens', 'Devil\'s Millhopper'];
    info.recreation = ['nature trails', 'springs', 'college sports', 'parks'];
    info.about = `Gainesville, home to the University of Florida, offers a college town atmosphere with natural springs and parks nearby. The city's mix of students, professionals, and retirees creates a diverse community. Gainesville roofs face intense summer heat, humidity, and frequent thunderstorms.`;
    info.neighborhoods = ['Duckpond', 'Haile Plantation', 'Hammock Ridge', 'University area'];
  }
  // Pensacola, Escambia County
  else if (cityLower.includes('pensacola')) {
    info.landmarks = ['Historic Pensacola Village', 'Pensacola Beach', 'Naval Air Station', 'Seville Square'];
    info.recreation = ['Gulf beaches', 'fishing', 'historic sites', 'water sports'];
    info.about = `Pensacola, located on the Florida Panhandle, offers beautiful Gulf beaches and rich military history. The city's historic downtown, waterfront location, and proximity to pristine beaches make it attractive. Pensacola roofs face Gulf salt air and direct hurricane exposure.`;
    info.neighborhoods = ['Historic Downtown', 'East Hill', 'Cordova Park', 'Scenic Heights'];
  }
  // Default for other cities
  else {
    const isCoastal = regionSlug.includes('coast') || regionSlug.includes('south') || regionSlug.includes('panhandle');
    info.landmarks = ['local parks', 'community centers', 'historic downtown'];
    info.recreation = isCoastal ? ['beaches', 'fishing', 'water activities'] : ['parks', 'nature trails', 'community events'];
    info.about = `${cityName}, located in ${countyName}, offers a ${isCoastal ? 'coastal' : 'community'} lifestyle with ${isCoastal ? 'access to beaches and water activities' : 'parks and local amenities'}. Homeowners in ${cityName} need roofing systems that can handle Florida's climate challenges.`;
    info.neighborhoods = ['residential neighborhoods', 'downtown area', 'suburban communities'];
  }

  return info;
}

// Helper function to generate city data dynamically if not in cities.ts
function generateCityData(
  regionSlug: string,
  countySlug: string,
  citySlug: string
) {
  const countyName = getCountyNameFromSlug(countySlug);
  const regionName = getRegionNameFromSlug(regionSlug);
  
  // Convert slug back to display name
  const cityName = citySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Determine if coastal
  const isCoastal = ['pinellas', 'hillsborough', 'hernando', 'pasco'].includes(countySlug) ||
                    ['sarasota', 'charlotte', 'lee', 'collier'].includes(countySlug) ||
                    ['miami-dade', 'broward', 'palm-beach-south', 'monroe'].includes(countySlug) ||
                    ['duval', 'st-johns', 'nassau', 'duval-fc', 'st-johns-fc'].includes(countySlug) ||
                    ['escambia', 'santa-rosa', 'okaloosa', 'bay'].includes(countySlug) ||
                    ['indian-river', 'st-lucie', 'martin', 'palm-beach'].includes(countySlug);

  const waterBody = regionSlug.includes('panhandle') || regionSlug.includes('first-coast') 
    ? 'Atlantic' 
    : regionSlug.includes('southwest') || regionSlug.includes('sun-coast') 
    ? 'Gulf Coast' 
    : 'coastal';

  const baseChallenges = isCoastal
    ? `${cityName} roofs face ${waterBody} salt air and intense summer heat. Summer storms bring heavy rain. Hurricane season requires wind-rated systems. Coastal humidity promotes moisture issues.`
    : `${cityName} roofs face intense summer heat and humidity. Frequent thunderstorms bring heavy rain. Hurricane season requires wind-rated systems. Heat buildup increases cooling demands.`;

  const baseWhy = isCoastal
    ? `Stone-coated metal roofing excels in ${cityName}. The system resists salt air and UV damage. Wind resistance protects against hurricane impacts. Energy efficiency reduces cooling costs. Durability suits both coastal and inland properties.`
    : `Stone-coated metal roofing works well in ${cityName}. The system handles humidity and storm impacts. Wind resistance protects against occasional severe weather. Energy efficiency helps with cooling costs. Durability suits varied property types.`;

  const type = cityName.toLowerCase().includes('beach') || cityName.toLowerCase().includes('island') 
    ? 'city' as const
    : cityName.toLowerCase().includes('park') || cityName.toLowerCase().includes('heights') 
    ? 'community' as const
    : cityName.toLowerCase().includes('downtown') || cityName.toLowerCase().includes('district') 
    ? 'district' as const
    : cityName.toLowerCase().includes('south') || cityName.toLowerCase().includes('north') || 
      cityName.toLowerCase().includes('east') || cityName.toLowerCase().includes('west') 
    ? 'neighborhood' as const
    : 'city' as const;

  return {
    name: cityName,
    displayName: cityName,
    countyName: countyName,
    countySlug: countySlug,
    regionName: regionName,
    regionSlug: regionSlug,
    h1Title: `Roofers in ${cityName}, Florida`,
    intro: `${cityName}, located in ${countyName}, ${isCoastal ? 'faces coastal weather that demands durable roofing' : 'blends community living with Florida weather patterns'}. RIF roofers install systems built for ${isCoastal ? 'salt air, tropical humidity, and hurricane conditions' : 'heat, humidity, and frequent thunderstorms'}. All work is backed by distributor-level pricing through PRP Roofing.`,
    challenges: baseChallenges,
    whyStoneCoated: baseWhy,
    type: type,
  };
}

export async function generateMetadata({
  params,
}: {
  params: { region: string; county: string; city: string };
}): Promise<Metadata> {
  let city = getCityData(params.region, params.county, params.city);
  
  if (!city) {
    city = generateCityData(params.region, params.county, params.city);
  }
  
  if (!city) {
    return {
      title: 'City Not Found | RIF',
    };
  }

  // Enhanced SEO description with natural keyword usage
  const seoDescription = `Find certified roofers in ${city.displayName}, ${city.countyName}, Florida. Our network of RIF certified installers serves ${city.displayName} with stone-coated metal roofing systems designed for Florida's climate. Licensed, insured, and manufacturer-trained.`;

  return {
    title: `Certified Roofers in ${city.displayName}, ${city.countyName} | RIF Roofing`,
    description: seoDescription,
    keywords: [
      `roofers in ${city.displayName}`,
      `roofing contractors ${city.displayName}`,
      `stone coated metal roofing ${city.displayName}`,
      `${city.displayName} roofers`,
      `certified roofers ${city.displayName}`,
      `roof replacement ${city.displayName}`,
      `roofers ${city.countyName}`,
    ].join(', '),
  };
}

export default function CityPage({
  params,
}: {
  params: { region: string; county: string; city: string };
}) {
  let city = getCityData(params.region, params.county, params.city);
  
  if (!city) {
    city = generateCityData(params.region, params.county, params.city);
  }

  if (!city) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-rif-black mb-4">
            City Not Found
          </h1>
          <Link
            href={`/service-areas/${params.region}/${params.county}`}
            className="text-rif-blue-500 hover:text-rif-blue-600"
          >
            ← Back to {getCountyNameFromSlug(params.county)}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <Link
              href={`/service-areas/${city.regionSlug}/${city.countySlug}`}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-rif-blue-500 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
              Back to {city.countyName}
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href={`/service-areas/${city.regionSlug}`}
              className="text-sm text-gray-600 hover:text-rif-blue-500 transition-colors"
            >
              {city.regionName}
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/service-areas"
              className="text-sm text-gray-600 hover:text-rif-blue-500 transition-colors"
            >
              All Service Areas
            </Link>
          </div>
          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black tracking-tight flex-1">
              {city.h1Title}
            </h1>
            <LocationFavoriteButton
              locationType="city"
              name={city.displayName}
              slug={params.city}
              path={`/service-areas/${params.region}/${params.county}/${params.city}`}
              county={city.countyName}
              region={city.regionName}
              size="lg"
            />
          </div>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {city.intro}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/roofers/map?county=${params.county}&city=${params.city}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors text-sm font-medium"
            >
              <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4" />
              Show on Map
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* About the City - Mixed with Roofer Info */}
          {(() => {
            const localInfo = getCityLocalInfo(city.displayName, city.countyName, city.regionSlug);
            return (
              <div className="bg-white p-8 rounded-2xl border border-gray-200">
                <h2 className="flex items-center gap-3 text-3xl font-semibold text-rif-black mb-4">
                  <FontAwesomeIcon icon={faLandmark} className="h-7 w-7 text-rif-blue-500" />
                  About {city.displayName} and Finding Roofers
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  {localInfo.about}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  When homeowners in {city.displayName} need roofing services, they turn to certified roofers who understand the local climate and building requirements. Our network of RIF certified roofers serves {city.displayName} and surrounding areas in {city.countyName}, providing manufacturer-trained expertise for residential and commercial roofing projects.
                </p>
                
                {localInfo.landmarks.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-rif-black mb-3 flex items-center gap-2">
                      <FontAwesomeIcon icon={faLandmark} className="h-5 w-5 text-rif-blue-500" />
                      Local Landmarks and Attractions
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-3">
                      {city.displayName} is home to notable landmarks including {localInfo.landmarks.slice(0, 3).join(', ')}, and {localInfo.landmarks.length > 3 ? `more attractions that make ${city.displayName} a special place to live` : 'other attractions'}. Properties throughout these areas, from historic districts to newer developments, benefit from durable roofing systems installed by certified roofers in {city.displayName}.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      {localInfo.landmarks.map((landmark, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <FontAwesomeIcon icon={faLandmark} className="h-4 w-4 text-rif-blue-500 mt-1 flex-shrink-0" />
                          <span>{landmark}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {localInfo.recreation.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-rif-black mb-3 flex items-center gap-2">
                      <FontAwesomeIcon icon={faUmbrellaBeach} className="h-5 w-5 text-rif-blue-500" />
                      Recreation and Outdoor Activities
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-3">
                      Residents and visitors enjoy {localInfo.recreation.slice(0, 3).join(', ')}, and {localInfo.recreation.length > 3 ? `more outdoor activities in and around ${city.displayName}` : 'other recreational opportunities'}. Whether you own a home near the waterfront, in a residential neighborhood, or in a historic district, working with experienced roofers in {city.displayName} ensures your property is protected with quality roofing systems.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      {localInfo.recreation.map((activity, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <FontAwesomeIcon 
                            icon={
                              activity.includes('beach') || activity.includes('water') ? faUmbrellaBeach :
                              activity.includes('park') || activity.includes('trail') ? faTree :
                              activity.includes('fish') ? faFish :
                              faMapLocationDot
                            } 
                            className="h-4 w-4 text-rif-blue-500 mt-1 flex-shrink-0" 
                          />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Finding Roofers in City */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200">
            <h2 className="flex items-center gap-3 text-3xl font-semibold text-rif-black mb-4">
              <FontAwesomeIcon icon={faUsers} className="h-7 w-7 text-rif-blue-500" />
              Finding Certified Roofers in {city.displayName}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              When searching for roofers in {city.displayName}, {city.countyName}, homeowners need contractors who understand both the local climate challenges and the specific requirements of properties in this area. Our network of RIF certified roofers serves {city.displayName} with manufacturer-trained expertise in stone-coated metal roofing systems.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Whether you're looking for roofers in {city.displayName} for a new construction project, roof replacement, or storm damage repair, our certified installers bring the same commitment to quality workmanship and code compliance. Each roofer serving {city.displayName} is licensed, insured, and trained on specific product systems designed for Florida's climate.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Properties throughout {city.displayName}, from historic homes to modern developments, benefit from working with certified roofers who understand local building codes, permit requirements, and the unique challenges of roofing in {city.countyName}. Our {city.displayName} roofers work directly with homeowners and property managers to deliver durable, energy-efficient roofing solutions.
            </p>
          </div>

          {/* Roofing Challenges */}
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-semibold text-rif-black mb-4">
              <FontAwesomeIcon icon={faCertificate} className="h-7 w-7 text-rif-blue-500" />
              Roofing Challenges in {city.displayName}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {city.challenges}
            </p>
          </div>

          {/* Why Stone-Coated Metal */}
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-semibold text-rif-black mb-4">
              <FontAwesomeIcon icon={faBoxes} className="h-7 w-7 text-rif-blue-500" />
              Why Stone-Coated Metal Roofing Works in {city.displayName}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {city.whyStoneCoated}
            </p>
          </div>

          {/* Common Roofing Projects */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200">
            <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-4">
              <FontAwesomeIcon icon={faCertificate} className="h-6 w-6 text-rif-blue-500" />
              Common Roofing Projects in {city.displayName}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Homeowners and businesses throughout {city.displayName} trust our certified roofers for various roofing projects. Whether you're in the historic downtown area, residential neighborhoods, or newer developments, our {city.displayName} roofers handle:
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-rif-blue-500 mt-1">•</span>
                <span><strong>Complete roof replacement:</strong> Full roof replacement projects for homes and commercial buildings in {city.displayName}, using stone-coated metal roofing systems designed for Florida's climate.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rif-blue-500 mt-1">•</span>
                <span><strong>Storm damage repair:</strong> Hurricane and storm damage repairs throughout {city.displayName}, with certified roofers who understand insurance claim processes and local building requirements.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rif-blue-500 mt-1">•</span>
                <span><strong>New construction roofing:</strong> New home and commercial building roofing installations in {city.displayName}, ensuring proper installation from day one with manufacturer specifications.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rif-blue-500 mt-1">•</span>
                <span><strong>Roof inspections:</strong> Professional roof inspections to assess condition, identify potential issues, and recommend maintenance or replacement options for {city.displayName} properties.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rif-blue-500 mt-1">•</span>
                <span><strong>Energy-efficient upgrades:</strong> Roofing upgrades that improve energy efficiency, helping {city.displayName} homeowners reduce cooling costs during hot Florida summers.</span>
              </li>
            </ul>
          </div>

          {/* Distributor Pricing */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200">
            <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-4">
              <FontAwesomeIcon icon={faDollarSign} className="h-6 w-6 text-rif-blue-500" />
              Installer-Direct Distributor Pricing
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              RIF is the installation division of{' '}
              <strong>Premium Roofing Products (PRP Roofing)</strong>. We
              provide <strong>installer-direct, distributor-level pricing</strong>{' '}
              on all materials. We stage materials from our{' '}
              <strong>Florida warehouse</strong> in Webster, ensuring jobs start
              on time with in-stock inventory. Because we're part of the
              distribution network, you get wholesale pricing without the
              middleman markup.
            </p>
            <p className="text-base text-gray-600">
              <strong>Warehouse:</strong> 8037 Treiman Blvd, Webster, FL 33597
            </p>
          </div>

          {/* Neighborhoods and Areas Served */}
          {(() => {
            const localInfo = getCityLocalInfo(city.displayName, city.countyName, city.regionSlug);
            if (localInfo.neighborhoods && localInfo.neighborhoods.length > 0) {
              return (
                <div className="bg-white p-8 rounded-2xl border border-gray-200">
                  <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-4">
                    <FontAwesomeIcon icon={faMapLocationDot} className="h-6 w-6 text-rif-blue-500" />
                      Areas We Serve in {city.displayName}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Our certified roofers provide roofing services throughout {city.displayName}, serving homeowners and businesses in various neighborhoods and districts. Whether you're searching for roofers in {localInfo.neighborhoods[0] || 'downtown'}, {localInfo.neighborhoods[1] || 'residential areas'}, or any other area of {city.displayName}, our network of certified contractors is ready to help with your roofing needs.
                  </p>
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-rif-black mb-3">Service Areas in {city.displayName}:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {localInfo.neighborhoods.map((neighborhood, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-700">
                          <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 text-rif-blue-500" />
                          <span>Roofers serving {neighborhood}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })()}

          {/* Roofers Section */}
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-semibold text-rif-black mb-6">
              <FontAwesomeIcon icon={faUsers} className="h-7 w-7 text-rif-blue-500" />
              Certified Roofers in {city.displayName}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              When you need roofers in {city.displayName}, {city.countyName}, our network of RIF Certified Installers provides manufacturer-trained expertise backed by distributor-level pricing. Each roofer serving {city.displayName} is vetted for quality workmanship, proper licensing, and adherence to Florida building codes.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our {city.displayName} roofers specialize in stone-coated metal roofing systems that are specifically designed for Florida's climate challenges. Whether you're in the historic district, waterfront properties, or residential neighborhoods, these certified contractors bring the same commitment to quality installation and customer service to every project in {city.displayName}.
            </p>
            <RooferList
              regionSlug={city.regionSlug}
              countySlug={city.countySlug}
              citySlug={params.city}
              locationName={city.displayName}
            />
          </div>
        </div>
      </section>
    </div>
  );
}









