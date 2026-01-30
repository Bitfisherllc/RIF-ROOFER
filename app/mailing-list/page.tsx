'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faUser,
  faBuilding,
  faMapMarkerAlt,
  faSpinner,
  faCheckCircle,
  faExclamationCircle,
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import { Turnstile } from '@marsidev/react-turnstile';

export default function MailingListPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    allowPhoneContact: false,
    website: '', // Honeypot field
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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
      const response = await fetch('/api/mailing-list', {
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
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        allowPhoneContact: false,
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
          <div className="w-20 h-20 bg-rif-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faBell} className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black mb-6 tracking-tight">
            Join Our Mailing List
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Stay up to date with the latest news, updates, and information from RIF Roofing. 
            Receive valuable insights about stone-coated metal roofing and our services.
          </p>
        </div>
      </section>

      {/* Sign-Up Form */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-rif-black mb-6 text-center">
              Sign Up for News & Updates
            </h2>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-600" />
                <p className="text-green-800">
                  Thank you for signing up! You've been added to our mailing list and will receive news and updates from RIF Roofing.
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
              {/* Personal Information */}
              <div className="space-y-6">
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
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                    Company / Business Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                    />
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all"
                      placeholder="Your Company Name"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold text-rif-black mb-4">Address Information</h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                      />
                      <input
                        type="text"
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all"
                        placeholder="123 Main Street"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="state"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 transition-all"
                      >
                        <option value="">Select State</option>
                        <option value="FL">Florida</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </select>
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
              </div>

              {/* Phone Contact Permission */}
              <div className="border-t border-gray-200 pt-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id="allowPhoneContact"
                      name="allowPhoneContact"
                      checked={formData.allowPhoneContact}
                      onChange={handleChange}
                      className="mt-1 h-5 w-5 text-rif-blue-500 focus:ring-rif-blue-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-900 block mb-1">
                        I would like to be contacted by phone about special offers
                      </span>
                      <span className="text-xs text-gray-600">
                        Yes, I allow RIF Roofing to contact me by phone regarding special offers related to distributor pricing or becoming part of our team (Partnerships).
                      </span>
                    </div>
                  </label>
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

              <p className="text-center text-sm text-gray-600">
                We do not sell your information. You can unsubscribe at any time.
              </p>

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
                      <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
                      Join Mailing List
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
            What You'll Receive
          </h2>
          <p className="text-lg text-gray-600 mb-4 leading-relaxed">
            By joining our mailing list, you'll receive regular updates including:
          </p>
          <p className="text-base text-gray-500 mb-8">
            We do not sell your information. You can cancel or unsubscribe at any time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-semibold text-rif-black mb-3">News & Updates</h3>
              <p className="text-gray-600">
                Stay informed about the latest developments in stone-coated metal roofing and industry news.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-semibold text-rif-black mb-3">Product Information</h3>
              <p className="text-gray-600">
                Learn about new products, features, and innovations in metal roofing solutions.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-semibold text-rif-black mb-3">Tips & Insights</h3>
              <p className="text-gray-600">
                Receive valuable tips for maintaining and caring for your metal roof.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

