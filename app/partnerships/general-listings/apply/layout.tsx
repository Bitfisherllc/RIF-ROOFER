import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply for a General Listing | RIF Roofing',
  description:
    'Submit your business to get a free general listing in the RIF roofing directory. Reach customers in your service areas.',
};

export default function GeneralListingsApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
