'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface SiteConfig {
  passwordProtected: boolean;
  password: string;
}

export default function AdminConfigPage() {
  const [config, setConfig] = useState<SiteConfig>({
    passwordProtected: false,
    password: 'letmein',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/admin/config');
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (error) {
      console.error('Error fetching config:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch('/api/admin/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Configuration saved successfully!' });
        // Clear all password sessions when password protection is toggled
        if (config.passwordProtected) {
          document.cookie = 'site-password-verified=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
      } else {
        setMessage({ type: 'error', text: 'Failed to save configuration' });
      }
    } catch (error) {
      console.error('Error saving config:', error);
      setMessage({ type: 'error', text: 'Error saving configuration' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 text-rif-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-rif-black mb-8">Site Configuration</h1>

          {/* Password Protection Toggle */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-rif-black mb-2">
                  Site Password Protection
                </h2>
                <p className="text-gray-600">
                  Enable or disable password protection for the entire site. When enabled, visitors
                  must enter the password to access any page.
                </p>
              </div>
              <button
                onClick={() =>
                  setConfig({ ...config, passwordProtected: !config.passwordProtected })
                }
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-rif-blue-500 focus:ring-offset-2 ${
                  config.passwordProtected ? 'bg-rif-blue-500' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={config.passwordProtected}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    config.passwordProtected ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <FontAwesomeIcon
                icon={config.passwordProtected ? faLock : faUnlock}
                className={`h-5 w-5 ${
                  config.passwordProtected ? 'text-red-500' : 'text-green-500'
                }`}
              />
              <span
                className={`font-medium ${
                  config.passwordProtected ? 'text-red-600' : 'text-green-600'
                }`}
              >
                Password protection is {config.passwordProtected ? 'ENABLED' : 'DISABLED'}
              </span>
            </div>
          </div>

          {/* Password Display (Read-only) */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Password
            </label>
            <div className="relative">
              <input
                type="text"
                value={config.password}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                (Fixed)
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              The password is set to "letmein" and cannot be changed through this interface.
            </p>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-between">
            <div>
              {message && (
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.type === 'success'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {message.text}
                </div>
              )}
            </div>
            <button
              onClick={saveConfig}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSave} />
                  Save Configuration
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


