'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faCheck,
  faTimes,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import type { TrainingPath } from '@/app/training/data/training-paths';
import RichTextEditor from '@/components/RichTextEditor';

export default function AdminTrainingPathsPage() {
  const [programs, setPrograms] = useState<TrainingPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProgramId, setEditingProgramId] = useState<string | null>(null);
  const [programFormData, setProgramFormData] = useState<Partial<TrainingPath>>({});

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      const response = await fetch(`/api/admin/training-programs?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPrograms(data.programs || []);
      }
    } catch (error) {
      console.error('Failed to load programs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 text-rif-blue-500 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-rif-black mb-6">Training Programs</h1>
      <p className="text-gray-600 mb-6">
        Edit the descriptions and details for Sales Training and Installation Training programs.
      </p>

      {programs.length === 0 ? (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
          <p className="text-gray-600">No training programs found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              {editingProgramId === program.id ? (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      const response = await fetch('/api/admin/training-programs', {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          id: program.id,
                          ...programFormData,
                        }),
                      });
                      if (response.ok) {
                        await loadPrograms();
                        setEditingProgramId(null);
                        setProgramFormData({});
                      }
                    } catch (error) {
                      console.error('Failed to update program:', error);
                    }
                  }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-rif-black">{program.title}</h3>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors"
                      >
                        <FontAwesomeIcon icon={faCheck} className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProgramId(null);
                          setProgramFormData({});
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Short Description *
                    </label>
                    <textarea
                      name="description"
                      value={programFormData.description ?? program.description}
                      onChange={(e) =>
                        setProgramFormData((prev) => ({ ...prev, description: e.target.value }))
                      }
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Long Description *
                    </label>
                    <RichTextEditor
                      value={programFormData.longDescription ?? program.longDescription ?? ''}
                      onChange={(value) =>
                        setProgramFormData((prev) => ({
                          ...prev,
                          longDescription: value,
                        }))
                      }
                      placeholder="Enter long description with rich text formatting..."
                    />
                    <p className="text-xs text-gray-500 mt-1">Use the toolbar above to format your description with headings, lists, links, and more.</p>
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Topics (one per line)
                    </label>
                    <textarea
                      name="topics"
                      value={
                        (programFormData.topics ?? program.topics ?? []).join('\n')
                      }
                      onChange={(e) =>
                        setProgramFormData((prev) => ({
                          ...prev,
                          topics: e.target.value.split('\n').filter((t) => t.trim()),
                        }))
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Benefits (one per line)
                    </label>
                    <textarea
                      name="benefits"
                      value={
                        (programFormData.benefits ?? program.benefits ?? []).join('\n')
                      }
                      onChange={(e) =>
                        setProgramFormData((prev) => ({
                          ...prev,
                          benefits: e.target.value.split('\n').filter((b) => b.trim()),
                        }))
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-rif-blue-500"
                    />
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-rif-black">{program.title}</h3>
                    <button
                      onClick={() => {
                        setEditingProgramId(program.id);
                        setProgramFormData({
                          description: program.description,
                          longDescription: program.longDescription,
                          topics: program.topics,
                          benefits: program.benefits,
                        });
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1 text-sm text-rif-blue-600 hover:bg-rif-blue-50 rounded-lg transition-colors"
                    >
                      <FontAwesomeIcon icon={faEdit} className="h-3 w-3" />
                      Edit
                    </button>
                  </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Short Description:</p>
                        <p className="text-gray-600">{program.description}</p>
                      </div>
                      <p className="text-sm text-gray-500 italic">
                        Duration, Format, and Upcoming Sessions are calculated automatically from scheduled events.
                      </p>
                    </div>
                </>
              )}
            </div>
          ))}
      </div>
      )}
    </div>
  );
}
