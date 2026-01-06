import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faCalendar,
  faClock,
  faMapLocationDot,
  faUsers,
  faEnvelope,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { getEventById, getAllEvents } from '../../data/events';

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

export default function EventPage({ params }: EventPageProps) {
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
      {/* Header */}
      <section className="pt-20 pb-8 px-6 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/training"
            className="inline-flex items-center gap-2 text-rif-blue-500 hover:text-rif-blue-600 mb-6 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
            <span>Back to Training</span>
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black mb-6 tracking-tight">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendar} className="h-5 w-5 text-rif-blue-500" />
              <span className="font-medium">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faClock} className="h-5 w-5 text-rif-blue-500" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faMapLocationDot} className="h-5 w-5 text-rif-blue-500" />
              <span>{event.city}, {event.state}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-xl text-gray-700 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Sidebar */}
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
                      <p className="font-medium">{event.location}</p>
                      <p className="text-sm">{event.address}</p>
                      <p className="text-sm">{event.city}, {event.state} {event.zipCode}</p>
                    </div>
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

          {/* CTA Section */}
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
