'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Base' },
  { href: '/events', label: 'Events' },
  { href: '/shop', label: 'Shop' },
  { href: '/book', label: 'Book a Table' },
  { href: '/community', label: 'Community' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
            <span style={{ fontSize: '1.8rem' }} className="slow-spin" title="☢">☢</span>
            <div>
              <div className="flicker" style={{ color: '#39ff14', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '0.05em', textShadow: '0 0 10px #39ff14' }}>
                CRITICAL MASS
              </div>
              <div style={{ color: '#7ab87a', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                Games • Tri-Cities
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div style={{ display: 'flex', gap: '0.25rem' }} className="hidden-mobile">
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

          {/* CTA */}
          <div className="hidden-mobile">
            <Link href="/book" className="btn-primary">
              <span>Roll the Dice</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="show-mobile"
            style={{
              background: 'none',
              border: 'none',
              color: '#39ff14',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            style={{
              borderTop: '1px solid rgba(57,255,20,0.2)',
              padding: '1rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  padding: '0.6rem 0.5rem',
                  color: pathname === href ? '#39ff14' : '#c8f5c2',
                  textDecoration: 'none',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontSize: '0.9rem',
                  borderLeft: pathname === href ? '3px solid #39ff14' : '3px solid transparent',
                  paddingLeft: '1rem',
                }}
              >
                {label}
              </Link>
            ))}
            <Link href="/book" className="btn-primary" onClick={() => setOpen(false)} style={{ marginTop: '0.5rem', textAlign: 'center' }}>
              <span>Roll the Dice</span>
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
