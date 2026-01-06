'use client';

import { useMemo, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faArrowRight, faFilter, faMap, faBuilding, faCity, faUsers } from '@fortawesome/free-solid-svg-icons';
import ServiceAreaSearch from '@/components/ServiceAreaSearch';
import { searchData } from './data/search-data';
import { getRoofersByServiceArea } from '@/app/roofers/data/roofers';

const regions = [
  {
    name: 'Sun Coast',
    slug: 'sun-coast',
    description:
      'Florida\'s Sun Coast blends beach life and big city energy—plus salt air, summer storms, and hurricane winds.',
  },
  {
    name: 'Treasure Coast',
    slug: 'treasure-coast',
    description:
      'Stretching through Indian River, St. Lucie, Martin, and northern Palm Beach County, the Treasure Coast glitters with barrier-island beaches.',
  },
  {
    name: 'Southwest Florida',
    slug: 'southwest-florida',
    description:
      'From Sarasota to Naples, Southwest Florida\'s coast blends calm beach towns, mangrove islands, and sun-drenched neighborhoods.',
  },
  {
    name: 'South Florida',
    slug: 'south-florida',
    description:
      'From the high-rises of Miami to the breezy streets of Key West, South Florida demands roofs that handle tropical heat, salt air, and hurricane-force winds.',
  },
  {
    name: 'North Florida',
    slug: 'north-florida',
    description:
      'Stretching from the Gulf Coast to the Atlantic, North Florida blends historic charm and coastal weather that demands durable roofing.',
  },
  {
    name: 'Florida Panhandle',
    slug: 'florida-panhandle',
    description:
      'From Pensacola to Tallahassee, the Panhandle blends white-sand Emerald Coast beaches with pine-lined hills and Gulf winds.',
  },
  {
    name: 'First Coast',
    slug: 'first-coast',
    description:
      'From the brick streets of St. Augustine to the riverside neighborhoods of Jacksonville, Florida\'s First Coast blends centuries of history with Atlantic salt air.',
  },
  {
    name: 'Central Florida',
    slug: 'central-florida',
    description:
      'At the heart of the state, Central Florida blends theme-park skylines with quiet lakefront neighborhoods and rolling hills.',
  },
];

// Animated Stat Component
interface AnimatedStatProps {
  value: number;
  label: string;
  icon: any;
  delay?: number;
}

function AnimatedStat({ value, label, icon, delay = 0 }: AnimatedStatProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statRef.current) {
      observer.observe(statRef.current);
    }

    return () => {
      if (statRef.current) {
        observer.unobserve(statRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        currentStep++;
        const nextValue = Math.min(
          Math.ceil(increment * currentStep),
          value
        );
        setDisplayValue(nextValue);

        if (currentStep >= steps || nextValue >= value) {
          setDisplayValue(value);
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, value, delay]);

  return (
    <div
      ref={statRef}
      className="relative group"
    >
      <div className="flex flex-col items-center">
        {/* Icon with animation */}
        <div className="mb-3 relative">
          <div className="absolute inset-0 bg-rif-blue-500 rounded-full opacity-20 group-hover:opacity-30 animate-ping"></div>
          <div className="relative bg-gradient-to-br from-rif-blue-400 to-rif-blue-600 rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <FontAwesomeIcon
              icon={icon}
              className="h-6 w-6 text-white"
            />
          </div>
        </div>
        
        {/* Animated number */}
        <div className="text-3xl font-semibold text-rif-blue-500 mb-1 transition-all duration-300 group-hover:scale-110">
          {displayValue.toLocaleString()}
        </div>
        
        {/* Label */}
        <div className="text-sm text-gray-600 font-medium">{label}</div>
      </div>
    </div>
  );
}

export default function ServiceAreasPage() {
  // Calculate statistics from search data
  const stats = useMemo(() => {
    const regionsSet = new Set<string>();
    const countiesSet = new Set<string>();
    const citiesSet = new Set<string>();

    searchData.forEach((item) => {
      if (item.type === 'region') {
        regionsSet.add(item.slug);
      } else if (item.type === 'county') {
        countiesSet.add(item.slug);
      } else if (item.type === 'city') {
        citiesSet.add(item.slug);
      }
    });

    return {
      totalRegions: regionsSet.size,
      totalCounties: countiesSet.size,
      totalCities: citiesSet.size,
    };
  }, []);

  // Calculate roofer counts for each region
  const regionRooferCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    regions.forEach((region) => {
      const roofers = getRoofersByServiceArea(region.slug);
      counts[region.slug] = roofers.length;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Advanced Search */}
      <section className="pt-20 pb-16 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black mb-6 tracking-tight">
              <FontAwesomeIcon
                icon={faMapLocationDot}
                className="h-10 w-10 md:h-12 md:w-12 text-rif-blue-500 inline-block mr-4 align-middle"
              />
              Roofing Service Areas in Florida
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 font-light leading-relaxed">
              From Pensacola to Key West, RIF coordinates your roof replacement
              end‑to‑end—specs, permitting, delivery, installation, and final
              QA—using Certified Installers we train on each product system.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              As the installation arm of{' '}
              <strong className="text-rif-black">PRP Roofing</strong>, you get
              distributor‑backed pricing and in‑stock materials without the
              runaround. Search below or browse regions to see counties, cities,
              recent projects, and local permitting resources.
            </p>
          </div>

          {/* Advanced Search */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <FontAwesomeIcon icon={faFilter} className="h-6 w-6 text-rif-blue-500" />
              <h2 className="text-2xl font-semibold text-rif-black">Advanced Search</h2>
            </div>
            <ServiceAreaSearch variant="hero" />
            <p className="text-sm text-gray-500 mt-4 text-center">
              Search by city name, county, or region to find roofing services in your area
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 px-6 bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <AnimatedStat
              value={stats.totalRegions}
              label="Regions"
              icon={faMap}
              delay={0}
            />
            <AnimatedStat
              value={stats.totalCounties}
              label="Counties"
              icon={faBuilding}
              delay={200}
            />
            <AnimatedStat
              value={stats.totalCities}
              label="Cities"
              icon={faCity}
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* Regions Grid */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              RIF installs code‑compliant roofs across all Florida regions,
              managed by one accountable team and delivered by our Certified
              Installer Network. Because we're part of PRP Roofing, you benefit
              from distributor‑backed pricing and fast material availability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regions.map((region) => {
              const rooferCount = regionRooferCounts[region.slug] || 0;
              return (
                <Link
                  key={region.slug}
                  href={`/service-areas/${region.slug}`}
                  className="group block bg-white p-6 rounded-2xl border border-gray-200 hover:border-rif-blue-300 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <FontAwesomeIcon
                      icon={faMapLocationDot}
                      className="h-6 w-6 text-rif-blue-500 group-hover:text-rif-blue-600 transition-colors"
                    />
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="h-4 w-4 text-gray-400 group-hover:text-rif-blue-500 group-hover:translate-x-1 transition-all"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-semibold text-rif-black group-hover:text-rif-blue-500 transition-colors">
                      {region.name}
                    </h2>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-rif-blue-50 text-rif-blue-700 rounded-full text-xs font-semibold border border-rif-blue-200">
                      <FontAwesomeIcon icon={faUsers} className="h-3 w-3" />
                      <span>{rooferCount}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {region.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-rif-black mb-4">
            Find a Roofer Near You
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            If you're searching for a <strong>roofer near me</strong> in
            Florida, RIF — the{' '}
            <strong>installation division of Premium Roofing Products (PRP Roofing)</strong>{' '}
            — matches you with a local <strong>RIF Certified Installer</strong>{' '}
            and manages everything: financing, product selection, delivery,
            permits/HOA, installation, and final QA.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            <strong>Service Areas:</strong> We install across Florida through
            our certified partner network, including{' '}
            <strong>
              Fort Lauderdale, West Palm Beach, Port St. Lucie, Orlando, Tampa,
              St. Petersburg, Clearwater, Sarasota, Bradenton, Fort Myers,
              Naples, Jacksonville, Tallahassee, Gainesville, Pensacola
            </strong>
            , and more.
          </p>
        </div>
      </section>
    </div>
  );
}








