import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roofing Service Areas in Florida | RIF',
  description:
    'From Pensacola to Key West, RIF coordinates your roof replacement end-to-end using Certified Installers. Choose your region to see counties, cities, and local roofing resources.',
};

export default function ServiceAreasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}











