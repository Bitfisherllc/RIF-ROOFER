'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faUser,
  faGlobe,
  faFileLines,
  faBullhorn,
  faMagnifyingGlass,
  faPalette,
  faCheckSquare,
  faSpinner,
  faCheckCircle,
  faExclamationCircle,
  faArrowLeft,
  faClock,
  faDollarSign,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import { Turnstile } from '@marsidev/react-turnstile';

const MARKETING_NEEDS = [
  { id: 'websites', label: 'Website (new or refresh)', icon: faGlobe },
  { id: 'print', label: 'Print collateral (brochures, flyers, business cards)', icon: faFileLines },
  { id: 'marketing', label: 'Marketing & campaigns', icon: faBullhorn },
  { id: 'seo', label: 'SEO (search visibility)', icon: faMagnifyingGlass },
  { id: 'branding', label: 'Branding & identity', icon: faPalette },
  { id: 'other', label: 'Other (describe below)', icon: faCheckSquare },
];

const URGENCY_OPTIONS = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-3months', label: 'Within 1–3 months' },
  { value: '3-6months', label: 'Within 3–6 months' },
  { value: 'exploring', label: 'Just exploring' },
  { value: 'norush', label: 'No rush' },
];

const PAID_SERVICES_OPTIONS = [
  { id: 'google_ads', label: 'Google Ads' },
  { id: 'social_ads', label: 'Facebook / Instagram ads' },
  { id: 'seo_company', label: 'SEO company' },
  { id: 'web_designer', label: 'Web designer or agency' },
  { id: 'print_mail', label: 'Print or mail vendor' },
  { id: 'other_paid', label: 'Other' },
];

const SUCCESS_SCALE = [
  { value: '1', label: '1 - Struggling', sub: 'Not getting the results we want' },
  { value: '2', label: '2 - Below average', sub: 'Some leads but inconsistent' },
  { value: '3', label: '3 - Average', sub: 'Steady but room to grow' },
  { value: '4', label: '4 - Good', sub: 'Working well, want to do more' },
  { value: '5', label: '5 - Thriving', sub: 'Marketing is a strong driver' },
];

const HOW_CUSTOMERS_FIND = [
  { id: 'referrals', label: 'Referrals / word of mouth' },
  { id: 'google', label: 'Google / search' },
  { id: 'social', label: 'Social media' },
  { id: 'repeat', label: 'Repeat customers' },
  { id: 'other_find', label: 'Other' },
];

export default function MarketingContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    companyWebsite: '',
    needs: [] as string[],
    otherDescription: '',
    urgency: '',
    paidServices: [] as string[],
    otherPaidDescription: '',
    marketingSuccessRating: '',
    biggestChallenge: '',
    howCustomersFindYou: [] as string[],
    otherHowFindDescription: '',
    currentBrand: '' as '' | 'yes' | 'no' | 'partial',
    successIn12Months: '',
    message: '',
    website: '', // honeypot
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  const toggleNeed = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      needs: prev.needs.includes(id)
        ? prev.needs.filter((n) => n !== id)
        : [...prev.needs, id],
    }));
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  const togglePaidService = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      paidServices: prev.paidServices.includes(id)
        ? prev.paidServices.filter((s) => s !== id)
        : [...prev.paidServices, id],
    }));
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  const toggleHowFind = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      howCustomersFindYou: prev.howCustomersFindYou.includes(id)
        ? prev.howCustomersFindYou.filter((s) => s !== id)
        : [...prev.howCustomersFindYou, id],
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
      const response = await fetch('/api/marketing-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        companyName: '',
        companyWebsite: '',
        needs: [],
        otherDescription: '',
        urgency: '',
        paidServices: [],
        otherPaidDescription: '',
        marketingSuccessRating: '',
        biggestChallenge: '',
        howCustomersFindYou: [],
        otherHowFindDescription: '',
        currentBrand: '',
        successIn12Months: '',
        message: '',
        website: '',
      });
      setTurnstileToken(null);
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-24 pb-12 px-6 bg-rif-blue-600 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Tell us your marketing needs
          </h1>
          <p className="text-lg text-blue-100">
            Quick questionnaire—no address required. We&apos;ll get back to you soon.
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/marketing"
            className="inline-flex items-center gap-2 text-rif-blue-600 font-medium hover:text-rif-blue-700 mb-8"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
            Back to Full Package
          </Link>

          {submitStatus === 'success' ? (
            <div className="p-8 rounded-2xl border-2 border-green-200 bg-green-50 text-center">
              <FontAwesomeIcon icon={faCheckCircle} className="h-12 w-12 text-green-600 mb-4" />
              <h2 className="text-xl font-bold text-rif-black mb-2">Thank you</h2>
              <p className="text-gray-700 mb-6">
                We&apos;ve received your information. Our marketing team will be in touch soon.
              </p>
              <Link
                href="/marketing"
                className="inline-flex items-center gap-2 px-6 py-3 bg-rif-blue-600 text-white font-semibold rounded-xl hover:bg-rif-blue-700"
              >
                Back to Full Package
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact info - basics only, no address */}
              <div className="rounded-2xl border-2 border-rif-blue-100 bg-rif-blue-50/50 p-6">
                <h2 className="text-lg font-semibold text-rif-black mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-rif-blue-500" />
                  Contact information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                      placeholder="(555) 555-5555"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                      Company name <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                      placeholder="Your roofing company"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700 mb-1">
                      Website address <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="url"
                      id="companyWebsite"
                      name="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                      placeholder="https://yourcompany.com"
                    />
                  </div>
                </div>
              </div>

              {/* Urgency */}
              <div className="rounded-2xl border-2 border-rif-blue-100 bg-rif-blue-50/50 p-6">
                <h2 className="text-lg font-semibold text-rif-black mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faClock} className="h-5 w-5 text-rif-blue-500" />
                  Urgency of needs
                </h2>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500 bg-white"
                >
                  <option value="">Select one…</option>
                  {URGENCY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Marketing needs - checkboxes */}
              <div className="rounded-2xl border-2 border-rif-blue-100 bg-rif-blue-50/50 p-6">
                <h2 className="text-lg font-semibold text-rif-black mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheckSquare} className="h-5 w-5 text-rif-blue-500" />
                  What do you need? <span className="text-gray-500 font-normal">(check all that apply)</span>
                </h2>
                <div className="space-y-3">
                  {MARKETING_NEEDS.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 bg-white hover:border-rif-blue-200 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.needs.includes(item.id)}
                        onChange={() => toggleNeed(item.id)}
                        className="mt-1 h-5 w-5 rounded border-gray-300 text-rif-blue-600 focus:ring-rif-blue-500"
                      />
                      <span className="flex items-center gap-2 text-gray-800">
                        <FontAwesomeIcon icon={item.icon} className="h-4 w-4 text-rif-blue-500 flex-shrink-0" />
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
                {formData.needs.includes('other') && (
                  <div className="mt-4">
                    <label htmlFor="otherDescription" className="block text-sm font-medium text-gray-700 mb-1">
                      Describe &quot;Other&quot;
                    </label>
                    <input
                      type="text"
                      id="otherDescription"
                      name="otherDescription"
                      value={formData.otherDescription}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                      placeholder="e.g. videography, photography"
                    />
                  </div>
                )}
              </div>

              {/* Paid services currently using */}
              <div className="rounded-2xl border-2 border-rif-blue-100 bg-rif-blue-50/50 p-6">
                <h2 className="text-lg font-semibold text-rif-black mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faDollarSign} className="h-5 w-5 text-rif-blue-500" />
                  What paid marketing services are you currently using? <span className="text-gray-500 font-normal">(check all that apply)</span>
                </h2>
                <div className="space-y-3">
                  {PAID_SERVICES_OPTIONS.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 bg-white hover:border-rif-blue-200 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.paidServices.includes(item.id)}
                        onChange={() => togglePaidService(item.id)}
                        className="mt-1 h-5 w-5 rounded border-gray-300 text-rif-blue-600 focus:ring-rif-blue-500"
                      />
                      <span className="text-gray-800">{item.label}</span>
                    </label>
                  ))}
                </div>
                {formData.paidServices.includes('other_paid') && (
                  <div className="mt-4">
                    <label htmlFor="otherPaidDescription" className="block text-sm font-medium text-gray-700 mb-1">
                      Describe other paid services
                    </label>
                    <input
                      type="text"
                      id="otherPaidDescription"
                      name="otherPaidDescription"
                      value={formData.otherPaidDescription}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                      placeholder="e.g. Yelp, HomeAdvisor"
                    />
                  </div>
                )}
              </div>

              {/* Creative questions for Bitfisher plan */}
              <div className="rounded-2xl border-2 border-rif-blue-100 bg-rif-blue-50/50 p-6">
                <h2 className="text-lg font-semibold text-rif-black mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faLightbulb} className="h-5 w-5 text-rif-blue-500" />
                  Help us understand where you&apos;re at
                </h2>
                <p className="text-gray-600 text-sm mb-6">
                  These answers help Bitfisher put together a plan that fits you.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How would you rate your current marketing success? <span className="text-gray-400">(1 = struggling, 5 = thriving)</span>
                    </label>
                    <div className="space-y-2">
                      {SUCCESS_SCALE.map((opt) => (
                        <label
                          key={opt.value}
                          className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 bg-white hover:border-rif-blue-200 cursor-pointer transition-colors"
                        >
                          <input
                            type="radio"
                            name="marketingSuccessRating"
                            value={opt.value}
                            checked={formData.marketingSuccessRating === opt.value}
                            onChange={handleChange}
                            className="mt-1 h-4 w-4 border-gray-300 text-rif-blue-600 focus:ring-rif-blue-500"
                          />
                          <span className="text-gray-800">
                            <span className="font-medium">{opt.label}</span>
                            {opt.sub && <span className="block text-sm text-gray-500">{opt.sub}</span>}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="biggestChallenge" className="block text-sm font-medium text-gray-700 mb-1">
                      What&apos;s your biggest marketing challenge right now?
                    </label>
                    <textarea
                      id="biggestChallenge"
                      name="biggestChallenge"
                      rows={3}
                      value={formData.biggestChallenge}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                      placeholder="e.g. Not enough leads, outdated website, hard to stand out..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How do most of your customers find you today? <span className="text-gray-500 font-normal">(check all that apply)</span>
                    </label>
                    <div className="space-y-2">
                      {HOW_CUSTOMERS_FIND.map((item) => (
                        <label
                          key={item.id}
                          className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 bg-white hover:border-rif-blue-200 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={formData.howCustomersFindYou.includes(item.id)}
                            onChange={() => toggleHowFind(item.id)}
                            className="mt-1 h-5 w-5 rounded border-gray-300 text-rif-blue-600 focus:ring-rif-blue-500"
                          />
                          <span className="text-gray-800">{item.label}</span>
                        </label>
                      ))}
                    </div>
                    {formData.howCustomersFindYou.includes('other_find') && (
                      <div className="mt-3">
                        <input
                          type="text"
                          name="otherHowFindDescription"
                          value={formData.otherHowFindDescription}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                          placeholder="Describe..."
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you have a current brand (logo, colors) we should work with?
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {(['yes', 'no', 'partial'] as const).map((val) => (
                        <label key={val} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="currentBrand"
                            value={val}
                            checked={formData.currentBrand === val}
                            onChange={handleChange}
                            className="h-4 w-4 border-gray-300 text-rif-blue-600 focus:ring-rif-blue-500"
                          />
                          <span className="text-gray-800">
                            {val === 'yes' ? 'Yes' : val === 'no' ? 'No' : 'Partially—could refine'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="successIn12Months" className="block text-sm font-medium text-gray-700 mb-1">
                      What would success look like for you in 12 months? <span className="text-gray-400">(optional)</span>
                    </label>
                    <textarea
                      id="successIn12Months"
                      name="successIn12Months"
                      rows={3}
                      value={formData.successIn12Months}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                      placeholder="e.g. More leads from search, a website I'm proud of, consistent branding..."
                    />
                  </div>
                </div>
              </div>

              {/* Optional message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Anything else? <span className="text-gray-400">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                  placeholder="Timeline, budget, or other details"
                />
              </div>

              {/* Honeypot - hidden */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
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

              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800">
                  <FontAwesomeIcon icon={faExclamationCircle} className="h-5 w-5 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onError={() => setTurnstileToken(null)}
                  onExpire={() => setTurnstileToken(null)}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rif-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-rif-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="h-5 w-5 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
                      Send to marketing team
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
