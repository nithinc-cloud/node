'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { ImportForm } from '@/components/ui/import-form';

interface ImportPageProps {
  params: Promise<{
    applicationId: string;
  }>;
}

export default function ImportPage({ params }: ImportPageProps) {
  const { applicationId } = use(params);
  const router = useRouter();

  const handleSuccess = () => {
    // Redirect back to vulnerabilities list after successful import
    router.push(`/vulnerabilities/${applicationId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Import Vulnerabilities
        </h1>
        <p className="mt-2 text-gray-600">
          Upload a GitLab SAST report to import vulnerabilities
        </p>
      </div>

      <ImportForm
        applicationId={applicationId}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
