export type TrainingEventCategory = 'sales' | 'installation' | 'both';
export type DeliveryMode = 'in-person' | 'virtual' | 'hybrid';

export interface TrainingEvent {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  time: string; // e.g., "9:00 AM - 5:00 PM"
  location: string; // Location name (e.g., "PRP WAREHOUSE")
  fullAddress?: string; // Full formatted address from Google Places
  city: string;
  state: string;
  zipCode: string;
  lat?: number; // Latitude from Google Places
  lng?: number; // Longitude from Google Places
  eventbriteUrl: string;
  instructor?: string;
  maxAttendees?: number;
  category: TrainingEventCategory;
  deliveryMode: DeliveryMode; // in-person, virtual, or hybrid
  isActive: boolean;
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;
}

// Sample training events
export const trainingEvents: Record<string, TrainingEvent> = {
  'rif-certification-miami-2024-03': {
    id: 'rif-certification-miami-2024-03',
    title: "STONE COATED METAL ROOFING SALES AND TRAINING EVENT",
    description: "<h2>Overview</h2><p>Level up your stone coated metal roofing sales and installation skills in one full day—QUEENTILE + KnightShield training.</p><p><br></p><p>STONE COATED METAL ROOFING SALES &amp; INSTALLATION TRAINING (CATERED LUNCH INCLUDED)</p><p>Premium Roofing Products (PRP Roofing Products)&nbsp;is inviting Florida roofing companies to a full-day training event focused on</p><p>stone coated metal roofing. Sales training will be provided, and product/installation training will be covered throughout the day.</p><p>Therefore, owners, sales reps, estimators, and lead installers are encouraged to attend together.</p><h2>EVENT LOCATION &amp; COST</h2><p><br></p><p>PRP Roofing Warehouse</p><p>8037 Treiman Blvd, Webster, FL 33597</p><p>Cost:&nbsp;$100 per person</p><h2>TRAINING SCHEDULE</h2><p><br></p><ul><li>9:00 – 10:15&nbsp;— QUEENTILE Sales Training</li><li>10:15 – 11:30&nbsp;— QUEENTILE Material / Install Training</li><li>Catered Lunch Break</li><li>12:30 – 1:45&nbsp;— KnightShield Sales Training</li><li>1:45 – 3:00&nbsp;— KnightShield Product Training</li><li><br></li></ul><h2>SALES TRAINING FOR QUEENTILE + KNIGHTSHIELD</h2><p>Join us for our next&nbsp;Stone Coated Metal Roofing Sales Training Seminar&nbsp;at the PRP Roofing warehouse.</p><p>This sales-focused training is designed to give roofing professionals the tools and knowledge needed to outperform the competition and grow their business in one of the fastest-growing segments of the industry.</p><p>First, the essentials will be covered, so that your team can speak clearly and confidently. Product details, terminology, and the parts, pieces, and accessories that make up a complete stone coated system will be explained.</p><p>Then, proven approaches will be shared for presenting stone coated metal roofing against traditional shingle or tile.</p><p>Next, tough objections will be addressed.</p><p>Pricing questions, warranty conversations, sustainability concerns, and insurance-related topics in Florida will be discussed.</p><p>As a result, better close rates can be achieved, and conversations can be handled with less hesitation.</p><p>Finally, selling techniques, upsell strategies, and role-play exercises will be used so your team can sharpen communication and perform more consistently in the field.</p><p><br></p><h3>W. R. MEADOWS — SILICONE RESTORATION SEMINAR</h3><p>Sales instruction will include a featured session from&nbsp;W. R. MEADOWS, led by&nbsp;Christopher Korn.</p><p>This Silicone Restoration Seminar is designed to show how silicone restoration solutions can be positioned as a profitable option when the roof qualifies.</p><p>Therefore, new revenue opportunities can be created through better inspection, better scope definition, and better customer education.</p><p><br></p><h3>LEARN HOW SILICONE CAN MAKE YOU $$$</h3><p>Silicone systems will be discussed through real-world use cases.</p><p>Roof coating fundamentals will be covered, and maintenance program opportunities will be explained.</p><p>In addition, warranties and system options will be reviewed so expectations can be set clearly during the sales process.</p><ul><li>Roof Coatings 101</li><li>Maintenance Programs</li><li>Commercial / Residential Opportunities</li><li>How roof life-cycles can be extended</li><li>Certifications</li><li>Hands-On Training</li><li>Warranties and 10 / 15 / 20-year systems</li><li><br></li></ul><h2>QUEENTILE MATERIAL &amp; INSTALL TRAINING</h2><p><br></p><p>QUEENTILE material and installation training will be delivered for teams that want cleaner installs and fewer field issues.</p><p>Key components will be reviewed, and system details will be explained so correct decisions can be made on the roof.</p><p>Therefore, installers can move faster with fewer mistakes, and managers can reduce call-backs.</p><p>More product information can be reviewed here:</p><p><a href=\"https://prproofing.com/manufacturers/queen-tile/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(54, 89, 227); background-color: transparent;\">QUEENTILE at PRP Roofing Products</a></p><h2>KNIGHTSHIELD PRODUCT TRAINING</h2><p><br></p><p>KnightShield product training will be focused on how silicone restoration systems are used and where they fit.</p><p>System components will be reviewed, and practical application questions will be addressed.</p><p>As a result, restoration opportunities can be bid more accurately, and project outcomes can be improved.</p><p>More product information can be reviewed here:</p><p><a href=\"https://prproofing.com/manufacturers/knight-shield/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(54, 89, 227); background-color: transparent;\">KnightShield at PRP Roofing Products</a></p><h2>WHAT YOU’LL LEARN</h2><p><br></p><ul><li>How stone coated metal roofing systems can be positioned and sold more effectively</li><li>How customers can be educated on value, longevity, and performance</li><li>How metal roofing can be upsold over shingles or tile</li><li>How pricing and warranty questions can be handled with confidence</li><li>How silicone restoration can be introduced as an additional revenue stream</li></ul><h2>WHAT’S INCLUDED</h2><p><br></p><ul><li>Professional Sales Kit Folder&nbsp;+&nbsp;Sample Product Kit</li><li>Catered lunch and time to network with other roofing professionals</li><li>Warehouse environment learning and interactive Q&amp;A</li><li>Exclusive access to PRP’s&nbsp;Preferred Roofer Network Opportunities</li></ul><h2>HANDS-ON TRAINING ENVIRONMENT</h2><p><br></p><p>This training format is based on what has worked during our prior installation certification events.</p><p>A detailed walkthrough of top product lines has been provided in the past, and interactive learning has been emphasized.</p><p>Therefore, real questions can be answered, and field confidence can be built faster.</p><ul><li>Warehouse tour and interactive Q&amp;A</li><li>Step-by-step instruction from experienced stone coated steel installers</li><li>Hands-on demos on our oversized “Dog House” training deck (5-square low-profile mock-up with valleys, hips, ridges, and rakes)</li></ul><h2>REGISTER NOW — LIMITED SPOTS</h2><p><br></p><p>Seats are limited, and registration is required.</p><p>PRP Roofing Products</p><p>Leading the Way in Stone Coated Metal Roofing</p><p>8037 Treiman Blvd, Webster, FL 33597</p>",
    date: '2026-02-27',
    time: '9:00 AM - 3:00 PM',
    location: "PRP Warehouse Training Center",
    fullAddress: "8037 Treiman Blvd, Webster FL",
    city: "Miami",
    state: "FL",
    zipCode: '33101',
    lat: 28.543793,
    lng: -82.162358,
    eventbriteUrl: "https://www.eventbrite.com/e/stone-coated-metal-roofing-sales-and-training-event-tickets-1980139846585?aff=oddtdtcreator&utm-source=cp&utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=listing",
    instructor: "TBA",
    maxAttendees: 30,
    category: 'both',
    deliveryMode: 'in-person',
    isActive: true,
    sortOrder: 1,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2026-01-12T19:58:33.943Z',
  }
};export function getAllEvents(): TrainingEvent[] {
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






