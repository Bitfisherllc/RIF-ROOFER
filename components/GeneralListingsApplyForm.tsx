'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faList,
  faBuilding,
  faMapLocationDot,
  faStar,
  faCertificate,
  faSpinner,
  faCheckCircle,
  faExclamationCircle,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { Turnstile } from '@marsidev/react-turnstile';
import { searchData } from '@/app/service-areas/data/search-data';

const REGIONS = searchData.filter((r) => r.type === 'region');
const COUNTIES = searchData.filter((r) => r.type === 'county');

const initialForm = {
  companyName: '',
  contactName: '',
  phone: '',
  email: '',
  websiteUrl: '',
  address: '',
  city: '',
  state: 'FL',
  zipCode: '',
  regions: [] as string[],
  counties: [] as string[],
  message: '',
  hearAboutUs: '',
  website: '',
};

export default function GeneralListingsApplyForm({
  embedded = false,
  onBack,
  idPrefix = '',
}: {
  embedded?: boolean;
  onBack?: () => void;
  idPrefix?: string;
}) {
  const [formData, setFormData] = useState(initialForm);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const id = (name: string) => (idPrefix ? `${idPrefix}${name}` : name);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  const handleRegionToggle = (slug: string) => {
    setFormData((prev) => ({
      ...prev,
      regions: prev.regions.includes(slug)
        ? prev.regions.filter((s) => s !== slug)
        : [...prev.regions, slug],
    }));
  };

  const handleCountyToggle = (slug: string) => {
    setFormData((prev) => ({
      ...prev,
      counties: prev.counties.includes(slug)
        ? prev.counties.filter((s) => s !== slug)
        : [...prev.counties, slug],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setErrorMessage('');
    if (!formData.companyName || !formData.contactName || !formData.phone || !formData.email) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in company name, contact name, phone, and email.');
      return;
    }
    if (formData.regions.length === 0 && formData.counties.length === 0) {
      setSubmitStatus('error');
      setErrorMessage('Please select at least one region or county you serve.');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/general-listings-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit');
      setSubmitStatus('success');
      setFormData(initialForm);
      setTurnstileToken(null);
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {embedded && onBack && (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 font-medium transition-colors"
        >
          ← Back
        </button>
      )}
      {!embedded && (
        <section className="py-10 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-rif-black text-center mb-2">Want more visibility?</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              General listings are free. For higher placement and more leads, consider upgrading:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/partnerships/sponsorship-subscription"
                className="group flex flex-col p-6 rounded-2xl border-2 border-rif-blue-200 bg-rif-blue-50 hover:border-rif-blue-500 hover:bg-rif-blue-100 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-rif-blue-500 rounded-lg">
                    <FontAwesomeIcon icon={faStar} className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-rif-black">Sponsored Listing</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1">
                  Paid placement with premium visibility. Get featured above general listings on location pages and in search results.
                </p>
                <span className="inline-flex items-center gap-2 text-rif-blue-600 font-medium group-hover:gap-3 transition-all">
                  Learn about Sponsored results
                  <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href="/partnerships/preferred-contractor"
                className="group flex flex-col p-6 rounded-2xl border-2 border-amber-200 bg-amber-50 hover:border-amber-400 hover:bg-amber-100 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-amber-500 rounded-lg">
                    <FontAwesomeIcon icon={faCertificate} className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-rif-black">Preferred Contractor</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1">
                  Free for qualified contractors. Top placement, preferred badge, wholesale pricing, and leads from our partner distributor.
                </p>
                <span className="inline-flex items-center gap-2 text-amber-700 font-medium group-hover:gap-3 transition-all">
                  Learn about Preferred Contractor
                  <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                </span>
              </Link>
            </div>
            <p className="text-center text-sm text-gray-500 mt-6">
              You can still apply for a free general listing below, or explore the options above first.
            </p>
          </div>
        </section>
      )}
      <form onSubmit={handleSubmit} className={embedded ? '' : 'bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8'}>
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-semibold text-green-800">Application submitted</p>
              <p className="text-green-700 text-sm mt-1">
                Thank you for applying. We will review your information and add your listing to the directory.
              </p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <FontAwesomeIcon icon={faExclamationCircle} className="h-5 w-5 text-red-600 mt-0.5" />
            <p className="text-red-800">{errorMessage}</p>
          </div>
        )}

        <h2 className="text-xl font-semibold text-rif-black flex items-center gap-2">
          <FontAwesomeIcon icon={faBuilding} className="h-5 w-5 text-rif-blue-500" />
          Your information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor={id('companyName')} className="block text-sm font-medium text-gray-700 mb-1">
              Company name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={id('companyName')}
              name="companyName"
              required
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
              placeholder="Your Roofing Company LLC"
            />
          </div>
          <div>
            <label htmlFor={id('contactName')} className="block text-sm font-medium text-gray-700 mb-1">
              Contact name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={id('contactName')}
              name="contactName"
              required
              value={formData.contactName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
              placeholder="John Smith"
            />
          </div>
          <div>
            <label htmlFor={id('phone')} className="block text-sm font-medium text-gray-700 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id={id('phone')}
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
              placeholder="(555) 123-4567"
            />
          </div>
          <div>
            <label htmlFor={id('email')} className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id={id('email')}
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
              placeholder="info@yourcompany.com"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor={id('websiteUrl')} className="block text-sm font-medium text-gray-700 mb-1">
              Website (optional)
            </label>
            <input
              type="url"
              id={id('websiteUrl')}
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
              placeholder="https://www.yourcompany.com"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor={id('address')} className="block text-sm font-medium text-gray-700 mb-1">
              Business address
            </label>
            <input
              type="text"
              id={id('address')}
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
              placeholder="123 Main Street"
            />
          </div>
          <div>
            <label htmlFor={id('city')} className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              id={id('city')}
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
              placeholder="Tampa"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor={id('state')} className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                id={id('state')}
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="FL"
              />
            </div>
            <div>
              <label htmlFor={id('zipCode')} className="block text-sm font-medium text-gray-700 mb-1">
                ZIP
              </label>
              <input
                type="text"
                id={id('zipCode')}
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                placeholder="33601"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-rif-black mb-2 flex items-center gap-2">
            <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 text-rif-blue-500" />
            Service areas <span className="text-red-500">*</span>
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Select the regions and/or counties you serve. At least one selection is required.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Regions</label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
                {REGIONS.map((r) => (
                  <label
                    key={r.slug}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer hover:bg-rif-blue-50 border-gray-200"
                  >
                    <input
                      type="checkbox"
                      checked={formData.regions.includes(r.slug)}
                      onChange={() => handleRegionToggle(r.slug)}
                      className="text-rif-blue-500 rounded"
                    />
                    <span className="text-sm">{r.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Counties</label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
                {COUNTIES.map((c) => (
                  <label
                    key={c.slug}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer hover:bg-rif-blue-50 border-gray-200"
                  >
                    <input
                      type="checkbox"
                      checked={formData.counties.includes(c.slug)}
                      onChange={() => handleCountyToggle(c.slug)}
                      className="text-rif-blue-500 rounded"
                    />
                    <span className="text-sm">{c.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <label htmlFor={id('hearAboutUs')} className="block text-sm font-medium text-gray-700 mb-1">
            How did you hear about us?
          </label>
          <select
            id={id('hearAboutUs')}
            name="hearAboutUs"
            value={formData.hearAboutUs}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
          >
            <option value="">Select</option>
            <option value="search">Search / Google</option>
            <option value="referral">Referral</option>
            <option value="social">Social media</option>
            <option value="other">Other</option>
          </select>
          <div className="mt-4">
            <label htmlFor={id('message')} className="block text-sm font-medium text-gray-700 mb-1">
              Additional comments (optional)
            </label>
            <textarea
              id={id('message')}
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
              placeholder="Anything else you would like us to know..."
            />
          </div>
          <div className="hidden">
            <input
              type="text"
              id={id('website')}
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="flex justify-center mb-6">
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
              onSuccess={(token) => setTurnstileToken(token)}
              onError={() => setTurnstileToken(null)}
              onExpire={() => setTurnstileToken(null)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="submit"
              disabled={isSubmitting || !turnstileToken}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rif-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-rif-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin className="h-5 w-5" />
                  Submitting...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faList} className="h-5 w-5" />
                  Submit Application
                </>
              )}
            </button>
            {!embedded && (
              <Link
                href="/partnerships/general-listings"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                Cancel
              </Link>
            )}
            {embedded && onBack && (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
