'use client';

import { useEffect } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';

export default function FontAwesomeConfig() {
  useEffect(() => {
    config.autoAddCss = false;
  }, []);
  
  return null;
}
















