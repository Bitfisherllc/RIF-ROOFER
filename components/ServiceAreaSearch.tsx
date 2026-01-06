'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapLocationDot, faTimes } from '@fortawesome/free-solid-svg-icons';
import { searchData, type SearchResult } from '@/app/service-areas/data/search-data';

interface ServiceAreaSearchProps {
  variant?: 'sticky' | 'hero';
  className?: string;
}

export default function ServiceAreaSearch({ variant = 'sticky', className = '' }: ServiceAreaSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = searchData.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10);
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleResultClick = () => {
    setQuery('');
    setIsOpen(false);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'region': return 'Region';
      case 'county': return 'County';
      case 'city': return 'City';
      default: return type;
    }
  };

  const getTypeIcon = (type: string) => {
    return faMapLocationDot;
  };

  if (variant === 'hero') {
    return (
      <div className={`relative ${className}`} ref={searchRef}>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.trim().length > 0 && setIsOpen(true)}
              placeholder="Search by city, county, or region..."
              className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-rif-blue-500 focus:outline-none focus:ring-2 focus:ring-rif-blue-200"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setIsOpen(false);
                }}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <FontAwesomeIcon icon={faTimes} className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {isOpen && results.length > 0 && (
            <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-xl max-h-96 overflow-y-auto">
              {results.map((result, idx) => (
                <Link
                  key={idx}
                  href={result.path}
                  onClick={handleResultClick}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <FontAwesomeIcon
                    icon={getTypeIcon(result.type)}
                    className={`h-5 w-5 ${
                      result.type === 'region' ? 'text-rif-blue-500' :
                      result.type === 'county' ? 'text-rif-blue-400' :
                      'text-gray-400'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{result.name}</div>
                    {(result.county || result.region) && (
                      <div className="text-sm text-gray-500">
                        {result.county && `${result.county}`}
                        {result.county && result.region && ' • '}
                        {result.region && result.region}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 uppercase">{getTypeLabel(result.type)}</span>
                </Link>
              ))}
            </div>
          )}

          {isOpen && query.trim().length > 0 && results.length === 0 && (
            <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-xl p-4">
              <p className="text-gray-500 text-center">No results found</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Sticky variant
  return (
    <div className={`sticky top-14 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-3 ${className}`} ref={searchRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faSearch} className="h-4 w-4 text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim().length > 0 && setIsOpen(true)}
            placeholder="Search service areas..."
            className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:border-rif-blue-500 focus:outline-none focus:ring-1 focus:ring-rif-blue-200"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FontAwesomeIcon icon={faTimes} className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}

          {isOpen && results.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
              {results.map((result, idx) => (
                <Link
                  key={idx}
                  href={result.path}
                  onClick={handleResultClick}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <FontAwesomeIcon
                    icon={getTypeIcon(result.type)}
                    className={`h-4 w-4 ${
                      result.type === 'region' ? 'text-rif-blue-500' :
                      result.type === 'county' ? 'text-rif-blue-400' :
                      'text-gray-400'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 truncate">{result.name}</div>
                    {(result.county || result.region) && (
                      <div className="text-xs text-gray-500 truncate">
                        {result.county && `${result.county}`}
                        {result.county && result.region && ' • '}
                        {result.region && result.region}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 uppercase flex-shrink-0">{getTypeLabel(result.type)}</span>
                </Link>
              ))}
            </div>
          )}

          {isOpen && query.trim().length > 0 && results.length === 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl p-3">
              <p className="text-gray-500 text-center text-sm">No results found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
















