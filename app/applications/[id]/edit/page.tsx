import { fetchApplication } from '@/lib/api';
import { EditClient } from '@/app/applications/[id]/edit/edit-client';

interface ApplicationEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ApplicationEditPage({
  params,
}: ApplicationEditPageProps) {
  const { id } = await params;
  const application = await fetchApplication(id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit Application</h1>
        <p className="mt-2 text-gray-600">
          Update application details
        </p>
      </div>

      <EditClient
        id={id}
        initialData={application}
      />
    </div>
  );
}
