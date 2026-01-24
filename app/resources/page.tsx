import Link from 'next/link';
import type { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faPlayCircle,
  faQuestionCircle,
  faArrowRight,
  faGraduationCap,
  faFilm,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { getAllGuides } from '@/app/guides/data/guides';

export const metadata: Metadata = {
  title: 'Resources Overview | RIF Roofing',
  description: 'Comprehensive resources for stone-coated metal roofing in Florida, including guides, videos, glossary, and FAQs.',
};

export default async function ResourcesOverviewPage() {
  const allGuides = getAllGuides();

  const resources = [
    {
      title: 'Guides',
      description:
        'Expert guides on roofing in Florida, from choosing the right materials to navigating storm damage and finding trusted roofers in your area. Comprehensive articles covering installation, maintenance, cost considerations, and more.',
      icon: faBook,
      href: '/guides',
      color: 'rif-blue',
      count: allGuides.length,
      features: [
        'Location-specific roofing guides',
        'Storm damage & hurricane recovery',
        'Material selection advice',
        'Cost & budgeting information',
        'Maintenance best practices',
      ],
    },
    {
      title: 'Videos',
      description:
        'Educational videos about stone-coated metal roofing, performance testing, brand information, and buyer guides. Watch demonstrations, learn from experts, and see real-world performance in storms and tests.',
      icon: faPlayCircle,
      href: '/videos',
      color: 'red',
      count: 100,
      features: [
        'Buyer education videos',
        'Performance testing demonstrations',
        'Brand explainers & comparisons',
        'Hurricane & storm performance',
        'Installation insights',
      ],
    },
    {
      title: 'Glossary',
      description:
        'Comprehensive glossary of stone-coated metal roofing terms, definitions, and industry terminology. Understand technical terms, industry jargon, and roofing concepts to make informed decisions.',
      icon: faGraduationCap,
      href: '/glossary',
      color: 'purple',
      count: null,
      features: [
        'Industry terminology explained',
        'Technical term definitions',
        'Roofing system components',
        'Material specifications',
        'Building code terms',
      ],
    },
    {
      title: 'FAQ',
      description:
        'Frequently asked questions about stone-coated metal roofing, installation, costs, warranties, and maintenance. Get answers to common questions from homeowners considering stone-coated metal roofing.',
      icon: faQuestionCircle,
      href: '/faq',
      color: 'green',
      count: null,
      features: [
        'Installation questions',
        'Cost & value information',
        'Maintenance & care tips',
        'Warranty explanations',
        'Florida-specific considerations',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="p-5 bg-gradient-to-br from-rif-blue-500 to-rif-blue-600 rounded-3xl shadow-lg">
              <FontAwesomeIcon icon={faBook} className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black mb-6 tracking-tight">
            Resources
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-light mb-4">
            Comprehensive resources for stone-coated metal roofing in Florida
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to make informed decisions about your roofing project, from expert guides to educational videos, terminology explanations, and frequently asked questions.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((resource, index) => {
              const colorClasses = {
                'rif-blue': 'bg-rif-blue-500 text-white',
                red: 'bg-red-500 text-white',
                purple: 'bg-purple-500 text-white',
                green: 'bg-green-500 text-white',
              };

              const hoverColorClasses = {
                'rif-blue': 'hover:bg-rif-blue-600 border-rif-blue-200',
                red: 'hover:bg-red-600 border-red-200',
                purple: 'hover:bg-purple-600 border-purple-200',
                green: 'hover:bg-green-600 border-green-200',
              };

              const iconBgClasses = {
                'rif-blue': 'bg-rif-blue-100 text-rif-blue-600',
                red: 'bg-red-100 text-red-600',
                purple: 'bg-purple-100 text-purple-600',
                green: 'bg-green-100 text-green-600',
              };

              return (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="group block bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-6 mb-6">
                    <div className={`p-4 rounded-xl ${iconBgClasses[resource.color as keyof typeof iconBgClasses]}`}>
                      <FontAwesomeIcon icon={resource.icon} className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold text-rif-black group-hover:text-rif-blue-600 transition-colors">
                          {resource.title}
                        </h2>
                        {resource.count !== null && (
                          <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {resource.count} {resource.count === 1 ? 'item' : 'items'}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 leading-relaxed">{resource.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                      What's Included:
                    </h3>
                    <ul className="space-y-2">
                      {resource.features.map((feature, featureIndex) => {
                        const arrowColorClass = 
                          resource.color === 'rif-blue' ? 'text-rif-blue-500' :
                          resource.color === 'red' ? 'text-red-500' :
                          resource.color === 'purple' ? 'text-purple-500' :
                          'text-green-500';
                        return (
                          <li key={featureIndex} className="flex items-start gap-2 text-gray-600">
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className={`h-4 w-4 mt-1 flex-shrink-0 ${arrowColorClass}`}
                            />
                            <span>{feature}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${colorClasses[resource.color as keyof typeof colorClasses]} ${hoverColorClasses[resource.color as keyof typeof hoverColorClasses]}`}
                  >
                    <span>Explore {resource.title}</span>
                    <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-rif-black mb-8 text-center">
            Quick Access to Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/guides"
              className="flex items-center gap-4 p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-rif-blue-500 hover:shadow-lg transition-all group"
            >
              <div className="p-3 bg-rif-blue-100 rounded-lg group-hover:bg-rif-blue-500 transition-colors">
                <FontAwesomeIcon
                  icon={faBook}
                  className="h-6 w-6 text-rif-blue-600 group-hover:text-white transition-colors"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-rif-black group-hover:text-rif-blue-600 transition-colors">
                  Browse Guides
                </h3>
                <p className="text-sm text-gray-600">Expert roofing guides and articles</p>
              </div>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="h-5 w-5 text-gray-400 group-hover:text-rif-blue-500 group-hover:translate-x-1 transition-all"
              />
            </Link>

            <Link
              href="/videos"
              className="flex items-center gap-4 p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-red-500 hover:shadow-lg transition-all group"
            >
              <div className="p-3 bg-red-100 rounded-lg group-hover:bg-red-500 transition-colors">
                <FontAwesomeIcon
                  icon={faPlayCircle}
                  className="h-6 w-6 text-red-600 group-hover:text-white transition-colors"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-rif-black group-hover:text-red-600 transition-colors">
                  Watch Videos
                </h3>
                <p className="text-sm text-gray-600">Educational videos and demonstrations</p>
              </div>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="h-5 w-5 text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all"
              />
            </Link>

            <Link
              href="/glossary"
              className="flex items-center gap-4 p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:shadow-lg transition-all group"
            >
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-500 transition-colors">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-rif-black group-hover:text-purple-600 transition-colors">
                  View Glossary
                </h3>
                <p className="text-sm text-gray-600">Industry terms and definitions</p>
              </div>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="h-5 w-5 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all"
              />
            </Link>

            <Link
              href="/faq"
              className="flex items-center gap-4 p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-green-500 hover:shadow-lg transition-all group"
            >
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-500 transition-colors">
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className="h-6 w-6 text-green-600 group-hover:text-white transition-colors"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-rif-black group-hover:text-green-600 transition-colors">
                  Read FAQ
                </h3>
                <p className="text-sm text-gray-600">Common questions and answers</p>
              </div>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="h-5 w-5 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-rif-black mb-6">
            Need More Help?
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Can't find what you're looking for? Our team is here to help. Contact us for personalized assistance with your roofing questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rif-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-rif-blue-600 transition-colors"
            >
              <FontAwesomeIcon icon={faQuestionCircle} className="h-5 w-5" />
              Contact Us
            </Link>
            <Link
              href="/free-estimate"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-rif-blue-500 text-rif-blue-500 text-lg font-semibold rounded-lg hover:bg-rif-blue-50 transition-colors"
            >
              Get Free Estimate
              <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

