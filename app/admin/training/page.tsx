'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faPlus,
  faTrash,
  faEdit,
  faCheck,
  faTimes,
  faMapLocationDot,
  faClock,
  faUsers,
  faSpinner,
  faEye,
  faEyeSlash,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import type { TrainingEvent } from '@/app/training/data/events';
import AddressAutocomplete from '@/components/AddressAutocomplete';

const LocationMap = dynamic(() => import('@/components/LocationMap'), { ssr: false });
const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), { ssr: false });

export default function AdminTrainingPage() {
  const [events, setEvents] = useState<TrainingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<TrainingEvent>>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    fullAddress: '',
    city: '',
    state: 'FL',
    zipCode: '',
    lat: undefined,
    lng: undefined,
    eventbriteUrl: '',
    instructor: '',
    maxAttendees: undefined,
    category: 'both',
    deliveryMode: 'in-person',
    isActive: true,
    sortOrder: undefined,
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      // Add cache busting timestamp to ensure fresh data
      const response = await fetch(`/api/admin/training-events?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events || []);
      }
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const startEdit = (event: TrainingEvent) => {
    setEditingId(event.id);
    setShowAddForm(true);
    setFormData({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      fullAddress: event.fullAddress || '',
      city: event.city,
      state: event.state,
      zipCode: event.zipCode,
      lat: event.lat,
      lng: event.lng,
      eventbriteUrl: event.eventbriteUrl || '',
      instructor: event.instructor || '',
      maxAttendees: event.maxAttendees,
      category: event.category || 'both',
      deliveryMode: event.deliveryMode || 'in-person',
      isActive: event.isActive,
      sortOrder: event.sortOrder,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      fullAddress: '',
      city: '',
      state: 'FL',
      zipCode: '',
      lat: undefined,
      lng: undefined,
      eventbriteUrl: '',
      instructor: '',
      maxAttendees: undefined,
      category: 'both',
      deliveryMode: 'in-person',
      isActive: true,
      sortOrder: undefined,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const isEditing = editingId !== null;
      const url = '/api/admin/training-events';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Small delay to ensure file is written
        await new Promise(resolve => setTimeout(resolve, 200));
        await loadEvents();
        cancelEdit();
      } else {
        const data = await response.json();
        const errorMessage = data.error || data.message || `Failed to ${isEditing ? 'update' : 'create'} event`;
        console.error('API Error:', data);
        alert(errorMessage);
      }
    } catch (error) {
      console.error(`Error ${editingId ? 'updating' : 'creating'} event:`, error);
      alert(`An error occurred while ${editingId ? 'updating' : 'creating'} the event: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleDuplicate = async (event: TrainingEvent) => {
    setDuplicatingId(event.id);
    try {
      const now = new Date().toISOString();
      const newId = `copy-${event.id}-${Date.now()}`;
      const copy: Partial<TrainingEvent> = {
        id: newId,
        title: `Copy of ${event.title}`,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        fullAddress: event.fullAddress,
        city: event.city,
        state: event.state,
        zipCode: event.zipCode,
        lat: event.lat,
        lng: event.lng,
        eventbriteUrl: '', // Clear so user can add new registration link
        instructor: event.instructor,
        maxAttendees: event.maxAttendees,
        category: event.category,
        deliveryMode: event.deliveryMode,
        isActive: false, // Start inactive so user can review before publishing
        sortOrder: event.sortOrder,
      };

      const response = await fetch('/api/admin/training-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(copy),
      });

      if (response.ok) {
        await new Promise(resolve => setTimeout(resolve, 200));
        await loadEvents();
        // Open the new event in edit mode so user can adjust date/title/eventbrite
        const data = await response.json();
        if (data.event) {
          startEdit(data.event);
        }
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to duplicate event');
      }
    } catch (error) {
      console.error('Error duplicating event:', error);
      alert('An error occurred while duplicating the event');
    } finally {
      setDuplicatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/training-events?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Small delay to ensure file is written
        await new Promise(resolve => setTimeout(resolve, 200));
        await loadEvents();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('An error occurred while deleting the event');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 text-rif-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-rif-black">Training Events</h1>
        <button
          onClick={() => {
            if (showAddForm && editingId) {
              cancelEdit();
            } else {
              setShowAddForm(!showAddForm);
            }
          }}
          className="flex items-center gap-2 px-4 py-2 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors"
        >
          <FontAwesomeIcon icon={showAddForm && !editingId ? faTimes : faPlus} className="h-4 w-4" />
          {showAddForm && !editingId ? 'Cancel' : 'Add Event'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-rif-black mb-4">
            {editingId ? 'Edit Training Event' : 'Add New Training Event'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time *
                </label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  placeholder="9:00 AM - 5:00 PM"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location Name *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., PRP WAREHOUSE"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Enter a specific name for this location</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <AddressAutocomplete
                  value={formData.fullAddress || ''}
                  onChange={(address, components) => {
                    setFormData((prev) => ({
                      ...prev,
                      fullAddress: address,
                      city: components.city || prev.city || '',
                      state: components.state || prev.state || 'FL',
                      zipCode: components.zipCode || prev.zipCode || '',
                      lat: components.lat,
                      lng: components.lng,
                    }));
                  }}
                  placeholder="Start typing an address..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Address suggestions will appear as you type. City, State, and ZIP will be automatically extracted.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude (for map)
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="lat"
                    value={formData.lat !== undefined ? formData.lat : ''}
                    onChange={(e) => {
                      const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
                      setFormData({ ...formData, lat: value });
                    }}
                    placeholder="e.g., 27.7663"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Optional: Manually enter latitude for map display</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude (for map)
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="lng"
                    value={formData.lng !== undefined ? formData.lng : ''}
                    onChange={(e) => {
                      const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
                      setFormData({ ...formData, lng: value });
                    }}
                    placeholder="e.g., -81.6868"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Optional: Manually enter longitude for map display</p>
                </div>
              </div>

              {(formData.lat && formData.lng) && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Map Preview
                  </label>
                  <LocationMap
                    lat={formData.lat}
                    lng={formData.lng}
                    address={formData.fullAddress}
                    locationName={formData.location}
                  />
                  <p className="text-xs text-gray-500 mt-1">Map will display on the event details page when both coordinates are provided</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instructor
                </label>
                <input
                  type="text"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Attendees
                </label>
                <input
                  type="number"
                  name="maxAttendees"
                  value={formData.maxAttendees}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Eventbrite URL
                </label>
                <input
                  type="url"
                  name="eventbriteUrl"
                  value={formData.eventbriteUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort Order
                </label>
                <input
                  type="number"
                  name="sortOrder"
                  value={formData.sortOrder}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category || 'both'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as 'sales' | 'installation' | 'both' })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                >
                  <option value="sales">Sales Training</option>
                  <option value="installation">Installation Training</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Mode *
                </label>
                <select
                  name="deliveryMode"
                  value={formData.deliveryMode || 'in-person'}
                  onChange={(e) => setFormData({ ...formData, deliveryMode: e.target.value as 'in-person' | 'virtual' | 'hybrid' })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                >
                  <option value="in-person">In-Person</option>
                  <option value="virtual">Virtual</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <RichTextEditor
                value={formData.description || ''}
                onChange={(value) => setFormData({ ...formData, description: value })}
                placeholder="Enter event description with rich text formatting..."
              />
              <p className="text-xs text-gray-500 mt-1">Use the toolbar above to format your description with headings, lists, links, and more.</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                id="isActive"
                checked={formData.isActive}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-rif-blue-500 border-gray-300 rounded focus:ring-rif-blue-500"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                Active (visible on website)
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-2 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors"
              >
                {editingId ? 'Update Event' : 'Create Event'}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {events.length === 0 ? (
          <div className="p-12 text-center">
            <FontAwesomeIcon icon={faCalendar} className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Training Events</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first training event.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors"
            >
              <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
              Add Event
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faCalendar} className="h-5 w-5 text-rif-blue-500" />
                        <div>
                          <div className="text-sm font-medium text-rif-black">{event.title}</div>
                          <div className="text-xs text-gray-500 line-clamp-1">{event.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{formatDate(event.date)}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <FontAwesomeIcon icon={faClock} className="h-3 w-3" />
                        {event.time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <FontAwesomeIcon icon={faMapLocationDot} className="h-3 w-3 text-rif-blue-500" />
                        {event.city}, {event.state}
                      </div>
                      <div className="text-xs text-gray-500">{event.location}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          event.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <FontAwesomeIcon icon={event.isActive ? faEye : faEyeSlash} className="h-3 w-3" />
                        {event.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDuplicate(event)}
                          disabled={duplicatingId === event.id}
                          className="inline-flex items-center gap-1 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                          title="Duplicate this event"
                        >
                          {duplicatingId === event.id ? (
                            <FontAwesomeIcon icon={faSpinner} className="h-3 w-3 animate-spin" />
                          ) : (
                            <FontAwesomeIcon icon={faCopy} className="h-3 w-3" />
                          )}
                          Duplicate
                        </button>
                        <button
                          onClick={() => startEdit(event)}
                          className="inline-flex items-center gap-1 px-3 py-1 text-sm text-rif-blue-600 hover:bg-rif-blue-50 rounded-lg transition-colors"
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-3 w-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          disabled={deletingId === event.id}
                          className="inline-flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {deletingId === event.id ? (
                            <FontAwesomeIcon icon={faSpinner} className="h-3 w-3 animate-spin" />
                          ) : (
                            <FontAwesomeIcon icon={faTrash} className="h-3 w-3" />
                          )}
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
