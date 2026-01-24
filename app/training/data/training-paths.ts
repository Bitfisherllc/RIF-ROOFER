export interface TrainingPath {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string; // FontAwesome icon name
  duration: string;
  format: string;
  topics: string[];
  benefits: string[];
  upcomingSessions?: number;
}

export const trainingPaths: Record<string, TrainingPath> = {
  'sales-training': {
    id: 'sales-training',
    title: 'STONE COATED METAL ROOFING SALES TRAINING',
    description: 'Master the art of selling stone-coated metal roofing systems. Learn product knowledge, sales techniques, and proven strategies to close more deals and grow your business.',
    longDescription: 'Transform your sales approach with our comprehensive Stone-Coated Metal Roofing Sales Training program. This intensive two-day course is designed specifically for roofing professionals who want to excel at selling premium stone-coated metal roofing systems.\n\nYou\'ll gain deep product knowledge covering all major stone-coated metal roofing brands, their unique features, and competitive advantages. Learn how to effectively communicate the value proposition of stone-coated metal roofing to homeowners, including energy efficiency, durability, and aesthetic appeal.\n\nOur expert instructors will teach you proven sales methodologies, objection handling techniques, and closing strategies that have helped hundreds of roofing professionals increase their conversion rates. You\'ll practice real-world scenarios and receive personalized feedback to improve your sales performance.\n\nPerfect for sales teams, estimators, project managers, and business owners looking to differentiate their services and command premium pricing. Upon completion, you\'ll have the knowledge, confidence, and tools needed to sell stone-coated metal roofing systems successfully.',
    icon: 'faHandshake',
    duration: '2 Days',
    format: 'In-Person & Virtual Options',
    topics: [
      'Product Knowledge & Specifications',
      'Sales Techniques & Scripts',
      'Objection Handling',
      'Pricing Strategies',
      'Customer Communication',
      'Closing Techniques',
      'Value Proposition Development',
      'Competitive Analysis',
    ],
    benefits: [
      'Increase sales conversion rates by up to 40%',
      'Build confidence in product knowledge and specifications',
      'Learn proven sales methodologies from industry experts',
      'Access to comprehensive sales materials and resources',
      'Network with other successful sales professionals',
      'Earn RIF Sales Certification',
      'Ongoing support and sales coaching',
    ],
    upcomingSessions: 3,
  },
  'installation-training': {
    id: 'installation-training',
    title: 'STONE COATED METAL ROOFING INSTALLATION TRAINING',
    description: 'Hands-on training for proper installation techniques. Learn from certified experts and become a master installer with RIF certification.',
    longDescription: 'Become a certified stone-coated metal roofing installer with our comprehensive three-day hands-on training program. This intensive course covers everything you need to know to install stone-coated metal roofing systems correctly, efficiently, and to code.\n\nOur expert instructors will guide you through every aspect of the installation process, from material handling and safety protocols to advanced installation techniques and final inspection. You\'ll learn proper flashing installation, panel alignment, fastener placement, and how to handle complex roof geometries.\n\nThe program includes extensive hands-on practice on actual roof structures, allowing you to master techniques in a controlled environment before working on customer projects. You\'ll work with real materials and tools, learning industry best practices and avoiding common installation mistakes.\n\nCode compliance is a major focus, ensuring you understand local building codes, wind ratings, and fire resistance requirements. You\'ll also learn troubleshooting techniques for common installation challenges and how to perform quality control inspections.\n\nUpon successful completion, you\'ll receive RIF Installation Certification, giving you access to priority materials, wholesale pricing, and the ability to offer manufacturer-backed warranties. This certification demonstrates your expertise to customers and sets you apart from competitors.',
    icon: 'faTools',
    duration: '3 Days',
    format: 'Hands-On In-Person',
    topics: [
      'Material Handling & Safety',
      'Installation Techniques & Best Practices',
      'Code Compliance & Building Standards',
      'Flashing & Edge Details',
      'Troubleshooting & Repairs',
      'Quality Control & Inspection',
      'Complex Roof Geometries',
      'Warranty Requirements',
    ],
    benefits: [
      'Become a RIF Certified Installer',
      'Learn from industry-leading experts',
      'Extensive hands-on practical experience',
      'Access to priority materials and inventory',
      'Wholesale pricing on materials for RIF projects',
      'Manufacturer-backed warranty eligibility',
      'Ongoing technical support and training',
      'Listing in RIF Certified Installer directory',
    ],
    upcomingSessions: 4,
  },
};

export function getAllTrainingPaths(): TrainingPath[] {
  return Object.values(trainingPaths);
}

export function getTrainingPathById(id: string): TrainingPath | undefined {
  return trainingPaths[id];
}

