'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faSpinner,
  faCheckCircle,
  faExclamationCircle,
  faUser,
  faHome,
  faMessage,
  faCalculator,
  faHandshake,
  faList,
  faBullhorn,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { Turnstile } from '@marsidev/react-turnstile';
import FreeEstimateForm from '@/components/FreeEstimateForm';
import GeneralListingsApplyForm from '@/components/GeneralListingsApplyForm';
import PreferredContractorApplyForm from '@/components/PreferredContractorApplyForm';
import SponsorshipSubscriptionApplyForm from '@/components/SponsorshipSubscriptionApplyForm';

function SimpleCommentForm({
  formData,
  handleChange,
  handleSubmit,
  turnstileToken,
  setTurnstileToken,
  isSubmitting,
  onBack,
}: {
  formData: { fullName: string; email: string; phone: string; message: string; website: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  turnstileToken: string | null;
  setTurnstileToken: (t: string | null) => void;
  isSubmitting: boolean;
  onBack: () => void;
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 font-medium mb-4 transition-colors">
        ← Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
          <div className="relative">
            <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="text" id="fullName" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500" placeholder="John Doe" />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
          <div className="relative">
            <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500" placeholder="you@example.com" />
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone <span className="text-red-500">*</span></label>
          <div className="relative">
            <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500" placeholder="(555) 123-4567" />
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your question or comment <span className="text-red-500">*</span></label>
        <div className="relative">
          <FontAwesomeIcon icon={faMessage} className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 resize-none" placeholder="How can we help?" />
        </div>
      </div>
      <div className="hidden">
        <input type="text" name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex justify-center"><Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} onSuccess={(t) => setTurnstileToken(t)} onError={() => setTurnstileToken(null)} onExpire={() => setTurnstileToken(null)} /></div>
      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Back</button>
        <button type="submit" disabled={isSubmitting || !turnstileToken} className="px-8 py-4 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 disabled:opacity-50 flex items-center gap-2">
          {isSubmitting ? <><FontAwesomeIcon icon={faSpinner} spin className="h-5 w-5" /> Sending...</> : 'Send Message'}
        </button>
      </div>
    </form>
  );
}

function RooferGeneralForm({
  formData,
  handleChange,
  handleSubmit,
  turnstileToken,
  setTurnstileToken,
  isSubmitting,
  onBack,
}: {
  formData: { fullName: string; email: string; phone: string; companyName: string; hearAboutUs: string; preferredContact: string; bestTimeToContact: string; message: string; website: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  turnstileToken: string | null;
  setTurnstileToken: (t: string | null) => void;
  isSubmitting: boolean;
  onBack: () => void;
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 font-medium mb-4 transition-colors">
        ← Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
          <div className="relative">
            <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="text" id="fullName" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500" placeholder="John Doe" />
          </div>
        </div>
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">Company Name (optional)</label>
          <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500" placeholder="Your Company" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
          <div className="relative">
            <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500" placeholder="you@example.com" />
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone <span className="text-red-500">*</span></label>
          <div className="relative">
            <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500" placeholder="(555) 123-4567" />
          </div>
        </div>
        <div>
          <label htmlFor="hearAboutUs" className="block text-sm font-medium text-gray-700 mb-2">How did you hear about us?</label>
          <select id="hearAboutUs" name="hearAboutUs" value={formData.hearAboutUs} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500">
            <option value="">Select an option</option>
            <option value="search">Search Engine</option>
            <option value="referral">Referral</option>
            <option value="social">Social Media</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact</label>
          <select id="preferredContact" name="preferredContact" value={formData.preferredContact} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500">
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="either">Either</option>
          </select>
        </div>
        <div>
          <label htmlFor="bestTimeToContact" className="block text-sm font-medium text-gray-700 mb-2">Best Time to Contact</label>
          <select id="bestTimeToContact" name="bestTimeToContact" value={formData.bestTimeToContact} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500">
            <option value="">Select time</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="anytime">Anytime</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your question <span className="text-red-500">*</span></label>
        <div className="relative">
          <FontAwesomeIcon icon={faMessage} className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 resize-none" placeholder="Tell us about your business or ask a question..." />
        </div>
      </div>
      <div className="hidden">
        <input type="text" name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex justify-center"><Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} onSuccess={(t) => setTurnstileToken(t)} onError={() => setTurnstileToken(null)} onExpire={() => setTurnstileToken(null)} /></div>
      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Back</button>
        <button type="submit" disabled={isSubmitting || !turnstileToken} className="px-8 py-4 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 disabled:opacity-50 flex items-center gap-2">
          {isSubmitting ? <><FontAwesomeIcon icon={faSpinner} spin className="h-5 w-5" /> Sending...</> : 'Send Message'}
        </button>
      </div>
    </form>
  );
}

export default function ContactPage() {
  const [userType, setUserType] = useState<'resident' | 'roofer' | 'manufacturer' | ''>('');
  const [residentIntent, setResidentIntent] = useState<'quote' | 'general' | ''>('');
  const [rooferIntent, setRooferIntent] = useState<'network' | 'general' | ''>('');
  const [rooferNetworkChoice, setRooferNetworkChoice] = useState<'preferred' | 'sponsored' | 'general' | ''>('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    propertyAddress: '',
    city: '',
    zipCode: '',
    projectType: '',
    roofSize: '',
    preferredContact: 'phone',
    bestTimeToContact: '',
    message: '',
    hearAboutUs: '',
    interestedInFreeEstimate: false,
    interestedInPartnership: false,
    productName: '',
    productDescription: '',
    manufacturerPreferredSupplier: '' as '' | 'yes' | 'no',
    manufacturerSponsoredListing: '' as '' | 'yes' | 'no',
    manufacturerWebsite: '',
    website: '', // Honeypot field
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'manufacturerPreferredSupplier' && value === 'yes') {
        next.manufacturerSponsoredListing = '';
      }
      return next;
    });
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userType,
          residentIntent: userType === 'resident' ? residentIntent : undefined,
          rooferIntent: userType === 'roofer' ? rooferIntent : undefined,
          ...formData,
          manufacturerWebsite: userType === 'manufacturer' ? formData.manufacturerWebsite : undefined,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        propertyAddress: '',
        city: '',
        zipCode: '',
        projectType: '',
        roofSize: '',
        preferredContact: 'phone',
        bestTimeToContact: '',
        message: '',
        hearAboutUs: '',
        interestedInFreeEstimate: false,
        interestedInPartnership: false,
        productName: '',
        productDescription: '',
        manufacturerPreferredSupplier: '',
        manufacturerSponsoredListing: '',
        manufacturerWebsite: '',
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

  const showStep1 = !userType;
  const showResidentStep2 = userType === 'resident' && !residentIntent;
  const showRooferStep2 = userType === 'roofer' && !rooferIntent;
  const showResidentQuote = userType === 'resident' && residentIntent === 'quote';
  const showResidentGeneralForm = userType === 'resident' && residentIntent === 'general';
  const showRooferNetwork = userType === 'roofer' && rooferIntent === 'network';
  const showRooferGeneralForm = userType === 'roofer' && rooferIntent === 'general';
  const showManufacturerForm = userType === 'manufacturer';

  // Dynamic heading so users can keep track of where they are
  const formHeading =
    showStep1
      ? 'Send Us a Message'
      : showResidentStep2
        ? 'Resident: Quote or general question?'
        : showResidentQuote
          ? 'Resident: Request a free quote'
          : showResidentGeneralForm
            ? 'Resident: General question'
            : showRooferStep2
              ? 'Roofer: Network or general question?'
              : showRooferNetwork && !rooferNetworkChoice
                ? 'Roofer: Choose application type'
                : showRooferNetwork && rooferNetworkChoice === 'preferred'
                  ? 'Roofer: Preferred Contractor application'
                  : showRooferNetwork && rooferNetworkChoice === 'sponsored'
                    ? 'Roofer: Sponsored Listing application'
                    : showRooferNetwork && rooferNetworkChoice === 'general'
                      ? 'Roofer: General Listing application'
                      : showRooferGeneralForm
                        ? 'Roofer: General question'
                        : showManufacturerForm
                          ? 'Manufacturer: Partnership inquiry'
                          : 'Send Us a Message';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black mb-6 tracking-tight">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            This page routes you to the right form based on who you are. Residents can request a free stone-coated metal roof quote or send a general question. Roofers can apply to join the RiF network as a Preferred Contractor, Sponsored Listing, or General Listing—or ask a general question. Manufacturers can submit a product and partnership inquiry. Choose an option below to get started.
          </p>
        </div>
      </section>

      {/* Contact Form - Step by step */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-rif-black mb-6 text-center">
              {formHeading}
            </h2>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-600" />
                <p className="text-green-800">
                  Thank you for contacting us! We&apos;ve received your message and will get back to you soon.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <FontAwesomeIcon icon={faExclamationCircle} className="h-5 w-5 text-red-600" />
                <p className="text-red-800">{errorMessage || 'Something went wrong. Please try again.'}</p>
              </div>
            )}

            {/* Step 1: I am a... */}
            {showStep1 && (
              <div className="space-y-6">
                <p className="text-gray-600 text-center">Select who you are so we can direct you to the right form.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(['resident', 'roofer', 'manufacturer'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => { setUserType(type); setResidentIntent(''); setRooferIntent(''); setRooferNetworkChoice(''); }}
                      className="p-6 border-2 rounded-xl text-center transition-all border-gray-300 hover:border-rif-blue-200 hover:bg-gray-50"
                    >
                      <div className="text-lg font-semibold text-rif-black capitalize">
                        {type === 'resident' ? 'Resident' : type === 'roofer' ? 'Roofer' : 'Manufacturer'}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {type === 'resident' && 'Homeowner or property owner'}
                        {type === 'roofer' && 'Roofing contractor or business'}
                        {type === 'manufacturer' && 'Product manufacturer or supplier'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 Resident: Quote or General question */}
            {showResidentStep2 && (
              <div className="space-y-6">
                <button type="button" onClick={() => { setUserType(''); setResidentIntent(''); }} className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 font-medium mb-4 transition-colors">
                  ← Back
                </button>
                <p className="text-gray-700 font-medium">Are you looking for a quote or just have a general question?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setResidentIntent('quote')}
                    className="p-6 border-2 border-gray-300 rounded-xl text-left hover:border-rif-blue-500 hover:bg-rif-blue-50 transition-all"
                  >
                    <span className="block text-lg font-semibold text-rif-black">Looking for a quote</span>
                    <span className="block text-sm text-gray-600 mt-1">Get a free estimate for your roofing project</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setResidentIntent('general')}
                    className="p-6 border-2 border-gray-300 rounded-xl text-left hover:border-rif-blue-500 hover:bg-rif-blue-50 transition-all"
                  >
                    <span className="block text-lg font-semibold text-rif-black">Just have a general question</span>
                    <span className="block text-sm text-gray-600 mt-1">Ask us anything</span>
                  </button>
                </div>
              </div>
            )}

            {/* Resident + Quote: Free estimate form (actual form, no iframe) */}
            {showResidentQuote && (
              <div className="space-y-6">
                <button type="button" onClick={() => setResidentIntent('')} className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 font-medium mb-4 transition-colors">
                  ← Back
                </button>
                <p className="text-gray-700">
                  Use the form below to request your free stone-coated metal roof quote. You can include your favorite roofers and products.
                </p>
                <FreeEstimateForm embedded />
                <p className="text-sm text-gray-500">
                  You can also use the full page: <Link href="/free-estimate" className="text-rif-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Free Estimate</Link>
                </p>
              </div>
            )}

            {/* Resident + General: Simple comment form */}
            {showResidentGeneralForm && (
              <SimpleCommentForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                turnstileToken={turnstileToken}
                setTurnstileToken={setTurnstileToken}
                isSubmitting={isSubmitting}
                onBack={() => setResidentIntent('')}
              />
            )}

            {/* Step 2 Roofer: Network or General question */}
            {showRooferStep2 && (
              <div className="space-y-6">
                <button type="button" onClick={() => { setUserType(''); setRooferIntent(''); }} className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 font-medium mb-4 transition-colors">
                  ← Back
                </button>
                <p className="text-gray-700 font-medium">Would you like to be part of the RiF network or just have a general question?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRooferIntent('network')}
                    className="p-6 border-2 border-gray-300 rounded-xl text-left hover:border-rif-blue-500 hover:bg-rif-blue-50 transition-all"
                  >
                    <span className="block text-lg font-semibold text-rif-black">Part of the RiF network</span>
                    <span className="block text-sm text-gray-600 mt-1">Apply as Preferred, Sponsored, or General Listing</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRooferIntent('general')}
                    className="p-6 border-2 border-gray-300 rounded-xl text-left hover:border-rif-blue-500 hover:bg-rif-blue-50 transition-all"
                  >
                    <span className="block text-lg font-semibold text-rif-black">Just have a general question</span>
                    <span className="block text-sm text-gray-600 mt-1">Ask us anything</span>
                  </button>
                </div>
              </div>
            )}

            {/* Roofer + Network: Choose application type, then load form below (no navigation, no iframe) */}
            {showRooferNetwork && !rooferNetworkChoice && (
              <div className="space-y-6">
                <button type="button" onClick={() => setRooferIntent('')} className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 font-medium mb-4 transition-colors">
                  ← Back
                </button>
                <p className="text-gray-700">Choose the application that fits your business. The form will load below.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setRooferNetworkChoice('preferred')}
                    className="p-6 border-2 border-green-200 rounded-xl bg-green-50 hover:bg-green-100 hover:border-green-400 transition-all text-center block"
                  >
                    <FontAwesomeIcon icon={faHandshake} className="h-8 w-8 text-green-600 mb-3" />
                    <span className="block font-semibold text-rif-black">Preferred Contractor</span>
                    <span className="block text-sm text-gray-600 mt-1">Certified roofer, priority placement</span>
                    <span className="inline-flex items-center gap-1 mt-3 text-green-700 font-medium text-sm">
                      Apply <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRooferNetworkChoice('sponsored')}
                    className="p-6 border-2 border-rif-blue-200 rounded-xl bg-rif-blue-50 hover:bg-rif-blue-100 hover:border-rif-blue-400 transition-all text-center block"
                  >
                    <FontAwesomeIcon icon={faBullhorn} className="h-8 w-8 text-rif-blue-600 mb-3" />
                    <span className="block font-semibold text-rif-black">Sponsored Listing</span>
                    <span className="block text-sm text-gray-600 mt-1">Enhanced visibility, paid option</span>
                    <span className="inline-flex items-center gap-1 mt-3 text-rif-blue-700 font-medium text-sm">
                      Apply <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRooferNetworkChoice('general')}
                    className="p-6 border-2 border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-all text-center block"
                  >
                    <FontAwesomeIcon icon={faList} className="h-8 w-8 text-gray-600 mb-3" />
                    <span className="block font-semibold text-rif-black">General Listings</span>
                    <span className="block text-sm text-gray-600 mt-1">Free directory listing</span>
                    <span className="inline-flex items-center gap-1 mt-3 text-gray-700 font-medium text-sm">
                      Apply <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Roofer + Network + chosen type: show form inline */}
            {showRooferNetwork && rooferNetworkChoice === 'preferred' && (
              <PreferredContractorApplyForm embedded onBack={() => setRooferNetworkChoice('')} idPrefix="contact-pc-" />
            )}
            {showRooferNetwork && rooferNetworkChoice === 'sponsored' && (
              <SponsorshipSubscriptionApplyForm embedded onBack={() => setRooferNetworkChoice('')} idPrefix="contact-ss-" />
            )}
            {showRooferNetwork && rooferNetworkChoice === 'general' && (
              <GeneralListingsApplyForm embedded onBack={() => setRooferNetworkChoice('')} idPrefix="contact-gl-" />
            )}

            {/* Roofer + General: Form without partnership checkbox */}
            {showRooferGeneralForm && (
              <RooferGeneralForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                turnstileToken={turnstileToken}
                setTurnstileToken={setTurnstileToken}
                isSubmitting={isSubmitting}
                onBack={() => setRooferIntent('')}
              />
            )}

            {/* Manufacturer form (with website field) */}
            {showManufacturerForm && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <button type="button" onClick={() => setUserType('')} className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 font-medium mb-4 transition-colors">
                  ← Back
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input type="text" id="fullName" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500" placeholder="John Doe" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">Company Name <span className="text-red-500">*</span></label>
                    <input type="text" id="companyName" name="companyName" required value={formData.companyName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500" placeholder="Company Name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500" placeholder="you@example.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500" placeholder="(555) 123-4567" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="manufacturerWebsite" className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <input type="url" id="manufacturerWebsite" name="manufacturerWebsite" value={formData.manufacturerWebsite} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500" placeholder="https://yourcompany.com" />
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-semibold text-rif-black mb-4">Partnership & Listing</h3>
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-gray-700">Would you like to become a Preferred supplier? <span className="text-red-500">*</span></p>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="manufacturerPreferredSupplier" value="yes" checked={formData.manufacturerPreferredSupplier === 'yes'} onChange={handleChange} required className="h-4 w-4 text-rif-blue-500 focus:ring-rif-blue-500 border-gray-300" />
                        <span className="text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="manufacturerPreferredSupplier" value="no" checked={formData.manufacturerPreferredSupplier === 'no'} onChange={handleChange} required className="h-4 w-4 text-rif-blue-500 focus:ring-rif-blue-500 border-gray-300" />
                        <span className="text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                  {formData.manufacturerPreferredSupplier === 'no' && (
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-3">Would you like to be included on the site as a sponsored product listing and start a subscription?</p>
                      <div className="flex flex-wrap gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="manufacturerSponsoredListing" value="yes" checked={formData.manufacturerSponsoredListing === 'yes'} onChange={handleChange} className="h-4 w-4 text-rif-blue-500 focus:ring-rif-blue-500 border-gray-300" />
                          <span className="text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="manufacturerSponsoredListing" value="no" checked={formData.manufacturerSponsoredListing === 'no'} onChange={handleChange} className="h-4 w-4 text-rif-blue-500 focus:ring-rif-blue-500 border-gray-300" />
                          <span className="text-gray-700">No</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-semibold text-rif-black mb-4">Product Information</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">Product Name <span className="text-red-500">*</span></label>
                      <input type="text" id="productName" name="productName" required value={formData.productName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500" placeholder="e.g., Premium Metal Roofing System" />
                    </div>
                    <div>
                      <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-2">Product Description <span className="text-red-500">*</span></label>
                      <textarea id="productDescription" name="productDescription" required rows={4} value={formData.productDescription} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 resize-none" placeholder="Tell us about your product, its features, and why it would be a good fit for RIF Roofing..." />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Additional Information <span className="text-red-500">*</span></label>
                  <textarea id="message" name="message" required rows={4} value={formData.message} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 resize-none" placeholder="Tell us more about your product, pricing, availability..." />
                </div>
                <div className="hidden">
                  <input type="text" name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </div>
                <div className="flex justify-center"><Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} onSuccess={(t) => setTurnstileToken(t)} onError={() => setTurnstileToken(null)} onExpire={() => setTurnstileToken(null)} /></div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setUserType('')} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Back</button>
                  <button type="submit" disabled={isSubmitting || !turnstileToken} className="px-8 py-4 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 disabled:opacity-50 flex items-center gap-2">
                    {isSubmitting ? <><FontAwesomeIcon icon={faSpinner} spin className="h-5 w-5" /> Sending...</> : 'Send Message'}
                  </button>
                </div>
              </form>
            )}

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
            Sometimes it's easier to just pick up the phone. Our team is ready to answer your questions and help you get started with your roofing project.
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
