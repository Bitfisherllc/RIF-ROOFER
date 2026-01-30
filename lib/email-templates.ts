/**
 * Email templates for confirmation emails and internal notifications
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://roofersinflorida.com';
const BASE_URL = 'http://roofersinflorida.com';

export function getContactConfirmationEmailHtml(formData: {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  propertyAddress?: string;
  city?: string;
  zipCode?: string;
  projectType?: string;
  roofSize?: string;
  message?: string;
  preferredContact: string;
  bestTimeToContact?: string;
  hearAboutUs?: string;
  userType?: string;
}): string {
  const logoUrl = `${SITE_URL}/logo.svg`;
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting RIF Roofing</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header with Logo -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background-color: #ffffff; border-bottom: 2px solid #e5e7eb;">
              <img src="${logoUrl}" alt="RIF Roofing Installation Framework" style="max-width: 200px; height: auto;" />
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h1 style="margin: 0 0 20px; color: #1e4a87; font-size: 28px; font-weight: 600;">Thank You for Contacting Us!</h1>
              
              <p style="margin: 0 0 30px; color: #333333; font-size: 16px; line-height: 1.6;">
                Hi ${formData.fullName},
              </p>
              
              <p style="margin: 0 0 30px; color: #333333; font-size: 16px; line-height: 1.6;">
                We've received your contact request and appreciate you reaching out to RIF Roofing. Our team will review your information and get back to you as soon as possible.
              </p>
              
              <!-- Form Recap -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #255eab; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h2 style="margin: 0 0 20px; color: #1e4a87; font-size: 20px; font-weight: 600;">Your Information</h2>
                
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600; width: 40%;">Name:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Email:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Phone:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.phone}</td>
                  </tr>
                  ${formData.userType ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">User Type:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.userType === 'roofer' ? 'Roofer' : formData.userType === 'manufacturer' ? 'Manufacturer' : 'Resident'}</td>
                  </tr>
                  ` : ''}
                  ${formData.companyName ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Company Name:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.companyName}</td>
                  </tr>
                  ` : ''}
                  ${formData.propertyAddress ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Property Address:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.propertyAddress}</td>
                  </tr>
                  ` : ''}
                  ${formData.city ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">City:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.city}</td>
                  </tr>
                  ` : ''}
                  ${formData.zipCode ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">ZIP Code:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.zipCode}</td>
                  </tr>
                  ` : ''}
                  ${formData.projectType ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Project Type:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.projectType}</td>
                  </tr>
                  ` : ''}
                  ${formData.roofSize ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Roof Size:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.roofSize}</td>
                  </tr>
                  ` : ''}
                  ${formData.message ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600; vertical-align: top;">Message:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.message.replace(/\n/g, '<br>')}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Preferred Contact:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.preferredContact === 'phone' ? 'Phone' : formData.preferredContact === 'email' ? 'Email' : 'Either'}</td>
                  </tr>
                  ${formData.bestTimeToContact ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Best Time to Contact:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.bestTimeToContact}</td>
                  </tr>
                  ` : ''}
                  ${formData.hearAboutUs ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">How You Heard About Us:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.hearAboutUs}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>
              
              <p style="margin: 30px 0 0; color: #333333; font-size: 16px; line-height: 1.6;">
                We'll be in touch soon! If you have any urgent questions, please don't hesitate to call us at <a href="tel:813-777-8272" style="color: #255eab; text-decoration: none;">813-777-8272</a>.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0 0 10px; color: #666666; font-size: 14px;">
                <strong>RIF Roofing Installation Framework</strong><br>
                Serving Florida with Quality Stone-Coated Metal Roofing
              </p>
              <p style="margin: 10px 0 0; color: #999999; font-size: 12px;">
                This is an automated confirmation email. Please do not reply directly to this message.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function getEstimateConfirmationEmailHtml(formData: {
  fullName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  city: string;
  zipCode: string;
  propertyType?: string;
  roofType?: string;
  roofAge?: string;
  roofSize?: string;
  stories?: string;
  projectType: string;
  urgency?: string;
  timeline?: string;
  insuranceClaim?: string;
  claimNumber?: string;
  specificIssues?: string;
  additionalNotes?: string;
  preferredContact: string;
  bestTimeToContact?: string;
}): string {
  const logoUrl = `${SITE_URL}/logo.svg`;
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Your Free Estimate Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header with Logo -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background-color: #ffffff; border-bottom: 2px solid #e5e7eb;">
              <img src="${logoUrl}" alt="RIF Roofing Installation Framework" style="max-width: 200px; height: auto;" />
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h1 style="margin: 0 0 20px; color: #1e4a87; font-size: 28px; font-weight: 600;">Thank You for Your Free Estimate Request!</h1>
              
              <p style="margin: 0 0 30px; color: #333333; font-size: 16px; line-height: 1.6;">
                Hi ${formData.fullName},
              </p>
              
              <p style="margin: 0 0 30px; color: #333333; font-size: 16px; line-height: 1.6;">
                We've received your free estimate request and are excited to help you with your roofing project. One of our certified RIF roofers will review your information and contact you soon to schedule your free estimate.
              </p>
              
              <!-- Form Recap -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #255eab; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h2 style="margin: 0 0 20px; color: #1e4a87; font-size: 20px; font-weight: 600;">Your Estimate Request Details</h2>
                
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td colspan="2" style="padding: 12px 0 8px; color: #1e4a87; font-size: 16px; font-weight: 600; border-bottom: 1px solid #dee2e6;">Contact Information</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600; width: 40%;">Name:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Email:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Phone:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.phone}</td>
                  </tr>
                  
                  <tr>
                    <td colspan="2" style="padding: 16px 0 8px; color: #1e4a87; font-size: 16px; font-weight: 600; border-top: 1px solid #dee2e6; border-bottom: 1px solid #dee2e6;">Property Information</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Address:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.propertyAddress}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">City:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.city}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">ZIP Code:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.zipCode}</td>
                  </tr>
                  ${formData.propertyType ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Property Type:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.propertyType}</td>
                  </tr>
                  ` : ''}
                  ${formData.stories ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Stories:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.stories}</td>
                  </tr>
                  ` : ''}
                  
                  <tr>
                    <td colspan="2" style="padding: 16px 0 8px; color: #1e4a87; font-size: 16px; font-weight: 600; border-top: 1px solid #dee2e6; border-bottom: 1px solid #dee2e6;">Current Roof Details</td>
                  </tr>
                  ${formData.roofType ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Roof Type:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.roofType}</td>
                  </tr>
                  ` : ''}
                  ${formData.roofAge ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Roof Age:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.roofAge}</td>
                  </tr>
                  ` : ''}
                  ${formData.roofSize ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Roof Size:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.roofSize}</td>
                  </tr>
                  ` : ''}
                  
                  <tr>
                    <td colspan="2" style="padding: 16px 0 8px; color: #1e4a87; font-size: 16px; font-weight: 600; border-top: 1px solid #dee2e6; border-bottom: 1px solid #dee2e6;">Project Details</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Project Type:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.projectType}</td>
                  </tr>
                  ${formData.urgency ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Urgency:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.urgency}</td>
                  </tr>
                  ` : ''}
                  ${formData.timeline ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Timeline:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.timeline}</td>
                  </tr>
                  ` : ''}
                  ${formData.specificIssues ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600; vertical-align: top;">Specific Issues:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.specificIssues.replace(/\n/g, '<br>')}</td>
                  </tr>
                  ` : ''}
                  
                  ${formData.insuranceClaim || formData.claimNumber ? `
                  <tr>
                    <td colspan="2" style="padding: 16px 0 8px; color: #1e4a87; font-size: 16px; font-weight: 600; border-top: 1px solid #dee2e6; border-bottom: 1px solid #dee2e6;">Insurance Information</td>
                  </tr>
                  ${formData.insuranceClaim ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Insurance Claim:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.insuranceClaim}</td>
                  </tr>
                  ` : ''}
                  ${formData.claimNumber ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Claim Number:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.claimNumber}</td>
                  </tr>
                  ` : ''}
                  ` : ''}
                  
                  ${formData.additionalNotes ? `
                  <tr>
                    <td colspan="2" style="padding: 16px 0 8px; color: #1e4a87; font-size: 16px; font-weight: 600; border-top: 1px solid #dee2e6; border-bottom: 1px solid #dee2e6;">Additional Notes</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.additionalNotes.replace(/\n/g, '<br>')}</td>
                  </tr>
                  ` : ''}
                  
                  <tr>
                    <td colspan="2" style="padding: 16px 0 8px; color: #1e4a87; font-size: 16px; font-weight: 600; border-top: 1px solid #dee2e6; border-bottom: 1px solid #dee2e6;">Contact Preferences</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Preferred Contact:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.preferredContact === 'phone' ? 'Phone' : formData.preferredContact === 'email' ? 'Email' : 'Either'}</td>
                  </tr>
                  ${formData.bestTimeToContact ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 600;">Best Time to Contact:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${formData.bestTimeToContact}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>
              
              <p style="margin: 30px 0 0; color: #333333; font-size: 16px; line-height: 1.6;">
                We'll be in touch soon to schedule your free estimate! If you have any urgent questions, please don't hesitate to call us at <a href="tel:813-777-8272" style="color: #255eab; text-decoration: none;">813-777-8272</a>.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0 0 10px; color: #666666; font-size: 14px;">
                <strong>RIF Roofing Installation Framework</strong><br>
                Serving Florida with Quality Stone-Coated Metal Roofing
              </p>
              <p style="margin: 10px 0 0; color: #999999; font-size: 12px;">
                This is an automated confirmation email. Please do not reply directly to this message.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/** Saved roofer as sent from free-estimate form */
export interface SavedRooferForEmail {
  id: string;
  slug: string;
  name: string;
  phone?: string;
  email?: string;
  websiteUrl?: string;
  listingType?: 'preferred' | 'sponsored' | 'general';
}

/** Saved product/location for email */
export interface SavedProductForEmail {
  slug: string;
  name: string;
  category?: string;
}
export interface SavedLocationForEmail {
  type: string;
  name: string;
  path: string;
  county?: string;
  region?: string;
}

/**
 * HTML email for internal notification (to info@roofersinflorida.com).
 * Uses site colors, logo, full URLs, and full roofer contact details.
 */
export function getEstimateNotificationEmailHtml(data: {
  fullName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  city: string;
  zipCode: string;
  propertyType?: string;
  roofType?: string;
  roofAge?: string;
  roofSize?: string;
  stories?: string;
  projectType: string;
  urgency?: string;
  timeline?: string;
  insuranceClaim?: string;
  claimNumber?: string;
  specificIssues?: string;
  additionalNotes?: string;
  preferredContact: string;
  bestTimeToContact?: string;
  savedRoofers?: SavedRooferForEmail[];
  savedProducts?: SavedProductForEmail[];
  savedLocations?: SavedLocationForEmail[];
}): string {
  const logoUrl = `${SITE_URL}/logo.svg`;
  const logoWhiteUrl = `${SITE_URL}/logo-white.svg`;
  const rifBlue = '#255eab';
  const rifBlueDark = '#1e4a87';
  const rifBlack = '#231f20';
  const cardGreen = '#24a961';
  const cardBlue = '#2461a9';
  const grayBg = '#f8f9fa';
  const grayBorder = '#e5e7eb';
  const grayText = '#666666';
  const bodyText = '#333333';

  const rooferProfileUrl = (slug: string) => `${BASE_URL}/roofers/${slug}`;
  const productUrl = (slug: string) => `${BASE_URL}/products/${slug}`;
  const locationUrl = (path: string) => `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;

  const formatLabel = (t: string) =>
    t === 'preferred' ? 'Preferred' : t === 'sponsored' ? 'Sponsored' : 'General';

  const roofersHtml =
    data.savedRoofers && data.savedRoofers.length > 0
      ? `
    <tr>
      <td colspan="2" style="padding: 16px 0 8px; color: ${rifBlueDark}; font-size: 16px; font-weight: 600; border-top: 1px solid ${grayBorder}; border-bottom: 1px solid ${grayBorder};">
        Favorite Roofers to Contact
      </td>
    </tr>
    ${data.savedRoofers
      .map(
        (r, i) => `
    <tr>
      <td colspan="2" style="padding: 12px 0 0; vertical-align: top;">
        <div style="background-color: ${grayBg}; border-radius: 8px; padding: 14px; margin-bottom: 12px; border-left: 4px solid ${r.listingType === 'preferred' ? cardBlue : r.listingType === 'sponsored' ? cardGreen : grayText};">
          <div style="font-weight: 600; color: ${rifBlack}; font-size: 15px;">${i + 1}. ${r.name}</div>
          <span style="display: inline-block; margin-top: 4px; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; background-color: ${r.listingType === 'preferred' ? '#e0e9f5' : r.listingType === 'sponsored' ? '#e2f3ea' : '#f3f4f6'}; color: ${r.listingType === 'preferred' ? cardBlue : r.listingType === 'sponsored' ? cardGreen : bodyText};">
            ${formatLabel(r.listingType || 'general')}
          </span>
          <div style="margin-top: 10px; font-size: 14px; color: ${bodyText};">
            <a href="${rooferProfileUrl(r.slug)}" style="color: ${rifBlue}; text-decoration: none;">View profile → ${rooferProfileUrl(r.slug)}</a>
          </div>
          ${(r.phone || r.email || r.websiteUrl) ? `
          <table role="presentation" style="width: 100%; margin-top: 8px; border-collapse: collapse;">
            ${r.phone ? `<tr><td style="padding: 4px 0; color: ${grayText}; font-size: 13px;">Phone:</td><td style="padding: 4px 0;"><a href="tel:${r.phone}" style="color: ${rifBlue}; text-decoration: none;">${r.phone}</a></td></tr>` : ''}
            ${r.email ? `<tr><td style="padding: 4px 0; color: ${grayText}; font-size: 13px;">Email:</td><td style="padding: 4px 0;"><a href="mailto:${r.email}" style="color: ${rifBlue}; text-decoration: none;">${r.email}</a></td></tr>` : ''}
            ${r.websiteUrl ? `<tr><td style="padding: 4px 0; color: ${grayText}; font-size: 13px;">Website:</td><td style="padding: 4px 0;"><a href="${r.websiteUrl}" style="color: ${rifBlue}; text-decoration: none;">${r.websiteUrl}</a></td></tr>` : ''}
          </table>
          ` : ''}
        </div>
      </td>
    </tr>
    `
      )
      .join('')}
    `
      : '';

  const productsHtml =
    data.savedProducts && data.savedProducts.length > 0
      ? `
    <tr>
      <td colspan="2" style="padding: 16px 0 8px; color: ${rifBlueDark}; font-size: 16px; font-weight: 600; border-top: 1px solid ${grayBorder}; border-bottom: 1px solid ${grayBorder};">
        Products of Interest
      </td>
    </tr>
    ${data.savedProducts
      .map(
        (p) => `
    <tr>
      <td style="padding: 8px 0; color: ${bodyText}; font-size: 14px;">• <a href="${productUrl(p.slug)}" style="color: ${rifBlue}; text-decoration: none;">${p.name}</a> ${p.category ? `(${p.category})` : ''}</td>
      <td style="padding: 8px 0; text-align: right;"><a href="${productUrl(p.slug)}" style="color: ${rifBlue}; font-size: 13px;">${productUrl(p.slug)}</a></td>
    </tr>
    `
      )
      .join('')}
    `
      : '';

  const locationsHtml =
    data.savedLocations && data.savedLocations.length > 0
      ? `
    <tr>
      <td colspan="2" style="padding: 16px 0 8px; color: ${rifBlueDark}; font-size: 16px; font-weight: 600; border-top: 1px solid ${grayBorder}; border-bottom: 1px solid ${grayBorder};">
        Saved Locations
      </td>
    </tr>
    ${data.savedLocations
      .map(
        (loc) => `
    <tr>
      <td style="padding: 8px 0; color: ${bodyText}; font-size: 14px;">• ${loc.name} (${loc.type})</td>
      <td style="padding: 8px 0; text-align: right;"><a href="${locationUrl(loc.path)}" style="color: ${rifBlue}; font-size: 13px;">${locationUrl(loc.path)}</a></td>
    </tr>
    `
      )
      .join('')}
    `
      : '';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Free Estimate Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.08); overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 40px 24px; text-align: center; background: linear-gradient(135deg, ${rifBlue} 0%, ${rifBlueDark} 100%);">
              <img src="${logoWhiteUrl}" alt="RIF Roofers In Florida" style="max-width: 200px; height: auto;" />
              <p style="margin: 16px 0 0; color: rgba(255,255,255,0.95); font-size: 14px;">New Free Estimate Request</p>
            </td>
          </tr>
          <!-- Contact -->
          <tr>
            <td style="padding: 28px 40px 16px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td colspan="2" style="padding: 0 0 12px; color: ${rifBlueDark}; font-size: 18px; font-weight: 600;">Contact Information</td>
                </tr>
                <tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px; width: 140px;">Name</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${data.fullName}</td></tr>
                <tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Email</td><td style="padding: 6px 0;"><a href="mailto:${data.email}" style="color: ${rifBlue}; text-decoration: none;">${data.email}</a></td></tr>
                <tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Phone</td><td style="padding: 6px 0;"><a href="tel:${data.phone}" style="color: ${rifBlue}; text-decoration: none;">${data.phone}</a></td></tr>
                <tr>
                  <td colspan="2" style="padding: 20px 0 12px; color: ${rifBlueDark}; font-size: 18px; font-weight: 600; border-top: 1px solid ${grayBorder};">Property</td>
                </tr>
                <tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Address</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${data.propertyAddress}</td></tr>
                <tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">City</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${data.city}</td></tr>
                <tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">ZIP</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${data.zipCode}</td></tr>
                ${data.propertyType ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Property Type</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${data.propertyType}</td></tr>` : ''}
                ${data.stories ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Stories</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${data.stories}</td></tr>` : ''}
                <tr>
                  <td colspan="2" style="padding: 20px 0 12px; color: ${rifBlueDark}; font-size: 18px; font-weight: 600; border-top: 1px solid ${grayBorder};">Current Roof</td>
                </tr>
                ${data.roofType ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Roof Type</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${data.roofType}</td></tr>` : ''}
                ${data.roofAge ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Roof Age</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${data.roofAge}</td></tr>` : ''}
                ${data.roofSize ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Roof Size</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${data.roofSize}</td></tr>` : ''}
                <tr>
                  <td colspan="2" style="padding: 20px 0 12px; color: ${rifBlueDark}; font-size: 18px; font-weight: 600; border-top: 1px solid ${grayBorder};">Project</td>
                </tr>
                <tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Project Type</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${data.projectType}</td></tr>
                ${data.urgency ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Urgency</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${data.urgency}</td></tr>` : ''}
                ${data.timeline ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Timeline</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${data.timeline}</td></tr>` : ''}
                ${data.specificIssues ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px; vertical-align: top;">Specific Issues</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${data.specificIssues.replace(/\n/g, '<br>')}</td></tr>` : ''}
                ${data.insuranceClaim || data.claimNumber ? `
                <tr><td colspan="2" style="padding: 20px 0 12px; color: ${rifBlueDark}; font-size: 18px; font-weight: 600; border-top: 1px solid ${grayBorder};">Insurance</td></tr>
                ${data.insuranceClaim ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Insurance Claim</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${data.insuranceClaim}</td></tr>` : ''}
                ${data.claimNumber ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Claim Number</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${data.claimNumber}</td></tr>` : ''}
                ` : ''}
                ${data.additionalNotes ? `
                <tr><td colspan="2" style="padding: 20px 0 12px; color: ${rifBlueDark}; font-size: 18px; font-weight: 600; border-top: 1px solid ${grayBorder};">Additional Notes</td></tr>
                <tr><td colspan="2" style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${data.additionalNotes.replace(/\n/g, '<br>')}</td></tr>
                ` : ''}
                <tr><td colspan="2" style="padding: 20px 0 12px; color: ${rifBlueDark}; font-size: 18px; font-weight: 600; border-top: 1px solid ${grayBorder};">Contact Preferences</td></tr>
                <tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Preferred</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${data.preferredContact === 'phone' ? 'Phone' : data.preferredContact === 'email' ? 'Email' : 'Either'}</td></tr>
                ${data.bestTimeToContact ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Best Time</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${data.bestTimeToContact}</td></tr>` : ''}
                ${roofersHtml}
                ${productsHtml}
                ${locationsHtml}
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px 32px; background-color: ${grayBg}; border-top: 1px solid ${grayBorder}; text-align: center;">
              <p style="margin: 0; color: ${grayText}; font-size: 13px;">RIF Roofers In Florida · Free Estimate Form</p>
              <p style="margin: 6px 0 0; color: #999; font-size: 12px;">Submitted ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/** Escape user content for safe HTML display */
function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>');
}

/** Shared layout for internal notification emails (estimate-style HTML) */
function notificationEmailLayout(title: string, subtitle: string, bodyRows: string): string {
  const logoWhiteUrl = `${SITE_URL}/logo-white.svg`;
  const rifBlue = '#255eab';
  const rifBlueDark = '#1e4a87';
  const grayBg = '#f8f9fa';
  const grayBorder = '#e5e7eb';
  const grayText = '#666666';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.08); overflow: hidden;">
          <tr>
            <td style="padding: 32px 40px 24px; text-align: center; background: linear-gradient(135deg, ${rifBlue} 0%, ${rifBlueDark} 100%);">
              <img src="${logoWhiteUrl}" alt="RIF Roofers In Florida" style="max-width: 200px; height: auto;" />
              <p style="margin: 16px 0 0; color: rgba(255,255,255,0.95); font-size: 14px;">${escapeHtml(subtitle)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px 40px 16px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                ${bodyRows}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px 32px; background-color: ${grayBg}; border-top: 1px solid ${grayBorder}; text-align: center;">
              <p style="margin: 0; color: ${grayText}; font-size: 13px;">RIF Roofers In Florida · ${escapeHtml(subtitle)}</p>
              <p style="margin: 6px 0 0; color: #999; font-size: 12px;">Submitted ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/** Contact form internal notification (HTML, estimate-style) */
export function getContactNotificationEmailHtml(body: {
  userType: string;
  residentIntent?: string;
  rooferIntent?: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  propertyAddress?: string;
  city?: string;
  zipCode?: string;
  projectType?: string;
  roofSize?: string;
  message: string;
  preferredContact: string;
  bestTimeToContact?: string;
  hearAboutUs?: string;
  productName?: string;
  productDescription?: string;
  manufacturerPreferredSupplier?: string;
  manufacturerSponsoredListing?: string;
  manufacturerWebsite?: string;
}): string {
  const rifBlueDark = '#1e4a87';
  const grayBorder = '#e5e7eb';
  const grayText = '#666666';
  const bodyText = '#333333';

  const userTypeLabel = body.userType === 'roofer' ? 'Roofer' : body.userType === 'manufacturer' ? 'Manufacturer' : 'Resident';
  let bodyRows = `
    <tr><td colspan="2" style="padding: 0 0 12px; color: ${rifBlueDark}; font-size: 18px; font-weight: 600;">Contact</td></tr>
    <tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px; width: 140px;">User Type</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(userTypeLabel)}</td></tr>
    ${body.residentIntent ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Resident intent</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(body.residentIntent)}</td></tr>` : ''}
    ${body.rooferIntent ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Roofer intent</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(body.rooferIntent)}</td></tr>` : ''}
    <tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Name</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(body.fullName)}</td></tr>
    <tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(body.email)}" style="color: #255eab; text-decoration: none;">${escapeHtml(body.email)}</a></td></tr>
    <tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Phone</td><td style="padding: 6px 0;"><a href="tel:${escapeHtml(body.phone)}" style="color: #255eab; text-decoration: none;">${escapeHtml(body.phone)}</a></td></tr>
    ${body.companyName ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Company</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(body.companyName)}</td></tr>` : ''}
    <tr><td colspan="2" style="padding: 20px 0 12px; color: ${rifBlueDark}; font-size: 18px; font-weight: 600; border-top: 1px solid ${grayBorder};">Message / Details</td></tr>
    <tr><td colspan="2" style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(body.message)}</td></tr>
  `;

  if (body.propertyAddress || body.city || body.zipCode || body.projectType || body.roofSize) {
    bodyRows += `
    <tr><td colspan="2" style="padding: 20px 0 12px; color: ${rifBlueDark}; font-size: 18px; font-weight: 600; border-top: 1px solid ${grayBorder};">Property / Project</td></tr>
    ${body.propertyAddress ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Address</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(body.propertyAddress)}</td></tr>` : ''}
    ${body.city ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">City</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(body.city)}</td></tr>` : ''}
    ${body.zipCode ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">ZIP</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(body.zipCode)}</td></tr>` : ''}
    ${body.projectType ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Project Type</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(body.projectType)}</td></tr>` : ''}
    ${body.roofSize ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Roof Size</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(body.roofSize)}</td></tr>` : ''}
    `;
  }
  if (body.userType === 'manufacturer' && (body.productName || body.productDescription || body.manufacturerWebsite)) {
    bodyRows += `
    <tr><td colspan="2" style="padding: 20px 0 12px; color: ${rifBlueDark}; font-size: 18px; font-weight: 600; border-top: 1px solid ${grayBorder};">Product / Partnership</td></tr>
    ${body.productName ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Product Name</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(body.productName)}</td></tr>` : ''}
    ${body.productDescription ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px; vertical-align: top;">Product Description</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(body.productDescription)}</td></tr>` : ''}
    ${body.manufacturerPreferredSupplier ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Preferred supplier?</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(body.manufacturerPreferredSupplier)}</td></tr>` : ''}
    ${body.manufacturerSponsoredListing ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Sponsored listing?</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(body.manufacturerSponsoredListing)}</td></tr>` : ''}
    ${body.manufacturerWebsite ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Website</td><td style="padding: 6px 0;"><a href="${escapeHtml(body.manufacturerWebsite)}" style="color: #255eab;">${escapeHtml(body.manufacturerWebsite)}</a></td></tr>` : ''}
    `;
  }
  bodyRows += `
    <tr><td colspan="2" style="padding: 20px 0 12px; color: ${rifBlueDark}; font-size: 18px; font-weight: 600; border-top: 1px solid ${grayBorder};">Preferences</td></tr>
    <tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Preferred contact</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(body.preferredContact === 'phone' ? 'Phone' : body.preferredContact === 'email' ? 'Email' : 'Either')}</td></tr>
    ${body.bestTimeToContact ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Best time</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(body.bestTimeToContact)}</td></tr>` : ''}
    ${body.hearAboutUs ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px;">How they heard</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(body.hearAboutUs)}</td></tr>` : ''}
  `;

  return notificationEmailLayout('Contact Form Submission', 'Contact Form Submission', bodyRows);
}

/** Roofer full apply (Preferred Contractor or Sponsored) internal notification HTML */
export function getRooferFullApplyNotificationEmailHtml(
  body: Record<string, any>,
  formTitle: 'Preferred Contractor Application' | 'Sponsored Listing / Subscription'
): string {
  const rifBlueDark = '#1e4a87';
  const grayBorder = '#e5e7eb';
  const grayText = '#666666';
  const bodyText = '#333333';
  const regions = Array.isArray(body.regions) ? body.regions : [];
  const counties = Array.isArray(body.counties) ? body.counties : [];
  const specialties = Array.isArray(body.specialties) ? body.specialties : [];

  const row = (label: string, value: string) =>
    value ? `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px; width: 140px;">${escapeHtml(label)}</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(value)}</td></tr>` : '';
  const section = (title: string, rows: string) =>
    `<tr><td colspan="2" style="padding: 20px 0 12px; color: ${rifBlueDark}; font-size: 18px; font-weight: 600; border-top: 1px solid ${grayBorder};">${escapeHtml(title)}</td></tr>${rows}`;

  let bodyRows = section('Business Information', `
    ${row('Company name', body.companyName || '')}
    ${row('DBA / Trade name', body.dba || '')}
    ${row('Phone', body.phone || '')}
    ${row('Email', body.email || '')}
    ${row('Website', body.websiteUrl || '')}
    ${row('Address', body.address || '')}
    ${row('City', body.city || '')}
    ${row('State', body.state || 'FL')}
    ${row('ZIP', body.zipCode || '')}
  `);
  bodyRows += section('Primary Contact', `
    ${row('Name', body.contactName || '')}
    ${row('Title', body.contactTitle || '')}
    ${row('Preferred contact', body.preferredContact === 'phone' ? 'Phone' : body.preferredContact === 'email' ? 'Email' : 'Either')}
  `);
  bodyRows += section('Licensing & Insurance', `
    ${row('FL license number', body.licenseNumber || '')}
    ${row('General liability', body.liabilityInsurance || '')}
    ${body.liabilityInsurance === 'yes' ? row('Liability carrier', body.liabilityCarrier || '') + row('Policy', body.liabilityPolicy || '') : ''}
    ${row('Workers comp', body.workersComp || '')}
    ${body.workersComp === 'yes' ? row('Workers comp details', body.workersCompDetails || '') : ''}
    ${row('BBB accredited', body.bbbAccredited || '')}
    ${body.bbbAccredited === 'yes' ? row('BBB URL', body.bbbUrl || '') : ''}
  `);
  bodyRows += section('Service Areas', `
    ${row('Regions', regions.length ? regions.join(', ') : 'None')}
    ${row('Counties', counties.length ? counties.join(', ') : 'None')}
    ${row('Additional cities', body.additionalCities || '')}
  `);
  bodyRows += section('Company Profile', `
    ${row('Years in business', body.yearsInBusiness || '')}
    ${row('Specialties', specialties.length ? specialties.join(', ') : 'None')}
    ${row('Google Business URL', body.googleBusinessUrl || '')}
    <tr><td colspan="2" style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Description</td></tr>
    <tr><td colspan="2" style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(body.aboutText || '')}</td></tr>
  `);
  bodyRows += section('Other', `
    ${row('How they heard', body.hearAboutUs || '')}
    <tr><td colspan="2" style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Additional comments</td></tr>
    <tr><td colspan="2" style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(body.message || '')}</td></tr>
  `);

  return notificationEmailLayout(formTitle, formTitle, bodyRows);
}

/** General listings application internal notification HTML */
export function getGeneralListingsNotificationEmailHtml(body: Record<string, any>): string {
  const rifBlueDark = '#1e4a87';
  const grayBorder = '#e5e7eb';
  const grayText = '#666666';
  const bodyText = '#333333';
  const regions = Array.isArray(body.regions) ? body.regions : [];
  const counties = Array.isArray(body.counties) ? body.counties : [];

  const row = (label: string, value: string) =>
    `<tr><td style="padding: 6px 0; color: ${grayText}; font-size: 14px; width: 140px;">${escapeHtml(label)}</td><td style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(value)}</td></tr>`;
  const section = (title: string, rows: string) =>
    `<tr><td colspan="2" style="padding: 20px 0 12px; color: ${rifBlueDark}; font-size: 18px; font-weight: 600; border-top: 1px solid ${grayBorder};">${escapeHtml(title)}</td></tr>${rows}`;

  const bodyRows = section('Business', `
    ${row('Company', body.companyName || '')}
    ${row('Contact', body.contactName || '')}
    ${row('Phone', body.phone || '')}
    ${row('Email', body.email || '')}
    ${row('Website', body.websiteUrl || '')}
    ${row('Address', body.address || '')}
    ${row('City', body.city || '')}
    ${row('State', body.state || 'FL')}
    ${row('ZIP', body.zipCode || '')}
  `) + section('Service Areas', `
    ${row('Regions', regions.length ? regions.join(', ') : 'None')}
    ${row('Counties', counties.length ? counties.join(', ') : 'None')}
  `) + section('Other', `
    ${row('How they heard', body.hearAboutUs || '')}
    <tr><td colspan="2" style="padding: 6px 0; color: ${grayText}; font-size: 14px;">Comments</td></tr>
    <tr><td colspan="2" style="padding: 6px 0; color: ${bodyText}; font-size: 14px;">${escapeHtml(body.message || '')}</td></tr>
  `);

  return notificationEmailLayout('General Listing Application', 'General Listing Application', bodyRows);
}

