'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApplicationTable } from '@/components/ui/application-table';
import { Application } from '@/lib/types';

interface ApplicationsClientProps {
  applications: Application[];
}

export function ApplicationsClient({ applications }: ApplicationsClientProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(
          `Failed to delete application (${response.status}): ${body}`
        );
      }

      router.refresh();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ApplicationTable
      applications={applications}
      onDelete={handleDelete}
      isLoading={isDeleting}
    />
  );
}
