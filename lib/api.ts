import { ApiVulnerability, Application } from '@/lib/types';

const DEFAULT_API_URL =
  'https://uat-dc-app1nexusdevops.dhanbank.com/devops-sast-api/';

function getApiBaseUrl(): string {
  return process.env.API_URL ?? DEFAULT_API_URL;
}

function joinApiUrl(pathname: string): string {
  const base = getApiBaseUrl();
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = pathname.startsWith('/')
    ? pathname.slice(1)
    : pathname;

  return new URL(normalizedPath, normalizedBase).toString();
}

async function apiGet<T>(pathname: string): Promise<T> {
  const response = await fetch(joinApiUrl(pathname), {
    cache: 'no-store',
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `API request failed (${response.status} ${response.statusText}): ${body}`
    );
  }

  return (await response.json()) as T;
}

export function fetchApplications(): Promise<Application[]> {
  return apiGet<Application[]>('/applications');
}

export function fetchApplication(id: string): Promise<Application> {
  return apiGet<Application>(`/applications/${id}`);
}

export function fetchVulnerabilities(
  applicationId: string
): Promise<ApiVulnerability[]> {
  return apiGet<ApiVulnerability[]>(
    `/applications/${applicationId}/vulnerabilities`
  );
}
