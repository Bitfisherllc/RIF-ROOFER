'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faDirections } from '@fortawesome/free-solid-svg-icons';
import { geocodeAddress, type Coordinates } from '@/lib/geocoding';
import { getRooferFastCoordinates } from '@/lib/fast-coordinates';

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

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

interface RooferLocationMapProps {
  roofer: {
    name: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
}

export default function RooferLocationMap({ roofer }: RooferLocationMapProps) {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(true);
  const [leafletLoaded, setLeafletLoaded] = useState<any>(null);

  // Load Leaflet dynamically
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet').then((leafletModule) => {
        let leaflet = (leafletModule as any).default;
        if (!leaflet || typeof leaflet.divIcon !== 'function') {
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

  // Geocode the roofer's address
  useEffect(() => {
    const loadCoordinates = async () => {
      if (!roofer.address && !roofer.city) {
        setLoading(false);
        return;
      }

      // First try fast coordinates (city/county level)
      const fastCoords = getRooferFastCoordinates({
        address: roofer.address,
        city: roofer.city,
        state: roofer.state,
        zipCode: roofer.zipCode,
      } as any);

      if (fastCoords) {
        setCoordinates(fastCoords);
        setLoading(false);
        return;
      }

      // If no fast coordinates, geocode the full address
      try {
        const result = await geocodeAddress(
          roofer.address,
          roofer.city,
          roofer.state || 'FL',
          roofer.zipCode
        );

        if (result.coordinates) {
          setCoordinates(result.coordinates);
        }
      } catch (error) {
        console.error('Error geocoding roofer address:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCoordinates();
  }, [roofer.address, roofer.city, roofer.state, roofer.zipCode]);

  // Build full address string for directions
  const fullAddress = [
    roofer.address,
    roofer.city,
    roofer.state || 'FL',
    roofer.zipCode,
  ]
    .filter(Boolean)
    .join(', ');

  // Google Maps directions URL
  const googleMapsUrl = fullAddress
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`
    : null;

  // Apple Maps directions URL
  const appleMapsUrl = fullAddress
    ? `https://maps.apple.com/?daddr=${encodeURIComponent(fullAddress)}`
    : null;

  if (loading) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rif-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-500 text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  if (!coordinates) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
        <div className="text-center">
          <FontAwesomeIcon icon={faMapLocationDot} className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-gray-500 text-sm">Map location not available</p>
          {fullAddress && (
            <div className="mt-4">
              <p className="text-gray-700 text-sm mb-2">{fullAddress}</p>
              {googleMapsUrl && (
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors text-sm font-medium"
                >
                  <FontAwesomeIcon icon={faDirections} className="h-4 w-4" />
                  Get Directions
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full h-96 rounded-lg border border-gray-200 overflow-hidden mb-4">
        {leafletLoaded && coordinates && (
          <MapContainer
            key={`${coordinates.lat}-${coordinates.lng}`}
            center={[coordinates.lat, coordinates.lng]}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={[coordinates.lat, coordinates.lng]}>
              <Popup>
                <div className="p-2">
                  <strong className="text-rif-black">{roofer.name}</strong>
                  {fullAddress && (
                    <>
                      <br />
                      <span className="text-sm text-gray-600">{fullAddress}</span>
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
      
      {/* Directions Links */}
      {fullAddress && (
        <div className="flex flex-wrap gap-3 items-center">
          {googleMapsUrl && (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium"
            >
              <FontAwesomeIcon icon={faDirections} className="h-4 w-4" />
              Get Directions (Google Maps)
            </a>
          )}
          {appleMapsUrl && (
            <a
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
            >
              <FontAwesomeIcon icon={faDirections} className="h-4 w-4" />
              Get Directions (Apple Maps)
            </a>
          )}
          <div className="text-sm text-gray-600">
            <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 mr-1" />
            {fullAddress}
          </div>
        </div>
      )}
    </div>
  );
}

