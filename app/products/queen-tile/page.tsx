import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faExternalLink, faShield, faLeaf, faHome, faWrench, faWind, faFire, faCloudRain } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';
import StickyProductNav from '@/components/StickyProductNav';

export const metadata: Metadata = {
  title: 'Queen Tile Metal Roofing',
  description: 'Queen Tile manufactures premium metal tile roofing systems that replicate the classic appearance of traditional tile while providing superior durability, weather resistance, and energy efficiency.',
  keywords: [
    'Queen Tile',
    'Queen Tile Metal Roofing',
    'metal tile roofing',
    'tile roofing systems',
    'Florida roofing',
    'roofing products',
  ],
};

const productLines = [
  { 
    name: 'VERONA', 
    slug: 'queen-tile-verona',
    description: 'Mediterranean-Style Elegance - The perfect addition to compliment any Mediterranean-style building with unmatched elegance'
  },
  { 
    name: 'SHAKE', 
    slug: 'queen-tile-shake',
    description: 'Timeless Simplicity - Brings the essence of classic wooden craftsmanship to every project'
  },
  { 
    name: 'STANDARD', 
    slug: 'queen-tile-standard',
    description: 'Standard of Perfection - Represents the height of geometric precision with flawless lines'
  },
  { 
    name: 'CLASSIC', 
    slug: 'queen-tile-classic',
    description: 'Classic Elegance - Brings to life the elegance of the Golden Age with ideal forms and proportions'
  },
  { 
    name: 'SLATE', 
    slug: 'queen-tile-slate',
    description: 'Natural Stone Beauty - Captures the spirit of old European and early North American traditions'
  },
];

const galleryImages: { src: string; alt: string }[] = [
  { src: 'https://prproofing.com/wp-content/uploads/2023/03/qt.jpg', alt: 'QUEENTILE Stone-Coated Steel Roof Tile' },
  { src: 'https://prproofing.com/wp-content/uploads/2023/03/image-12-768x426.jpg', alt: 'QUEENTILE Installation' },
  { src: 'https://queentile.us/image/catalog/home/collections/collection-01.png', alt: 'QUEENTILE VERONA Collection' },
  { src: 'https://queentile.us/image/catalog/home/collections/collection-02.png', alt: 'QUEENTILE SHAKE Collection' },
  { src: 'https://queentile.us/image/catalog/home/collections/collection-03.png', alt: 'QUEENTILE STANDARD Collection' },
  { src: 'https://queentile.us/image/catalog/home/collections/collection-04.png', alt: 'QUEENTILE CLASSIC Collection' },
  { src: 'https://queentile.us/image/catalog/home/collections/collection-05.png', alt: 'QUEENTILE SLATE Collection' },
  { src: 'https://queentile.us/image/catalog/home/profile_advant_tr.png', alt: 'QUEENTILE Profile Advantages' },
];

export default function QueenTileProductPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <StickyProductNav
        logoPath="/products/logos/queen-tile.svg"
        logoAlt="Queen Tile Logo"
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
                Queen Tile
              </h1>
              <h2 className="text-3xl md:text-4xl font-light text-gray-300 mb-8">
                Classic Tile Aesthetics, Modern Metal Performance
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
                Queen Tile manufactures premium metal tile roofing systems that replicate the classic appearance of traditional tile while providing superior durability, weather resistance, and energy efficiency.
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
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="https://prproofing.com/wp-content/uploads/2023/03/image-12-768x426.jpg"
                alt="QUEENTILE Stone-Coated Steel Roof Tile"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-6 right-6 bg-gray-800 rounded-lg p-4 shadow-xl">
                <Image
                  src="/products/logos/queen-tile.svg"
                  alt="Queen Tile Logo"
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
            Introducing <span className="text-rif-blue-500">Queen Tile</span>
          </h2>
          <p className="text-2xl text-gray-600 mb-12 font-light">
            Classic Tile Aesthetics, Modern Metal Performance
          </p>
          <div className="prose prose-lg max-w-none text-left">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong>QUEENTILE®</strong> is a high-tech premium product representing a new generation of stone-coated steel roof tiles. QUEENTILE is a compound multilayer material for pitch roofs, based on stainless steel with "aluzinc" coating, giving the tiles a significantly longer service life than typical galvanized tiles. The front side surface is covered with granules of natural stone, ensuring a perfect appearance. The stone is laid upon the metal surface with a specially developed binder material based on acrylic, and the upper layer is covered with a transparent acrylic glaze which protects the surface from fading, UV rays, penetration of moisture, and prevents moss appearance.
            </p>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500 mb-6">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">50 Year Warranty & Multilayer Protection</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                QUEENTILE has a compound multilayer structure where each layer performs its functions. Clay and concrete tiles, shingles and other metals cannot match the advanced design, enduring beauty, storm engineered performance and longevity of QUEENTILE's stone coated steel roofing systems. QUEENTILE systems combine the best of what is available and are warranted for 50 years.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The roof stays intact during strong winds and storms, with vibrant color retention throughout its lifespan. Experience silence during rain or hail, and save time and money on installation. QUEENTILE stone coated steel roof tile is manufactured at the up-to-date automated European line.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500 mb-6">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Superior Weather Resistance</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Queen Tile metal roofing systems are engineered to withstand Florida's extreme weather conditions, including intense sun, high humidity, hurricanes, and severe storms. The metal construction provides exceptional protection against UV radiation, corrosion, and impact damage.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                These systems offer Class A fire resistance, high wind ratings, and excellent impact resistance, making them ideal for Florida's demanding climate.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Energy Efficiency & Lightweight Design</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Queen Tile metal roofing systems feature advanced energy-efficient properties. The metal surface reflects solar heat, reducing cooling costs and improving overall energy performance. The lightweight design reduces structural load on your home while providing superior durability compared to traditional tile.
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
                Queen Tile
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
                src="/products/logos/queen-tile.svg"
                alt="Queen Tile Logo"
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
                Queen Tile products are built with <strong>superior materials and construction</strong> to withstand Florida's challenging climate, including intense sun, high humidity, and severe weather conditions.
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
                Every Queen Tile product is manufactured to <strong>exacting quality standards</strong>, ensuring consistent performance and reliability for years to come.
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
                Queen Tile delivers <strong>exceptional performance</strong> in real-world applications, meeting and exceeding industry standards for residential and commercial roofing projects.
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
                Queen Tile products provide <strong>comprehensive protection</strong> for your property, designed to withstand the elements and maintain performance over time.
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
                Investing in Queen Tile means investing in <strong>long-term value</strong>. Our products are designed to last, reducing the need for frequent replacements and maintenance.
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
                Queen Tile products are <strong>trusted by professionals</strong> throughout the roofing industry for their quality, reliability, and consistent performance.
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
            Queen Tile
          </h2>
          <h3 className="text-3xl md:text-4xl font-semibold text-gray-600 mb-8">
            Distributor
          </h3>
          <div className="bg-white rounded-xl p-12 shadow-lg">
            <h4 className="text-2xl font-semibold text-rif-black mb-6">
              Your Trusted Source for Queen Tile
            </h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              As an authorized distributor, we are proud to bring the quality and innovation of Queen Tile to our customers. Our team is here to help you explore the Queen Tile product line, answer your questions, and guide you toward the perfect solution for your roofing needs.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Contact us today to learn more about Queen Tile or to schedule a consultation with one of our roofing experts!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Link
                href="/roofers"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
              >
                Find a Certified Roofer
              </Link>
              <a
                href="https://prproofing.com/manufacturers/queen-tile/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
              >
                <FontAwesomeIcon icon={faExternalLink} className="h-4 w-4" />
                View More on PRP Roofing
              </a>
              <a
                href="https://queentile.us/"
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
            Get started with a free estimate today. Sometimes it's easier to just pick up the phone and talk to one of our roofing experts—we're here to answer your questions and help you find the perfect Queen Tile solution for your property. Or fill out our quick form online, whichever you prefer.
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

