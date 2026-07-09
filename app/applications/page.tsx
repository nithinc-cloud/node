import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { fetchApplications } from '@/lib/api';
import { ApplicationsClient } from '@/app/applications/applications-client';

export default async function ApplicationsPage() {
  const applications = await fetchApplications();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="mt-2 text-gray-600">
            Manage applications and their vulnerabilities
          </p>
        </div>
        <Link href="/applications/new">
          <Button>Create Application</Button>
        </Link>
      </div>

      <ApplicationsClient applications={applications} />
    </div>
  );
}
