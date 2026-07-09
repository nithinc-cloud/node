import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { VulnerabilityTable } from '@/components/ui/vulnerability-table';
import { fetchVulnerabilities } from '@/lib/api';
import { ApiVulnerability } from '@/lib/types';

interface VulnerabilityListPageProps {
  params: Promise<{
    applicationId: string;
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

export default async function VulnerabilityListPage({
  params,
}: VulnerabilityListPageProps) {
  const { applicationId } = await params;
  const apiVulnerabilities = await fetchVulnerabilities(applicationId);
  const vulnerabilities = apiVulnerabilities.map(mapVulnerability);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Vulnerabilities
          </h1>
          <p className="mt-2 text-gray-600">
            Manage vulnerabilities for this application
          </p>
        </div>
        <Link href={`/vulnerabilities/${applicationId}/import`}>
          <Button>Import from SAST Report</Button>
        </Link>
      </div>

      <VulnerabilityTable vulnerabilities={vulnerabilities} />
    </div>
  );
}
