'use client';

import { useState, useEffect } from 'react';
import Logo from '@/components/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faArrowRight, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const GATE_STORAGE_KEY = 'rif-gate-unlocked';

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [gateEnabled, setGateEnabled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    (async () => {
      try {
        const res = await fetch('/api/password-verify');
        const data = await res.json();
        if (!data.passwordProtected) {
          setUnlocked(true);
          return;
        }
        setGateEnabled(true);
        const stored = sessionStorage.getItem(GATE_STORAGE_KEY);
        setUnlocked(stored === 'true');
      } catch {
        setGateEnabled(false);
        setUnlocked(true);
      }
    })();
  }, [mounted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/password-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem(GATE_STORAGE_KEY, 'true');
        setUnlocked(true);
      } else {
        setError('Incorrect password. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  if (unlocked === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rif-blue-900 via-rif-blue-800 to-rif-blue-900 flex items-center justify-center">
        <div className="animate-pulse text-white/60">Loading...</div>
      </div>
    );
  }

  if (unlocked) {
    return <>{children}</>;
  }

  if (!mounted || unlocked === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rif-blue-900 via-rif-blue-800 to-rif-blue-900 flex items-center justify-center">
        <div className="animate-pulse text-white/60">Loading...</div>
      </div>
    );
  }

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-rif-blue-900 via-rif-blue-800 to-rif-blue-900">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo variant="full" color="white" width={220} />
        </div>

        {/* Coming soon card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
              Coming Soon
            </h1>
            <p className="text-white/80 text-lg">
              We&apos;re putting the finishing touches on our new site. Enter the password below to preview.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="gate-password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50"
                />
                <input
                  id="gate-password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter password"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/40 focus:border-white focus:ring-2 focus:ring-white/30 focus:outline-none transition-all"
                  autoFocus
                  autoComplete="current-password"
                  aria-invalid={!!error}
                  aria-describedby={error ? 'gate-error' : undefined}
                />
              </div>
              {error && (
                <p
                  id="gate-error"
                  className="mt-2 flex items-center gap-2 text-sm text-amber-300"
                  role="alert"
                >
                  <FontAwesomeIcon icon={faExclamationCircle} className="h-4 w-4 flex-shrink-0" />
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-white text-rif-blue-700 font-semibold rounded-xl hover:bg-white/95 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rif-blue-800 transition-all shadow-lg"
            >
              Enter site
              <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-white/50 text-sm">
          RiF Roofers In Florida · Stone-coated metal roofing across Florida
        </p>
      </div>
    </div>
  );
}
