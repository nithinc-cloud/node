'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApplicationForm } from '@/components/ui/application-form';

interface ApplicationFormData {
  name: string;
  owner: string;
  gitlabUrl: string;
  criticalCve?: number;
  highCve?: number;
  mediumCve?: number;
  lowCve?: number;
}

export default function NewApplicationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ApplicationFormData) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(
          `Failed to create application (${response.status}): ${body}`
        );
      }

      router.push('/applications');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create Application</h1>
        <p className="mt-2 text-gray-600">
          Add a new application to the SAST Dashboard
        </p>
      </div>

      <ApplicationForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Create Application"
      />
    </div>
  );
}
