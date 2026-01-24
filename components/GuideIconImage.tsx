'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getGuideIconMetadata } from '@/app/guides/utils/guide-icon-mapping';

interface GuideIconImageProps {
  slug: string;
  title: string;
  category: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'h-28', // Reduced height for less negative space
  md: 'h-40', // Reduced height for card listing (was h-56)
  lg: 'h-56', // Reduced height for detail page (was h-80)
  xl: 'h-96', // Extra large for hero sections
};

const iconSizes = {
  sm: 'text-5xl', // Slightly larger for better visibility
  md: 'text-7xl', // Better proportion to container
  lg: 'text-9xl', // Large and prominent
  xl: 'text-[12rem]', // Extra large for hero sections
};

export default function GuideIconImage({ slug, title, category, className = '', size = 'md' }: GuideIconImageProps) {
  const { icon, alt, ariaLabel } = getGuideIconMetadata(slug, title, category);

  return (
    <div 
      className={`relative w-full ${sizeClasses[size]} bg-gradient-to-br from-rif-blue-50 via-white to-rif-blue-100 group-hover:from-green-50 group-hover:via-white group-hover:to-green-100 flex items-center justify-center transition-all duration-300 ${className}`}
      role="img"
      aria-label={ariaLabel}
    >
      <FontAwesomeIcon 
        icon={icon} 
        className={`${iconSizes[size]} text-rif-blue-600 group-hover:text-green-600 transition-colors duration-300`}
        aria-hidden="true"
      />
      {/* SEO: Hidden text for screen readers and search engines */}
      <span className="sr-only">{alt}</span>
    </div>
  );
}

