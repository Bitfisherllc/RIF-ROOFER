'use client';

import { useEffect, useState, useMemo, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapLocationDot,
  faArrowLeft,
  faSpinner,
  faCertificate,
  faPhone,
  faGlobe,
  faExternalLink,
  faSearch,
  faTimes,
  faFilter,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { getAllRoofers, type RooferData } from '../data/roofers';
import { batchGeocode, type Coordinates } from '@/lib/geocoding';
import { getCountyCoordinates } from '@/lib/county-coordinates';
import { getRooferFastCoordinates } from '@/lib/fast-coordinates';
import { searchData } from '@/app/service-areas/data/search-data';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import('react-leaflet').then((mod) => mod.Tooltip),
  { ssr: false }
);
const ZoomControl = dynamic(
  () => import('react-leaflet').then((mod) => mod.ZoomControl),
  { ssr: false }
);
const AttributionControl = dynamic(
  () => import('react-leaflet').then((mod) => mod.AttributionControl),
  { ssr: false }
);
const ScaleControl = dynamic(
  () => import('react-leaflet').then((mod) => mod.ScaleControl),
  { ssr: false }
);

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Leaflet will be loaded dynamically in the component

interface RooferWithCoordinates extends RooferData {
  coordinates?: Coordinates;
  geocodingError?: boolean;
}

interface CountyGroup {
  countySlug: string;
  countyName: string;
  coordinates: Coordinates;
  rooferCount: number;
  roofers: RooferData[];
  preferredCount: number;
}

interface CityGroup {
  cityName: string;
  citySlug: string;
  coordinates: Coordinates;
  rooferCount: number;
  roofers: RooferData[];
  preferredCount: number;
  countyName?: string;
}

// Component to handle map zooming when county or city is selected
// This must be a child of MapContainer to use useMap
function MapZoomHandler({ 
  selectedCounty, 
  selectedCity,
  countyGroups,
  cityGroups,
  mapRef
}: { 
  selectedCounty: string | null;
  selectedCity: string | null;
  countyGroups: CountyGroup[];
  cityGroups: CityGroup[];
  mapRef: React.MutableRefObject<any>;
}) {
  useEffect(() => {
    if (!mapRef.current) return;
    
    // If city is selected, zoom to city (Level 2 -> Level 3)
    if (selectedCity && cityGroups.length > 0) {
      const cityGroup = cityGroups.find(g => g.citySlug === selectedCity);
      if (cityGroup) {
        mapRef.current.setView(
          [cityGroup.coordinates.lat, cityGroup.coordinates.lng],
          14, // Zoom level 14 is good for showing individual roofers
          { animate: true, duration: 0.5 }
        );
        return;
      }
    }
    
    // If county is selected, zoom to county to show all cities
    if (selectedCounty && countyGroups.length > 0) {
      const countyGroup = countyGroups.find(g => g.countySlug === selectedCounty);
      if (countyGroup) {
        // If we have cities for this county, fit bounds to show all of them
        // cityGroups is already filtered by selectedCounty
        if (cityGroups.length > 0) {
          // Calculate bounds to fit all cities
          const lats = cityGroups.map(c => c.coordinates.lat);
          const lngs = cityGroups.map(c => c.coordinates.lng);
          const bounds = [
            [Math.min(...lats), Math.min(...lngs)],
            [Math.max(...lats), Math.max(...lngs)]
          ] as [[number, number], [number, number]];
          
          // Fit bounds with padding to ensure all cities are visible
          mapRef.current.fitBounds(bounds, {
            padding: [50, 50] // Add padding around the bounds
          });
        } else {
          // No cities yet (might still be loading), use lower zoom to show county area
          mapRef.current.setView(
            [countyGroup.coordinates.lat, countyGroup.coordinates.lng],
            9, // Lower zoom level (9 instead of 11) to show more area
            { animate: true, duration: 0.5 }
          );
        }
      }
    }
  }, [selectedCounty, selectedCity, countyGroups, cityGroups, mapRef]);
  
  // Clear city selection when zooming out
  useEffect(() => {
    if (mapRef.current) {
      const handleZoom = () => {
        const zoom = mapRef.current?.getZoom() || 0;
        if (zoom <= 11 && selectedCity) {
          // Zoomed out, clear city selection
          // This will be handled by parent component
        }
      };
      
      mapRef.current.on('zoomend', handleZoom);
      return () => {
        mapRef.current?.off('zoomend', handleZoom);
      };
    }
  }, [selectedCity, mapRef]);
  
  return null;
}

// Component to get map instance and store in ref
function MapInstanceHandler({ mapRef, onZoomChange }: { 
  mapRef: React.MutableRefObject<any>;
  onZoomChange?: (zoom: number) => void;
}) {
  const [useMapHook, setUseMapHook] = useState<any>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('react-leaflet').then((mod) => {
        setUseMapHook(() => mod.useMap);
      });
    }
  }, []);
  
  if (!useMapHook) return null;
  
  const MapInstanceComponent = () => {
    const map = useMapHook();
    
    useEffect(() => {
      mapRef.current = map;
      
      // Track zoom changes
      if (onZoomChange) {
        const updateZoom = () => {
          onZoomChange(map.getZoom());
        };
        map.on('zoomend', updateZoom);
        updateZoom(); // Initial zoom
        
        return () => {
          map.off('zoomend', updateZoom);
        };
      }
    }, [map, mapRef, onZoomChange]);
    
    return null;
  };
  
  return <MapInstanceComponent />;
}

// Custom marker icon for preferred roofers (using RIF blue)
const createPreferredIcon = (leaflet: any) => {
  if (!leaflet || !leaflet.divIcon) return undefined;
  return leaflet.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: #1e4a87;
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(37, 94, 171, 0.4);
    "></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
};

// Custom marker icon for regular roofers (using RIF blue)
const createRegularIcon = (leaflet: any) => {
  if (!leaflet || !leaflet.divIcon) return undefined;
  return leaflet.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: #255eab;
      width: 25px;
      height: 25px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(37, 94, 171, 0.35);
    "></div>`,
    iconSize: [25, 25],
    iconAnchor: [12.5, 25],
  });
};

function RoofersMapPageContent() {
  const searchParams = useSearchParams();
  const [roofers, setRoofers] = useState<RooferWithCoordinates[]>([]);
  const [loading, setLoading] = useState(true);
  const [geocodingProgress, setGeocodingProgress] = useState({ current: 0, total: 0 });
  const [mapReady, setMapReady] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState<any>(null);
  const [countyGroups, setCountyGroups] = useState<CountyGroup[]>([]);
  const [showIndividualMarkers, setShowIndividualMarkers] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [mapZoom, setMapZoom] = useState(7);
  const [currentZoom, setCurrentZoom] = useState(7);
  const mapRef = useRef<any>(null);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof searchData>([]);
  const [selectedLocation, setSelectedLocation] = useState<typeof searchData[0] | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [rooferFilter, setRooferFilter] = useState<'all' | 'preferred' | 'other'>('all');
  const searchRef = useRef<HTMLDivElement>(null);

  // Florida center coordinates
  const floridaCenter: Coordinates = { lat: 27.7663, lng: -81.6868 };

  // Load Leaflet dynamically - use namespace import
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet').then((leafletModule) => {
        // Try to get Leaflet - it might be default export or namespace
        let leaflet = (leafletModule as any).default;
        if (!leaflet || typeof leaflet.divIcon !== 'function') {
          // Try as namespace import
          leaflet = leafletModule;
        }
        // Fix for default marker icons in Next.js
        if (leaflet && leaflet.Icon && leaflet.Icon.Default) {
          delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
          leaflet.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
          });
        }
        setLeafletLoaded(leaflet);
      }).catch((err) => {
        console.error('Failed to load Leaflet:', err);
      });
    }
  }, []);

  // Load counties immediately (no geocoding needed)
  useEffect(() => {
    const loadCounties = () => {
      try {
        const allRoofers = getAllRoofers();
        
        // Group roofers by county
        const countyMap = new Map<string, { roofers: RooferData[]; countyName: string }>();
        
        allRoofers.forEach((roofer) => {
          const counties = roofer.serviceAreas?.counties || [];
          
          if (counties.length === 0) {
            // If no county specified, skip for now
            return;
          }
          
          counties.forEach((countySlug) => {
            // Get county name from search data
            const countyData = searchData.find(
              (item) => item.type === 'county' && item.slug === countySlug
            );
            const countyName = countyData?.name.replace(' County', '') || countySlug;
            
            if (!countyMap.has(countySlug)) {
              countyMap.set(countySlug, { roofers: [], countyName });
            }
            countyMap.get(countySlug)!.roofers.push(roofer);
          });
        });
        
        // Create county groups with coordinates (instant, no API calls)
        const groups: CountyGroup[] = [];
        countyMap.forEach(({ roofers, countyName }, countySlug) => {
          const coords = getCountyCoordinates(countySlug);
          if (coords) {
            groups.push({
              countySlug,
              countyName,
              coordinates: coords,
              rooferCount: roofers.length,
              roofers,
              preferredCount: roofers.filter((r) => r.isPreferred).length,
            });
          }
        });
        
        setCountyGroups(groups);
        setMapReady(true);
        setLoading(false);
      } catch (error) {
        console.error('Error loading counties:', error);
        setLoading(false);
      }
    };

    loadCounties();
  }, []);

  // Handle query parameters to auto-select county/city
  useEffect(() => {
    const countyParam = searchParams.get('county');
    const cityParam = searchParams.get('city');
    
    if (countyParam && countyGroups.length > 0) {
      // Verify the county exists in our data
      const countyExists = countyGroups.some(g => g.countySlug === countyParam);
      if (countyExists) {
        setSelectedCounty(countyParam);
        setShowIndividualMarkers(true);
        
        // If city is also specified, select it after a short delay to allow city groups to load
        if (cityParam) {
          setTimeout(() => {
            setSelectedCity(cityParam);
          }, 500);
        }
      }
    }
  }, [searchParams, countyGroups]);

  // Load individual roofer markers when needed (lazy load)
  useEffect(() => {
    if (!showIndividualMarkers && !selectedCounty && !selectedCity) {
      return; // Don't geocode if not showing individual markers
    }

    const loadIndividualMarkers = async () => {
      try {
        const allRoofers = getAllRoofers();
        
        // Determine which roofers to geocode
        let roofersToGeocode: RooferData[];
        if (selectedCity) {
          // If city is selected, only geocode roofers from that city
          roofersToGeocode = allRoofers.filter((roofer) => {
            if (!roofer.city) return false;
            const rooferCitySlug = roofer.city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            return rooferCitySlug === selectedCity;
          });
        } else if (selectedCounty) {
          // Only geocode roofers from selected county
          roofersToGeocode = allRoofers.filter((roofer) =>
            roofer.serviceAreas?.counties?.includes(selectedCounty)
          );
        } else {
          // Geocode all roofers
          roofersToGeocode = allRoofers;
        }
        
        // First, assign fast coordinates (city/county) to all roofers instantly
        const roofersWithFastCoords: RooferWithCoordinates[] = roofersToGeocode.map((roofer) => {
          const existing = roofers.find((r) => r.id === roofer.id);
          
          // If we already have coordinates, use them
          if (existing?.coordinates) {
            return existing;
          }
          
          // Try to get fast coordinates (city/county - instant, no API call)
          const fastCoords = getRooferFastCoordinates(roofer);
          if (fastCoords) {
            return {
              ...roofer,
              coordinates: fastCoords,
            };
          }
          
          // No fast coordinates available, will need geocoding
          return roofer as RooferWithCoordinates;
        });
        
        // Update with fast coordinates immediately (instant display)
        setRoofers((prev) => {
          const merged = new Map(prev.map((r) => [r.id, r]));
          roofersWithFastCoords.forEach((r) => {
            if (r.coordinates) {
              merged.set(r.id, r);
            }
          });
          return Array.from(merged.values());
        });
        
        // Now geocode only the ones that need it (those without fast coordinates)
        const roofersNeedingGeocode = roofersWithFastCoords.filter((roofer) => {
          return !roofer.coordinates && !roofer.geocodingError;
        });
        
        if (roofersNeedingGeocode.length === 0) {
          return; // All have coordinates (fast or cached)
        }
        
        // Only geocode the ones that need it (background process, non-blocking)
        setGeocodingProgress({ current: 0, total: roofersNeedingGeocode.length });
        
        const addressesToGeocode = roofersNeedingGeocode.map((roofer) => ({
          address: roofer.address,
          city: roofer.city,
          state: roofer.state || 'FL',
          zipCode: roofer.zipCode,
        }));
        
        // Geocode in background (non-blocking)
        batchGeocode(
          addressesToGeocode,
          (current, total) => {
            setGeocodingProgress({ current, total });
          },
          2
        ).then((geocodeResults) => {
          const roofersWithGeocodedCoords: RooferWithCoordinates[] = roofersNeedingGeocode.map((roofer, index) => {
            const geocodeResult = geocodeResults[index];
            
            if (geocodeResult?.coordinates) {
              return {
                ...roofer,
                coordinates: geocodeResult.coordinates,
              };
            } else {
              return {
                ...roofer,
                geocodingError: true,
              };
            }
          });
          
          // Update with geocoded coordinates (refines positions)
          setRoofers((prev) => {
            const merged = new Map(prev.map((r) => [r.id, r]));
            roofersWithGeocodedCoords.forEach((r) => {
              merged.set(r.id, r);
            });
            return Array.from(merged.values());
          });
          
          setGeocodingProgress({ current: roofersNeedingGeocode.length, total: roofersNeedingGeocode.length });
        });
        
        // Merge with existing roofers (fast coordinates are already merged above)
        // The geocoded coordinates will be merged in the batchGeocode callback above
      } catch (error) {
        console.error('Error loading individual markers:', error);
      }
    };

    loadIndividualMarkers();
  }, [showIndividualMarkers, selectedCounty, selectedCity, roofers]);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = searchData.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 10);
      setSearchResults(filtered);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  // Handle click outside search dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isSearchOpen]);

  // Filter roofers based on selected location and roofer type
  const filteredRoofers = useMemo(() => {
    let filtered = roofers.filter((r) => r.coordinates);
    
    // Filter by location if selected
    if (selectedLocation) {
      if (selectedLocation.type === 'region') {
        filtered = filtered.filter((roofer) => 
          roofer.serviceAreas?.regions?.includes(selectedLocation.slug)
        );
      } else if (selectedLocation.type === 'county') {
        filtered = filtered.filter((roofer) => 
          roofer.serviceAreas?.counties?.includes(selectedLocation.slug)
        );
      } else if (selectedLocation.type === 'city') {
        // For cities, we need to check if roofer serves that city's county
        const cityCounty = searchData.find(
          (item) => item.type === 'county' && 
          item.name === selectedLocation.county
        );
        if (cityCounty) {
          filtered = filtered.filter((roofer) => 
            roofer.serviceAreas?.counties?.includes(cityCounty.slug)
          );
        }
      }
    }
    
    // Filter by roofer type
    if (rooferFilter === 'preferred') {
      filtered = filtered.filter((r) => r.isPreferred);
    } else if (rooferFilter === 'other') {
      filtered = filtered.filter((r) => !r.isPreferred);
    }
    
    return filtered;
  }, [roofers, selectedLocation, rooferFilter]);

  // Filter county groups based on location and roofer type
  const filteredCountyGroups = useMemo(() => {
    let filtered = countyGroups;
    
    // Filter by location if selected
    if (selectedLocation) {
      if (selectedLocation.type === 'region') {
        const regionCounties = searchData
          .filter((item) => item.type === 'county' && item.region === selectedLocation.name)
          .map((item) => item.slug);
        filtered = filtered.filter((group) => 
          regionCounties.includes(group.countySlug)
        );
      } else if (selectedLocation.type === 'county') {
        filtered = filtered.filter((group) => 
          group.countySlug === selectedLocation.slug
        );
      } else if (selectedLocation.type === 'city') {
        const cityCounty = searchData.find(
          (item) => item.type === 'county' && 
          item.name === selectedLocation.county
        );
        if (cityCounty) {
          filtered = filtered.filter((group) => 
            group.countySlug === cityCounty.slug
          );
        }
      }
    }
    
    // Filter by roofer type - recalculate counts
    if (rooferFilter !== 'all') {
      filtered = filtered.map((group) => {
        const filteredRoofers = rooferFilter === 'preferred'
          ? group.roofers.filter((r) => r.isPreferred)
          : group.roofers.filter((r) => !r.isPreferred);
        
        return {
          ...group,
          rooferCount: filteredRoofers.length,
          preferredCount: filteredRoofers.filter((r) => r.isPreferred).length,
          roofers: filteredRoofers,
        };
      }).filter((group) => group.rooferCount > 0);
    }
    
    return filtered;
  }, [countyGroups, selectedLocation, rooferFilter]);

  // Filter roofers with valid coordinates (using filtered list)
  // When a city is selected, show roofers from that city that have coordinates
  const roofersWithCoords = useMemo(() => {
    if (selectedCity) {
      // When city is selected, get roofers from the roofers state (those that have been geocoded)
      // The geocoding useEffect will populate the roofers state with coordinates
      return roofers.filter((roofer) => {
        if (!roofer.city || !roofer.coordinates) return false;
        const rooferCitySlug = roofer.city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        return rooferCitySlug === selectedCity;
      });
    }
    // When no city selected, only show roofers with coordinates
    return filteredRoofers.filter((roofer) => roofer.coordinates);
  }, [filteredRoofers, selectedCity, roofers]);

  // Group roofers by city/town/neighborhood (Level 2)
  // Show when a county is selected (Level 1 -> Level 2)
  const cityGroups = useMemo(() => {
    // Only show city groups when a county is selected (Level 2)
    if (!selectedCounty || !showIndividualMarkers) {
      return [];
    }
    
    const cityMap = new Map<string, CityGroup>();
    
    roofersWithCoords
      .filter((roofer) => {
        // Only show roofers from the selected county
        return roofer.serviceAreas?.counties?.includes(selectedCounty);
      })
      .forEach((roofer) => {
        if (!roofer.coordinates || !roofer.city) return;
        
        const cityName = roofer.city;
        const citySlug = cityName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        
        if (!cityMap.has(citySlug)) {
          cityMap.set(citySlug, {
            cityName,
            citySlug,
            coordinates: roofer.coordinates,
            rooferCount: 0,
            roofers: [],
            preferredCount: 0,
            countyName: roofer.serviceAreas?.counties?.[0] 
              ? searchData.find(
                  (item) => item.type === 'county' && item.slug === roofer.serviceAreas?.counties?.[0]
                )?.name.replace(' County', '')
              : undefined,
          });
        }
        
        const group = cityMap.get(citySlug)!;
        group.rooferCount++;
        group.roofers.push(roofer);
        if (roofer.isPreferred) {
          group.preferredCount++;
        }
      });
    
    return Array.from(cityMap.values());
  }, [roofersWithCoords, showIndividualMarkers, selectedCounty]);

  // Determine which level we're at
  const mapLevel = useMemo(() => {
    if (!showIndividualMarkers) {
      return 'counties'; // Level 1: Counties
    }
    if (selectedCounty && !selectedCity) {
      return 'cities'; // Level 2: Cities/Towns
    }
    if (selectedCity) {
      return 'roofers'; // Level 3: Individual Roofers
    }
    return 'counties';
  }, [showIndividualMarkers, selectedCounty, selectedCity]);

  // Calculate map bounds to fit all markers (counties or individual roofers)
  const mapBounds = useMemo(() => {
    if (showIndividualMarkers && roofersWithCoords.length > 0) {
      const lats = roofersWithCoords.map((r) => r.coordinates!.lat);
      const lngs = roofersWithCoords.map((r) => r.coordinates!.lng);
      
      return [
        [Math.min(...lats), Math.min(...lngs)],
        [Math.max(...lats), Math.max(...lngs)],
      ] as [[number, number], [number, number]];
    } else if (filteredCountyGroups.length > 0) {
      const lats = filteredCountyGroups.map((g) => g.coordinates.lat);
      const lngs = filteredCountyGroups.map((g) => g.coordinates.lng);
      
      return [
        [Math.min(...lats), Math.min(...lngs)],
        [Math.max(...lats), Math.max(...lngs)],
      ] as [[number, number], [number, number]];
    }
    return null;
  }, [roofersWithCoords, filteredCountyGroups, showIndividualMarkers]);
  
  // Create county marker icon with count (using RIF blue colors)
  const createCountyIcon = (count: number, preferredCount: number) => {
    if (!leafletLoaded) return undefined;
    const size = Math.max(44, 36 + count.toString().length * 4);
    return leafletLoaded.divIcon({
      className: 'county-marker',
      html: `<div style="
        background: ${preferredCount > 0 
          ? 'linear-gradient(135deg, #1e4a87 0%, #173764 100%)' 
          : 'linear-gradient(135deg, #255eab 0%, #1e4a87 100%)'};
        color: white;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 3px 12px rgba(37, 94, 171, 0.4), 0 1px 3px rgba(0,0,0,0.2);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 15px;
        text-align: center;
        line-height: 1.1;
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', system-ui, sans-serif;
      ">
        <div style="font-size: 16px; line-height: 1;">${count}</div>
        ${preferredCount > 0 ? `<div style="font-size: 9px; opacity: 0.95; margin-top: 1px; font-weight: 600;">${preferredCount}★</div>` : ''}
      </div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faSpinner}
            className="h-12 w-12 text-rif-blue-500 mb-4 animate-spin"
          />
          <h2 className="text-2xl font-semibold text-rif-black mb-2">
            Loading Roofers Map
          </h2>
          <p className="text-gray-600 mb-2">
            Geocoding addresses... {geocodingProgress.current} of {geocodingProgress.total}
          </p>
          <p className="text-sm text-gray-500">
            This may take a moment as we locate each roofer on the map.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-20 pb-6 px-6 bg-gradient-to-b from-rif-blue-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/roofers"
            className="inline-flex items-center gap-2 text-rif-blue-600 hover:text-rif-blue-700 mb-4 text-sm font-medium"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
            Back to Roofers List
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <FontAwesomeIcon
              icon={faMapLocationDot}
              className="h-8 w-8 text-rif-blue-500"
            />
            <h1 className="text-4xl md:text-5xl font-semibold text-rif-black tracking-tight">
              Roofers Map
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl">
            Explore our network of RIF Certified Installers across Florida. Click on any
            marker to view roofer details and contact information.
          </p>
          
          {/* Search and Filters */}
          <div className="mt-6 space-y-4">
            {/* Search Bar */}
            <div className="relative" ref={searchRef}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length > 0 && setIsSearchOpen(true)}
                placeholder="Search by city, county, region, or town..."
                className="w-full pl-12 pr-12 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-rif-blue-500 focus:outline-none focus:ring-2 focus:ring-rif-blue-200 bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedLocation(null);
                    setIsSearchOpen(false);
                  }}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <FontAwesomeIcon icon={faTimes} className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
              
              {/* Search Results Dropdown */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-80 overflow-y-auto">
                  {searchResults.map((result, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedLocation(result);
                        setSearchQuery(result.name);
                        setIsSearchOpen(false);
                        // Auto-switch to individual markers if county/city selected
                        if (result.type === 'county' || result.type === 'city') {
                          setShowIndividualMarkers(true);
                        }
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-rif-blue-50 transition-colors border-b border-gray-100 last:border-b-0 text-left"
                    >
                      <FontAwesomeIcon
                        icon={faMapLocationDot}
                        className={`h-4 w-4 flex-shrink-0 ${
                          result.type === 'region' ? 'text-rif-blue-600' :
                          result.type === 'county' ? 'text-rif-blue-500' :
                          'text-rif-blue-400'
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
                      <span className="text-xs text-gray-400 uppercase flex-shrink-0 font-medium">
                        {result.type === 'region' ? 'Region' : result.type === 'county' ? 'County' : 'City'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Filter Buttons and Stats */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Roofer Type Filter */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setRooferFilter('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    rooferFilter === 'all'
                      ? 'bg-white text-rif-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setRooferFilter('preferred')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    rooferFilter === 'preferred'
                      ? 'bg-white text-rif-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FontAwesomeIcon icon={faCertificate} className="h-3.5 w-3.5" />
                  Preferred
                </button>
                <button
                  onClick={() => setRooferFilter('other')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    rooferFilter === 'other'
                      ? 'bg-white text-rif-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Other
                </button>
              </div>
              
              {/* Stats */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-rif-blue-500 rounded-full"></div>
                  <span className="text-gray-700">
                    {showIndividualMarkers 
                      ? `${roofersWithCoords.length} Roofers`
                      : `${filteredCountyGroups.length} Counties • ${filteredCountyGroups.reduce((sum, g) => sum + g.rooferCount, 0)} Roofers`}
                  </span>
                </div>
                {roofersWithCoords.filter((r) => r.isPreferred).length > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-rif-blue-700 rounded-full"></div>
                    <span className="text-gray-700">
                      {showIndividualMarkers
                        ? roofersWithCoords.filter((r) => r.isPreferred).length
                        : filteredCountyGroups.reduce((sum, g) => sum + g.preferredCount, 0)} Preferred
                    </span>
                  </div>
                )}
              </div>
              
              {/* Clear Location Filter */}
              {selectedLocation && (
                <button
                  onClick={() => {
                    setSelectedLocation(null);
                    setSearchQuery('');
                  }}
                  className="ml-auto px-3 py-1.5 text-sm text-rif-blue-600 hover:text-rif-blue-700 hover:bg-rif-blue-50 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <FontAwesomeIcon icon={faTimes} className="h-3.5 w-3.5" />
                  Clear Location
                </button>
              )}
              
              {/* Back Button - Show when not at county level */}
              {mapLevel !== 'counties' && (
                <button
                  onClick={() => {
                    if (mapLevel === 'roofers') {
                      // Level 3 -> Level 2: Go back to cities/towns view
                      setSelectedCity(null);
                      // Keep county selected to show cities
                    } else if (mapLevel === 'cities') {
                      // Level 2 -> Level 1: Go back to counties view
                      setSelectedCounty(null);
                      setSelectedCity(null);
                      setShowIndividualMarkers(false);
                      setSelectedLocation(null); // Clear location filter to show all counties
                      setSearchQuery(''); // Clear search query
                      // Reset map to show all counties
                      if (mapRef.current) {
                        mapRef.current.setView(
                          [floridaCenter.lat, floridaCenter.lng],
                          7,
                          { animate: true, duration: 0.5 }
                        );
                      }
                    }
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
                  {mapLevel === 'roofers' ? 'Back to Cities & Towns' : 'Back to All Counties'}
                </button>
              )}
              
              {/* View Toggle - Only show at county level to jump to all roofers view */}
              {mapLevel === 'counties' && (
                <button
                  onClick={() => {
                    // Jump directly to showing all individual roofers (bypass city grouping)
                    setSelectedCounty(null);
                    setSelectedCity(null);
                    setShowIndividualMarkers(true);
                  }}
                  className="ml-auto px-4 py-2 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors text-sm font-medium"
                >
                  Show All Roofers
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Container */}
      <section className="relative bg-gradient-to-b from-gray-50 to-rif-blue-50" style={{ height: 'calc(100vh - 280px)', minHeight: '600px' }}>
        {mapReady && (
          <MapContainer
            center={[floridaCenter.lat, floridaCenter.lng]}
            zoom={7}
            bounds={mapBounds || undefined}
            style={{ height: '100%', width: '100%', zIndex: 0 }}
            scrollWheelZoom={false}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            
            {/* Map Controls */}
            <ZoomControl position="topright" />
            <ScaleControl position="bottomleft" imperial={false} />
            <AttributionControl position="bottomright" />
            
            {/* Get map instance and store in ref */}
            <MapInstanceHandler 
              mapRef={mapRef} 
              onZoomChange={setCurrentZoom}
            />
            
            {/* Map zoom handler for county/city selection */}
            <MapZoomHandler 
              selectedCounty={selectedCounty}
              selectedCity={selectedCity}
              countyGroups={filteredCountyGroups}
              cityGroups={cityGroups}
              mapRef={mapRef}
            />
            
            {/* Show county markers when not showing individual markers */}
            {!showIndividualMarkers && filteredCountyGroups.map((group) => (
              <Marker
                key={`county-${group.countySlug}`}
                position={[group.coordinates.lat, group.coordinates.lng]}
                icon={leafletLoaded ? createCountyIcon(group.rooferCount, group.preferredCount) : undefined}
                eventHandlers={{
                  click: () => {
                    // Level 1 -> Level 2: Click county to show cities/towns
                    setSelectedCounty(group.countySlug);
                    setSelectedCity(null); // Clear any city selection
                    setShowIndividualMarkers(true);
                  },
                }}
              >
                <Tooltip permanent={false} direction="top" offset={[0, -10]}>
                  <div className="text-center">
                    <div className="font-semibold text-rif-black text-sm">
                      {group.countyName}
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5">
                      {group.rooferCount} {group.rooferCount === 1 ? 'Roofer' : 'Roofers'}
                    </div>
                  </div>
                </Tooltip>
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="text-lg font-semibold text-rif-black mb-2">
                      {group.countyName}
                    </h3>
                    <div className="text-sm text-gray-600 mb-3">
                      <div className="mb-1">
                        <strong>{group.rooferCount}</strong> {group.rooferCount === 1 ? 'Roofer' : 'Roofers'}
                      </div>
                      {group.preferredCount > 0 && (
                        <div className="text-rif-blue-600">
                          <strong>{group.preferredCount}</strong> Preferred {group.preferredCount === 1 ? 'Roofer' : 'Roofers'}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        // Level 1 -> Level 2: Click county to show cities/towns
                        setSelectedCounty(group.countySlug);
                        setSelectedCity(null); // Clear any city selection
                        setShowIndividualMarkers(true);
                      }}
                      className="w-full px-3 py-1.5 bg-rif-blue-500 text-white rounded hover:bg-rif-blue-600 transition-colors text-sm font-medium"
                    >
                      View Cities & Towns
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
            
            {/* Level 2: Show city/town markers when county is selected */}
            {mapLevel === 'cities' && cityGroups.length > 0 && cityGroups.map((group) => (
              <Marker
                key={`city-${group.citySlug}`}
                position={[group.coordinates.lat, group.coordinates.lng]}
                icon={leafletLoaded ? createCountyIcon(group.rooferCount, group.preferredCount) : undefined}
                eventHandlers={{
                  click: () => {
                    // Level 2 -> Level 3: Click city to show individual roofers
                    setSelectedCity(group.citySlug);
                  },
                }}
              >
                <Tooltip 
                  permanent={false} 
                  direction="top" 
                  offset={[0, -10]}
                  opacity={0.95}
                  className="city-tooltip"
                >
                  <div className="text-center px-2 py-1">
                    <div className="font-bold text-rif-black text-base">
                      {group.cityName}
                    </div>
                    <div className="text-sm text-gray-700 mt-1 font-medium">
                      {group.rooferCount} {group.rooferCount === 1 ? 'Roofer' : 'Roofers'}
                    </div>
                  </div>
                </Tooltip>
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="text-lg font-semibold text-rif-black mb-2">
                      {group.cityName}
                      {group.countyName && (
                        <span className="text-sm text-gray-600 font-normal block">
                          {group.countyName} County
                        </span>
                      )}
                    </h3>
                    <div className="text-sm text-gray-600 mb-3">
                      <div className="mb-1">
                        <strong>{group.rooferCount}</strong> {group.rooferCount === 1 ? 'Roofer' : 'Roofers'}
                      </div>
                      {group.preferredCount > 0 && (
                        <div className="text-rif-blue-600">
                          <strong>{group.preferredCount}</strong> Preferred {group.preferredCount === 1 ? 'Roofer' : 'Roofers'}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        // Level 2 -> Level 3: Click city to show individual roofers
                        setSelectedCity(group.citySlug);
                        // Ensure individual markers are shown
                        if (!showIndividualMarkers) {
                          setShowIndividualMarkers(true);
                        }
                      }}
                      className="w-full px-3 py-1.5 bg-rif-blue-500 text-white rounded hover:bg-rif-blue-600 transition-colors text-sm font-medium"
                    >
                      View Individual Roofers
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
            
            {/* Level 3: Show individual roofer markers when city is selected */}
            {mapLevel === 'roofers' && selectedCity && roofersWithCoords
              .filter((roofer): roofer is typeof roofer & { coordinates: NonNullable<typeof roofer.coordinates> } => {
                // Only show roofers from the selected city that have coordinates
                if (!roofer.city || !roofer.coordinates) return false;
                const rooferCitySlug = roofer.city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                return rooferCitySlug === selectedCity;
              })
              .map((roofer) => {
              // At this point, we know roofer has coordinates (filtered above)
              
              const icon = leafletLoaded ? (roofer.isPreferred ? createPreferredIcon(leafletLoaded) : createRegularIcon(leafletLoaded)) : undefined;
              
              return (
                <Marker
                  key={roofer.id}
                  position={[roofer.coordinates.lat, roofer.coordinates.lng]}
                  icon={icon}
                >
                  <Popup>
                    <div className="p-2 min-w-[250px]">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-rif-black pr-2">
                          {roofer.name}
                        </h3>
                        {roofer.isPreferred && (
                          <div className="flex flex-col gap-1 items-end">
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded text-xs font-bold whitespace-nowrap shadow-sm border border-yellow-300">
                              <FontAwesomeIcon icon={faCertificate} className="h-3 w-3" />
                              Preferred
                            </div>
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-rif-blue-500 to-rif-blue-600 text-white rounded text-xs font-bold whitespace-nowrap shadow-sm border border-rif-blue-700">
                              <FontAwesomeIcon icon={faCertificate} className="h-3 w-3" />
                              Certified RIF Roofer
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* 4-Star Rating for Preferred Roofers */}
                      {roofer.isPreferred && (
                        <div className="mb-3 p-2 bg-gradient-to-r from-yellow-50 to-blue-50 rounded-lg border border-yellow-200">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                              <FontAwesomeIcon icon={faStar} className="h-4 w-4 text-yellow-400" />
                              <FontAwesomeIcon icon={faStar} className="h-4 w-4 text-yellow-400" />
                              <FontAwesomeIcon icon={faStar} className="h-4 w-4 text-yellow-400" />
                              <FontAwesomeIcon icon={faStar} className="h-4 w-4 text-yellow-400" />
                              <FontAwesomeIcon icon={faStar} className="h-4 w-4 text-gray-300" />
                            </div>
                            <span className="text-sm font-bold text-gray-800">4.0</span>
                            <span className="text-xs font-semibold text-gray-700 bg-yellow-100 px-1.5 py-0.5 rounded">Best Choice</span>
                          </div>
                        </div>
                      )}
                      
                      {(roofer.address || roofer.city) && (
                        <div className="mb-2 text-sm text-gray-600">
                          <FontAwesomeIcon icon={faMapLocationDot} className="h-3 w-3 mr-1 text-rif-blue-500" />
                          {[roofer.address, roofer.city, roofer.state, roofer.zipCode]
                            .filter(Boolean)
                            .join(', ')}
                        </div>
                      )}
                      
                      {roofer.phone && (
                        <div className="mb-2 text-sm">
                          <FontAwesomeIcon icon={faPhone} className="h-3 w-3 mr-1 text-rif-blue-500" />
                          <a
                            href={`tel:${roofer.phone}`}
                            className="text-rif-blue-600 hover:text-rif-blue-700 hover:underline"
                          >
                            {roofer.phone}
                          </a>
                        </div>
                      )}
                      
                      {roofer.websiteUrl && (
                        <div className="mb-2 text-sm">
                          <FontAwesomeIcon icon={faGlobe} className="h-3 w-3 mr-1 text-rif-blue-500" />
                          <a
                            href={roofer.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-rif-blue-600 hover:text-rif-blue-700 hover:underline"
                          >
                            Visit Website
                            <FontAwesomeIcon icon={faExternalLink} className="h-2 w-2 ml-1" />
                          </a>
                        </div>
                      )}
                      
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <Link
                          href={`/roofers/${roofer.slug}`}
                          className="inline-flex items-center gap-1 text-sm text-rif-blue-600 hover:text-rif-blue-700 font-medium"
                        >
                          View Full Profile
                          <FontAwesomeIcon icon={faExternalLink} className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        )}
        
        {/* Loading indicator overlay when geocoding is in progress */}
        {mapReady && geocodingProgress.current < geocodingProgress.total && showIndividualMarkers && (
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200 z-[1000]">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faSpinner}
                className="h-4 w-4 text-rif-blue-500 animate-spin"
              />
              <span className="text-sm text-gray-700">
                Loading markers... {geocodingProgress.current} / {geocodingProgress.total}
              </span>
            </div>
          </div>
        )}
        
        {/* Location filter indicator */}
        {selectedLocation && (
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200 z-[1000]">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 text-rif-blue-500" />
              <span className="text-sm text-gray-700">
                Showing: <strong>{selectedLocation.name}</strong>
                <span className="text-gray-500 ml-1">
                  ({selectedLocation.type === 'region' ? 'Region' : selectedLocation.type === 'county' ? 'County' : 'City'})
                </span>
              </span>
              <button
                onClick={() => {
                  setSelectedLocation(null);
                  setSearchQuery('');
                  setSelectedCounty(null);
                }}
                className="text-rif-blue-500 hover:text-rif-blue-600 text-sm font-medium ml-2"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Footer Info */}
      <section className="py-6 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-600 text-center">
            Map data © OpenStreetMap contributors. Roofer locations are approximate based on
            address geocoding.
          </p>
        </div>
      </section>
    </div>
  );
}

export default function RoofersMapPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 text-rif-blue-500 animate-spin mb-4" />
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    }>
      <RoofersMapPageContent />
    </Suspense>
  );
}
