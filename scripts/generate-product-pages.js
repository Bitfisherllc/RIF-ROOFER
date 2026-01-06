const fs = require('fs');
const path = require('path');

// Product data from the products page
const products = [
  {
    name: 'Kennedy Skylights',
    slug: 'kennedy-skylights',
    category: 'Skylights & Ventilation',
    logo: '/products/logos/kennedy-skylights.svg',
    tagline: 'Premium Skylight Solutions',
    description: 'Premium skylight solutions including polycarbonate and glass models, plus solar attic fans. Miami-Dade County hurricane approved options available.',
  },
  {
    name: 'KNIGHT SHIELD',
    slug: 'knight-shield',
    category: 'Roofing Systems',
    logo: '/products/logos/knight-shield.svg',
    tagline: 'Superior Protection & Performance',
    description: 'Durable roofing products designed to provide superior protection and performance for various architectural styles and climates.',
  },
  {
    name: 'Unified Steel',
    slug: 'unified-steel',
    category: 'Roofing Systems',
    logo: '/products/logos/unified-steel.svg',
    tagline: 'Strength, Durability & Weather Resistance',
    description: 'High-quality steel roofing products and systems designed for strength, durability, and weather resistance.',
  },
  {
    name: 'MFM',
    slug: 'mfm',
    category: 'Roofing Systems',
    logo: '/products/logos/mfm.svg',
    tagline: 'Premium Metal Roofing Excellence',
    description: 'Premium metal roofing products and systems designed for durability and performance.',
  },
  {
    name: 'McElroy',
    slug: 'mcelroy',
    category: 'Roofing Systems',
    logo: '/products/logos/mcelroy.png',
    tagline: 'Quality & Innovation',
    description: 'Leading manufacturer of metal roofing systems and components, known for quality and innovation.',
  },
  {
    name: 'Queen Tile',
    slug: 'queen-tile',
    category: 'Roofing Systems',
    logo: '/products/logos/queen-tile.svg',
    tagline: 'Classic Aesthetics, Modern Durability',
    description: 'Premium tile roofing products offering classic aesthetics with modern durability and performance.',
  },
  {
    name: 'Premier Metal Roof MFG',
    slug: 'premier-metal-roof',
    category: 'Roofing Systems',
    logo: '/products/logos/premier-metal-roof.svg',
    tagline: 'High-Quality Metal Roofing Solutions',
    description: 'High-quality metal roofing manufacturing solutions for residential and commercial applications.',
  },
  {
    name: 'Roser',
    slug: 'roser',
    category: 'Roofing Systems',
    logo: '/products/logos/roser.png',
    tagline: 'Professional Installation & Long-Term Performance',
    description: 'Quality roofing products and systems designed for professional installation and long-term performance.',
  },
  {
    name: 'SOL-R-SKIN',
    slug: 'sol-r-skin',
    category: 'Membranes',
    logo: '/products/logos/sol-r-skin.svg',
    tagline: 'Superior Protection & Energy Efficiency',
    description: 'Innovative roofing membrane solutions providing superior protection and energy efficiency.',
  },
  {
    name: 'Raptor Synthetic Underlayment',
    slug: 'raptor-underlayment',
    category: 'Underlayment',
    logo: '/products/logos/raptor-underlayment.svg',
    tagline: 'Advanced Synthetic Protection',
    description: 'Advanced synthetic underlayment providing superior protection and performance for roofing systems.',
  },
  {
    name: 'LifeTime Tool',
    slug: 'lifetime-tool',
    category: 'Tools & Equipment',
    logo: '/products/logos/lifetime-tool.png',
    tagline: 'Professional-Grade Roofing Tools',
    description: 'Professional-grade roofing tools designed for durability and precision in metal roofing installation.',
  },
  {
    name: 'PRP Lumber',
    slug: 'prp-lumber',
    category: 'Materials',
    logo: '/products/logos/lumber.svg',
    tagline: 'Quality Lumber for Roofing Applications',
    description: 'Quality lumber products for roofing applications, providing structural support and reliability.',
  },
];

// Template function
function generateProductPage(product) {
  const componentName = product.name.replace(/[^a-zA-Z0-9]/g, '') + 'ProductPage';
  const logoExt = product.logo.split('.').pop();
  const isSvg = logoExt === 'svg';
  const logoClassName = isSvg ? 'brightness-0' : 'object-contain';
  const logoInvert = isSvg ? 'brightness-0 invert' : 'brightness-0 invert object-contain';
  
  return `import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faExternalLink, faShield, faLeaf, faHome, faWrench, faWind, faFire, faCloudRain } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';
import StickyProductNav from '@/components/StickyProductNav';

export const metadata: Metadata = {
  title: '${product.name}',
  description: '${product.description}',
  keywords: [
    '${product.name}',
    '${product.category}',
    'Florida roofing',
    'roofing products',
  ],
};

const productLines: { name: string; slug: string; description: string }[] = [];

const galleryImages: { src: string; alt: string }[] = [];

export default function ${componentName}() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <StickyProductNav
        logoPath="${product.logo}"
        logoAlt="${product.name} Logo"
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
              <span className="text-sm uppercase tracking-wider text-gray-400 mb-4 block">${product.category.toUpperCase()}</span>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                ${product.name}
              </h1>
              <h2 className="text-3xl md:text-4xl font-light text-gray-300 mb-8">
                ${product.tagline}
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
                ${product.description}
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
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group bg-gray-800 flex items-center justify-center">
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl">
                <Image
                  src="${product.logo}"
                  alt="${product.name} Logo"
                  width={140}
                  height={65}
                  className="${logoClassName}"
                  priority
                />
              </div>
              <p className="text-gray-400">Product Image Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
            Introducing <span className="text-rif-blue-500">${product.name}</span>
          </h2>
          <p className="text-2xl text-gray-600 mb-12 font-light">
            ${product.tagline}
          </p>
          <div className="prose prose-lg max-w-none text-left">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong>${product.name}</strong> ${product.description}
            </p>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500 mb-6">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Quality & Performance</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                ${product.name} products are designed and manufactured to meet the highest standards of quality and performance. Our commitment to excellence ensures that every product delivers reliable, long-lasting results for residential and commercial applications.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Why Choose ${product.name}?</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                ${product.name} offers superior quality, proven performance, and professional-grade solutions. Our products are trusted by contractors and homeowners throughout Florida for their durability, reliability, and exceptional value.
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
                ${product.name}
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
                src="${product.logo}"
                alt="${product.name} Logo"
                width={180}
                height={83}
                className="${logoInvert}"
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
                ${product.name} products are built with <strong>superior materials and construction</strong> to withstand Florida's challenging climate, including intense sun, high humidity, and severe weather conditions.
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
                Every ${product.name} product is manufactured to <strong>exacting quality standards</strong>, ensuring consistent performance and reliability for years to come.
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
                ${product.name} delivers <strong>exceptional performance</strong> in real-world applications, meeting and exceeding industry standards for residential and commercial roofing projects.
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
                ${product.name} products provide <strong>comprehensive protection</strong> for your property, designed to withstand the elements and maintain performance over time.
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
                Investing in ${product.name} means investing in <strong>long-term value</strong>. Our products are designed to last, reducing the need for frequent replacements and maintenance.
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
                ${product.name} products are <strong>trusted by professionals</strong> throughout the roofing industry for their quality, reliability, and consistent performance.
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
            ${product.name}
          </h2>
          <h3 className="text-3xl md:text-4xl font-semibold text-gray-600 mb-8">
            Distributor
          </h3>
          <div className="bg-white rounded-xl p-12 shadow-lg">
            <h4 className="text-2xl font-semibold text-rif-black mb-6">
              Your Trusted Source for ${product.name}
            </h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              As an authorized distributor, we are proud to bring the quality and innovation of ${product.name} to our customers. Our team is here to help you explore the ${product.name} product line, answer your questions, and guide you toward the perfect solution for your roofing needs.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Contact us today to learn more about ${product.name} or to schedule a consultation with one of our roofing experts!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Link
                href="/roofers"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
              >
                Find a Certified Roofer
              </Link>
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
            Get started with a free estimate today. Sometimes it's easier to just pick up the phone and talk to one of our roofing experts—we're here to answer your questions and help you find the perfect ${product.name} solution for your property. Or fill out our quick form online, whichever you prefer.
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
`;
}

// Generate all product pages
products.forEach(product => {
  const dir = path.join(__dirname, '..', 'app', 'products', product.slug);
  const filePath = path.join(dir, 'page.tsx');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Generate and write the page
  const content = generateProductPage(product);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Created ${product.slug}/page.tsx`);
});

console.log(`\n✅ Generated ${products.length} product pages!`);









