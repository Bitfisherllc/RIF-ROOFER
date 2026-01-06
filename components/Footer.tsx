'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapLocationDot,
  faUsers,
  faBoxes,
  faBook,
  faEnvelope,
  faPhone,
  faMapPin,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTiktok,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Contact Info */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Logo variant="full" color="white" width={150} />
            </Link>
            <p className="text-sm mb-6 leading-relaxed">
              RIF (Roofers In Florida) is a U.S. owned roofing installation network built around quality control, installer accountability, and distributor-backed materials.
            </p>
            <div className="space-y-3">
              <a
                href="tel:813-777-8272"
                className="flex items-center gap-3 text-sm hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faPhone} className="h-4 w-4" />
                <div>
                  <div className="font-semibold">Cell</div>
                  <div>813-777-8272</div>
                </div>
              </a>
              <a
                href="tel:813-803-4599"
                className="flex items-center gap-3 text-sm hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faPhone} className="h-4 w-4" />
                <div>
                  <div className="font-semibold">Office</div>
                  <div>813-803-4599</div>
                </div>
              </a>
              <div className="flex items-start gap-3 text-sm">
                <FontAwesomeIcon icon={faMapPin} className="h-4 w-4 mt-1" />
                <div>
                  <div className="font-semibold">Warehouse</div>
                  <div>8037 Treiman Blvd</div>
                  <div>Webster, FL 33597</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faMapLocationDot} className="h-5 w-5" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/service-areas" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4" />
                  Service Areas
                </Link>
              </li>
              <li>
                <Link href="/roofers" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faUsers} className="h-4 w-4" />
                  All Roofers
                </Link>
              </li>
              <li>
                <Link href="/products" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faBoxes} className="h-4 w-4" />
                  Products
                </Link>
              </li>
              <li>
                <Link href="/guides" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faBook} className="h-4 w-4" />
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/mailing-list" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
                  Mailing List
                </Link>
              </li>
              <li>
                <Link href="/investment-opportunity" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4" />
                  Investment Opportunity
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faBook} className="h-5 w-5" />
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.floridabuilding.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4" />
                  Florida Building Code
                </a>
              </li>
              <li>
                <a
                  href="https://www.fema.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4" />
                  FEMA Resources
                </a>
              </li>
            </ul>
          </div>

          {/* About RIF */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faMapLocationDot} className="h-5 w-5" />
              About RIF
            </h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href="/about" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4" />
                  About RIF
                </Link>
              </li>
              <li>
                <Link href="/admin" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4" />
                  Admin Portal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
                  Contact Us
                </Link>
              </li>
            </ul>
            <div className="mb-4">
              <p className="text-sm mb-2">
                Quality roofing installation across Florida with distributor-backed materials and certified installers.
              </p>
              <p className="text-sm">
                Serving homeowners and businesses throughout the Sunshine State.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <FontAwesomeIcon icon={faTiktok} className="h-5 w-5" />
              </a>
              <a
                href="https://nextdoor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Nextdoor"
              >
                <FontAwesomeIcon icon={faMapLocationDot} className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <FontAwesomeIcon icon={faYoutube} className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            Copyright © {new Date().getFullYear()} RIF Roofers In Florida. All rights reserved.
          </p>
          <p className="text-sm">Made with ♥ in Florida</p>
        </div>
      </div>
    </footer>
  );
}
