'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { href: '/', label: 'Base' },
  { href: '/events', label: 'Events' },
  { href: '/shop', label: 'Shop' },
  { href: '/book', label: 'Book a Table' },
  { href: '/community', label: 'Community' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
    router.push('/');
    router.refresh();
  };

  const displayName = user?.user_metadata?.username
    || user?.user_metadata?.full_name?.split(' ')[0]
    || user?.email?.split('@')[0]
    || 'Operative';

  return (
    <nav
      style={{
        background: 'rgba(5, 10, 5, 0.95)',
        borderBottom: '1px solid rgba(57, 255, 20, 0.3)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 2px 20px rgba(57, 255, 20, 0.15)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.8rem' }} className="slow-spin">☢</span>
            <div>
              <div className="flicker" style={{ color: '#39ff14', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '0.05em', textShadow: '0 0 10px #39ff14' }}>
                CRITICAL MASS
              </div>
              <div style={{ color: '#7ab87a', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                Games · Tri-Cities
              </div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="hidden-mobile">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    padding: '0.4rem 0.9rem',
                    fontSize: '0.85rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: active ? '#39ff14' : '#c8f5c2',
                    background: active ? 'rgba(57,255,20,0.1)' : 'transparent',
                    border: active ? '1px solid rgba(57,255,20,0.5)' : '1px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = '#39ff14';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,20,0.3)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = '#c8f5c2';
                      (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                    }
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Desktop right: user menu or auth buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }} className="hidden-mobile">
            {loading ? (
              <div className="pulse rad-badge">Loading...</div>
            ) : user ? (
              /* Logged-in user menu */
              <div ref={userMenuRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setUserMenuOpen(v => !v)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(57,255,20,0.08)',
                    border: '1px solid rgba(57,255,20,0.4)',
                    color: '#c8f5c2',
                    padding: '0.4rem 0.9rem',
                    cursor: 'pointer',
                    fontFamily: 'Courier New, monospace',
                    fontSize: '0.85rem',
                    transition: 'all 0.2s',
                  }}
                >
                  <User size={14} style={{ color: '#39ff14' }} />
                  {displayName}
                  <ChevronDown size={12} style={{ color: '#7ab87a', transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                </button>

                {userMenuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 0.5rem)',
                      right: 0,
                      background: '#0a1a0a',
                      border: '1px solid rgba(57,255,20,0.3)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                      minWidth: '180px',
                      zIndex: 100,
                    }}
                  >
                    <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(57,255,20,0.1)' }}>
                      <div style={{ fontSize: '0.7rem', color: '#4a6b4a', letterSpacing: '0.1em' }}>LOGGED IN AS</div>
                      <div style={{ color: '#39ff14', fontSize: '0.85rem', fontWeight: 600, marginTop: '0.15rem', wordBreak: 'break-all' }}>
                        {user.email}
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.7rem 1rem', color: '#c8f5c2', textDecoration: 'none', fontSize: '0.85rem', transition: 'background 0.2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(57,255,20,0.07)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                    >
                      <LayoutDashboard size={14} style={{ color: '#39ff14' }} /> Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.7rem 1rem', color: '#ff8888', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'Courier New, monospace', fontSize: '0.85rem', borderTop: '1px solid rgba(57,255,20,0.1)', transition: 'background 0.2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,68,68,0.07)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                    >
                      <LogOut size={14} /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Guest buttons */
              <>
                <Link href="/auth/login" className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                  Log In
                </Link>
                <Link href="/book" className="btn-primary">
                  <span>Roll the Dice</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="show-mobile"
            style={{ background: 'none', border: 'none', color: '#39ff14', cursor: 'pointer', padding: '0.5rem' }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ borderTop: '1px solid rgba(57,255,20,0.2)', padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: '0.6rem 1rem',
                  color: pathname === href ? '#39ff14' : '#c8f5c2',
                  textDecoration: 'none',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontSize: '0.9rem',
                  borderLeft: pathname === href ? '3px solid #39ff14' : '3px solid transparent',
                }}
              >
                {label}
              </Link>
            ))}

            <div style={{ borderTop: '1px solid rgba(57,255,20,0.15)', paddingTop: '0.75rem', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', color: '#c8f5c2', textDecoration: 'none', fontSize: '0.9rem' }}>
                    <LayoutDashboard size={14} style={{ color: '#39ff14' }} /> Dashboard
                  </Link>
                  <button onClick={() => { setMobileOpen(false); handleSignOut(); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', color: '#ff8888', background: 'none', border: 'none', fontFamily: 'Courier New, monospace', fontSize: '0.9rem', cursor: 'pointer', textAlign: 'left' }}>
                    <LogOut size={14} /> Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="btn-secondary" style={{ textAlign: 'center' }}>Log In</Link>
                  <Link href="/auth/signup" onClick={() => setMobileOpen(false)} className="btn-primary" style={{ textAlign: 'center' }}><span>Create Account</span></Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 901px) { .show-mobile { display: none !important; } }
      `}</style>
    </nav>
  );
}
