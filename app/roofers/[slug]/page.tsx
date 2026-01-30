import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCertificate,
  faPhone,
  faEnvelope,
  faGlobe,
  faMapLocationDot,
  faArrowLeft,
  faShield,
  faFileContract,
  faStar,
  faFax,
  faUsers,
  faHistory,
  faAward,
  faTools,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';
import { getRooferBySlug, getAllRoofers } from '../data/roofers';
import { searchData } from '@/app/service-areas/data/search-data';
import FavoriteButton from '@/components/FavoriteButton';
import { getYelpReviewsForRoofer, hasYelpReviews } from '../data/yelp-reviews';
import YelpReviewSummary from '@/components/YelpReviewSummary';
import RooferLocationMap from '@/components/RooferLocationMap';

export async function generateStaticParams() {
  const roofers = getAllRoofers();
  return roofers.map((roofer) => ({
    slug: roofer.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const roofer = getRooferBySlug(params.slug);
  
  if (!roofer) {
    return {
      title: 'Roofer Not Found | RIF',
    };
  }

  return {
    title: `${roofer.name} | RIF Roofing Network`,
    description: roofer.aboutText
      ? `${roofer.aboutText.substring(0, 155)}...`
      : `Professional roofing contractor serving Florida. ${roofer.isPreferred ? 'Preferred RIF Contractor.' : ''}`,
  };
}

export default function RooferProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const roofer = getRooferBySlug(params.slug);
  const yelpData = roofer ? getYelpReviewsForRoofer(roofer.id) : null;
  const hasYelp = roofer ? hasYelpReviews(roofer.id) : false;

  if (!roofer) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-rif-black mb-4">
            Roofer Not Found
          </h1>
          <Link
            href="/roofers"
            className="text-rif-blue-500 hover:text-rif-blue-600"
          >
            ← Back to Roofers
          </Link>
        </div>
      </div>
    );
  }

  // Get service area links
  const serviceAreaLinks: Array<{ name: string; path: string; type: string }> = [];
  
  if (roofer.serviceAreas.regions) {
    roofer.serviceAreas.regions.forEach((regionSlug) => {
      const region = searchData.find(
        (item) => item.type === 'region' && item.slug === regionSlug
      );
      if (region) {
        serviceAreaLinks.push({
          name: region.name,
          path: region.path,
          type: 'Region',
        });
      }
    });
  }
  
  if (roofer.serviceAreas.counties) {
    roofer.serviceAreas.counties.forEach((countySlug) => {
      const county = searchData.find(
        (item) => item.type === 'county' && item.slug === countySlug
      );
      if (county) {
        serviceAreaLinks.push({
          name: county.name,
          path: county.path,
          type: 'County',
        });
      }
    });
  }
  
  if (roofer.serviceAreas.cities) {
    roofer.serviceAreas.cities.forEach((citySlug) => {
      const city = searchData.find(
        (item) => item.type === 'city' && item.slug === citySlug
      );
      if (city) {
        serviceAreaLinks.push({
          name: city.name,
          path: city.path,
          type: 'City',
        });
      }
    });
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-rif-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/roofers"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-rif-blue-500 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
              Back to Roofers
            </Link>
          </div>
          
          <div className="flex items-start gap-6 mb-6">
            {roofer.logoUrl && (
              <img
                src={roofer.logoUrl}
                alt={`${roofer.name} logo`}
                className="w-24 h-24 object-contain rounded-lg border border-gray-200 bg-white p-2"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h1 className="text-4xl md:text-5xl font-semibold text-rif-black flex-1 min-w-[200px]">
                  {roofer.name}
                </h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <FavoriteButton
                    rooferId={roofer.id}
                    rooferSlug={roofer.slug}
                    rooferName={roofer.name}
                    rooferPhone={roofer.phone}
                    rooferEmail={roofer.email}
                    rooferWebsiteUrl={roofer.websiteUrl}
                    rooferListingType={roofer.category === 'preferred' || roofer.isPreferred ? 'preferred' : roofer.category === 'sponsored' ? 'sponsored' : 'general'}
                    size="lg"
                  />
                  {roofer.category === 'preferred' || roofer.isPreferred ? (
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-card-green-500 to-card-green-600 text-white rounded-full text-sm font-bold shadow-lg border-2 border-card-green-700">
                      <FontAwesomeIcon icon={faCertificate} className="h-4 w-4" />
                      <span className="rif-brand">RiF</span> Certified
                    </div>
                  ) : roofer.category === 'sponsored' ? (
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-card-blue-500 to-card-blue-600 text-white rounded-full text-sm font-bold shadow-lg border-2 border-card-blue-700">
                      <FontAwesomeIcon icon={faCertificate} className="h-4 w-4" />
                      Sponsored
                    </div>
                  ) : roofer.category === 'general' ? (
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full text-sm font-bold shadow-lg border-2 border-gray-700">
                      <FontAwesomeIcon icon={faCertificate} className="h-4 w-4" />
                      General Listing
                    </div>
                  ) : null}
                </div>
              </div>
              
              {/* 4-Star Rating for Preferred Roofers */}
              {(roofer.isPreferred || roofer.category === 'preferred') && (
                <div className="mt-4 mb-4 p-4 bg-gradient-to-r from-yellow-50 via-white to-blue-50 rounded-xl border-2 border-yellow-300 shadow-md">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faStar} className="h-6 w-6 text-yellow-400" />
                      <FontAwesomeIcon icon={faStar} className="h-6 w-6 text-yellow-400" />
                      <FontAwesomeIcon icon={faStar} className="h-6 w-6 text-yellow-400" />
                      <FontAwesomeIcon icon={faStar} className="h-6 w-6 text-yellow-400" />
                      <FontAwesomeIcon icon={faStar} className="h-6 w-6 text-gray-300" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-gray-900">4.0 Rating</span>
                      <span className="text-sm text-gray-600">Top Rated Preferred Contractor</span>
                    </div>
                    <span className="ml-auto px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold border-2 border-yellow-300">
                      Best Choice ⭐
                    </span>
                  </div>
                </div>
              )}
              {roofer.licenseNumber && (
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FontAwesomeIcon icon={faFileContract} className="h-4 w-4" />
                  <span>License: {roofer.licenseNumber}</span>
                </div>
              )}
              {/* Hide address for General listings */}
              {roofer.category !== 'general' && (roofer.address || roofer.city) && (
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4" />
                  <span>
                    {roofer.address && roofer.address}
                    {roofer.address && roofer.city && ', '}
                    {roofer.city && roofer.city}
                    {roofer.state && `, ${roofer.state}`}
                    {roofer.zipCode && ` ${roofer.zipCode}`}
                  </span>
                </div>
              )}
              {roofer.yearsInBusiness && (
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FontAwesomeIcon icon={faCertificate} className="h-4 w-4" />
                  <span>In Business: {roofer.yearsInBusiness} years</span>
                </div>
              )}
              {(roofer as any).bbbRating && (
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FontAwesomeIcon icon={faShield} className="h-4 w-4" />
                  <span>
                    BBB Rating: {(roofer as any).bbbRating}
                    {(roofer as any).bbbAccredited ? ' (Accredited)' : ' (Not Accredited)'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Contact Information - Hidden for General listings (including undefined/default) */}
          {(roofer.category === 'preferred' || roofer.category === 'sponsored') && (
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h2 className="text-2xl font-semibold text-rif-black mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                {roofer.phone && (
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="h-5 w-5 text-rif-blue-500"
                    />
                    <a
                      href={`tel:${roofer.phone}`}
                      className="text-lg text-gray-700 hover:text-rif-blue-500 transition-colors"
                    >
                      {roofer.phone}
                    </a>
                  </div>
                )}
                
                {roofer.email && (
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="h-5 w-5 text-rif-blue-500"
                    />
                    <a
                      href={`mailto:${roofer.email}`}
                      className="text-lg text-gray-700 hover:text-rif-blue-500 transition-colors"
                    >
                      {roofer.email}
                    </a>
                  </div>
                )}
                
                {roofer.websiteUrl && (
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon
                      icon={faGlobe}
                      className="h-5 w-5 text-rif-blue-500"
                    />
                    <a
                      href={roofer.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-gray-700 hover:text-rif-blue-500 transition-colors"
                    >
                      Visit Website
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="h-3 w-3 ml-1 rotate-180 inline"
                      />
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* About */}
          {roofer.aboutText && (
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h2 className="text-2xl font-semibold text-rif-black mb-4">
                About {roofer.name}
              </h2>
              <div
                className="text-lg text-gray-700 leading-relaxed prose prose-lg max-w-none prose-headings:mt-8 prose-headings:mb-4 prose-headings:text-rif-black prose-p:mb-6 prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: roofer.aboutText }}
              />
            </div>
          )}

          {/* Specialties */}
          {roofer.specialties && roofer.specialties.length > 0 && (
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-6">
                <FontAwesomeIcon icon={faCertificate} className="h-6 w-6 text-rif-blue-500" />
                Services & Specialties
              </h2>
              <p className="text-gray-700 mb-6">
                {roofer.name} offers the following roofing services:
              </p>
              <div className="flex flex-wrap gap-3">
                {roofer.specialties.map((specialty, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-rif-blue-50 hover:text-rif-blue-600 rounded-lg transition-colors border border-gray-200"
                  >
                    <FontAwesomeIcon
                      icon={faCertificate}
                      className="h-4 w-4 text-rif-blue-500"
                    />
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Additional Services */}
          {(roofer as any).additionalServices && (roofer as any).additionalServices.length > 0 && (
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-6">
                <FontAwesomeIcon icon={faTools} className="h-6 w-6 text-rif-blue-500" />
                Additional Services
              </h2>
              <ul className="space-y-2">
                {(roofer as any).additionalServices.map((service: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <FontAwesomeIcon icon={faCertificate} className="h-4 w-4 text-rif-blue-500 mt-1 flex-shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Team Information */}
          {(roofer as any).team && (
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-6">
                <FontAwesomeIcon icon={faUsers} className="h-6 w-6 text-rif-blue-500" />
                Team Information
              </h2>
              <div className="space-y-4">
                {(roofer as any).team.owner && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Owner:</span>
                    <p className="text-gray-900 text-lg font-medium mt-1">{(roofer as any).team.owner}</p>
                  </div>
                )}
                {(roofer as any).team.experience && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Team Experience:</span>
                    <p className="text-gray-900 mt-1">{(roofer as any).team.experience}</p>
                  </div>
                )}
                {(roofer as any).team.background && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Background:</span>
                    <p className="text-gray-900 mt-1">{(roofer as any).team.background}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Company History */}
          {(roofer as any).history && (
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-6">
                <FontAwesomeIcon icon={faHistory} className="h-6 w-6 text-rif-blue-500" />
                Company History
              </h2>
              <div className="space-y-4">
                {(roofer as any).history.founded && (
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faClock} className="h-5 w-5 text-rif-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-gray-500">Founded:</span>
                      <p className="text-gray-900 mt-1">
                        {new Date((roofer as any).history.founded).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                )}
                {(roofer as any).history.founderStarted && (
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faHistory} className="h-5 w-5 text-rif-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-gray-500">Founder Started:</span>
                      <p className="text-gray-900 mt-1">{(roofer as any).history.founderStarted}</p>
                    </div>
                  </div>
                )}
                {(roofer as any).history.movedToJacksonville && (
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faMapLocationDot} className="h-5 w-5 text-rif-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-gray-500">Relocated to Jacksonville:</span>
                      <p className="text-gray-900 mt-1">{(roofer as any).history.movedToJacksonville}</p>
                    </div>
                  </div>
                )}
                {(roofer as any).history.formedAfter && (
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCertificate} className="h-5 w-5 text-rif-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-gray-500">Company Formed After:</span>
                      <p className="text-gray-900 mt-1">{(roofer as any).history.formedAfter}</p>
                    </div>
                  </div>
                )}
                {(roofer as any).history.notableAchievements && (roofer as any).history.notableAchievements.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-500 mb-2 block">Notable Achievements:</span>
                    <ul className="space-y-2 ml-6">
                      {(roofer as any).history.notableAchievements.map((achievement: string, idx: number) => (
                        <li key={idx} className="text-gray-900 list-disc">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Certifications */}
          {(roofer as any).certifications && (roofer as any).certifications.length > 0 && (
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-6">
                <FontAwesomeIcon icon={faAward} className="h-6 w-6 text-rif-blue-500" />
                Certifications & Qualifications
              </h2>
              <div className="flex flex-wrap gap-3">
                {(roofer as any).certifications.map((certification: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg transition-colors border border-blue-200"
                  >
                    <FontAwesomeIcon
                      icon={faAward}
                      className="h-4 w-4 text-blue-600"
                    />
                    {certification}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Additional Services */}
          {(roofer as any).additionalServices && (roofer as any).additionalServices.length > 0 && (
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-6">
                <FontAwesomeIcon icon={faTools} className="h-6 w-6 text-rif-blue-500" />
                Additional Services
              </h2>
              <ul className="space-y-2">
                {(roofer as any).additionalServices.map((service: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <FontAwesomeIcon icon={faCertificate} className="h-4 w-4 text-rif-blue-500 mt-1 flex-shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Team Information */}
          {(roofer as any).team && (
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-6">
                <FontAwesomeIcon icon={faUsers} className="h-6 w-6 text-rif-blue-500" />
                Team Information
              </h2>
              <div className="space-y-4">
                {(roofer as any).team.owner && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Owner:</span>
                    <p className="text-gray-900 text-lg font-medium mt-1">{(roofer as any).team.owner}</p>
                  </div>
                )}
                {(roofer as any).team.experience && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Team Experience:</span>
                    <p className="text-gray-900 mt-1">{(roofer as any).team.experience}</p>
                  </div>
                )}
                {(roofer as any).team.background && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Background:</span>
                    <p className="text-gray-900 mt-1">{(roofer as any).team.background}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Company History */}
          {(roofer as any).history && (
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-6">
                <FontAwesomeIcon icon={faHistory} className="h-6 w-6 text-rif-blue-500" />
                Company History
              </h2>
              <div className="space-y-4">
                {(roofer as any).history.founded && (
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faClock} className="h-5 w-5 text-rif-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-gray-500">Founded:</span>
                      <p className="text-gray-900 mt-1">
                        {new Date((roofer as any).history.founded).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                )}
                {(roofer as any).history.founderStarted && (
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faHistory} className="h-5 w-5 text-rif-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-gray-500">Founder Started:</span>
                      <p className="text-gray-900 mt-1">{(roofer as any).history.founderStarted}</p>
                    </div>
                  </div>
                )}
                {(roofer as any).history.movedToJacksonville && (
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faMapLocationDot} className="h-5 w-5 text-rif-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-gray-500">Relocated to Jacksonville:</span>
                      <p className="text-gray-900 mt-1">{(roofer as any).history.movedToJacksonville}</p>
                    </div>
                  </div>
                )}
                {(roofer as any).history.formedAfter && (
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCertificate} className="h-5 w-5 text-rif-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-gray-500">Company Formed After:</span>
                      <p className="text-gray-900 mt-1">{(roofer as any).history.formedAfter}</p>
                    </div>
                  </div>
                )}
                {(roofer as any).history.notableAchievements && (roofer as any).history.notableAchievements.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-500 mb-2 block">Notable Achievements:</span>
                    <ul className="space-y-2 ml-6">
                      {(roofer as any).history.notableAchievements.map((achievement: string, idx: number) => (
                        <li key={idx} className="text-gray-900 list-disc">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Certifications */}
          {(roofer as any).certifications && (roofer as any).certifications.length > 0 && (
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-6">
                <FontAwesomeIcon icon={faAward} className="h-6 w-6 text-rif-blue-500" />
                Certifications & Qualifications
              </h2>
              <div className="flex flex-wrap gap-3">
                {(roofer as any).certifications.map((certification: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg transition-colors border border-blue-200"
                  >
                    <FontAwesomeIcon
                      icon={faAward}
                      className="h-4 w-4 text-blue-600"
                    />
                    {certification}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Yelp Reviews Section */}
          {hasYelp && yelpData && (
            <YelpReviewSummary yelpData={yelpData} />
          )}

          {/* Service Areas */}
          {serviceAreaLinks.length > 0 && (
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-6">
                <FontAwesomeIcon icon={faMapLocationDot} className="h-6 w-6 text-rif-blue-500" />
                Service Areas
              </h2>
              <p className="text-gray-700 mb-6">
                {roofer.name} serves the following areas in Florida:
              </p>
              <div className="flex flex-wrap gap-3">
                {serviceAreaLinks.map((area, idx) => (
                  <Link
                    key={idx}
                    href={area.path}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-rif-blue-50 hover:text-rif-blue-600 rounded-lg transition-colors border border-gray-200"
                  >
                    <FontAwesomeIcon
                      icon={faMapLocationDot}
                      className="h-4 w-4 text-rif-blue-500"
                    />
                    {area.name}
                    <span className="text-xs text-gray-500">({area.type})</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* RIF Certification - Only for Preferred/Certified Roofers */}
          {(roofer.isPreferred || roofer.category === 'preferred') && (
            <div className="bg-rif-blue-50 p-8 rounded-2xl border-2 border-rif-blue-200">
              <div className="flex items-start gap-4">
                <FontAwesomeIcon
                  icon={faShield}
                  className="h-8 w-8 text-rif-blue-600 flex-shrink-0 mt-1"
                />
                <div>
                  <h3 className="text-xl font-semibold text-rif-black mb-2">
                    <span className="rif-brand">RiF</span> Certified Installer
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {roofer.name} is part of the <span className="rif-brand">RiF</span> network of certified
                    installers. All <span className="rif-brand">RiF</span> contractors are vetted, trained on specific
                    product systems, and held to higher standards for installation
                    quality and code compliance. Projects benefit from
                    distributor-level pricing and priority material availability.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Upgrade Prompt for General Listings */}
          {roofer.category === 'general' && (
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 rounded-2xl border-2 border-gray-300">
              <div className="flex items-start gap-4">
                <FontAwesomeIcon
                  icon={faCertificate}
                  className="h-8 w-8 text-rif-blue-600 flex-shrink-0 mt-1"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-rif-black mb-3">
                    Upgrade Your Listing
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    This is currently a <strong>free General Listing</strong> with hidden contact information. 
                    Upgrade to a <strong>Certified</strong> or <strong>Sponsored</strong> listing to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-2">
                    <li>Display your full contact information (phone, email, website, address)</li>
                    <li>Get better visibility and higher ranking in search results</li>
                    <li>Build trust with potential customers</li>
                    <li>Access additional <span className="rif-brand">RiF</span> network benefits (for Certified listings)</li>
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/partnerships/preferred-contractor"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium"
                    >
                      <FontAwesomeIcon icon={faCertificate} className="h-4 w-4" />
                      Learn About Certified Listing
                    </Link>
                    <Link
                      href="/partnerships/sponsorship-subscription"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
                    >
                      Learn About Sponsored results
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Location Map */}
          {(roofer.address || roofer.city) && (
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-6">
                <FontAwesomeIcon icon={faMapLocationDot} className="h-6 w-6 text-rif-blue-500" />
                Location
              </h2>
              <RooferLocationMap roofer={roofer} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}









