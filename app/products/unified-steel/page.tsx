import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faExternalLink, faShield, faLeaf, faHome, faWrench, faWind, faFire, faCloudRain } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';
import StickyProductNav from '@/components/StickyProductNav';

export const metadata: Metadata = {
  title: 'Unified Steel',
  description: 'High-quality steel roofing products and systems designed for strength, durability, and weather resistance.',
  keywords: [
    'Unified Steel',
    'Roofing Systems',
    'Florida roofing',
    'roofing products',
  ],
};

const productLines = [
  { 
    name: 'Barrel-Vault Tile', 
    slug: 'barrel-vault-tile',
    description: 'Emulates the authentic look of traditional Spanish tile, enhancing the home\'s curb appeal'
  },
  { 
    name: 'Pacific Tile', 
    slug: 'pacific-tile',
    description: 'Mediterranean style with superior performance, offering high wind and hail impact resistance'
  },
  { 
    name: 'Pine-Crest Shake', 
    slug: 'pine-crest-shake',
    description: 'Replicates the appearance of hand-split wood shake with the durability of steel'
  },
  { 
    name: 'Cottage Shingle', 
    slug: 'cottage-shingle',
    description: 'Features a unique offset, multi-grooved design that creates a classic cottage look'
  },
  { 
    name: 'Granite-Ridge Shingle', 
    slug: 'granite-ridge-shingle',
    description: 'Provides a sleek and modern appearance with traditional appeal'
  },
];

const galleryImages = [
  { src: 'https://prproofing.com/wp-content/uploads/2024/03/download-2-1536x392.jpg', alt: 'Unified Steel Stone Coated Roofing' },
  { src: 'https://prproofing.com/wp-content/uploads/2024/03/BV-SunsetGold-5657-960x604-1-768x483.jpg', alt: 'Brown Floridian home with BV Sunset Gold Roofing' },
  { src: 'https://prproofing.com/wp-content/uploads/2024/03/Cottage-Barclay-HD-Balboa-Arcadia-CA-8-e1666992106326-960x604-1-768x483.jpg', alt: 'Aerial view of Florida home with Unified Steel roof' },
  { src: 'https://prproofing.com/wp-content/uploads/2024/03/GraniteRidge-Ironwood-131535-edit-1-960x604-1-768x483.jpg', alt: 'Light grey home in Florida with dark grey Unified Steel roof' },
];

export default function UnifiedSteelProductPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <StickyProductNav
        logoPath="/products/logos/unified-steel.svg"
        logoAlt="Unified Steel Logo"
        backToProductsHref="/products"
        freeEstimateHref="/free-estimate"
        productSlug="unified-steel"
        productName="Unified Steel"
        productCategory="Steel Roofing"
      />
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <span className="text-sm uppercase tracking-wider text-gray-400 mb-4 block">ROOFING SYSTEMS</span>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                Unified Steel
              </h1>
              <h2 className="text-3xl md:text-4xl font-light text-gray-300 mb-8">
                Durable - Strong - Beautiful - Energy Efficient
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
                Unified Steel™ Stone Coated Roofing is a lightweight roofing solution with unsurpassed durability, performance, and protection. Backed by one of the most comprehensive, fully transferable roofing warranties in the business today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <a
                  href="https://westlakeroyalroofing.com"
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
                src="https://prproofing.com/wp-content/uploads/2024/03/download-2-1536x392.jpg"
                alt="Unified Steel Stone Coated Roofing"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute top-6 right-6 bg-gray-800 rounded-lg p-4 shadow-xl">
                <Image
                  src="/products/logos/unified-steel.svg"
                  alt="Unified Steel Logo"
                  width={140}
                  height={65}
                  className="object-contain"
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
            Introducing <span className="text-rif-blue-500">Unified Steel</span>
          </h2>
          <p className="text-2xl text-gray-600 mb-12 font-light">
            Most Permanent Re-Roof Solution
          </p>
          <div className="prose prose-lg max-w-none text-left">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong>Unified Steel™</strong> Stone Coated Roofing is a lightweight roofing solution with unsurpassed durability, performance, and protection. Backed by one of the most comprehensive, fully transferable roofing warranties in the business today, Unified Steel is available in popular profiles and colors to suit any architectural style. A Unified Steel lightweight roof provides great value when you compare the life cycle cost to asphalt shingles. A Unified Steel roof will last <strong>almost 3 times as long as asphalt shingles</strong>.
            </p>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500 mb-6">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Energy Savings with Above Sheathing Ventilation</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                A Unified Steel roof installed direct-to-deck or with battens creates <strong>Above Sheathing Ventilation (ASV)</strong> which can help provide energy savings compared to asphalt shingles. This innovative ventilation system helps reduce cooling costs and improves overall energy efficiency.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Fire, Hail & Wind Testing</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                All Unified Steel roofing panels can be installed with specific underlay for a <strong>Class A fire rating</strong> for the most severe fire prone areas. They all carry a <strong>Class 4 Impact rating</strong> as well as the <strong>Very Severe Hail (VSH) impact-resistance classification</strong>. The panels also meet coastal Florida regions' performance for <strong>High Velocity Hurricane Zone (HVHZ)</strong>. In hail regions, installing a Unified Steel roof with a Class 4 Hail rating may contribute to an <strong>Insurance premium reduction up to 25%</strong>.
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
                Unified Steel
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
                src="/products/logos/unified-steel.svg"
                alt="Unified Steel Logo"
                width={180}
                height={83}
                className="brightness-0 invert"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              50 Year Warranty
            </h2>
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-300">
              50 Year Limited Fully Transferable Product Warranty
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
                Unified Steel offers one of the most comprehensive, fully transferable roofing warranties in the business today. Coverage includes <strong>120 mph Wind and Class 4 Hail protection</strong>. All roofing panels carry a Class 4 Impact rating as well as the Very Severe Hail (VSH) impact-resistance classification.
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
                Unified Steel roofs can be installed with specific underlay for a <strong>Class A fire rating</strong> for the most severe fire prone areas. The panels also meet coastal Florida regions' performance for <strong>High Velocity Hurricane Zone (HVHZ)</strong>, providing exceptional protection in hurricane-prone areas.
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
                A Unified Steel roof installed direct-to-deck or with battens creates <strong>Above Sheathing Ventilation (ASV)</strong> which can help provide energy savings compared to asphalt shingles. A Unified Steel roof will last <strong>almost 3 times as long as asphalt shingles</strong>, providing exceptional long-term value.
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
                Unified Steel products provide <strong>comprehensive protection</strong> with Class A fire rating, Class 4 Impact rating, and Very Severe Hail (VSH) classification. The panels meet coastal Florida regions' performance for High Velocity Hurricane Zone (HVHZ), ensuring your property is protected in the most severe weather conditions.
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
                Investing in Unified Steel means investing in <strong>long-term value</strong>. A Unified Steel roof will last almost 3 times as long as asphalt shingles. In hail regions, installing a Unified Steel roof with a Class 4 Hail rating may contribute to an <strong>Insurance premium reduction up to 25%</strong>, providing additional financial benefits.
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
                Unified Steel products are <strong>trusted by professionals</strong> throughout the roofing industry. With Above Sheathing Ventilation (ASV), these roofs enhance energy efficiency, potentially reducing heating and cooling costs. The lightweight design (weighing just 1.5 pounds per square foot) makes Unified Steel ideal for both new construction and retrofit applications.
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
            Unified Steel
          </h2>
          <h3 className="text-3xl md:text-4xl font-semibold text-gray-600 mb-8">
            Distributor
          </h3>
          <div className="bg-white rounded-xl p-12 shadow-lg">
            <h4 className="text-2xl font-semibold text-rif-black mb-6">
              Your Trusted Source for Unified Steel
            </h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              As an authorized distributor, we are proud to bring the quality and innovation of Unified Steel to our customers. Our team is here to help you explore the Unified Steel product line, answer your questions, and guide you toward the perfect solution for your roofing needs.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Contact us today to learn more about Unified Steel or to schedule a consultation with one of our roofing experts!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Link
                href="/roofers"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
              >
                Find a Certified Roofer
              </Link>
              <a
                href="https://prproofing.com/manufacturers/unified-steel/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
              >
                <FontAwesomeIcon icon={faExternalLink} className="h-4 w-4" />
                View More on PRP Roofing
              </a>
              <a
                href="https://westlakeroyalroofing.com"
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
            Get started with a free estimate today. Sometimes it's easier to just pick up the phone and talk to one of our roofing experts—we're here to answer your questions and help you find the perfect Unified Steel solution for your property. Or fill out our quick form online, whichever you prefer.
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
