'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faLock,
  faEnvelope,
  faSpinner,
  faCheckCircle,
  faExclamationCircle,
  faHeart,
  faFileInvoiceDollar,
  faCalendar,
  faBell,
  faChartLine,
  faShield,
  faStar,
  faBookmark,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (searchParams?.get('registered') === 'true') {
      setSuccess('Account created successfully! Please sign in with your credentials.');
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid email or password');
      }

      // Redirect to user dashboard
      router.push('/my-plan');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rif-blue-500/10 mb-6">
            <FontAwesomeIcon icon={faUser} className="h-8 w-8 text-rif-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-rif-black mb-4 tracking-tight">
            Welcome <span className="text-rif-blue-500">Back</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Sign in to access your personalized roofing dashboard and manage your projects
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Login Form */}
            <div className="lg:order-1">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm">
                <h2 className="text-3xl font-semibold text-rif-black mb-2">
                  Sign In
                </h2>
                <p className="text-gray-600 mb-8">
                  Enter your credentials to access your account
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-rif-blue-500 focus:outline-none focus:ring-2 focus:ring-rif-blue-500/20 transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faLock} className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-rif-blue-500 focus:outline-none focus:ring-2 focus:ring-rif-blue-500/20 transition-all"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="w-4 h-4 text-rif-blue-500 border-gray-300 rounded focus:ring-rif-blue-500"
                      />
                      <span className="text-sm text-gray-700">Remember me</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-rif-blue-500 hover:text-rif-blue-600 font-medium transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Success Message */}
                  {success && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <p className="text-sm text-green-800">{success}</p>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                      <FontAwesomeIcon icon={faExclamationCircle} className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-rif-blue-500 text-white font-semibold rounded-lg hover:bg-rif-blue-600 focus:outline-none focus:ring-2 focus:ring-rif-blue-500 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <FontAwesomeIcon icon={faSpinner} className="h-5 w-5 animate-spin" />
                        Signing in...
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </button>

                  {/* Sign Up Link */}
                  <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{' '}
                      <Link
                        href="/signup"
                        className="text-rif-blue-500 hover:text-rif-blue-600 font-semibold transition-colors"
                      >
                        Create one now
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Benefits/Features Section */}
            <div className="lg:order-2">
              <div className="bg-gradient-to-br from-rif-blue-50 to-blue-100 rounded-2xl p-8 md:p-12 h-full">
                <h2 className="text-3xl font-semibold text-rif-black mb-6">
                  What You'll Get Access To
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  Your personalized dashboard helps you manage every aspect of your roofing project
                </p>

                <div className="space-y-6">
                  {/* Feature 1 */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rif-blue-500 flex items-center justify-center">
                      <FontAwesomeIcon icon={faHeart} className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-rif-black mb-2">
                        Save & Compare Roofers
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Bookmark your favorite certified roofers, compare quotes side-by-side, and track your communication history with each contractor.
                      </p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rif-blue-500 flex items-center justify-center">
                      <FontAwesomeIcon icon={faFileInvoiceDollar} className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-rif-black mb-2">
                        Manage Estimates & Quotes
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Access all your saved estimates, quotes, and project proposals in one place. Download PDFs and share with family members.
                      </p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rif-blue-500 flex items-center justify-center">
                      <FontAwesomeIcon icon={faCalendar} className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-rif-black mb-2">
                        Project Timeline & Planning
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Set project dates, track milestones, and receive automated reminders for important deadlines and appointments.
                      </p>
                    </div>
                  </div>

                  {/* Feature 4 */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rif-blue-500 flex items-center justify-center">
                      <FontAwesomeIcon icon={faChartLine} className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-rif-black mb-2">
                        Track Project Progress
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Monitor your roofing project from start to finish with a comprehensive checklist and progress tracking tools.
                      </p>
                    </div>
                  </div>

                  {/* Feature 5 */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rif-blue-500 flex items-center justify-center">
                      <FontAwesomeIcon icon={faBookmark} className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-rif-black mb-2">
                        Saved Locations & Research
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Keep track of service areas you're researching, save notes about different locations, and organize your findings.
                      </p>
                    </div>
                  </div>

                  {/* Feature 6 */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rif-blue-500 flex items-center justify-center">
                      <FontAwesomeIcon icon={faHistory} className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-rif-black mb-2">
                        Project History
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Access your complete project history, including past estimates, completed projects, and warranty information.
                      </p>
                    </div>
                  </div>

                  {/* Feature 7 */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rif-blue-500 flex items-center justify-center">
                      <FontAwesomeIcon icon={faBell} className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-rif-black mb-2">
                        Personalized Notifications
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Get timely alerts about storm updates in your area, new roofers in your service area, and special offers.
                      </p>
                    </div>
                  </div>

                  {/* Feature 8 */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rif-blue-500 flex items-center justify-center">
                      <FontAwesomeIcon icon={faStar} className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-rif-black mb-2">
                        Exclusive Member Benefits
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Access member-only content, early access to new features, priority customer support, and exclusive discounts.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Security Note */}
                <div className="mt-8 pt-6 border-t border-rif-blue-200">
                  <div className="flex items-start gap-3 bg-white/50 rounded-lg p-4">
                    <FontAwesomeIcon icon={faShield} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Secure & Private</p>
                      <p className="text-xs text-gray-600">
                        Your information is encrypted and secure. We do not sell or share your data with third parties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 text-rif-blue-500 animate-spin" />
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}

















