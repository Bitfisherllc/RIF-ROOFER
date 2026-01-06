import type { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const metadata: Metadata = {
  title: 'Investment Opportunity | RIF Roofing',
  description:
    'Learn about the SEO benefits, business value, and partnership opportunities for investing in the RIF roofing website platform. Discover how this strategic SEO investment can dominate local roofing searches across Florida.',
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
  faMobile,
  faGlobe,
  faLightbulb,
  faHandshake,
  faPercent,
  faCreditCard,
  faCrown,
  faRocket,
  faCheckCircle,
  faPhone,
  faEnvelope,
  faBook,
  faWrench,
  faSync,
  faChartBar,
  faEdit,
  faBullhorn,
  faServer,
  faFileAlt,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';

export default function InvestmentOpportunityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black mb-6 tracking-tight">
            Investment Opportunity
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light leading-relaxed">
            A strategic SEO-first website designed to dominate local roofing searches across Florida
            and generate qualified leads for your business.
          </p>
        </div>
      </section>

      {/* What This Site Does */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="flex items-center justify-center gap-3 text-3xl md:text-4xl font-semibold text-rif-black mb-4">
              <FontAwesomeIcon icon={faGlobe} className="h-8 w-8 text-rif-blue-500" />
              What This Site Does
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              This website is a comprehensive SEO platform specifically designed to capture roofing-related
              searches across Florida and connect homeowners with certified stone-coated metal roofers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-gray-50 rounded-2xl">
              <h3 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-4">
                <FontAwesomeIcon icon={faSearch} className="h-6 w-6 text-rif-blue-500" />
                Local SEO Domination
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every region, county, city, and town in Florida gets its own optimized page targeting
                searches like "roofers in [city]", "metal roofing [county]", and "roof replacement [location]".
                This creates hundreds of indexable pages that rank for local searches.
              </p>
            </div>

            <div className="p-8 bg-gray-50 rounded-2xl">
              <h3 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-4">
                <FontAwesomeIcon icon={faUsers} className="h-6 w-6 text-rif-blue-500" />
                Roofer Directory Network
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                A comprehensive directory of certified roofers with individual profile pages, service area
                assignments, and preferred contractor status. Each roofer gets their own SEO-optimized page
                that links back to location pages.
              </p>
            </div>

            <div className="p-8 bg-gray-50 rounded-2xl">
              <h3 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-4">
                <FontAwesomeIcon icon={faBook} className="h-6 w-6 text-rif-blue-500" />
                Educational Content Hub
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Evergreen guides and articles about stone-coated metal roofing, storm damage, Florida building
                codes, and roofing best practices. This content builds authority and ranks for broader searches
                while linking to your service areas.
              </p>
            </div>

            <div className="p-8 bg-gray-50 rounded-2xl">
              <h3 className="flex items-center gap-3 text-2xl font-semibold text-rif-black mb-4">
                <FontAwesomeIcon icon={faShield} className="h-6 w-6 text-rif-blue-500" />
                Quality Control & Trust
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Preferred roofer badges, certification displays, and quality standards that position RIF as
                the trusted authority for stone-coated metal roofing in Florida. This builds consumer confidence
                and differentiates from generic directories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Benefits */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="flex items-center justify-center gap-3 text-3xl md:text-4xl font-semibold text-rif-black mb-4">
              <FontAwesomeIcon icon={faChartLine} className="h-8 w-8 text-rif-blue-500" />
              SEO Benefits & Competitive Advantages
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              This site is built from the ground up to dominate Google search results for roofing-related
              queries across Florida.
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-8 bg-white rounded-2xl shadow-sm">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">
                <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-rif-blue-500 mr-2" />
                Hundreds of Indexable Location Pages
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Every location (region, county, city, town) gets its own unique, localized page with real
                content about climate conditions, local landmarks, and area-specific roofing challenges.
                This isn't thin, duplicate content—each page is unique and valuable.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Targets long-tail keywords like "roofers in Winter Park" or "metal roofing Miami-Dade"</li>
                <li>Each page has unique, localized content that Google values</li>
                <li>Strong internal linking structure that distributes page authority</li>
                <li>Breadcrumb navigation and clear hierarchy for search engines</li>
              </ul>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-sm">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">
                <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-rif-blue-500 mr-2" />
                Technical SEO Excellence
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Built following Google Search Essentials and industry best practices:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Optimized meta titles and descriptions for every page</li>
                <li>Structured data (Schema.org) for breadcrumbs, FAQs, and organization</li>
                <li>XML sitemaps automatically generated for all pages</li>
                <li>Mobile-first responsive design (critical for local SEO)</li>
                <li>Fast page load times and clean HTML structure</li>
                <li>Canonical URLs to prevent duplicate content issues</li>
              </ul>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-sm">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">
                <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-rif-blue-500 mr-2" />
                Authority Building Through Content
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                The site includes comprehensive guides and educational content that:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Ranks for broader informational searches (e.g., "how to choose a roofer after a hurricane")</li>
                <li>Builds trust and positions RIF as the expert authority</li>
                <li>Links naturally to location pages and roofer profiles</li>
                <li>Attracts backlinks from other sites (natural link building)</li>
                <li>Keeps visitors on the site longer (reduces bounce rate)</li>
              </ul>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-sm">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">
                <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-rif-blue-500 mr-2" />
                Competitive Advantage Over Generic Directories
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Unlike generic roofing directories, this site:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Focuses specifically on stone-coated metal roofing (less competition)</li>
                <li>Has deep, localized content for every Florida location</li>
                <li>Shows preferred contractors first (quality over quantity)</li>
                <li>Includes distributor-backed benefits (wholesale pricing, priority materials)</li>
                <li>Provides educational content that builds trust and authority</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Business Benefits */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="flex items-center justify-center gap-3 text-3xl md:text-4xl font-semibold text-rif-black mb-4">
              <FontAwesomeIcon icon={faRocket} className="h-8 w-8 text-rif-blue-500" />
              Business Benefits & ROI
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              This investment delivers measurable returns through increased visibility, qualified leads,
              and brand authority.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-to-br from-rif-blue-50 to-white rounded-2xl border border-rif-blue-100">
              <div className="text-4xl font-bold text-rif-blue-500 mb-2">24/7</div>
              <h3 className="text-xl font-semibold text-rif-black mb-3">Always-On Lead Generation</h3>
              <p className="text-gray-600 leading-relaxed">
                The site works around the clock to capture searches and generate leads, even when your
                office is closed. No paid advertising required once rankings are established.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-rif-blue-50 to-white rounded-2xl border border-rif-blue-100">
              <div className="text-4xl font-bold text-rif-blue-500 mb-2">100+</div>
              <h3 className="text-xl font-semibold text-rif-black mb-3">Target Keywords</h3>
              <p className="text-gray-600 leading-relaxed">
                Each location page targets multiple keywords, creating hundreds of ranking opportunities
                across Florida. One investment, unlimited potential traffic.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-rif-blue-50 to-white rounded-2xl border border-rif-blue-100">
              <div className="text-4xl font-bold text-rif-blue-500 mb-2">Long-term</div>
              <h3 className="text-xl font-semibold text-rif-black mb-3">Sustainable Asset</h3>
              <p className="text-gray-600 leading-relaxed">
                Unlike paid ads that stop working when you stop paying, SEO rankings compound over time.
                This site becomes a valuable, appreciating digital asset.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-gray-50 rounded-2xl">
            <h3 className="text-2xl font-semibold text-rif-black mb-4">
              Additional Business Value
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-rif-black mb-2">Brand Authority</h4>
                <p className="text-gray-600">
                  Being the #1 result for roofing searches positions RIF as the trusted leader in
                  stone-coated metal roofing across Florida.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-rif-black mb-2">Network Growth</h4>
                <p className="text-gray-600">
                  The directory attracts new roofers to join the network, expanding your reach and
                  service coverage across Florida.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-rif-black mb-2">Data & Insights</h4>
                <p className="text-gray-600">
                  Track which locations generate the most interest, which roofers get the most views,
                  and optimize your business strategy accordingly.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-rif-black mb-2">Competitive Moat</h4>
                <p className="text-gray-600">
                  Once established, this SEO presence is difficult for competitors to replicate,
                  creating a sustainable competitive advantage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Profit Opportunities */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="flex items-center justify-center gap-3 text-3xl md:text-4xl font-semibold text-rif-black mb-4">
              <FontAwesomeIcon icon={faHandshake} className="h-8 w-8 text-rif-blue-500" />
              Partnership & Revenue Opportunities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              As the developer and technical partner, I've invested significant time and expertise in building
              this platform. Here are mutually beneficial ways we can structure our partnership:
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-8 bg-white rounded-2xl shadow-lg border-l-4 border-rif-blue-500">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-rif-blue-500 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faPercent} className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold text-rif-black mb-3">
                    Revenue Share on Leads
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-4">
                    Share a percentage of revenue from leads generated through the website. This aligns
                    our interests—I succeed when the site generates valuable business for you.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Trackable lead attribution through the website</li>
                    <li>Fair percentage based on lead quality and conversion rates</li>
                    <li>Monthly reporting and transparency</li>
                    <li>Win-win: You only pay when the site delivers results</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-lg border-l-4 border-rif-blue-500">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-rif-blue-500 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faDollarSign} className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold text-rif-black mb-3">
                    Per-Lead Fee Structure
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-4">
                    Pay a fixed fee for each qualified lead generated through the website. Simple,
                    predictable, and directly tied to results.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Define what constitutes a "qualified lead" upfront</li>
                    <li>Fixed fee per lead (e.g., $50-$200 depending on lead quality)</li>
                    <li>Only pay for leads that meet your criteria</li>
                    <li>Lower risk than revenue share, easier to budget</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-lg border-l-4 border-rif-blue-500">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-rif-blue-500 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faCreditCard} className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold text-rif-black mb-3">
                    Monthly Subscription + Performance Bonus
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-4">
                    A base monthly fee covers ongoing maintenance, updates, and technical support, with
                    performance bonuses when the site exceeds traffic or lead targets.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Base monthly fee for hosting, maintenance, and support</li>
                    <li>Performance bonuses when traffic/leads exceed targets</li>
                    <li>Predictable base cost with upside potential</li>
                    <li>Ensures ongoing technical support and improvements</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-lg border-l-4 border-rif-blue-500">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-rif-blue-500 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faCrown} className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold text-rif-black mb-3">
                    Preferred Listing Fees
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-4">
                    Roofers in the network pay a monthly or annual fee for preferred listing status,
                    premium placement, and enhanced profile features. Revenue is shared between us.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Preferred roofers get top placement on location pages</li>
                    <li>Enhanced profile pages with more features</li>
                    <li>Monthly/annual subscription model for roofers</li>
                    <li>Scalable revenue as the network grows</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-lg border-l-4 border-rif-blue-500">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-rif-blue-500 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faLightbulb} className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold text-rif-black mb-3">
                    Custom Development & Features
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-4">
                    Additional features and customizations can be developed on a project basis:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Lead capture forms and CRM integration</li>
                    <li>Review and rating systems</li>
                    <li>Advanced analytics and reporting dashboards</li>
                    <li>Mobile app development</li>
                    <li>Integration with your existing business systems</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 bg-rif-blue-50 rounded-2xl border border-rif-blue-200">
            <h3 className="text-2xl font-semibold text-rif-black mb-4 text-center">
              Flexible Partnership Structure
            </h3>
            <p className="text-lg text-gray-600 text-center leading-relaxed max-w-3xl mx-auto">
              We can combine these models or create a custom arrangement that works for your business.
              The goal is a sustainable partnership where we both benefit from the site's success.
              Let's discuss what structure makes the most sense for your goals and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Ongoing Services by Bitfisher LLC */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="flex items-center justify-center gap-3 text-3xl md:text-4xl font-semibold text-rif-black mb-4">
              <FontAwesomeIcon icon={faWrench} className="h-8 w-8 text-rif-blue-500" />
              Ongoing Services by Bitfisher LLC
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              As your technical partner, Bitfisher LLC provides comprehensive ongoing services to keep
              the site fresh, maintain SEO rankings, and drive continuous growth. Here's what we handle:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* SEO Maintenance */}
            <div className="p-8 bg-gray-50 rounded-2xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-rif-blue-500 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faSearch} className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold text-rif-black mb-3">
                    SEO Maintenance & Optimization
                  </h3>
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-16">
                <li>Monthly SEO audits and performance monitoring</li>
                <li>Keyword research and ranking tracking</li>
                <li>Meta tag optimization and updates</li>
                <li>Internal linking structure improvements</li>
                <li>Schema markup updates and enhancements</li>
                <li>XML sitemap updates and submission</li>
                <li>Google Search Console monitoring and fixes</li>
                <li>Core Web Vitals optimization</li>
                <li>Mobile-first indexing compliance</li>
              </ul>
            </div>

            {/* Content Updates */}
            <div className="p-8 bg-gray-50 rounded-2xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-rif-blue-500 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faEdit} className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold text-rif-black mb-3">
                    Content Updates & Freshness
                  </h3>
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-16">
                <li>Regular content updates to location pages</li>
                <li>New guide articles (2-4 per month)</li>
                <li>Seasonal content updates (hurricane season, etc.)</li>
                <li>FAQ section expansions and updates</li>
                <li>Roofer profile content updates</li>
                <li>Blog posts about industry trends and news</li>
                <li>Content refresh for underperforming pages</li>
                <li>Local event and news integration</li>
              </ul>
            </div>

            {/* Technical Maintenance */}
            <div className="p-8 bg-gray-50 rounded-2xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-rif-blue-500 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faServer} className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold text-rif-black mb-3">
                    Technical Maintenance
                  </h3>
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-16">
                <li>Hosting management and uptime monitoring</li>
                <li>Security updates and patches</li>
                <li>Performance optimization and speed improvements</li>
                <li>Backup management and disaster recovery</li>
                <li>SSL certificate maintenance</li>
                <li>Database optimization</li>
                <li>Bug fixes and error resolution</li>
                <li>Browser compatibility testing</li>
                <li>Third-party integration updates</li>
              </ul>
            </div>

            {/* Analytics & Reporting */}
            <div className="p-8 bg-gray-50 rounded-2xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-rif-blue-500 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faChartBar} className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold text-rif-black mb-3">
                    Analytics & Reporting
                  </h3>
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-16">
                <li>Monthly performance reports (traffic, rankings, leads)</li>
                <li>Google Analytics setup and monitoring</li>
                <li>Search Console data analysis</li>
                <li>Lead tracking and attribution reporting</li>
                <li>Conversion rate optimization insights</li>
                <li>Competitor analysis and benchmarking</li>
                <li>User behavior analysis and recommendations</li>
                <li>ROI tracking and reporting</li>
              </ul>
            </div>

            {/* Marketing & Promotion */}
            <div className="p-8 bg-gray-50 rounded-2xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-rif-blue-500 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faBullhorn} className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold text-rif-black mb-3">
                    Marketing & Promotion
                  </h3>
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-16">
                <li>Social media content creation and sharing</li>
                <li>Email marketing campaign management</li>
                <li>Local business directory submissions</li>
                <li>Google Business Profile optimization</li>
                <li>Backlink building and outreach</li>
                <li>Press release distribution (when relevant)</li>
                <li>Community engagement and local partnerships</li>
                <li>Seasonal marketing campaigns</li>
              </ul>
            </div>

            {/* Feature Development */}
            <div className="p-8 bg-gray-50 rounded-2xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-rif-blue-500 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faSync} className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold text-rif-black mb-3">
                    Continuous Feature Development
                  </h3>
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-16">
                <li>New feature development based on business needs</li>
                <li>User experience improvements</li>
                <li>Mobile app development (if needed)</li>
                <li>Integration with new tools and platforms</li>
                <li>A/B testing and optimization</li>
                <li>Accessibility improvements (WCAG compliance)</li>
                <li>Multi-language support (if expanding)</li>
                <li>Advanced search and filtering features</li>
              </ul>
            </div>
          </div>

          {/* Service Frequency Summary */}
          <div className="mt-12 p-8 bg-gradient-to-br from-rif-blue-50 to-white rounded-2xl border-2 border-rif-blue-200">
            <h3 className="text-2xl font-semibold text-rif-black mb-6 text-center">
              Service Frequency & Commitment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-rif-blue-500 rounded-full mb-4">
                  <FontAwesomeIcon icon={faCalendar} className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-rif-black mb-2">Daily</h4>
                <p className="text-gray-600">
                  Uptime monitoring, security checks, error monitoring
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-rif-blue-500 rounded-full mb-4">
                  <FontAwesomeIcon icon={faCalendar} className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-rif-black mb-2">Weekly</h4>
                <p className="text-gray-600">
                  Content updates, SEO monitoring, performance checks
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-rif-blue-500 rounded-full mb-4">
                  <FontAwesomeIcon icon={faFileAlt} className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-rif-black mb-2">Monthly</h4>
                <p className="text-gray-600">
                  Comprehensive reports, SEO audits, new content, feature updates
                </p>
              </div>
            </div>
            <div className="mt-8 p-6 bg-white rounded-xl border border-rif-blue-100">
              <p className="text-lg text-gray-700 text-center leading-relaxed">
                <strong className="text-rif-black">Bitfisher LLC</strong> is committed to keeping your
                website at peak performance. We proactively monitor, update, and optimize to ensure
                continuous growth in rankings, traffic, and lead generation. You focus on your business—
                we handle the technical and marketing aspects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-rif-blue-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            Ready to Dominate Florida Roofing Searches?
          </h2>
          <p className="text-xl text-rif-blue-100 mb-8 leading-relaxed">
            This website is a strategic investment in your long-term digital presence and lead generation.
            Let's discuss how we can structure a partnership that works for both of us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:813-777-8272"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-rif-blue-500 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <FontAwesomeIcon icon={faPhone} className="h-5 w-5" />
              Call 813-777-8272
            </a>
            <a
              href="mailto:info@rifroofing.com"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-rif-blue-500 transition-all duration-200"
            >
              <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
















