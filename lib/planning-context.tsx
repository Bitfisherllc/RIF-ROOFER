export interface PlanningData {
  savedRoofers?: Array<{
    slug: string;
    name: string;
    phone?: string;
    email?: string;
    websiteUrl?: string;
    contacted?: boolean;
    quoteReceived?: boolean;
    notes?: string;
  }>;
  savedProducts?: Array<{
    slug: string;
    name: string;
    category?: string;
    logo?: string;
  }>;
  savedLocations?: Array<{
    type: string;
    name: string;
    slug: string;
    path: string;
    county?: string;
    region?: string;
    notes?: string;
  }>;
  checklist?: Record<string, boolean>;
  timeline?: {
    startDate?: string;
    targetDate?: string;
    notes?: string;
  };
  projectNotes?: string;
}
