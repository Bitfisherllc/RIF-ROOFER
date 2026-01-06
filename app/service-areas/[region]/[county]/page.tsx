import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapLocationDot,
  faUsers,
  faCertificate,
  faBoxes,
  faDollarSign,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';
import { getCitiesForCounty, createCitySlug } from '../../data/cities';
import LocationFavoriteButton from '@/components/LocationFavoriteButton';
import RooferList from '@/components/RooferList';
import { getRoofersByServiceArea, getAllRoofers } from '@/app/roofers/data/roofers';

// Helper function to count roofers who specifically serve a city (not just county or region-level)
function getCityRooferCount(regionSlug: string, countySlug: string, citySlug: string): number {
  const allRoofers = getAllRoofers();
  return allRoofers.filter(roofer => {
    const { serviceAreas } = roofer;
    // Only count roofers who explicitly serve this city
    // Don't include county-only or region-only roofers for city counts
    return serviceAreas.cities?.includes(citySlug);
  }).length;
}

// County data organized by region
const countyData: Record<
  string,
  Record<
    string,
    {
      name: string;
      displayName: string;
      regionName: string;
      regionSlug: string;
      h1Title: string;
      intro: string;
      challenges: string;
      whyStoneCoated: string;
      keyCities: string[];
      fipsCode?: string;
    }
  >
> = {
  'sun-coast': {
    'hillsborough': {
      name: 'Hillsborough',
      displayName: 'Hillsborough County',
      regionName: 'Sun Coast',
      regionSlug: 'sun-coast',
      h1Title: 'Roofers in Hillsborough County, Florida',
      intro:
        'Hillsborough County, home to Tampa and its surrounding communities, blends urban energy with coastal weather that demands durable roofing. From downtown Tampa to the suburban neighborhoods of Brandon, Plant City, and Temple Terrace, RIF roofers handle everything—inspection, permitting, and manufacturer-spec installation—built for humidity, salt air, and storm winds. All work is backed by distributor-level pricing through PRP Roofing.',
      challenges:
        'Hillsborough County roofs face Tampa Bay salt air, intense summer heat, and frequent thunderstorms. The urban heat island effect increases cooling demands. Summer storms bring heavy rain and occasional wind damage. Hurricane season requires wind-rated systems. Coastal humidity promotes moisture issues.',
      whyStoneCoated:
        'Stone-coated metal roofing excels in Hillsborough County conditions. The system handles both urban heat and coastal humidity. Wind resistance protects against storm impacts. Energy efficiency reduces cooling costs in Tampa\'s hot climate. The durable construction withstands frequent weather changes.',
      keyCities: ['Tampa', 'Brandon', 'Plant City', 'Temple Terrace', 'Riverview'],
      fipsCode: '12057',
    },
    'pinellas': {
      name: 'Pinellas',
      displayName: 'Pinellas County',
      regionName: 'Sun Coast',
      regionSlug: 'sun-coast',
      h1Title: 'Roofers in Pinellas County, Florida',
      intro:
        'Pinellas County, stretching from St. Petersburg to Clearwater and the barrier islands, faces constant exposure to Gulf salt air and tropical weather. RIF roofers install systems built for coastal conditions—handling everything from beachfront properties to inland neighborhoods. Every project is managed start-to-finish with distributor-level pricing through PRP Roofing.',
      challenges:
        'Pinellas County roofs endure constant Gulf Coast salt air exposure. Barrier islands face direct ocean winds and storm surge risk. Summer thunderstorms bring torrential rain. Hurricane season demands high wind ratings. Coastal humidity accelerates material degradation.',
      whyStoneCoated:
        'Stone-coated metal roofing is ideal for Pinellas County\'s coastal environment. The stone coating resists salt air corrosion. Metal construction provides superior wind resistance. The system handles humidity without moisture problems. Energy efficiency helps offset cooling costs.',
      keyCities: ['St. Petersburg', 'Clearwater', 'Largo', 'Pinellas Park', 'Dunedin'],
      fipsCode: '12103',
    },
    'pasco': {
      name: 'Pasco',
      displayName: 'Pasco County',
      regionName: 'Sun Coast',
      regionSlug: 'sun-coast',
      h1Title: 'Roofers in Pasco County, Florida',
      intro:
        'Pasco County, from New Port Richey to Dade City, blends suburban growth with coastal weather patterns. RIF roofers build for this environment—installing durable, code-compliant roofs that stand up to humidity, summer storms, and occasional hurricane impacts. Backed by distributor-level pricing through PRP Roofing.',
      challenges:
        'Pasco County roofs face Gulf-influenced weather with salt air exposure. Summer heat increases cooling demands. Frequent thunderstorms bring heavy rain. Hurricane season requires wind-rated systems. Rapid growth means varied architectural styles and roofing needs.',
      whyStoneCoated:
        'Stone-coated metal roofing performs well in Pasco County. The system handles both coastal and inland conditions. Wind resistance protects against storm impacts. Energy efficiency reduces cooling costs. The durable construction suits varied architectural styles.',
      keyCities: ['New Port Richey', 'Dade City', 'Zephyrhills', 'Port Richey', 'Wesley Chapel'],
      fipsCode: '12101',
    },
    'hernando': {
      name: 'Hernando',
      displayName: 'Hernando County',
      regionName: 'Sun Coast',
      regionSlug: 'sun-coast',
      h1Title: 'Roofers in Hernando County, Florida',
      intro:
        'Hernando County, from Brooksville to Spring Hill, blends rural charm with coastal weather influences. RIF roofers install systems built for humidity, summer storms, and occasional hurricane impacts. Every project combines craftsmanship and reliability with distributor-level pricing through PRP Roofing.',
      challenges:
        'Hernando County roofs face Gulf-influenced weather patterns. Summer heat and humidity create moisture challenges. Thunderstorms bring heavy rain. Hurricane season requires wind-rated systems. Rural areas may have longer material delivery times.',
      whyStoneCoated:
        'Stone-coated metal roofing works well in Hernando County. The system handles humidity and storm impacts. Wind resistance protects against occasional severe weather. Energy efficiency helps with cooling costs. Durability suits both rural and suburban properties.',
      keyCities: ['Brooksville', 'Spring Hill', 'Weeki Wachee', 'Ridge Manor'],
      fipsCode: '12053',
    },
  },
  'treasure-coast': {
    'indian-river': {
      name: 'Indian River',
      displayName: 'Indian River County',
      regionName: 'Treasure Coast',
      regionSlug: 'treasure-coast',
      h1Title: 'Roofers in Indian River County, Florida',
      intro:
        'Indian River County, home to Vero Beach and its barrier islands, faces constant Atlantic exposure and tropical weather. RIF roofers install systems built for salt air, intense sun, and hurricane-season winds. Every project is managed start-to-finish with distributor-level pricing through PRP Roofing.',
      challenges:
        'Indian River County roofs battle Atlantic salt air and intense UV radiation. Barrier islands face direct ocean winds. Summer thunderstorms bring torrential rain. Hurricane season requires high wind ratings. Coastal humidity promotes mold growth.',
      whyStoneCoated:
        'Stone-coated metal roofing is ideal for Indian River County. The stone granules provide UV protection. Metal construction handles salt air without corrosion. Wind resistance protects against hurricane impacts. Energy efficiency reduces cooling costs.',
      keyCities: ['Vero Beach', 'Sebastian', 'Fellsmere', 'Indian River Shores'],
      fipsCode: '12061',
    },
    'st-lucie': {
      name: 'St. Lucie',
      displayName: 'St. Lucie County',
      regionName: 'Treasure Coast',
      regionSlug: 'treasure-coast',
      h1Title: 'Roofers in St. Lucie County, Florida',
      intro:
        'St. Lucie County, from Port St. Lucie to Fort Pierce, blends barrier-island communities with mainland growth. RIF roofers build for Atlantic salt air, tropical sun, and hurricane-season conditions. All work is backed by distributor-level pricing through PRP Roofing.',
      challenges:
        'St. Lucie County roofs face Atlantic salt air and intense UV exposure. Barrier islands experience direct ocean winds. Summer thunderstorms bring heavy rain. Hurricane season demands high wind ratings. Coastal humidity accelerates material degradation.',
      whyStoneCoated:
        'Stone-coated metal roofing excels in St. Lucie County. The system resists salt air and UV damage. Wind resistance protects against hurricane impacts. The reflective surface reduces heat absorption. Energy efficiency helps offset cooling costs.',
      keyCities: ['Port St. Lucie', 'Fort Pierce', 'Stuart (partial)', 'Hutchinson Island'],
      fipsCode: '12111',
    },
    'martin': {
      name: 'Martin',
      displayName: 'Martin County',
      regionName: 'Treasure Coast',
      regionSlug: 'treasure-coast',
      h1Title: 'Roofers in Martin County, Florida',
      intro:
        'Martin County, from Stuart to Jupiter Island, faces constant Atlantic exposure and barrier-island conditions. RIF roofers install systems built for salt air, tropical humidity, and hurricane-force winds. Every project combines precision with distributor-level pricing through PRP Roofing.',
      challenges:
        'Martin County roofs endure Atlantic salt air and intense UV radiation. Barrier islands face direct ocean winds and storm surge. Summer thunderstorms bring torrential rain. Hurricane season requires roofs rated for 150+ mph winds. Coastal humidity promotes moisture issues.',
      whyStoneCoated:
        'Stone-coated metal roofing is engineered for Martin County\'s coastal extremes. The stone coating protects against salt and UV. Metal construction provides unmatched wind resistance. The system resists moisture and mold. Energy efficiency is critical in tropical climates.',
      keyCities: ['Stuart', 'Jensen Beach', 'Hobe Sound', 'Jupiter Island', 'Palm City'],
      fipsCode: '12085',
    },
    'palm-beach': {
      name: 'Palm Beach',
      displayName: 'Palm Beach County (Northern)',
      regionName: 'Treasure Coast',
      regionSlug: 'treasure-coast',
      h1Title: 'Roofers in Northern Palm Beach County, Florida',
      intro:
        'Northern Palm Beach County, from Jupiter to Tequesta, blends barrier-island luxury with Atlantic weather that demands premium roofing. RIF roofers install systems built for salt air, tropical heat, and hurricane conditions. All work is backed by distributor-level pricing through PRP Roofing.',
      challenges:
        'Northern Palm Beach County roofs face Atlantic salt air and intense UV exposure. Barrier islands experience direct ocean winds. Summer heat increases cooling demands. Hurricane season requires high wind ratings. Luxury properties demand premium materials.',
      whyStoneCoated:
        'Stone-coated metal roofing meets Northern Palm Beach County\'s premium standards. The system resists salt air and UV damage. Wind resistance protects luxury properties. Energy efficiency reduces cooling costs. The premium appearance suits high-end architecture.',
      keyCities: ['Jupiter', 'Tequesta', 'Juno Beach', 'Palm Beach Gardens (northern)'],
      fipsCode: '12099',
    },
  },
  'southwest-florida': {
    'sarasota': {
      name: 'Sarasota',
      displayName: 'Sarasota County',
      regionName: 'Southwest Florida',
      regionSlug: 'southwest-florida',
      h1Title: 'Roofers in Sarasota County, Florida',
      intro:
        'Sarasota County, from the city of Sarasota to Siesta Key and Longboat Key, blends cultural sophistication with Gulf Coast weather. RIF roofers build for salt air, tropical humidity, and hurricane conditions. Every project is managed start-to-finish with distributor-level pricing through PRP Roofing.',
      challenges:
        'Sarasota County roofs face Gulf Coast salt air and intense heat. Barrier islands experience direct ocean winds. Summer thunderstorms bring heavy rain. Hurricane season demands high wind ratings. Coastal humidity accelerates material degradation.',
      whyStoneCoated:
        'Stone-coated metal roofing excels in Sarasota County. The system resists salt air corrosion. Wind resistance protects against hurricane impacts. Energy efficiency reduces cooling costs. The premium appearance suits Sarasota\'s architectural standards.',
      keyCities: ['Sarasota', 'Venice', 'North Port', 'Longboat Key', 'Siesta Key'],
      fipsCode: '12115',
    },
    'charlotte': {
      name: 'Charlotte',
      displayName: 'Charlotte County',
      regionName: 'Southwest Florida',
      regionSlug: 'southwest-florida',
      h1Title: 'Roofers in Charlotte County, Florida',
      intro:
        'Charlotte County, from Punta Gorda to Port Charlotte, faces Gulf Coast salt air and tropical weather patterns. RIF roofers install systems built for coastal conditions, handling everything from waterfront properties to inland neighborhoods. All work is backed by distributor-level pricing through PRP Roofing.',
      challenges:
        'Charlotte County roofs endure Gulf Coast salt air exposure. Summer heat increases cooling demands. Thunderstorms bring heavy rain. Hurricane season requires wind-rated systems. Coastal humidity promotes moisture issues.',
      whyStoneCoated:
        'Stone-coated metal roofing is ideal for Charlotte County. The system handles salt air and humidity. Wind resistance protects against storm impacts. Energy efficiency helps offset cooling costs. Durability suits both coastal and inland properties.',
      keyCities: ['Punta Gorda', 'Port Charlotte', 'Englewood', 'Rotonda West'],
      fipsCode: '12015',
    },
    'lee': {
      name: 'Lee',
      displayName: 'Lee County',
      regionName: 'Southwest Florida',
      regionSlug: 'southwest-florida',
      h1Title: 'Roofers in Lee County, Florida',
      intro:
        'Lee County, from Fort Myers to Cape Coral and Sanibel Island, blends rapid growth with Gulf Coast weather that demands durable roofing. RIF roofers build for salt air, tropical humidity, and hurricane conditions. Every project combines craftsmanship with distributor-level pricing through PRP Roofing.',
      challenges:
        'Lee County roofs face Gulf Coast salt air and intense heat. Barrier islands experience direct ocean winds. Summer thunderstorms bring torrential rain. Hurricane season demands high wind ratings. Rapid growth means varied roofing needs.',
      whyStoneCoated:
        'Stone-coated metal roofing performs exceptionally in Lee County. The system resists salt air and UV damage. Wind resistance protects against hurricane impacts. Energy efficiency reduces cooling costs. Durability suits varied architectural styles.',
      keyCities: ['Fort Myers', 'Cape Coral', 'Sanibel Island', 'Bonita Springs', 'Estero'],
      fipsCode: '12071',
    },
    'collier': {
      name: 'Collier',
      displayName: 'Collier County',
      regionName: 'Southwest Florida',
      regionSlug: 'southwest-florida',
      h1Title: 'Roofers in Collier County, Florida',
      intro:
        'Collier County, from Naples to Marco Island and the Everglades edge, blends luxury coastal living with tropical weather extremes. RIF roofers install systems built for salt air, intense sun, and hurricane-force winds. All work is backed by distributor-level pricing through PRP Roofing.',
      challenges:
        'Collier County roofs face Gulf Coast salt air and intense UV radiation. Barrier islands experience direct ocean winds. Summer heat increases cooling demands. Hurricane season requires roofs rated for 150+ mph winds. Luxury properties demand premium materials.',
      whyStoneCoated:
        'Stone-coated metal roofing meets Collier County\'s premium standards. The stone coating protects against salt and UV. Metal construction provides unmatched wind resistance. Energy efficiency reduces cooling costs. The premium appearance suits luxury architecture.',
      keyCities: ['Naples', 'Marco Island', 'Immokalee', 'Everglades City', 'Golden Gate'],
      fipsCode: '12021',
    },
  },
  'south-florida': {
    'miami-dade': {
      name: 'Miami-Dade',
      displayName: 'Miami-Dade County',
      regionName: 'South Florida',
      regionSlug: 'south-florida',
      h1Title: 'Roofers in Miami-Dade County, Florida',
      intro:
        'Miami-Dade County, from Miami to Homestead and the Keys, faces extreme tropical conditions that demand premium roofing. RIF roofers specialize in coastal extremes—installing systems built for year-round heat, salt air, and hurricane-force winds. All work is backed by distributor-level pricing through PRP Roofing.',
      challenges:
        'Miami-Dade County roofs face extreme tropical heat and salt air from both Atlantic and Gulf. Hurricane-force winds require systems rated for 150+ mph. Intense UV radiation accelerates material degradation. High humidity promotes mold and rot. Urban heat island effect increases cooling demands.',
      whyStoneCoated:
        'Stone-coated metal roofing is engineered for Miami-Dade\'s extremes. The stone coating protects against UV and salt. Metal construction provides unmatched wind resistance. The system resists moisture and mold. Energy efficiency is critical in tropical climates.',
      keyCities: ['Miami', 'Homestead', 'Miami Beach', 'Coral Gables', 'Key Biscayne'],
      fipsCode: '12086',
    },
    'broward': {
      name: 'Broward',
      displayName: 'Broward County',
      regionName: 'South Florida',
      regionSlug: 'south-florida',
      h1Title: 'Roofers in Broward County, Florida',
      intro:
        'Broward County, from Fort Lauderdale to Hollywood and Pompano Beach, blends urban density with Atlantic weather that demands durable roofing. RIF roofers build for tropical heat, salt air, and hurricane conditions. Every project is managed start-to-finish with distributor-level pricing through PRP Roofing.',
      challenges:
        'Broward County roofs face Atlantic salt air and intense tropical heat. Urban heat island effect increases cooling demands. Hurricane season requires high wind ratings. Intense UV radiation accelerates degradation. High humidity promotes moisture issues.',
      whyStoneCoated:
        'Stone-coated metal roofing excels in Broward County. The system resists salt air and UV damage. Wind resistance protects against hurricane impacts. Energy efficiency reduces cooling costs. Durability suits urban and coastal properties.',
      keyCities: ['Fort Lauderdale', 'Hollywood', 'Pompano Beach', 'Coral Springs', 'Plantation'],
      fipsCode: '12011',
    },
    'palm-beach-south': {
      name: 'Palm Beach',
      displayName: 'Palm Beach County',
      regionName: 'South Florida',
      regionSlug: 'south-florida',
      h1Title: 'Roofers in Palm Beach County, Florida',
      intro:
        'Palm Beach County, from West Palm Beach to Boca Raton and Delray Beach, blends luxury coastal living with Atlantic weather extremes. RIF roofers install systems built for salt air, tropical heat, and hurricane conditions. All work is backed by distributor-level pricing through PRP Roofing.',
      challenges:
        'Palm Beach County roofs face Atlantic salt air and intense UV exposure. Luxury properties demand premium materials. Hurricane season requires high wind ratings. Summer heat increases cooling demands. Coastal humidity accelerates degradation.',
      whyStoneCoated:
        'Stone-coated metal roofing meets Palm Beach County\'s premium standards. The system resists salt air and UV damage. Wind resistance protects luxury properties. Energy efficiency reduces cooling costs. The premium appearance suits high-end architecture.',
      keyCities: ['West Palm Beach', 'Boca Raton', 'Delray Beach', 'Boynton Beach', 'Jupiter (southern)'],
      fipsCode: '12099',
    },
    'monroe': {
      name: 'Monroe',
      displayName: 'Monroe County (Florida Keys)',
      regionName: 'South Florida',
      regionSlug: 'south-florida',
      h1Title: 'Roofers in the Florida Keys, Monroe County',
      intro:
        'Monroe County, spanning the Florida Keys from Key Largo to Key West, faces extreme tropical conditions with direct ocean exposure. RIF roofers specialize in Keys conditions—installing systems built for salt air, hurricane-force winds, and tropical heat. Every project is managed start-to-finish with distributor-level pricing through PRP Roofing.',
      challenges:
        'Monroe County roofs face extreme salt air exposure from all sides. Hurricane-force winds require systems rated for 150+ mph. Intense UV radiation accelerates degradation. Storm surge risk demands elevated construction. Limited access increases material delivery challenges.',
      whyStoneCoated:
        'Stone-coated metal roofing is essential for Monroe County\'s extreme conditions. The stone coating protects against salt and UV. Metal construction provides unmatched wind resistance. The system resists moisture in high-humidity environments. Durability is critical in remote locations.',
      keyCities: ['Key West', 'Key Largo', 'Islamorada', 'Marathon', 'Big Pine Key'],
      fipsCode: '12087',
    },
  },
  'north-florida': {
    'duval': {
      name: 'Duval',
      displayName: 'Duval County',
      regionName: 'North Florida',
      regionSlug: 'north-florida',
      h1Title: 'Roofers in Duval County, Florida',
      intro:
        'Duval County, home to Jacksonville and its extensive coastline, blends urban growth with Atlantic weather that demands durable roofing. RIF roofers handle everything—inspection, permitting, and manufacturer-spec installation—built for humidity, salt air, and storm winds. All work is backed by distributor-level pricing through PRP Roofing.',
      challenges:
        'Duval County roofs face Atlantic salt air and intense summer heat. Urban heat island effect increases cooling demands. Summer thunderstorms bring heavy rain. Hurricane season requires wind-rated systems. Coastal humidity promotes moisture issues.',
      whyStoneCoated:
        'Stone-coated metal roofing excels in Duval County conditions. The system handles both urban heat and coastal humidity. Wind resistance protects against storm impacts. Energy efficiency reduces cooling costs. Durability suits varied architectural styles.',
      keyCities: ['Jacksonville', 'Jacksonville Beach', 'Atlantic Beach', 'Neptune Beach', 'Orange Park'],
      fipsCode: '12031',
    },
    'st-johns': {
      name: 'St. Johns',
      displayName: 'St. Johns County',
      regionName: 'North Florida',
      regionSlug: 'north-florida',
      h1Title: 'Roofers in St. Johns County, Florida',
      intro:
        'St. Johns County, from St. Augustine to Ponte Vedra Beach, blends historic charm with Atlantic weather that demands durable roofing. RIF roofers install systems built for salt air, coastal humidity, and storm conditions. Every project is managed start-to-finish with distributor-level pricing through PRP Roofing.',
      challenges:
        'St. Johns County roofs face Atlantic salt air and intense UV exposure. Historic districts may have architectural restrictions. Summer thunderstorms bring heavy rain. Hurricane season requires high wind ratings. Coastal humidity accelerates degradation.',
      whyStoneCoated:
        'Stone-coated metal roofing works well in St. Johns County. The system can complement historic architecture. Salt air resistance protects coastal homes. Wind resistance meets code requirements. Durability reduces maintenance on historic structures.',
      keyCities: ['St. Augustine', 'Ponte Vedra Beach', 'Vilano Beach', 'Crescent Beach', 'Hastings'],
      fipsCode: '12109',
    },
    'alachua': {
      name: 'Alachua',
      displayName: 'Alachua County',
      regionName: 'North Florida',
      regionSlug: 'north-florida',
      h1Title: 'Roofers in Alachua County, Florida',
      intro:
        'Alachua County, home to Gainesville and the University of Florida, blends college-town energy with inland weather patterns. RIF roofers build for humidity, summer storms, and occasional hurricane impacts. All work is backed by distributor-level pricing through PRP Roofing.',
      challenges:
        'Alachua County roofs face intense summer heat and humidity. Frequent thunderstorms bring heavy rain. Hurricane season requires wind-rated systems. Inland areas experience less salt air but more heat buildup. College housing has varied roofing needs.',
      whyStoneCoated:
        'Stone-coated metal roofing performs well in Alachua County. The system handles humidity and storm impacts. Wind resistance protects against occasional severe weather. Energy efficiency helps with cooling costs. Durability suits varied property types.',
      keyCities: ['Gainesville', 'Alachua', 'High Springs', 'Newberry', 'Micanopy'],
      fipsCode: '12001',
    },
    'clay': {
      name: 'Clay',
      displayName: 'Clay County',
      regionName: 'North Florida',
      regionSlug: 'north-florida',
      h1Title: 'Roofers in Clay County, Florida',
      intro:
        'Clay County, from Orange Park to Middleburg, blends suburban growth with St. Johns River influences. RIF roofers install systems built for humidity, summer storms, and occasional coastal weather impacts. Every project combines craftsmanship with distributor-level pricing through PRP Roofing.',
      challenges:
        'Clay County roofs face summer heat and humidity. Thunderstorms bring heavy rain. Hurricane season requires wind-rated systems. River influences create moisture challenges. Suburban growth means varied roofing needs.',
      whyStoneCoated:
        'Stone-coated metal roofing works well in Clay County. The system handles humidity and storm impacts. Wind resistance protects against occasional severe weather. Energy efficiency helps with cooling costs. Durability suits suburban properties.',
      keyCities: ['Orange Park', 'Middleburg', 'Green Cove Springs', 'Keystone Heights', 'Fleming Island'],
      fipsCode: '12019',
    },
  },
  'florida-panhandle': {
    'escambia': {
      name: 'Escambia',
      displayName: 'Escambia County',
      regionName: 'Florida Panhandle',
      regionSlug: 'florida-panhandle',
      h1Title: 'Roofers in Escambia County, Florida',
      intro:
        'Escambia County, home to Pensacola and its Gulf Coast beaches, faces constant salt air exposure and hurricane impacts. RIF roofers build for Gulf winds, heavy rain, and storm conditions. All work is backed by distributor-level pricing through PRP Roofing.',
      challenges:
        'Escambia County roofs face Gulf Coast salt air and direct hurricane exposure. Summer heat increases cooling demands. Heavy rain from storms creates moisture challenges. Hurricane season requires high wind ratings. Coastal humidity accelerates degradation.',
      whyStoneCoated:
        'Stone-coated metal roofing excels in Escambia County. The system resists salt air corrosion. Wind resistance protects against hurricane impacts. The durable construction handles frequent storm activity. Energy efficiency helps offset cooling costs.',
      keyCities: ['Pensacola', 'Pensacola Beach', 'Gulf Breeze', 'Perdido Key', 'Cantonment'],
      fipsCode: '12033',
    },
    'santa-rosa': {
      name: 'Santa Rosa',
      displayName: 'Santa Rosa County',
      regionName: 'Florida Panhandle',
      regionSlug: 'florida-panhandle',
      h1Title: 'Roofers in Santa Rosa County, Florida',
      intro:
        'Santa Rosa County, from Navarre to Milton, blends Gulf Coast beaches with inland communities. RIF roofers install systems built for salt air, tropical humidity, and hurricane conditions. Every project is managed start-to-finish with distributor-level pricing through PRP Roofing.',
      challenges:
        'Santa Rosa County roofs face Gulf Coast salt air exposure. Summer heat and humidity create moisture challenges. Thunderstorms bring heavy rain. Hurricane season requires wind-rated systems. Coastal and inland areas have different needs.',
      whyStoneCoated:
        'Stone-coated metal roofing is ideal for Santa Rosa County. The system handles salt air and humidity. Wind resistance protects against storm impacts. Energy efficiency helps with cooling costs. Durability suits both coastal and inland properties.',
      keyCities: ['Navarre', 'Milton', 'Gulf Breeze (partial)', 'Jay', 'Bagdad'],
      fipsCode: '12113',
    },
    'okaloosa': {
      name: 'Okaloosa',
      displayName: 'Okaloosa County',
      regionName: 'Florida Panhandle',
      regionSlug: 'florida-panhandle',
      h1Title: 'Roofers in Okaloosa County, Florida',
      intro:
        'Okaloosa County, from Fort Walton Beach to Destin and the Emerald Coast, faces constant Gulf exposure and tropical weather. RIF roofers build for salt air, hurricane conditions, and coastal humidity. All work is backed by distributor-level pricing through PRP Roofing.',
      challenges:
        'Okaloosa County roofs endure Emerald Coast salt air and intense UV exposure. Barrier islands face direct Gulf winds. Summer thunderstorms bring heavy rain. Hurricane season requires high wind ratings. Tourism areas demand premium materials.',
      whyStoneCoated:
        'Stone-coated metal roofing meets Okaloosa County\'s coastal standards. The system resists salt air and UV damage. Wind resistance protects against hurricane impacts. Energy efficiency reduces cooling costs. The premium appearance suits tourism areas.',
      keyCities: ['Fort Walton Beach', 'Destin', 'Crestview', 'Niceville', 'Valparaiso'],
      fipsCode: '12107',
    },
    'bay': {
      name: 'Bay',
      displayName: 'Bay County',
      regionName: 'Florida Panhandle',
      regionSlug: 'florida-panhandle',
      h1Title: 'Roofers in Bay County, Florida',
      intro:
        'Bay County, home to Panama City and Panama City Beach, faces Gulf Coast salt air and direct hurricane exposure. RIF roofers install systems built for coastal conditions, handling everything from beachfront properties to inland neighborhoods. Every project is managed start-to-finish with distributor-level pricing through PRP Roofing.',
      challenges:
        'Bay County roofs face Gulf Coast salt air and intense heat. Beachfront properties experience direct ocean winds. Summer thunderstorms bring heavy rain. Hurricane season requires high wind ratings. Tourism areas have varied roofing needs.',
      whyStoneCoated:
        'Stone-coated metal roofing excels in Bay County. The system resists salt air corrosion. Wind resistance protects against hurricane impacts. Energy efficiency helps offset cooling costs. Durability suits both coastal and inland properties.',
      keyCities: ['Panama City', 'Panama City Beach', 'Lynn Haven', 'Parker', 'Callaway'],
      fipsCode: '12005',
    },
    'leon': {
      name: 'Leon',
      displayName: 'Leon County',
      regionName: 'Florida Panhandle',
      regionSlug: 'florida-panhandle',
      h1Title: 'Roofers in Leon County, Florida',
      intro:
        'Leon County, home to Tallahassee and the state capital, blends government and university presence with inland weather patterns. RIF roofers build for humidity, summer storms, and occasional hurricane impacts. All work is backed by distributor-level pricing through PRP Roofing.',
      challenges:
        'Leon County roofs face intense summer heat and humidity. Frequent thunderstorms bring heavy rain. Hurricane season requires wind-rated systems. Inland areas experience less salt air but more heat buildup. Government and university properties have varied needs.',
      whyStoneCoated:
        'Stone-coated metal roofing performs well in Leon County. The system handles humidity and storm impacts. Wind resistance protects against occasional severe weather. Energy efficiency helps with cooling costs. Durability suits varied property types.',
      keyCities: ['Tallahassee', 'Woodville', 'Miccosukee', 'Chaires'],
      fipsCode: '12073',
    },
  },
  'first-coast': {
    'duval-fc': {
      name: 'Duval',
      displayName: 'Duval County',
      regionName: 'First Coast',
      regionSlug: 'first-coast',
      h1Title: 'Roofers in Duval County, Florida',
      intro:
        'Duval County, home to Jacksonville and its extensive coastline, blends urban growth with Atlantic weather that demands durable roofing. RIF roofers handle everything—inspection, permitting, and manufacturer-spec installation—built for humidity, salt air, and storm winds. All work is backed by distributor-level pricing through PRP Roofing.',
      challenges:
        'Duval County roofs face Atlantic salt air and intense summer heat. Urban heat island effect increases cooling demands. Summer thunderstorms bring heavy rain. Hurricane season requires wind-rated systems. Coastal humidity promotes moisture issues.',
      whyStoneCoated:
        'Stone-coated metal roofing excels in Duval County conditions. The system handles both urban heat and coastal humidity. Wind resistance protects against storm impacts. Energy efficiency reduces cooling costs. Durability suits varied architectural styles.',
      keyCities: ['Jacksonville', 'Jacksonville Beach', 'Atlantic Beach', 'Neptune Beach', 'Orange Park'],
      fipsCode: '12031',
    },
    'st-johns-fc': {
      name: 'St. Johns',
      displayName: 'St. Johns County',
      regionName: 'First Coast',
      regionSlug: 'first-coast',
      h1Title: 'Roofers in St. Johns County, Florida',
      intro:
        'St. Johns County, from St. Augustine to Ponte Vedra Beach, blends historic charm with Atlantic weather that demands durable roofing. RIF roofers install systems built for salt air, coastal humidity, and storm conditions. Every project is managed start-to-finish with distributor-level pricing through PRP Roofing.',
      challenges:
        'St. Johns County roofs face Atlantic salt air and intense UV exposure. Historic districts may have architectural restrictions. Summer thunderstorms bring heavy rain. Hurricane season requires high wind ratings. Coastal humidity accelerates degradation.',
      whyStoneCoated:
        'Stone-coated metal roofing works well in St. Johns County. The system can complement historic architecture. Salt air resistance protects coastal homes. Wind resistance meets code requirements. Durability reduces maintenance on historic structures.',
      keyCities: ['St. Augustine', 'Ponte Vedra Beach', 'Vilano Beach', 'Crescent Beach', 'Hastings'],
      fipsCode: '12109',
    },
    'nassau': {
      name: 'Nassau',
      displayName: 'Nassau County',
      regionName: 'First Coast',
      regionSlug: 'first-coast',
      h1Title: 'Roofers in Nassau County, Florida',
      intro:
        'Nassau County, from Fernandina Beach to Yulee, blends historic coastal communities with Atlantic weather that demands durable roofing. RIF roofers build for salt air, coastal humidity, and storm conditions. All work is backed by distributor-level pricing through PRP Roofing.',
      challenges:
        'Nassau County roofs face Atlantic salt air and intense UV exposure. Historic areas require materials that complement period architecture. Summer thunderstorms bring heavy rain. Hurricane season requires high wind ratings. Coastal humidity accelerates degradation.',
      whyStoneCoated:
        'Stone-coated metal roofing works well in Nassau County. The system can complement historic architecture. Salt air resistance protects coastal homes. Wind resistance meets code requirements. Durability reduces maintenance on historic structures.',
      keyCities: ['Fernandina Beach', 'Yulee', 'Callahan', 'Hilliard', 'American Beach'],
      fipsCode: '12089',
    },
    'clay-fc': {
      name: 'Clay',
      displayName: 'Clay County',
      regionName: 'First Coast',
      regionSlug: 'first-coast',
      h1Title: 'Roofers in Clay County, Florida',
      intro:
        'Clay County, from Orange Park to Middleburg, blends suburban growth with St. Johns River influences. RIF roofers install systems built for humidity, summer storms, and occasional coastal weather impacts. Every project combines craftsmanship with distributor-level pricing through PRP Roofing.',
      challenges:
        'Clay County roofs face summer heat and humidity. Thunderstorms bring heavy rain. Hurricane season requires wind-rated systems. River influences create moisture challenges. Suburban growth means varied roofing needs.',
      whyStoneCoated:
        'Stone-coated metal roofing works well in Clay County. The system handles humidity and storm impacts. Wind resistance protects against occasional severe weather. Energy efficiency helps with cooling costs. Durability suits suburban properties.',
      keyCities: ['Orange Park', 'Middleburg', 'Green Cove Springs', 'Keystone Heights', 'Fleming Island'],
      fipsCode: '12019',
    },
  },
  'central-florida': {
    'orange': {
      name: 'Orange',
      displayName: 'Orange County',
      regionName: 'Central Florida',
      regionSlug: 'central-florida',
      h1Title: 'Roofers in Orange County, Florida',
      intro:
        'Orange County, home to Orlando and its theme parks, blends urban energy with inland weather that demands durable roofing. RIF roofers handle everything—inspection, permitting, and manufacturer-spec installation—built for heat, humidity, and storm resistance. All work is backed by distributor-level pricing through PRP Roofing.',
      challenges:
        'Orange County roofs face intense heat, humidity, and frequent thunderstorms. Urban heat island effect increases cooling demands. Summer storms bring heavy rain. Hurricane season requires wind-rated systems. Tourism areas have varied roofing needs.',
      whyStoneCoated:
        'Stone-coated metal roofing is ideal for Orange County. The reflective surface reduces heat absorption. The system handles heavy rain without moisture problems. Wind resistance protects against storm impacts. Energy efficiency is crucial in this high-cooling-demand region.',
      keyCities: ['Orlando', 'Winter Park', 'Apopka', 'Windermere', 'Ocoee'],
      fipsCode: '12095',
    },
    'seminole': {
      name: 'Seminole',
      displayName: 'Seminole County',
      regionName: 'Central Florida',
      regionSlug: 'central-florida',
      h1Title: 'Roofers in Seminole County, Florida',
      intro:
        'Seminole County, from Sanford to Altamonte Springs, blends suburban growth with inland weather patterns. RIF roofers install systems built for heat, humidity, and frequent thunderstorms. Every project is managed start-to-finish with distributor-level pricing through PRP Roofing.',
      challenges:
        'Seminole County roofs face intense summer heat and humidity. Frequent thunderstorms bring heavy rain. Hurricane season requires wind-rated systems. Inland areas experience less salt air but more heat buildup. Suburban growth means varied roofing needs.',
      whyStoneCoated:
        'Stone-coated metal roofing performs well in Seminole County. The system handles humidity and storm impacts. Wind resistance protects against occasional severe weather. Energy efficiency helps with cooling costs. Durability suits suburban properties.',
      keyCities: ['Sanford', 'Altamonte Springs', 'Oviedo', 'Lake Mary', 'Longwood'],
      fipsCode: '12117',
    },
    'osceola': {
      name: 'Osceola',
      displayName: 'Osceola County',
      regionName: 'Central Florida',
      regionSlug: 'central-florida',
      h1Title: 'Roofers in Osceola County, Florida',
      intro:
        'Osceola County, from Kissimmee to St. Cloud, blends theme-park proximity with inland weather patterns. RIF roofers build for heat, humidity, and frequent thunderstorms. All work is backed by distributor-level pricing through PRP Roofing.',
      challenges:
        'Osceola County roofs face intense summer heat and humidity. Frequent thunderstorms bring heavy rain. Hurricane season requires wind-rated systems. Tourism areas have varied roofing needs. Inland conditions create heat buildup.',
      whyStoneCoated:
        'Stone-coated metal roofing works well in Osceola County. The system handles humidity and storm impacts. Wind resistance protects against occasional severe weather. Energy efficiency helps with cooling costs. Durability suits varied property types.',
      keyCities: ['Kissimmee', 'St. Cloud', 'Celebration', 'Poinciana', 'Four Corners'],
      fipsCode: '12097',
    },
    'polk': {
      name: 'Polk',
      displayName: 'Polk County',
      regionName: 'Central Florida',
      regionSlug: 'central-florida',
      h1Title: 'Roofers in Polk County, Florida',
      intro:
        'Polk County, from Lakeland to Winter Haven, blends agricultural heritage with inland weather that demands durable roofing. RIF roofers install systems built for heat, humidity, and frequent thunderstorms. Every project is managed start-to-finish with distributor-level pricing through PRP Roofing.',
      challenges:
        'Polk County roofs face intense summer heat and humidity. Frequent thunderstorms bring heavy rain. Hurricane season requires wind-rated systems. Inland areas experience heat buildup. Agricultural areas have varied roofing needs.',
      whyStoneCoated:
        'Stone-coated metal roofing performs well in Polk County. The system handles humidity and storm impacts. Wind resistance protects against occasional severe weather. Energy efficiency helps with cooling costs. Durability suits varied property types.',
      keyCities: ['Lakeland', 'Winter Haven', 'Bartow', 'Haines City', 'Auburndale'],
      fipsCode: '12105',
    },
    'lake': {
      name: 'Lake',
      displayName: 'Lake County',
      regionName: 'Central Florida',
      regionSlug: 'central-florida',
      h1Title: 'Roofers in Lake County, Florida',
      intro:
        'Lake County, from Clermont to Tavares, blends lakefront communities with rolling hills and inland weather. RIF roofers build for heat, humidity, and frequent thunderstorms. All work is backed by distributor-level pricing through PRP Roofing.',
      challenges:
        'Lake County roofs face intense summer heat and humidity. Frequent thunderstorms bring heavy rain. Hurricane season requires wind-rated systems. Lakefront properties may have specific requirements. Inland conditions create heat buildup.',
      whyStoneCoated:
        'Stone-coated metal roofing works well in Lake County. The system handles humidity and storm impacts. Wind resistance protects against occasional severe weather. Energy efficiency helps with cooling costs. Durability suits lakefront and inland properties.',
      keyCities: ['Clermont', 'Tavares', 'Leesburg', 'Mount Dora', 'Eustis'],
      fipsCode: '12069',
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: { region: string; county: string };
}): Promise<Metadata> {
  const region = countyData[params.region];
  const county = region?.[params.county];
  
  if (!county) {
    return {
      title: 'County Not Found | RIF',
    };
  }

  // Enhanced SEO description with natural keyword usage
  const seoDescription = `Find certified roofers in ${county.displayName}, Florida. Our network of RIF certified installers serves ${county.keyCities.slice(0, 2).join(' and ')} and throughout ${county.displayName} with stone-coated metal roofing systems designed for Florida's climate. Licensed, insured, and manufacturer-trained.`;

  return {
    title: `Certified Roofers in ${county.displayName}, Florida | RIF Roofing`,
    description: seoDescription,
    keywords: [
      `roofers in ${county.displayName}`,
      `roofing contractors ${county.displayName}`,
      `stone coated metal roofing ${county.displayName}`,
      ...county.keyCities.map(city => `roofers in ${city}`),
      `${county.displayName} roofers`,
      `certified roofers ${county.displayName}`,
      `roof replacement ${county.displayName}`,
    ].join(', '),
  };
}

export default function CountyPage({
  params,
}: {
  params: { region: string; county: string };
}) {
  const region = countyData[params.region];
  const county = region?.[params.county];

  if (!county) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-rif-black mb-4">
            County Not Found
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href={`/service-areas/${county.regionSlug}`}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-rif-blue-500 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
              Back to {county.regionName}
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
              {county.h1Title}
            </h1>
            <LocationFavoriteButton
              locationType="county"
              name={county.displayName}
              slug={params.county}
              path={`/service-areas/${params.region}/${params.county}`}
              region={county.regionName}
              size="lg"
            />
          </div>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {county.intro}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/roofers/map?county=${params.county}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors text-sm font-medium"
            >
              <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4" />
              Show on Map
            </Link>
          </div>
        </div>
      </section>

      {/* Cities We Serve - Prominent Section */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="flex items-center gap-3 text-3xl md:text-4xl font-semibold text-rif-black mb-4">
            <FontAwesomeIcon icon={faMapLocationDot} className="h-8 w-8 text-rif-blue-500" />
            Cities, Towns & Communities We Serve in {county.displayName}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl">
            Click on any location below to view roofing services and information specific to that area.
          </p>
          {(() => {
            const allCities = getCitiesForCounty(params.region, params.county);
            if (allCities.length === 0) {
              return (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <p className="text-gray-600">City data is being updated. Please check back soon.</p>
                </div>
              );
            }
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allCities.map((city) => {
                  const citySlug = createCitySlug(city.name);
                  // Calculate roofer count for this city (only city-specific, not county or region-level)
                  const rooferCount = getCityRooferCount(params.region, params.county, citySlug);
                  return (
                    <div
                      key={citySlug}
                      className="group block bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-rif-blue-300 hover:shadow-lg transition-all duration-200 relative"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <FontAwesomeIcon
                          icon={faMapLocationDot}
                          className="h-6 w-6 text-rif-blue-500 group-hover:text-rif-blue-600 transition-colors flex-shrink-0"
                        />
                        <div className="flex items-center gap-2">
                          <LocationFavoriteButton
                            locationType="city"
                            name={city.displayName}
                            slug={citySlug}
                            path={`/service-areas/${params.region}/${params.county}/${citySlug}`}
                            county={city.countyName}
                            region={city.regionName}
                            size="sm"
                          />
                          <Link href={`/service-areas/${params.region}/${params.county}/${citySlug}`}>
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="h-4 w-4 text-gray-400 group-hover:text-rif-blue-500 group-hover:translate-x-1 transition-all"
                            />
                          </Link>
                        </div>
                      </div>
                      <Link href={`/service-areas/${params.region}/${params.county}/${citySlug}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-rif-black group-hover:text-rif-blue-500 transition-colors">
                          {city.displayName}
                        </h3>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-rif-blue-50 text-rif-blue-700 rounded-full text-xs font-semibold border border-rif-blue-200">
                          <FontAwesomeIcon icon={faUsers} className="h-3 w-3" />
                          <span>{rooferCount}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 capitalize mb-3">
                        {city.type}
                      </p>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <span className="text-sm text-rif-blue-500 font-medium group-hover:text-rif-blue-600">
                          View Details →
                        </span>
                      </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Finding Roofers in County - SEO Section */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200">
            <h2 className="flex items-center gap-3 text-3xl font-semibold text-rif-black mb-4">
              <FontAwesomeIcon icon={faMapLocationDot} className="h-7 w-7 text-rif-blue-500" />
              Finding Certified Roofers in {county.displayName}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              When searching for roofers in {county.displayName}, homeowners and property managers need contractors who understand the unique challenges of roofing in this area. Our network of RIF certified roofers serves communities throughout {county.displayName}, including {county.keyCities.slice(0, 3).join(', ')}, and other cities across the county.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Whether you're looking for roofers in {county.keyCities[0]}, {county.keyCities[1] || county.keyCities[0]}, or any other community in {county.displayName}, our certified installers bring manufacturer-trained expertise to every project. Each roofer in our {county.displayName} network is vetted for quality workmanship, proper licensing, and code compliance specific to Florida building requirements.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our {county.displayName} roofers specialize in stone-coated metal roofing systems that are designed to withstand the local climate conditions. From new construction to roof replacement projects, these certified contractors work directly with homeowners, property managers, and businesses throughout the county to deliver durable, energy-efficient roofing solutions.
            </p>
          </div>

          {/* Roofing Challenges */}
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-semibold text-rif-black mb-4">
              <FontAwesomeIcon icon={faCertificate} className="h-7 w-7 text-rif-blue-500" />
              Roofing Challenges in {county.displayName}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {county.challenges}
            </p>
          </div>

          {/* Why Stone-Coated Metal */}
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-semibold text-rif-black mb-4">
              <FontAwesomeIcon icon={faBoxes} className="h-7 w-7 text-rif-blue-500" />
              Why Stone-Coated Metal Roofing Works in {county.displayName}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {county.whyStoneCoated}
            </p>
          </div>

          {/* Common Roofing Projects */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200">
            <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-4">
              <FontAwesomeIcon icon={faCertificate} className="h-6 w-6 text-rif-blue-500" />
              Common Roofing Projects in {county.displayName}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Homeowners and businesses throughout {county.displayName} trust our certified roofers for a wide range of roofing projects. Whether you're in {county.keyCities[0]}, {county.keyCities[1] || county.keyCities[0]}, or anywhere else in the county, our network handles:
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-rif-blue-500 mt-1">•</span>
                <span><strong>Complete roof replacement:</strong> Full roof replacement projects for homes and commercial buildings across {county.displayName}, using stone-coated metal roofing systems designed for Florida's climate.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rif-blue-500 mt-1">•</span>
                <span><strong>Storm damage repair:</strong> Hurricane and storm damage repairs throughout {county.displayName}, with certified roofers who understand insurance claim processes and building code requirements.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rif-blue-500 mt-1">•</span>
                <span><strong>New construction roofing:</strong> New home and commercial building roofing installations, ensuring proper installation from day one with manufacturer specifications.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rif-blue-500 mt-1">•</span>
                <span><strong>Roof inspections and maintenance:</strong> Professional roof inspections to assess condition, identify potential issues, and recommend maintenance or replacement options.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rif-blue-500 mt-1">•</span>
                <span><strong>Energy-efficient upgrades:</strong> Roofing upgrades that improve energy efficiency, helping {county.displayName} homeowners reduce cooling costs during hot Florida summers.</span>
              </li>
            </ul>
          </div>

          {/* Local Building Codes and Permits */}
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-4">
              <FontAwesomeIcon icon={faCertificate} className="h-6 w-6 text-rif-blue-500" />
              Building Codes and Permits in {county.displayName}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              All roofing work in {county.displayName} must comply with Florida Building Code requirements, which include specific wind resistance ratings, material standards, and installation methods. Our certified roofers in {county.displayName} are familiar with local building department requirements and handle permit applications as part of their service.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Whether you're working with roofers in {county.keyCities[0]} or other communities throughout {county.displayName}, our certified contractors ensure all projects meet or exceed code requirements. This includes proper wind uplift ratings for hurricane-prone areas, correct installation techniques, and final inspections that satisfy local building officials.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              When choosing roofers in {county.displayName}, it's essential to work with licensed, insured contractors who understand these requirements. Our RIF certified roofers maintain proper licensing, carry adequate insurance, and stay current with code changes that affect roofing work in {county.displayName} and throughout Florida.
            </p>
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

          {/* Areas and Neighborhoods Served */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200">
            <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-4">
              <FontAwesomeIcon icon={faMapLocationDot} className="h-6 w-6 text-rif-blue-500" />
              Areas We Serve in {county.displayName}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Our certified roofers provide roofing services throughout {county.displayName}, serving homeowners and businesses in major cities, suburban communities, and rural areas across the county. Whether you're searching for roofers in {county.keyCities.join(', ')}, or any other location in {county.displayName}, our network of certified contractors is ready to help with your roofing needs.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Each roofer in our {county.displayName} network understands the local market, building codes, and weather patterns that affect roofing in this area. From coastal properties to inland communities, our certified installers bring the same high standards of workmanship and manufacturer training to every project, regardless of location within {county.displayName}.
            </p>
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-rif-black mb-3">Key Service Areas in {county.displayName}:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {county.keyCities.map((city, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-700">
                    <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 text-rif-blue-500" />
                    <span>Roofers in {city}, {county.displayName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Roofers Section */}
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-semibold text-rif-black mb-6">
              <FontAwesomeIcon icon={faUsers} className="h-7 w-7 text-rif-blue-500" />
              Certified Roofers in {county.displayName}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              When you need roofers in {county.displayName}, our network of RIF Certified Installers provides manufacturer-trained expertise backed by distributor-level pricing. Each roofer serving {county.displayName} is vetted for quality workmanship, proper licensing, and adherence to Florida building codes.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our {county.displayName} roofers specialize in stone-coated metal roofing systems that are specifically designed for Florida's climate challenges. Whether you're in {county.keyCities[0]}, {county.keyCities[1] || county.keyCities[0]}, or any other community in {county.displayName}, these certified contractors bring the same commitment to quality installation and customer service.
            </p>
            <RooferList
              regionSlug={county.regionSlug}
              countySlug={params.county}
              locationName={county.displayName}
            />
          </div>
        </div>
      </section>
    </div>
  );
}









