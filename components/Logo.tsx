import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  variant?: 'full' | 'box-words' | 'icon' | 'solid-icon' | 'ini';
  color?: 'blue' | 'black' | 'white';
  width?: number;
  height?: number;
  href?: string;
  className?: string;
  priority?: boolean;
}

const logoMap: Record<string, Record<string, string>> = {
  full: {
    blue: '/logo.svg',
    black: '/logo.svg',
    white: '/logo-white.svg',
  },
  'box-words': {
    blue: '/logo-box-words.svg',
    black: '/logo-box-words.svg',
    white: '/logo-box-words.svg',
  },
  icon: {
    blue: '/logo-icon.svg',
    black: '/logo-icon.svg',
    white: '/logo-icon.svg',
  },
  'solid-icon': {
    blue: '/logo-icon.svg',
    black: '/logo-icon.svg',
    white: '/logo-icon.svg',
  },
  ini: {
    blue: '/logo-icon.svg',
    black: '/logo-icon.svg',
    white: '/logo-icon.svg',
  },
};

export default function Logo({
  variant = 'full',
  color = 'blue',
  width = 180,
  height,
  href,
  className = '',
  priority = false,
}: LogoProps) {
  const logoSrc = logoMap[variant]?.[color] || logoMap.full.blue;
  const calculatedHeight = height || Math.round(width * 0.447); // Maintain aspect ratio

  const logoImage = (
    <Image
      src={logoSrc}
      alt="RiF Roofers In Florida"
      width={width}
      height={calculatedHeight}
      className={className}
      priority={priority}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {logoImage}
      </Link>
    );
  }

  return logoImage;
}
