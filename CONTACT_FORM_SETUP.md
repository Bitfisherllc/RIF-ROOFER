# Contact Form Setup Instructions

The contact form is now configured to send emails to `premiumroofingproducts@gmail.com` using Resend.

## Setup Steps

### 1. Get a Resend API Key

1. Sign up for a free account at [https://resend.com](https://resend.com)
2. Go to the API Keys section in your dashboard
3. Create a new API key
4. Copy the API key

### 2. Configure Environment Variables

Create a `.env.local` file in the root of your project (if it doesn't exist) and add:

```env
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=RIF Roofing Contact Form <onboarding@resend.dev>
```

**Note:** For production, you should:
- Verify your domain in Resend dashboard
- Update `RESEND_FROM_EMAIL` to use your verified domain (e.g., `noreply@yourdomain.com`)

### 3. Restart the Development Server

After adding the environment variables, restart your Next.js development server:

```bash
npm run dev
```

## Testing

1. Fill out the contact form at `/contact`
2. Submit the form
3. Check `premiumroofingproducts@gmail.com` for the email

## Troubleshooting

### Email not sending?

1. **Check API Key**: Ensure `RESEND_API_KEY` is set in `.env.local`
2. **Check Resend Dashboard**: Verify your API key is active
3. **Check Console**: Look for error messages in the server console
4. **Domain Verification**: For production, ensure your "from" domain is verified in Resend

### Using a Custom Domain

1. Add your domain in Resend dashboard
2. Add the required DNS records
3. Wait for verification
4. Update `RESEND_FROM_EMAIL` to use your verified domain

## Email Format

The contact form sends a formatted email with:
- Personal information (name, email, phone)
- Property information (address, city, ZIP)
- Project details (type, size, description)
- Contact preferences
- Timestamp

The email will have the submitter's email as the reply-to address for easy responses.






