'use client';

import { useState } from 'react';
import { Button } from './button';
import { Card } from './card';

interface ApplicationFormData {
  name: string;
  owner: string;
  gitlabUrl: string;
  criticalCve?: number;
  highCve?: number;
  mediumCve?: number;
  lowCve?: number;
}

interface ApplicationFormProps {
  initialData?: ApplicationFormData;
  onSubmit: (data: ApplicationFormData) => Promise<void> | void;
  isLoading?: boolean;
  submitLabel?: string;
}

export function ApplicationForm({
  initialData,
  onSubmit,
  isLoading = false,
  submitLabel = 'Create Application',
}: ApplicationFormProps) {
  const [formData, setFormData] = useState<ApplicationFormData>(
    initialData || {
      name: '',
      owner: '',
      gitlabUrl: '',
      criticalCve: 0,
      highCve: 0,
      mediumCve: 0,
      lowCve: 0,
    }
  );

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('Application name is required');
      return;
    }
    if (!formData.owner.trim()) {
      setError('Owner is required');
      return;
    }
    if (!formData.gitlabUrl.trim()) {
      setError('GitLab URL is required');
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Application Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Payments API"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Owner *
          </label>
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            placeholder="e.g., security-team"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            GitLab URL *
          </label>
          <input
            type="url"
            name="gitlabUrl"
            value={formData.gitlabUrl}
            onChange={handleChange}
            placeholder="e.g., https://gitlab.example.com/team/project"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Critical CVEs
            </label>
            <input
              type="number"
              name="criticalCve"
              value={formData.criticalCve || 0}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading || !!initialData}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              High CVEs
            </label>
            <input
              type="number"
              name="highCve"
              value={formData.highCve || 0}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading || !!initialData}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Medium CVEs
            </label>
            <input
              type="number"
              name="mediumCve"
              value={formData.mediumCve || 0}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading || !!initialData}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Low CVEs
            </label>
            <input
              type="number"
              name="lowCve"
              value={formData.lowCve || 0}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading || !!initialData}
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Processing...' : submitLabel}
        </Button>
      </form>
    </Card>
  );
}
