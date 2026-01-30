'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserTie,
  faFileInvoice,
  faBuilding,
  faUser,
  faShieldHalved,
  faMapLocationDot,
  faFileLines,
  faSpinner,
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Turnstile } from '@marsidev/react-turnstile';
import { searchData } from '@/app/service-areas/data/search-data';

const REGIONS = searchData.filter((r) => r.type === 'region');
const COUNTIES = searchData.filter((r) => r.type === 'county');

const SPECIALTIES_OPTIONS = [
  'Residential Roofing',
  'Commercial Roofing',
  'Roof Installation',
  'Roof Replacement',
  'Roof Repair',
  'Roof Maintenance',
  'Storm Damage',
  'Stone-Coated Metal Roofing',
  'Other',
];

const initialForm = {
  companyName: '',
  dba: '',
  phone: '',
  email: '',
  websiteUrl: '',
  address: '',
  city: '',
  state: 'FL',
  zipCode: '',
  contactName: '',
  contactTitle: '',
  preferredContact: 'phone' as 'phone' | 'email' | 'either',
  licenseNumber: '',
  liabilityInsurance: '' as '' | 'yes' | 'no',
  liabilityCarrier: '',
  liabilityPolicy: '',
  workersComp: '' as '' | 'yes' | 'no',
  workersCompDetails: '',
  bbbAccredited: '' as '' | 'yes' | 'no',
  bbbUrl: '',
  regions: [] as string[],
  counties: [] as string[],
  additionalCities: '',
  aboutText: '',
  yearsInBusiness: '',
  specialties: [] as string[],
  googleBusinessUrl: '',
  hearAboutUs: '',
  message: '',
  website: '',
};

const CONFIG = {
  preferred: {
    apiUrl: '/api/preferred-contractor-apply',
    successTitle: 'Application submitted',
    successMessage: "Thank you for applying to become a Preferred Contractor. We'll review your information and contact you soon.",
    submitLabel: 'Submit Application',
    submitIcon: faUserTie,
    cancelHref: '/partnerships/preferred-contractor',
  },
  sponsored: {
    apiUrl: '/api/sponsorship-subscription-apply',
    successTitle: 'Subscription request received',
    successMessage: "Thank you for your subscription request. We'll send your invoice shortly and get your subscription started.",
    submitLabel: 'Send Invoice - Start Subscription',
    submitIcon: faFileInvoice,
    cancelHref: '/partnerships/sponsorship-subscription',
  },
} as const;

export default function RooferFullApplyForm({
  variant,
  embedded = false,
  onBack,
  idPrefix = '',
}: {
  variant: 'preferred' | 'sponsored';
  embedded?: boolean;
  onBack?: () => void;
  idPrefix?: string;
}) {
  const [formData, setFormData] = useState(initialForm);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const config = CONFIG[variant];
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
      regions: prev.regions.includes(slug) ? prev.regions.filter((s) => s !== slug) : [...prev.regions, slug],
    }));
  };

  const handleCountyToggle = (slug: string) => {
    setFormData((prev) => ({
      ...prev,
      counties: prev.counties.includes(slug) ? prev.counties.filter((s) => s !== slug) : [...prev.counties, slug],
    }));
  };

  const handleSpecialtyToggle = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(item) ? prev.specialties.filter((s) => s !== item) : [...prev.specialties, item],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setErrorMessage('');
    if (!formData.companyName || !formData.phone || !formData.email || !formData.contactName) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in required fields: Company name, Phone, Email, and Primary contact name.');
      return;
    }
    if (!formData.licenseNumber) {
      setSubmitStatus('error');
      setErrorMessage('Florida roofing license number is required.');
      return;
    }
    if (!formData.address || !formData.city || !formData.zipCode) {
      setSubmitStatus('error');
      setErrorMessage('Business address (street, city, ZIP) is required.');
      return;
    }
    if (!formData.liabilityInsurance || !formData.workersComp) {
      setSubmitStatus('error');
      setErrorMessage('Please confirm liability and workers comp insurance status.');
      return;
    }
    if (formData.regions.length === 0 && formData.counties.length === 0) {
      setSubmitStatus('error');
      setErrorMessage('Please select at least one region or county you serve.');
      return;
    }
    if (!formData.aboutText || formData.aboutText.trim().length < 50) {
      setSubmitStatus('error');
      setErrorMessage('Please provide a company description (at least 50 characters).');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(config.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit application');
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
      <form onSubmit={handleSubmit} className={embedded ? 'space-y-10' : 'bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-10'}>
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-semibold text-green-800">{config.successTitle}</p>
              <p className="text-green-700 text-sm mt-1">{config.successMessage}</p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <FontAwesomeIcon icon={faExclamationCircle} className="h-5 w-5 text-red-600 mt-0.5" />
            <p className="text-red-800">{errorMessage}</p>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold text-rif-black mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faBuilding} className="h-5 w-5 text-rif-blue-500" />
            Business Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor={id('companyName')} className="block text-sm font-medium text-gray-700 mb-1">Company name <span className="text-red-500">*</span></label>
              <input type="text" id={id('companyName')} name="companyName" required value={formData.companyName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500" placeholder="Your Roofing Company LLC" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor={id('dba')} className="block text-sm font-medium text-gray-700 mb-1">DBA / Trade name (if different)</label>
              <input type="text" id={id('dba')} name="dba" value={formData.dba} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500" placeholder="Doing Business As" />
            </div>
            <div>
              <label htmlFor={id('phone')} className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
              <input type="tel" id={id('phone')} name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500" placeholder="(555) 123-4567" />
            </div>
            <div>
              <label htmlFor={id('email')} className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
              <input type="email" id={id('email')} name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500" placeholder="info@yourcompany.com" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor={id('websiteUrl')} className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
              <input type="url" id={id('websiteUrl')} name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500" placeholder="https://www.yourcompany.com" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor={id('address')} className="block text-sm font-medium text-gray-700 mb-1">Business address <span className="text-red-500">*</span></label>
              <input type="text" id={id('address')} name="address" required value={formData.address} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500" placeholder="123 Main Street, Suite 100" />
            </div>
            <div>
              <label htmlFor={id('city')} className="block text-sm font-medium text-gray-700 mb-1">City <span className="text-red-500">*</span></label>
              <input type="text" id={id('city')} name="city" required value={formData.city} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500" placeholder="Tampa" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor={id('state')} className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input type="text" id={id('state')} name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500" placeholder="FL" />
              </div>
              <div>
                <label htmlFor={id('zipCode')} className="block text-sm font-medium text-gray-700 mb-1">ZIP <span className="text-red-500">*</span></label>
                <input type="text" id={id('zipCode')} name="zipCode" required value={formData.zipCode} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500" placeholder="33601" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-10">
          <h2 className="text-xl font-semibold text-rif-black mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-rif-blue-500" />
            Primary Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor={id('contactName')} className="block text-sm font-medium text-gray-700 mb-1">Full name <span className="text-red-500">*</span></label>
              <input type="text" id={id('contactName')} name="contactName" required value={formData.contactName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500" placeholder="John Smith" />
            </div>
            <div>
              <label htmlFor={id('contactTitle')} className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" id={id('contactTitle')} name="contactTitle" value={formData.contactTitle} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500" placeholder="Owner, General Manager" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor={id('preferredContact')} className="block text-sm font-medium text-gray-700 mb-1">Preferred contact method</label>
              <select id={id('preferredContact')} name="preferredContact" value={formData.preferredContact} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500">
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="either">Either</option>
              </select>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-10">
          <h2 className="text-xl font-semibold text-rif-black mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faShieldHalved} className="h-5 w-5 text-rif-blue-500" />
            Licensing & Insurance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor={id('licenseNumber')} className="block text-sm font-medium text-gray-700 mb-1">Florida roofing license number <span className="text-red-500">*</span></label>
              <input type="text" id={id('licenseNumber')} name="licenseNumber" required value={formData.licenseNumber} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500" placeholder="e.g. CCC1234567" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">General liability insurance <span className="text-red-500">*</span></label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="liabilityInsurance" value="yes" checked={formData.liabilityInsurance === 'yes'} onChange={handleChange} className="text-rif-blue-500" />
                  Yes
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="liabilityInsurance" value="no" checked={formData.liabilityInsurance === 'no'} onChange={handleChange} className="text-rif-blue-500" />
                  No
                </label>
              </div>
              {formData.liabilityInsurance === 'yes' && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="liabilityCarrier" value={formData.liabilityCarrier} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Insurance carrier" />
                  <input type="text" name="liabilityPolicy" value={formData.liabilityPolicy} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Policy number (optional)" />
                </div>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Workers compensation insurance <span className="text-red-500">*</span></label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="workersComp" value="yes" checked={formData.workersComp === 'yes'} onChange={handleChange} className="text-rif-blue-500" />
                  Yes
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="workersComp" value="no" checked={formData.workersComp === 'no'} onChange={handleChange} className="text-rif-blue-500" />
                  No
                </label>
              </div>
              {formData.workersComp === 'yes' && (
                <input type="text" name="workersCompDetails" value={formData.workersCompDetails} onChange={handleChange} className="mt-4 w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Carrier / policy (optional)" />
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">BBB accredited?</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="bbbAccredited" value="yes" checked={formData.bbbAccredited === 'yes'} onChange={handleChange} className="text-rif-blue-500" />
                  Yes
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="bbbAccredited" value="no" checked={formData.bbbAccredited === 'no'} onChange={handleChange} className="text-rif-blue-500" />
                  No
                </label>
              </div>
              {formData.bbbAccredited === 'yes' && (
                <input type="url" name="bbbUrl" value={formData.bbbUrl} onChange={handleChange} className="mt-4 w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="BBB profile URL (optional)" />
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-10">
          <h2 className="text-xl font-semibold text-rif-black mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faMapLocationDot} className="h-5 w-5 text-rif-blue-500" />
            Service Areas
          </h2>
          <p className="text-sm text-gray-600 mb-4">Select all regions and/or counties you serve. At least one selection is required.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Regions</label>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
                {REGIONS.map((r) => (
                  <label key={r.slug} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer hover:bg-rif-blue-50 border-gray-200">
                    <input type="checkbox" checked={formData.regions.includes(r.slug)} onChange={() => handleRegionToggle(r.slug)} className="text-rif-blue-500 rounded" />
                    <span className="text-sm">{r.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Counties</label>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
                {COUNTIES.map((c) => (
                  <label key={c.slug} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer hover:bg-rif-blue-50 border-gray-200">
                    <input type="checkbox" checked={formData.counties.includes(c.slug)} onChange={() => handleCountyToggle(c.slug)} className="text-rif-blue-500 rounded" />
                    <span className="text-sm">{c.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor={id('additionalCities')} className="block text-sm font-medium text-gray-700 mb-1">Additional cities or areas (optional)</label>
            <textarea id={id('additionalCities')} name="additionalCities" value={formData.additionalCities} onChange={handleChange} rows={2} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500" placeholder="List specific cities or areas not covered above" />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-10">
          <h2 className="text-xl font-semibold text-rif-black mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faFileLines} className="h-5 w-5 text-rif-blue-500" />
            Company Profile
          </h2>
          <div className="space-y-6">
            <div>
              <label htmlFor={id('aboutText')} className="block text-sm font-medium text-gray-700 mb-1">Company description <span className="text-red-500">*</span> (min. 50 characters)</label>
              <textarea id={id('aboutText')} name="aboutText" required value={formData.aboutText} onChange={handleChange} rows={6} minLength={50} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500" placeholder="Describe your company, experience, and what makes your roofing services stand out..." />
              <p className="text-xs text-gray-500 mt-1">{formData.aboutText.length} / 50+ characters</p>
            </div>
            <div>
              <label htmlFor={id('yearsInBusiness')} className="block text-sm font-medium text-gray-700 mb-1">Years in business</label>
              <input type="number" id={id('yearsInBusiness')} name="yearsInBusiness" min={1} max={100} value={formData.yearsInBusiness} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500" placeholder="e.g. 15" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialties / services offered</label>
              <div className="flex flex-wrap gap-2">
                {SPECIALTIES_OPTIONS.map((s) => (
                  <label key={s} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer hover:bg-rif-blue-50 border-gray-200">
                    <input type="checkbox" checked={formData.specialties.includes(s)} onChange={() => handleSpecialtyToggle(s)} className="text-rif-blue-500 rounded" />
                    <span className="text-sm">{s}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor={id('googleBusinessUrl')} className="block text-sm font-medium text-gray-700 mb-1">Google Business Profile URL (optional)</label>
              <input type="url" id={id('googleBusinessUrl')} name="googleBusinessUrl" value={formData.googleBusinessUrl} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500" placeholder="https://g.page/your-business" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-10">
          <label htmlFor={id('hearAboutUs')} className="block text-sm font-medium text-gray-700 mb-1">How did you hear about us?</label>
          <select id={id('hearAboutUs')} name="hearAboutUs" value={formData.hearAboutUs} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500">
            <option value="">Select</option>
            <option value="search">Search / Google</option>
            <option value="referral">Referral</option>
            <option value="distributor">Distributor</option>
            <option value="social">Social media</option>
            <option value="other">Other</option>
          </select>
          <div className="mt-4">
            <label htmlFor={id('message')} className="block text-sm font-medium text-gray-700 mb-1">Additional comments or questions</label>
            <textarea id={id('message')} name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500" placeholder="Anything else you'd like us to know..." />
          </div>
          <div className="hidden">
            <input type="text" id={id('website')} name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-10">
          <div className="flex justify-center mb-6">
            <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} onSuccess={(t) => setTurnstileToken(t)} onError={() => setTurnstileToken(null)} onExpire={() => setTurnstileToken(null)} />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button type="submit" disabled={isSubmitting || !turnstileToken} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rif-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-rif-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? <><FontAwesomeIcon icon={faSpinner} spin className="h-5 w-5" /> Submitting...</> : <><FontAwesomeIcon icon={config.submitIcon} className="h-5 w-5" /> {config.submitLabel}</>}
            </button>
            {!embedded && (
              <Link href={config.cancelHref} className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-center">
                Cancel
              </Link>
            )}
            {embedded && onBack && (
              <button type="button" onClick={onBack} className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
