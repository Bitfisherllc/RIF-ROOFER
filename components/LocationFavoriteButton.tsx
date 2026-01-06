'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

interface SavedLocation {
  type: 'region' | 'county' | 'city';
  name: string;
  slug: string;
  path: string;
  county?: string;
  region?: string;
}

interface LocationFavoriteButtonProps {
  locationType: 'region' | 'county' | 'city';
  name: string;
  slug: string;
  path: string;
  county?: string;
  region?: string;
  size?: 'sm' | 'lg';
}

const STORAGE_KEY = 'rif-saved-locations';

export default function LocationFavoriteButton({
  locationType,
  name,
  slug,
  path,
  county,
  region,
  size = 'sm',
}: LocationFavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if location is already saved
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const savedLocations: SavedLocation[] = JSON.parse(stored);
          setIsFavorite(savedLocations.some((l) => l.path === path));
        }
      } catch (error) {
        console.error('Error loading saved locations:', error);
      }
    }
  }, [path]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let savedLocations: SavedLocation[] = stored ? JSON.parse(stored) : [];

      if (isFavorite) {
        // Remove from favorites
        savedLocations = savedLocations.filter((l) => l.path !== path);
      } else {
        // Add to favorites
        const locationToAdd: SavedLocation = {
          type: locationType,
          name,
          slug,
          path,
          county,
          region,
        };
        
        // Check if location already exists
        if (!savedLocations.some((l) => l.path === path)) {
          savedLocations.push(locationToAdd);
        }
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedLocations));
      setIsFavorite(!isFavorite);

      // Dispatch custom event for other components to listen
      window.dispatchEvent(new CustomEvent('locationFavoriteChanged', {
        detail: { location: { type: locationType, name, slug, path, county, region }, isFavorite: !isFavorite }
      }));
    } catch (error) {
      console.error('Error saving location:', error);
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
      aria-label={isFavorite ? `Remove ${name} from saved locations` : `Add ${name} to saved locations`}
      title={isFavorite ? 'Remove from saved locations' : 'Add to saved locations'}
    >
      <FontAwesomeIcon
        icon={isFavorite ? faStarSolid : faStarRegular}
        className={iconSize}
      />
    </button>
  );
}

