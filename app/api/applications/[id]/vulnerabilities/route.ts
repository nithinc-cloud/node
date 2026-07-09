import { NextRequest, NextResponse } from 'next/server';

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

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_: NextRequest, { params }: RouteProps) {
  const { id } = await params;

  const upstream = await fetch(joinApiUrl(`/applications/${id}/vulnerabilities`), {
    cache: 'no-store',
  });

  const body = await upstream.text();

  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      'content-type':
        upstream.headers.get('content-type') ?? 'application/json',
    },
  });
}
