'use client';

import { useEffect } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';

export default function FontAwesomeSetup() {
  useEffect(() => {
    // Configure FontAwesome on client side only
    if (typeof window !== 'undefined') {
      config.autoAddCss = false;
    }
  }, []);
  
  return null;
}
















