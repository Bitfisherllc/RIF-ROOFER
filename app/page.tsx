'use client';

import { useState, useEffect, useRef } from 'react';
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
  faPhone,
  faEnvelope,
  faGlobe,
  faStar,
  faBullhorn,
} from '@fortawesome/free-solid-svg-icons';
import Logo from '@/components/Logo';
import { getPreferredRoofers, getSponsoredRoofers } from '@/app/roofers/data/roofers';
import type { RooferData } from '@/app/roofers/data/roofers';

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
    showLogo: true,
    headline: 'Welcome to',
    headlineHighlight: 'Roofers In Florida',
    subtitle: 'Your trusted resource for finding a Stone Coated Roofer In Florida. We connect homeowners with certified, trained professionals who install stone-coated metal roofing systems correctly and consistently across the Sunshine State.',
  },
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
  const [featuredPreferred, setFeaturedPreferred] = useState<RooferData | null>(null);
  const [featuredSponsored, setFeaturedSponsored] = useState<RooferData | null>(null);
  const [heroBackgroundImage, setHeroBackgroundImage] = useState<string | null>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // First slide (index 0) stays visible longer - 10 seconds
    // All other slides rotate every 5 seconds
    const getSlideDuration = (slideIndex: number) => {
      return slideIndex === 0 ? 10000 : 5000;
    };

    const scheduleNext = () => {
      const duration = getSlideDuration(currentSlide);
      const timeout = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, duration);
      return timeout;
    };

    const timeout = scheduleNext();

    return () => clearTimeout(timeout);
  }, [currentSlide]);

  // Load hero background image
  useEffect(() => {
    const fetchHeroBackground = async () => {
      try {
        const response = await fetch('/api/admin/hero-background');
        if (response.ok) {
          const data = await response.json();
          if (data.imageUrl) {
            setHeroBackgroundImage(data.imageUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching hero background:', error);
      }
    };
    fetchHeroBackground();
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load and randomly select featured roofers on mount
  useEffect(() => {
    try {
      const preferred = getPreferredRoofers();
      const sponsored = getSponsoredRoofers();

      // Randomly select one preferred roofer
      if (preferred.length > 0) {
        const randomPreferred = preferred[Math.floor(Math.random() * preferred.length)];
        setFeaturedPreferred(randomPreferred);
      }

      // Randomly select one sponsored roofer
      if (sponsored.length > 0) {
        const randomSponsored = sponsored[Math.floor(Math.random() * sponsored.length)];
        setFeaturedSponsored(randomSponsored);
      }
    } catch (error) {
      console.error('Error loading featured roofers:', error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Rotating Carousel */}
      <section 
        ref={heroSectionRef}
        className="pt-20 pb-16 px-6 relative overflow-hidden"
      >
        {/* Background image with blur animation and parallax */}
        {heroBackgroundImage && (
          <div
            className="absolute inset-0 hero-background-blur"
            style={{
              backgroundImage: `url('${heroBackgroundImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: `center ${50 + scrollY * 0.3}%`,
              backgroundRepeat: 'no-repeat',
              transform: `translateY(${scrollY * 0.5}px)`,
              willChange: 'transform, background-position',
            }}
          />
        )}
        <div className="max-w-5xl mx-auto text-center relative z-10">
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
                {slide.showLogo && (
                  <div className="mb-6">
                    <Logo variant="full" color="blue" width={240} priority={index === 0} />
                  </div>
                )}
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
          <div className="flex justify-center gap-2">
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
                Distributor-level pricing on materials for <span className="rif-brand">RiF</span>-backed projects.
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
                Explore Service Areas
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
                  Become a certified <span className="rif-brand">RiF</span> installer and grow your business with expert-led courses.
                </p>
                <Link
                  href="/training"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-rif-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-rif-blue-600 transition-colors"
                >
                  Explore Training
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
                      <h3 className="font-semibold text-rif-black mb-1"><span className="rif-brand">RiF</span> Certification</h3>
                      <p className="text-gray-600 text-sm">Become a certified installer and join our network</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Roofers Section */}
      {(featuredPreferred || featuredSponsored) && (
        <section className="py-20 px-6 bg-white border-t border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-semibold text-rif-black mb-4">
                Featured Roofers
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet some of our certified and sponsored roofing professionals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Featured Certified Roofer */}
              {featuredPreferred && (
                <Link
                  href={`/roofers/${featuredPreferred.slug}`}
                  className="group block bg-gradient-to-br from-green-50 to-card-green-100 rounded-2xl p-8 border-2 border-card-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-card-green-500 rounded-xl">
                        <FontAwesomeIcon icon={faCertificate} className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <span className="inline-block px-3 py-1 bg-card-green-500 text-white text-xs font-bold rounded-full mb-2">
                          <span className="rif-brand">RiF</span> CERTIFIED
                        </span>
                        <h3 className="text-2xl font-bold text-rif-black group-hover:text-card-green-600 transition-colors">
                          {featuredPreferred.name}
                        </h3>
                      </div>
                    </div>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="h-5 w-5 text-gray-400 group-hover:text-card-green-500 group-hover:translate-x-1 transition-all"
                    />
                  </div>

                  {(featuredPreferred.city || featuredPreferred.state) && (
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 text-card-green-500" />
                      <span>
                        {featuredPreferred.city && featuredPreferred.city}
                        {featuredPreferred.city && featuredPreferred.state && ', '}
                        {featuredPreferred.state && featuredPreferred.state}
                      </span>
                    </div>
                  )}

                  {featuredPreferred.phone && (
                    <div className="flex items-center gap-2 text-gray-700 mb-2">
                      <FontAwesomeIcon icon={faPhone} className="h-4 w-4 text-card-green-500" />
                      <a
                        href={`tel:${featuredPreferred.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-card-green-600 transition-colors"
                      >
                        {featuredPreferred.phone}
                      </a>
                    </div>
                  )}

                  {featuredPreferred.websiteUrl && (
                    <div className="flex items-center gap-2 text-gray-700 mb-4">
                      <FontAwesomeIcon icon={faGlobe} className="h-4 w-4 text-card-green-500" />
                      <a
                        href={featuredPreferred.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-card-green-600 transition-colors text-sm truncate"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-card-green-200">
                    <span className="text-sm text-gray-600">View Full Profile →</span>
                  </div>
                </Link>
              )}

              {/* Featured Sponsored Roofer */}
              {featuredSponsored && (
                <Link
                  href={`/roofers/${featuredSponsored.slug}`}
                  className="group block bg-gradient-to-br from-rif-blue-50 to-rif-blue-100 rounded-2xl p-8 border-2 border-rif-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-rif-blue-500 rounded-xl">
                        <FontAwesomeIcon icon={faBullhorn} className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <span className="inline-block px-3 py-1 bg-rif-blue-500 text-white text-xs font-bold rounded-full mb-2">
                          SPONSORED ROOFER
                        </span>
                        <h3 className="text-2xl font-bold text-rif-black group-hover:text-rif-blue-600 transition-colors">
                          {featuredSponsored.name}
                        </h3>
                      </div>
                    </div>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="h-5 w-5 text-gray-400 group-hover:text-rif-blue-500 group-hover:translate-x-1 transition-all"
                    />
                  </div>

                  {(featuredSponsored.city || featuredSponsored.state) && (
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 text-rif-blue-500" />
                      <span>
                        {featuredSponsored.city && featuredSponsored.city}
                        {featuredSponsored.city && featuredSponsored.state && ', '}
                        {featuredSponsored.state && featuredSponsored.state}
                      </span>
                    </div>
                  )}

                  {featuredSponsored.phone && (
                    <div className="flex items-center gap-2 text-gray-700 mb-2">
                      <FontAwesomeIcon icon={faPhone} className="h-4 w-4 text-rif-blue-500" />
                      <a
                        href={`tel:${featuredSponsored.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-rif-blue-500 transition-colors"
                      >
                        {featuredSponsored.phone}
                      </a>
                    </div>
                  )}

                  {featuredSponsored.websiteUrl && (
                    <div className="flex items-center gap-2 text-gray-700 mb-4">
                      <FontAwesomeIcon icon={faGlobe} className="h-4 w-4 text-rif-blue-500" />
                      <a
                        href={featuredSponsored.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-rif-blue-600 transition-colors text-sm truncate"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-rif-blue-200">
                    <span className="text-sm text-gray-600">View Full Profile →</span>
                  </div>
                </Link>
              )}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/roofers"
                className="inline-flex items-center gap-2 px-6 py-3 bg-rif-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-rif-blue-600 transition-colors"
              >
                View All Roofers
                <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}














