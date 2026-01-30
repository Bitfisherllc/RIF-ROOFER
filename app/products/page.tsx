import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBoxes } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';
import ProductsGrid from './products-grid';
import { getProductOrder, getHiddenProductSlugs, sortProductsByOrder } from '@/lib/product-order';

export const metadata: Metadata = {
  title: 'Premium Roofing Products',
  description: 'Explore our comprehensive lineup of premium roofing products from leading manufacturers. Our certified roofers have access to priority inventory, wholesale pricing, and expert support.',
  keywords: [
    'roofing products',
    'metal roofing materials',
    'stone-coated metal',
    'roofing systems',
    'roofing supplies',
    'Florida roofing products',
    'roofing manufacturers',
  ],
};

interface Product {
  name: string;
  slug: string;
  description: string;
  category: string;
  logo?: string; // Path to logo image in /public/products/logos/
}

const products: Product[] = [
  {
    name: 'Attic Breeze',
    slug: 'attic-breeze',
    description: 'Solar-powered attic fans designed to improve ventilation and reduce heat buildup. Available in various models with durable powder-coated finishes.',
    category: 'Ventilation',
    logo: '/products/logos/attic-breeze.svg',
  },
  {
    name: 'Decra',
    slug: 'decra',
    description: 'Stone-coated steel roofing systems that combine durability with aesthetic appeal. Available in tile, shake, and shingle profiles.',
    category: 'Roofing Systems',
    logo: '/products/logos/decra.svg',
  },
  {
    name: 'Kennedy Skylights',
    slug: 'kennedy-skylights',
    description: 'Premium skylight solutions including polycarbonate and glass models, plus solar attic fans. Miami-Dade County hurricane approved options available.',
    category: 'Skylights & Ventilation',
    logo: '/products/logos/kennedy-skylights.svg',
  },
  {
    name: 'KNIGHT SHIELD',
    slug: 'knight-shield',
    description: 'Durable roofing products designed to provide superior protection and performance for various architectural styles and climates.',
    category: 'Roofing Systems',
    logo: '/products/logos/knight-shield.svg',
  },
  {
    name: 'LifeTime Tool',
    slug: 'lifetime-tool',
    description: 'Professional-grade roofing tools designed for durability and precision in metal roofing installation.',
    category: 'Tools & Equipment',
    logo: '/products/logos/lifetime-tool.png',
  },
  {
    name: 'PRP Lumber',
    slug: 'prp-lumber',
    description: 'Quality lumber products for roofing applications, providing structural support and reliability.',
    category: 'Materials',
    logo: '/products/logos/lumber.svg',
  },
  {
    name: 'McElroy',
    slug: 'mcelroy',
    description: 'Leading manufacturer of metal roofing systems and components, known for quality and innovation.',
    category: 'Roofing Systems',
    logo: '/products/logos/mcelroy.png',
  },
  {
    name: 'MFM',
    slug: 'mfm',
    description: 'Premium metal roofing products and systems designed for durability and performance.',
    category: 'Roofing Systems',
    logo: '/products/logos/mfm.svg',
  },
  {
    name: 'Premier Metal Roof MFG',
    slug: 'premier-metal-roof',
    description: 'High-quality metal roofing manufacturing solutions for residential and commercial applications.',
    category: 'Roofing Systems',
    logo: '/products/logos/premier-metal-roof.svg',
  },
  {
    name: 'Queen Tile',
    slug: 'queen-tile',
    description: 'Premium tile roofing products offering classic aesthetics with modern durability and performance.',
    category: 'Roofing Systems',
    logo: '/products/logos/queen-tile.svg',
  },
  {
    name: 'Raptor Synthetic Underlayment',
    slug: 'raptor-underlayment',
    description: 'Advanced synthetic underlayment providing superior protection and performance for roofing systems.',
    category: 'Underlayment',
    logo: '/products/logos/raptor-underlayment.svg',
  },
  {
    name: 'Roser',
    slug: 'roser',
    description: 'Quality roofing products and systems designed for professional installation and long-term performance.',
    category: 'Roofing Systems',
    logo: '/products/logos/roser.png',
  },
  {
    name: 'SOL-R-SKIN',
    slug: 'sol-r-skin',
    description: 'Innovative roofing membrane solutions providing superior protection and energy efficiency.',
    category: 'Membranes',
    logo: '/products/logos/sol-r-skin.svg',
  },
  {
    name: 'Tilcor',
    slug: 'tilcor',
    description: 'Premium stone-coated metal roofing systems combining durability, aesthetics, and performance.',
    category: 'Roofing Systems',
    logo: '/products/logos/tilcor.png',
  },
  {
    name: 'Unified Steel',
    slug: 'unified-steel',
    description: 'High-quality steel roofing products and systems designed for strength, durability, and weather resistance.',
    category: 'Roofing Systems',
    logo: '/products/logos/unified-steel.svg',
  },
];

export default function ProductsPage() {
  const order = getProductOrder();
  const hiddenSlugs = getHiddenProductSlugs();
  const sortedProducts = sortProductsByOrder(products, order).filter(
    (p) => !hiddenSlugs.includes(p.slug)
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-12 pb-16 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FontAwesomeIcon icon={faBoxes} className="h-8 w-8 text-rif-blue-500" />
            <h1 className="text-4xl md:text-5xl font-semibold text-rif-black tracking-tight">
              <a href="https://prproofing.com/" target="_blank" rel="noopener noreferrer" className="text-rif-black hover:text-rif-blue-600 hover:underline">Premium Roofing Products</a>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 font-light leading-relaxed">
            We partner with leading manufacturers to provide our certified roofers with 
            premium materials, priority inventory access, and wholesale pricing. 
            Explore our comprehensive product lineup below.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <ProductsGrid products={sortedProducts} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black mb-6">
            Partner with Quality Materials
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Our preferred roofing partners have access to priority inventory, 
            wholesale pricing, and expert support for all these premium products. 
            Contact us to learn more about becoming a certified RIF roofer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:813-777-8272"
              className="inline-flex items-center justify-center px-8 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium"
            >
              Call: 813-777-8272
            </a>
            <Link
              href="/roofers"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
            >
              Find a Certified Roofer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

















