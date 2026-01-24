'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

interface LocationMapProps {
  lat?: number;
  lng?: number;
  address?: string;
  locationName?: string;
}

export default function LocationMap({ lat, lng, address, locationName }: LocationMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
        <p className="text-gray-500 text-sm">Loading map...</p>
      </div>
    );
  }

  if (!lat || !lng) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
        <p className="text-gray-500 text-sm">Enter an address to see the map</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64 rounded-lg border border-gray-200 overflow-hidden">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            <div>
              {locationName && <strong>{locationName}</strong>}
              {locationName && address && <br />}
              {address}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
