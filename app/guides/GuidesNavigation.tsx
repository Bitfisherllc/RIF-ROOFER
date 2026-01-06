'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faBook, faMapLocationDot, faCloudRain, faBoxes, faClipboardList, faCalendarAlt, faDollarSign, faWrench, faFileContract, faLeaf, faBuilding, faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons';

interface CategoryInfo {
  label: string;
  icon: any;
  description: string;
}

const categoryInfo: Record<string, CategoryInfo> = {
  'all': {
    label: 'All Guides',
    icon: faBook,
    description: 'Browse all roofing guides and resources',
  },
  'location-specific': {
    label: 'Location-Specific',
    icon: faMapLocationDot,
    description: 'Guides for specific cities and regions in Florida',
  },
  'local-information': {
    label: 'Local Information',
    icon: faUmbrellaBeach,
    description: 'Travel-style guides combining area information with roofing expertise',
  },
  'storm-damage': {
    label: 'Storm Damage',
    icon: faCloudRain,
    description: 'Hurricane recovery and storm damage guides',
  },
  'material-education': {
    label: 'Materials',
    icon: faBoxes,
    description: 'Learn about roofing materials and options',
  },
  'process-guides': {
    label: 'Process & Planning',
    icon: faClipboardList,
    description: 'How to choose roofers and plan your project',
  },
  'seasonal': {
    label: 'Seasonal & Maintenance',
    icon: faCalendarAlt,
    description: 'Seasonal maintenance and preparation guides',
  },
  'cost-guides': {
    label: 'Cost & Budgeting',
    icon: faDollarSign,
    description: 'Understanding costs and financing options',
  },
  'problem-solving': {
    label: 'Problem-Solving',
    icon: faWrench,
    description: 'Troubleshooting common roofing problems',
  },
  'building-code': {
    label: 'Building Codes',
    icon: faFileContract,
    description: 'Code requirements and compliance',
  },
  'energy-efficiency': {
    label: 'Energy Efficiency',
    icon: faLeaf,
    description: 'Energy-efficient roofing options',
  },
  'case-studies': {
    label: 'Case Studies',
    icon: faBuilding,
    description: 'Real project examples and results',
  },
  'industry-news': {
    label: 'Industry News',
    icon: faBook,
    description: 'Latest roofing industry updates',
  },
  'commercial': {
    label: 'Commercial',
    icon: faBuilding,
    description: 'Commercial roofing guides',
  },
};

interface GuidesNavigationProps {
  currentCategory?: string;
  guideCounts: Record<string, number>;
}

export default function GuidesNavigation({ currentCategory = 'all', guideCounts }: GuidesNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = Object.keys(categoryInfo).filter(cat => cat === 'all' || guideCounts[cat] > 0);

  return (
    <>
      {/* Desktop Side Menu */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <nav className="sticky top-24 bg-white border-r border-gray-200 pr-6">
          <div className="py-4">
            <h2 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Categories
            </h2>
            <div className="space-y-1">
              {categories.map((category) => {
                const info = categoryInfo[category];
                const isActive = currentCategory === category;
                const count = category === 'all' 
                  ? Object.values(guideCounts).reduce((a, b) => a + b, 0)
                  : guideCounts[category] || 0;

                return (
                  <Link
                    key={category}
                    href={category === 'all' ? '/guides' : `/guides?category=${category}`}
                    className={`
                      flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors group
                      ${isActive 
                        ? 'bg-rif-blue-500 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FontAwesomeIcon 
                        icon={info.icon} 
                        className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} 
                      />
                      <span className="font-medium truncate">{info.label}</span>
                    </div>
                    {count > 0 && (
                      <span className={`
                        text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ml-2
                        ${isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}
                      `}>
                        {count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </aside>

      {/* Mobile Menu Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faBars} className="h-5 w-5 text-gray-700" />
            <span className="font-medium text-gray-900">
              {currentCategory === 'all' ? 'All Categories' : categoryInfo[currentCategory]?.label || 'Categories'}
            </span>
          </div>
          <FontAwesomeIcon 
            icon={isMobileMenuOpen ? faTimes : faBars} 
            className="h-5 w-5 text-gray-700" 
          />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mb-6 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-4 space-y-1">
            {categories.map((category) => {
              const info = categoryInfo[category];
              const isActive = currentCategory === category;
              const count = category === 'all' 
                ? Object.values(guideCounts).reduce((a, b) => a + b, 0)
                : guideCounts[category] || 0;

              return (
                <Link
                  key={category}
                  href={category === 'all' ? '/guides' : `/guides?category=${category}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-rif-blue-500 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={info.icon} className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{info.label}</div>
                      <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                        {info.description}
                      </div>
                    </div>
                  </div>
                  {count > 0 && (
                    <span className={`
                      text-xs px-2 py-1 rounded-full font-medium
                      ${isActive ? 'bg-white/20' : 'bg-gray-200'}
                    `}>
                      {count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}













