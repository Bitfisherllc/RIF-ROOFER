'use client';

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';

interface AddressComponents {
  streetNumber?: string;
  streetName?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  fullAddress?: string;
  lat?: number;
  lng?: number;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (address: string, components: AddressComponents) => void;
  placeholder?: string;
  required?: boolean;
}

interface NominatimResult {
  place_id: number;
  licence: string;
  powered_by: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  address?: {
    house_number?: string;
    road?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    postcode?: string;
    country_code?: string;
  };
}

export default function AddressAutocomplete({
  value,
  onChange,
  placeholder = 'Enter address',
  required = false,
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchAddresses = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsSearching(true);
    try {
      // Use Nominatim (OpenStreetMap) geocoding API - free, no API key needed
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5&countrycodes=us`,
        {
          headers: {
            'User-Agent': 'RIF-Roofing-Website/1.0', // Required by Nominatim
          },
        }
      );

      if (response.ok) {
        const data: NominatimResult[] = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error('Error searching addresses:', error);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onChange(query, {});

    // Debounce the search
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchAddresses(query);
    }, 300);
  };

  const handleSelectSuggestion = (suggestion: NominatimResult) => {
    const address = suggestion.display_name;
    const lat = parseFloat(suggestion.lat);
    const lng = parseFloat(suggestion.lon);
    const addr = suggestion.address || {};

    const components: AddressComponents = {
      lat,
      lng,
      fullAddress: address,
      city: addr.city || addr.town || addr.village || '',
      state: addr.state || '',
      zipCode: addr.postcode || '',
      streetNumber: addr.house_number || '',
      streetName: addr.road || '',
    };

    onChange(address, components);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder={placeholder}
          required={required}
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
        />
        {isSearching && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 text-gray-400 animate-spin" />
          </div>
        )}
        {!isSearching && value && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 text-gray-400" />
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.place_id}
              type="button"
              onClick={() => handleSelectSuggestion(suggestion)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-sm text-gray-900">{suggestion.display_name}</div>
              {suggestion.address && (
                <div className="text-xs text-gray-500 mt-0.5">
                  {suggestion.address.city || suggestion.address.town || suggestion.address.village}
                  {suggestion.address.state && `, ${suggestion.address.state}`}
                  {suggestion.address.postcode && ` ${suggestion.address.postcode}`}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
