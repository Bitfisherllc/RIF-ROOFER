import type { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const metadata: Metadata = {
  title: 'Investment Opportunity | RIF Roofing',
  description:
    'SEO benefits, business value, and partnership opportunities for the RIF roofing platform. Strategic investment in Florida roofing search visibility and lead generation.',
  keywords: [
    'roofing website investment',
    'SEO for roofing business',
    'roofing lead generation',
    'Florida roofing SEO',
    'roofing website partnership',
  ],
  openGraph: {
    title: 'Investment Opportunity | RIF Roofing',
    description:
      'Learn about the SEO benefits, business value, and partnership opportunities for investing in the RIF roofing website platform.',
    type: 'website',
  },
};

import {
  faSearch,
  faChartLine,
  faUsers,
  faDollarSign,
  faShield,
  faBook,
  faHandshake,
  faPercent,
  faCreditCard,
  faCrown,
  faRocket,
  faCheckCircle,
  faPhone,
  faEnvelope,
  faWrench,
  faChartBar,
  faEdit,
  faServer,
} from '@fortawesome/free-solid-svg-icons';

export default function InvestmentOpportunityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-16 pb-12 px-6 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
            Investment Opportunity
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            A strategic SEO platform built to capture Florida roofing searches and connect homeowners with certified stone-coated metal roofers.
          </p>
        </div>
      </section>

      {/* What the platform does — compact grid */}
      <section className="py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            What This Platform Does
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-rif-blue-500 flex items-center justify-center">
                <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Local SEO</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Optimized pages for every region, county, city, and town—targeting “roofers in [city]”, “metal roofing [county]”, and similar queries.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-rif-blue-500 flex items-center justify-center">
                <FontAwesomeIcon icon={faUsers} className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Roofer directory</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Certified roofers with profile pages, service areas, and preferred status—each page SEO-optimized and linked to location pages.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-rif-blue-500 flex items-center justify-center">
                <FontAwesomeIcon icon={faBook} className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Content hub</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Guides on stone-coated metal roofing, storm damage, and Florida codes—builds authority and links to service areas.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-rif-blue-500 flex items-center justify-center">
                <FontAwesomeIcon icon={faShield} className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Trust & quality</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Preferred badges, certifications, and standards that position RIF as the trusted authority for metal roofing in Florida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO & business value — single column, scannable */}
      <section className="py-14 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faChartLine} className="h-6 w-6 text-rif-blue-500" />
            SEO & business value
          </h2>
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Hundreds of unique location pages with real, localized content—not thin or duplicate.</span>
            </li>
            <li className="flex gap-3 items-start">
              <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Technical SEO: meta tags, Schema.org, sitemaps, mobile-first, fast load, canonicals.</span>
            </li>
            <li className="flex gap-3 items-start">
              <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Content that ranks for informational queries and links to locations and roofers.</span>
            </li>
            <li className="flex gap-3 items-start">
              <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Focused on stone-coated metal roofing and deep Florida coverage—differentiated from generic directories.</span>
            </li>
          </ul>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-5 rounded-xl bg-white border border-slate-200">
              <div className="text-2xl font-bold text-rif-blue-500 mb-1">24/7</div>
              <div className="text-sm font-medium text-gray-900">Lead generation</div>
              <p className="text-xs text-gray-600 mt-1">No paid ads required once rankings are in place.</p>
            </div>
            <div className="text-center p-5 rounded-xl bg-white border border-slate-200">
              <div className="text-2xl font-bold text-rif-blue-500 mb-1">100+</div>
              <div className="text-sm font-medium text-gray-900">Keyword targets</div>
              <p className="text-xs text-gray-600 mt-1">Hundreds of ranking opportunities across Florida.</p>
            </div>
            <div className="text-center p-5 rounded-xl bg-white border border-slate-200">
              <div className="text-2xl font-bold text-rif-blue-500 mb-1">Long-term</div>
              <div className="text-sm font-medium text-gray-900">Asset</div>
              <p className="text-xs text-gray-600 mt-1">SEO compounds; the site appreciates as a digital asset.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership options */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faHandshake} className="h-6 w-6 text-rif-blue-500" />
            Partnership & revenue options
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
            Flexible ways to structure our partnership so we both benefit from the platform’s success.
          </p>
          <div className="space-y-5">
            <div className="flex gap-4 p-5 rounded-xl border border-slate-200 bg-white hover:border-rif-blue-200 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-rif-blue-500 flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon icon={faPercent} className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Revenue share on leads</h3>
                <p className="text-sm text-gray-600">Percentage of revenue from website-generated leads; trackable attribution and monthly reporting.</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 rounded-xl border border-slate-200 bg-white hover:border-rif-blue-200 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-rif-blue-500 flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon icon={faDollarSign} className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Per-lead fee</h3>
                <p className="text-sm text-gray-600">Fixed fee per qualified lead; simple, predictable, and tied to results.</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 rounded-xl border border-slate-200 bg-white hover:border-rif-blue-200 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-rif-blue-500 flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon icon={faCreditCard} className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Monthly subscription + bonus</h3>
                <p className="text-sm text-gray-600">Base fee for maintenance and support; performance bonuses when traffic or leads exceed targets.</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 rounded-xl border border-slate-200 bg-white hover:border-rif-blue-200 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-rif-blue-500 flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon icon={faCrown} className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Preferred listing fees</h3>
                <p className="text-sm text-gray-600">Roofers pay for preferred placement and enhanced profiles; revenue shared between us.</p>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-600 text-sm mt-8">
            We can combine these or design a custom structure that fits your goals and budget.
          </p>
        </div>
      </section>

      {/* Bitfisher ongoing services — compact */}
      <section className="py-14 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faWrench} className="h-6 w-6 text-rif-blue-500" />
            Ongoing services (Bitfisher LLC)
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
            Technical partner support to keep the site current, maintain rankings, and support growth.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-rif-blue-500" />
                <h3 className="font-semibold text-gray-900">SEO</h3>
              </div>
              <p className="text-sm text-gray-600">Audits, keyword tracking, meta and schema updates, internal linking, sitemaps, Search Console, Core Web Vitals.</p>
            </div>
            <div className="p-5 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <FontAwesomeIcon icon={faEdit} className="h-5 w-5 text-rif-blue-500" />
                <h3 className="font-semibold text-gray-900">Content</h3>
              </div>
              <p className="text-sm text-gray-600">Location and guide updates, new articles, seasonal and FAQ updates, roofer profile freshness.</p>
            </div>
            <div className="p-5 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <FontAwesomeIcon icon={faServer} className="h-5 w-5 text-rif-blue-500" />
                <h3 className="font-semibold text-gray-900">Technical</h3>
              </div>
              <p className="text-sm text-gray-600">Hosting, security, performance, backups, SSL, bug fixes, and compatibility.</p>
            </div>
            <div className="p-5 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <FontAwesomeIcon icon={faChartBar} className="h-5 w-5 text-rif-blue-500" />
                <h3 className="font-semibold text-gray-900">Analytics</h3>
              </div>
              <p className="text-sm text-gray-600">Monthly reports, Analytics and Search Console, lead attribution, conversion and ROI tracking.</p>
            </div>
            <div className="p-5 rounded-xl bg-white border border-slate-200 sm:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <FontAwesomeIcon icon={faRocket} className="h-5 w-5 text-rif-blue-500" />
                <h3 className="font-semibold text-gray-900">Commitment</h3>
              </div>
              <p className="text-sm text-gray-600">
                Daily monitoring and checks; weekly content and SEO work; monthly reports, audits, and feature updates. Bitfisher keeps the site at peak performance so you can focus on your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-6 bg-rif-blue-500">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Ready to grow your Florida roofing presence?
          </h2>
          <p className="text-rif-blue-100 mb-8">
            Let’s discuss a partnership structure that works for both of us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:813-777-8272"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-rif-blue-500 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FontAwesomeIcon icon={faPhone} className="h-5 w-5" />
              Call 813-777-8272
            </a>
            <a
              href="mailto:info@rifroofing.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-rif-blue-500 transition-colors"
            >
              <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
              Email us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
