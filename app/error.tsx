'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-semibold text-rif-black mb-4">
          Something went wrong!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {error.message || 'An unexpected error occurred'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

















