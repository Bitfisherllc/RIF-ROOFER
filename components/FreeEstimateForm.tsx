'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faGlobe,
  faSpinner,
  faCheckCircle,
  faExclamationCircle,
  faUser,
  faHome,
  faMessage,
  faCalculator,
  faBox,
  faMapLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { Turnstile } from '@marsidev/react-turnstile';

type RooferListingType = 'preferred' | 'sponsored' | 'general';

interface FavoriteRoofer {
  id: string;
  slug: string;
  name: string;
  phone?: string;
  email?: string;
  websiteUrl?: string;
  listingType?: RooferListingType;
}

interface SavedProduct {
  slug: string;
  name: string;
  category: string;
  logo?: string;
}

interface SavedLocation {
  type: 'region' | 'county' | 'city';
  name: string;
  slug: string;
  path: string;
  county?: string;
  region?: string;
}

const STORAGE_KEY_ROOFERS = 'rif-favorite-roofers';
const STORAGE_KEY_PRODUCTS = 'rif-saved-products';
const STORAGE_KEY_LOCATIONS = 'rif-saved-locations';
const STORAGE_KEY_CONFIRMATION = 'rif-estimate-confirmation';

export default function FreeEstimateForm({ embedded = false }: { embedded?: boolean }) {
  const router = useRouter();
  const [favoriteRoofers, setFavoriteRoofers] = useState<FavoriteRoofer[]>([]);
  const [selectedRoofers, setSelectedRoofers] = useState<Set<string>>(new Set());
  const [favoriteProducts, setFavoriteProducts] = useState<SavedProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [favoriteLocations, setFavoriteLocations] = useState<SavedLocation[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    city: '',
    zipCode: '',
    quoteType: '' as '' | 'installation' | 'materials-only',
    projectType: '',
    roofSize: '',
    preferredContact: 'phone',
    bestTimeToContact: '',
    message: '',
    hearAboutUs: '',
    website: '',
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    try {
      const storedRoofers = localStorage.getItem(STORAGE_KEY_ROOFERS);
      if (storedRoofers) {
        const roofers = JSON.parse(storedRoofers) as FavoriteRoofer[];
        setFavoriteRoofers(roofers);
        setSelectedRoofers(new Set(roofers.map((r) => r.id)));
        (async () => {
          try {
            const res = await fetch('/api/roofers/listing-types');
            if (res.ok) {
              const listingTypes = (await res.json()) as Record<string, RooferListingType>;
              setFavoriteRoofers((prev) =>
                prev.map((r) => ({
                  ...r,
                  listingType: listingTypes[r.id] ?? r.listingType ?? 'general',
                }))
              );
            }
          } catch {
            // keep roofers as-is if fetch fails
          }
        })();
      }
    } catch (error) {
      console.error('Error loading favorite roofers:', error);
    }

    try {
      const storedProducts = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (storedProducts) {
        const products = JSON.parse(storedProducts) as SavedProduct[];
        setFavoriteProducts(products);
        setSelectedProducts(new Set(products.map((p) => p.slug)));
      }
      const storedLocations = localStorage.getItem(STORAGE_KEY_LOCATIONS);
      if (storedLocations) {
        const locations = JSON.parse(storedLocations) as SavedLocation[];
        setFavoriteLocations(locations);
        setSelectedLocations(new Set(locations.map((l) => l.path)));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'quoteType') {
        if (value === 'materials-only') next.projectType = 'materials-only';
        else if (value === 'installation') next.projectType = '';
      }
      return next;
    });
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  const toggleRooferSelection = (rooferId: string) => {
    setSelectedRoofers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rooferId)) newSet.delete(rooferId);
      else newSet.add(rooferId);
      return newSet;
    });
  };

  const toggleProductSelection = (slug: string) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(slug)) newSet.delete(slug);
      else newSet.add(slug);
      return newSet;
    });
  };

  const toggleLocationSelection = (path: string) => {
    setSelectedLocations((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) newSet.delete(path);
      else newSet.add(path);
      return newSet;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setErrorMessage('');
    if (!formData.quoteType) {
      setSubmitStatus('error');
      setErrorMessage('Please select whether you want an installation quote or a materials-only quote.');
      return;
    }
    if (formData.quoteType === 'installation' && !formData.projectType) {
      setSubmitStatus('error');
      setErrorMessage('Please select your project type for the installation quote.');
      return;
    }
    setIsSubmitting(true);

    const includedRoofers = favoriteRoofers.filter((r) => selectedRoofers.has(r.id));
    const includedProducts = favoriteProducts.filter((p) => selectedProducts.has(p.slug));
    const includedLocations = favoriteLocations.filter((l) => selectedLocations.has(l.path));
    const projectTypeToSend = formData.quoteType === 'materials-only' ? 'materials-only' : formData.projectType;

    try {
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          projectType: projectTypeToSend,
          turnstileToken,
          savedRoofers: includedRoofers.length > 0 ? includedRoofers : undefined,
          savedProducts: includedProducts.length > 0 ? includedProducts : undefined,
          savedLocations: includedLocations.length > 0 ? includedLocations : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      const projectTypeToShow = formData.quoteType === 'materials-only' ? 'materials-only' : formData.projectType;
      const confirmationPayload = {
        fullName: formData.fullName,
        quoteType: formData.quoteType as 'installation' | 'materials-only',
        projectType: projectTypeToShow,
        city: formData.city,
        zipCode: formData.zipCode,
        rooferCount: includedRoofers.length,
        productNames: includedProducts.map((p) => p.name),
        locationNames: includedLocations.map((l) => l.name),
      };
      try {
        sessionStorage.setItem(STORAGE_KEY_CONFIRMATION, JSON.stringify(confirmationPayload));
      } catch {
        // ignore
      }
      router.push('/free-estimate/thank-you');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        propertyAddress: '',
        city: '',
        zipCode: '',
        quoteType: '',
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

  const formContent = (
    <>
      {!embedded && (
        <>
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black mb-2 text-center">
            Request Your Free Quote
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Choose the type of quote you need below—we&apos;ll route your request accordingly.
          </p>
        </>
      )}

      <div className={embedded ? '' : 'mb-8'}>
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 mb-3">
            What type of quote do you need? <span className="text-red-500">*</span>
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label
              className={`relative flex cursor-pointer rounded-2xl border-2 p-5 transition-all ${
                formData.quoteType === 'installation'
                  ? 'border-rif-blue-500 bg-rif-blue-50'
                  : 'border-gray-200 bg-white hover:border-rif-blue-200 hover:bg-rif-blue-50/50'
              }`}
            >
              <input
                type="radio"
                name="quoteType"
                value="installation"
                checked={formData.quoteType === 'installation'}
                onChange={handleChange}
                className="sr-only"
              />
              <div>
                <span className="block text-lg font-semibold text-rif-black">Installation quote</span>
                <span className="block text-sm text-gray-600 mt-0.5">Labor + materials from a preferred roofer</span>
              </div>
              {formData.quoteType === 'installation' && (
                <FontAwesomeIcon icon={faCheckCircle} className="absolute top-4 right-4 h-5 w-5 text-rif-blue-500" />
              )}
            </label>
            <label
              className={`relative flex cursor-pointer rounded-2xl border-2 p-5 transition-all ${
                formData.quoteType === 'materials-only'
                  ? 'border-rif-blue-500 bg-rif-blue-50'
                  : 'border-gray-200 bg-white hover:border-rif-blue-200 hover:bg-rif-blue-50/50'
              }`}
            >
              <input
                type="radio"
                name="quoteType"
                value="materials-only"
                checked={formData.quoteType === 'materials-only'}
                onChange={handleChange}
                className="sr-only"
              />
              <div>
                <span className="block text-lg font-semibold text-rif-black">Materials-only quote</span>
                <span className="block text-sm text-gray-600 mt-0.5">Pricing on materials only</span>
              </div>
              {formData.quoteType === 'materials-only' && (
                <FontAwesomeIcon icon={faCheckCircle} className="absolute top-4 right-4 h-5 w-5 text-rif-blue-500" />
              )}
            </label>
          </div>
        </fieldset>
      </div>

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <FontAwesomeIcon icon={faExclamationCircle} className="h-5 w-5 text-red-600" />
          <p className="text-red-800">{errorMessage || 'Something went wrong. Please try again.'}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fe-fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="fe-fullName"
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
            <label htmlFor="fe-email" className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="fe-email"
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
            <label htmlFor="fe-phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                id="fe-phone"
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
            <label htmlFor="fe-hearAboutUs" className="block text-sm font-medium text-gray-700 mb-2">
              How did you hear about us?
            </label>
            <select
              id="fe-hearAboutUs"
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

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-xl font-semibold text-rif-black mb-4">Property Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="fe-propertyAddress" className="block text-sm font-medium text-gray-700 mb-2">
                Property Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FontAwesomeIcon icon={faHome} className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="fe-propertyAddress"
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
              <label htmlFor="fe-city" className="block text-sm font-medium text-gray-700 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fe-city"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all"
                placeholder="Tampa"
              />
            </div>
            <div>
              <label htmlFor="fe-zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fe-zipCode"
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

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-xl font-semibold text-rif-black mb-4">Project Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.quoteType === 'installation' && (
              <div>
                <label htmlFor="fe-projectType" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="fe-projectType"
                  name="projectType"
                  required={formData.quoteType === 'installation'}
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all"
                >
                  <option value="">Select project type</option>
                  <option value="new-installation">New stone-coated metal roof installation</option>
                  <option value="roof-replacement">Stone-coated metal roof replacement</option>
                  <option value="repair">Repair</option>
                  <option value="inspection">Inspection</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}
            {formData.quoteType === 'materials-only' && (
              <div className="md:col-span-2 p-4 bg-rif-blue-50 rounded-lg border border-rif-blue-200">
                <p className="text-sm text-gray-700">
                  You&apos;ve selected a <strong>materials-only quote</strong>. We&apos;ll get you pricing on stone-coated metal roofing materials.
                </p>
              </div>
            )}
            <div>
              <label htmlFor="fe-roofSize" className="block text-sm font-medium text-gray-700 mb-2">
                Roof Size (Square Feet)
              </label>
              <input
                type="text"
                id="fe-roofSize"
                name="roofSize"
                value={formData.roofSize}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all"
                placeholder="e.g., 2000"
              />
            </div>
            <div>
              <label htmlFor="fe-preferredContact" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Contact Method
              </label>
              <select
                id="fe-preferredContact"
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
              <label htmlFor="fe-bestTimeToContact" className="block text-sm font-medium text-gray-700 mb-2">
                Best Time to Contact
              </label>
              <select
                id="fe-bestTimeToContact"
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

        {favoriteRoofers.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-rif-black mb-1">Include Your Favorite Roofers</h3>
                <p className="text-sm text-gray-600">Select any favorite roofers you&apos;d like us to contact for your estimate</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (selectedRoofers.size === favoriteRoofers.length) {
                    setSelectedRoofers(new Set());
                  } else {
                    setSelectedRoofers(new Set(favoriteRoofers.map((r) => r.id)));
                  }
                }}
                className="text-sm text-rif-blue-500 hover:text-rif-blue-600 font-medium"
              >
                {selectedRoofers.size === favoriteRoofers.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="space-y-3 max-h-[32rem] overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
              {favoriteRoofers.map((roofer) => {
                const listingType: RooferListingType = roofer.listingType ?? 'general';
                const badgeLabel = listingType === 'preferred' ? 'Preferred' : listingType === 'sponsored' ? 'Sponsored' : 'General';
                const badgeClass =
                  listingType === 'preferred'
                    ? 'bg-card-blue-100 text-card-blue-800'
                    : listingType === 'sponsored'
                      ? 'bg-card-green-100 text-card-green-800'
                      : 'bg-gray-100 text-gray-800';
                return (
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
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900">{roofer.name}</div>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold ${badgeClass}`}>
                        {badgeLabel}
                      </span>
                      {listingType === 'preferred' && (roofer.phone || roofer.email || roofer.websiteUrl) && (
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                          {roofer.phone && (
                            <a href={`tel:${roofer.phone}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 hover:text-rif-blue-600">
                              <FontAwesomeIcon icon={faPhone} className="h-3.5 w-3.5 flex-shrink-0" />
                              {roofer.phone}
                            </a>
                          )}
                          {roofer.email && (
                            <a href={`mailto:${roofer.email}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 hover:text-rif-blue-600">
                              <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5 flex-shrink-0" />
                              {roofer.email}
                            </a>
                          )}
                          {roofer.websiteUrl && (
                            <a href={roofer.websiteUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 hover:text-rif-blue-600">
                              <FontAwesomeIcon icon={faGlobe} className="h-3.5 w-3.5 flex-shrink-0" />
                              Website
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                    <Link href={`/roofers/${roofer.slug}`} onClick={(e) => e.stopPropagation()} className="text-sm text-rif-blue-500 hover:text-rif-blue-600 font-medium flex-shrink-0">
                      View →
                    </Link>
                  </label>
                );
              })}
            </div>
            {selectedRoofers.size > 0 && (
              <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-600" />
                {selectedRoofers.size} roofer{selectedRoofers.size !== 1 ? 's' : ''} will be included in your estimate request
              </p>
            )}
          </div>
        )}

        {favoriteProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-rif-black mb-1 flex items-center gap-2">
                  <FontAwesomeIcon icon={faBox} className="h-5 w-5 text-rif-blue-500" />
                  Include Your Favorite Products
                </h3>
                <p className="text-sm text-gray-600">Select products you&apos;re interested in for your quote</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (selectedProducts.size === favoriteProducts.length) {
                    setSelectedProducts(new Set());
                  } else {
                    setSelectedProducts(new Set(favoriteProducts.map((p) => p.slug)));
                  }
                }}
                className="text-sm text-rif-blue-500 hover:text-rif-blue-600 font-medium"
              >
                {selectedProducts.size === favoriteProducts.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
              {favoriteProducts.map((product) => (
                <label
                  key={product.slug}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-rif-blue-300 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedProducts.has(product.slug)}
                    onChange={() => toggleProductSelection(product.slug)}
                    className="w-5 h-5 text-rif-blue-500 border-gray-300 rounded focus:ring-rif-blue-500"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{product.name}</div>
                    {product.category && <div className="text-sm text-gray-600">{product.category}</div>}
                  </div>
                  <Link href={`/products/${product.slug}`} onClick={(e) => e.stopPropagation()} className="text-sm text-rif-blue-500 hover:text-rif-blue-600 font-medium">
                    View →
                  </Link>
                </label>
              ))}
            </div>
            {selectedProducts.size > 0 && (
              <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-600" />
                {selectedProducts.size} product{selectedProducts.size !== 1 ? 's' : ''} will be included
              </p>
            )}
          </div>
        )}

        {favoriteLocations.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-rif-black mb-1 flex items-center gap-2">
                  <FontAwesomeIcon icon={faMapLocationDot} className="h-5 w-5 text-rif-blue-500" />
                  Include Your Favorite Locations
                </h3>
                <p className="text-sm text-gray-600">Select locations relevant to your project</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (selectedLocations.size === favoriteLocations.length) {
                    setSelectedLocations(new Set());
                  } else {
                    setSelectedLocations(new Set(favoriteLocations.map((l) => l.path)));
                  }
                }}
                className="text-sm text-rif-blue-500 hover:text-rif-blue-600 font-medium"
              >
                {selectedLocations.size === favoriteLocations.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
              {favoriteLocations.map((location) => (
                <label
                  key={location.path}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-rif-blue-300 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedLocations.has(location.path)}
                    onChange={() => toggleLocationSelection(location.path)}
                    className="w-5 h-5 text-rif-blue-500 border-gray-300 rounded focus:ring-rif-blue-500"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{location.name}</div>
                    <div className="text-sm text-gray-600 capitalize">{location.type}</div>
                  </div>
                  <Link href={location.path} onClick={(e) => e.stopPropagation()} className="text-sm text-rif-blue-500 hover:text-rif-blue-600 font-medium">
                    View →
                  </Link>
                </label>
              ))}
            </div>
            {selectedLocations.size > 0 && (
              <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-600" />
                {selectedLocations.size} location{selectedLocations.size !== 1 ? 's' : ''} will be included
              </p>
            )}
          </div>
        )}

        <div className="border-t border-gray-200 pt-6">
          <label htmlFor="fe-message" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Information or Questions
          </label>
          <div className="relative">
            <FontAwesomeIcon icon={faMessage} className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              id="fe-message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all resize-none"
              placeholder="Tell us about your roofing needs, timeline, or any specific requirements..."
            />
          </div>
        </div>

        <div className="hidden">
          <label htmlFor="fe-website">Website (leave blank)</label>
          <input type="text" id="fe-website" name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex justify-center">
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
            onSuccess={(token) => setTurnstileToken(token)}
            onError={() => setTurnstileToken(null)}
            onExpire={() => setTurnstileToken(null)}
          />
        </div>

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
                Request Free Quote
              </>
            )}
          </button>
        </div>
        {!embedded && (
          <p className="mt-6 text-center text-sm text-gray-500">
            We use your information only to fulfill your request. We do not sell or share your data with third parties.
          </p>
        )}
      </form>
    </>
  );

  if (embedded) {
    return <div className="space-y-6">{formContent}</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
      {formContent}
    </div>
  );
}
