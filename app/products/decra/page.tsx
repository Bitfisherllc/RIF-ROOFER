import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faExternalLink, faShield, faLeaf, faHome, faWrench, faSun, faWind, faBolt, faDollarSign, faCertificate } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';
import StickyProductNav from '@/components/StickyProductNav';

export const metadata: Metadata = {
  title: 'Decra Stone-Coated Steel Roofing',
  description: 'Decra stone-coated steel roofing systems combine durability with aesthetic appeal. Available in tile, shake, and shingle profiles. Perfect for Florida homes requiring superior weather resistance.',
  keywords: [
    'Decra',
    'stone-coated steel roofing',
    'metal roofing',
    'roofing tile',
    'roofing shake',
    'roofing shingle',
    'Florida roofing',
    'hurricane resistant roofing',
  ],
};

const productLines = [
  { 
    name: 'Tile Profile', 
    slug: 'tile-profile',
    description: 'Authentic tile appearance with the durability of steel. Available in multiple colors to complement any architectural style.',
  },
  { 
    name: 'Shake Profile', 
    slug: 'shake-profile',
    description: 'Traditional shake aesthetic with modern performance. Perfect for coastal and high-wind areas.',
  },
  { 
    name: 'Shingle Profile', 
    slug: 'shingle-profile',
    description: 'Classic shingle look with superior durability. Ideal for residential applications requiring traditional appeal.',
  },
];

export default function DecraProductPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <StickyProductNav
        logoPath="/products/logos/decra.svg"
        logoAlt="Decra Logo"
        backToProductsHref="/products"
        freeEstimateHref="/free-estimate"
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
                Decra
              </h1>
              <h2 className="text-3xl md:text-4xl font-light text-gray-300 mb-8">
                Stone-Coated Steel Roofing Excellence
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
                Premium stone-coated steel roofing systems that combine the aesthetic appeal of traditional roofing materials with the durability and performance of steel. Perfect for Florida's challenging climate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
                >
                  <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 rotate-180" />
                  Back to Products
                </Link>
              </div>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gray-800 flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <FontAwesomeIcon icon={faHome} className="h-24 w-24 mb-4" />
                <p className="text-lg">Decra Product Image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introducing Decra */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold text-rif-black mb-6">
                Introducing Decra
              </h2>
              <h3 className="text-2xl font-light text-gray-600 mb-6">
                Stone-Coated Steel Roofing Excellence
              </h3>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  <strong>Decra</strong> is a leading manufacturer of premium stone-coated steel roofing systems. With a focus on quality, innovation, and performance, Decra produces roofing solutions that provide exceptional durability, weather resistance, and aesthetic appeal for both residential and commercial applications.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl bg-gray-100 flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <FontAwesomeIcon icon={faHome} className="h-24 w-24 mb-4" />
                <p>Decra Logo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-rif-blue-500 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faShield} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Superior Durability & Weather Resistance</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Decra stone-coated steel roofing systems are engineered to withstand Florida's challenging climate, including intense sun, high humidity, hurricanes, and severe weather. The premium steel construction provides exceptional protection against UV radiation, corrosion, and impact damage.
              </p>
              <p className="text-gray-600 leading-relaxed">
                These systems offer Class A fire resistance, high wind ratings, and excellent impact resistance, making them ideal for Florida's demanding weather conditions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-rif-blue-500 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faLeaf} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Energy Efficiency & Performance</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Decra metal roofing systems feature advanced energy-efficient properties. The metal surface reflects solar heat, reducing cooling costs and improving overall energy performance. This makes them an excellent choice for Florida homeowners seeking to reduce energy consumption.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The interlocking panel design ensures superior water resistance and prevents leaks, while the lightweight construction reduces structural load on your home.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-rif-blue-500 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faHome} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Versatile Product Line</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Decra offers a comprehensive product line including tile, shake, and shingle profiles, each designed to meet specific aesthetic and performance requirements. With a wide range of colors, finishes, and profiles, you can achieve the exact look you want for your property.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you prefer the classic elegance of tile, the rustic charm of shake, or the traditional appeal of shingles, Decra has a solution that combines beauty with performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Lines */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-rif-black mb-4">Decra</h2>
            <h3 className="text-2xl font-light text-gray-600">Product Line</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productLines.map((line) => (
              <div key={line.slug} className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                <h4 className="text-2xl font-semibold text-rif-black mb-4">{line.name}</h4>
                <p className="text-gray-600 leading-relaxed">{line.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <Image
                src="/products/logos/decra.svg"
                alt="Decra Logo"
                width={200}
                height={80}
                className="h-16 w-auto"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold text-rif-black mb-4">
              Built for Performance.
            </h2>
            <h3 className="text-2xl font-light text-gray-600">
              Engineered to Last.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-rif-blue-500 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faShield} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Durability</h3>
              <p className="text-gray-600 leading-relaxed">
                Decra products are built with <strong>superior materials and construction</strong> to withstand Florida's challenging climate, including intense sun, high humidity, and severe weather conditions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-rif-blue-500 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faWrench} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Every Decra product is manufactured to <strong>exacting quality standards</strong>, ensuring consistent performance and reliability for years to come.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-rif-blue-500 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faBolt} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Performance</h3>
              <p className="text-gray-600 leading-relaxed">
                Decra delivers <strong>exceptional performance</strong> in real-world applications, meeting and exceeding industry standards for residential and commercial roofing projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Property Owners */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-rif-black mb-4">
              Unparalleled Benefits
            </h2>
            <h3 className="text-2xl font-light text-gray-600">
              for Every Property Owner
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-rif-blue-500 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faShield} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Superior Protection</h3>
              <p className="text-gray-600 leading-relaxed">
                Decra products provide <strong>comprehensive protection</strong> for your property, designed to withstand the elements and maintain performance over time.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-rif-blue-500 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faDollarSign} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Long-Term Value</h3>
              <p className="text-gray-600 leading-relaxed">
                Investing in Decra means investing in <strong>long-term value</strong>. Our products are designed to last, reducing the need for frequent replacements and maintenance.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-rif-blue-500 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faCertificate} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Professional Grade</h3>
              <p className="text-gray-600 leading-relaxed">
                Decra products are <strong>trusted by professionals</strong> throughout the roofing industry for their quality, reliability, and consistent performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Distributor Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-rif-black mb-4">Decra</h2>
            <h3 className="text-2xl font-light text-gray-600">Distributor</h3>
          </div>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg max-w-4xl mx-auto">
            <h4 className="text-2xl font-semibold text-rif-black mb-4 text-center">
              Your Trusted Source for Decra
            </h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
              As an authorized distributor, we are proud to bring the quality and innovation of Decra to our customers. Our team is here to help you explore the Decra product line, answer your questions, and guide you toward the perfect solution for your roofing needs.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
              Contact us today to learn more about Decra or to schedule a consultation with one of our roofing experts!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/roofers"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium"
              >
                Find a Certified Roofer
              </Link>
              <a
                href="https://www.decra.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
              >
                Visit Manufacturer Website
                <FontAwesomeIcon icon={faExternalLink} className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-rif-black mb-6">
            Ready to Learn More?
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Get started with a free estimate today. Sometimes it's easier to just pick up the phone and talk to one of our roofing experts—we're here to answer your questions and help you find the perfect Decra solution for your property. Or fill out our quick form online, whichever you prefer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/free-estimate"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rif-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-rif-blue-600 transition-colors"
            >
              Request Free Estimate
            </Link>
            <a
              href="tel:813-777-8272"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-rif-blue-500 text-rif-blue-500 text-lg font-semibold rounded-lg hover:bg-rif-blue-50 transition-colors"
            >
              Call: 813-777-8272
            </a>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-colors"
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
