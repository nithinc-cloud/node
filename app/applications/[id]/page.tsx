import Link from 'next/link';
import { CalendarDays, ExternalLink, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { VulnerabilityTable } from '@/components/ui/vulnerability-table';
import { fetchApplication, fetchVulnerabilities } from '@/lib/api';
import { ApiVulnerability } from '@/lib/types';

interface ApplicationDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Vulnerability {
  id: string;
  category: string;
  name: string;
  description: string;
  cve: string;
  severity: string;
  scanner: {
    id: string;
    name: string;
  };
  location: {
    file: string;
    start_line: number;
  };
  identifiers: Array<{
    type: string;
    name: string;
    value: string;
    url?: string;
  }>;
}

function mapVulnerability(item: ApiVulnerability): Vulnerability {
  return {
    id: item.id,
    category: item.category,
    name: item.name,
    description: item.description ?? '',
    cve: item.cve ?? '',
    severity: item.severity,
    scanner: {
      id: item.scannerId ?? '',
      name: item.scannerName ?? 'Unknown',
    },
    location: {
      file: item.locationFile ?? 'Unknown',
      start_line: item.locationStartLine ?? 0,
    },
    identifiers: item.identifiers ?? [],
  };
}
export default async function ApplicationDetailPage({
  params,
}: ApplicationDetailPageProps) {
  const { id } = await params;

  const [application, apiVulnerabilities] = await Promise.all([
    fetchApplication(id),
    fetchVulnerabilities(id),
  ]);
  const vulnerabilities = apiVulnerabilities.map(mapVulnerability);

  const severityBadge = (count: number, severity: string) => {
    const colors: Record<string, string> = {
      critical: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-blue-100 text-blue-800',
    };
    return (
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors[severity]}`}>
          {severity.charAt(0).toUpperCase() + severity.slice(1)}: {count}
        </span>
      </div>
    );
  };

  const createdDate = application.createdAt
    ? new Date(application.createdAt).toLocaleDateString()
    : 'Not available';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{application.name}</h1>
          <p className="mt-2 text-gray-600">Application Details</p>
        </div>
        <div className="flex gap-3">
          <Link href={`/applications/${id}/edit`}>
            <Button>Edit</Button>
          </Link>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 gap-px bg-gray-200 md:grid-cols-3">
          <div className="bg-white px-6 py-5">
            <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
              <UserRound className="h-4 w-4 text-gray-400" />
              Owner
            </div>
            <p className="mt-2 text-base font-semibold text-gray-900">{application.owner}</p>
          </div>

          <div className="bg-white px-6 py-5">
            <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
              <ExternalLink className="h-4 w-4 text-gray-400" />
              Repository
            </div>
            <a
              href={application.gitlabUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex text-base font-semibold text-blue-700 hover:text-blue-900"
            >
              Repository Link
            </a>
          </div>

          <div className="bg-white px-6 py-5">
            <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
              <CalendarDays className="h-4 w-4 text-gray-400" />
              Created Date
            </div>
            <p className="mt-2 text-base font-semibold text-gray-900">{createdDate}</p>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-900">Vulnerabilities</h2>
        <p className="text-sm text-gray-600">
          Only basic details are shown in the table. Click any row to view full details in a popup.
        </p>
        <VulnerabilityTable vulnerabilities={vulnerabilities} />
      </div>
    </div>
  );
}
