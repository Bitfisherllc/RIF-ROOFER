'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faCalendar,
  faMapLocationDot,
  faClock,
  faUsers,
  faArrowRight,
  faHandshake,
  faTools,
  faCertificate,
  faFilter,
  faSpinner,
  faSync,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { getAllTrainingPaths } from './data/training-paths';
import type { TrainingEvent, TrainingEventCategory } from './data/events';

const iconMap: Record<string, any> = {
  faHandshake: faHandshake,
  faTools: faTools,
  faCertificate: faCertificate,
  faGraduationCap: faGraduationCap,
};

export default function TrainingPage() {
  const trainingPaths = getAllTrainingPaths();
  const [events, setEvents] = useState<TrainingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TrainingEventCategory | 'all'>('all');

  // Fetch events from API to get fresh data
  const loadEvents = async (showRefreshing = false) => {
    if (showRefreshing) {
      setRefreshing(true);
    }
    try {
      // Add cache busting to ensure fresh data
      const response = await fetch(`/api/training-events?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
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
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadEvents();

    // Refresh events more frequently to pick up changes (every 10 seconds)
    const interval = setInterval(() => loadEvents(false), 10000);
    return () => clearInterval(interval);
  }, []);

  // Filter events by category
  const filteredEvents = selectedCategory === 'all'
    ? events
    : events.filter(event => 
        event.category === selectedCategory || event.category === 'both'
      );

  // Helper function to get upcoming events for a training path
  const getUpcomingEventsForPath = (pathId: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Map path IDs to categories
    const categoryMap: Record<string, 'sales' | 'installation'> = {
      'sales-training': 'sales',
      'installation-training': 'installation',
    };
    
    const category = categoryMap[pathId];
    if (!category) return [];
    
    return events
      .filter(event => {
        if (!event.isActive) return false;
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        if (eventDate < today) return false;
        
        // Match events that are for this category or 'both'
        return event.category === category || event.category === 'both';
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
      });
  };

  // Helper function to get delivery mode summary
  const getDeliveryModeSummary = (upcomingEvents: TrainingEvent[]) => {
    const modes = new Set(upcomingEvents.map(e => e.deliveryMode));
    if (modes.size === 0) return null;
    if (modes.size === 1) {
      const mode = Array.from(modes)[0];
      return mode === 'in-person' ? 'In-Person' : mode === 'virtual' ? 'Virtual' : 'Hybrid';
    }
    if (modes.has('hybrid')) return 'Hybrid & Mixed';
    if (modes.has('in-person') && modes.has('virtual')) return 'In-Person & Virtual';
    return 'Mixed';
  };

  const getCategoryLabel = (category: TrainingEventCategory) => {
    switch (category) {
      case 'sales':
        return 'Sales Training';
      case 'installation':
        return 'Installation Training';
      case 'both':
        return 'Both';
      default:
        return category;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-rif-blue-500 rounded-2xl">
              <FontAwesomeIcon icon={faGraduationCap} className="h-12 w-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black tracking-tight">
                Training Programs
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                Professional development for roofing professionals
              </p>
            </div>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
            Advance your career with comprehensive training programs in stone-coated metal roofing sales and installation. 
            Our expert-led courses prepare you for RIF certification and help you grow your business.
          </p>
        </div>
      </section>

      {/* Training Paths Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black mb-4">
            Training Programs
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl">
            Choose from our comprehensive training programs designed to help you excel in stone-coated metal roofing.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {trainingPaths.map((path) => {
              const IconComponent = iconMap[path.icon] || faGraduationCap;
              const upcomingEvents = getUpcomingEventsForPath(path.id);
              const nextEvent = upcomingEvents[0];
              const deliveryModeSummary = getDeliveryModeSummary(upcomingEvents);
              
              return (
                <Link
                  key={path.id}
                  href={`/training/${path.id}`}
                  className="group block bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-rif-blue-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-4 bg-rif-blue-100 rounded-xl group-hover:bg-rif-blue-200 transition-colors">
                      <FontAwesomeIcon icon={IconComponent} className="h-8 w-8 text-rif-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-2xl font-semibold text-rif-black group-hover:text-rif-blue-500 transition-colors">
                          {path.title}
                        </h3>
                        {upcomingEvents.length > 0 && (
                          <span className="flex items-center gap-1.5 px-3 py-1 bg-rif-blue-100 text-rif-blue-700 rounded-full text-sm font-semibold whitespace-nowrap">
                            <FontAwesomeIcon icon={faCalendar} className="h-3.5 w-3.5" />
                            {upcomingEvents.length} {upcomingEvents.length === 1 ? 'Event' : 'Events'}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        {nextEvent && (
                          <span className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faClock} className="h-4 w-4" />
                            {nextEvent.time}
                          </span>
                        )}
                        {deliveryModeSummary && (
                          <span className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faCalendar} className="h-4 w-4" />
                            {deliveryModeSummary}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {path.description}
                  </p>

                  {nextEvent && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm font-semibold text-rif-black mb-2">Next Session:</p>
                      <div className="space-y-1 text-sm text-gray-700">
                        <p className="font-medium">
                          {new Date(nextEvent.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                        <p>{nextEvent.time}</p>
                        {nextEvent.deliveryMode === 'in-person' && (
                          <p>{nextEvent.location}, {nextEvent.city}, {nextEvent.state}</p>
                        )}
                        {nextEvent.deliveryMode === 'virtual' && nextEvent.eventbriteUrl && (
                          <p className="text-rif-blue-500">Virtual Event</p>
                        )}
                        {nextEvent.deliveryMode === 'hybrid' && (
                          <p>{nextEvent.location}, {nextEvent.city}, {nextEvent.state} (Hybrid)</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-rif-blue-500 font-medium group-hover:text-rif-blue-600 transition-colors">
                      Learn More
                    </span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="h-5 w-5 text-rif-blue-500 group-hover:translate-x-2 transition-transform"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-rif-black mb-4">
                Upcoming Training Events
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl">
                Join us for hands-on training sessions across Florida. Register now to secure your spot.
              </p>
            </div>
            <button
              onClick={() => loadEvents(true)}
              disabled={refreshing}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <FontAwesomeIcon 
                icon={faSync} 
                className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} 
              />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FontAwesomeIcon icon={faFilter} className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filter by Category:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-rif-blue-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setSelectedCategory('sales')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'sales'
                    ? 'bg-rif-blue-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Sales Training
              </button>
              <button
                onClick={() => setSelectedCategory('installation')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'installation'
                    ? 'bg-rif-blue-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Installation Training
              </button>
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
              <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 text-rif-blue-500 animate-spin mb-4 mx-auto" />
              <p className="text-gray-600">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
              <FontAwesomeIcon icon={faCalendar} className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Upcoming Events</h3>
              <p className="text-gray-600 mb-6">
                New training events are being scheduled. Please check back soon or contact us for more information.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
              <FontAwesomeIcon icon={faCalendar} className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Events in This Category</h3>
              <p className="text-gray-600 mb-6">
                There are no upcoming events in the selected category. Try selecting a different filter or check back soon.
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors"
              >
                Show All Events
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/training/events/${event.id}`}
                  className="group block bg-white border border-gray-200 rounded-xl p-6 hover:border-rif-blue-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-rif-black group-hover:text-rif-blue-500 transition-colors">
                          {event.title}
                        </h3>
                      </div>
                      <span className="inline-block px-2 py-1 mb-2 text-xs font-medium rounded-full bg-rif-blue-100 text-rif-blue-700">
                        {getCategoryLabel(event.category)}
                      </span>
                      <div 
                        className="text-gray-600 text-sm mt-2 prose prose-sm max-w-none overflow-hidden"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                        dangerouslySetInnerHTML={{ __html: event.description }}
                      />
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FontAwesomeIcon icon={faCalendar} className="h-4 w-4 text-rif-blue-500" />
                      <span>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FontAwesomeIcon icon={faClock} className="h-4 w-4 text-rif-blue-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 text-rif-blue-500" />
                      <span>{event.fullAddress || `${event.location}, ${event.city}, ${event.state}`}</span>
                    </div>
                    {event.instructor && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FontAwesomeIcon icon={faUsers} className="h-4 w-4 text-rif-blue-500" />
                        <span>Instructor: {event.instructor}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm font-medium text-rif-blue-500 group-hover:text-rif-blue-600 transition-colors">
                      View Details
                    </span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="h-4 w-4 text-rif-blue-500 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Have questions about our training programs? We're here to help! Call or email us for more information.
          </p>
          <p className="text-base text-gray-600 mb-8 leading-relaxed">
            <strong>Register online:</strong> Click on any event above to view details and register through Eventbrite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:813-777-8272"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rif-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-rif-blue-600 transition-colors"
            >
              <FontAwesomeIcon icon={faPhone} className="h-5 w-5" />
              Call: 813-777-8272
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-rif-blue-500 text-rif-blue-500 text-lg font-semibold rounded-lg hover:bg-rif-blue-50 transition-colors"
            >
              <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
              Email Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
