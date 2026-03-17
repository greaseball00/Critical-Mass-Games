'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import SocialAuthButtons from '@/components/SocialAuthButtons';
import Logo from '@/components/Logo';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push(redirectTo);
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <label style={{ display: 'block', fontSize: '0.75rem', color: '#7ab87a', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="operative@domain.com"
          required
          style={{ width: '100%', padding: '0.7rem 0.9rem', fontSize: '0.95rem' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.75rem', color: '#7ab87a', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
          Password
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            style={{ width: '100%', padding: '0.7rem 2.5rem 0.7rem 0.9rem', fontSize: '0.95rem' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#7ab87a', cursor: 'pointer', padding: 0 }}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.4)', padding: '0.75rem', color: '#ff8888', fontSize: '0.85rem' }}>
          ⚠ {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary"
        style={{ width: '100%', opacity: loading ? 0.6 : 1, cursor: loading ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <LogIn size={16} /> {loading ? 'Authenticating...' : 'Log In'}
        </span>
      </button>

      <SocialAuthButtons />

      <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#7ab87a' }}>
        No account yet?{' '}
        <Link href="/auth/signup" style={{ color: '#39ff14', textDecoration: 'none' }}>
          Create one here
        </Link>
      </div>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Logo width={64} height={64} className="slow-spin" style={{ marginBottom: '1rem' }} />
          <div className="rad-badge" style={{ marginBottom: '1rem' }}>Secure Access Terminal</div>
          <h1 style={{ color: '#39ff14', fontWeight: 900, fontSize: '1.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', textShadow: '0 0 15px rgba(57,255,20,0.5)' }}>
            Log In
          </h1>
          <p style={{ color: '#7ab87a', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Access your Critical Mass account
          </p>
        </div>

        {/* Card */}
        <div className="panel glow-border" style={{ padding: '2rem' }}>
          <Suspense fallback={<div style={{ color: '#7ab87a' }}>Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>

        <p style={{ textAlign: 'center', color: '#4a6b4a', fontSize: '0.75rem', marginTop: '1.5rem', letterSpacing: '0.05em' }}>
          Your account is protected by Supabase Auth
        </p>
      </div>
    </div>
  );
}
