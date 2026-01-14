import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faExternalLink, faShield, faLeaf, faHome, faWrench, faWind, faFire, faCloudRain } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';
import StickyProductNav from '@/components/StickyProductNav';

export const metadata: Metadata = {
  title: 'Tilcor Stone-Coated Metal Roofing',
  description: 'Tilcor premium stone-coated metal roofing systems combining durability, aesthetics, and performance. Available in various profiles and colors for residential and commercial applications.',
  keywords: [
    'Tilcor',
    'Tilcor Metal Roofing',
    'stone-coated metal',
    'metal roofing',
    'stone-coated steel',
    'Florida roofing',
  ],
};

const productLines = [
  { 
    name: 'CF Shingle (Concealed Fastening)', 
    slug: 'cf-shingle',
    description: 'Streamlined appearance with no visible fastenings. All fastenings fully concealed for ultimate weather protection.'
  },
  { 
    name: 'CF Shake (Concealed Fastening)', 
    slug: 'cf-shake',
    description: 'Delivers a streamlined appearance with no visible fastenings. Ultimate style and weather protection.'
  },
  { 
    name: 'Antica', 
    slug: 'antica',
    description: 'Mediterranean style stone-coated steel panels with timeless elegance and superior durability.'
  },
];

const galleryImages = [
  { src: 'https://prproofing.com/wp-content/uploads/2022/07/stone-coated-metal-roofing-ticor.jpg', alt: 'Tilcor Stone Coated Metal Roof on home in Florida' },
  { src: 'https://prproofing.com/wp-content/uploads/2022/07/TILCORE-HOME.jpg', alt: 'Aerial view of grey Tilcor Roofing installed on white house' },
];

export default function TilcorProductPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <StickyProductNav
        logoPath="/products/logos/tilcor.png"
        logoAlt="Tilcor Logo"
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
              <span className="text-sm uppercase tracking-wider text-gray-400 mb-4 block">PREMIUM METAL ROOFING</span>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                Tilcor
              </h1>
              <h2 className="text-3xl md:text-4xl font-light text-gray-300 mb-8">
                Stone Coated Steel
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
                Tilcor has its roots grounded in the roofing industry since the mid 1900's. Tilcor Stone Coated Steel (SCS) panels are the ideal solution for you.
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
                src="https://prproofing.com/wp-content/uploads/2022/07/stone-coated-metal-roofing-ticor.jpg"
                alt="Tilcor Stone Coated Metal Roofing"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute top-6 right-6 bg-gray-800 rounded-lg p-4 shadow-xl">
                <Image
                  src="/products/logos/tilcor.png"
                  alt="Tilcor Logo"
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
            Introducing <span className="text-rif-blue-500">Tilcor</span>
          </h2>
          <p className="text-2xl text-gray-600 mb-12 font-light">
            The Tilcor Difference
          </p>
          <div className="prose prose-lg max-w-none text-left">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Are you looking for a better roofing solution for your home, a proven way to grow your roofing business or the perfect solution for buildings you are managing or developing? Then it's likely <strong>Tilcor Stone Coated Steel (SCS) panels</strong> are the ideal solution for you. Find out how Tilcor makes a difference.
            </p>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500 mb-6">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Lifetime / 50 Year Limited Warranty</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                With our extensive transferable warranty, you get peace of mind knowing you have Tilcor behind you.
              </p>
              <h4 className="text-xl font-semibold text-rif-black mb-3">Tested and Proven</h4>
              <p className="text-lg text-gray-700 leading-relaxed">
                Tilcor products have been assessed and exceed the requirements of USA building codes. We have also tested our products around the globe and they exceed every common benchmark for strength and durability. In fact, our roofs are fire and earthquake safe, hail and wind resistant and will never warp or rust like other materials. Even in an area prone to severe weather events like hail or hurricanes our roofs will stand the test of time.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Ultimate Style with Concealed Fastening</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our innovative Concealed Fastening (CF) products CF Shingle, CF Shake deliver a streamlined appearance with no visible fastenings. All fastenings are fully concealed from the elements to ensure the ultimate weather protection. Tilcor roofs are known as "cool roofs" and when combined with Above Sheathing Ventilation (ASV), customers have achieved <strong>30% reductions in energy bills</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Lines Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
              Tilcor
            </h2>
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-600">
              Roofing Products
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

      {/* Performance Metrics Section */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-8 flex justify-center">
              <Image
                src="/products/logos/tilcor.png"
                alt="Tilcor Logo"
                width={180}
                height={83}
                className="brightness-0 invert object-contain"
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
                <FontAwesomeIcon icon={faCloudRain} className="h-20 w-20 text-rif-blue-500 mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold mb-4">
                  Weather Resistance
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Tilcor roofs are engineered to withstand extreme weather conditions, including <strong>hail, hurricanes, earthquakes, and fire</strong>. They carry the <strong>highest possible impact rating</strong> and are suitable for marine environments. The stone-coated finish provides superior protection against the elements.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <div className="mb-6">
                <FontAwesomeIcon icon={faFire} className="h-20 w-20 text-rif-blue-500 mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold mb-4">
                  Fire Resistance
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Tilcor roofing systems offer <strong>excellent fire resistance</strong>, providing an added layer of protection for your property and peace of mind for your family.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <div className="mb-6">
                <FontAwesomeIcon icon={faWind} className="h-20 w-20 text-rif-blue-500 mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold mb-4">
                  Wind Performance
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Designed to meet <strong>rigorous wind performance standards</strong>, Tilcor roofs are suitable for use in high-wind areas, including hurricane-prone regions like Florida. They are <strong>hurricane resistant</strong> and meet coastal Florida regions' performance for High Velocity Hurricane Zone (HVHZ).
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
                  Exceptional Durability
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Tilcor's stone-coated metal construction provides <strong>superior durability</strong> compared to traditional roofing materials. These roofs resist cracking, warping, and deterioration, ensuring long-term performance and protection.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="mb-6">
                <FontAwesomeIcon icon={faLeaf} className="h-20 w-20 text-rif-blue-500 mb-4" />
                <h3 className="text-2xl font-semibold text-rif-black mb-4">
                  Energy Efficiency
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Tilcor roofs are known as <strong>"cool roofs"</strong> and feature Above Sheathing Ventilation (ASV) which can reduce energy costs, prevent ice damming, and make for a healthier home. The combination between our steel panels and ASV have seen customers achieve <strong>30% reductions in energy bills</strong>. Tilcor roofs have also been tested and meet World Health Organisation standards for water run off, meaning you can drink water from a Tilcor roof.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="mb-6">
                <FontAwesomeIcon icon={faHome} className="h-20 w-20 text-rif-blue-500 mb-4" />
                <h3 className="text-2xl font-semibold text-rif-black mb-4">
                  Versatile Design Options
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                With multiple profiles and color options, Tilcor offers <strong>versatile design solutions</strong> that complement any architectural style, from traditional to modern, residential to commercial.
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
            Tilcor
          </h2>
          <h3 className="text-3xl md:text-4xl font-semibold text-gray-600 mb-8">
            Distributor
          </h3>
          <div className="bg-white rounded-xl p-12 shadow-lg">
            <h4 className="text-2xl font-semibold text-rif-black mb-6">
              Your Trusted Source for Tilcor Roofing
            </h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              As an authorized distributor, we are proud to bring the quality and innovation of Tilcor roofing to our customers. Our team is here to help you explore the Tilcor product line, answer your questions, and guide you toward the perfect solution for your roofing needs.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Upgrade your property with Tilcor roofing—a choice that combines timeless beauty, unmatched durability, and sustainable performance. Contact us today to learn more or to schedule a consultation!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Link
                href="/roofers"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
              >
                Find a Certified Roofer
              </Link>
              <a
                href="https://prproofing.com/manufacturers/stone-coated-roofing-tilcor/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
              >
                <FontAwesomeIcon icon={faExternalLink} className="h-4 w-4" />
                View More on PRP Roofing
              </a>
              <a
                href="https://www.tilcor.com"
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
            Ready to Upgrade Your Roof?
          </h2>
          <p className="text-lg mb-8 leading-relaxed text-gray-200">
            Get started with a free estimate today. Sometimes it's easier to just pick up the phone and talk to one of our roofing experts—we're here to answer your questions and help you find the perfect Tilcor solution for your property. Or fill out our quick form online, whichever you prefer.
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

