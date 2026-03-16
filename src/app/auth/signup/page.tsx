'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Eye, EyeOff, UserPlus, Check } from 'lucide-react';
import SocialAuthButtons from '@/components/SocialAuthButtons';

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, username },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
        <div style={{ width: '100%', maxWidth: '420px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>☢</div>
          <div className="panel glow-border" style={{ padding: '2.5rem' }}>
            <div style={{ width: '50px', height: '50px', background: 'rgba(57,255,20,0.1)', border: '2px solid #39ff14', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <Check size={24} style={{ color: '#39ff14' }} />
            </div>
            <h2 style={{ color: '#39ff14', fontWeight: 700, fontSize: '1.4rem', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              Account Created!
            </h2>
            <p style={{ color: '#7ab87a', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              We&apos;ve sent a confirmation email to <strong style={{ color: '#c8f5c2' }}>{email}</strong>.
              Click the link to verify your account and you&apos;re ready to roll.
            </p>
            <Link href="/auth/login" className="btn-primary">
              <span>Go to Login</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }} className="slow-spin">☢</div>
          <div className="rad-badge" style={{ marginBottom: '1rem' }}>New Operative Registration</div>
          <h1 style={{ color: '#39ff14', fontWeight: 900, fontSize: '1.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', textShadow: '0 0 15px rgba(57,255,20,0.5)' }}>
            Join Up
          </h1>
          <p style={{ color: '#7ab87a', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Create your Critical Mass account — it&apos;s free
          </p>
        </div>

        {/* Card */}
        <div className="panel glow-border" style={{ padding: '2rem' }}>
          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: '#7ab87a', letterSpacing: '0.1em', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Jane Smith"
                  required
                  style={{ width: '100%', padding: '0.65rem 0.8rem', fontSize: '0.9rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: '#7ab87a', letterSpacing: '0.1em', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  placeholder="goblin_lord"
                  required
                  minLength={3}
                  maxLength={20}
                  style={{ width: '100%', padding: '0.65rem 0.8rem', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', color: '#7ab87a', letterSpacing: '0.1em', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="operative@domain.com"
                required
                style={{ width: '100%', padding: '0.65rem 0.8rem', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', color: '#7ab87a', letterSpacing: '0.1em', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="8+ characters"
                  required
                  minLength={8}
                  style={{ width: '100%', padding: '0.65rem 2.5rem 0.65rem 0.8rem', fontSize: '0.9rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#7ab87a', cursor: 'pointer', padding: 0 }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Strength indicator */}
              <div style={{ display: 'flex', gap: '4px', marginTop: '0.4rem' }}>
                {[8, 12, 16].map((threshold, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: '3px',
                      background: password.length >= threshold
                        ? i === 0 ? '#ff4444' : i === 1 ? '#ffd700' : '#39ff14'
                        : 'rgba(57,255,20,0.1)',
                      transition: 'background 0.3s',
                    }}
                  />
                ))}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#4a6b4a', marginTop: '0.25rem' }}>
                {password.length === 0 ? 'Enter a password' : password.length < 8 ? 'Too short' : password.length < 12 ? 'Decent' : password.length < 16 ? 'Strong' : 'Excellent'}
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
              style={{ width: '100%', opacity: loading ? 0.6 : 1, cursor: loading ? 'wait' : 'pointer', marginTop: '0.25rem' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <UserPlus size={16} /> {loading ? 'Creating account...' : 'Create Account'}
              </span>
            </button>

            <SocialAuthButtons />

            <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#7ab87a' }}>
              Already have an account?{' '}
              <Link href="/auth/login" style={{ color: '#39ff14', textDecoration: 'none' }}>
                Log in here
              </Link>
            </div>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: '#4a6b4a', fontSize: '0.75rem', marginTop: '1.5rem' }}>
          By signing up you agree to keep it fun and treat everyone at the table with respect.
        </p>
      </div>
    </div>
  );
}
