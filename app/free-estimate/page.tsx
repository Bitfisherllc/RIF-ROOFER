'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faSpinner,
  faCheckCircle,
  faExclamationCircle,
  faUser,
  faHome,
  faMessage,
  faCalculator,
  faHeart,
  faCheckSquare,
  faSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Turnstile } from '@marsidev/react-turnstile';

interface FavoriteRoofer {
  id: string;
  slug: string;
  name: string;
  phone?: string;
  email?: string;
  websiteUrl?: string;
}

const STORAGE_KEY = 'rif-favorite-roofers';

export default function FreeEstimatePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [favoriteRoofers, setFavoriteRoofers] = useState<FavoriteRoofer[]>([]);
  const [selectedRoofers, setSelectedRoofers] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    city: '',
    zipCode: '',
    projectType: '',
    roofSize: '',
    preferredContact: 'phone',
    bestTimeToContact: '',
    message: '',
    hearAboutUs: '',
    website: '', // Honeypot field
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Check authentication and load saved data
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        
        if (data.authenticated) {
          setIsAuthenticated(true);
          
          // Load favorite roofers from localStorage
          try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
              const favorites = JSON.parse(stored) as FavoriteRoofer[];
              setFavoriteRoofers(favorites);
              // Pre-select all saved roofers
              setSelectedRoofers(new Set(favorites.map(r => r.id)));
            }
          } catch (error) {
            console.error('Error loading favorites:', error);
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      }
    };

    checkAuth();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  const toggleRooferSelection = (rooferId: string) => {
    setSelectedRoofers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rooferId)) {
        newSet.delete(rooferId);
      } else {
        newSet.add(rooferId);
      }
      return newSet;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setErrorMessage('');
    setIsSubmitting(true);

    // Get selected roofers data
    const includedRoofers = favoriteRoofers.filter(r => selectedRoofers.has(r.id));

    try {
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
          savedRoofers: includedRoofers.length > 0 ? includedRoofers : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setSubmitStatus('success');
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        propertyAddress: '',
        city: '',
        zipCode: '',
        projectType: '',
        roofSize: '',
        preferredContact: 'phone',
        bestTimeToContact: '',
        message: '',
        hearAboutUs: '',
        website: '',
      });
      setTurnstileToken(null);
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-rif-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-rif-blue-500 rounded-full mb-6">
            <FontAwesomeIcon icon={faCalculator} className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black mb-6 tracking-tight">
            Free Roofing Estimate
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Get a free, no-obligation estimate for your roofing project. Our certified contractors will assess your needs and provide you with a detailed quote.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-rif-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faCalculator} className="h-8 w-8 text-rif-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-rif-black mb-2">Free & Fast</h3>
              <p className="text-gray-600">Get your estimate quickly with no hidden fees or obligations</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-rif-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faHome} className="h-8 w-8 text-rif-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-rif-black mb-2">Expert Assessment</h3>
              <p className="text-gray-600">Our certified professionals will evaluate your roofing needs</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-rif-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faCheckCircle} className="h-8 w-8 text-rif-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-rif-black mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">Work with trusted, certified RIF contractors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Estimate Request Form */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-rif-black mb-6 text-center">
              Request Your Free Estimate
            </h2>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-green-800 font-semibold">Thank you for your request!</p>
                  <p className="text-green-700 text-sm mt-1">
                    We've received your estimate request and will contact you shortly to schedule your free assessment.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <FontAwesomeIcon icon={faExclamationCircle} className="h-5 w-5 text-red-600" />
                <p className="text-red-800">{errorMessage || 'Something went wrong. Please try again.'}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                    />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                    />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                    />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="hearAboutUs" className="block text-sm font-medium text-gray-700 mb-2">
                    How did you hear about us?
                  </label>
                  <select
                    id="hearAboutUs"
                    name="hearAboutUs"
                    value={formData.hearAboutUs}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all"
                  >
                    <option value="">Select an option</option>
                    <option value="search">Search Engine (Google, Bing, etc.)</option>
                    <option value="referral">Referral from friend/family</option>
                    <option value="social">Social Media</option>
                    <option value="advertisement">Advertisement</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Property Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold text-rif-black mb-4">Property Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700 mb-2">
                      Property Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faHome}
                        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                      />
                      <input
                        type="text"
                        id="propertyAddress"
                        name="propertyAddress"
                        required
                        value={formData.propertyAddress}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all"
                        placeholder="123 Main Street"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all"
                      placeholder="Tampa"
                    />
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all"
                      placeholder="33601"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold text-rif-black mb-4">Project Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all"
                    >
                      <option value="">Select project type</option>
                      <option value="new-installation">New Installation</option>
                      <option value="roof-replacement">Roof Replacement</option>
                      <option value="repair">Repair</option>
                      <option value="inspection">Inspection</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="roofSize" className="block text-sm font-medium text-gray-700 mb-2">
                      Roof Size (Square Feet)
                    </label>
                    <input
                      type="text"
                      id="roofSize"
                      name="roofSize"
                      value={formData.roofSize}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all"
                      placeholder="e.g., 2000"
                    />
                  </div>

                  <div>
                    <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Contact Method
                    </label>
                    <select
                      id="preferredContact"
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all"
                    >
                      <option value="phone">Phone</option>
                      <option value="email">Email</option>
                      <option value="either">Either</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="bestTimeToContact" className="block text-sm font-medium text-gray-700 mb-2">
                      Best Time to Contact
                    </label>
                    <select
                      id="bestTimeToContact"
                      name="bestTimeToContact"
                      value={formData.bestTimeToContact}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all"
                    >
                      <option value="">Select time</option>
                      <option value="morning">Morning (8am - 12pm)</option>
                      <option value="afternoon">Afternoon (12pm - 5pm)</option>
                      <option value="evening">Evening (5pm - 8pm)</option>
                      <option value="anytime">Anytime</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Saved Roofers Section - Only for logged-in users */}
              {isAuthenticated && (
                <div className="border-t border-gray-200 pt-6">
                  {favoriteRoofers.length > 0 ? (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-rif-black mb-1">
                            Include Saved Roofers
                          </h3>
                          <p className="text-sm text-gray-600">
                            Select any saved roofers you'd like us to contact for your estimate
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (selectedRoofers.size === favoriteRoofers.length) {
                              setSelectedRoofers(new Set());
                            } else {
                              setSelectedRoofers(new Set(favoriteRoofers.map(r => r.id)));
                            }
                          }}
                          className="text-sm text-rif-blue-500 hover:text-rif-blue-600 font-medium"
                        >
                          {selectedRoofers.size === favoriteRoofers.length ? 'Deselect All' : 'Select All'}
                        </button>
                      </div>
                      <div className="space-y-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
                        {favoriteRoofers.map((roofer) => (
                          <label
                            key={roofer.id}
                            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-rif-blue-300 cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={selectedRoofers.has(roofer.id)}
                              onChange={() => toggleRooferSelection(roofer.id)}
                              className="w-5 h-5 text-rif-blue-500 border-gray-300 rounded focus:ring-rif-blue-500"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{roofer.name}</div>
                              {roofer.phone && (
                                <div className="text-sm text-gray-600">{roofer.phone}</div>
                              )}
                            </div>
                            <Link
                              href={`/roofers/${roofer.slug}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-sm text-rif-blue-500 hover:text-rif-blue-600 font-medium"
                            >
                              View →
                            </Link>
                          </label>
                        ))}
                      </div>
                      {selectedRoofers.size > 0 && (
                        <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                          <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-600" />
                          {selectedRoofers.size} roofer{selectedRoofers.size !== 1 ? 's' : ''} will be included in your estimate request
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <FontAwesomeIcon icon={faHeart} className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-blue-900 mb-1">
                            Save Roofers for Easy Access
                          </h3>
                          <p className="text-sm text-blue-800 mb-2">
                            You don't have any saved roofers yet. Save your favorite roofers to quickly include them in estimate requests.
                          </p>
                          <Link
                            href="/roofers"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                          >
                            Browse Roofers →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Additional Information */}
              <div className="border-t border-gray-200 pt-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information or Questions
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faMessage}
                    className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                  />
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all resize-none"
                    placeholder="Tell us about your roofing needs, timeline, or any specific requirements..."
                  />
                </div>
              </div>

              {/* Honeypot field (hidden from users) */}
              <div className="hidden">
                <label htmlFor="website">Website (leave blank)</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Turnstile */}
              <div className="flex justify-center">
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onError={() => setTurnstileToken(null)}
                  onExpire={() => setTurnstileToken(null)}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !turnstileToken}
                  className="px-8 py-4 bg-rif-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-rif-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin className="h-5 w-5" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCalculator} className="h-5 w-5" />
                      Request Free Estimate
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black mb-6">
            Prefer to Call?
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Speak directly with our team to discuss your roofing project and schedule your free estimate over the phone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:813-777-8272"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium"
            >
              <FontAwesomeIcon icon={faPhone} className="h-5 w-5" />
              Call: 813-777-8272
            </a>
            <a
              href="tel:813-803-4599"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
            >
              <FontAwesomeIcon icon={faPhone} className="h-5 w-5" />
              Office: 813-803-4599
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
