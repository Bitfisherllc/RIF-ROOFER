import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faCalendar,
  faClock,
  faMapLocationDot,
  faUsers,
  faEnvelope,
  faExternalLinkAlt,
  faLaptop,
  faBuilding,
} from '@fortawesome/free-solid-svg-icons';
import { getEventById, getAllEvents } from '@/app/training/data/events';

const LocationMap = dynamic(() => import('@/components/LocationMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
      <p className="text-gray-500 text-sm">Loading map...</p>
    </div>
  ),
});

interface EventPageProps {
  params: { eventId: string };
}

export async function generateStaticParams() {
  const events = getAllEvents();
  return events.map((event) => ({
    eventId: event.id,
  }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = getEventById(params.eventId);

  if (!event) {
    return {
      title: 'Training Event Not Found | RIF Roofing',
    };
  }

  return {
    title: `${event.title} | RIF Training`,
    description: event.description,
  };
}

export default function TrainingScheduleEventPage({ params }: EventPageProps) {
  const event = getEventById(params.eventId);

  if (!event) {
    notFound();
  }

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-20 pb-8 px-6 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/training-schedule"
            className="inline-flex items-center gap-2 text-rif-blue-500 hover:text-rif-blue-600 mb-6 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
            <span>Back to Training Schedule</span>
          </Link>

          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black tracking-tight flex-1">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                event.category === 'sales'
                  ? 'bg-blue-100 text-blue-800'
                  : event.category === 'installation'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {event.category === 'sales'
                  ? 'Sales Training'
                  : event.category === 'installation'
                  ? 'Installation Training'
                  : 'Both'}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                event.deliveryMode === 'in-person'
                  ? 'bg-orange-100 text-orange-800'
                  : event.deliveryMode === 'virtual'
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-teal-100 text-teal-800'
              }`}>
                {event.deliveryMode === 'in-person'
                  ? 'In-Person'
                  : event.deliveryMode === 'virtual'
                  ? 'Virtual'
                  : 'Hybrid'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendar} className="h-5 w-5 text-rif-blue-500" />
              <span className="font-medium">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faClock} className="h-5 w-5 text-rif-blue-500" />
              <span>{event.time}</span>
            </div>
            {event.deliveryMode !== 'virtual' && (
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faMapLocationDot} className="h-5 w-5 text-rif-blue-500" />
                <span>{event.fullAddress || `${event.city}, ${event.state}`}</span>
              </div>
            )}
            {event.deliveryMode === 'virtual' && (
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faLaptop} className="h-5 w-5 text-rif-blue-500" />
                <span>Virtual Event</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <article className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="prose prose-lg max-w-none mb-8">
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: event.description }}
                />
              </div>

              {event.deliveryMode !== 'virtual' && event.lat && event.lng && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-rif-black mb-4">Location</h3>
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    <LocationMap
                      lat={event.lat}
                      lng={event.lng}
                      address={event.fullAddress || `${event.location}, ${event.city}, ${event.state} ${event.zipCode}`}
                      locationName={event.location}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 sticky top-24">
                <h2 className="text-xl font-semibold text-rif-black mb-6">Event Details</h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-1">
                      <FontAwesomeIcon icon={faCalendar} className="h-4 w-4" />
                      Date
                    </div>
                    <p className="text-gray-900">{formattedDate}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-1">
                      <FontAwesomeIcon icon={faClock} className="h-4 w-4" />
                      Time
                    </div>
                    <p className="text-gray-900">{event.time}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-1">
                      <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4" />
                      Location
                    </div>
                    <div className="text-gray-900">
                      {event.location && (
                        <p className="font-medium mb-1">{event.location}</p>
                      )}
                      {event.fullAddress ? (
                        <p className="text-sm">{event.fullAddress}</p>
                      ) : (
                        <p className="text-sm">{event.city}, {event.state} {event.zipCode}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-1">
                      <FontAwesomeIcon icon={faBuilding} className="h-4 w-4" />
                      Category
                    </div>
                    <p className="text-gray-900">
                      {event.category === 'sales'
                        ? 'Sales Training'
                        : event.category === 'installation'
                        ? 'Installation Training'
                        : 'Both Sales & Installation'}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-1">
                      <FontAwesomeIcon
                        icon={event.deliveryMode === 'virtual' ? faLaptop : event.deliveryMode === 'hybrid' ? faBuilding : faMapLocationDot}
                        className="h-4 w-4"
                      />
                      Delivery Mode
                    </div>
                    <p className="text-gray-900">
                      {event.deliveryMode === 'in-person'
                        ? 'In-Person'
                        : event.deliveryMode === 'virtual'
                        ? 'Virtual'
                        : 'Hybrid'}
                    </p>
                  </div>

                  {event.instructor && (
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-1">
                        <FontAwesomeIcon icon={faUsers} className="h-4 w-4" />
                        Instructor
                      </div>
                      <p className="text-gray-900">{event.instructor}</p>
                    </div>
                  )}

                  {event.maxAttendees && (
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-1">
                        <FontAwesomeIcon icon={faUsers} className="h-4 w-4" />
                        Capacity
                      </div>
                      <p className="text-gray-900">{event.maxAttendees} attendees</p>
                    </div>
                  )}
                </div>

                {event.eventbriteUrl && (
                  <a
                    href={event.eventbriteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-6 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium mb-4"
                  >
                    Register on Eventbrite
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="h-4 w-4 ml-2 inline" />
                  </a>
                )}

                <Link
                  href="/contact"
                  className="block w-full text-center px-6 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="bg-rif-blue-50 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-semibold text-rif-black mb-4">
                Questions About This Event?
              </h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Contact us for more information about this training event or to learn about other training opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:813-777-8272"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
                  Call: 813-777-8272
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
