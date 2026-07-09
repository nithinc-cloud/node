'use client';

import Link from 'next/link';
import { Card } from './card';
import { Button } from './button';

interface Application {
  id: string;
  name: string;
  owner: string;
  gitlabUrl: string;
  criticalCve: number;
  highCve: number;
  mediumCve: number;
  lowCve: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ApplicationTableProps {
  applications: Application[];
  onDelete?: (id: string) => Promise<void> | void;
  isLoading?: boolean;
}

export function ApplicationTable({
  applications,
  onDelete,
  isLoading = false,
}: ApplicationTableProps) {
  if (applications.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-gray-500 mb-4">No applications found</p>
        <Link href="/applications/new">
          <Button>Create Application</Button>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Critical
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                High
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Medium
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Low
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/applications/${app.id}`}
                    className="text-blue-600 hover:text-blue-900 font-medium"
                  >
                    {app.name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {app.owner}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      app.criticalCve > 0
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {app.criticalCve}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      app.highCve > 0
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {app.highCve}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      app.mediumCve > 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {app.mediumCve}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {app.lowCve}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Link href={`/applications/${app.id}/edit`}>
                    <Button size="sm">Edit</Button>
                  </Link>
                  <Link href={`/vulnerabilities/${app.id}`}>
                    <Button size="sm" variant="outline">
                      Vulnerabilities
                    </Button>
                  </Link>
                  {onDelete && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDelete(app.id)}
                      disabled={isLoading}
                    >
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
