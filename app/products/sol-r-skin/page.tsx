import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faExternalLink, faShield, faLeaf, faHome, faWrench, faWind, faFire, faCloudRain } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';
import StickyProductNav from '@/components/StickyProductNav';

export const metadata: Metadata = {
  title: 'SOL-R-SKIN Roofing Membrane',
  description: 'SOL-R-SKIN is an innovative roofing membrane solution providing superior protection, energy efficiency, and weather resistance for residential and commercial roofing applications.',
  keywords: [
    'SOL-R-SKIN',
    'SOL-R-SKIN Membrane',
    'roofing membranes',
    'roofing underlayment',
    'Florida roofing',
    'roofing products',
  ],
};

const productLines = [
  { 
    name: 'Roofing Membrane', 
    slug: 'sol-r-skin-membrane',
    description: 'Advanced roofing membrane with superior protection and energy efficiency'
  },
];

const galleryImages: { src: string; alt: string }[] = [
  { src: 'https://prproofing.com/wp-content/uploads/2025/12/sol-r-skin-banner-scaled.webp', alt: 'SOL-R-SKIN Radiant Barrier Underlayment' },
  { src: 'https://prproofing.com/wp-content/uploads/2025/12/sol-r-skin_1.jpg', alt: 'SOL-R-SKIN Product Detail' },
  { src: 'https://prproofing.com/wp-content/uploads/2025/12/with-sol-r-skin-class-a.jpg', alt: 'With SOL-R-SKIN Class A' },
  { src: 'https://prproofing.com/wp-content/uploads/2025/12/without-sol-r-skin.jpg', alt: 'Without SOL-R-SKIN Comparison' },
];

export default function SOLRSKINProductPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <StickyProductNav
        logoPath="/products/logos/sol-r-skin.svg"
        logoAlt="SOL-R-SKIN Logo"
        backToProductsHref="/products"
        freeEstimateHref="/free-estimate"
        productSlug="sol-r-skin"
        productName="SOL-R-SKIN"
        productCategory="Roofing Membrane"
      />
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <span className="text-sm uppercase tracking-wider text-gray-400 mb-4 block">MEMBRANES</span>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                SOL-R-SKIN
              </h1>
              <h2 className="text-3xl md:text-4xl font-light text-gray-300 mb-8">
                Superior Protection & Energy Efficiency
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
                SOL-R-SKIN is an innovative roofing membrane solution providing superior protection, energy efficiency, and weather resistance for residential and commercial roofing applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <a
                  href="https://iiproducts.com/sol-r-skin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium"
                >
                  Visit website
                  <FontAwesomeIcon icon={faExternalLink} className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="https://prproofing.com/wp-content/uploads/2025/12/sol-r-skin-banner-scaled.webp"
                alt="SOL-R-SKIN Radiant Barrier Underlayment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-6 right-6 bg-gray-800 rounded-lg p-4 shadow-xl">
                <Image
                  src="/products/logos/sol-r-skin.svg"
                  alt="SOL-R-SKIN Logo"
                  width={140}
                  height={65}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
            Introducing <span className="text-rif-blue-500">SOL-R-SKIN</span>
          </h2>
          <p className="text-2xl text-gray-600 mb-12 font-light">
            Superior Protection & Energy Efficiency
          </p>
          <div className="prose prose-lg max-w-none text-left">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong>SOL-R-SKIN</strong> is a next-generation underlayment that blends the weather protection of a synthetic roofing underlayment with the thermal and fire characteristics of advanced insulation. Keep your roof cooler from the inside out with SOL-R-SKIN radiant barrier underlayment—a thin, high-performance layer that reflects up to 97% of radiant heat, boosts effective R-value, and delivers Class A fire-rated protection under shingles, tile, metal, and stone coated roofing.
            </p>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500 mb-6">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Class A Thermal Underlayment</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                SOL-R-SKIN Class A Thermal Underlayment starts with a 99% highly polished, scrim-reinforced aluminum layer, bonded to fiberglass, then laminated to a synthetic underlayment substrate. The result is a robust radiant barrier underlayment that pairs thermal performance with a high level of fire resistance. Tested thermal performance of approximately R-5.5 (ASTM C1363/C1224), with Class A / Class 1 fire rating as tested to ASTM E108 and ASTM E84.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                SOL-R-SKIN is approved for use under shingles, tiles, metal roofing, and stone coated metal roofing systems. It meets requirements for Wildland Urban Interface (WUI) applications and is listed with CalFire, Miami-Dade County, Florida Product Approval, and Intertek for code compliance in demanding jurisdictions.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500 mb-6">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Radiant Barrier Technology & High R-Values</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                SOL-R-SKIN Composite Underlayment combines a strong synthetic underlayment with a scrim-reinforced, highly polished aluminum radiant barrier that faces outward to reflect radiant heat before it enters the roofing assembly. The radiant barrier surface has an emissivity of approximately 0.03, reflecting about 97% of radiant heat flow.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                SOL-R-SKIN uses a heat-sealing process that bonds the layers into a single, more rigid structure for improved strength and long-term stability on the roof. This helps reduce attic and roof-deck temperatures, improve indoor comfort, and lower cooling energy demands—particularly valuable in Florida's hot, sunny climate.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Durability & Longevity</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                SOL-R-SKIN roofing membrane is designed for long-lasting performance. The durable materials resist degradation from UV exposure, temperature extremes, and weather conditions, ensuring reliable protection for years to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Lines Section */}
      {productLines.length > 0 && (
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
                SOL-R-SKIN
              </h2>
              <h3 className="text-3xl md:text-4xl font-semibold text-gray-600">
                Product Line
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productLines.map((product) => (
                <div
                  key={product.slug}
                  className="bg-white rounded-xl p-8 border border-gray-200 hover:border-rif-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  <h4 className="text-xl font-semibold text-rif-black mb-3">
                    {product.name}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Performance Metrics Section */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-8 flex justify-center">
              <Image
                src="/products/logos/sol-r-skin.svg"
                alt="SOL-R-SKIN Logo"
                width={180}
                height={83}
                className="brightness-0 invert"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built for Performance.
            </h2>
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-300">
              Engineered to Last.
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <div className="mb-6">
                <FontAwesomeIcon icon={faShield} className="h-20 w-20 text-rif-blue-500 mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold mb-4">
                  Durability
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                SOL-R-SKIN products are built with <strong>superior materials and construction</strong> to withstand Florida's challenging climate, including intense sun, high humidity, and severe weather conditions.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <div className="mb-6">
                <FontAwesomeIcon icon={faWrench} className="h-20 w-20 text-rif-blue-500 mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold mb-4">
                  Quality
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Every SOL-R-SKIN product is manufactured to <strong>exacting quality standards</strong>, ensuring consistent performance and reliability for years to come.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <div className="mb-6">
                <FontAwesomeIcon icon={faHome} className="h-20 w-20 text-rif-blue-500 mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold mb-4">
                  Performance
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                SOL-R-SKIN delivers <strong>exceptional performance</strong> in real-world applications, meeting and exceeding industry standards for residential and commercial roofing projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
              Unparalleled Benefits
            </h2>
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-600">
              for Every Property Owner
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="mb-6">
                <FontAwesomeIcon icon={faShield} className="h-20 w-20 text-rif-blue-500 mb-4" />
                <h3 className="text-2xl font-semibold text-rif-black mb-4">
                  Superior Protection
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                SOL-R-SKIN products provide <strong>comprehensive protection</strong> for your property, designed to withstand the elements and maintain performance over time.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="mb-6">
                <FontAwesomeIcon icon={faLeaf} className="h-20 w-20 text-rif-blue-500 mb-4" />
                <h3 className="text-2xl font-semibold text-rif-black mb-4">
                  Long-Term Value
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Investing in SOL-R-SKIN means investing in <strong>long-term value</strong>. Our products are designed to last, reducing the need for frequent replacements and maintenance.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="mb-6">
                <FontAwesomeIcon icon={faHome} className="h-20 w-20 text-rif-blue-500 mb-4" />
                <h3 className="text-2xl font-semibold text-rif-black mb-4">
                  Professional Grade
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                SOL-R-SKIN products are <strong>trusted by professionals</strong> throughout the roofing industry for their quality, reliability, and consistent performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {galleryImages.length > 0 && (
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="relative h-64 rounded-xl overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Distributor Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
            SOL-R-SKIN
          </h2>
          <h3 className="text-3xl md:text-4xl font-semibold text-gray-600 mb-8">
            Distributor
          </h3>
          <div className="bg-white rounded-xl p-12 shadow-lg">
            <h4 className="text-2xl font-semibold text-rif-black mb-6">
              Your Trusted Source for SOL-R-SKIN
            </h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              As an authorized distributor, we are proud to bring the quality and innovation of SOL-R-SKIN to our customers. Our team is here to help you explore the SOL-R-SKIN product line, answer your questions, and guide you toward the perfect solution for your roofing needs.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Contact us today to learn more about SOL-R-SKIN or to schedule a consultation with one of our roofing experts!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Link
                href="/roofers"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
              >
                Find a Certified Roofer
              </Link>
              <a
                href="https://prproofing.com/manufacturers/sol-r-skin/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
              >
                <FontAwesomeIcon icon={faExternalLink} className="h-4 w-4" />
                View More on PRP Roofing
              </a>
              <a
                href="https://iiproducts.com/sol-r-skin/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
              >
                <FontAwesomeIcon icon={faExternalLink} className="h-4 w-4" />
                Visit Manufacturer Website
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-rif-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Ready to Learn More?
          </h2>
          <p className="text-lg mb-8 leading-relaxed text-gray-200">
            Get started with a free estimate today. Sometimes it's easier to just pick up the phone and talk to one of our roofing experts—we're here to answer your questions and help you find the perfect SOL-R-SKIN solution for your property. Or fill out our quick form online, whichever you prefer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/free-estimate"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-rif-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Request Free Estimate
            </Link>
            <a
              href="tel:813-777-8272"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
            >
              Call: 813-777-8272
            </a>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
            >
              <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 rotate-180" />
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

