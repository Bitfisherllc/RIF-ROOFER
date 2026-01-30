'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

export const STORAGE_KEY_PRODUCTS = 'rif-saved-products';

export interface SavedProduct {
  slug: string;
  name: string;
  category: string;
  logo?: string;
}

interface AddToPlanButtonProps {
  productSlug: string;
  productName: string;
  productCategory: string;
  productLogo?: string;
  className?: string;
  variant?: 'icon' | 'button'; // icon-only or "Add to plan" text
}

function getStoredProducts(): SavedProduct[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (!raw) return [];
    return JSON.parse(raw) as SavedProduct[];
  } catch {
    return [];
  }
}

export default function AddToPlanButton({
  productSlug,
  productName,
  productCategory,
  productLogo,
  className = '',
  variant = 'button',
}: AddToPlanButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

  const updateSaved = () => {
    const products = getStoredProducts();
    setIsSaved(products.some((p) => p.slug === productSlug));
  };

  useEffect(() => {
    updateSaved();
    const handleStorage = () => updateSaved();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [productSlug]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const products = getStoredProducts();
    const exists = products.some((p) => p.slug === productSlug);
    let next: SavedProduct[];
    if (exists) {
      next = products.filter((p) => p.slug !== productSlug);
    } else {
      next = [
        ...products,
        { slug: productSlug, name: productName, category: productCategory, logo: productLogo },
      ];
    }
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(next));
    setIsSaved(!exists);
  };

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={isSaved ? 'Remove from plan' : 'Add to plan'}
        className={`p-2 rounded-lg transition-colors ${className}`}
      >
        <FontAwesomeIcon
          icon={isSaved ? faHeart : faHeartRegular}
          className={`h-5 w-5 ${isSaved ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
        />
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={toggle}
        aria-label={isSaved ? 'Remove from plan' : 'Add to plan'}
        className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
          isSaved
            ? 'text-red-600 bg-red-50 hover:bg-red-100 border border-red-200'
            : 'text-gray-700 hover:text-rif-blue-600 hover:bg-rif-blue-50 border border-gray-300 hover:border-rif-blue-300'
        }`}
      >
        <FontAwesomeIcon
          icon={isSaved ? faHeart : faHeartRegular}
          className={`h-4 w-4 ${isSaved ? 'text-red-500' : ''}`}
        />
        <span className="hidden sm:inline">{isSaved ? 'In your plan' : 'Add to plan'}</span>
      </button>
      {isSaved && (
        <Link
          href="/my-plan"
          className="hidden sm:inline text-sm font-medium text-rif-blue-600 hover:text-rif-blue-700"
        >
          View plan
        </Link>
      )}
    </div>
  );
}
