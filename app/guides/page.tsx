import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getAllGuides, getGuidesByCategory } from './data/guides';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCalendar, faArrowRight, faMapLocationDot, faCloudRain, faBoxes, faClipboardList, faCalendarAlt, faDollarSign, faWrench, faFileContract, faLeaf, faBuilding, faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons';
import GuidesNavigation from './GuidesNavigation';

export const metadata: Metadata = {
  title: 'Roofing Guides & Resources | RIF Roofing',
  description: 'Expert guides on roofing in Florida, including storm damage, material selection, maintenance, and choosing the right roofer for your area.',
};

const categoryLabels: Record<string, string> = {
  'location-specific': 'Location-Specific Guides',
  'local-information': 'Local Information & Area Guides',
  'storm-damage': 'Storm Damage & Hurricane Recovery',
  'material-education': 'Roofing Material Education',
  'process-guides': 'Roofing Process & What to Expect',
  'seasonal': 'Seasonal & Maintenance',
  'cost-guides': 'Cost & Budgeting',
  'problem-solving': 'Problem-Solving & Troubleshooting',
  'building-code': 'Building Code & Compliance',
  'energy-efficiency': 'Energy Efficiency & Sustainability',
  'case-studies': 'Case Studies',
  'industry-news': 'Industry News & Updates',
  'commercial': 'Commercial Roofing',
};

const categoryIcons: Record<string, any> = {
  'location-specific': faMapLocationDot,
  'local-information': faUmbrellaBeach,
  'storm-damage': faCloudRain,
  'material-education': faBoxes,
  'process-guides': faClipboardList,
  'seasonal': faCalendarAlt,
  'cost-guides': faDollarSign,
  'problem-solving': faWrench,
  'building-code': faFileContract,
  'energy-efficiency': faLeaf,
  'case-studies': faBuilding,
  'industry-news': faBook,
  'commercial': faBuilding,
};

interface GuidesPageProps {
  searchParams: { category?: string };
}

export default function GuidesPage({ searchParams }: GuidesPageProps) {
  const allGuides = getAllGuides();
  const categories = Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>;
  const selectedCategory = searchParams.category || 'all';
  
  // Calculate guide counts per category
  const guideCounts: Record<string, number> = {};
  categories.forEach(cat => {
    guideCounts[cat] = getGuidesByCategory(cat as any).length;
  });
  
  // Filter guides based on selected category
  const displayedGuides = selectedCategory === 'all' 
    ? allGuides 
    : getGuidesByCategory(selectedCategory as any);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black tracking-tight mb-6">
            Roofing Guides & Resources
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Expert guides on roofing in Florida, from choosing the right materials to navigating storm damage and finding trusted roofers in your area.
          </p>
        </div>
      </section>

      {/* Main Content with Side Menu */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Side Menu / Mobile Menu Button */}
            <GuidesNavigation currentCategory={selectedCategory} guideCounts={guideCounts} />
            
            {/* Content Area */}
            <div className="flex-1 min-w-0 w-full">
          {displayedGuides.length === 0 ? (
            <div className="text-center py-16">
              <FontAwesomeIcon icon={faBook} className="h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Guides Found</h2>
              <p className="text-gray-600 mb-4">
                {selectedCategory === 'all' 
                  ? "We're preparing comprehensive roofing guides for Florida homeowners."
                  : `No guides available in this category yet.`
                }
              </p>
              {selectedCategory !== 'all' && (
                <Link
                  href="/guides"
                  className="inline-block px-6 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors"
                >
                  View All Guides
                </Link>
              )}
            </div>
          ) : (
            <>
              {/* Category Header */}
              {selectedCategory !== 'all' && (
                <div className="mb-8">
                  <h2 className="text-3xl font-semibold text-rif-black mb-2">
                    {categoryLabels[selectedCategory]}
                  </h2>
                  <p className="text-gray-600">
                    {displayedGuides.length} {displayedGuides.length === 1 ? 'guide' : 'guides'} available
                  </p>
                </div>
              )}

              {/* Guides Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedGuides.map((guide) => (
                  <Link
                    key={guide.id}
                    href={`/guides/${guide.slug}`}
                    className="block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    {guide.featuredImage && (
                      <div className="relative w-full h-48 bg-gray-100">
                        <Image
                          src={guide.featuredImage}
                          alt={guide.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-rif-blue-500 mb-3">
                        <FontAwesomeIcon 
                          icon={categoryIcons[guide.category] || faBook} 
                          className="h-4 w-4" 
                        />
                        <span className="font-medium">{categoryLabels[guide.category]}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-rif-black mb-3 group-hover:text-rif-blue-500 transition-colors">
                        {guide.title}
                      </h3>
                      {guide.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3">{guide.excerpt}</p>
                      )}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faCalendar} className="h-4 w-4" />
                          {new Date(guide.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-2 text-rif-blue-500 group-hover:gap-3 transition-all">
                          Read More
                          <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}








