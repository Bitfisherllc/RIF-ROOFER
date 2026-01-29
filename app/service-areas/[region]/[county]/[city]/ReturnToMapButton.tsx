'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function ReturnToMapButton() {
  const [hasMapState, setHasMapState] = useState(false);
  
  useEffect(() => {
    // Check if we have map state (coming from map)
    if (typeof window !== 'undefined') {
      const mapState = sessionStorage.getItem('mapState');
      setHasMapState(!!mapState);
    }
  }, []);

  if (!hasMapState) {
    return null;
  }

  return (
    <Link
      href="/roofers/map"
      className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
    >
      <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4" />
      Return to Map
    </Link>
  );
}
