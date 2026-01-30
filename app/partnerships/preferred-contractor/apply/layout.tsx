import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply to Become a Preferred Contractor | RIF Roofing',
  description:
    'Submit your application to join the RIF network as a Preferred Contractor. Provide your business, licensing, and service area information.',
};

export default function PreferredContractorApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
