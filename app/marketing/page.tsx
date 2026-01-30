import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobe,
  faPhone,
  faEnvelope,
  faArrowRight,
  faFileLines,
  faBullhorn,
  faMagnifyingGlass,
  faPalette,
  faFilePen,
} from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'The Full Package | Marketing & Web | RIF Roofing',
  description:
    'Complete marketing for stone-coated metal roofing companies. Bitfisher Design delivers websites, print collateral, marketing & SEO. One creative partner for your brand.',
};

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-16 px-6 bg-rif-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <a
              href="https://bitfisher.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block focus:outline-none focus:ring-2 focus:ring-white/50 rounded-xl"
              aria-label="Bitfisher Design"
            >
              <Image
                src="https://bitfisher.com/wp-content/uploads/2023/08/light-logo.svg"
                alt="Bitfisher Design"
                width={220}
                height={48}
                className="h-12 w-auto"
              />
            </a>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            The Full Package
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
            Complete marketing for your stone-coated metal roofing company: websites, print collateral, marketing & SEO. One partner for your brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://bitfisher.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              <FontAwesomeIcon icon={faPalette} className="h-5 w-5" />
              Visit designer website
            </a>
            <Link
              href="/marketing/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-rif-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
            >
              <FontAwesomeIcon icon={faFilePen} className="h-5 w-5" />
              Free creative estimate
            </Link>
          </div>
        </div>
      </section>

      {/* Bitfisher Design - adjoined to RIF */}
      <section className="py-16 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-rif-black text-center mb-8">
            Our creative partner: Bitfisher Design
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            RIF&apos;s marketing is powered by <a href="https://bitfisher.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-rif-blue-600 hover:text-rif-blue-700 underline">Bitfisher Design</a>—our creative partner and the core of RIF and PRP marketing. Bitfisher is invested in RIF, and when you work with us, you&apos;re working with a team that wants you to succeed. From concept to delivery, we bring true artistry and seasoned business acumen to every project, helping stone-coated metal roofing contractors and distributors build a dynamic, engaging brand presence online and in print.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Bitfisher brings over 35 years of industry experience to our team. As a boutique firm centered around customer care, they serve a limited, select client base so every client feels like the main priority. Whether you&apos;re an established roofing business or just starting out, we work with you to meet and exceed your goals with proven, measurable results.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our solutions blend traditional print, digital marketing, web development, and more—bridging the gap between your brand and your audience. <a href="https://bitfisher.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-rif-blue-600 hover:text-rif-blue-700 underline">Explore Bitfisher Design at bitfisher.com</a> to see the full range of services and case studies.
          </p>
        </div>
      </section>

      {/* What we can do for your roofing business */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-rif-black text-center mb-4">
            What we can do for your roofing business
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            We offer a complete marketing solution for your stone-coated metal roofing company—websites, print, marketing, and SEO—built for contractors and distributors who want to stand out.
          </p>
          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4 p-6 rounded-2xl border-2 border-rif-blue-100 bg-rif-blue-50/50">
              <FontAwesomeIcon icon={faGlobe} className="h-6 w-6 text-rif-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-rif-black mb-1">Websites</h3>
                <p className="text-gray-600">Professional websites for your stone-coated metal roofing business—new builds or refreshes—built and maintained by our team.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl border-2 border-rif-blue-100 bg-rif-blue-50/50">
              <FontAwesomeIcon icon={faFileLines} className="h-6 w-6 text-rif-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-rif-black mb-1">Print collateral</h3>
                <p className="text-gray-600">Brochures, flyers, business cards, and other print materials to represent your brand.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl border-2 border-rif-blue-100 bg-rif-blue-50/50">
              <FontAwesomeIcon icon={faBullhorn} className="h-6 w-6 text-rif-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-rif-black mb-1">Marketing</h3>
                <p className="text-gray-600">Campaigns, branding, and ongoing marketing support so your roofing company stays visible to customers and stands out in your market.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl border-2 border-rif-blue-100 bg-rif-blue-50/50">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="h-6 w-6 text-rif-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-rif-black mb-1">SEO</h3>
                <p className="text-gray-600">Search engine optimization so your business shows up when homeowners and contractors search for stone-coated metal roofing and related services.</p>
              </div>
            </div>
          </div>

          {/* CTA - same blue section with contact options */}
          <div className="rounded-2xl overflow-hidden border-2 border-rif-blue-200">
            <div className="p-8 md:p-10 bg-rif-blue-600 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to learn more?</h3>
              <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                Contact our marketing team to discuss the Full Package for your stone-coated metal roofing business. We deliver complete marketing—websites, print collateral, marketing & SEO.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
                <a
                  href="https://bitfisher.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                >
                  <FontAwesomeIcon icon={faPalette} className="h-5 w-5" />
                  Visit designer website
                </a>
                <Link
                  href="/marketing/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-rif-blue-600 text-lg font-semibold rounded-xl hover:bg-blue-50 transition-colors"
                >
                  <FontAwesomeIcon icon={faFilePen} className="h-5 w-5" />
                  Free creative estimate
                </Link>
                <a
                  href="tel:410-430-6904"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                >
                  <FontAwesomeIcon icon={faPhone} className="h-5 w-5" />
                  410-430-6904
                </a>
                <Link
                  href="/marketing/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
                  Contact us
                </Link>
              </div>
              <p className="text-sm text-blue-100 mt-4">Craig Costantino, Owner Operator, Creative Director · Bitfisher Design (Marketing)</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/partnerships"
              className="inline-flex items-center gap-2 text-rif-blue-600 font-semibold hover:text-rif-blue-700"
            >
              <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 rotate-180" />
              Back to Partnerships
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
