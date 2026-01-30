'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const message = error?.message || 'An unexpected error occurred';
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', background: '#fff' }}>
        <div style={{ maxWidth: '28rem', width: '100%', textAlign: 'center', padding: '1.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#231f20', marginBottom: '1rem' }}>
            Something went wrong!
          </h1>
          <p style={{ fontSize: '1rem', color: '#4b5563', marginBottom: '2rem' }}>
            {message}
          </p>
          <button
            type="button"
            onClick={() => reset?.()}
            style={{ padding: '0.75rem 1.5rem', background: '#255eab', color: '#fff', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '1rem' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

















