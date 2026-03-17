'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/Logo';

const navLinks = [
  { href: '/', label: 'Base' },
  { href: '/events', label: 'Events' },
  { href: '/shop', label: 'Shop' },
  { href: '/book', label: 'Book a Table' },
  { href: '/community', label: 'Community' },
  { href: '/board', label: 'Board' },
];

const TwitchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
  </svg>
);

const DiscordIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.87 19.87 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

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
            <Logo width={40} height={40} />
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

          {/* Desktop right: social icons + user menu or auth buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }} className="hidden-mobile">
            {/* Social links */}
            <a href="https://twitch.tv/PLACEHOLDER" target="_blank" rel="noopener noreferrer"
              title="Twitch" style={{ color: '#9147FF', opacity: 0.8, display: 'flex', alignItems: 'center', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0.8'}
            ><TwitchIcon /></a>
            <a href="https://discord.gg/uUdfzTds" target="_blank" rel="noopener noreferrer"
              title="Discord" style={{ color: '#5865F2', opacity: 0.8, display: 'flex', alignItems: 'center', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0.8'}
            ><DiscordIcon /></a>
            <div style={{ width: '1px', height: '20px', background: 'rgba(57,255,20,0.2)' }} />
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
