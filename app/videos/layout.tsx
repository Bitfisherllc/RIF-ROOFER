import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stone Coated Metal Roofing Videos | RIF Roofing',
  description:
    'Educational videos about stone-coated metal roofing, including buyer guides, performance testing, brand information, comparisons, and real-world performance in storms. Learn about DECRA, Unified Steel, and other stone-coated metal roofing brands.',
  keywords: [
    'stone coated metal roofing videos',
    'stone coated steel roofing',
    'DECRA roofing videos',
    'Unified Steel roofing',
    'metal roofing education',
    'roofing comparison videos',
    'hurricane resistant roofing',
    'hail resistant roofing',
    'Florida roofing videos',
    'metal roofing benefits',
    'stone coated roofing pros and cons',
  ],
};

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


