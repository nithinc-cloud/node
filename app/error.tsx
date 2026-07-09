'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Something went wrong</h1>
      <Card className="p-6 space-y-4">
        <p className="text-sm text-gray-700">{error.message}</p>
        <Button onClick={reset}>Try again</Button>
      </Card>
    </div>
  );
}
