import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const listingType = formData.get('listingType') as string;
    const businessName = formData.get('businessName') as string;
    const location = formData.get('location') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const zipCode = formData.get('zipCode') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const website = formData.get('website') as string;
    const logoFile = formData.get('logo') as File | null;

    // Validate required fields
    if (!listingType || !businessName || !location || !city || !state || !zipCode || !phone || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate listing type
    if (!['general', 'sponsored', 'certified'].includes(listingType)) {
      return NextResponse.json({ error: 'Invalid listing type' }, { status: 400 });
    }

    // Handle logo upload for sponsored listings
    let logoPath = '';
    if (listingType === 'sponsored' && logoFile) {
      const bytes = await logoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'partnership-logos');
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
      }

      // Generate unique filename
      const timestamp = Date.now();
      const originalName = logoFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `${timestamp}_${originalName}`;
      logoPath = path.join(uploadsDir, filename);

      await writeFile(logoPath, buffer);
      logoPath = `/uploads/partnership-logos/${filename}`;
    }

    // Prepare submission data
    const submissionData = {
      listingType,
      businessName,
      location,
      city,
      state,
      zipCode,
      phone,
      email,
      website: website || '',
      logoPath: logoPath || '',
      submittedAt: new Date().toISOString(),
    };

    // TODO: Save to database or send email notification
    // For now, we'll just log it (in production, you'd save this to a database)
    console.log('Partnership signup submission:', submissionData);

    // TODO: Send email notification to admin
    // You can use Resend or another email service here

    return NextResponse.json({
      success: true,
      message: 'Partnership application submitted successfully',
    });
  } catch (error: any) {
    console.error('Error processing partnership signup:', error);
    return NextResponse.json({ error: 'Failed to process application' }, { status: 500 });
  }
}


