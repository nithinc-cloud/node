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

interface EditClientProps {
  id: string;
  initialData: ApplicationFormData;
}

export function EditClient({ id, initialData }: EditClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ApplicationFormData) => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(
          `Failed to update application (${response.status}): ${body}`
        );
      }

      router.push(`/applications/${id}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ApplicationForm
      initialData={initialData}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitLabel="Update Application"
    />
  );
}
