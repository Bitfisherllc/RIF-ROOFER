'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faStar,
  faSync,
  faHome,
  faCog,
  faCertificate,
  faLock,
  faSpinner,
  faBook,
  faEnvelope,
  faImage,
  faDollarSign,
  faSortAmountDown,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      // Check if admin password cookie exists
      const adminCookie = getCookie('admin-password-verified');
      console.log('Admin layout auth check:', { pathname, cookie: adminCookie });
      
      if (adminCookie === 'true') {
        setIsAuthenticated(true);
      } else {
        // Only redirect if we're not already on the login page
        if (pathname !== '/admin/login') {
          const currentPath = pathname || '/admin/roofers';
          router.push(`/admin/login?redirect=${encodeURIComponent(currentPath)}`);
        } else {
          // We're on login page, so not authenticated
          setIsAuthenticated(false);
        }
      }
    };

    checkAuth();
    
    // Re-check after a short delay in case cookie was just set
    const timeout = setTimeout(checkAuth, 200);
    return () => clearTimeout(timeout);
  }, [pathname, router]);

  const menuItems = [
    {
      href: '/admin/roofers',
      icon: faUsers,
      label: 'Manage Roofers',
    },
    {
      href: '/admin/training',
      icon: faCertificate,
      label: 'Training Events',
    },
    {
      href: '/admin/training-paths',
      icon: faCertificate,
      label: 'Training Paths',
    },
    {
      href: '/admin/reviews',
      icon: faStar,
      label: 'Manage Reviews',
    },
    {
      href: '/admin/sync-reviews',
      icon: faSync,
      label: 'Sync Reviews',
    },
    {
      href: '/admin/mailing-list',
      icon: faEnvelope,
      label: 'Mailing List',
    },
    {
      href: '/admin/guides',
      icon: faBook,
      label: 'Guide URLs',
    },
    {
      href: '/admin/hero-background',
      icon: faImage,
      label: 'Hero Background',
    },
    {
      href: '/admin/product-order',
      icon: faSortAmountDown,
      label: 'Product Order',
    },
    {
      href: '/admin/config',
      icon: faLock,
      label: 'Site Configuration',
    },
    {
      href: '/investment-opportunity',
      icon: faDollarSign,
      label: 'Investment Opportunity',
    },
  ];

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 text-rif-blue-500 animate-spin mb-4" />
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  // If on login page, always render children (the login form)
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Don't render admin content if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  const NavLinks = () => (
    <>
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-rif-blue-50 text-rif-blue-700 font-semibold border border-rif-blue-200'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-rif-blue-600'
              }`}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className={`h-5 w-5 ${isActive ? 'text-rif-blue-500' : 'text-gray-400'}`}
              />
              <span>{item.label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header - no top nav */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-rif-black flex items-center gap-2">
              <FontAwesomeIcon icon={faCog} className="h-5 w-5 text-rif-blue-500" />
              Admin Panel
            </h1>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-rif-blue-500 transition-colors"
          >
            <FontAwesomeIcon icon={faHome} className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Site</span>
          </Link>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 max-w-[85vw] bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-200 ease-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="font-semibold text-rif-black">Menu</span>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 overflow-y-auto">
          <ul className="space-y-2">
            <NavLinks />
          </ul>
        </nav>
      </aside>

      <div className="flex">
        {/* Desktop sidebar - hidden on mobile */}
        <aside className="hidden lg:block w-64 flex-shrink-0 bg-white border-r border-gray-200 min-h-[calc(100vh-57px)] sticky top-[57px]">
          <nav className="p-4">
            <ul className="space-y-2">
              <NavLinks />
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}













