'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faMapLocationDot,
  faUsers,
  faBook,
  faCertificate,
  faBoxes,
  faDollarSign,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';

// Error boundary for debugging
if (typeof window !== 'undefined') {
  window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
  });
  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
  });
}

const heroSlides = [
  {
    headline: 'Find a Stone-Coated Metal',
    headlineHighlight: 'Roofer in Florida',
    subtitle: 'Connect with certified, trained roofers who install stone-coated metal roofing systems correctly and consistently across Florida.',
  },
  {
    headline: 'Certified Stone-Coated Metal',
    headlineHighlight: 'Roofing Contractors',
    subtitle: 'Expert installation across Florida with vetted professionals who meet higher standards for quality and code compliance.',
  },
  {
    headline: 'Storm-Resistant Roofing',
    headlineHighlight: 'Solutions in Florida',
    subtitle: 'Protect your home with durable metal roofing systems designed to withstand Florida\'s harsh weather conditions.',
  },
  {
    headline: 'Expert Metal Roof Installation',
    headlineHighlight: 'Across Florida',
    subtitle: 'Professional roofers you can trust for quality craftsmanship and reliable service throughout the Sunshine State.',
  },
  {
    headline: 'Florida\'s Trusted Stone-Coated',
    headlineHighlight: 'Metal Roofers',
    subtitle: 'Quality craftsmanship, priority materials access, and wholesale pricing for RIF-backed projects.',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Rotating Carousel */}
      <section className="pt-20 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative h-[280px] md:h-[320px] flex items-center justify-center">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide 
                    ? 'opacity-100 z-10' 
                    : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-rif-black mb-4 tracking-tight">
                  {slide.headline}
                  <br />
                  <span className="text-rif-blue-500">{slide.headlineHighlight}</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 font-light">
                  {slide.subtitle}
                </p>
              </div>
            ))}
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-rif-blue-500'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Free Estimate CTA */}
          <div className="mb-8">
            <Link
              href="/free-estimate"
              className="inline-flex items-center gap-3 px-8 py-4 bg-rif-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-rif-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Get Your Free Estimate
              <FontAwesomeIcon
                icon={faArrowRight}
                className="h-5 w-5"
              />
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/service-areas"
              className="flex items-center gap-2 text-base text-rif-blue-500 hover:text-rif-blue-600 transition-colors group"
            >
              Find Roofers by Location
              <FontAwesomeIcon
                icon={faArrowRight}
                className="h-4 w-4 group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <span className="hidden sm:inline text-gray-300">|</span>
            <Link
              href="/roofers"
              className="flex items-center gap-2 text-base text-rif-blue-500 hover:text-rif-blue-600 transition-colors group"
            >
              Browse All Roofers
              <FontAwesomeIcon
                icon={faArrowRight}
                className="h-4 w-4 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Apple-style grid */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-3">
                <FontAwesomeIcon icon={faCertificate} className="h-6 w-6 text-rif-blue-500" />
                Certified Roofers
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Vetted, trained professionals who meet higher standards for
                installation quality and code compliance.
              </p>
            </div>
            <div>
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-3">
                <FontAwesomeIcon icon={faBoxes} className="h-6 w-6 text-rif-blue-500" />
                Priority Materials
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Faster access to inventory and priority availability after storms
                or during high-demand periods.
              </p>
            </div>
            <div>
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-3">
                <FontAwesomeIcon icon={faDollarSign} className="h-6 w-6 text-rif-blue-500" />
                Wholesale Pricing
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Distributor-level pricing on materials for RIF-backed projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links - Apple-style */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="flex items-center justify-center gap-3 text-4xl font-semibold text-center mb-16 text-rif-black">
            <FontAwesomeIcon icon={faMapLocationDot} className="h-8 w-8 text-rif-blue-500" />
            Explore by Location
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/service-areas"
              className="group block p-8 hover:bg-gray-50 transition-colors rounded-2xl"
            >
              <h3 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-2 group-hover:text-rif-blue-500 transition-colors">
                <FontAwesomeIcon icon={faMapLocationDot} className="h-6 w-6" />
                Service Areas
              </h3>
              <p className="text-lg text-gray-600">
                Browse by region, county, and city
              </p>
            </Link>
            <Link
              href="/roofers"
              className="group block p-8 hover:bg-gray-50 transition-colors rounded-2xl"
            >
              <h3 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-2 group-hover:text-rif-blue-500 transition-colors">
                <FontAwesomeIcon icon={faUsers} className="h-6 w-6" />
                All Roofers
              </h3>
              <p className="text-lg text-gray-600">
                View our complete directory
              </p>
            </Link>
            <Link
              href="/guides"
              className="group block p-8 hover:bg-gray-50 transition-colors rounded-2xl"
            >
              <h3 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-2 group-hover:text-rif-blue-500 transition-colors">
                <FontAwesomeIcon icon={faBook} className="h-6 w-6" />
                Guides
              </h3>
              <p className="text-lg text-gray-600">
                Learn about roofing in Florida
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-rif-blue-500 rounded-xl">
                    <FontAwesomeIcon icon={faGraduationCap} className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-semibold text-rif-black">
                    Professional Training Programs
                  </h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Advance your career with comprehensive training in stone-coated metal roofing sales and installation. 
                  Become a certified RIF installer and grow your business with expert-led courses.
                </p>
                <Link
                  href="/training"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-rif-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-rif-blue-600 transition-colors"
                >
                  Explore Training Programs
                  <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5" />
                </Link>
              </div>
              <div className="bg-gradient-to-br from-rif-blue-50 to-rif-blue-100 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCertificate} className="h-5 w-5 text-rif-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-rif-black mb-1">Sales Training</h3>
                      <p className="text-gray-600 text-sm">Master product knowledge and sales techniques</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCertificate} className="h-5 w-5 text-rif-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-rif-black mb-1">Installation Training</h3>
                      <p className="text-gray-600 text-sm">Hands-on training for proper installation techniques</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCertificate} className="h-5 w-5 text-rif-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-rif-black mb-1">RIF Certification</h3>
                      <p className="text-gray-600 text-sm">Become a certified installer and join our network</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}














