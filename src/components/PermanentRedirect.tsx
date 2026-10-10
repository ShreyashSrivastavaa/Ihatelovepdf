'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function PermanentRedirect({ destination }: { destination: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(destination);
  }, [router, destination]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <p className="text-base font-semibold text-[var(--tx)]">
        Redirecting you to <Link href={destination} className="text-[var(--accent)] underline">{destination}</Link>...
      </p>
      <noscript>
        <meta httpEquiv="refresh" content={`0;url=${destination}`} />
        <p className="text-sm text-[var(--tx-2)]">
          If you are not redirected automatically, <Link href={destination} className="text-[var(--accent)] underline">click here</Link>.
        </p>
      </noscript>
    </div>
  );
}
