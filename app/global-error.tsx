'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <h1 className="text-4xl font-semibold text-rif-black mb-4">
              Something went wrong!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {error.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

















