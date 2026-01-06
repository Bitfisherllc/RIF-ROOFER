/**
 * Email templates for confirmation emails
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

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

