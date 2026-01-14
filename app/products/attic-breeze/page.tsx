import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faExternalLink, faShield, faLeaf, faHome, faWrench, faSun, faWind, faBolt } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';
import StickyProductNav from '@/components/StickyProductNav';

export const metadata: Metadata = {
  title: 'Attic Breeze Solar Attic Fans',
  description: 'Attic Breeze solar-powered attic fans improve ventilation, reduce heat buildup, and lower energy costs. Commercial-grade construction with lifetime warranty. Perfect for Florida homes.',
  keywords: [
    'Attic Breeze',
    'solar attic fan',
    'attic ventilation',
    'solar fan',
    'attic cooling',
    'energy efficiency',
    'Florida attic ventilation',
    'solar-powered fan',
  ],
};

const productLines = [
  { 
    name: 'SFA Series (Unit-Mounted)', 
    slug: 'sfa-series',
    description: 'Self-flashing fans with unit-mounted solar panels for roofs with good sun exposure. Available in 25W, 35W, and 45W models.',
    image: '/products/attic-breeze/sfa-model-sheet.jpg'
  },
  { 
    name: 'SFD Series (Remote-Mounted)', 
    slug: 'sfd-series',
    description: 'Self-flashing fans with remote-mounted solar panels ideal for northern-facing or shaded roofs. Available in 25W, 35W, 45W, and 65W models.',
    image: '/products/attic-breeze/sfd-model-sheet.jpg'
  },
  { 
    name: 'CMA Series (Curb-Mount)', 
    slug: 'cma-series',
    description: 'Curb-mount fans with unit-mounted solar panels for high-profile tile, metal roofs, or flat roofs.',
    image: '/products/attic-breeze/cma-model-sheet.jpg'
  },
  { 
    name: 'CMD Series (Curb-Mount Remote)', 
    slug: 'cmd-series',
    description: 'Curb-mount fans with remote-mounted solar panels for flexible installation on various roof types.',
    image: '/products/attic-breeze/cmd-model-sheet.jpg'
  },
  { 
    name: 'GM Series (Gable-Mount)', 
    slug: 'gm-series',
    description: 'Gable-end fans that eliminate roof penetrations, perfect for buildings with gable architecture.',
    image: '/products/attic-breeze/gm-model-sheet.jpg'
  },
  { 
    name: 'WM Series (Wall-Mount)', 
    slug: 'wm-series',
    description: 'Combines solar fan and louvered vent in one unit for easy wall-mount installation.',
    image: '/products/attic-breeze/wm-model-sheet.jpg'
  },
];

const galleryImages = [
  { src: '/products/attic-breeze/sfa-product-features.webp', alt: 'SFA Series Product Features' },
  { src: '/products/attic-breeze/sfd-product-features.jpg', alt: 'SFD Series Product Features' },
  { src: '/products/attic-breeze/hero.jpg', alt: 'Attic Breeze Solar Attic Fan' },
  { src: '/products/attic-breeze/installation-guide.jpg', alt: 'Attic Breeze Installation' },
  { src: '/products/attic-breeze/product-showcase.png', alt: 'Attic Breeze Product Showcase' },
  { src: '/products/attic-breeze/product-detail.jpg', alt: 'Attic Breeze Product Detail' },
];

const testimonials = [
  {
    quote: "Two months of heavy duty service in my barn and our solar gable fan hasn't skipped a beat. The horses really appreciate it! I'll be getting one for the house this fall.",
    author: 'Brian',
    role: 'Satisfied Client',
  },
  {
    quote: "Works great, easy install. Thanks Attic Breeze!",
    author: 'Gary',
    role: 'Satisfied Client',
  },
  {
    quote: "Very professional workmanship and product.",
    author: 'William',
    role: 'Satisfied Client',
  },
  {
    quote: "This solar attic fan works great. I was worried about noise, but when I went into the attic which was much cooler than ever before, I had to get close to even hear it.",
    author: 'Dan',
    role: 'Satisfied Client',
  },
  {
    quote: "So far our solar attic fan is working as advertised, and we are very pleased with it and the results that it provides.",
    author: 'Paul',
    role: 'Satisfied Client',
  },
  {
    quote: "These solar powered attic fans with a Breeze Mate interface controller are just fantastic!!!!",
    author: 'Mark',
    role: 'Satisfied Client',
  },
];

export default function AtticBreezeProductPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <StickyProductNav
        logoPath="/products/logos/attic-breeze.svg"
        logoAlt="Attic Breeze Logo"
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
              <span className="text-sm uppercase tracking-wider text-gray-400 mb-4 block">SOLAR-POWERED VENTILATION</span>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                Attic Breeze
              </h1>
              <h2 className="text-3xl md:text-4xl font-light text-gray-300 mb-8">
                America's Leader in Solar Powered Ventilation
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
                A cost-effective way to cool your home. For a home around 1,000 square feet, installing two solar attic fans saves around 460 kWh, typically amounting to $50 per year in energy savings.
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
                src="/products/attic-breeze/hero.jpg"
                alt="Attic Breeze Solar Attic Fan"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-6 right-6 bg-gray-800 rounded-lg p-4 shadow-xl">
                <Image
                  src="/products/logos/attic-breeze.svg"
                  alt="Attic Breeze Logo"
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
            Introducing <span className="text-rif-blue-500">Attic Breeze</span>
          </h2>
          <p className="text-2xl text-gray-600 mb-12 font-light">
            Solar-Powered Attic Ventilation Excellence
          </p>
          <div className="prose prose-lg max-w-none text-left">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong>Attic Breeze</strong> is America's leader in solar-powered ventilation, offering a wide range of solar attic fans. A cost-effective way to cool your home, Attic Breeze solar attic fans are worth the investment. Depending on your area's electricity rates, it may take more time to see that return on investment come into play. For a home around 1,000 square feet, installing two solar attic fans saves around 460 kWh. This typically amounts to $50 per year in energy savings.
            </p>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500 mb-6">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Solar-Powered Performance with Zero Operating Costs</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Attic Breeze fans are powered entirely by the sun, meaning <strong>zero electricity costs</strong> and <strong>no wiring required</strong>. The <strong>UltraFlo® technology</strong> ensures high airflow performance, moving hot, stagnant air out of your attic while drawing in cooler air. This natural ventilation process helps maintain a more consistent temperature in your living spaces, reducing the strain on your air conditioning system and lowering your energy bills. For a typical 1,000 square foot home, two Attic Breeze fans can save approximately 460 kWh annually, translating to about $50 per year in energy savings.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Why Choose Attic Breeze?</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Attic Breeze fans are engineered to withstand extreme weather conditions, from Florida's intense sun and humidity to hurricane-force winds. Built with <strong>commercial-grade materials</strong> including monocrystalline solar panels and corrosion-resistant zincalume alloy construction, these fans are designed to last for decades. All Attic Breeze model series fans feature an <strong>industry-leading Lifetime Warranty</strong> on all residential fan applications, giving homeowners confidence in their investment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
            How Does It Work?
          </h2>
            <p className="text-xl text-gray-600 mb-12 font-light leading-relaxed">
            Attic Breeze solar fans reduce heat and moisture in your attic by actively pulling in cooler outside air and pushing hot air out. This self-regulating system works all day – no wiring, no cost of operation. The result: lower attic temps, less strain on your AC, and a more comfortable home. For a 1,000 square foot home, installing two fans typically saves around 460 kWh annually, amounting to approximately $50 per year in energy costs.
          </p>
          <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/products/attic-breeze/installation-guide.jpg"
              alt="How Attic Breeze Works"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
              Key Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Attic Breeze solar attic fans provide comprehensive benefits for your home and wallet
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">
                Removes Heat & Moisture
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Continuously exhausts hot, humid air to protect your attic and reduce mold, roof wear, and energy costs.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">
                Lowers Cooling Costs
              </h3>
              <p className="text-gray-700 leading-relaxed">
                By keeping attic temperatures down, your AC doesn't have to work as hard—saving energy and money.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">
                Extends Roof & Shingle Life
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Less heat stress means your shingles last longer and perform better.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">
                Helps Insulation Work Better
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Cooler attic temps improve insulation efficiency, especially in older homes where moisture is a concern.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">
                Improves HVAC Performance
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Reduces attic heat load, allowing your HVAC system to operate more efficiently for years to come.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">
                Works Automatically, Every Day
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our fans run when the sun shines – no wiring, no hassle, zero operating costs.
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
              Attic Breeze
            </h2>
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-600">
              Product Series
            </h3>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              All Attic Breeze model series fans feature an industry-leading <strong>Lifetime Warranty</strong> on all residential fan applications.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productLines.map((product) => (
              <div
                key={product.slug}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-rif-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                <h4 className="text-xl font-semibold text-rif-black mb-3">
                  {product.name}
                </h4>
                <p className="text-gray-600 leading-relaxed mb-3">
                  {product.description}
                </p>
                <p className="text-sm text-rif-blue-500 font-semibold">
                  Lifetime Warranty Included
                </p>
                </div>
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
                src="/products/logos/attic-breeze.svg"
                alt="Attic Breeze Logo"
                width={180}
                height={83}
                className="brightness-0 invert"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built for Performance.
            </h2>
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-300">
              Powered by the Sun.
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <div className="mb-6">
                <FontAwesomeIcon icon={faSun} className="h-20 w-20 text-rif-blue-500 mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold mb-4">
                  Solar-Powered Efficiency
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Attic Breeze fans operate entirely on <strong>solar power</strong>, eliminating electricity costs and reducing your carbon footprint. Available in <strong>25W, 35W, 45W, and 65W models</strong> to match your attic size and sun exposure.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <div className="mb-6">
                <FontAwesomeIcon icon={faWind} className="h-20 w-20 text-rif-blue-500 mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold mb-4">
                  High Airflow Performance
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                With <strong>UltraFlo® technology</strong>, Attic Breeze fans deliver exceptional airflow performance, moving up to <strong>2,150 CFM</strong> depending on the model. This powerful ventilation helps reduce attic temperatures by up to 30-50 degrees Fahrenheit.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <div className="mb-6">
                <FontAwesomeIcon icon={faBolt} className="h-20 w-20 text-rif-blue-500 mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold mb-4">
                  Energy Savings
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                By reducing attic heat buildup, Attic Breeze fans help lower your <strong>cooling costs by up to 30%</strong> during hot summer months. The reduced heat also extends the life of your roof shingles and HVAC system.
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
              for Every Homeowner
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="mb-6">
                <FontAwesomeIcon icon={faShield} className="h-20 w-20 text-rif-blue-500 mb-4" />
                <h3 className="text-2xl font-semibold text-rif-black mb-4">
                  Commercial-Grade Durability
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Unlike standard attic fans, Attic Breeze products are built with <strong>corrosion-resistant zincalume alloy construction</strong> and <strong>monocrystalline solar panels</strong>. These fans are designed to withstand Florida's harsh climate, including intense sun, high humidity, and hurricane-force winds, ensuring decades of reliable performance.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="mb-6">
                <FontAwesomeIcon icon={faLeaf} className="h-20 w-20 text-rif-blue-500 mb-4" />
                <h3 className="text-2xl font-semibold text-rif-black mb-4">
                  Environmentally Friendly
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Attic Breeze fans are <strong>100% solar-powered</strong>, producing zero emissions and requiring no electricity from the grid. By reducing your home's cooling load, these fans help lower your carbon footprint while saving money on energy bills. It's a win-win for your wallet and the environment.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="mb-6">
                <FontAwesomeIcon icon={faHome} className="h-20 w-20 text-rif-blue-500 mb-4" />
                <h3 className="text-2xl font-semibold text-rif-black mb-4">
                  Installation Flexibility
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                With multiple mounting options including <strong>self-flashing, curb-mount, gable-mount, and wall-mount</strong>, Attic Breeze offers solutions for virtually any roof type or architectural style. Whether you have composite shingles, tile, metal roofing, or gable ends, there's an Attic Breeze model designed for your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
              Attic Breeze
            </h2>
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-600 mb-8">
              In Action
            </h3>
          </div>
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

      {/* Made in USA Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <FontAwesomeIcon icon={faHome} className="h-20 w-20 text-rif-blue-500 mx-auto mb-6" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-6">
            Manufactured in the USA
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Attic Breeze solar attic fans are manufactured in the USA using only the highest quality foreign and domestic parts. Our products are designed to consistently deliver years of performance and durability, making them a favorite of professional contractors both across America and worldwide.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            We stand behind the quality and workmanship of our products by offering an industry leading <strong>Lifetime Parts Limited Warranty</strong>. Engineered with commercial-grade parts, stainless hardware, and UV-resistant housings, we build them to outlast your roof.
          </p>
        </div>
      </section>

      {/* Added Value Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
              Added Value
            </h2>
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-600">
              for Discerning Customers
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="mb-6">
                <FontAwesomeIcon icon={faWrench} className="h-20 w-20 text-rif-blue-500 mb-4" />
                <h3 className="text-2xl font-semibold text-rif-black mb-4">
                  Low Maintenance, High Performance
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Homeowners will appreciate the minimal upkeep required with Attic Breeze fans. With no electrical connections, no moving parts to wear out, and weather-resistant construction, these fans operate reliably for decades with virtually no maintenance required.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="mb-6">
                <FontAwesomeIcon icon={faShield} className="h-20 w-20 text-rif-blue-500 mb-4" />
                <h3 className="text-2xl font-semibold text-rif-black mb-4">
                  Lifetime Warranty Protection
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Attic Breeze stands behind their products with an <strong>industry-leading Lifetime Parts Limited Warranty</strong>. This comprehensive warranty provides peace of mind and demonstrates the manufacturer's confidence in their product quality and durability.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="mb-6">
                <FontAwesomeIcon icon={faBolt} className="h-20 w-20 text-rif-blue-500 mb-4" />
                <h3 className="text-2xl font-semibold text-rif-black mb-4">
                  Immediate Energy Savings
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Once installed, Attic Breeze fans begin working immediately to reduce attic temperatures and lower cooling costs. Many homeowners see a <strong>return on investment within 2-3 years</strong> through reduced energy bills, making it a smart financial decision as well as an environmental one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Saves Money Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
              How Does It Save Money?
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-600 mb-8">
              Proper attic ventilation supports your home's energy efficiency in several ways:
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">
                Insulation Works Better
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Attic insulation is your home's first line of defense against heat transfer. Over time, heat and moisture buildup in the attic can degrade insulation and reduce its effectiveness. Attic Breeze fans help extend the life and performance of your insulation by removing trapped heat and moisture.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">
                HVAC is More Efficient
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The efficiency rating (SEER) of your HVAC system is measured under controlled conditions (77°F). In real-world situations, especially when attics become overheated, your system works harder and less efficiently. By lowering attic temperatures, Attic Breeze fans help reduce the strain on your HVAC system.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">
                Shingles Last Longer
              </h3>
              <p className="text-gray-700 leading-relaxed">
                High attic temperatures may contribute to elevated roof surface heat, which may accelerate wear on shingles over time. When an attic is ventilated, heat is more effectively released, reducing the likelihood of excessive shingle heat buildup and extending the life of your roof.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Better Parts, Better Performance Section */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Better Parts, Better Performance
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Attic Breeze solar attic fans are built to professional-grade standards, designed for long-term durability and consistent performance. We proudly assemble our products in the USA, using the highest quality domestic and foreign parts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-rif-blue-400">
                Commercial-Grade Solar Panels
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Impact resistant, commercial-grade monocrystalline solar panels, available in 25, 35, 45, and 65 watt models. Monocrystalline cells provide optimum power production over a high temperature range.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-rif-blue-400">
                UltraFlo Technology
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Engineered with UltraFlo technology to give maximum airflow production; best performance of any solar attic fan on the market. Proprietary high-efficiency variable speed motor for optimum fan performance.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-rif-blue-400">
                Windstorm Certified
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Corrosion-resistant zincalume alloy construction designed to withstand 170MPH windstorm conditions. Both Florida and Texas windstorm tested and approved.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-rif-blue-400">
                All Metal Construction
              </h3>
              <p className="text-gray-300 leading-relaxed">
                All metal construction for long lasting durability; will not become brittle and crack after years of sun exposure like products made from plastic. Stainless steel brackets, hardware, and rodent guards.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-rif-blue-400">
                Aluminum Fan Blade
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Dynamically balanced 14" aluminum fan blade; will not lose performance in heat like plastic fan blades. Exclusive fan blade design for high performance and whisper quiet operation.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-rif-blue-400">
                Powder Coated Finish
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Heavy-duty powder coated finish available in a range of colors designed to complement your roof. Temperature control and fire safety switch standard on all models at no additional charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from satisfied homeowners and contractors
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 shadow-md">
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-gray-300 pt-4">
                  <p className="font-semibold text-rif-black">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Contractors Choose Attic Breeze Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
              Why Contractors Choose Attic Breeze
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional roofing contractors trust Attic Breeze for its outstanding reputation, ease of installation, and reliable performance. Here's what makes Attic Breeze the preferred choice:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Easy Installation</h3>
              <p className="text-gray-700 leading-relaxed">
                Attic Breeze fans are designed for straightforward installation with self-flashing bases that eliminate the need for complex roof modifications. The solar-powered design means no electrical wiring, making installation faster and safer.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Flexible Mounting Options</h3>
              <p className="text-gray-700 leading-relaxed">
                With multiple series available—including self-flashing, curb-mount, gable-mount, and wall-mount—contractors can find the perfect solution for any roof type or architectural style, ensuring customer satisfaction.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Proven Performance</h3>
              <p className="text-gray-700 leading-relaxed">
                Attic Breeze fans have been trusted by contractors and homeowners for years, with a track record of reliable performance in Florida's challenging climate. The commercial-grade construction ensures long-term customer satisfaction.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Customer Satisfaction</h3>
              <p className="text-gray-700 leading-relaxed">
                Homeowners love the energy savings and improved comfort that Attic Breeze fans provide. The lifetime warranty and zero operating costs make it an easy sell, leading to satisfied customers and repeat business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Breeze Mate & Accessories Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
              Advanced Features & Accessories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Attic Breeze offers the most comprehensive range of accessories and mounting options of any solar attic fan product available
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">
                Breeze Mate® Control System
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Available with the Breeze Mate® control system, offering a range of both safety and operational features for your attic ventilation system. This advanced control system provides enhanced functionality and peace of mind.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Temperature control and fire safety switch standard on all models</li>
                <li>Enhanced monitoring and control capabilities</li>
                <li>Safety features for optimal operation</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">
                Complete Installation Package
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Every Attic Breeze fan comes with everything you need for installation, making it easy for contractors and DIY enthusiasts alike.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Mounting screws and weatherproof caulking included</li>
                <li>Installation accessories provided</li>
                <li>Multiple mounting options: self-flashing, curb-mount, gable mount, or wall mount</li>
                <li>Extended cable runs available for remote panel installations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Distributor Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
            Attic Breeze
          </h2>
          <h3 className="text-3xl md:text-4xl font-semibold text-gray-600 mb-8">
            Distributor
          </h3>
          <div className="bg-white rounded-xl p-12 shadow-lg">
            <h4 className="text-2xl font-semibold text-rif-black mb-6">
              Your Trusted Source for Attic Breeze Solar Fans
            </h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              As an authorized distributor, we are proud to bring the quality and innovation of Attic Breeze solar attic fans to our customers. Our team is here to help you explore the Attic Breeze product line, answer your questions, and guide you toward the perfect ventilation solution for your home.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Improve your home's energy efficiency and comfort with Attic Breeze—a choice that combines solar-powered performance, unmatched durability, and zero operating costs. Contact us today to learn more or to schedule a consultation!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Link
                href="/roofers"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
              >
                Find a Certified Roofer
              </Link>
              <a
                href="https://prproofing.com/manufacturers/attic-breeze/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
              >
                <FontAwesomeIcon icon={faExternalLink} className="h-4 w-4" />
                View More on PRP Roofing
              </a>
              <a
                href="https://www.atticbreeze.net"
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
            Ready to Improve Your Attic Ventilation?
          </h2>
          <p className="text-lg mb-8 leading-relaxed text-gray-200">
            Get started with a free estimate today. Sometimes it's easier to just pick up the phone and talk to one of our roofing experts—we're here to answer your questions and help you find the perfect Attic Breeze solution for your home. Or fill out our quick form online, whichever you prefer.
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







