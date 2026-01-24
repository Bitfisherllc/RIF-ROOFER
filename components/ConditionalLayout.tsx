'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Don't show Header/Footer for admin routes
  const isAdminRoute = pathname?.startsWith('/admin');
  
  if (isAdminRoute) {
    return <>{children}</>;
  }
  
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

