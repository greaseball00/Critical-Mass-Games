'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, Users, Trash2, User, Edit3, Check, Loader2, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';
import type { Booking, EventSignup, Profile } from '@/types/database';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [signups, setSignups] = useState<EventSignup[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Profile edit state
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ full_name: '', username: '', bio: '' });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?redirectTo=/dashboard');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      setLoading(true);
      const [bookingsRes, signupsRes, profileRes] = await Promise.all([
        supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user!.id)
          .order('date', { ascending: true }),
        supabase
          .from('event_signups')
          .select('*')
          .eq('user_id', user!.id)
          .order('event_date', { ascending: true }),
        supabase
          .from('profiles')
          .select('*')
          .eq('id', user!.id)
          .single(),
      ]);

      setBookings((bookingsRes.data ?? []) as Booking[]);
      setSignups((signupsRes.data ?? []) as EventSignup[]);
      if (profileRes.data) {
        const p = profileRes.data as unknown as Profile;
        setProfile(p);
        setProfileForm({
          full_name: p.full_name ?? '',
          username: p.username ?? '',
          bio: p.bio ?? '',
        });
      }
      setLoading(false);
    }

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const cancelBooking = async (id: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', id);
    if (!error) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
    }
  };

  const removeSignup = async (id: string) => {
    const { error } = await supabase.from('event_signups').delete().eq('id', id);
    if (!error) {
      setSignups(prev => prev.filter(s => s.id !== id));
    }
  };

  const saveProfile = async () => {
    if (!user) return;
    setProfileSaving(true);
    setProfileMsg('');
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: profileForm.full_name, username: profileForm.username, bio: profileForm.bio })
      .eq('id', user.id);
    if (error) {
      setProfileMsg(error.message.includes('unique') ? 'That username is already taken.' : error.message);
    } else {
      setProfileMsg('Profile updated!');
      setEditingProfile(false);
    }
    setProfileSaving(false);
  };

  if (authLoading || loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <Loader2 size={32} style={{ color: '#39ff14' }} className="slow-spin" />
      </div>
    );
  }

  if (!user) return null;

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed' && new Date(b.date) >= new Date());
  const pastBookings = bookings.filter(b => b.status !== 'confirmed' || new Date(b.date) < new Date());
  const upcomingSignups = signups.filter(s => new Date(s.event_date) >= new Date());

  const displayName = profile?.full_name || user.email?.split('@')[0] || 'Operative';
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div className="rad-badge" style={{ marginBottom: '1rem' }}>⚛ Command Center</div>
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 900, color: '#39ff14', letterSpacing: '0.05em', textTransform: 'uppercase', textShadow: '0 0 20px rgba(57,255,20,0.5)' }}>
          Dashboard
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>

        {/* Left column: Profile */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="panel" style={{ padding: '1.5rem' }}>
            {/* Avatar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: 'rgba(57,255,20,0.1)', border: '2px solid #39ff14',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', fontWeight: 700, color: '#39ff14',
                boxShadow: '0 0 20px rgba(57,255,20,0.3)',
              }}>
                {initials}
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#c8f5c2', fontWeight: 700, fontSize: '1rem' }}>{displayName}</div>
                {profile?.username && <div style={{ color: '#39ff14', fontSize: '0.8rem' }}>@{profile.username}</div>}
                <div style={{ color: '#4a6b4a', fontSize: '0.75rem', marginTop: '0.25rem', wordBreak: 'break-all' }}>{user.email}</div>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {[
                { label: 'Bookings', value: upcomingBookings.length },
                { label: 'Events', value: upcomingSignups.length },
              ].map(s => (
                <div key={s.label} style={{ background: 'rgba(57,255,20,0.05)', border: '1px solid rgba(57,255,20,0.15)', padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ color: '#39ff14', fontSize: '1.4rem', fontWeight: 900 }}>{s.value}</div>
                  <div style={{ color: '#7ab87a', fontSize: '0.7rem', letterSpacing: '0.1em' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setEditingProfile(v => !v)}
              className="btn-secondary"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.8rem' }}
            >
              <Edit3 size={13} /> Edit Profile
            </button>
          </div>

          {/* Profile edit panel */}
          {editingProfile && (
            <div className="panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ color: '#39ff14', fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: 700 }}>EDIT PROFILE</div>
                <button onClick={() => setEditingProfile(false)} style={{ background: 'none', border: 'none', color: '#7ab87a', cursor: 'pointer' }}><X size={14} /></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  { key: 'full_name', label: 'Full Name', placeholder: 'Jane Smith' },
                  { key: 'username', label: 'Username', placeholder: 'goblin_lord' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ display: 'block', fontSize: '0.7rem', color: '#7ab87a', letterSpacing: '0.1em', marginBottom: '0.3rem', textTransform: 'uppercase' }}>{field.label}</label>
                    <input
                      value={profileForm[field.key as keyof typeof profileForm]}
                      onChange={e => setProfileForm(p => ({ ...p, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      style={{ width: '100%', padding: '0.5rem 0.7rem', fontSize: '0.85rem' }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontSize: '0.7rem', color: '#7ab87a', letterSpacing: '0.1em', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Bio</label>
                  <textarea
                    value={profileForm.bio}
                    onChange={e => setProfileForm(p => ({ ...p, bio: e.target.value }))}
                    rows={3}
                    placeholder="Tell your party a bit about yourself..."
                    style={{ width: '100%', padding: '0.5rem 0.7rem', fontSize: '0.85rem', resize: 'vertical' }}
                  />
                </div>
                {profileMsg && (
                  <div style={{ fontSize: '0.8rem', color: profileMsg.includes('updated') ? '#39ff14' : '#ff8888', padding: '0.5rem', background: profileMsg.includes('updated') ? 'rgba(57,255,20,0.08)' : 'rgba(255,68,68,0.08)', border: `1px solid ${profileMsg.includes('updated') ? 'rgba(57,255,20,0.3)' : 'rgba(255,68,68,0.3)'}` }}>
                    {profileMsg.includes('updated') ? <Check size={12} style={{ display: 'inline', marginRight: '4px' }} /> : '⚠ '}{profileMsg}
                  </div>
                )}
                <button onClick={saveProfile} disabled={profileSaving} className="btn-primary" style={{ width: '100%', opacity: profileSaving ? 0.6 : 1 }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                    {profileSaving ? <><Loader2 size={13} className="slow-spin" /> Saving...</> : 'Save Changes'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right column: Bookings + Event signups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* Upcoming Bookings */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: '#c8f5c2', fontWeight: 700, fontSize: '1.05rem', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} style={{ color: '#39ff14' }} /> Upcoming Bookings
              </h2>
              <Link href="/book" className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}>+ New</Link>
            </div>

            {upcomingBookings.length === 0 ? (
              <div className="panel" style={{ padding: '1.5rem', textAlign: 'center', color: '#4a6b4a', fontSize: '0.9rem' }}>
                No upcoming bookings.{' '}
                <Link href="/book" style={{ color: '#39ff14', textDecoration: 'none' }}>Reserve a table →</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {upcomingBookings.map(b => (
                  <div key={b.id} className="panel" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', borderLeft: '3px solid #39ff14' }}>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                        <span style={{ color: '#39ff14', fontWeight: 700, fontSize: '0.9rem' }}>{b.table_name}</span>
                        <span style={{ color: '#4a6b4a', fontSize: '0.75rem', border: '1px solid rgba(57,255,20,0.2)', padding: '0.1rem 0.4rem', letterSpacing: '0.08em' }}>{b.status.toUpperCase()}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <span style={{ color: '#7ab87a', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={11} style={{ color: '#39ff14' }} />{b.date}</span>
                        <span style={{ color: '#7ab87a', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={11} style={{ color: '#39ff14' }} />{b.time_slot} · {b.duration}</span>
                        <span style={{ color: '#7ab87a', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Users size={11} style={{ color: '#39ff14' }} />{b.players} players</span>
                      </div>
                      <div style={{ color: '#4a6b4a', fontSize: '0.78rem', marginTop: '0.3rem' }}>{b.game_type}</div>
                    </div>
                    <button
                      onClick={() => cancelBooking(b.id)}
                      title="Cancel booking"
                      style={{ background: 'none', border: 'none', color: '#4a6b4a', cursor: 'pointer', padding: '0.3rem', flexShrink: 0, transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#ff4444'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#4a6b4a'}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Past bookings */}
            {pastBookings.length > 0 && (
              <div style={{ marginTop: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#4a6b4a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Past / Cancelled</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {pastBookings.slice(0, 5).map(b => (
                    <div key={b.id} style={{ padding: '0.75rem 1rem', background: 'rgba(57,255,20,0.02)', border: '1px solid rgba(57,255,20,0.08)', display: 'flex', justifyContent: 'space-between', gap: '1rem', opacity: 0.6 }}>
                      <span style={{ color: '#7ab87a', fontSize: '0.82rem' }}>{b.table_name} · {b.date}</span>
                      <span style={{ fontSize: '0.72rem', color: b.status === 'cancelled' ? '#ff8888' : '#4a6b4a', letterSpacing: '0.08em' }}>{b.status.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Event signups */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: '#c8f5c2', fontWeight: 700, fontSize: '1.05rem', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={16} style={{ color: '#39ff14' }} /> Event Sign-ups
              </h2>
              <Link href="/events" className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}>Browse Events</Link>
            </div>

            {upcomingSignups.length === 0 ? (
              <div className="panel" style={{ padding: '1.5rem', textAlign: 'center', color: '#4a6b4a', fontSize: '0.9rem' }}>
                No upcoming event registrations.{' '}
                <Link href="/events" style={{ color: '#39ff14', textDecoration: 'none' }}>Browse this week →</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {upcomingSignups.map(s => (
                  <div key={s.id} className="panel" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', borderLeft: '3px solid #60a5fa' }}>
                    <div>
                      <div style={{ color: '#c8f5c2', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{s.event_title}</div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <span style={{ color: '#7ab87a', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={11} style={{ color: '#60a5fa' }} />{s.event_date}</span>
                        <span style={{ color: '#7ab87a', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={11} style={{ color: '#60a5fa' }} />{s.event_time}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeSignup(s.id)}
                      title="Remove signup"
                      style={{ background: 'none', border: 'none', color: '#4a6b4a', cursor: 'pointer', padding: '0.3rem', flexShrink: 0, transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#ff4444'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#4a6b4a'}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
