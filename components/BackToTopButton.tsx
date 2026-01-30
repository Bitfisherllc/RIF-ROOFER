'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const SCROLL_THRESHOLD = 400;

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY ?? document.documentElement.scrollTop;
      setVisible(y > SCROLL_THRESHOLD);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-rif-blue-500 text-white shadow-lg transition-all hover:bg-rif-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-rif-blue-400 focus:ring-offset-2"
    >
      <FontAwesomeIcon icon={faArrowUp} className="h-5 w-5" />
    </button>
  );
}
