import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up for Sponsored results | RIF Roofing',
  description:
    'Sign up for Sponsored results. Provide your business and contact information and we’ll send your invoice to get started.',
};

export default function SponsorshipSubscriptionApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
