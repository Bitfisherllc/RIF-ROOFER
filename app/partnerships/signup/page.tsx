'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandshake,
  faList,
  faCertificate,
  faDollarSign,
  faBuilding,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faGlobe,
  faUpload,
  faCheckCircle,
  faExclamationCircle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function PartnershipSignupPage() {
  const [listingType, setListingType] = useState<'general' | 'sponsored' | 'certified'>('general');
  const [formData, setFormData] = useState({
    businessName: '',
    location: '',
    city: '',
    state: 'FL',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    logo: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, logo: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('listingType', listingType);
      formDataToSend.append('businessName', formData.businessName);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('state', formData.state);
      formDataToSend.append('zipCode', formData.zipCode);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('website', formData.website);
      if (formData.logo) {
        formDataToSend.append('logo', formData.logo);
      }

      const response = await fetch('/api/partnerships/signup', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit partnership signup');
      }

      setSubmitStatus('success');
      // Reset form
      setFormData({
        businessName: '',
        location: '',
        city: '',
        state: 'FL',
        zipCode: '',
        phone: '',
        email: '',
        website: '',
        logo: null,
      });
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-rif-blue-500 rounded-2xl">
              <FontAwesomeIcon icon={faHandshake} className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black mb-6 tracking-tight">
            Partnership Signup
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-light">
            Join the RIF network and connect with customers in your service area
          </p>
        </div>
      </section>

      {/* Listing Type Selection */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-rif-black mb-6 text-center">
            Choose Your Listing Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* General Listing */}
            <button
              onClick={() => setListingType('general')}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                listingType === 'general'
                  ? 'border-rif-blue-500 bg-rif-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-rif-blue-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-3 rounded-xl ${listingType === 'general' ? 'bg-rif-blue-500' : 'bg-gray-200'}`}>
                  <FontAwesomeIcon
                    icon={faList}
                    className={`h-6 w-6 ${listingType === 'general' ? 'text-white' : 'text-gray-600'}`}
                  />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">General Listing</h3>
              </div>
              <p className="text-gray-600 text-sm mb-2">Free listing</p>
              <p className="text-gray-600 text-sm">
                Basic directory listing with business information. Contact details may be hidden.
              </p>
            </button>

            {/* Sponsored Listing */}
            <button
              onClick={() => setListingType('sponsored')}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                listingType === 'sponsored'
                  ? 'border-rif-blue-500 bg-rif-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-rif-blue-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-3 rounded-xl ${listingType === 'sponsored' ? 'bg-rif-blue-500' : 'bg-gray-200'}`}>
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className={`h-6 w-6 ${listingType === 'sponsored' ? 'text-white' : 'text-gray-600'}`}
                  />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Sponsored Listing</h3>
              </div>
              <p className="text-gray-600 text-sm mb-2 font-semibold">$300 annually</p>
              <p className="text-gray-600 text-sm">
                Paid listing with enhanced visibility, logo display, and full contact information.
              </p>
            </button>

            {/* Certified Roofer */}
            <button
              onClick={() => setListingType('certified')}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                listingType === 'certified'
                  ? 'border-rif-blue-500 bg-rif-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-rif-blue-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-3 rounded-xl ${listingType === 'certified' ? 'bg-rif-blue-500' : 'bg-gray-200'}`}>
                  <FontAwesomeIcon
                    icon={faCertificate}
                    className={`h-6 w-6 ${listingType === 'certified' ? 'text-white' : 'text-gray-600'}`}
                  />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Certified Roofer</h3>
              </div>
              <p className="text-gray-600 text-sm mb-2">Free (with qualification)</p>
              <p className="text-gray-600 text-sm">
                Complete training and approval process to become a preferred contractor.
              </p>
            </button>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <form onSubmit={handleSubmit}>
              {/* Business Name */}
              <div className="mb-6">
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                  />
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                    placeholder="Enter your business name"
                  />
                </div>
              </div>

              {/* Address/Location */}
              <div className="mb-6">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                  />
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                    placeholder="Street address"
                  />
                </div>
              </div>

              {/* City, State, ZIP */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                    placeholder="FL"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                    placeholder="ZIP Code"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                  />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Website */}
              <div className="mb-6">
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                  Website (optional)
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                  />
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                    placeholder="https://www.example.com"
                  />
                </div>
              </div>

              {/* Logo Upload (Sponsored only) */}
              {listingType === 'sponsored' && (
                <div className="mb-6">
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Logo <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-rif-blue-400 transition-colors">
                    <input
                      type="file"
                      id="logo"
                      name="logo"
                      accept="image/*"
                      required={listingType === 'sponsored'}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="logo" className="cursor-pointer">
                      <FontAwesomeIcon
                        icon={faUpload}
                        className="h-8 w-8 text-gray-400 mb-2 mx-auto block"
                      />
                      <p className="text-sm text-gray-600">
                        {formData.logo ? formData.logo.name : 'Click to upload logo (PNG, JPG, SVG)'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Recommended: 200x200px or larger</p>
                    </label>
                  </div>
                </div>
              )}

              {/* Info Box based on listing type */}
              <div
                className={`mb-6 p-4 rounded-lg ${
                  listingType === 'general'
                    ? 'bg-blue-50 border border-blue-200'
                    : listingType === 'sponsored'
                    ? 'bg-yellow-50 border border-yellow-200'
                    : 'bg-green-50 border border-green-200'
                }`}
              >
                {listingType === 'general' && (
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Not all information will be displayed publicly. At minimum, your business
                    name and location will be listed.
                  </p>
                )}
                {listingType === 'sponsored' && (
                  <p className="text-sm text-gray-700">
                    <strong>Sponsored Listing - $300 annually:</strong> This is a paid listing. After submission, you
                    will be contacted to complete payment. Payment processing will be available soon.
                  </p>
                )}
                {listingType === 'certified' && (
                  <p className="text-sm text-gray-700">
                    <strong>Certified Roofer Application:</strong> After submission, we will review your application and
                    contact you to schedule an interview and discuss training requirements.
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-rif-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-rif-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5" />
                  </>
                )}
              </button>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-green-800 font-medium">Application Submitted Successfully!</p>
                    <p className="text-green-700 text-sm mt-1">
                      We have received your application and will contact you soon.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <FontAwesomeIcon icon={faExclamationCircle} className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-medium">Error Submitting Application</p>
                    <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

