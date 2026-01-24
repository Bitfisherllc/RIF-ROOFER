import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-dynamic';

const MAILING_LIST_FILE_PATH = join(process.cwd(), 'data', 'mailing-list.json');

interface MailingListEntry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  allowPhoneContact: boolean;
  signedUpAt: string;
}

function readMailingList(): MailingListEntry[] {
  try {
    const content = readFileSync(MAILING_LIST_FILE_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return [];
  }
}

function convertToCSV(entries: MailingListEntry[]): string {
  // CSV headers
  const headers = [
    'ID',
    'Signed Up Date',
    'Full Name',
    'Email',
    'Phone',
    'Company Name',
    'Address',
    'City',
    'State',
    'ZIP Code',
    'Allow Phone Contact',
  ];

  // Convert entries to CSV rows
  const rows = entries.map(entry => [
    entry.id,
    new Date(entry.signedUpAt).toLocaleString('en-US', { 
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
    `"${entry.fullName.replace(/"/g, '""')}"`,
    entry.email,
    entry.phone,
    `"${entry.companyName.replace(/"/g, '""')}"`,
    `"${entry.address.replace(/"/g, '""')}"`,
    entry.city,
    entry.state,
    entry.zipCode,
    entry.allowPhoneContact ? 'Yes' : 'No',
  ]);

  // Combine headers and rows
  const csvRows = [headers.join(','), ...rows.map(row => row.join(','))];
  return csvRows.join('\n');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');

    // Check if CSV export is requested
    if (format === 'csv') {
      const entries = readMailingList();
      const csv = convertToCSV(entries);
      
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="mailing-list-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    // Otherwise, return JSON
    const entries = readMailingList();
    
    // Sort by signed up date (newest first)
    const sortedEntries = entries.sort((a, b) => 
      new Date(b.signedUpAt).getTime() - new Date(a.signedUpAt).getTime()
    );

    return NextResponse.json({
      entries: sortedEntries,
      total: sortedEntries.length,
    });
  } catch (error) {
    console.error('Error fetching mailing list:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mailing list', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

