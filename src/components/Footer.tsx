'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0a0a0f',
        borderTop: '1px solid rgba(191,64,255,0.2)',
        marginTop: '4rem',
      }}
    >
      <div className="divider" style={{ margin: '0 auto', maxWidth: '100%', opacity: 0.6 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Logo width={36} height={36} />
              <div>
                <div className="gradient-text" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.05em' }}>
                  CRITICAL MASS
                </div>
                <div style={{ color: '#8a8a9a', fontSize: '0.7rem', letterSpacing: '0.2em', fontFamily: "'Orbitron', sans-serif" }}>GAMES</div>
              </div>
            </div>
            <p style={{ color: '#8a8a9a', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1rem', fontStyle: 'italic' }}>
              Your neighborhood game shop in the Tri-Cities.
              Where arcane energy meets atomic power.
            </p>
            <div className="rad-badge">&#9883; Tri-Cities HQ</div>
          </div>

          {/* Location & Hours */}
          <div>
            <h4 style={{ fontFamily: "'Orbitron', sans-serif", color: '#bf40ff', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', fontSize: '0.8rem' }}>
              Coordinates
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem', color: '#e8e6e3', fontSize: '0.85rem' }}>
                <MapPin size={14} style={{ color: '#39ff14', marginTop: '2px', flexShrink: 0 }} />
                123 Fission Ave, Kennewick, WA 99336
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', color: '#e8e6e3', fontSize: '0.85rem' }}>
                <Phone size={14} style={{ color: '#bf40ff', marginTop: '2px', flexShrink: 0 }} />
                (509) 555-0137
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', color: '#e8e6e3', fontSize: '0.85rem' }}>
                <Mail size={14} style={{ color: '#ff6a00', marginTop: '2px', flexShrink: 0 }} />
                play@criticalmass.games
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', color: '#e8e6e3', fontSize: '0.85rem' }}>
                <Clock size={14} style={{ color: '#39ff14', marginTop: '2px', flexShrink: 0 }} />
                <span>Mon&#8211;Thu 12&#8211;9pm &middot; Fri&#8211;Sat 11&#8211;11pm &middot; Sun 12&#8211;7pm</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "'Orbitron', sans-serif", color: '#bf40ff', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', fontSize: '0.8rem' }}>
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
                  <Link href={href} style={{ color: '#8a8a9a', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#39ff14'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#8a8a9a'}
                  >
                    &rsaquo; {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 style={{ fontFamily: "'Orbitron', sans-serif", color: '#bf40ff', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', fontSize: '0.8rem' }}>
              Community
            </h4>
            <p style={{ color: '#8a8a9a', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              Partnering with schools, churches, and youth groups across the Tri-Cities to bring people together through the power of play.
            </p>
            <Link href="/community" className="btn-secondary" style={{ fontSize: '0.75rem' }}>
              Get Involved
            </Link>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <a href="https://twitch.tv/PLACEHOLDER" target="_blank" rel="noopener noreferrer" title="Watch us on Twitch"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#9147FF', fontSize: '0.8rem', textDecoration: 'none', opacity: 0.8, transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0.8'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" /></svg>
                Twitch
              </a>
              <a href="https://discord.gg/uUdfzTds" target="_blank" rel="noopener noreferrer" title="Join our Discord"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#5865F2', fontSize: '0.8rem', textDecoration: 'none', opacity: 0.8, transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0.8'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.87 19.87 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
                Discord
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(191,64,255,0.15)', marginTop: '2.5rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: '#5a5a6a', fontSize: '0.7rem', letterSpacing: '1px', fontFamily: "'Orbitron', sans-serif" }}>
            &copy; 2025 CRITICAL MASS GAMES &#8212; KENNEWICK, WA &#8212; ALL RIGHTS RESERVED
          </p>
          <div className="rad-badge pulse" style={{ borderColor: 'rgba(191,64,255,0.4)', color: '#bf40ff' }}>
            &#10023; ARCANE LEVEL: LEGENDARY
          </div>
        </div>
      </div>
    </footer>
  );
}
