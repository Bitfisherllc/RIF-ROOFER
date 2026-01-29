'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faEdit,
  faCheck,
  faTimes,
  faPhone,
  faEnvelope,
  faGlobe,
  faCertificate,
  faEye,
  faEyeSlash,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { searchData, SearchResult } from '@/app/service-areas/data/search-data';

interface Roofer {
  id: string;
  name: string;
  slug: string;
  phone?: string;
  email?: string;
  websiteUrl?: string;
  googleBusinessUrl?: string;
  isPreferred: boolean;
  isHidden?: boolean;
  category?: 'preferred' | 'sponsored' | 'general';
  city?: string;
  state?: string;
  serviceAreas: {
    regions?: string[];
    counties?: string[];
    cities?: string[];
  };
}

export default function AdminRoofersPage() {
  const [roofers, setRoofers] = useState<Roofer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<Partial<Roofer>>({});
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'preferred' | 'sponsored' | 'general'>('all');
  const [readOnly, setReadOnly] = useState(false);

  // Extract location options from searchData
  const regions = searchData.filter((item) => item.type === 'region');
  const counties = searchData.filter((item) => item.type === 'county');
  const cities = searchData.filter((item) => item.type === 'city');

  useEffect(() => {
    loadRoofers();
  }, []);

  const loadRoofers = async () => {
    try {
      const response = await fetch('/api/admin/roofers');
      if (response.ok) {
        const data = await response.json();
        setReadOnly(!!data.readOnly);
        // Default category to 'general' if not set
        const roofersWithDefaults = (data.roofers || []).map((r: Roofer) => ({
          ...r,
          category: r.category || 'general',
        }));
        setRoofers(roofersWithDefaults);
      }
    } catch (error) {
      console.error('Failed to load roofers:', error);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (roofer: Roofer) => {
    setEditingId(roofer.id);
    setEditingData({
      phone: roofer.phone || '',
      email: roofer.email || '',
      websiteUrl: roofer.websiteUrl || '',
      isPreferred: roofer.isPreferred,
      isHidden: roofer.isHidden,
      googleBusinessUrl: roofer.googleBusinessUrl || '',
      category: roofer.category || 'general',
      serviceAreas: {
        regions: roofer.serviceAreas?.regions || [],
        counties: roofer.serviceAreas?.counties || [],
        cities: roofer.serviceAreas?.cities || [],
      },
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingData({});
  };

  // Helper function to get all cities for a county
  const getCitiesForCounty = (countySlug: string): string[] => {
    // Find the county by slug
    const county = counties.find((c) => c.slug === countySlug);
    if (!county) return [];

    // Get the county name (e.g., "Hillsborough County")
    const countyName = county.name;

    // Find all cities that belong to this county
    const countyCities = cities.filter((city) => city.county === countyName);
    return countyCities.map((city) => city.slug);
  };

  const toggleServiceArea = (
    type: 'regions' | 'counties' | 'cities',
    slug: string
  ) => {
    const currentAreas = editingData.serviceAreas?.[type] || [];
    const isAdding = !currentAreas.includes(slug);
    const newAreas = isAdding
      ? [...currentAreas, slug]
      : currentAreas.filter((s) => s !== slug);

    let updatedServiceAreas = {
      ...editingData.serviceAreas,
      [type]: newAreas,
    };

    // If toggling a county, automatically add/remove all cities in that county
    if (type === 'counties') {
      const countyCities = getCitiesForCounty(slug);
      const currentCities = updatedServiceAreas.cities || [];

      if (isAdding) {
        // Add all cities for this county (merge with existing, remove duplicates)
        updatedServiceAreas.cities = Array.from(
          new Set([...currentCities, ...countyCities])
        );
      } else {
        // Remove all cities for this county
        updatedServiceAreas.cities = currentCities.filter(
          (citySlug) => !countyCities.includes(citySlug)
        );
      }
    }

    setEditingData({
      ...editingData,
      serviceAreas: updatedServiceAreas,
    });
  };

  const saveRoofer = async (roofer: Roofer) => {
    try {
      const response = await fetch('/api/admin/roofers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roofers: [
            {
              slug: roofer.slug,
              phone: editingData.phone || undefined,
              email: editingData.email || undefined,
              websiteUrl: editingData.websiteUrl || undefined,
              isPreferred: editingData.isPreferred,
              isHidden: editingData.isHidden,
              googleBusinessUrl: editingData.googleBusinessUrl || undefined,
              category: editingData.category || 'general',
              serviceAreas: editingData.serviceAreas,
            },
          ],
        }),
      });

      if (response.ok) {
        await loadRoofers();
        setEditingId(null);
        setEditingData({});
      } else {
        const error = await response.json();
        if (error.code === 'BLOB_NOT_CONFIGURED') {
          alert(
            'Blob storage is not configured.\n\n' +
              'Please set BLOB_READ_WRITE_TOKEN in Vercel environment variables. ' +
              'Get your token from: https://vercel.com/docs/storage/blob/quickstart'
          );
        } else {
          alert(`Failed to update roofer: ${error.message || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Failed to save roofer:', error);
      alert('Failed to save roofer. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rif-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading roofers...</p>
          </div>
        </div>
      </div>
    );
  }

  // Filter roofers based on selected category
  const filteredRoofers = roofers.filter((roofer) => {
    if (categoryFilter === 'all') return true;
    return roofer.category === categoryFilter;
  });

  // Count roofers by category
  const categoryCounts = {
    all: roofers.length,
    preferred: roofers.filter((r) => r.category === 'preferred').length,
    sponsored: roofers.filter((r) => r.category === 'sponsored').length,
    general: roofers.filter((r) => r.category === 'general' || !r.category).length,
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-rif-black mb-2">Manage Roofers</h2>
        <p className="text-gray-600">View and manage all roofers in the system. All roofers default to General category.</p>
      </div>


      {/* Category Filter Tabs */}
      <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              categoryFilter === 'all'
                ? 'bg-rif-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({categoryCounts.all})
          </button>
          <button
            onClick={() => setCategoryFilter('preferred')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              categoryFilter === 'preferred'
                ? 'bg-blue-500 text-white'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            Certified (Preferred) ({categoryCounts.preferred})
          </button>
          <button
            onClick={() => setCategoryFilter('sponsored')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              categoryFilter === 'sponsored'
                ? 'bg-purple-500 text-white'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            Sponsored ({categoryCounts.sponsored})
          </button>
          <button
            onClick={() => setCategoryFilter('general')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              categoryFilter === 'general'
                ? 'bg-gray-500 text-white'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            General ({categoryCounts.general})
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category / Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRoofers.map((roofer) => (
                <tr key={roofer.id} className={roofer.isHidden ? 'opacity-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-gray-900">{roofer.name}</div>
                      {roofer.isPreferred && (
                        <FontAwesomeIcon
                          icon={faCertificate}
                          className="h-4 w-4 text-yellow-500"
                          title="Preferred"
                        />
                      )}
                      {roofer.isHidden && (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="h-4 w-4 text-gray-400"
                          title="Hidden"
                        />
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      <Link
                        href={`/roofers/${roofer.slug}`}
                        className="text-rif-blue-500 hover:text-rif-blue-600"
                        target="_blank"
                      >
                        View Profile →
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {editingId === roofer.id ? (
                      <div className="space-y-2 min-w-[250px]">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <input
                            type="text"
                            value={editingData.phone || ''}
                            onChange={(e) =>
                              setEditingData({ ...editingData, phone: e.target.value })
                            }
                            className="block w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-rif-blue-500 focus:ring-rif-blue-500"
                            placeholder="Phone number"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={editingData.email || ''}
                            onChange={(e) =>
                              setEditingData({ ...editingData, email: e.target.value })
                            }
                            className="block w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-rif-blue-500 focus:ring-rif-blue-500"
                            placeholder="Email address"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Website
                          </label>
                          <input
                            type="url"
                            value={editingData.websiteUrl || ''}
                            onChange={(e) =>
                              setEditingData({ ...editingData, websiteUrl: e.target.value })
                            }
                            className="block w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-rif-blue-500 focus:ring-rif-blue-500"
                            placeholder="https://example.com"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-900 space-y-1">
                        {roofer.phone && (
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faPhone} className="h-3 w-3 text-gray-400" />
                            <span>{roofer.phone}</span>
                          </div>
                        )}
                        {roofer.email && (
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faEnvelope} className="h-3 w-3 text-gray-400" />
                            <span className="text-xs">{roofer.email}</span>
                          </div>
                        )}
                        {roofer.websiteUrl && (
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faGlobe} className="h-3 w-3 text-gray-400" />
                            <a
                              href={roofer.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-rif-blue-500 hover:text-rif-blue-600 text-xs"
                            >
                              Website
                            </a>
                          </div>
                        )}
                        {!roofer.phone && !roofer.email && !roofer.websiteUrl && (
                          <span className="text-gray-400 text-xs">No contact info</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === roofer.id ? (
                      <div className="space-y-3 min-w-[300px] max-w-md">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Regions
                          </label>
                          <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2 space-y-1">
                            {regions.map((region) => (
                              <label
                                key={region.slug}
                                className="flex items-center gap-2 text-xs cursor-pointer hover:bg-gray-50 p-1 rounded"
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    editingData.serviceAreas?.regions?.includes(region.slug) ||
                                    false
                                  }
                                  onChange={() => toggleServiceArea('regions', region.slug)}
                                  className="rounded border-gray-300 text-rif-blue-500 focus:ring-rif-blue-500"
                                />
                                <span>{region.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Counties
                            <span className="text-gray-500 font-normal ml-1">
                              (selecting a county automatically includes all its cities)
                            </span>
                          </label>
                          <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2 space-y-1">
                            {counties.map((county) => (
                              <label
                                key={county.slug}
                                className="flex items-center gap-2 text-xs cursor-pointer hover:bg-gray-50 p-1 rounded"
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    editingData.serviceAreas?.counties?.includes(county.slug) ||
                                    false
                                  }
                                  onChange={() => toggleServiceArea('counties', county.slug)}
                                  className="rounded border-gray-300 text-rif-blue-500 focus:ring-rif-blue-500"
                                />
                                <span>{county.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Cities
                            <span className="text-gray-500 font-normal ml-1">
                              (automatically updated when counties are selected)
                            </span>
                          </label>
                          <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2 space-y-1">
                            {cities.map((city) => (
                              <label
                                key={city.slug}
                                className="flex items-center gap-2 text-xs cursor-pointer hover:bg-gray-50 p-1 rounded"
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    editingData.serviceAreas?.cities?.includes(city.slug) ||
                                    false
                                  }
                                  onChange={() => toggleServiceArea('cities', city.slug)}
                                  className="rounded border-gray-300 text-rif-blue-500 focus:ring-rif-blue-500"
                                />
                                <span>{city.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-900">
                        {roofer.city && roofer.state && `${roofer.city}, ${roofer.state}`}
                        {!roofer.city && roofer.state && roofer.state}
                        {!roofer.city && !roofer.state && <span className="text-gray-400">—</span>}
                        <div className="text-xs text-gray-500 mt-1">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="h-3 w-3 mr-1" />
                          {roofer.serviceAreas.regions?.length || 0} regions,{' '}
                          {roofer.serviceAreas.counties?.length || 0} counties,{' '}
                          {roofer.serviceAreas.cities?.length || 0} cities
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === roofer.id ? (
                      <div className="space-y-4 min-w-[200px]">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-2">
                            Listing Type
                          </label>
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`category-${roofer.id}`}
                                value="preferred"
                                checked={editingData.category === 'preferred'}
                                onChange={(e) =>
                                  setEditingData({
                                    ...editingData,
                                    category: 'preferred' as const,
                                    isPreferred: true,
                                  })
                                }
                                className="text-rif-blue-500 focus:ring-rif-blue-500"
                              />
                              <span className="text-sm text-gray-700">Certified (Preferred)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`category-${roofer.id}`}
                                value="sponsored"
                                checked={editingData.category === 'sponsored'}
                                onChange={(e) =>
                                  setEditingData({
                                    ...editingData,
                                    category: 'sponsored' as const,
                                    isPreferred: false,
                                  })
                                }
                                className="text-rif-blue-500 focus:ring-rif-blue-500"
                              />
                              <span className="text-sm text-gray-700">Sponsored</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`category-${roofer.id}`}
                                value="general"
                                checked={editingData.category === 'general' || !editingData.category}
                                onChange={(e) =>
                                  setEditingData({
                                    ...editingData,
                                    category: 'general' as const,
                                    isPreferred: false,
                                  })
                                }
                                className="text-rif-blue-500 focus:ring-rif-blue-500"
                              />
                              <span className="text-sm text-gray-700">General</span>
                            </label>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-gray-200">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editingData.isHidden || false}
                              onChange={(e) =>
                                setEditingData({ ...editingData, isHidden: e.target.checked })
                              }
                              className="rounded border-gray-300 text-rif-blue-500 focus:ring-rif-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Hidden from Public</span>
                          </label>
                          <p className="text-xs text-gray-500 mt-1 ml-6">
                            Check to hide this listing from public view
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div>
                          {roofer.category === 'preferred' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Certified (Preferred)
                            </span>
                          )}
                          {roofer.category === 'sponsored' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              Sponsored
                            </span>
                          )}
                          {(roofer.category === 'general' || !roofer.category) && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              General
                            </span>
                          )}
                        </div>
                        {roofer.isHidden && (
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Hidden
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingId === roofer.id ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => saveRoofer(roofer)}
                          className="text-green-600 hover:text-green-900"
                          title="Save"
                        >
                          <FontAwesomeIcon icon={faCheck} className="h-5 w-5" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-red-600 hover:text-red-900"
                          title="Cancel"
                        >
                          <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(roofer)}
                        className="text-rif-blue-600 hover:text-rif-blue-900"
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faEdit} className="h-5 w-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredRoofers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <FontAwesomeIcon icon={faUsers} className="h-12 w-12 text-gray-300 mb-4" />
          <p className="text-gray-600">
            {categoryFilter === 'all'
              ? 'No roofers found.'
              : `No ${categoryFilter === 'preferred' ? 'Certified (Preferred)' : categoryFilter} roofers found.`}
          </p>
        </div>
      )}
    </div>
  );
}
