'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/dashboard';

    async function exchange() {
      if (!code) {
        router.replace('/auth/login?error=Missing+verification+code.');
        return;
      }

      const supabase = createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        router.replace(
          `/auth/login?error=${encodeURIComponent('Could not verify email. Try again.')}`,
        );
      } else {
        router.replace(next);
      }
    }

    exchange();
  }, [router, searchParams]);

  return null;
}

function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '1rem' }}>
      <Loader2 size={32} style={{ color: '#39ff14' }} className="slow-spin" />
      <p style={{ color: '#7ab87a', fontSize: '0.9rem', letterSpacing: '0.05em' }}>Verifying your session…</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoadingSpinner />
      <CallbackHandler />
    </Suspense>
  );
}
