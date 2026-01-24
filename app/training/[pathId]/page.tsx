import Link from 'next/link';
import { notFound } from 'next/navigation';
import { readFileSync } from 'fs';
import { join } from 'path';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faCalendar,
  faMapLocationDot,
  faClock,
  faUsers,
  faArrowRight,
  faCheckCircle,
  faHandshake,
  faTools,
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import type { TrainingPath } from '@/app/training/data/training-paths';
import type { TrainingEvent } from '@/app/training/data/events';
import { getAllEvents } from '../data/events';

const iconMap: Record<string, any> = {
  faHandshake: faHandshake,
  faTools: faTools,
  faGraduationCap: faGraduationCap,
};

// Read training paths directly from file (same approach as API)
function readPrograms(): Record<string, TrainingPath> {
  try {
    const PROGRAMS_FILE_PATH = join(process.cwd(), 'app', 'training', 'data', 'training-paths.ts');
    const content = readFileSync(PROGRAMS_FILE_PATH, 'utf-8');
    const match = content.match(/export const trainingPaths:\s*Record<string,\s*TrainingPath>\s*=\s*\{([\s\S]*?)\};/);
    
    if (!match) {
      const programsModule = require('@/app/training/data/training-paths');
      return programsModule.trainingPaths || {};
    }
    
    const programsContent = match[1];
    try {
      const programsObj = new Function(`
        const trainingPaths = {${programsContent}};
        return trainingPaths;
      `)();
      
      if (programsObj && typeof programsObj === 'object') {
        return programsObj;
      }
    } catch (evalError) {
      console.error('Error evaluating programs content:', evalError);
    }
    
    const programsModule = require('@/app/training/data/training-paths');
    return programsModule.trainingPaths || {};
  } catch (error) {
    console.error('Error reading programs file:', error);
    const programsModule = require('@/app/training/data/training-paths');
    return programsModule.trainingPaths || {};
  }
}

interface TrainingPathPageProps {
  params: { pathId: string };
}

export default function TrainingPathPage({ params }: TrainingPathPageProps) {
  const pathId = params.pathId;
  const trainingPaths = readPrograms();
  const path = trainingPaths[pathId];
  
  if (!path) {
    notFound();
  }

  // Get upcoming events for this path
  const categoryMap: Record<string, 'sales' | 'installation'> = {
    'sales-training': 'sales',
    'installation-training': 'installation',
  };
  const category = categoryMap[pathId];
  const allEvents = getAllEvents();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = allEvents
    .filter(event => {
      if (!event.isActive) return false;
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      if (eventDate < today) return false;
      return event.category === category || event.category === 'both';
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });

  const IconComponent = iconMap[path.icon] || faGraduationCap;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/training"
            className="inline-flex items-center gap-2 text-rif-blue-500 hover:text-rif-blue-600 mb-6 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 rotate-180" />
            Back to Training Programs
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-rif-blue-500 rounded-2xl">
              <FontAwesomeIcon icon={IconComponent} className="h-12 w-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black tracking-tight">
                {path.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              {path.description}
            </p>
            <div 
              className="text-gray-700 leading-relaxed prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: path.longDescription }}
            />
          </div>
        </div>
      </section>

      {/* Topics & Benefits Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Topics */}
            <div>
              <h2 className="text-2xl font-semibold text-rif-black mb-6">What You'll Learn</h2>
              <ul className="space-y-3">
                {path.topics.map((topic, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-2xl font-semibold text-rif-black mb-6">Program Benefits</h2>
              <ul className="space-y-3">
                {path.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-rif-black mb-8">
              Upcoming Sessions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/training/events/${event.id}`}
                  className="group block bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-rif-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-rif-black group-hover:text-rif-blue-500 transition-colors">
                      {event.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.deliveryMode === 'in-person' 
                        ? 'bg-blue-100 text-blue-800'
                        : event.deliveryMode === 'virtual'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {event.deliveryMode === 'in-person' ? 'In-Person' : event.deliveryMode === 'virtual' ? 'Virtual' : 'Hybrid'}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
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
                    {event.deliveryMode !== 'virtual' && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 text-rif-blue-500" />
                        <span>{event.fullAddress || `${event.location}, ${event.city}, ${event.state}`}</span>
                      </div>
                    )}
                    {event.instructor && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FontAwesomeIcon icon={faUsers} className="h-4 w-4 text-rif-blue-500" />
                        <span>Instructor: {event.instructor}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm font-medium text-rif-blue-500 group-hover:text-rif-blue-600 transition-colors">
                      View Details & Register
                    </span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="h-4 w-4 text-rif-blue-500 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Have questions about this training program? We're here to help! Call or email us for more information.
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
