'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        background: '#050a05',
        borderTop: '1px solid rgba(57,255,20,0.2)',
        marginTop: '4rem',
      }}
    >
      <div className="warning-stripe" style={{ height: '4px' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem' }} className="slow-spin">☢</span>
              <div>
                <div className="glow-green" style={{ fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '0.05em' }}>
                  CRITICAL MASS
                </div>
                <div style={{ color: '#7ab87a', fontSize: '0.7rem', letterSpacing: '0.2em' }}>GAMES</div>
              </div>
            </div>
            <p style={{ color: '#7ab87a', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              Your neighborhood game shop in the Tri-Cities.
              Where every roll could go critical.
            </p>
            <div className="rad-badge">⚛ Tri-Cities HQ</div>
          </div>

          {/* Location & Hours */}
          <div>
            <h4 style={{ color: '#39ff14', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem', fontSize: '0.85rem' }}>
              Coordinates
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem', color: '#c8f5c2', fontSize: '0.85rem' }}>
                <MapPin size={14} style={{ color: '#39ff14', marginTop: '2px', flexShrink: 0 }} />
                123 Fission Ave, Kennewick, WA 99336
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', color: '#c8f5c2', fontSize: '0.85rem' }}>
                <Phone size={14} style={{ color: '#39ff14', marginTop: '2px', flexShrink: 0 }} />
                (509) 555-0137
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', color: '#c8f5c2', fontSize: '0.85rem' }}>
                <Mail size={14} style={{ color: '#39ff14', marginTop: '2px', flexShrink: 0 }} />
                play@criticalmass.games
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', color: '#c8f5c2', fontSize: '0.85rem' }}>
                <Clock size={14} style={{ color: '#39ff14', marginTop: '2px', flexShrink: 0 }} />
                <span>Mon–Thu 12–9pm · Fri–Sat 11–11pm · Sun 12–7pm</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#39ff14', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem', fontSize: '0.85rem' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { href: '/events', label: 'Weekly Events' },
                { href: '/shop', label: 'Shop' },
                { href: '/book', label: 'Book a Table' },
                { href: '/community', label: 'Community Outreach' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} style={{ color: '#7ab87a', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#39ff14'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#7ab87a'}
                  >
                    &rsaquo; {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 style={{ color: '#39ff14', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem', fontSize: '0.85rem' }}>
              Community
            </h4>
            <p style={{ color: '#7ab87a', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              Partnering with schools, churches, and youth groups across the Tri-Cities to bring people together through the power of play.
            </p>
            <Link href="/community" className="btn-secondary" style={{ fontSize: '0.8rem' }}>
              Get Involved
            </Link>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(57,255,20,0.15)', marginTop: '2.5rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: '#4a6b4a', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
            © 2025 CRITICAL MASS GAMES — KENNEWICK, WA — ALL RIGHTS RESERVED
          </p>
          <div className="rad-badge pulse">
            ☢ RADIATION LEVEL: FUN
          </div>
        </div>
      </div>
    </footer>
  );
}
