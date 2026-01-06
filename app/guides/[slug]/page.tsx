import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faCalendar,
  faBook,
  faUser,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { getGuideData, getAllGuides, type GuideData } from '../data/guides';

interface GuidePageProps {
  params: { slug: string };
}

const categoryLabels: Record<string, string> = {
  'location-specific': 'Location-Specific Guides',
  'local-information': 'Local Information & Area Guides',
  'storm-damage': 'Storm Damage & Hurricane Recovery',
  'material-education': 'Roofing Material Education',
  'process-guides': 'Roofing Process & What to Expect',
  'seasonal': 'Seasonal & Maintenance',
  'cost-guides': 'Cost & Budgeting',
  'problem-solving': 'Problem-Solving & Troubleshooting',
  'building-code': 'Building Code & Compliance',
  'energy-efficiency': 'Energy Efficiency & Sustainability',
  'case-studies': 'Case Studies',
  'industry-news': 'Industry News & Updates',
  'commercial': 'Commercial Roofing',
};

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const guide = getGuideData(params.slug);
  
  if (!guide) {
    return {
      title: 'Guide Not Found | RIF Roofing',
    };
  }

  return {
    title: `${guide.title} | RIF Roofing`,
    description: guide.metaDescription || guide.excerpt || guide.introduction.substring(0, 160),
  };
}

export default function GuidePage({ params }: GuidePageProps) {
  const guide = getGuideData(params.slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-20 pb-8 px-6 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-rif-blue-500 hover:text-rif-blue-600 mb-6 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
            <span>Back to Guides</span>
          </Link>

          <div className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-rif-blue-50 text-rif-blue-700 rounded-lg text-sm font-medium">
              <FontAwesomeIcon icon={faBook} className="h-4 w-4" />
              {categoryLabels[guide.category] || guide.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black mb-6 tracking-tight">
            {guide.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            {guide.publishDate && (
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendar} className="h-4 w-4" />
                <span>
                  Published {new Date(guide.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}
            {guide.lastUpdated && guide.lastUpdated !== guide.publishDate && (
              <div className="flex items-center gap-2">
                <span>
                  Updated {new Date(guide.lastUpdated).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}
            {guide.author && (
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
                <span>{guide.author}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {guide.featuredImage && (
        <section className="px-6 py-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={guide.featuredImage}
                alt={guide.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <article className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-700 leading-relaxed">
              {guide.introduction}
            </p>
          </div>

          {/* Content Sections */}
          <div className="prose prose-lg max-w-none">
            {guide.content.map((section, index) => {
              const HeadingTag = `h${section.headingLevel}` as keyof JSX.IntrinsicElements;
              return (
                <div key={index} className="mb-12">
                  <HeadingTag className="text-3xl font-semibold text-rif-black mb-4 mt-8 first:mt-0">
                    {section.heading}
                  </HeadingTag>
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                  {section.subsections && section.subsections.map((subsection, subIndex) => {
                    const SubHeadingTag = `h${subsection.headingLevel}` as keyof JSX.IntrinsicElements;
                    return (
                      <div key={subIndex} className="mt-6">
                        <SubHeadingTag className="text-2xl font-semibold text-rif-black mb-3">
                          {subsection.heading}
                        </SubHeadingTag>
                        <div
                          className="text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: subsection.content }}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* FAQ Section */}
          {guide.faq && guide.faq.length > 0 && (
            <div className="mt-16 mb-12">
              <h2 className="text-3xl font-semibold text-rif-black mb-8">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {guide.faq.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-rif-black mb-3">
                      {item.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Guides */}
          {guide.relatedGuides && guide.relatedGuides.length > 0 && (
            <div className="mt-16 mb-12 pt-12 border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-rif-black mb-6">Related Guides</h2>
              <div className="space-y-3">
                {guide.relatedGuides.map((relatedSlug) => {
                  const relatedGuide = getGuideData(relatedSlug);
                  if (!relatedGuide) return null;
                  return (
                    <Link
                      key={relatedSlug}
                      href={`/guides/${relatedSlug}`}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <span className="text-rif-black font-medium group-hover:text-rif-blue-500 transition-colors">
                        {relatedGuide.title}
                      </span>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="h-4 w-4 text-gray-400 group-hover:text-rif-blue-500 group-hover:translate-x-1 transition-all"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="bg-rif-blue-50 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-semibold text-rif-black mb-4">
                Need Help with Your Roofing Project?
              </h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Connect with certified, trained roofers who install stone-coated metal roofing systems correctly and consistently across Florida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/roofers"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium"
                >
                  Find a Certified Roofer
                </Link>
                <Link
                  href="/free-estimate"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
                >
                  Get a Free Estimate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
