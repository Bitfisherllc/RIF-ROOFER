'use client';

import { useEffect, useState, useMemo, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapLocationDot,
  faArrowLeft,
  faSpinner,
  faCertificate,
  faPhone,
  faGlobe,
  faExternalLink,
  faTimes,
  faFilter,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { getAllRoofers, type RooferData } from '../data/roofers';
import { batchGeocode, type Coordinates } from '@/lib/geocoding';
import { getCountyCoordinates } from '@/lib/county-coordinates';
import { getRegionCoordinates } from '@/lib/region-coordinates';
import { getRooferFastCoordinates, getFastCoordinates } from '@/lib/fast-coordinates';
import { searchData } from '@/app/service-areas/data/search-data';
import { getCitiesForCounty, createCitySlug } from '@/app/service-areas/data/cities';

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

interface RegionGroup {
  regionSlug: string;
  regionName: string;
  coordinates: Coordinates;
  rooferCount: number;
  roofers: RooferData[];
  preferredCount: number;
}

interface CountyGroup {
  countySlug: string;
  countyName: string;
  coordinates: Coordinates;
  rooferCount: number;
  roofers: RooferData[];
  preferredCount: number;
  regionSlug?: string;
}

interface CityGroup {
  cityName: string;
  citySlug: string;
  coordinates: Coordinates;
  rooferCount: number;
  roofers: RooferData[];
  preferredCount: number;
  countyName?: string;
  countySlug?: string;
  regionSlug?: string;
}

// Component to handle map zooming when region, county, or city is selected
// This must be a child of MapContainer to use useMap
function MapZoomHandler({ 
  selectedRegion,
  selectedCounty, 
  selectedCity,
  regionGroups,
  countyGroups,
  cityGroups,
  mapRef,
  roofersWithCoords
}: { 
  selectedRegion: string | null;
  selectedCounty: string | null;
  selectedCity: string | null;
  regionGroups: RegionGroup[];
  countyGroups: CountyGroup[];
  cityGroups: CityGroup[];
  mapRef: React.MutableRefObject<any>;
  roofersWithCoords?: RooferWithCoordinates[];
}) {
  const [useMapHook, setUseMapHook] = useState<any>(null);
  
  // Load useMap hook dynamically
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('react-leaflet').then((mod) => {
        setUseMapHook(() => mod.useMap);
      });
    }
  }, []);
  
  if (!useMapHook) return null;
  
  const ZoomHandlerComponent = () => {
    const map = useMapHook();
    
    // Store map in ref for parent component
    useEffect(() => {
      if (map) {
        mapRef.current = map;
      }
    }, [map, mapRef]);
    
    useEffect(() => {
      if (!map) return;
      
      // Skip this effect if we're in city view - let the city zoom effect handle it
      if (selectedCounty && !selectedCity) {
        return;
      }
      
      // Use a timeout to ensure counties are filtered
      const timeoutId = setTimeout(() => {
        try {
          // If region is selected (but no county), zoom to show all counties in that region
          if (selectedRegion && !selectedCounty && countyGroups.length > 0) {
            // Filter counties for this region
            const regionCounties = countyGroups.filter(c => c.regionSlug === selectedRegion);
            
            // If we have counties for this region, fit bounds to show all of them
            if (regionCounties.length > 0) {
              // Get Leaflet from window
              const L = (window as any).L;
              
              if (L && L.latLngBounds) {
                // Use Leaflet's LatLngBounds for accurate bounds calculation
                const bounds = L.latLngBounds(
                  regionCounties.map(c => L.latLng(c.coordinates.lat, c.coordinates.lng))
                );
                
                // Expand bounds by 40% to ensure all counties are visible with space around
                const sw = bounds.getSouthWest();
                const ne = bounds.getNorthEast();
                const latCenter = (sw.lat + ne.lat) / 2;
                const lngCenter = (sw.lng + ne.lng) / 2;
                const latRange = ne.lat - sw.lat;
                const lngRange = ne.lng - sw.lng;
                
                const expandedBounds = L.latLngBounds(
                  L.latLng(latCenter - latRange * 0.7, lngCenter - lngRange * 0.7),
                  L.latLng(latCenter + latRange * 0.7, lngCenter + lngRange * 0.7)
                );
                
                // Fit bounds with generous padding and lower maxZoom
                map.fitBounds(expandedBounds, {
                  padding: [150, 150], // Increased padding for more space
                  maxZoom: 8 // Lower maxZoom to prevent zooming in too far
                });
              } else {
                // Fallback: manual bounds calculation with larger buffer
                const lats = regionCounties.map(c => c.coordinates.lat);
                const lngs = regionCounties.map(c => c.coordinates.lng);
                
                // Add larger buffer (40% on each side, minimum 0.3 degrees) for better visibility
                const latRange = Math.max(...lats) - Math.min(...lats);
                const lngRange = Math.max(...lngs) - Math.min(...lngs);
                const latBuffer = Math.max(latRange * 0.4, 0.3); // Increased buffer
                const lngBuffer = Math.max(lngRange * 0.4, 0.3); // Increased buffer
                
                const bounds = [
                  [Math.min(...lats) - latBuffer, Math.min(...lngs) - lngBuffer],
                  [Math.max(...lats) + latBuffer, Math.max(...lngs) + lngBuffer]
                ] as [[number, number], [number, number]];
                
                map.fitBounds(bounds, {
                  padding: [150, 150], // Increased padding
                  maxZoom: 8 // Lower maxZoom
                });
              }
            }
          }
          
        } catch (error) {
          console.error('Error updating map view:', error);
        }
      }, 300); // Wait for counties to be filtered
      
      return () => clearTimeout(timeoutId);
    }, [map, selectedRegion, selectedCounty, selectedCity, countyGroups]);
    
    // Separate effect for city zoom - triggers when cities are loaded (zoomed in closer than county zoom)
    useEffect(() => {
      if (!map || !selectedCounty || selectedCity) return;
      
      // Only zoom if we have cities for this county
      if (!cityGroups || cityGroups.length === 0) {
        return; // Wait for cities to load
      }
      
      const countyCities = cityGroups.filter(c => c.countySlug === selectedCounty);
      
      if (countyCities.length === 0) {
        return; // No cities for this county
      }
      
      // Use a timeout to ensure cities are filtered
      const timeoutId = setTimeout(() => {
        try {
          // Get Leaflet from window
          const L = (window as any).L;
          
          if (L && L.latLngBounds) {
            // Use Leaflet's LatLngBounds for accurate bounds calculation
            const bounds = L.latLngBounds(
              countyCities.map(c => L.latLng(c.coordinates.lat, c.coordinates.lng))
            );
            
            // Expand bounds by only 10% to zoom in closer and show only the city area
            const sw = bounds.getSouthWest();
            const ne = bounds.getNorthEast();
            const latCenter = (sw.lat + ne.lat) / 2;
            const lngCenter = (sw.lng + ne.lng) / 2;
            const latRange = ne.lat - sw.lat;
            const lngRange = ne.lng - sw.lng;
            
            // Add minimum range to prevent zooming in too close
            const minLatRange = 0.08; // ~8.8 km
            const minLngRange = 0.08;
            const finalLatRange = Math.max(latRange, minLatRange);
            const finalLngRange = Math.max(lngRange, minLngRange);
            
            const expandedBounds = L.latLngBounds(
              L.latLng(latCenter - finalLatRange * 0.55, lngCenter - finalLngRange * 0.55),
              L.latLng(latCenter + finalLatRange * 0.55, lngCenter + finalLngRange * 0.55)
            );
            
            // Fit bounds with minimal padding to zoom in closer and show only city area
            map.fitBounds(expandedBounds, {
              padding: [50, 50], // Minimal padding to show only city area
              maxZoom: 10 // Higher maxZoom to allow closer zoom
            });
          } else {
            // Fallback: manual bounds calculation with smaller buffer
            const lats = countyCities.map(c => c.coordinates.lat);
            const lngs = countyCities.map(c => c.coordinates.lng);
            
            // Add smaller buffer (10% on each side, minimum 0.08 degrees) to zoom in closer
            const latRange = Math.max(...lats) - Math.min(...lats);
            const lngRange = Math.max(...lngs) - Math.min(...lngs);
            const latBuffer = Math.max(latRange * 0.1, 0.08);
            const lngBuffer = Math.max(lngRange * 0.1, 0.08);
            
            const bounds = [
              [Math.min(...lats) - latBuffer, Math.min(...lngs) - lngBuffer],
              [Math.max(...lats) + latBuffer, Math.max(...lngs) + lngBuffer]
            ] as [[number, number], [number, number]];
            
            map.fitBounds(bounds, {
              padding: [50, 50], // Minimal padding to show only city area
              maxZoom: 10 // Higher maxZoom to allow closer zoom
            });
          }
        } catch (error) {
          console.error('Error zooming to cities:', error);
        }
      }, 300); // Wait for cities to be filtered
      
      return () => clearTimeout(timeoutId);
    }, [map, selectedCounty, selectedCity, cityGroups]);
    
    return null;
  };
  
  return <ZoomHandlerComponent />;
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
  const router = useRouter();
  const [roofers, setRoofers] = useState<RooferWithCoordinates[]>([]);
  const [loading, setLoading] = useState(true);
  const [geocodingProgress, setGeocodingProgress] = useState({ current: 0, total: 0 });
  const [mapReady, setMapReady] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState<any>(null);
  const [regionGroups, setRegionGroups] = useState<RegionGroup[]>([]);
  const [countyGroups, setCountyGroups] = useState<CountyGroup[]>([]);
  const [cityGroups, setCityGroups] = useState<CityGroup[]>([]);
  const [showIndividualMarkers, setShowIndividualMarkers] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
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
  const [rooferFilter, setRooferFilter] = useState<'all' | 'preferred'>('all');
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
        if (leaflet && typeof leaflet.divIcon === 'function') {
          setLeafletLoaded(leaflet);
        } else {
          console.error('Leaflet loaded but divIcon function not found');
        }
      }).catch((err) => {
        console.error('Failed to load Leaflet:', err);
        // Set a flag so we can show an error message
        setLeafletLoaded(false);
      });
    }
  }, []);

  // Load regions and counties immediately (no geocoding needed)
  useEffect(() => {
    const loadRegionsAndCounties = () => {
      try {
        const allRoofers = getAllRoofers();
        
        // Group roofers by region
        const regionMap = new Map<string, { roofers: RooferData[]; regionName: string }>();
        
        // Group roofers by county (for when region is selected)
        const countyMap = new Map<string, { roofers: RooferData[]; countyName: string; regionSlug: string }>();
        
        allRoofers.forEach((roofer) => {
          const regions = roofer.serviceAreas?.regions || [];
          const counties = roofer.serviceAreas?.counties || [];
          
          // Add to region groups
          regions.forEach((regionSlug) => {
            const regionData = searchData.find(
              (item) => item.type === 'region' && item.slug === regionSlug
            );
            const regionName = regionData?.name || regionSlug;
            
            if (!regionMap.has(regionSlug)) {
              regionMap.set(regionSlug, { roofers: [], regionName });
            }
            regionMap.get(regionSlug)!.roofers.push(roofer);
          });
          
          // Add to county groups
          counties.forEach((countySlug) => {
            const countyData = searchData.find(
              (item) => item.type === 'county' && item.slug === countySlug
            );
            const countyName = countyData?.name.replace(' County', '') || countySlug;
            const regionSlug = countyData?.region 
              ? searchData.find((item) => item.type === 'region' && item.name === countyData.region)?.slug || ''
              : '';
            
            if (!countyMap.has(countySlug)) {
              countyMap.set(countySlug, { roofers: [], countyName, regionSlug });
            }
            countyMap.get(countySlug)!.roofers.push(roofer);
          });
        });
        
        // Create region groups with coordinates
        const regionGroupsList: RegionGroup[] = [];
        regionMap.forEach(({ roofers, regionName }, regionSlug) => {
          const coords = getRegionCoordinates(regionSlug);
          if (coords) {
            regionGroupsList.push({
              regionSlug,
              regionName,
              coordinates: coords,
              rooferCount: roofers.length,
              roofers,
              preferredCount: roofers.filter((r) => r.isPreferred).length,
            });
          }
        });
        
        // Create county groups with coordinates
        const countyGroupsList: CountyGroup[] = [];
        countyMap.forEach(({ roofers, countyName, regionSlug }, countySlug) => {
          const coords = getCountyCoordinates(countySlug);
          if (coords) {
            countyGroupsList.push({
              countySlug,
              countyName,
              coordinates: coords,
              rooferCount: roofers.length,
              roofers,
              preferredCount: roofers.filter((r) => r.isPreferred).length,
              regionSlug,
            });
          }
        });
        
        setRegionGroups(regionGroupsList);
        setCountyGroups(countyGroupsList);
        // Always set mapReady to true, even if no regions/counties found
        // The map should still display
        setMapReady(true);
        setLoading(false);
        
        // Log if no regions/counties were found
        if (regionGroupsList.length === 0 && countyGroupsList.length === 0) {
          console.warn('No regions or counties found with coordinates. Map will display but may be empty.');
        }
      } catch (error) {
        console.error('Error loading regions and counties:', error);
        // Still set mapReady to true so map can display even if there are grouping issues
        setMapReady(true);
        setLoading(false);
      }
    };

    loadRegionsAndCounties();
  }, []);

  // Load initial state from URL params or sessionStorage (for return from city page)
  useEffect(() => {
    // Check sessionStorage first (for return navigation from city page)
    if (typeof window !== 'undefined') {
      const savedMapState = sessionStorage.getItem('mapState');
      if (savedMapState) {
        try {
          const mapState = JSON.parse(savedMapState);
          // Restore the map state (region and county) to show cities again
          if (mapState.region) {
            setSelectedRegion(mapState.region);
          }
          if (mapState.county) {
            setSelectedCounty(mapState.county);
            // Don't set city - we want to show all cities in the county
            setSelectedCity(null);
          }
          // Clear after using
          sessionStorage.removeItem('mapState');
          // Don't check URL params if we restored from sessionStorage
          return;
        } catch (e) {
          console.error('Error parsing saved map state:', e);
        }
      }
    }
    
    // Then check URL params (only if no sessionStorage state)
    const countyParam = searchParams.get('county');
    const cityParam = searchParams.get('city');
    
    if (countyParam && countyGroups.length > 0) {
      // Verify the county exists in our data
      const countyExists = countyGroups.some(g => g.countySlug === countyParam);
      if (countyExists) {
        setSelectedCounty(countyParam);
        setShowIndividualMarkers(false); // Show cities, not individual roofers
        
        // If city is also specified, we don't select it - user should click on the city marker
        // This allows them to see all cities and choose which one to view
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
          // Geocode all roofers (or filtered if preferred filter is active)
          if (rooferFilter === 'preferred') {
            roofersToGeocode = allRoofers.filter((r) => r.isPreferred);
          } else {
            roofersToGeocode = allRoofers;
          }
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
  }, [showIndividualMarkers, selectedRegion, selectedCounty, selectedCity, rooferFilter, roofers]);

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
    }
    
    return filtered;
  }, [roofers, selectedLocation, rooferFilter]);

  // Filter region groups based on roofer type
  const filteredRegionGroups = useMemo(() => {
    let filtered = regionGroups;
    
    // Filter by roofer type - recalculate counts
    if (rooferFilter === 'preferred') {
      filtered = filtered.map((group) => {
        const filteredRoofers = group.roofers.filter((r) => r.isPreferred);
        
        return {
          ...group,
          rooferCount: filteredRoofers.length,
          preferredCount: filteredRoofers.filter((r) => r.isPreferred).length,
          roofers: filteredRoofers,
        };
      }).filter((group) => group.rooferCount > 0);
    }
    
    return filtered;
  }, [regionGroups, rooferFilter]);

  // Filter county groups based on selected region and roofer type
  const filteredCountyGroups = useMemo(() => {
    let filtered = countyGroups;
    
    // Filter by selected region
    if (selectedRegion) {
      filtered = filtered.filter((group) => 
        group.regionSlug === selectedRegion
      );
    }
    
    // Filter by location if selected (for search)
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
    if (rooferFilter === 'preferred') {
      filtered = filtered.map((group) => {
        const filteredRoofers = group.roofers.filter((r) => r.isPreferred);
        
        return {
          ...group,
          rooferCount: filteredRoofers.length,
          preferredCount: filteredRoofers.filter((r) => r.isPreferred).length,
          roofers: filteredRoofers,
        };
      }).filter((group) => group.rooferCount > 0);
    }
    
    return filtered;
  }, [countyGroups, selectedRegion, selectedLocation, rooferFilter]);

  // Filter city groups based on selected county and roofer type
  const filteredCityGroups = useMemo(() => {
    if (!selectedCounty) return [];
    
    let filtered = cityGroups.filter((group) => group.countySlug === selectedCounty);
    
    // Filter by roofer type - recalculate counts
    if (rooferFilter === 'preferred') {
      filtered = filtered.map((group) => {
        const filteredRoofers = group.roofers.filter((r) => r.isPreferred);
        
        return {
          ...group,
          rooferCount: filteredRoofers.length,
          preferredCount: filteredRoofers.filter((r) => r.isPreferred).length,
          roofers: filteredRoofers,
        };
      }).filter((group) => group.rooferCount > 0);
    }
    
    return filtered;
  }, [cityGroups, selectedCounty, rooferFilter]);

  // Filter roofers with valid coordinates (using filtered list)
  // When a city is selected, show roofers from that city
  // When a county is selected, show roofers from that county that have coordinates
  const roofersWithCoords = useMemo(() => {
    if (selectedCity) {
      // When city is selected, filter by city
      const citySlug = selectedCity;
      return filteredRoofers.filter((roofer) => {
        if (!roofer.coordinates) return false;
        // Check if roofer serves this city explicitly or if roofer's city matches
        const servesCity = roofer.serviceAreas?.cities?.includes(citySlug);
        const rooferCitySlug = roofer.city ? createCitySlug(roofer.city) : '';
        const cityMatches = rooferCitySlug === citySlug;
        return servesCity || cityMatches;
      });
    } else if (selectedCounty) {
      // When county is selected, filter from the filteredRoofers (which already has the preferred filter applied)
      return filteredRoofers.filter((roofer) => {
        if (!roofer.coordinates) return false;
        return (roofer.serviceAreas?.counties?.includes(selectedCounty) ?? false);
      });
    }
    // When no county/city selected, only show roofers with coordinates
    return filteredRoofers.filter((roofer) => roofer.coordinates);
  }, [filteredRoofers, selectedCounty, selectedCity]);

  // Offset markers that are too close together
  // This function calculates offsets to separate markers that are within a certain distance
  const offsetMarkers = useMemo(() => {
    if (!leafletLoaded) return new Map();
    
    const offsetMap = new Map<string, { lat: number; lng: number; tooltipOffset: [number, number] }>();
    const MIN_DISTANCE_KM = 0.005; // Minimum distance in kilometers (about 5 meters)
    const OFFSET_DISTANCE_KM = 0.015; // Offset distance in kilometers (about 15 meters)
    
    // Calculate distance between two coordinates in kilometers
    const distance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
      const R = 6371; // Earth's radius in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLng = (lng2 - lng1) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };
    
    // Convert km offset to lat/lng offset
    const kmToLat = (km: number) => km / 111; // 1 degree lat ≈ 111 km
    const kmToLng = (km: number, lat: number) => km / (111 * Math.cos(lat * Math.PI / 180));
    
    const roofers = roofersWithCoords.filter((r): r is typeof r & { coordinates: NonNullable<typeof r.coordinates> } => {
      if (!r.coordinates) return false;
      if (selectedCounty) {
        return (r.serviceAreas?.counties?.includes(selectedCounty) ?? false);
      }
      return true;
    });
    
    // Group roofers by proximity and calculate offsets
    for (let i = 0; i < roofers.length; i++) {
      const roofer1 = roofers[i];
      if (!roofer1.coordinates) continue;
      
      let offsetLat = 0;
      let offsetLng = 0;
      let offsetCount = 0;
      const closeMarkers: Array<{ lat: number; lng: number }> = [];
      
      // Check distance to all other roofers
      for (let j = 0; j < roofers.length; j++) {
        if (i === j) continue;
        const roofer2 = roofers[j];
        if (!roofer2.coordinates) continue;
        
        const dist = distance(
          roofer1.coordinates.lat,
          roofer1.coordinates.lng,
          roofer2.coordinates.lat,
          roofer2.coordinates.lng
        );
        
        if (dist < MIN_DISTANCE_KM) {
          // Markers are too close
          closeMarkers.push({ lat: roofer2.coordinates.lat, lng: roofer2.coordinates.lng });
          offsetCount++;
          
          // Calculate angle and offset in opposite direction
          const angle = Math.atan2(
            roofer2.coordinates.lat - roofer1.coordinates.lat,
            roofer2.coordinates.lng - roofer1.coordinates.lng
          );
          
          // Offset in opposite direction
          offsetLat += Math.sin(angle + Math.PI) * OFFSET_DISTANCE_KM;
          offsetLng += Math.cos(angle + Math.PI) * OFFSET_DISTANCE_KM;
        }
      }
      
      // Calculate final offset position
      let finalLat = roofer1.coordinates.lat;
      let finalLng = roofer1.coordinates.lng;
      let tooltipOffset: [number, number] = [0, -10];
      
      if (offsetCount > 0) {
        // Average the offsets and convert to lat/lng
        offsetLat = (offsetLat / offsetCount) * kmToLat(1);
        offsetLng = (offsetLng / offsetCount) * kmToLng(1, roofer1.coordinates.lat);
        
        finalLat = roofer1.coordinates.lat + offsetLat;
        finalLng = roofer1.coordinates.lng + offsetLng;
        
        // Adjust tooltip offset to prevent overlap
        tooltipOffset = [
          Math.round(offsetLng * 100000), // Convert to approximate pixels
          -10 - Math.round(Math.abs(offsetLat) * 100000)
        ];
      } else {
        // No offset needed, but vary tooltip position to reduce overlap
        const positions: [number, number][] = [
          [0, -10],
          [25, -10],
          [-25, -10],
          [0, -30],
          [20, -30],
          [-20, -30]
        ];
        tooltipOffset = positions[i % positions.length];
      }
      
      offsetMap.set(roofer1.id, {
        lat: finalLat,
        lng: finalLng,
        tooltipOffset
      });
    }
    
    return offsetMap;
  }, [roofersWithCoords, selectedCounty, leafletLoaded]);

  // Load city groups when a county is selected
  useEffect(() => {
    if (!selectedCounty || !selectedRegion) {
      setCityGroups([]);
      return;
    }

    try {
      const allRoofers = getAllRoofers();
      
      // Get all cities from static data (same as county page uses)
      const allCities = getCitiesForCounty(selectedRegion, selectedCounty);
      
      // Create city groups with roofer counts - same logic as county page
      const cityGroupsList: CityGroup[] = allCities
        .map(city => {
          const citySlug = createCitySlug(city.name);
          
          // Find roofers that serve this city (same logic as county page)
          const cityRoofers = allRoofers.filter(roofer => {
            // Only count roofers who explicitly serve this city
            return roofer.serviceAreas?.cities?.includes(citySlug);
          });
          
          // Only include cities that have at least one roofer
          if (cityRoofers.length === 0) {
            return null;
          }
          
          // Get coordinates for the city
          let coords: Coordinates | null = null;
          if (city.latitude && city.longitude) {
            coords = { lat: city.latitude, lng: city.longitude };
          } else {
            // Use fast coordinates (city name lookup)
            coords = getFastCoordinates(city.name, selectedCounty);
          }
          
          if (!coords) {
            return null; // Skip cities without coordinates
          }
          
          return {
            cityName: city.displayName || city.name,
            citySlug: citySlug,
            coordinates: coords,
            rooferCount: cityRoofers.length,
            roofers: cityRoofers,
            preferredCount: cityRoofers.filter(r => r.isPreferred).length,
            countyName: city.countyName,
            countySlug: selectedCounty,
            regionSlug: selectedRegion,
          };
        })
        .filter((group): group is NonNullable<typeof group> => group !== null) as CityGroup[];
      
      setCityGroups(cityGroupsList);
    } catch (error) {
      console.error('Error loading city groups:', error);
      setCityGroups([]);
    }
  }, [selectedCounty, selectedRegion]);

  // Determine which level we're at
  const mapLevel = useMemo(() => {
    if (!selectedRegion && !selectedCounty) {
      return 'regions'; // Level 1: Regions
    }
    if (selectedRegion && !selectedCounty) {
      return 'counties'; // Level 2: Counties (within selected region)
    }
    if (selectedCounty && !selectedCity) {
      return 'cities'; // Level 3: Cities (within selected county)
    }
    // When a city is selected, stay at city level (don't show individual roofer markers)
    if (selectedCounty && selectedCity) {
      return 'cities'; // Stay at city level, show list below map instead
    }
    return 'regions';
  }, [selectedRegion, selectedCounty, selectedCity]);

  // Calculate map bounds to fit all markers (counties, cities, or individual roofers)
  const mapBounds = useMemo(() => {
    // When "Preferred Contractors" is active, fit bounds to preferred roofer markers
    if (rooferFilter === 'preferred' && roofersWithCoords.length > 0) {
      const visibleRoofers = roofersWithCoords.filter((r): r is typeof r & { coordinates: NonNullable<typeof r.coordinates> } => !!r.coordinates);
      if (visibleRoofers.length === 0) return null;

      const positions = visibleRoofers.map((r) => {
        const offset = offsetMarkers.get(r.id);
        return offset
          ? [offset.lat, offset.lng] as [number, number]
          : [r.coordinates.lat, r.coordinates.lng] as [number, number];
      });
      const lats = positions.map((p) => p[0]);
      const lngs = positions.map((p) => p[1]);
      const latRange = Math.max(...lats) - Math.min(...lats);
      const lngRange = Math.max(...lngs) - Math.min(...lngs);
      const minRange = 0.02;
      let minLat = Math.min(...lats);
      let maxLat = Math.max(...lats);
      let minLng = Math.min(...lngs);
      let maxLng = Math.max(...lngs);
      if (latRange < minRange) {
        const centerLat = (minLat + maxLat) / 2;
        minLat = centerLat - minRange / 2;
        maxLat = centerLat + minRange / 2;
      }
      if (lngRange < minRange) {
        const centerLng = (minLng + maxLng) / 2;
        minLng = centerLng - minRange / 2;
        maxLng = centerLng + minRange / 2;
      }
      return [
        [minLat, minLng],
        [maxLat, maxLng],
      ] as [[number, number], [number, number]];
    }
    if (mapLevel === 'cities' && filteredCityGroups.length > 0) {
      const lats = filteredCityGroups.map((g) => g.coordinates.lat);
      const lngs = filteredCityGroups.map((g) => g.coordinates.lng);
      
      if (lats.length === 0) return null;
      
      return [
        [Math.min(...lats), Math.min(...lngs)],
        [Math.max(...lats), Math.max(...lngs)]
      ] as [[number, number], [number, number]];
    } else if (mapLevel === 'counties' && filteredCountyGroups.length > 0) {
      const lats = filteredCountyGroups.map((g) => g.coordinates.lat);
      const lngs = filteredCountyGroups.map((g) => g.coordinates.lng);
      
      return [
        [Math.min(...lats), Math.min(...lngs)],
        [Math.max(...lats), Math.max(...lngs)],
      ] as [[number, number], [number, number]];
    } else if (mapLevel === 'regions' && filteredRegionGroups.length > 0) {
      const lats = filteredRegionGroups.map((g) => g.coordinates.lat);
      const lngs = filteredRegionGroups.map((g) => g.coordinates.lng);
      
      return [
        [Math.min(...lats), Math.min(...lngs)],
        [Math.max(...lats), Math.max(...lngs)],
      ] as [[number, number], [number, number]];
    }
    return null;
  }, [rooferFilter, roofersWithCoords, filteredCityGroups, filteredCountyGroups, filteredRegionGroups, mapLevel, selectedCounty, offsetMarkers]);

  // Update map bounds when filter changes or markers update
  useEffect(() => {
    if (!mapRef.current || !mapBounds) return;
    
    const map = mapRef.current;
    if (!map || !map.getContainer || !map.getContainer() || !map.fitBounds) return;
    
    // Wait for map to be fully initialized
    const timeoutId = setTimeout(() => {
      try {
        const lats = mapBounds[0][0] === mapBounds[1][0] ? undefined : mapBounds.map(b => b[0]);
        const lngs = mapBounds[0][1] === mapBounds[1][1] ? undefined : mapBounds.map(b => b[1]);
        
        if (lats && lngs && lats.length > 0 && lngs.length > 0 && map.fitBounds) {
          // When showing individual roofers (Preferred Contractors), use more padding and zoom
          const isRooferLevel = rooferFilter === 'preferred';
          const padding = isRooferLevel ? [100, 100] : [50, 50]; // More padding for roofer level
          
          map.fitBounds(mapBounds, {
            padding,
            animate: true,
            duration: 0.5,
            maxZoom: isRooferLevel ? 16 : undefined // Allow higher zoom for roofer level
          });
          
          // If we're at roofer level and bounds are very small, ensure minimum zoom
          if (isRooferLevel) {
            setTimeout(() => {
              const currentZoom = map.getZoom();
              // If zoom is too low (less than 13), set a minimum zoom to see separation
              if (currentZoom < 13) {
                const centerLat = (mapBounds[0][0] + mapBounds[1][0]) / 2;
                const centerLng = (mapBounds[0][1] + mapBounds[1][1]) / 2;
                map.setView([centerLat, centerLng], 13, {
                  animate: true,
                  duration: 0.5
                });
              }
            }, 800);
          }
        }
      } catch (error) {
        console.error('Error fitting map bounds:', error);
      }
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [mapBounds, rooferFilter, selectedRegion, selectedCounty, selectedCity, mapLevel, mapRef]);
  
  // Create region marker icon with count (using RIF blue colors)
  const createRegionIcon = (count: number, preferredCount: number) => {
    if (!leafletLoaded) return undefined;
    const size = Math.max(50, 42 + count.toString().length * 4);
    return leafletLoaded.divIcon({
      className: 'region-marker',
      html: `<div style="
        background: ${preferredCount > 0 
          ? 'linear-gradient(135deg, #1e4a87 0%, #173764 100%)' 
          : 'linear-gradient(135deg, #255eab 0%, #1e4a87 100%)'};
        color: white;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 4px solid white;
        box-shadow: 0 4px 16px rgba(37, 94, 171, 0.5), 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 16px;
        text-align: center;
        line-height: 1.1;
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', system-ui, sans-serif;
      ">
        <div style="font-size: 18px; line-height: 1;">${count}</div>
        ${preferredCount > 0 ? `<div style="font-size: 10px; opacity: 0.95; margin-top: 2px; font-weight: 600;">${preferredCount}★</div>` : ''}
      </div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

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

  // Create city marker icon with count (smaller than county, using lighter blue)
  const createCityIcon = (count: number, preferredCount: number) => {
    if (!leafletLoaded) return undefined;
    const size = Math.max(36, 28 + count.toString().length * 3);
    return leafletLoaded.divIcon({
      className: 'city-marker',
      html: `<div style="
        background: ${preferredCount > 0 
          ? 'linear-gradient(135deg, #4a7bc0 0%, #255eab 100%)' 
          : 'linear-gradient(135deg, #66a2d5 0%, #4a7bc0 100%)'};
        color: white;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 8px rgba(37, 94, 171, 0.3), 0 1px 2px rgba(0,0,0,0.15);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        text-align: center;
        line-height: 1.1;
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', system-ui, sans-serif;
      ">
        <div style="font-size: 14px; line-height: 1;">${count}</div>
        ${preferredCount > 0 ? `<div style="font-size: 8px; opacity: 0.9; margin-top: 1px; font-weight: 600;">${preferredCount}★</div>` : ''}
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
          
          {/* Filter Buttons and Stats */}
          <div className="mt-6 space-y-4">
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
                  onClick={() => {
                    setRooferFilter('preferred');
                    // Automatically show individual markers when filtering by preferred
                    if (!showIndividualMarkers) {
                      setShowIndividualMarkers(true);
                    }
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    rooferFilter === 'preferred'
                      ? 'bg-white text-rif-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FontAwesomeIcon icon={faCertificate} className="h-3.5 w-3.5" />
                  Preferred Contractors (Certified)
                </button>
              </div>
              
              {/* Stats */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-rif-blue-500 rounded-full"></div>
                  <span className="text-gray-700">
                    {selectedCity
                      ? (() => {
                          const cityGroup = cityGroups.find(c => c.citySlug === selectedCity);
                          return cityGroup ? `${cityGroup.rooferCount} Roofers in ${cityGroup.cityName}` : 'Roofers';
                        })()
                      : mapLevel === 'cities'
                      ? `${filteredCityGroups.length} Cities • ${filteredCityGroups.reduce((sum, g) => sum + g.rooferCount, 0)} Roofers`
                      : mapLevel === 'counties'
                      ? `${filteredCountyGroups.length} Counties • ${filteredCountyGroups.reduce((sum, g) => sum + g.rooferCount, 0)} Roofers`
                      : `${filteredRegionGroups.length} Regions • ${filteredRegionGroups.reduce((sum, g) => sum + g.rooferCount, 0)} Roofers`}
                  </span>
                </div>
                {(selectedCity
                  ? (() => {
                      const cityGroup = cityGroups.find(c => c.citySlug === selectedCity);
                      return cityGroup ? cityGroup.preferredCount > 0 : false;
                    })()
                  : mapLevel === 'cities' ? filteredCityGroups.reduce((sum, g) => sum + g.preferredCount, 0) > 0 :
                  mapLevel === 'counties' ? filteredCountyGroups.reduce((sum, g) => sum + g.preferredCount, 0) > 0 :
                  filteredRegionGroups.reduce((sum, g) => sum + g.preferredCount, 0) > 0) && (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-rif-blue-700 rounded-full"></div>
                    <span className="text-gray-700">
                      {selectedCity
                        ? (() => {
                            const cityGroup = cityGroups.find(c => c.citySlug === selectedCity);
                            return cityGroup ? cityGroup.preferredCount : 0;
                          })()
                        : mapLevel === 'cities'
                        ? filteredCityGroups.reduce((sum, g) => sum + g.preferredCount, 0)
                        : mapLevel === 'counties'
                        ? filteredCountyGroups.reduce((sum, g) => sum + g.preferredCount, 0)
                        : filteredRegionGroups.reduce((sum, g) => sum + g.preferredCount, 0)} Preferred
                    </span>
                  </div>
                )}
              </div>
              
              {/* Back Button - Show when not at region level */}
              {mapLevel !== 'regions' && (
                <button
                  onClick={() => {
                    if (mapLevel === 'cities') {
                      // Level 3 -> Level 2: Go back to counties view
                      setSelectedCounty(null);
                      setSelectedCity(null);
                      setShowIndividualMarkers(false);
                    } else if (mapLevel === 'counties') {
                      // Level 2 -> Level 1: Go back to regions view
                      setSelectedRegion(null);
                      setSelectedCounty(null);
                      setSelectedCity(null);
                      setShowIndividualMarkers(false);
                      setSelectedLocation(null);
                      setSearchQuery('');
                      // Reset map to show all regions
                      if (mapRef.current && mapRef.current.setView) {
                        try {
                          setTimeout(() => {
                            if (mapRef.current && mapRef.current.setView) {
                              mapRef.current.setView(
                                [floridaCenter.lat, floridaCenter.lng],
                                7,
                                { animate: true, duration: 0.5 }
                              );
                            }
                          }, 100);
                        } catch (error) {
                          console.error('Error resetting map view:', error);
                        }
                      }
                    }
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
                  {mapLevel === 'cities' ? 'Back to Counties' : 'Back to Regions'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Container */}
      <section className="relative bg-gradient-to-b from-gray-50 to-rif-blue-50" style={{ height: 'calc(100vh - 280px)', minHeight: '600px' }}>
        {!mapReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <FontAwesomeIcon
                icon={faSpinner}
                className="h-8 w-8 text-rif-blue-500 mb-3 animate-spin"
              />
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
        {mapReady && !leafletLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              {leafletLoaded === false ? (
                <>
                  <p className="text-red-600 mb-2 font-semibold">Failed to load map library</p>
                  <p className="text-gray-600 text-sm">Please refresh the page to try again.</p>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="h-8 w-8 text-rif-blue-500 mb-3 animate-spin"
                  />
                  <p className="text-gray-600">Initializing map library...</p>
                </>
              )}
            </div>
          </div>
        )}
        {mapReady && leafletLoaded && (
          <MapContainer
            center={[floridaCenter.lat, floridaCenter.lng]}
            zoom={7}
            bounds={mapLevel === 'cities' ? undefined : (mapBounds || undefined)}
            boundsOptions={{ padding: [50, 50] }}
            style={{ height: '100%', width: '100%', zIndex: 0 }}
            scrollWheelZoom={false}
            zoomControl={false}
            key={`map-${selectedRegion}-${selectedCounty}-${rooferFilter}`}
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
            
            {/* Map zoom handler for region/county selection */}
            <MapZoomHandler 
              selectedRegion={selectedRegion}
              selectedCounty={selectedCounty}
              selectedCity={selectedCity}
              regionGroups={filteredRegionGroups}
              countyGroups={filteredCountyGroups}
              cityGroups={filteredCityGroups}
              mapRef={mapRef}
              roofersWithCoords={roofersWithCoords}
            />
            
            {/* Level 1: Show region markers when no region is selected (hide when Preferred filter shows individual pins) */}
            {mapLevel === 'regions' && rooferFilter !== 'preferred' && leafletLoaded && filteredRegionGroups.map((group) => (
              <Marker
                key={`region-${group.regionSlug}`}
                position={[group.coordinates.lat, group.coordinates.lng]}
                icon={createRegionIcon(group.rooferCount, group.preferredCount)}
                eventHandlers={{
                  click: () => {
                    // Level 1 -> Level 2: Click region to show counties
                    setSelectedRegion(group.regionSlug);
                    setSelectedCounty(null);
                    setSelectedCity(null);
                    setShowIndividualMarkers(false);
                  },
                }}
              >
                <Tooltip permanent={false} direction="top" offset={[0, -10]}>
                  <div className="text-center">
                    <div className="font-semibold text-rif-black text-sm">
                      {group.regionName}
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5">
                      {group.rooferCount} {group.rooferCount === 1 ? 'Roofer' : 'Roofers'}
                    </div>
                  </div>
                </Tooltip>
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="text-lg font-semibold text-rif-black mb-2">
                      {group.regionName}
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
                        // Level 1 -> Level 2: Click region to show counties
                        setSelectedRegion(group.regionSlug);
                        setSelectedCounty(null);
                        setSelectedCity(null);
                        setShowIndividualMarkers(false);
                      }}
                      className="w-full px-3 py-1.5 bg-rif-blue-500 text-white rounded hover:bg-rif-blue-600 transition-colors text-sm font-medium"
                    >
                      View Counties
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
            
            {/* Level 2: Show county markers when region is selected (hide when Preferred filter) */}
            {mapLevel === 'counties' && rooferFilter !== 'preferred' && leafletLoaded && filteredCountyGroups.map((group) => {
              const regionSlug = group.regionSlug || selectedRegion;
              const countySlug = group.countySlug;
              const countyUrl = regionSlug && countySlug ? `/service-areas/${regionSlug}/${countySlug}` : null;

              return (
              <Marker
                key={`county-${group.countySlug}`}
                position={[group.coordinates.lat, group.coordinates.lng]}
                icon={createCountyIcon(group.rooferCount, group.preferredCount)}
                eventHandlers={{
                  click: () => {
                    if (countyUrl) {
                      window.location.href = countyUrl;
                    }
                  },
                }}
              >
                <Tooltip permanent={true} direction="top" offset={[0, -10]}>
                  <div className="text-center cursor-pointer">
                    <div className="font-semibold text-rif-black text-sm">
                      {group.countyName}
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5">
                      {group.rooferCount} {group.rooferCount === 1 ? 'Roofer' : 'Roofers'}
                    </div>
                    <div className="text-xs text-green-600 mt-1 font-medium">
                      Click to view →
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
                    {countyUrl && (
                      <a
                        href={countyUrl}
                        className="block w-full px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm font-medium text-center"
                      >
                        View {group.countyName} page
                      </a>
                    )}
                  </div>
                </Popup>
              </Marker>
              );
            })}
            
            {/* Level 3: Show city markers when county is selected */}
            {mapLevel === 'cities' && rooferFilter !== 'preferred' && leafletLoaded && filteredCityGroups.map((group) => {
              // Ensure we have region and county for navigation
              const region = group.regionSlug || selectedRegion;
              const county = group.countySlug || selectedCounty;
              const city = group.citySlug;
              
              return (
                <Marker
                  key={`city-${group.citySlug}`}
                  position={[group.coordinates.lat, group.coordinates.lng]}
                  icon={createCityIcon(group.rooferCount, group.preferredCount)}
                  eventHandlers={{
                    click: (e: any) => {
                      console.log('City marker clicked:', { 
                        citySlug: city, 
                        region: region, 
                        county: county,
                        groupRegionSlug: group.regionSlug,
                        groupCountySlug: group.countySlug,
                        selectedRegion,
                        selectedCounty
                      });
                      
                      // Navigate immediately on click
                      if (region && county && city) {
                        // Store current map state in sessionStorage for return navigation
                        if (typeof window !== 'undefined') {
                          sessionStorage.setItem('mapState', JSON.stringify({
                            region: region,
                            county: county
                          }));
                        }
                        
                        console.log('Navigating to:', `/service-areas/${region}/${county}/${city}`);
                        // Navigate to city page
                        window.location.href = `/service-areas/${region}/${county}/${city}`;
                      } else {
                        console.error('Missing required values for navigation:', { region, county, city });
                      }
                    },
                    mouseover: (e: any) => {
                      // Make cursor pointer on hover
                      const marker = e.target;
                      if (marker && marker.getElement) {
                        const element = marker.getElement();
                        if (element) {
                          element.style.cursor = 'pointer';
                        }
                      }
                    },
                  }}
                >
                  <Tooltip permanent={true} direction="top" offset={[0, -10]}>
                    <div className="text-center cursor-pointer">
                      <div className="font-semibold text-rif-black text-sm">
                        {group.cityName}
                      </div>
                      <div className="text-xs text-gray-600 mt-0.5">
                        {group.rooferCount} {group.rooferCount === 1 ? 'Roofer' : 'Roofers'}
                      </div>
                      <div className="text-xs text-green-600 mt-1 font-medium">
                        Click to view →
                      </div>
                    </div>
                  </Tooltip>
                </Marker>
              );
            })}
            
            {/* Level 4: Individual roofer markers — show when Preferred Contractors filter or after drilling to city/county */}
            {(showIndividualMarkers || rooferFilter === 'preferred') && leafletLoaded && roofersWithCoords
              .filter((roofer): roofer is typeof roofer & { coordinates: NonNullable<typeof roofer.coordinates> } => {
                // Filter by selected city or county
                if (!roofer.coordinates) return false;
                if (selectedCity) {
                  const citySlug = selectedCity;
                  const servesCity = roofer.serviceAreas?.cities?.includes(citySlug);
                  const rooferCitySlug = roofer.city ? createCitySlug(roofer.city) : '';
                  const cityMatches = rooferCitySlug === citySlug;
                  return servesCity || cityMatches;
                } else if (selectedCounty) {
                  return (roofer.serviceAreas?.counties?.includes(selectedCounty) ?? false);
                }
                return true; // Show all roofers when no county/city selected
              })
              .map((roofer, index) => {
              // At this point, we know roofer has coordinates (filtered above)
              
              const icon = roofer.isPreferred ? createPreferredIcon(leafletLoaded) : createRegularIcon(leafletLoaded);
              
              // Get offset position if markers are too close
              const offset = offsetMarkers.get(roofer.id);
              const position = offset 
                ? [offset.lat, offset.lng] as [number, number]
                : [roofer.coordinates.lat, roofer.coordinates.lng] as [number, number];
              
              // Get tooltip offset to prevent overlap
              const tooltipOffset = offset?.tooltipOffset || (() => {
                // Vary tooltip position based on index to reduce overlap
                const positions: [number, number][] = [
                  [0, -10],
                  [20, -10],
                  [-20, -10],
                  [0, -25],
                  [15, -25],
                  [-15, -25]
                ];
                return positions[index % positions.length];
              })();
              
              return (
                <Marker
                  key={roofer.id}
                  position={position}
                  icon={icon}
                >
                  <Tooltip permanent={true} direction="top" offset={tooltipOffset}>
                    <div className="text-center whitespace-nowrap">
                      <div className="font-semibold text-rif-black text-sm">
                        {roofer.name}
                      </div>
                      {roofer.isPreferred && (
                        <div className="text-xs text-rif-blue-600 mt-0.5 font-medium flex items-center justify-center gap-1">
                          <FontAwesomeIcon icon={faCertificate} className="h-3 w-3" />
                          Preferred
                        </div>
                      )}
                    </div>
                  </Tooltip>
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