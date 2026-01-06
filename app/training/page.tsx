import Link from 'next/link';
import type { Metadata } from 'next';
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
} from '@fortawesome/free-solid-svg-icons';
import { getAllTrainingPaths } from './data/training-paths';
import { getUpcomingEvents } from './data/events';

export const metadata: Metadata = {
  title: 'Training Programs | RIF Roofing',
  description: 'Professional training programs for stone-coated metal roofing sales and installation. Become a certified RIF installer and grow your business.',
};

const iconMap: Record<string, any> = {
  faHandshake: faHandshake,
  faTools: faTools,
  faCertificate: faCertificate,
  faGraduationCap: faGraduationCap,
};

export default function TrainingPage() {
  const trainingPaths = getAllTrainingPaths();
  const upcomingEvents = getUpcomingEvents();

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
                      <h3 className="text-2xl font-semibold text-rif-black mb-2 group-hover:text-rif-blue-500 transition-colors">
                        {path.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faClock} className="h-4 w-4" />
                          {path.duration}
                        </span>
                        <span className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faCalendar} className="h-4 w-4" />
                          {path.format}
                        </span>
                        {path.upcomingSessions && (
                          <span className="flex items-center gap-2 text-rif-blue-500 font-medium">
                            <FontAwesomeIcon icon={faCalendar} className="h-4 w-4" />
                            {path.upcomingSessions} upcoming sessions
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {path.description}
                  </p>

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
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black mb-4">
            Upcoming Training Events
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl">
            Join us for hands-on training sessions across Florida. Register now to secure your spot.
          </p>

          {upcomingEvents.length === 0 ? (
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
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/training/events/${event.id}`}
                  className="group block bg-white border border-gray-200 rounded-xl p-6 hover:border-rif-blue-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-rif-black mb-2 group-hover:text-rif-blue-500 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {event.description}
                      </p>
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
                      <span>{event.location}, {event.city}, {event.state}</span>
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
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Contact us to learn more about our training programs or register for an upcoming event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:813-777-8272"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rif-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-rif-blue-600 transition-colors"
            >
              <FontAwesomeIcon icon={faCalendar} className="h-5 w-5" />
              Call: 813-777-8272
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-rif-blue-500 text-rif-blue-500 text-lg font-semibold rounded-lg hover:bg-rif-blue-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
