'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ProductFavoriteButton from '@/components/ProductFavoriteButton';

interface Product {
  name: string;
  slug: string;
  description: string;
  category: string;
  logo?: string;
}

interface ProductsGridProps {
  products: Product[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <Link
          key={product.slug}
          href={`/products/${product.slug}`}
          className="group relative block bg-white border border-gray-200 rounded-2xl p-8 hover:border-rif-blue-300 hover:shadow-lg transition-all duration-300"
        >
          <ProductFavoriteButton product={product} />
          
          {/* Product Logo */}
          <div className="mb-6 h-24 flex items-center justify-center bg-gray-800 rounded-xl group-hover:bg-gray-700 transition-colors">
            {product.logo ? (
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <Image
                  src={product.logo}
                  alt={`${product.name} logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="text-center">
                <div className="text-2xl font-bold text-rif-blue-500 mb-2">
                  {product.name.charAt(0)}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  {product.category}
                </div>
              </div>
            )}
          </div>

          {/* Product Name */}
          <h2 className="text-2xl font-semibold text-rif-black mb-3 group-hover:text-rif-blue-500 transition-colors">
            {product.name}
          </h2>

          {/* Product Description */}
          <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
            {product.description}
          </p>

          {/* Learn More Link */}
          <div className="flex items-center gap-2 text-rif-blue-500 group-hover:text-rif-blue-600 transition-colors font-medium">
            <span>Learn More</span>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="h-4 w-4 group-hover:translate-x-1 transition-transform"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}


