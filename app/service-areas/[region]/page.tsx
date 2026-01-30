import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapLocationDot,
  faUsers,
  faCertificate,
  faBoxes,
  faDollarSign,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';
import { searchData } from '../data/search-data';
import LocationFavoriteButton from '@/components/LocationFavoriteButton';
import RooferList from '@/components/RooferList';
import { getRoofersByServiceArea, getAllRoofers } from '@/app/roofers/data/roofers';

// Helper function to count roofers who specifically serve a county (not just region-level)
function getCountyRooferCount(regionSlug: string, countySlug: string): number {
  const allRoofers = getAllRoofers();
  return allRoofers.filter(roofer => {
    const { serviceAreas } = roofer;
    // Only count roofers who explicitly serve this county
    // Don't include region-only roofers for county counts
    return serviceAreas.counties?.includes(countySlug);
  }).length;
}

// Helper to get cities for a specific county
function getCitiesForCounty(countyName: string, regionSlug: string): string[] {
  // Get region name from slug
  const regionMap: Record<string, string> = {
    'sun-coast': 'Sun Coast',
    'treasure-coast': 'Treasure Coast',
    'southwest-florida': 'Southwest Florida',
    'south-florida': 'South Florida',
    'north-florida': 'North Florida',
    'florida-panhandle': 'Florida Panhandle',
    'first-coast': 'First Coast',
    'central-florida': 'Central Florida',
  };
  const regionName = regionMap[regionSlug] || '';
  
  const cities = searchData
    .filter(item => 
      item.type === 'city' && 
      item.county === countyName && 
      item.region === regionName
    )
    .map(item => item.name)
    .slice(0, 4); // Get top 4 cities
  return cities;
}

// Region data matching the reference site
const regionData: Record<
  string,
  {
    name: string;
    displayName: string;
    h1Title: string;
    intro: string;
    challenges: string;
    whyStoneCoated: string;
    areasServed: string[];
    keyCities: string[];
  }
> = {
  'sun-coast': {
    name: 'Sun Coast',
    displayName: 'The Sun Coast of Florida',
    h1Title: 'Roofers in The Sun Coast of Florida',
    intro:
      "Florida's Sun Coast blends beach life and big city energy—plus salt air, summer storms, and hurricane winds. RIF is the installation arm of PRP Roofing: we manage Certified Installers, coordinate permits, and install manufacturer-spec systems (tile, metal, shingle, flat) tuned for coastal conditions—backed by distributor-level pricing and warranties.",
    challenges:
      'The Sun Coast faces unique roofing challenges. Salt air accelerates corrosion on traditional materials. Summer storms bring heavy rain and wind. Hurricane season demands roofs that can withstand sustained winds and flying debris. Coastal humidity creates moisture issues that can compromise roof integrity over time.',
    whyStoneCoated:
      'Stone-coated metal roofing excels in Sun Coast conditions. The stone coating protects against salt air corrosion. The metal substrate provides exceptional wind resistance—often rated for winds up to 140 mph. The interlocking panels create a continuous barrier against water intrusion. Energy-efficient properties help reduce cooling costs in Florida\'s intense sun.',
    areasServed: ['Hillsborough County', 'Pinellas County', 'Pasco County', 'Hernando County'],
    keyCities: ['Tampa', 'St. Petersburg', 'Clearwater', 'Largo', 'Bradenton'],
  },
  'treasure-coast': {
    name: 'Treasure Coast',
    displayName: 'The Treasure Coast of Florida',
    h1Title: 'New Roofs in the Treasure Coast Of Florida',
    intro:
      'Stretching through Indian River, St. Lucie, Martin, and northern Palm Beach County, the Treasure Coast glitters with barrier-island beaches, winding waterways, and legends of lost Spanish ships. From Vero Beach and Port St. Lucie to Stuart and Jupiter, RIF roofers install systems built for tropical sun, coastal humidity, and hurricane-season winds. Every project is managed start-to-finish—inspection, permitting, and installation—backed by distributor-level pricing and in-stock materials through PRP Roofing.',
    challenges:
      'Treasure Coast roofs battle constant exposure to Atlantic salt air and intense UV radiation. Barrier islands face direct ocean winds. Summer thunderstorms bring torrential rain. Hurricane season requires roofs rated for high-velocity winds. Coastal humidity promotes mold and mildew growth.',
    whyStoneCoated:
      'Stone-coated metal roofing is ideal for Treasure Coast homes. The stone granules provide UV protection and resist fading. Metal construction handles salt air without corrosion. Interlocking panels create wind-resistant assemblies. The reflective surface reduces heat absorption, lowering energy costs.',
    areasServed: ['Indian River County', 'St. Lucie County', 'Martin County', 'Palm Beach County (northern)'],
    keyCities: ['Vero Beach', 'Port St. Lucie', 'Stuart', 'Jupiter', 'Fort Pierce'],
  },
  'southwest-florida': {
    name: 'Southwest Florida',
    displayName: 'Southwest Florida',
    h1Title: 'Find a Roofer in Southwest Florida',
    intro:
      'From Sarasota to Naples, Southwest Florida\'s coast blends calm beach towns, mangrove islands, and sun-drenched neighborhoods shaped by salt air and sudden summer storms. RIF roofers build for this environment—installing durable, code-compliant roofs that stand up to coastal humidity, high winds, and hurricane exposure. Backed by distributor-level pricing through PRP Roofing, every project combines craftsmanship, reliability, and materials made for life on the Gulf.',
    challenges:
      'Southwest Florida roofs endure Gulf Coast salt air, intense heat, and sudden storm systems. Mangrove areas experience high humidity. Summer brings daily thunderstorms with heavy rain. Hurricane season demands wind-rated systems. Coastal properties face both salt corrosion and UV degradation.',
    whyStoneCoated:
      'Stone-coated metal roofing performs exceptionally in Southwest Florida. The stone coating resists salt air and UV damage. Metal construction provides superior wind resistance. The system handles humidity without moisture problems. Energy efficiency helps offset Florida\'s high cooling costs.',
    areasServed: ['Sarasota County', 'Charlotte County', 'Lee County', 'Collier County'],
    keyCities: ['Sarasota', 'Naples', 'Fort Myers', 'Cape Coral', 'Venice'],
  },
  'south-florida': {
    name: 'South Florida',
    displayName: 'South Florida',
    h1Title: 'Roofing in South Florida',
    intro:
      'From the high-rises of Miami to the breezy streets of Key West, South Florida demands roofs that handle tropical heat, salt air, and hurricane-force winds. RIF roofers specialize in these coastal conditions—installing systems built for year-round sun and sudden storms. Backed by distributor-level pricing through PRP Roofing, every project combines precision, speed, and long-term protection for homes and businesses across Miami-Dade, Broward, Palm Beach, and the Keys.',
    challenges:
      'South Florida presents extreme roofing challenges. Tropical heat accelerates material degradation. Salt air from both Atlantic and Gulf sides causes rapid corrosion. Hurricane-force winds require systems rated for 150+ mph. Intense UV radiation fades and weakens traditional materials. High humidity promotes mold and rot.',
    whyStoneCoated:
      'Stone-coated metal roofing is engineered for South Florida\'s extremes. The stone coating protects against UV and salt. Metal construction provides unmatched wind resistance. The system resists moisture and mold. Energy efficiency is critical in tropical climates with year-round cooling needs.',
    areasServed: ['Miami-Dade County', 'Broward County', 'Palm Beach County', 'Monroe County (Keys)'],
    keyCities: ['Miami', 'Fort Lauderdale', 'West Palm Beach', 'Key West', 'Homestead'],
  },
  'north-florida': {
    name: 'North Florida',
    displayName: 'North Florida',
    h1Title: 'North Florida Roofers',
    intro:
      'Stretching from the Gulf Coast to the Atlantic, North Florida blends historic charm and coastal weather that demands durable roofing. From Jacksonville and St. Augustine to Gainesville, RIF roofers handle everything—inspection, permitting, and manufacturer-spec installation—built for humidity, salt air, and storm winds. All work is backed by distributor-level pricing through PRP Roofing.',
    challenges:
      'North Florida roofs face both Atlantic and Gulf influences. Historic areas require materials that complement period architecture. Coastal zones battle salt air and storm surge. Inland areas experience heavy summer rain and humidity. The region sees both tropical storms and occasional freezes.',
    whyStoneCoated:
      'Stone-coated metal roofing adapts to North Florida\'s diverse conditions. The system handles both coastal salt air and inland humidity. Wind resistance protects against storm systems. The stone coating provides durability in varied climates. Energy efficiency helps with both cooling and occasional heating needs.',
    areasServed: ['Duval County', 'St. Johns County', 'Alachua County', 'Clay County'],
    keyCities: ['Jacksonville', 'St. Augustine', 'Gainesville', 'Fernandina Beach', 'Orange Park'],
  },
  'florida-panhandle': {
    name: 'Florida Panhandle',
    displayName: 'The Florida Panhandle',
    h1Title: 'Roofing in the Florida Panhandle (Northwest Florida)',
    intro:
      'From Pensacola to Tallahassee, the Panhandle blends white-sand Emerald Coast beaches with pine-lined hills and Gulf winds that test every roof. RIF roofers build for salt air, heavy rain, and hurricane exposure—trained to manufacturer specs and backed by distributor-level pricing through PRP Roofing.',
    challenges:
      'Panhandle roofs face unique Gulf Coast challenges. Emerald Coast properties endure constant salt air exposure. Pine forests create debris that can damage roofs. Hurricane season brings direct hits from Gulf storms. The region experiences both tropical humidity and occasional winter weather.',
    whyStoneCoated:
      'Stone-coated metal roofing excels in Panhandle conditions. The system resists salt air corrosion from Gulf exposure. Wind resistance is critical for hurricane protection. The stone coating handles both intense sun and occasional freeze-thaw cycles. Durability is essential in areas with frequent storm activity.',
    areasServed: ['Escambia County', 'Santa Rosa County', 'Okaloosa County', 'Bay County', 'Leon County'],
    keyCities: ['Pensacola', 'Tallahassee', 'Destin', 'Panama City', 'Fort Walton Beach'],
  },
  'first-coast': {
    name: 'First Coast',
    displayName: "Florida's First Coast",
    h1Title: 'Roofing on Floridas First Coast',
    intro:
      'From the brick streets of St. Augustine to the riverside neighborhoods of Jacksonville and the harbor views of Fernandina Beach, Florida\'s First Coast blends centuries of history with Atlantic salt air and sudden coastal storms. RIF roofers craft and install roofs built for this mix of ocean winds, humidity, and seasonal rain—always to manufacturer specs and code. Each project is managed start to finish by one accountable team and backed by distributor-level pricing through PRP Roofing.',
    challenges:
      'First Coast roofs protect historic properties while meeting modern code requirements. Atlantic salt air accelerates material degradation. Coastal storms bring high winds and heavy rain. Historic districts may have architectural restrictions. The region balances preservation needs with storm resistance.',
    whyStoneCoated:
      'Stone-coated metal roofing offers solutions for First Coast properties. The system can complement historic architecture while providing modern protection. Salt air resistance protects coastal homes. Wind ratings meet strict code requirements. The material\'s longevity reduces maintenance on historic structures.',
    areasServed: ['Duval County', 'St. Johns County', 'Nassau County', 'Clay County'],
    keyCities: ['Jacksonville', 'St. Augustine', 'Fernandina Beach', 'Orange Park', 'Ponte Vedra Beach'],
  },
  'central-florida': {
    name: 'Central Florida',
    displayName: 'Central Florida',
    h1Title: 'Central Florida Roofing Professionals',
    intro:
      'At the heart of the state, Central Florida blends theme-park skylines with quiet lakefront neighborhoods and rolling hills. From Orlando and Lakeland to Kissimmee and Clermont, RIF roofers handle projects that face daily sun, heavy summer rain, and the occasional inland hurricane surge. We manage everything—inspection, permitting, and installation—with roofs engineered for heat, humidity, and storm resistance. Every job is backed by distributor-level pricing and in-stock materials through PRP Roofing.',
    challenges:
      'Central Florida roofs face intense heat, humidity, and frequent thunderstorms. Inland areas experience daily summer storms with heavy rain. Heat buildup increases cooling costs. Humidity promotes mold and moisture issues. The region sees both direct hurricane impacts and outer band effects.',
    whyStoneCoated:
      'Stone-coated metal roofing is ideal for Central Florida\'s climate. The reflective surface reduces heat absorption, lowering cooling costs. The system handles heavy rain without moisture problems. Wind resistance protects against storm impacts. Energy efficiency is crucial in this high-cooling-demand region.',
    areasServed: ['Orange County', 'Seminole County', 'Osceola County', 'Polk County', 'Lake County'],
    keyCities: ['Orlando', 'Lakeland', 'Kissimmee', 'Clermont', 'Winter Park'],
  },
};

export async function generateMetadata({
  params,
}: {
  params: { region: string };
}): Promise<Metadata> {
  const region = regionData[params.region];
  if (!region) {
    return {
      title: 'Service Area Not Found | RIF',
    };
  }

  return {
    title: `${region.h1Title} | RIF Roofing`,
    description: `${region.intro.substring(0, 155)}...`,
  };
}

export default function RegionPage({ params }: { params: { region: string } }) {
  const region = regionData[params.region];

  if (!region) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-rif-black mb-4">
            Region Not Found
          </h1>
          <Link
            href="/service-areas"
            className="text-rif-blue-500 hover:text-rif-blue-600"
          >
            ← Back to Service Areas
          </Link>
        </div>
      </div>
    );
  }

  // Background image path for this region
  const backgroundImagePath = `/regions/${params.region}.webp`;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - light background to separate from content below */}
      <section className="relative pt-20 pb-12 px-6 overflow-hidden bg-gray-100">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url(${backgroundImagePath})`,
          }}
        />
        {/* Light overlay so section reads as one light block */}
        <div className="absolute inset-0 z-[1] bg-gray-100/95" aria-hidden />
        
        {/* Content */}
        <div className="relative z-20 max-w-4xl mx-auto">
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-rif-blue-500 mb-6 transition-colors"
          >
            <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4" />
            ← Back to Service Areas
          </Link>
          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black tracking-tight flex-1">
              {region.h1Title}
            </h1>
            <LocationFavoriteButton
              locationType="region"
              name={region.displayName}
              slug={params.region}
              path={`/service-areas/${params.region}`}
              size="lg"
            />
          </div>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {region.intro}
          </p>
        </div>
      </section>

      {/* Counties We Serve - Prominent Section (Moved to top for visibility) */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="flex items-center gap-3 text-3xl md:text-4xl font-semibold text-rif-black mb-4">
            <FontAwesomeIcon icon={faMapLocationDot} className="h-8 w-8 text-rif-blue-500" />
            Counties We Serve in {region.displayName}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl">
            Click on any county below to view cities, towns, and roofing services available in that area.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {region.areasServed.map((area, idx) => {
                // Extract county name and create slug
                const countyName = area.replace(' County', '').replace(' (northern)', '').replace(' (southern)', '').toLowerCase().replace(/\s+/g, '-');
                const countySlug = countyName === 'palm-beach' && params.region === 'treasure-coast' 
                  ? 'palm-beach' 
                  : countyName === 'palm-beach' && params.region === 'south-florida'
                  ? 'palm-beach-south'
                  : countyName === 'duval' && params.region === 'first-coast'
                  ? 'duval-fc'
                  : countyName === 'st-johns' && params.region === 'first-coast'
                  ? 'st-johns-fc'
                  : countyName === 'clay' && params.region === 'first-coast'
                  ? 'clay-fc'
                  : countyName;
                
                // Get cities for this county from search data
                const countyDisplayName = area.replace(' (northern)', '').replace(' (southern)', '');
                const matchingCities = getCitiesForCounty(countyDisplayName, params.region);
                
                // Calculate roofer count for this county (only county-specific, not region-level)
                const rooferCount = getCountyRooferCount(params.region, countySlug);
                
                return (
                  <div
                    key={idx}
                    className="group block bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-rif-blue-300 hover:shadow-lg transition-all duration-200 relative"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <FontAwesomeIcon
                        icon={faMapLocationDot}
                        className="h-6 w-6 text-rif-blue-500 group-hover:text-rif-blue-600 transition-colors flex-shrink-0"
                      />
                      <div className="flex items-center gap-2">
                        <LocationFavoriteButton
                          locationType="county"
                          name={countyDisplayName}
                          slug={countySlug}
                          path={`/service-areas/${params.region}/${countySlug}`}
                          region={region.displayName}
                          size="sm"
                        />
                        <Link href={`/service-areas/${params.region}/${countySlug}`}>
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="h-4 w-4 text-gray-400 group-hover:text-rif-blue-500 group-hover:translate-x-1 transition-all"
                          />
                        </Link>
                      </div>
                    </div>
                    <Link href={`/service-areas/${params.region}/${countySlug}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-rif-black group-hover:text-rif-blue-500 transition-colors">
                        {countyDisplayName}
                      </h3>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-rif-blue-50 text-rif-blue-700 rounded-full text-xs font-semibold border border-rif-blue-200">
                        <FontAwesomeIcon icon={faUsers} className="h-3 w-3" />
                        <span>{rooferCount}</span>
                      </div>
                    </div>
                    {matchingCities.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500 mb-2">Key cities:</p>
                        <ul className="space-y-1">
                          {matchingCities.map((city, cityIdx) => (
                            <li key={cityIdx} className="text-sm text-gray-600 flex items-center gap-1">
                              <span className="w-1 h-1 bg-rif-blue-400 rounded-full"></span>
                              {city}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="text-sm text-rif-blue-500 font-medium group-hover:text-rif-blue-600">
                        View County Details →
                      </span>
                    </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Roofing Challenges */}
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-semibold text-rif-black mb-4">
              <FontAwesomeIcon icon={faCertificate} className="h-7 w-7 text-rif-blue-500" />
              Roofing Challenges in {region.displayName}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {region.challenges}
            </p>
          </div>

          {/* Why Stone-Coated Metal */}
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-semibold text-rif-black mb-4">
              <FontAwesomeIcon icon={faBoxes} className="h-7 w-7 text-rif-blue-500" />
              Why Stone-Coated Metal Roofing Works in {region.displayName}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {region.whyStoneCoated}
            </p>
          </div>

          {/* Key Cities Quick Reference */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-rif-black mb-4">
              Popular Cities in {region.displayName}
            </h3>
            <div className="flex flex-wrap gap-3">
              {region.keyCities.map((city, idx) => {
                // Find the city in search data to get the correct path
                const regionMap: Record<string, string> = {
                  'sun-coast': 'Sun Coast',
                  'treasure-coast': 'Treasure Coast',
                  'southwest-florida': 'Southwest Florida',
                  'south-florida': 'South Florida',
                  'north-florida': 'North Florida',
                  'florida-panhandle': 'Florida Panhandle',
                  'first-coast': 'First Coast',
                  'central-florida': 'Central Florida',
                };
                const regionName = regionMap[params.region] || '';
                
                const cityData = searchData.find(
                  item => item.type === 'city' && 
                  item.name === city && 
                  item.region === regionName
                );
                
                if (cityData) {
                  return (
                    <Link
                      key={idx}
                      href={cityData.path}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 bg-gray-50 hover:bg-rif-blue-50 hover:text-rif-blue-600 rounded-lg transition-colors"
                    >
                      <FontAwesomeIcon
                        icon={faMapLocationDot}
                        className="h-3 w-3 text-rif-blue-500"
                      />
                      {city}
                    </Link>
                  );
                }
                
                // Fallback if city not found in search data
                const citySlug = city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                const firstCountySlug = region.areasServed[0]
                  .replace(' County', '')
                  .replace(' (northern)', '')
                  .replace(' (southern)', '')
                  .toLowerCase()
                  .replace(/\s+/g, '-');
                
                return (
                  <Link
                    key={idx}
                    href={`/service-areas/${params.region}/${firstCountySlug}/${citySlug}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 bg-gray-50 hover:bg-rif-blue-50 hover:text-rif-blue-600 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon
                      icon={faMapLocationDot}
                      className="h-3 w-3 text-rif-blue-500"
                    />
                    {city}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Distributor Pricing */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200">
            <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-4">
              <FontAwesomeIcon icon={faDollarSign} className="h-6 w-6 text-rif-blue-500" />
              Installer-Direct Distributor Pricing
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              RIF is the installation division of{' '}
              <strong><a href="https://prproofing.com/" target="_blank" rel="noopener noreferrer" className="text-rif-blue-600 hover:underline">Premium Roofing Products (PRP Roofing)</a></strong>. We
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

          {/* Roofers Section */}
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-semibold text-rif-black mb-6">
              <FontAwesomeIcon icon={faUsers} className="h-7 w-7 text-rif-blue-500" />
              Roofers in {region.displayName}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our network of RIF Certified Installers serves {region.displayName}{' '}
              with manufacturer-trained expertise. Each installer is vetted,
              trained on specific product systems, and held to higher standards for
              installation quality and code compliance.
            </p>
            <RooferList
              regionSlug={params.region}
              locationName={region.displayName}
            />
          </div>
        </div>
      </section>
    </div>
  );
}













