'use client';

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faUpload,
  faSpinner,
  faCheckCircle,
  faExclamationCircle,
  faTrash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';

interface HeroBackgroundConfig {
  imageUrl: string | null;
  filename: string | null;
}

export default function AdminHeroBackgroundPage() {
  const [config, setConfig] = useState<HeroBackgroundConfig>({
    imageUrl: null,
    filename: null,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/admin/hero-background');
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
        if (data.imageUrl) {
          setPreview(data.imageUrl);
        }
      }
    } catch (error) {
      console.error('Error fetching config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Please select an image file' });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image size must be less than 5MB' });
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setMessage({ type: 'error', text: 'Please select an image file' });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/admin/hero-background', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setConfig({
          imageUrl: data.imageUrl,
          filename: data.filename,
        });
        setPreview(data.imageUrl);
        setMessage({ type: 'success', text: 'Background image uploaded successfully!' });
        // Clear file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to upload image' });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage({ type: 'error', text: 'Error uploading image' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete the current background image?')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/hero-background', {
        method: 'DELETE',
      });

      if (response.ok) {
        setConfig({ imageUrl: null, filename: null });
        setPreview(null);
        setMessage({ type: 'success', text: 'Background image deleted successfully!' });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.error || 'Failed to delete image' });
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      setMessage({ type: 'error', text: 'Error deleting image' });
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <FontAwesomeIcon icon={faSpinner} className="h-12 w-12 text-rif-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-rif-black mb-2">Hero Background Image</h2>
        <p className="text-gray-600">
          Upload a background image for the home page slider section. The image will span the full width of the page.
        </p>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <FontAwesomeIcon
            icon={message.type === 'success' ? faCheckCircle : faExclamationCircle}
            className="h-5 w-5"
          />
          <span>{message.text}</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Upload Section */}
        <div className="p-8 border-b border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Select Image File
          </label>
          <div className="flex items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-rif-blue-50 file:text-rif-blue-700 hover:file:bg-rif-blue-100 file:cursor-pointer cursor-pointer"
            />
            <button
              onClick={handleUpload}
              disabled={uploading || !fileInputRef.current?.files?.[0]}
              className="flex items-center gap-2 px-6 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin className="h-5 w-5" />
                  Uploading...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faUpload} className="h-5 w-5" />
                  Upload Image
                </>
              )}
            </button>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Supported formats: JPG, PNG, WebP. Maximum file size: 5MB. Recommended dimensions: 1920x1080 or larger.
          </p>
        </div>

        {/* Preview Section */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-rif-black">Current Background Image</h3>
            {config.imageUrl && (
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                Delete Image
              </button>
            )}
          </div>

          {preview ? (
            <div className="space-y-4">
              <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-100" style={{ aspectRatio: '16/9' }}>
                <img
                  src={preview}
                  alt="Hero background preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  <span className="font-medium">Filename:</span> {config.filename || 'N/A'}
                </p>
                {config.imageUrl && (
                  <p className="mt-1">
                    <span className="font-medium">URL:</span>{' '}
                    <a
                      href={config.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rif-blue-500 hover:text-rif-blue-600 underline"
                    >
                      {config.imageUrl}
                    </a>
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50" style={{ aspectRatio: '16/9' }}>
              <FontAwesomeIcon icon={faImage} className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">No background image uploaded</p>
              <p className="text-sm text-gray-500 mt-2">
                Upload an image to set a background for the hero slider section
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

