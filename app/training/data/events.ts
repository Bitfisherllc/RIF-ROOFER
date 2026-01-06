export interface TrainingEvent {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  time: string; // e.g., "9:00 AM - 5:00 PM"
  location: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  eventbriteUrl: string;
  instructor?: string;
  maxAttendees?: number;
  isActive: boolean;
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;
}

// Sample training events
export const trainingEvents: Record<string, TrainingEvent> = {
  'rif-certification-miami-2024-03': {
    id: 'rif-certification-miami-2024-03',
    title: 'RIF Certification Training - Miami',
    description: 'Comprehensive stone-coated metal roofing installation training covering product knowledge, installation techniques, and code compliance. This hands-on training session will prepare you to become a certified RIF installer.',
    date: '2024-03-15',
    time: '9:00 AM - 5:00 PM',
    location: 'Miami Training Center',
    address: '1234 Training Way',
    city: 'Miami',
    state: 'FL',
    zipCode: '33101',
    eventbriteUrl: 'https://www.eventbrite.com/e/rif-certification-miami',
    instructor: 'John Smith',
    maxAttendees: 25,
    isActive: true,
    sortOrder: 1,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  'rif-certification-tampa-2024-04': {
    id: 'rif-certification-tampa-2024-04',
    title: 'RIF Certification Training - Tampa',
    description: 'Join us for an intensive day of training on stone-coated metal roofing systems. Learn proper installation methods, safety protocols, and best practices from industry experts.',
    date: '2024-04-20',
    time: '8:00 AM - 4:00 PM',
    location: 'Tampa Bay Convention Center',
    address: '5678 Convention Blvd',
    city: 'Tampa',
    state: 'FL',
    zipCode: '33602',
    eventbriteUrl: 'https://www.eventbrite.com/e/rif-certification-tampa',
    instructor: 'Sarah Johnson',
    maxAttendees: 30,
    isActive: true,
    sortOrder: 2,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
  },
  'rif-certification-orlando-2024-05': {
    id: 'rif-certification-orlando-2024-05',
    title: 'RIF Certification Training - Orlando',
    description: 'Master the art of stone-coated metal roofing installation. This training covers everything from material handling to final inspection, ensuring you meet RIF certification standards.',
    date: '2024-05-10',
    time: '9:00 AM - 5:00 PM',
    location: 'Orlando Technical Institute',
    address: '9012 Education Drive',
    city: 'Orlando',
    state: 'FL',
    zipCode: '32801',
    eventbriteUrl: 'https://www.eventbrite.com/e/rif-certification-orlando',
    instructor: 'Mike Davis',
    maxAttendees: 20,
    isActive: true,
    sortOrder: 3,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z',
  },
  'rif-certification-jacksonville-2024-06': {
    id: 'rif-certification-jacksonville-2024-06',
    title: 'RIF Certification Training - Jacksonville',
    description: 'Complete your RIF certification with this comprehensive training session. Learn advanced installation techniques, troubleshooting, and how to maximize your business opportunities as a certified installer.',
    date: '2024-06-05',
    time: '8:30 AM - 4:30 PM',
    location: 'Jacksonville Training Facility',
    address: '3456 Training Lane',
    city: 'Jacksonville',
    state: 'FL',
    zipCode: '32202',
    eventbriteUrl: 'https://www.eventbrite.com/e/rif-certification-jacksonville',
    instructor: 'Robert Wilson',
    maxAttendees: 28,
    isActive: true,
    sortOrder: 4,
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z',
  },
};

export function getAllEvents(): TrainingEvent[] {
  return Object.values(trainingEvents)
    .filter(event => event.isActive)
    .sort((a, b) => {
      // Sort by date, then by sortOrder
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (dateA !== dateB) {
        return dateA - dateB;
      }
      return (a.sortOrder || 999) - (b.sortOrder || 999);
    });
}

export function getEventById(id: string): TrainingEvent | undefined {
  return trainingEvents[id];
}

export function getUpcomingEvents(): TrainingEvent[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return getAllEvents().filter(event => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  });
}





