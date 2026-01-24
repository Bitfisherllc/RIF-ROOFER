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
import { getRegionCoordinates } from '@/lib/region-coordinates';
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
  mapRef
}: { 
  selectedRegion: string | null;
  selectedCounty: string | null;
  selectedCity: string | null;
  regionGroups: RegionGroup[];
  countyGroups: CountyGroup[];
  cityGroups: CityGroup[];
  mapRef: React.MutableRefObject<any>;
}) {
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Wait for map to be fully initialized
    const map = mapRef.current;
    if (!map || !map.getContainer || !map.getContainer()) return;
    
    // Use a small timeout to ensure map is ready
    const timeoutId = setTimeout(() => {
      try {
    // If county is selected, zoom to show individual roofers (Level 3: Roofers)
    // We'll use fitBounds in the parent component to show all roofers, so skip here
    // This handler will be called after roofers are loaded
        
        // If region is selected, zoom to region to show all counties (Level 2: Counties)
        if (selectedRegion && regionGroups.length > 0) {
          const regionGroup = regionGroups.find(g => g.regionSlug === selectedRegion);
          if (regionGroup && map) {
            // Filter counties for this region
            const regionCounties = countyGroups.filter(c => c.regionSlug === selectedRegion);
            
            // If we have counties for this region, fit bounds to show all of them
            if (regionCounties.length > 0 && map.fitBounds) {
              // Calculate bounds to fit all counties
              const lats = regionCounties.map(c => c.coordinates.lat);
              const lngs = regionCounties.map(c => c.coordinates.lng);
              const bounds = [
                [Math.min(...lats), Math.min(...lngs)],
                [Math.max(...lats), Math.max(...lngs)]
              ] as [[number, number], [number, number]];
              
              // Fit bounds with padding
              map.fitBounds(bounds, {
                padding: [50, 50]
              });
            } else if (map.setView) {
              // No counties yet, use lower zoom to show region area
              map.setView(
                [regionGroup.coordinates.lat, regionGroup.coordinates.lng],
                7,
                { animate: true, duration: 0.5 }
              );
            }
          }
        }
      } catch (error) {
        console.error('Error updating map view:', error);
      }
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [selectedRegion, selectedCounty, regionGroups, countyGroups, mapRef]);
  
  // Clear city selection when zooming out
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    if (!map || !map.getContainer || !map.getContainer()) return;
    
    try {
      const handleZoom = () => {
        const zoom = map?.getZoom() || 0;
        if (zoom <= 11 && selectedCity) {
          // Zoomed out, clear city selection
          // This will be handled by parent component
        }
      };
      
      map.on('zoomend', handleZoom);
      return () => {
        if (map && map.off) {
          map.off('zoomend', handleZoom);
        }
      };
    } catch (error) {
      console.error('Error setting up zoom handler:', error);
      return undefined;
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
  const [regionGroups, setRegionGroups] = useState<RegionGroup[]>([]);
  const [countyGroups, setCountyGroups] = useState<CountyGroup[]>([]);
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
        setLeafletLoaded(leaflet);
      }).catch((err) => {
        console.error('Failed to load Leaflet:', err);
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
        setMapReady(true);
        setLoading(false);
      } catch (error) {
        console.error('Error loading regions and counties:', error);
        setLoading(false);
      }
    };

    loadRegionsAndCounties();
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

  // Filter roofers with valid coordinates (using filtered list)
  // When a county is selected, show roofers from that county that have coordinates
  const roofersWithCoords = useMemo(() => {
    if (selectedCounty) {
      // When county is selected, filter from the filteredRoofers (which already has the preferred filter applied)
      return filteredRoofers.filter((roofer) => {
        if (!roofer.coordinates) return false;
        return (roofer.serviceAreas?.counties?.includes(selectedCounty) ?? false);
      });
    }
    // When no county selected, only show roofers with coordinates
    return filteredRoofers.filter((roofer) => roofer.coordinates);
  }, [filteredRoofers, selectedCounty]);

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

  // City groups are no longer used - we skip directly from counties to roofers
  const cityGroups: CityGroup[] = [];

  // Determine which level we're at
  const mapLevel = useMemo(() => {
    if (!selectedRegion && !selectedCounty) {
      return 'regions'; // Level 1: Regions
    }
    if (selectedRegion && !selectedCounty) {
      return 'counties'; // Level 2: Counties (within selected region)
    }
    if (selectedCounty) {
      return 'roofers'; // Level 3: Individual Roofers (within selected county)
    }
    return 'regions';
  }, [selectedRegion, selectedCounty]);

  // Calculate map bounds to fit all markers (counties or individual roofers)
  const mapBounds = useMemo(() => {
    if (mapLevel === 'roofers' && roofersWithCoords.length > 0) {
      // Filter roofers by selected county if applicable
      const visibleRoofers = roofersWithCoords.filter((r) => {
        if (!r.coordinates) return false;
        if (selectedCounty) {
          return (r.serviceAreas?.counties?.includes(selectedCounty) ?? false);
        }
        return true;
      });
      
      if (visibleRoofers.length === 0) return null;
      
      // Use offset positions if available, otherwise use original coordinates
      const positions = visibleRoofers.map((r) => {
        const offset = offsetMarkers.get(r.id);
        return offset 
          ? [offset.lat, offset.lng] as [number, number]
          : [r.coordinates!.lat, r.coordinates!.lng] as [number, number];
      });
      
      const lats = positions.map((p) => p[0]);
      const lngs = positions.map((p) => p[1]);
      
      // If all markers are at the same location, expand bounds slightly
      const latRange = Math.max(...lats) - Math.min(...lats);
      const lngRange = Math.max(...lngs) - Math.min(...lngs);
      const minRange = 0.001; // Minimum range in degrees (about 100 meters)
      
      let minLat = Math.min(...lats);
      let maxLat = Math.max(...lats);
      let minLng = Math.min(...lngs);
      let maxLng = Math.max(...lngs);
      
      // Expand bounds if they're too small to ensure visibility
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
  }, [roofersWithCoords, filteredCountyGroups, filteredRegionGroups, mapLevel, selectedCounty, offsetMarkers]);

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
          // When showing individual roofers, use more padding and ensure we zoom in enough
          const isRooferLevel = mapLevel === 'roofers';
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
                        // Auto-navigate based on selection type
                        if (result.type === 'region') {
                          setSelectedRegion(result.slug);
                          setSelectedCounty(null);
                          setSelectedCity(null);
                          setShowIndividualMarkers(false);
                        } else if (result.type === 'county') {
                          // Find the region for this county
                          const countyData = searchData.find(item => item.type === 'county' && item.slug === result.slug);
                          if (countyData?.region) {
                            const regionData = searchData.find(item => item.type === 'region' && item.name === countyData.region);
                            if (regionData) {
                              setSelectedRegion(regionData.slug);
                            }
                          }
                          setSelectedCounty(result.slug);
                          setSelectedCity(null);
                          setShowIndividualMarkers(true);
                        } else if (result.type === 'city') {
                          // For cities, find the county and region, then show roofers in that county
                          const cityData = searchData.find(item => item.type === 'city' && item.slug === result.slug);
                          if (cityData?.county) {
                            const countyData = searchData.find(item => item.type === 'county' && item.name === cityData.county);
                            if (countyData) {
                              setSelectedCounty(countyData.slug);
                              if (countyData.region) {
                                const regionData = searchData.find(item => item.type === 'region' && item.name === countyData.region);
                                if (regionData) {
                                  setSelectedRegion(regionData.slug);
                                }
                              }
                            }
                          }
                          setSelectedCity(null); // Don't filter by city, show all roofers in the county
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
                    {mapLevel === 'roofers' 
                      ? `${roofersWithCoords.length} Roofers`
                      : mapLevel === 'counties'
                      ? `${filteredCountyGroups.length} Counties • ${filteredCountyGroups.reduce((sum, g) => sum + g.rooferCount, 0)} Roofers`
                      : `${filteredRegionGroups.length} Regions • ${filteredRegionGroups.reduce((sum, g) => sum + g.rooferCount, 0)} Roofers`}
                  </span>
                </div>
                {(mapLevel === 'roofers' ? roofersWithCoords.filter((r) => r.isPreferred).length > 0 :
                  mapLevel === 'counties' ? filteredCountyGroups.reduce((sum, g) => sum + g.preferredCount, 0) > 0 :
                  filteredRegionGroups.reduce((sum, g) => sum + g.preferredCount, 0) > 0) && (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-rif-blue-700 rounded-full"></div>
                    <span className="text-gray-700">
                      {mapLevel === 'roofers'
                        ? roofersWithCoords.filter((r) => r.isPreferred).length
                        : mapLevel === 'counties'
                        ? filteredCountyGroups.reduce((sum, g) => sum + g.preferredCount, 0)
                        : filteredRegionGroups.reduce((sum, g) => sum + g.preferredCount, 0)} Preferred
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
              
              {/* Back Button - Show when not at region level */}
              {mapLevel !== 'regions' && (
                <button
                  onClick={() => {
                    if (mapLevel === 'roofers') {
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
                  {mapLevel === 'roofers' ? 'Back to Counties' : 'Back to Regions'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Container */}
      <section className="relative bg-gradient-to-b from-gray-50 to-rif-blue-50" style={{ height: 'calc(100vh - 280px)', minHeight: '600px' }}>
        {mapReady && leafletLoaded && (
          <MapContainer
            center={[floridaCenter.lat, floridaCenter.lng]}
            zoom={7}
            bounds={mapBounds || undefined}
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
              selectedCity={null}
              regionGroups={filteredRegionGroups}
              countyGroups={filteredCountyGroups}
              cityGroups={[]}
              mapRef={mapRef}
            />
            
            {/* Level 1: Show region markers when no region is selected */}
            {mapLevel === 'regions' && leafletLoaded && filteredRegionGroups.map((group) => (
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
            
            {/* Level 2: Show county markers when region is selected */}
            {mapLevel === 'counties' && leafletLoaded && filteredCountyGroups.map((group) => (
              <Marker
                key={`county-${group.countySlug}`}
                position={[group.coordinates.lat, group.coordinates.lng]}
                icon={createCountyIcon(group.rooferCount, group.preferredCount)}
                eventHandlers={{
                  click: () => {
                    // Level 2 -> Level 3: Click county to show individual roofers
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
                        // Level 2 -> Level 3: Click county to show individual roofers
                        setSelectedCounty(group.countySlug);
                        setSelectedCity(null); // Clear any city selection
                        setShowIndividualMarkers(true);
                      }}
                      className="w-full px-3 py-1.5 bg-rif-blue-500 text-white rounded hover:bg-rif-blue-600 transition-colors text-sm font-medium"
                    >
                      View Roofers
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
            
            {/* Level 3: Show individual roofer markers when county is selected */}
            {mapLevel === 'roofers' && leafletLoaded && roofersWithCoords
              .filter((roofer): roofer is typeof roofer & { coordinates: NonNullable<typeof roofer.coordinates> } => {
                // Filter by selected county
                if (!roofer.coordinates) return false;
                if (selectedCounty) {
                  return (roofer.serviceAreas?.counties?.includes(selectedCounty) ?? false);
                }
                return true; // Show all roofers when no county selected
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