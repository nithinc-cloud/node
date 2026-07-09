'use client';

import { useState } from 'react';
import { Button } from './button';
import { Card } from './card';
import { ImportResult } from '@/lib/types';

interface ImportFormProps {
  applicationId: string;
  onSuccess?: () => void;
}

export function ImportForm({
  applicationId,
  onSuccess,
}: ImportFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [importedCount, setImportedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.json')) {
      setError('Please select a valid JSON file');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!file) {
      setError('Please select a file');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        `/api/applications/${applicationId}/vulnerabilities/import`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Import failed (${response.status}): ${body}`);
      }

      const result = (await response.json()) as ImportResult;
      setImportedCount(result.importedCount);
      setSuccess(true);
      setFile(null);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
            id="file-input"
            disabled={isLoading}
          />
          <label htmlFor="file-input" className="cursor-pointer">
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900">
                Choose GitLab SAST Report JSON
              </p>
              <p className="text-sm text-gray-500">
                or drag and drop
              </p>
              {file && (
                <p className="text-sm text-green-600 font-medium">
                  Selected: {file.name}
                </p>
              )}
            </div>
          </label>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              Successfully imported {importedCount} vulnerabilities
            </p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading || !file}
          className="w-full"
        >
          {isLoading ? 'Importing...' : 'Import Vulnerabilities'}
        </Button>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-medium text-blue-900 mb-2">
            📋 About this import:
          </p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Replaces all existing vulnerabilities for this application</li>
            <li>• Automatically recalculates CVE counts</li>
            <li>• Requires valid GitLab SAST report JSON</li>
          </ul>
        </div>
      </form>
    </Card>
  );
}
