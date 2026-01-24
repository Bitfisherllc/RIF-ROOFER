'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faEnvelope,
  faPhone,
  faUser,
  faBuilding,
  faMapMarkerAlt,
  faCalendar,
  faCheckCircle,
  faTimesCircle,
  faSpinner,
  faList,
} from '@fortawesome/free-solid-svg-icons';

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

export default function AdminMailingListPage() {
  const [entries, setEntries] = useState<MailingListEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/mailing-list');
      if (response.ok) {
        const data = await response.json();
        setEntries(data.entries || []);
      } else {
        console.error('Failed to load mailing list entries');
      }
    } catch (error) {
      console.error('Error loading mailing list:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      setExporting(true);
      const response = await fetch('/api/admin/mailing-list?format=csv');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mailing-list-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Failed to export CSV. Please try again.');
      }
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Failed to export CSV. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <FontAwesomeIcon icon={faSpinner} className="h-12 w-12 text-rif-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading mailing list entries...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-rif-black mb-2">Mailing List</h2>
          <p className="text-gray-600">
            View and manage all mailing list sign-ups. Total: {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          disabled={exporting || entries.length === 0}
          className="flex items-center gap-2 px-6 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {exporting ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin className="h-5 w-5" />
              Exporting...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faDownload} className="h-5 w-5" />
              Export CSV
            </>
          )}
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <FontAwesomeIcon icon={faList} className="h-12 w-12 text-gray-300 mb-4" />
          <p className="text-gray-600">No mailing list entries yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Signed Up
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Contact
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <FontAwesomeIcon icon={faCalendar} className="h-4 w-4 text-gray-400" />
                        <span>{formatDate(entry.signedUpAt)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2 text-gray-900 font-medium">
                          <FontAwesomeIcon icon={faUser} className="h-3 w-3 text-gray-400" />
                          {entry.fullName}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FontAwesomeIcon icon={faEnvelope} className="h-3 w-3 text-gray-400" />
                          <a href={`mailto:${entry.email}`} className="text-rif-blue-500 hover:text-rif-blue-600">
                            {entry.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FontAwesomeIcon icon={faPhone} className="h-3 w-3 text-gray-400" />
                          <a href={`tel:${entry.phone}`} className="text-rif-blue-500 hover:text-rif-blue-600">
                            {entry.phone}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <FontAwesomeIcon icon={faBuilding} className="h-4 w-4 text-gray-400" />
                        <span>{entry.companyName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-start gap-2">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="h-4 w-4 text-gray-400 mt-0.5" />
                          <div>
                            <div>{entry.address}</div>
                            <div className="text-gray-600">
                              {entry.city}, {entry.state} {entry.zipCode}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry.allowPhoneContact ? (
                        <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <FontAwesomeIcon icon={faCheckCircle} className="h-3 w-3" />
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <FontAwesomeIcon icon={faTimesCircle} className="h-3 w-3" />
                          No
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

