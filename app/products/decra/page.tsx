import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faExternalLink, faShield, faLeaf, faHome, faWrench, faSun, faWind, faBolt, faDollarSign, faCertificate, faFire, faCloudRain, faSnowflake, faRecycle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
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
    name: 'DECRA Villa Tile', 
    slug: 'villa-tile',
    description: 'Replicate the vivid level of detail and dimension of Old-World Italian clay tile. Perfect for Mediterranean and Spanish-style homes seeking authentic tile aesthetics with modern durability.',
    image: '/products/decra/villa-tile-capri-clay-1.jpg',
  },
  { 
    name: 'DECRA Tile', 
    slug: 'tile',
    description: 'Replicate the look of scalloped Mediterranean tile. Classic elegance with the strength of stone-coated steel, available in multiple colors.',
    image: '/products/decra/villa-tile-tuscan-sun.jpg',
  },
  { 
    name: 'DECRA Shake', 
    slug: 'shake',
    description: 'Achieve the rich and distinctive shadow lines of cedar shake. Traditional shake aesthetic with modern performance, perfect for coastal and high-wind areas.',
    image: '/products/decra/shake-charcoal-56sq.jpg',
  },
  { 
    name: 'DECRA Shake XD', 
    slug: 'shake-xd',
    description: 'Achieve the rustic beauty and architectural detail of hand-split wood shake. Enhanced dimensional profile for maximum visual impact.',
    image: '/products/decra/shake-xd-pinnacle-grey-1.jpg',
  },
  { 
    name: 'DECRA Shingle XD', 
    slug: 'shingle-xd',
    description: 'Get the appearance of deep, distinctive shadow lines of traditional asphalt shingles. Classic shingle look with superior durability and performance.',
    image: '/products/decra/shingle-xd-natural-slate.webp',
  },
];

const galleryImages = [
  { src: '/products/decra/villa-tile-capri-clay-1.jpg', alt: 'DECRA Villa Tile Capri Clay' },
  { src: '/products/decra/villa-tile-capri-clay-2.jpg', alt: 'DECRA Villa Tile Capri Clay Detail' },
  { src: '/products/decra/villa-tile-capri-clay-3.jpg', alt: 'DECRA Villa Tile Capri Clay Installation' },
  { src: '/products/decra/villa-tile-rustico-clay.jpg', alt: 'DECRA Villa Tile Rustico Clay' },
  { src: '/products/decra/villa-tile-tuscan-sun.jpg', alt: 'DECRA Villa Tile Tuscan Sun' },
  { src: '/products/decra/villa-tile-venetian-gold.jpg', alt: 'DECRA Villa Tile Venetian Gold' },
  { src: '/products/decra/shake-charcoal-56sq.jpg', alt: 'DECRA Shake Charcoal' },
  { src: '/products/decra/shake-charcoal-70sq.jpg', alt: 'DECRA Shake Charcoal Large' },
  { src: '/products/decra/shake-xd-pinnacle-grey-1.jpg', alt: 'DECRA Shake XD Pinnacle Grey' },
  { src: '/products/decra/shake-xd-pinnacle-grey-30sq.jpg', alt: 'DECRA Shake XD Pinnacle Grey Detail' },
  { src: '/products/decra/shingle-xd-natural-slate.webp', alt: 'DECRA Shingle XD Natural Slate' },
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
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="/products/decra/hero.webp"
                alt="DECRA Stone-Coated Steel Roofing"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-6 right-6 bg-gray-800/90 rounded-lg p-4 shadow-xl">
                <Image
                  src="/products/logos/decra.svg"
                  alt="DECRA Logo"
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
                  <strong>DECRA Metal Roofing</strong> is the #1 stone-coated steel manufacturer for residential and commercial roofing, backed by a <strong>lifetime warranty</strong> to guarantee protection. When it comes to premium roofing solutions, DECRA stands as the gold standard.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Renowned for its innovative <strong>stone-coated steel technology</strong>, DECRA combines the timeless appeal of traditional roofing materials with the unmatched durability of steel. Whether you're seeking the rugged charm of cedar shakes, the elegance of Mediterranean tiles, or the modern look of architectural shingles, DECRA offers a product line designed to enhance your home's beauty while providing superior protection.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  With over <strong>60 years of experience</strong>, DECRA has earned its reputation as a leader in stone-coated metal roofing, trusted by professionals worldwide for its ease of installation and consistent performance.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/products/decra/villa-tile-capri-clay-1.jpg"
                alt="DECRA Stone-Coated Steel Roofing - Villa Tile"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Performance Ratings */}
      <section className="py-20 px-6 bg-rif-blue-500 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">
              Built for the Extreme. Proven to Last.
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              DECRA roofs are engineered to withstand the harshest elements with industry-leading ratings and warranties.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faCloudRain} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Hail Protection</h3>
              <p className="text-blue-100 leading-relaxed mb-4">
                DECRA roofs are backed by a <strong>warranty against hailstones up to 2.5 inches in diameter</strong>. Our stone-coated steel profiles hold the <strong>highest Class 4 impact rating</strong> from Underwriters Laboratories.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faFire} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Fire Resistance</h3>
              <p className="text-blue-100 leading-relaxed mb-4">
                When it comes to fire safety, DECRA leads the way. Our roofing systems are <strong>rated Class A, the highest level of fire resistance available</strong>, providing protection and peace of mind for your property.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faWind} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Wind Performance</h3>
              <p className="text-blue-100 leading-relaxed mb-4">
                DECRA roofs can <strong>withstand winds up to 120 mph</strong>, making them ideal for hurricane-prone areas like Florida. The interlocking panel design ensures superior wind resistance.
              </p>
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
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Durability That Outlasts Traditional Roofing</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Unlike asphalt shingles or clay tiles, DECRA roofs are made with <strong>stone-coated steel</strong>, offering unparalleled strength without compromising on style. These roofs are resistant to cracking, warping, and rust, making them an investment in long-term performance.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Built to last for decades, DECRA products provide peace of mind with an industry-leading lifetime warranty.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-rif-blue-500 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faRecycle} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Sustainable and Energy-Efficient</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                DECRA roofing isn't just tough—it's environmentally friendly. Made from <strong>recyclable materials</strong>, their products are designed with sustainability in mind.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The reflective properties of metal can also improve energy efficiency by keeping homes cooler in summer and reducing energy costs, making them an excellent choice for Florida homeowners.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-rif-blue-500 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faHome} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-rif-black mb-4">A Style for Every Home</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                With a variety of profiles, textures, and colors, DECRA products seamlessly blend with any architectural style. Whether it's the rustic appeal of <strong>DECRA Shake</strong>, the bold character of <strong>DECRA Villa Tile</strong>, or the sleek sophistication of <strong>DECRA Shingle XD</strong>, there's a roofing solution to match your aesthetic vision.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The interlocking panel design ensures superior water resistance and prevents leaks, while the lightweight construction reduces structural load on your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Lines */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-rif-black mb-4">DECRA</h2>
            <h3 className="text-2xl font-light text-gray-600">Roofing Products</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productLines.map((line) => (
              <div key={line.slug} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all group">
                {line.image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h4 className="text-2xl font-semibold text-rif-black mb-4">{line.name}</h4>
                  <p className="text-gray-600 leading-relaxed">{line.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-rif-black mb-4">
              DECRA Gallery
            </h2>
            <h3 className="text-2xl font-light text-gray-600">
              Sophisticated Style with the Strength of Steel
            </h3>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              Breathtaking designs are what you see at first glance, but underneath are layers of pure protection. DECRA's proprietary stone-coating process involves adhering natural stone granules to the top of base steel sheets to provide a wide range of styles, colors, and textures.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-medium text-sm px-4 py-2 bg-black/50 rounded-lg backdrop-blur-sm">
                      {image.alt}
                    </p>
                  </div>
                </div>
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
              Added Value for Discerning Customers
            </h2>
            <h3 className="text-2xl font-light text-gray-600">
              Unparalleled Benefits for Every Property Owner
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-rif-blue-500 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faWrench} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Low Maintenance, High Performance</h3>
              <p className="text-gray-600 leading-relaxed">
                Homeowners will appreciate the <strong>minimal upkeep required</strong> with DECRA roofs. Resistant to mold, mildew, and pests, these roofs retain their beauty and performance for decades with little effort. This translates to fewer headaches and reduced costs over time.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-rif-blue-500 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faShield} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-rif-black mb-4">An Investment in Safety</h3>
              <p className="text-gray-600 leading-relaxed">
                Safety is at the core of DECRA's design philosophy. The roofs are <strong>non-combustible and hold a Class A fire rating</strong>, providing an extra layer of protection for families and homes.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-rif-blue-500 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faCertificate} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Trusted by Professionals</h3>
              <p className="text-gray-600 leading-relaxed">
                Roofing professionals worldwide trust DECRA for its <strong>ease of installation and consistent performance</strong>. With over 60 years of experience, DECRA has earned its reputation as a leader in stone-coated metal roofing.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-rif-blue-500 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faDollarSign} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Long-Term Value</h3>
              <p className="text-gray-600 leading-relaxed">
                Investing in DECRA means investing in <strong>long-term value</strong>. Unlike asphalt shingles or clay tiles, DECRA products are designed to last for decades, reducing the need for frequent replacements and maintenance.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-rif-blue-500 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faCheckCircle} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Lifetime Warranty</h3>
              <p className="text-gray-600 leading-relaxed">
                DECRA Metal Roofing is backed by a <strong>lifetime warranty</strong> to guarantee protection. This industry-leading warranty provides peace of mind and demonstrates our confidence in the product's durability and performance.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-rif-blue-500 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faSun} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Energy Efficiency</h3>
              <p className="text-gray-600 leading-relaxed">
                The reflective properties of DECRA metal roofing can <strong>improve energy efficiency</strong> by keeping homes cooler in summer, reducing cooling costs and improving overall energy performance for Florida homeowners.
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
              Your Trusted Source for DECRA Roofing
            </h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
              As an authorized distributor, we are proud to bring the quality and innovation of DECRA roofing to our customers. Our team is here to help you explore the DECRA product line, answer your questions, and guide you toward the perfect solution for your roofing needs.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
              Upgrade your home with a DECRA roof—a choice that combines timeless beauty, unmatched durability, and sustainable performance. Whether you're looking for the rustic appeal of DECRA Shake, the bold character of DECRA Villa Tile, or the sleek sophistication of DECRA Shingle XD, we have the solution for you.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
              Contact us today to learn more about DECRA or to schedule a consultation with one of our roofing experts!
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
