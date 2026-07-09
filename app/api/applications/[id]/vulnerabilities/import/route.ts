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

  console.log(new URL(normalizedPath, normalizedBase).toString())
  return new URL(normalizedPath, normalizedBase).toString();
}

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(request: NextRequest, { params }: RouteProps) {
  const { id } = await params;
  const formData = await request.formData();

  const upstream = await fetch(
    joinApiUrl(`/applications/${id}/vulnerabilities/import`),
    {
      method: 'POST',
      body: formData,
    }
  );

  const body = await upstream.text();

  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      'content-type':
        upstream.headers.get('content-type') ?? 'application/json',
    },
  });
}
