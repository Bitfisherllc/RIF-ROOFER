'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapLocationDot,
  faUsers,
  faBoxes,
  faBook,
  faEnvelope,
  faHandshake,
  faUser,
  faChevronRight,
  faClipboardList,
} from '@fortawesome/free-solid-svg-icons';

export default function QuickLinksPage() {
  const linkSections = [
    {
      title: 'Quick Links',
      icon: faMapLocationDot,
      links: [
        { href: '/service-areas', label: 'Service Areas', icon: faMapLocationDot },
        { href: '/roofers', label: 'All Roofers', icon: faUsers },
        { href: '/products', label: 'Products', icon: faBoxes },
        { href: '/guides', label: 'Guides', icon: faBook },
        { href: '/mailing-list', label: 'Mailing List', icon: faEnvelope },
        { href: '/free-estimate', label: 'Free Estimate', icon: faClipboardList },
      ],
    },
    {
      title: 'Resources',
      icon: faBook,
      links: [
        { href: '/resources', label: 'Resources Overview', icon: faBook },
        { href: '/guides', label: 'Guides', icon: faBook },
        { href: '/videos', label: 'Videos', icon: faBook },
        { href: '/glossary', label: 'Glossary', icon: faBook },
        { href: '/faq', label: 'FAQ', icon: faBook },
        { href: 'https://www.floridabuilding.org/', label: 'Florida Building Code', icon: faMapLocationDot, external: true },
        { href: 'https://www.fema.gov/', label: 'FEMA Resources', icon: faMapLocationDot, external: true },
      ],
    },
    {
      title: 'Partnerships',
      icon: faHandshake,
      links: [
        { href: '/partnerships', label: 'Partnerships Overview', icon: faHandshake },
        { href: '/partnerships/preferred-contractor', label: 'Preferred Contractor', icon: faHandshake },
        { href: '/partnerships/general-listings', label: 'General Listings', icon: faHandshake },
        { href: '/partnerships/sponsorship-subscription', label: 'Sponsorship & Subscription', icon: faHandshake },
        { href: '/training', label: 'Training Programs', icon: faHandshake },
        { href: '/partnerships/signup', label: 'Sign Up', icon: faHandshake },
      ],
    },
    {
      title: 'Account & Support',
      icon: faUser,
      links: [
        { href: '/my-plan', label: 'My Plan', icon: faUser },
        { href: '/login', label: 'Login', icon: faUser },
        { href: '/contact', label: 'Contact Us', icon: faEnvelope },
        { href: '/about', label: 'About RIF', icon: faMapLocationDot },
        { href: '/admin', label: 'Admin Portal', icon: faMapLocationDot },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Quick Links</h1>
          <p className="text-lg text-gray-600">
            Find all the links and resources you need in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {linkSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={section.icon} className="h-5 w-5 text-rif-blue-500" />
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-rif-blue-600 rounded-lg transition-colors group"
                      >
                        <FontAwesomeIcon icon={link.icon} className="h-4 w-4 text-gray-400 group-hover:text-rif-blue-500" />
                        <span className="flex-1">{link.label}</span>
                        <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3 text-gray-400 group-hover:text-rif-blue-500" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-rif-blue-600 rounded-lg transition-colors group"
                      >
                        <FontAwesomeIcon icon={link.icon} className="h-4 w-4 text-gray-400 group-hover:text-rif-blue-500" />
                        <span className="flex-1">{link.label}</span>
                        <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3 text-gray-400 group-hover:text-rif-blue-500" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
