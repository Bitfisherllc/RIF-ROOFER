'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTopButton from '@/components/BackToTopButton';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Don't show Header/Footer for admin routes
  const isAdminRoute = pathname?.startsWith('/admin');
  
  if (isAdminRoute) {
    return (
      <>
        {children}
        <BackToTopButton />
      </>
    );
  }
  
  return (
    <>
      <Header />
      {children}
      <Footer />
      <BackToTopButton />
    </>
  );
}

