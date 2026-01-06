'use client';

import { useState } from 'react';
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
} from '@fortawesome/free-solid-svg-icons';
import { Turnstile } from '@marsidev/react-turnstile';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    userType: '', // 'roofer', 'resident', 'manufacturer'
    fullName: '',
    email: '',
    phone: '',
    companyName: '', // For roofers and manufacturers
    propertyAddress: '',
    city: '',
    zipCode: '',
    projectType: '',
    roofSize: '',
    preferredContact: 'phone',
    bestTimeToContact: '',
    message: '',
    hearAboutUs: '',
    // Roofer-specific fields
    interestedInFreeEstimate: false,
    interestedInPartnership: false,
    // Manufacturer-specific fields
    productName: '',
    productDescription: '',
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setSubmitStatus('success');
      // Reset form
      setFormData({
        userType: '',
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
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black mb-6 tracking-tight">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Get in touch with RIF Roofing. Whether you need a free estimate, have questions about our services, or want to learn more about stone-coated metal roofing, we're here to help.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-rif-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faPhone} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-rif-black mb-2">Phone</h3>
              <a href="tel:813-777-8272" className="text-rif-blue-500 hover:text-rif-blue-600 transition-colors">
                813-777-8272
              </a>
              <p className="text-sm text-gray-600 mt-2">Cell</p>
              <a href="tel:813-803-4599" className="text-rif-blue-500 hover:text-rif-blue-600 transition-colors block mt-2">
                813-803-4599
              </a>
              <p className="text-sm text-gray-600">Office</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-rif-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faEnvelope} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-rif-black mb-2">Email</h3>
              <a href="mailto:info@rifroofing.com" className="text-rif-blue-500 hover:text-rif-blue-600 transition-colors">
                info@rifroofing.com
              </a>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-rif-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-rif-black mb-2">Warehouse</h3>
              <p className="text-gray-700">
                8037 Treiman Blvd<br />
                Webster, FL 33597
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-rif-black mb-6 text-center">
              Send Us a Message
            </h2>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-600" />
                <p className="text-green-800">
                  Thank you for contacting us! We've received your message and will get back to you soon.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <FontAwesomeIcon icon={faExclamationCircle} className="h-5 w-5 text-red-600" />
                <p className="text-red-800">{errorMessage || 'Something went wrong. Please try again.'}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Type Selection */}
              <div className="border-b border-gray-200 pb-6">
                <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-4">
                  I am a... <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.userType === 'resident' 
                      ? 'border-rif-blue-500 bg-rif-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="userType"
                      value="resident"
                      checked={formData.userType === 'resident'}
                      onChange={handleChange}
                      className="sr-only"
                      required
                    />
                    <div className="flex-1 text-center">
                      <div className="text-lg font-semibold text-rif-black mb-1">Resident</div>
                      <div className="text-sm text-gray-600">Homeowner or property owner</div>
                    </div>
                  </label>

                  <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.userType === 'roofer' 
                      ? 'border-rif-blue-500 bg-rif-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="userType"
                      value="roofer"
                      checked={formData.userType === 'roofer'}
                      onChange={handleChange}
                      className="sr-only"
                      required
                    />
                    <div className="flex-1 text-center">
                      <div className="text-lg font-semibold text-rif-black mb-1">Roofer</div>
                      <div className="text-sm text-gray-600">Roofing contractor or business</div>
                    </div>
                  </label>

                  <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.userType === 'manufacturer' 
                      ? 'border-rif-blue-500 bg-rif-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="userType"
                      value="manufacturer"
                      checked={formData.userType === 'manufacturer'}
                      onChange={handleChange}
                      className="sr-only"
                      required
                    />
                    <div className="flex-1 text-center">
                      <div className="text-lg font-semibold text-rif-black mb-1">Manufacturer</div>
                      <div className="text-sm text-gray-600">Product manufacturer or supplier</div>
                    </div>
                  </label>
                </div>
              </div>

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

                {(formData.userType === 'roofer' || formData.userType === 'manufacturer') && (
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name {formData.userType === 'roofer' ? '(if applicable)' : ''} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      required={formData.userType === 'manufacturer'}
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all"
                      placeholder={formData.userType === 'roofer' ? 'Your Company Name (optional)' : 'Company Name'}
                    />
                  </div>
                )}

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

              {/* Roofer-Specific Questions */}
              {formData.userType === 'roofer' && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-semibold text-rif-black mb-4">Roofer Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <input
                        type="checkbox"
                        id="interestedInFreeEstimate"
                        name="interestedInFreeEstimate"
                        checked={formData.interestedInFreeEstimate}
                        onChange={(e) => setFormData({ ...formData, interestedInFreeEstimate: e.target.checked })}
                        className="mt-1 h-4 w-4 text-rif-blue-500 focus:ring-rif-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="interestedInFreeEstimate" className="flex-1 text-sm font-medium text-gray-700 cursor-pointer">
                        I'm interested in getting a free estimate for my roofing project
                      </label>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <input
                        type="checkbox"
                        id="interestedInPartnership"
                        name="interestedInPartnership"
                        checked={formData.interestedInPartnership}
                        onChange={(e) => setFormData({ ...formData, interestedInPartnership: e.target.checked })}
                        className="mt-1 h-4 w-4 text-rif-blue-500 focus:ring-rif-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="interestedInPartnership" className="flex-1 text-sm font-medium text-gray-700 cursor-pointer">
                        I would like to become a partner (Certified Roofer or Sponsored Listing)
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Manufacturer-Specific Questions */}
              {formData.userType === 'manufacturer' && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-semibold text-rif-black mb-4">Product Information</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="productName"
                        name="productName"
                        required
                        value={formData.productName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all"
                        placeholder="e.g., Premium Metal Roofing System"
                      />
                    </div>

                    <div>
                      <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-2">
                        Product Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="productDescription"
                        name="productDescription"
                        required
                        rows={4}
                        value={formData.productDescription}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all resize-none"
                        placeholder="Tell us about your product, its features, and why it would be a good fit for RIF Roofing..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Property Information - Only for Residents */}
              {formData.userType === 'resident' && (
                <>
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

                  {/* Project Details - Only for Residents */}
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
                    </div>
                  </div>
                </>
              )}

              {/* Contact Preferences */}
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              {/* Message */}
              <div className="border-t border-gray-200 pt-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.userType === 'manufacturer' 
                    ? 'Additional Information' 
                    : formData.userType === 'roofer'
                    ? 'Tell Us About Your Business'
                    : 'Message'} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faMessage}
                    className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                  />
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all resize-none"
                    placeholder={
                      formData.userType === 'manufacturer'
                        ? 'Tell us more about your product, pricing, availability, or any other relevant information...'
                        : formData.userType === 'roofer'
                        ? 'Tell us about your roofing business, experience, service areas, or any questions you have...'
                        : 'Tell us about your roofing needs, questions, or how we can help...'
                    }
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
                    'Send Message'
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
