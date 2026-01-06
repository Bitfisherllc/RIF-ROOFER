'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

interface FavoriteButtonProps {
  rooferId: string;
  rooferSlug: string;
  rooferName: string;
  rooferPhone?: string;
  rooferEmail?: string;
  rooferWebsiteUrl?: string;
  size?: 'sm' | 'lg';
}

interface FavoriteRoofer {
  id: string;
  slug: string;
  name: string;
  phone?: string;
  email?: string;
  websiteUrl?: string;
}

const STORAGE_KEY = 'rif-favorite-roofers';

export default function FavoriteButton({
  rooferId,
  rooferSlug,
  rooferName,
  rooferPhone,
  rooferEmail,
  rooferWebsiteUrl,
  size = 'sm',
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Load favorites from localStorage
    if (typeof window !== 'undefined') {
      try {
        const favoritesJson = localStorage.getItem(STORAGE_KEY);
        if (favoritesJson) {
          const favorites: FavoriteRoofer[] = JSON.parse(favoritesJson);
          const isFav = favorites.some((fav) => fav.id === rooferId);
          setIsFavorite(isFav);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, [rooferId]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof window === 'undefined') return;

    try {
      const favoritesJson = localStorage.getItem(STORAGE_KEY);
      let favorites: FavoriteRoofer[] = favoritesJson ? JSON.parse(favoritesJson) : [];

      if (isFavorite) {
        // Remove from favorites
        favorites = favorites.filter((fav) => fav.id !== rooferId);
      } else {
        // Add to favorites
        const newFavorite: FavoriteRoofer = {
          id: rooferId,
          slug: rooferSlug,
          name: rooferName,
          phone: rooferPhone,
          email: rooferEmail,
          websiteUrl: rooferWebsiteUrl,
        };
        favorites.push(newFavorite);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const iconSize = size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';
  const buttonSize = size === 'lg' ? 'p-2.5' : 'p-1.5';

  return (
    <button
      onClick={toggleFavorite}
      className={`${buttonSize} rounded-full transition-colors ${
        isFavorite
          ? 'text-yellow-500 hover:text-yellow-600 bg-yellow-50 hover:bg-yellow-100'
          : 'text-gray-400 hover:text-yellow-500 bg-gray-50 hover:bg-gray-100'
      }`}
      aria-label={isFavorite ? `Remove ${rooferName} from favorites` : `Add ${rooferName} to favorites`}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <FontAwesomeIcon
        icon={isFavorite ? faStarSolid : faStarRegular}
        className={iconSize}
      />
    </button>
  );
}
