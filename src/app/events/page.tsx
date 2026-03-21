'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, Users, MapPin, Check, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';

const WEEK_START = '2025-03-17'; // Monday of the current week (update as needed)

const events = [
  {
    id: 1,
    day: 'Monday',
    shortDay: 'MON',
    date: 17,
    isoDate: '2025-03-17',
    title: "D&D Monday Night Meltdown",
    type: 'RPG / D&D 5e',
    time: '6:00 PM – 10:00 PM',
    timeShort: '6:00 PM',
    table: 'Tables 1 & 2',
    spots: 4,
    totalSpots: 6,
    difficulty: 'All Levels',
    description:
      'Dive into the Tri-Cities Collective campaign world. New players always welcome — pre-generated characters available. DMs rotate weekly so every session is fresh.',
    tags: ['D&D 5e', 'RPG', 'Drop-in OK'],
    cost: 'Free',
  },
  {
    id: 2,
    day: 'Tuesday',
    shortDay: 'TUE',
    date: 18,
    isoDate: '2025-03-18',
    title: 'Board Game Reactor',
    type: 'Board Games',
    time: '5:00 PM – 9:00 PM',
    timeShort: '5:00 PM',
    table: 'Open Floor',
    spots: 20,
    totalSpots: 30,
    difficulty: 'Casual',
    description:
      'Open board game night. Pull from our library of 200+ titles or bring your own. Teach-plays available for new titles. Family friendly until 8pm.',
    tags: ['Board Games', 'Family Friendly', 'Library Access'],
    cost: 'Free',
  },
  {
    id: 3,
    day: 'Wednesday',
    shortDay: 'WED',
    date: 19,
    isoDate: '2025-03-19',
    title: 'Warhammer 40K — Cascade of Fate',
    type: 'Miniatures',
    time: '5:30 PM – 10:00 PM',
    timeShort: '5:30 PM',
    table: 'Tables 3–6',
    spots: 8,
    totalSpots: 16,
    difficulty: 'Intermediate',
    description:
      'Structured Warhammer 40K play. Bring your army at 1000 or 2000 points. Loaner models available for beginners. Painting tips and hobby chat encouraged.',
    tags: ['Warhammer 40K', 'Miniatures', 'Competitive'],
    cost: '$5 table fee',
  },
  {
    id: 4,
    day: 'Thursday',
    shortDay: 'THU',
    date: 20,
    isoDate: '2025-03-20',
    title: 'Pathfinder / TTRPG Night',
    type: 'RPG / Pathfinder 2e',
    time: '6:00 PM – 10:00 PM',
    timeShort: '6:00 PM',
    table: 'Tables 1 & 2',
    spots: 6,
    totalSpots: 8,
    difficulty: 'All Levels',
    description:
      'Pathfinder 2e Adventure Path — currently running Abomination Vaults. Also hosting one-shot tables using Starfinder and Call of Cthulhu on rotation.',
    tags: ['Pathfinder', 'TTRPG', 'Ongoing Campaign'],
    cost: 'Free',
  },
  {
    id: 5,
    day: 'Friday',
    shortDay: 'FRI',
    date: 21,
    isoDate: '2025-03-21',
    title: 'Magic: the Gathering Draft Night',
    type: 'CCG / MtG',
    time: '7:00 PM – 11:00 PM',
    timeShort: '7:00 PM',
    table: 'Tables 3 & 4',
    spots: 12,
    totalSpots: 24,
    difficulty: 'All Levels',
    description:
      'Weekly MtG booster draft. Current set available. $15 entry includes 3 packs. Prize support for top finishers. Commander tables also running all evening.',
    tags: ['Magic: tG', 'Draft', 'Commander', 'Prize Support'],
    cost: '$15 entry',
  },
  {
    id: 6,
    day: 'Saturday',
    shortDay: 'SAT',
    date: 22,
    isoDate: '2025-03-22',
    title: 'Open Table Saturday — All Systems Go',
    type: 'Open Play',
    time: '11:00 AM – 11:00 PM',
    timeShort: '11:00 AM',
    table: 'All Tables',
    spots: 20,
    totalSpots: 40,
    difficulty: 'Everyone',
    description:
      'Our biggest day. All tables open, all systems welcome: 40K, D&D, board games, CCGs, wargames, RPGs. Tournament-style events run afternoon. Youth league at 2pm.',
    tags: ['Open Play', 'All Games', 'Youth League', 'Tournament'],
    cost: 'Free / varies by event',
  },
  {
    id: 7,
    day: 'Sunday',
    shortDay: 'SUN',
    date: 23,
    isoDate: '2025-03-23',
    title: 'Covenant Gaming — Church & Family Day',
    type: 'Family / Community',
    time: '12:00 PM – 7:00 PM',
    timeShort: '12:00 PM',
    table: 'Open Floor',
    spots: 15,
    totalSpots: 30,
    difficulty: 'All Ages',
    description:
      'A family-focused session open to church groups, scout troops, and community organizations. Supervised, low-key, family-friendly titles. Group discounts available.',
    tags: ['Family', 'Community', 'Groups Welcome', 'All Ages'],
    cost: 'Free for groups',
  },
];

const typeColors: Record<string, string> = {
  'RPG / D&D 5e': '#a78bfa',
  'Board Games': '#60a5fa',
  'Miniatures': '#f59e0b',
  'RPG / Pathfinder 2e': '#a78bfa',
  'CCG / MtG': '#f87171',
  'Open Play': '#39ff14',
  'Family / Community': '#34d399',
};

export default function EventsPage() {
  const { user } = useAuth();
  const supabase = createClient();

  // Track signup state per event: 'idle' | 'loading' | 'signed_up' | 'error'
  const [signupState, setSignupState] = useState<Record<number, 'idle' | 'loading' | 'signed_up' | 'error'>>({});

  const handleSignup = async (event: typeof events[0]) => {
    if (!user) return;
    setSignupState(prev => ({ ...prev, [event.id]: 'loading' }));

    const { error } = await supabase.from('event_signups').insert({
      user_id: user.id,
      event_id: event.id,
      event_title: event.title,
      event_date: event.isoDate,
      event_time: event.timeShort,
    });

    if (error) {
      // 23505 = unique violation = already signed up
      setSignupState(prev => ({ ...prev, [event.id]: error.code === '23505' ? 'signed_up' : 'error' }));
    } else {
      setSignupState(prev => ({ ...prev, [event.id]: 'signed_up' }));
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div className="rad-badge" style={{ marginBottom: '1rem' }}>⚡ Live Schedule</div>
        <h1 className="gradient-text" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          Weekly Events
        </h1>
        <p style={{ color: '#8a8a9a', maxWidth: '600px', lineHeight: 1.7 }}>
          Something is happening every single day.{' '}
          {user ? 'Click "Reserve Spot" to save your seat.' : (
            <><Link href="/auth/login" style={{ color: '#39ff14', textDecoration: 'none' }}>Log in</Link> to reserve your spot at events.</>
          )}
        </p>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {Object.entries(typeColors).map(([type, color]) => (
          <div key={type} className="rad-badge" style={{ borderColor: color + '55', color }}>
            {type}
          </div>
        ))}
      </div>

      {/* Event cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {events.map((event) => {
          const typeColor = typeColors[event.type] || '#39ff14';
          const fillPct = ((event.totalSpots - event.spots) / event.totalSpots) * 100;
          const state = signupState[event.id] ?? 'idle';

          return (
            <div
              key={event.id}
              className="panel panel-hover"
              style={{
                borderLeft: `3px solid ${typeColor}`,
                padding: '1.5rem',
                borderRadius: '12px',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '1.5rem',
                alignItems: 'start',
              }}
            >
              {/* Date block */}
              <div style={{ background: `${typeColor}15`, border: `1px solid ${typeColor}40`, borderRadius: '12px', padding: '0.75rem', textAlign: 'center', minWidth: '60px' }}>
                <div style={{ fontSize: '0.6rem', fontFamily: "'Orbitron', sans-serif", color: typeColor, letterSpacing: '0.1em', marginBottom: '0.2rem' }}>{event.shortDay}</div>
                <div style={{ fontSize: '2rem', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, color: typeColor, lineHeight: 1 }}>{event.date}</div>
              </div>

              {/* Content */}
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: typeColor, letterSpacing: '0.12em', textTransform: 'uppercase', background: `${typeColor}15`, padding: '0.15rem 0.5rem', border: `1px solid ${typeColor}40`, borderRadius: '12px' }}>
                    {event.type}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#5a5a6a', letterSpacing: '0.1em' }}>{event.difficulty}</span>
                </div>

                <h3 style={{ color: '#e8e6e3', fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.6rem', lineHeight: 1.3 }}>
                  {event.title}
                </h3>

                <p style={{ color: '#8a8a9a', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.75rem', maxWidth: '640px' }}>
                  {event.description}
                </p>

                <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#8a8a9a', fontSize: '0.8rem' }}>
                    <Clock size={12} style={{ color: '#39ff14' }} /> {event.time}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#8a8a9a', fontSize: '0.8rem' }}>
                    <MapPin size={12} style={{ color: '#39ff14' }} /> {event.table}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#8a8a9a', fontSize: '0.8rem' }}>
                    <Users size={12} style={{ color: '#39ff14' }} /> {event.spots} spots left
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {event.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.7rem', color: '#5a5a6a', background: 'rgba(191,64,255,0.05)', border: '1px solid rgba(191,64,255,0.2)', padding: '0.15rem 0.5rem', borderRadius: '12px', letterSpacing: '0.05em' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Capacity bar */}
                <div style={{ marginTop: '0.85rem' }}>
                  <div style={{ fontSize: '0.7rem', color: '#5a5a6a', marginBottom: '0.3rem' }}>
                    CAPACITY: {event.totalSpots - event.spots}/{event.totalSpots}
                  </div>
                  <div style={{ height: '3px', background: 'rgba(191,64,255,0.1)', borderRadius: '12px', width: '200px', maxWidth: '100%' }}>
                    <div style={{ height: '100%', borderRadius: '12px', width: `${fillPct}%`, background: fillPct > 80 ? '#ff4444' : typeColor, transition: 'width 0.3s' }} />
                  </div>
                </div>
              </div>

              {/* Right: cost + CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem', minWidth: '110px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.65rem', color: '#5a5a6a', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>ENTRY</div>
                  <div style={{ color: '#39ff14', fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: '0.9rem' }}>{event.cost}</div>
                </div>

                {user ? (
                  <button
                    onClick={() => handleSignup(event)}
                    disabled={state !== 'idle'}
                    className={state === 'signed_up' ? 'btn-secondary' : 'btn-secondary'}
                    style={{
                      fontSize: '0.75rem', fontFamily: "'Orbitron', sans-serif", padding: '0.4rem 0.75rem', whiteSpace: 'nowrap',
                      opacity: state === 'loading' ? 0.7 : 1,
                      color: state === 'signed_up' ? '#39ff14' : undefined,
                      borderColor: state === 'signed_up' ? '#39ff14' : undefined,
                      cursor: state !== 'idle' ? 'default' : 'pointer',
                    }}
                  >
                    {state === 'loading' && <Loader2 size={12} className="slow-spin" style={{ display: 'inline', marginRight: '4px' }} />}
                    {state === 'signed_up' && <Check size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                    {state === 'idle' && 'Reserve Spot'}
                    {state === 'loading' && 'Saving...'}
                    {state === 'signed_up' && 'Registered!'}
                    {state === 'error' && 'Try Again'}
                  </button>
                ) : (
                  <Link href="/auth/login?redirectTo=/events" className="btn-secondary" style={{ fontSize: '0.75rem', fontFamily: "'Orbitron', sans-serif", padding: '0.4rem 0.75rem', whiteSpace: 'nowrap' }}>
                    Log in to Sign Up
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Newsletter CTA */}
      <div className="warning-stripe glow-border" style={{ marginTop: '3rem', padding: '2.5rem', borderRadius: '12px', textAlign: 'center', borderColor: 'rgba(191,64,255,0.3)' }}>
        <div className="rad-badge" style={{ marginBottom: '1rem' }}>✦ Coming Soon</div>
        <h3 className="gradient-text" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          Monthly Tournaments & Special Events
        </h3>
        <p style={{ color: '#8a8a9a', maxWidth: '550px', margin: '0 auto 1.5rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
          Painting competitions, RPG marathons, charity game-a-thons, and Tri-Cities championship brackets — sign up for early access.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
          <input type="email" placeholder="your@email.com" style={{ padding: '0.65rem 1rem', borderRadius: '12px', width: '260px', fontSize: '0.9rem' }} />
          <button className="btn-primary" style={{ fontFamily: "'Orbitron', sans-serif" }}><span>Join the Quest</span></button>
        </div>
      </div>
    </div>
  );
}
