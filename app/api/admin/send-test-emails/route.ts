import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  getContactNotificationEmailHtml,
  getEstimateNotificationEmailHtml,
  getRooferFullApplyNotificationEmailHtml,
  getGeneralListingsNotificationEmailHtml,
} from '@/lib/email-templates';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/** Sample data for each form type so you can see what the HTML emails look like. */
const SAMPLE = {
  contactResident: {
    userType: 'resident',
    residentIntent: 'general',
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    phone: '(813) 555-1234',
    message: 'I have a question about stone-coated metal roofing for my home. When is the best time of year to schedule a replacement?',
    preferredContact: 'email',
    bestTimeToContact: 'afternoon',
    hearAboutUs: 'search',
  },
  contactManufacturer: {
    userType: 'manufacturer',
    fullName: 'Bob Smith',
    email: 'bob@acmeroofing.com',
    phone: '(305) 555-5678',
    companyName: 'Acme Metal Roofing',
    message: 'We would like to explore a preferred supplier relationship and have our products featured on your site.',
    preferredContact: 'phone',
    bestTimeToContact: 'morning',
    hearAboutUs: 'referral',
    productName: 'Acme Stone-Coated Panels',
    productDescription: 'Premium stone-coated steel roofing with 50-year warranty and multiple color options.',
    manufacturerPreferredSupplier: 'yes',
    manufacturerWebsite: 'https://acmeroofing.com',
  },
  estimate: {
    fullName: 'John Homeowner',
    email: 'john@example.com',
    phone: '(727) 555-9999',
    propertyAddress: '456 Oak Street',
    city: 'Tampa',
    zipCode: '33602',
    projectType: 'roof-replacement',
    roofSize: '2200',
    preferredContact: 'phone',
    bestTimeToContact: 'morning',
    additionalNotes: 'Looking for a quote to replace our current roof with stone-coated metal. We have 2 saved roofers and 1 product of interest.',
    savedRoofers: [
      { id: '1', slug: 'sample-roofer', name: 'Sample Preferred Roofer', phone: '(813) 555-0001', email: 'contact@sample.com', listingType: 'preferred' as const },
      { id: '2', slug: 'another-roofer', name: 'Another Sponsored Roofer', phone: '(813) 555-0002', listingType: 'sponsored' as const },
    ],
    savedProducts: [{ slug: 'decra', name: 'DECRA Metal Roofing', category: 'Stone-Coated Metal' }],
    savedLocations: [{ type: 'region', name: 'Sun Coast', path: '/service-areas/sun-coast' }],
  },
  preferredContractor: {
    companyName: 'Test Roofing Co',
    dba: 'Test Roofing',
    phone: '(813) 555-1111',
    email: 'apply@testroofing.com',
    websiteUrl: 'https://testroofing.com',
    address: '100 Main St',
    city: 'Tampa',
    state: 'FL',
    zipCode: '33601',
    contactName: 'Mike Contractor',
    contactTitle: 'Owner',
    preferredContact: 'phone',
    licenseNumber: 'CCC1234567',
    liabilityInsurance: 'yes',
    liabilityCarrier: 'State Farm',
    liabilityPolicy: 'POL-001',
    workersComp: 'yes',
    workersCompDetails: 'Carrier XYZ',
    bbbAccredited: 'yes',
    bbbUrl: 'https://www.bbb.org/example',
    regions: ['sun-coast'],
    counties: ['hillsborough'],
    additionalCities: 'St. Petersburg',
    aboutText: 'We are a full-service roofing company with 15 years of experience in stone-coated metal installation and repair. Family-owned and committed to quality.',
    yearsInBusiness: '15',
    specialties: ['Residential Roofing', 'Roof Replacement', 'Stone-Coated Metal Roofing'],
    googleBusinessUrl: 'https://g.page/testroofing',
    hearAboutUs: 'search',
    message: 'Looking forward to joining the RIF network as a preferred contractor.',
  },
  sponsoredSubscription: {
    companyName: 'Sponsored Roofing LLC',
    dba: '',
    phone: '(813) 555-2222',
    email: 'info@sponsoredroofing.com',
    websiteUrl: 'https://sponsoredroofing.com',
    address: '200 Business Blvd',
    city: 'Clearwater',
    state: 'FL',
    zipCode: '33760',
    contactName: 'Sarah Jones',
    contactTitle: 'Marketing Director',
    preferredContact: 'email',
    licenseNumber: 'CCC7654321',
    liabilityInsurance: 'yes',
    liabilityCarrier: 'Liberty Mutual',
    liabilityPolicy: '',
    workersComp: 'yes',
    workersCompDetails: '',
    bbbAccredited: 'no',
    regions: ['sun-coast', 'treasure-coast'],
    counties: ['pinellas'],
    additionalCities: '',
    aboutText: 'We specialize in residential and light commercial roofing. We want to increase our visibility with a sponsored listing and are ready to start the subscription.',
    yearsInBusiness: '8',
    specialties: ['Residential Roofing', 'Storm Damage', 'Roof Repair'],
    googleBusinessUrl: '',
    hearAboutUs: 'referral',
    message: 'Please send the invoice so we can get our sponsored listing started.',
  },
  generalListing: {
    companyName: 'General List Roofing',
    contactName: 'Chris Davis',
    phone: '(941) 555-3333',
    email: 'chris@generallist.com',
    websiteUrl: 'https://generallist.com',
    address: '300 Service Rd',
    city: 'Sarasota',
    state: 'FL',
    zipCode: '34232',
    regions: ['southwest-florida'],
    counties: ['sarasota'],
    hearAboutUs: 'social',
    message: 'We would like to be added to the directory. May consider sponsored or preferred later.',
  },
};

export async function GET(request: NextRequest) {
  try {
    // Optional: require ?key= to avoid accidental calls. In dev, key=test is enough.
    const key = request.nextUrl.searchParams.get('key');
    const allowedKey = process.env.SEND_TEST_EMAILS_KEY || 'test';
    if (key !== allowedKey) {
      return NextResponse.json(
        { error: 'Missing or invalid key. Use ?key=test (or set SEND_TEST_EMAILS_KEY).' },
        { status: 401 }
      );
    }

    const to = request.nextUrl.searchParams.get('to') || process.env.RESEND_VERIFIED_EMAIL || process.env.RESEND_FROM_EMAIL?.match(/<([^>]+)>/)?.[1];
    if (!to) {
      return NextResponse.json(
        { error: 'No recipient. Use ?to=your@email.com or set RESEND_VERIFIED_EMAIL.' },
        { status: 400 }
      );
    }

    if (!resend) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is not configured.' },
        { status: 500 }
      );
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'RIF Roofing <info@roofersinflorida.com>';
    const results: { form: string; subject: string; ok: boolean; error?: string }[] = [];

    // 1. Contact – Resident (general question)
    const contactResidentHtml = getContactNotificationEmailHtml(SAMPLE.contactResident);
    const r1 = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject: '[TEST] Contact Form – Resident (general question)',
      html: contactResidentHtml,
    });
    results.push({ form: 'Contact (Resident general)', subject: 'Contact Form – Resident', ok: !r1.error, error: r1.error?.message });

    // 2. Contact – Manufacturer
    const contactManufacturerHtml = getContactNotificationEmailHtml(SAMPLE.contactManufacturer);
    const r2 = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject: '[TEST] Contact Form – Manufacturer',
      html: contactManufacturerHtml,
    });
    results.push({ form: 'Contact (Manufacturer)', subject: 'Contact Form – Manufacturer', ok: !r2.error, error: r2.error?.message });

    // 3. Free Estimate request
    const estimateHtml = getEstimateNotificationEmailHtml(SAMPLE.estimate);
    const r3 = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject: '[TEST] Free Estimate Request',
      html: estimateHtml,
    });
    results.push({ form: 'Free Estimate', subject: 'Free Estimate Request', ok: !r3.error, error: r3.error?.message });

    // 4. Preferred Contractor application
    const preferredHtml = getRooferFullApplyNotificationEmailHtml(SAMPLE.preferredContractor, 'Preferred Contractor Application');
    const r4 = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject: '[TEST] Preferred Contractor Application',
      html: preferredHtml,
    });
    results.push({ form: 'Preferred Contractor', subject: 'Preferred Contractor Application', ok: !r4.error, error: r4.error?.message });

    // 5. Sponsored Listing application
    const sponsoredHtml = getRooferFullApplyNotificationEmailHtml(SAMPLE.sponsoredSubscription, 'Sponsored Listing / Subscription');
    const r5 = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject: '[TEST] Sponsored Listing / Subscription',
      html: sponsoredHtml,
    });
    results.push({ form: 'Sponsored Listing', subject: 'Sponsored Listing', ok: !r5.error, error: r5.error?.message });

    // 6. General Listing application
    const generalHtml = getGeneralListingsNotificationEmailHtml(SAMPLE.generalListing);
    const r6 = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject: '[TEST] General Listing Application',
      html: generalHtml,
    });
    results.push({ form: 'General Listing', subject: 'General Listing Application', ok: !r6.error, error: r6.error?.message });

    const sent = results.filter((r) => r.ok).length;
    return NextResponse.json({
      message: `Sent ${sent} of ${results.length} test emails to ${to}.`,
      results,
    });
  } catch (err) {
    console.error('Send test emails error:', err);
    return NextResponse.json(
      { error: 'Internal server error', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
