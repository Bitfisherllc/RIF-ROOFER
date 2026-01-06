'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

interface Product {
  slug: string;
  name: string;
  category: string;
  logo?: string;
}

interface ProductFavoriteButtonProps {
  product: Product;
}

const STORAGE_KEY = 'rif-saved-products';

export default function ProductFavoriteButton({ product }: ProductFavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if product is already saved
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const savedProducts: Product[] = JSON.parse(stored);
        setIsFavorite(savedProducts.some((p) => p.slug === product.slug));
      }
    } catch (error) {
      console.error('Error loading saved products:', error);
    }
  }, [product.slug]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let savedProducts: Product[] = stored ? JSON.parse(stored) : [];

      if (isFavorite) {
        // Remove from favorites
        savedProducts = savedProducts.filter((p) => p.slug !== product.slug);
      } else {
        // Add to favorites
        if (!savedProducts.some((p) => p.slug === product.slug)) {
          savedProducts.push(product);
        }
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedProducts));
      setIsFavorite(!isFavorite);

      // Dispatch custom event for other components to listen
      window.dispatchEvent(new CustomEvent('productFavoriteChanged', { detail: { product, isFavorite: !isFavorite } }));
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors z-10"
      aria-label={isFavorite ? 'Remove from saved products' : 'Add to saved products'}
      title={isFavorite ? 'Remove from saved products' : 'Add to saved products'}
    >
      <FontAwesomeIcon
        icon={isFavorite ? faHeartSolid : faHeartRegular}
        className={`h-5 w-5 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
      />
    </button>
  );
}

