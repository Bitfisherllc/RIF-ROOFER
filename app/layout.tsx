import type { Metadata } from 'next';
import './globals.css';
import FontAwesomeSetup from '@/components/FontAwesomeSetup';
import ConditionalLayout from '@/components/ConditionalLayout';

export const metadata: Metadata = {
  title: 'RIF Roofers In Florida | Stone-Coated Metal Roofing in Florida',
  description:
    'Find certified, trained roofers who install stone-coated metal roofing systems correctly and consistently across Florida.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FontAwesomeSetup />
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
