'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faStar,
  faHeart,
  faFileInvoiceDollar,
  faCalendar,
  faBell,
  faChartLine,
  faShield,
  faBookmark,
  faHistory,
  faMapLocationDot,
  faPhone,
  faEnvelope,
  faGlobe,
  faArrowRight,
  faTrash,
  faCheckCircle,
  faClock,
  faBox,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import { searchData, SearchResult } from '@/app/service-areas/data/search-data';

interface FavoriteRoofer {
  id: string;
  slug: string;
  name: string;
  phone?: string;
  email?: string;
  websiteUrl?: string;
}

interface SavedProduct {
  slug: string;
  name: string;
  category: string;
  logo?: string;
}

interface SavedLocation {
  type: 'region' | 'county' | 'city';
  name: string;
  slug: string;
  path: string;
  county?: string;
  region?: string;
}

const STORAGE_KEY_ROOFERS = 'rif-favorite-roofers';
const STORAGE_KEY_PRODUCTS = 'rif-saved-products';
const STORAGE_KEY_LOCATIONS = 'rif-saved-locations';

export default function MyPlanPage() {
  const [favoriteRoofers, setFavoriteRoofers] = useState<FavoriteRoofer[]>([]);
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [activeTab, setActiveTab] = useState<'favorites' | 'products' | 'locations' | 'projects' | 'settings'>('favorites');
  const [showAddLocation, setShowAddLocation] = useState(false);

  // Load all saved data from localStorage
  useEffect(() => {
    const loadSavedData = () => {
      try {
        // Load roofers
        const storedRoofers = localStorage.getItem(STORAGE_KEY_ROOFERS);
        if (storedRoofers) {
          setFavoriteRoofers(JSON.parse(storedRoofers) as FavoriteRoofer[]);
        }

        // Load products
        const storedProducts = localStorage.getItem(STORAGE_KEY_PRODUCTS);
        if (storedProducts) {
          setSavedProducts(JSON.parse(storedProducts) as SavedProduct[]);
        }

        // Load locations
        const storedLocations = localStorage.getItem(STORAGE_KEY_LOCATIONS);
        if (storedLocations) {
          setSavedLocations(JSON.parse(storedLocations) as SavedLocation[]);
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    };

    loadSavedData();

    // Listen for storage changes (from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_ROOFERS || e.key === STORAGE_KEY_PRODUCTS || e.key === STORAGE_KEY_LOCATIONS) {
        loadSavedData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const removeFavorite = (rooferId: string) => {
    const updated = favoriteRoofers.filter((r) => r.id !== rooferId);
    setFavoriteRoofers(updated);
    localStorage.setItem(STORAGE_KEY_ROOFERS, JSON.stringify(updated));
  };

  const removeProduct = (slug: string) => {
    const updated = savedProducts.filter((p) => p.slug !== slug);
    setSavedProducts(updated);
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(updated));
  };

  const removeLocation = (locationPath: string) => {
    const updated = savedLocations.filter((l) => l.path !== locationPath);
    setSavedLocations(updated);
    localStorage.setItem(STORAGE_KEY_LOCATIONS, JSON.stringify(updated));
  };

  const addLocation = (location: SearchResult) => {
    const locationToAdd: SavedLocation = {
      type: location.type,
      name: location.name,
      slug: location.slug,
      path: location.path,
      county: location.county,
      region: location.region,
    };

    // Check if location already exists
    if (savedLocations.some((l) => l.path === location.path)) {
      return;
    }

    const updated = [...savedLocations, locationToAdd];
    setSavedLocations(updated);
    localStorage.setItem(STORAGE_KEY_LOCATIONS, JSON.stringify(updated));
    setShowAddLocation(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rif-blue-500/10">
              <FontAwesomeIcon icon={faUser} className="h-8 w-8 text-rif-blue-500" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold text-rif-black mb-2 tracking-tight">
                My Plan
              </h1>
              <p className="text-lg text-gray-600 font-light">
                Manage your roofing project, saved roofers, and preferences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="px-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'favorites'
                  ? 'border-rif-blue-500 text-rif-blue-500'
                  : 'border-transparent text-gray-600 hover:text-rif-blue-500 hover:border-gray-300'
              }`}
            >
              <FontAwesomeIcon icon={faStar} className="h-5 w-5" />
              Saved Roofers
              {favoriteRoofers.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-rif-blue-100 text-rif-blue-700 rounded-full text-sm">
                  {favoriteRoofers.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'products'
                  ? 'border-rif-blue-500 text-rif-blue-500'
                  : 'border-transparent text-gray-600 hover:text-rif-blue-500 hover:border-gray-300'
              }`}
            >
              <FontAwesomeIcon icon={faBox} className="h-5 w-5" />
              Products
              {savedProducts.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-rif-blue-100 text-rif-blue-700 rounded-full text-sm">
                  {savedProducts.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('locations')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'locations'
                  ? 'border-rif-blue-500 text-rif-blue-500'
                  : 'border-transparent text-gray-600 hover:text-rif-blue-500 hover:border-gray-300'
              }`}
            >
              <FontAwesomeIcon icon={faMapLocationDot} className="h-5 w-5" />
              Locations
              {savedLocations.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-rif-blue-100 text-rif-blue-700 rounded-full text-sm">
                  {savedLocations.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'projects'
                  ? 'border-rif-blue-500 text-rif-blue-500'
                  : 'border-transparent text-gray-600 hover:text-rif-blue-500 hover:border-gray-300'
              }`}
            >
              <FontAwesomeIcon icon={faFileInvoiceDollar} className="h-5 w-5" />
              Projects & Estimates
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'settings'
                  ? 'border-rif-blue-500 text-rif-blue-500'
                  : 'border-transparent text-gray-600 hover:text-rif-blue-500 hover:border-gray-300'
              }`}
            >
              <FontAwesomeIcon icon={faShield} className="h-5 w-5" />
              Account Settings
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-semibold text-rif-black mb-2">Saved Roofers</h2>
                <p className="text-gray-600">
                  Your favorite certified roofers. Bookmark roofers you're interested in working with.
                </p>
              </div>

              {favoriteRoofers.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                    <FontAwesomeIcon icon={faStarRegular} className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-rif-black mb-4">No Saved Roofers Yet</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Start exploring our network of certified roofers and save your favorites for easy access.
                  </p>
                  <Link
                    href="/roofers"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium"
                  >
                    Browse Roofers
                    <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteRoofers.map((roofer) => (
                    <div
                      key={roofer.id}
                      className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <Link
                            href={`/roofers/${roofer.slug}`}
                            className="text-2xl font-semibold text-rif-black hover:text-rif-blue-500 transition-colors block mb-2"
                          >
                            {roofer.name}
                          </Link>
                        </div>
                        <button
                          onClick={() => removeFavorite(roofer.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2"
                          aria-label="Remove from favorites"
                        >
                          <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="space-y-2 mb-4 text-gray-600">
                        {roofer.phone && (
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faPhone} className="h-4 w-4 text-rif-blue-500" />
                            <a
                              href={`tel:${roofer.phone}`}
                              className="hover:text-rif-blue-500 transition-colors"
                            >
                              {roofer.phone}
                            </a>
                          </div>
                        )}
                        {roofer.email && (
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 text-rif-blue-500" />
                            <a
                              href={`mailto:${roofer.email}`}
                              className="hover:text-rif-blue-500 transition-colors truncate"
                            >
                              {roofer.email}
                            </a>
                          </div>
                        )}
                        {roofer.websiteUrl && (
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faGlobe} className="h-4 w-4 text-rif-blue-500" />
                            <a
                              href={roofer.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-rif-blue-500 transition-colors truncate"
                            >
                              {roofer.websiteUrl.replace(/^https?:\/\//, '')}
                            </a>
                          </div>
                        )}
                      </div>

                      <Link
                        href={`/roofers/${roofer.slug}`}
                        className="inline-flex items-center gap-2 text-rif-blue-500 hover:text-rif-blue-600 transition-colors font-medium"
                      >
                        View Profile
                        <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-semibold text-rif-black mb-2">Saved Products</h2>
                  <p className="text-gray-600">
                    Products you're interested in for your roofing project.
                  </p>
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium"
                >
                  <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                  Browse Products
                </Link>
              </div>

              {savedProducts.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                    <FontAwesomeIcon icon={faBox} className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-rif-black mb-4">No Saved Products Yet</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Explore our range of roofing products and save the ones you're interested in.
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium"
                  >
                    Browse Products
                    <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedProducts.map((product) => (
                    <div
                      key={product.slug}
                      className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <Link
                            href={`/products/${product.slug}`}
                            className="text-2xl font-semibold text-rif-black hover:text-rif-blue-500 transition-colors block mb-2"
                          >
                            {product.name}
                          </Link>
                          <div className="text-sm text-gray-500 mb-2">{product.category}</div>
                        </div>
                        <button
                          onClick={() => removeProduct(product.slug)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2"
                          aria-label="Remove product"
                        >
                          <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                        </button>
                      </div>

                      {product.logo && (
                        <div className="mb-4 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                          <Image
                            src={product.logo}
                            alt={`${product.name} logo`}
                            width={120}
                            height={48}
                            className="object-contain"
                          />
                        </div>
                      )}

                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-2 text-rif-blue-500 hover:text-rif-blue-600 transition-colors font-medium"
                      >
                        View Product
                        <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Locations Tab */}
          {activeTab === 'locations' && (
            <div>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-semibold text-rif-black mb-2">Saved Locations</h2>
                  <p className="text-gray-600">
                    Service areas you're researching or interested in.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddLocation(!showAddLocation)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium"
                >
                  <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                  Add Location
                </button>
              </div>

              {/* Add Location Panel */}
              {showAddLocation && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-rif-black">Add Location</h3>
                    <button
                      onClick={() => setShowAddLocation(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTrash} className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {searchData.map((location) => {
                      const isSaved = savedLocations.some((l) => l.path === location.path);
                      return (
                        <button
                          key={location.path}
                          onClick={() => !isSaved && addLocation(location)}
                          disabled={isSaved}
                          className={`w-full text-left p-3 rounded-lg border transition-colors ${
                            isSaved
                              ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                              : 'border-gray-200 hover:border-rif-blue-300 hover:bg-rif-blue-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-rif-black">{location.name}</div>
                              <div className="text-sm text-gray-500">
                                {location.type === 'city' && location.county && `in ${location.county}`}
                                {location.type === 'county' && location.region && `in ${location.region}`}
                                {location.type === 'region' && 'Region'}
                              </div>
                            </div>
                            {isSaved && (
                              <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-500" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {savedLocations.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                    <FontAwesomeIcon icon={faMapLocationDot} className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-rif-black mb-4">No Saved Locations Yet</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Save service areas you're researching to easily find roofers in those locations.
                  </p>
                  <button
                    onClick={() => setShowAddLocation(true)}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium"
                  >
                    <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                    Add Location
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedLocations.map((location) => (
                    <div
                      key={location.path}
                      className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <Link
                            href={location.path}
                            className="text-xl font-semibold text-rif-black hover:text-rif-blue-500 transition-colors block mb-2"
                          >
                            {location.name}
                          </Link>
                          <div className="text-sm text-gray-500 mb-1 capitalize">{location.type}</div>
                          {location.county && (
                            <div className="text-sm text-gray-600">{location.county}</div>
                          )}
                          {location.region && (
                            <div className="text-sm text-gray-600">{location.region}</div>
                          )}
                        </div>
                        <button
                          onClick={() => removeLocation(location.path)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2"
                          aria-label="Remove location"
                        >
                          <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                        </button>
                      </div>

                      <Link
                        href={location.path}
                        className="inline-flex items-center gap-2 text-rif-blue-500 hover:text-rif-blue-600 transition-colors font-medium"
                      >
                        View Area
                        <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-semibold text-rif-black mb-2">Projects & Estimates</h2>
                <p className="text-gray-600">
                  Track your roofing projects, estimates, and quotes in one place.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                  <FontAwesomeIcon icon={faFileInvoiceDollar} className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-rif-black mb-4">No Projects Yet</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Once you request an estimate or start a project, it will appear here for easy tracking.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/free-estimate"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium"
                  >
                    Request Free Estimate
                    <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-semibold text-rif-black mb-2">Account Settings</h2>
                <p className="text-gray-600">
                  Manage your account preferences and notifications.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-rif-black mb-4">Profile Information</h3>
                  <p className="text-gray-600 mb-6">
                    To update your profile information, please contact us or sign in to your account.
                  </p>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium"
                  >
                    Sign In
                    <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-rif-black mb-4">Notifications</h3>
                  <p className="text-gray-600 mb-4">
                    Configure how you'd like to receive updates about your projects and new roofers in your area.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-rif-black">Email Notifications</div>
                        <div className="text-sm text-gray-600">Receive updates via email</div>
                      </div>
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                        Enable
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-rif-black">SMS Notifications</div>
                        <div className="text-sm text-gray-600">Receive updates via text message</div>
                      </div>
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-rif-black mb-4">Privacy & Data</h3>
                  <p className="text-gray-600 mb-4">
                    Your data is stored locally in your browser. To clear your saved roofers, remove them individually from the Saved Roofers tab.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FontAwesomeIcon icon={faShield} className="h-4 w-4 text-green-500" />
                    <span>Your data is stored locally and never shared</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-rif-black mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/free-estimate"
              className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-rif-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-rif-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon icon={faFileInvoiceDollar} className="h-6 w-6 text-white" />
                </div>
                <div className="font-semibold text-rif-black">Request Estimate</div>
              </div>
              <p className="text-gray-600 text-sm">Get a free estimate for your roofing project</p>
            </Link>

            <Link
              href="/roofers"
              className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-rif-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-rif-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon icon={faMapLocationDot} className="h-6 w-6 text-white" />
                </div>
                <div className="font-semibold text-rif-black">Find Roofers</div>
              </div>
              <p className="text-gray-600 text-sm">Browse certified roofers in your area</p>
            </Link>

            <Link
              href="/contact"
              className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-rif-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-rif-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6 text-white" />
                </div>
                <div className="font-semibold text-rif-black">Contact Us</div>
              </div>
              <p className="text-gray-600 text-sm">Get in touch with our team</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
