'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ApplicationDetailError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Card className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900">
        Failed to load application details
      </h1>
      <p className="text-sm text-gray-700">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </Card>
  );
}
