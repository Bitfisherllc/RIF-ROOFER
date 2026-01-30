import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faExternalLink, faShield, faLeaf, faHome, faWrench, faWind, faFire, faCloudRain } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';
import StickyProductNav from '@/components/StickyProductNav';

export const metadata: Metadata = {
  title: 'Roser Stone-Coated Metal Roofing',
  description: 'Roser manufactures premium stone-coated metal roofing systems with exceptional durability, weather resistance, and aesthetic appeal for residential and commercial applications.',
  keywords: [
    'Roser',
    'Roser Metal Roofing',
    'stone-coated metal roofing',
    'metal roofing systems',
    'Florida roofing',
    'roofing products',
  ],
};

const productLines = [
  { 
    name: 'Tile Profile', 
    slug: 'roser-tile',
    description: 'Mediterranean tile profile with authentic appearance and superior performance'
  },
  { 
    name: 'Shake Profile', 
    slug: 'roser-shake',
    description: 'Cedar shake profile with natural wood texture and appearance'
  },
  { 
    name: 'Shingle Profile', 
    slug: 'roser-shingle',
    description: 'Traditional shingle profile with deep shadow lines'
  },
];

const galleryImages = [
  { src: 'https://prproofing.com/wp-content/uploads/2022/07/stone-coated-metal-roofing-roser.jpg', alt: 'Roser Stone Coated Metal Roof on home in Florida' },
  { src: 'https://prproofing.com/wp-content/uploads/2022/07/ROSER-1.jpg', alt: 'Grey Roser Roofing installed on brown house' },
  { src: 'https://prproofing.com/wp-content/uploads/2022/07/ROSER-8-300x209.jpg', alt: 'Aerial photo of Roser Roofing installation' },
  { src: 'https://prproofing.com/wp-content/uploads/2022/07/ROSER-7-300x209.jpg', alt: 'Aerial photo of Roser Roofing installation' },
];

export default function RoserProductPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <StickyProductNav
        logoPath="/products/logos/roser.png"
        logoAlt="Roser Logo"
        backToProductsHref="/products"
        freeEstimateHref="/free-estimate"
        productSlug="roser"
        productName="Roser"
        productCategory="Roofing Systems"
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
                Roser
              </h1>
              <h2 className="text-3xl md:text-4xl font-light text-gray-300 mb-8">
                Premium Stone-Coated Metal Roofing
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
                Roser manufactures premium stone-coated metal roofing systems with exceptional durability, weather resistance, and aesthetic appeal for residential and commercial applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <a
                  href="https://www.roser-usa.com"
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
                src="https://prproofing.com/wp-content/uploads/2022/07/stone-coated-metal-roofing-roser.jpg"
                alt="Roser Stone Coated Metal Roofing"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute top-6 right-6 bg-gray-800 rounded-lg p-4 shadow-xl">
                <Image
                  src="/products/logos/roser.png"
                  alt="Roser Logo"
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
            Introducing <span className="text-rif-blue-500">Roser</span>
          </h2>
          <p className="text-2xl text-gray-600 mb-12 font-light">
            Premium Stone-Coated Metal Roofing
          </p>
          <div className="prose prose-lg max-w-none text-left">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong>Roser</strong> is a leading manufacturer of premium stone-coated metal roofing systems. With a commitment to quality and innovation, Roser produces roofing products that combine the aesthetic appeal of traditional materials with the superior performance and durability of metal.
            </p>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500 mb-6">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Superior Weather Resistance</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Roser stone-coated metal roofing systems are engineered to withstand Florida's extreme weather conditions, including intense sun, high humidity, hurricanes, and severe storms. The stone-coated finish provides exceptional protection against UV radiation, corrosion, and impact damage.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                These systems offer Class A fire resistance, high wind ratings, and excellent hail impact resistance, making them ideal for Florida's demanding climate.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500 mb-6">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Energy Efficiency & Performance</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Roser metal roofing systems feature advanced energy-efficient properties. The stone-coated surface reflects solar heat, reducing cooling costs and improving overall energy performance. This makes them an excellent choice for Florida homeowners seeking to reduce energy consumption.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The interlocking panel design ensures superior water resistance and prevents leaks, while the lightweight construction reduces structural load on your home.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Versatile Design Options</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Roser offers multiple profile options including Tile, Shake, and Shingle styles, each designed to replicate the appearance of traditional roofing materials while providing superior performance. With a wide range of colors and finishes, you can achieve the exact look you want for your home.
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
                Roser
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
                src="/products/logos/roser.png"
                alt="Roser Logo"
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
                <FontAwesomeIcon icon={faShield} className="h-20 w-20 text-rif-blue-500 mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold mb-4">
                  Durability
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Roser stone-coated metal roofing systems are built with <strong>premium steel cores and stone-coated finishes</strong> that withstand Florida's intense sun, high humidity, hurricanes, and severe weather. The interlocking panel design provides superior protection against wind uplift and water infiltration.
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
                Every Roser roofing system is manufactured to <strong>rigorous quality standards</strong> with Class A fire resistance, high wind ratings, and excellent impact resistance. The stone-coated finish is applied using advanced manufacturing processes for consistent quality and long-lasting performance.
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
                Roser delivers <strong>exceptional energy efficiency</strong> with solar-reflective stone coatings that reduce cooling costs. The lightweight design reduces structural load while providing superior durability and weather resistance for both residential and commercial applications.
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
                Roser stone-coated metal roofing provides <strong>comprehensive protection</strong> with Class A fire resistance, high wind ratings, and excellent impact resistance. The interlocking panel system prevents water infiltration and protects your property from Florida's severe weather.
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
                Investing in Roser means investing in <strong>long-term value</strong>. With minimal maintenance requirements, energy savings, and exceptional durability, Roser roofing systems provide decades of reliable performance and protection for your property.
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
                Roser roofing systems are <strong>trusted by professional contractors</strong> throughout Florida for their ease of installation, consistent quality, and proven performance in demanding weather conditions. The interlocking design simplifies installation while ensuring superior results.
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
            Roser
          </h2>
          <h3 className="text-3xl md:text-4xl font-semibold text-gray-600 mb-8">
            Distributor
          </h3>
          <div className="bg-white rounded-xl p-12 shadow-lg">
            <h4 className="text-2xl font-semibold text-rif-black mb-6">
              Your Trusted Source for Roser
            </h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              As an authorized distributor, we are proud to bring the quality and innovation of Roser to our customers. Our team is here to help you explore the Roser product line, answer your questions, and guide you toward the perfect solution for your roofing needs.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Contact us today to learn more about Roser or to schedule a consultation with one of our roofing experts!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Link
                href="/roofers"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
              >
                Find a Certified Roofer
              </Link>
              <a
                href="https://prproofing.com/manufacturers/stone-coated-roofing-roser/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
              >
                <FontAwesomeIcon icon={faExternalLink} className="h-4 w-4" />
                View More on PRP Roofing
              </a>
              <a
                href="https://www.roser-usa.com"
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
            Get started with a free estimate today. Sometimes it's easier to just pick up the phone and talk to one of our roofing experts—we're here to answer your questions and help you find the perfect Roser solution for your property. Or fill out our quick form online, whichever you prefer.
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

