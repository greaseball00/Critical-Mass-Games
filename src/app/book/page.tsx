'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, Users, Check, AlertCircle, LogIn, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';

// ── Table diagram: top-down line drawing ─────────────────────────────────────
// aspect = [width, height] in feet (longest side first for landscape orientation)
// seatCounts = [top, right, bottom, left]
function TableDiagram({ aspect, seatCounts }: {
  aspect: [number, number];
  seatCounts: [number, number, number, number];
}) {
  const svgW = 180;
  const svgH = 130;
  const seatR = 7;
  const gap = 6;
  const maxTW = svgW * 0.58;
  const maxTH = svgH * 0.58;

  const [aw, ah] = aspect;
  const scale = Math.min(maxTW / aw, maxTH / ah);
  const tW = aw * scale;
  const tH = ah * scale;
  const tX = (svgW - tW) / 2;
  const tY = (svgH - tH) / 2;

  const [topCount, rightCount, bottomCount, leftCount] = seatCounts;
  const seats: [number, number][] = [];

  for (let i = 0; i < topCount; i++)
    seats.push([tX + (tW / (topCount + 1)) * (i + 1), tY - gap - seatR]);
  for (let i = 0; i < rightCount; i++)
    seats.push([tX + tW + gap + seatR, tY + (tH / (rightCount + 1)) * (i + 1)]);
  for (let i = 0; i < bottomCount; i++)
    seats.push([tX + (tW / (bottomCount + 1)) * (i + 1), tY + tH + gap + seatR]);
  for (let i = 0; i < leftCount; i++)
    seats.push([tX - gap - seatR, tY + (tH / (leftCount + 1)) * (i + 1)]);

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      style={{ width: '100%', height: '90px', display: 'block' }}
      aria-hidden="true"
    >
      <rect
        x={tX} y={tY} width={tW} height={tH}
        fill="rgba(191,64,255,0.07)"
        stroke="rgba(191,64,255,0.65)"
        strokeWidth="1.5"
        rx="2"
      />
      {seats.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={seatR}
          fill="rgba(57,255,20,0.07)"
          stroke="rgba(57,255,20,0.6)"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

// ── Table data ────────────────────────────────────────────────────────────────
const tables = [
  {
    id: 1,
    name: 'Table Alpha',
    size: '4ft × 4ft',
    seats: 4,
    aspect: [4, 4] as [number, number],
    seatCounts: [1, 1, 1, 1] as [number, number, number, number],
    features: ['Overhead lamp', 'Dice tray', 'Storage cubbies'],
    accommodations: [
      'Compact layout — ideal for small-party RPGs or intimate card games',
      'Storage cubbies keep character sheets off the surface',
    ],
  },
  {
    id: 2,
    name: 'Table Beta',
    size: '4ft × 6ft',
    seats: 6,
    aspect: [6, 4] as [number, number],
    seatCounts: [2, 1, 2, 1] as [number, number, number, number],
    features: ['Overhead lamp', 'Dice tray', 'Terrain-ready surface', 'Power strip'],
    accommodations: [
      'Power strip for laptops, tablets, and charging',
      'Terrain-ready surface supports raised miniature bases',
    ],
  },
  {
    id: 3,
    name: 'Table Gamma',
    size: '4ft × 6ft',
    seats: 6,
    aspect: [6, 4] as [number, number],
    seatCounts: [2, 1, 2, 1] as [number, number, number, number],
    features: ['Overhead lamp', 'Wet/dry erase surface', 'Grid overlay', 'Power strip'],
    accommodations: [
      'Built-in 1-inch grid overlay for tactical combat',
      'Wet/dry erase surface for live dungeon sketching',
    ],
  },
  {
    id: 4,
    name: 'Table Delta',
    size: '5ft × 8ft',
    seats: 8,
    aspect: [8, 5] as [number, number],
    seatCounts: [3, 1, 3, 1] as [number, number, number, number],
    features: ['Dual overhead lamps', 'Felt surface', 'Hidden dice wells', 'Terrain rails', 'TV mount'],
    flagship: true,
    accommodations: [
      'Terrain rails for 3D dungeon tile builds',
      'TV mount for battle maps or remote players',
      'Hidden dice wells keep rolls contained',
    ],
  },
  {
    id: 5,
    name: 'Table Epsilon',
    size: '4ft × 4ft',
    seats: 4,
    aspect: [4, 4] as [number, number],
    seatCounts: [1, 1, 1, 1] as [number, number, number, number],
    features: ['Overhead lamp', 'Dice tray', 'Folding sides'],
    accommodations: [
      'Folding sides provide wheelchair clearance on the left',
      'Low-profile setup for mobility aid access',
    ],
  },
  {
    id: 6,
    name: 'Table Zeta',
    size: '6ft × 8ft — Semi-Private',
    seats: 10,
    aspect: [8, 6] as [number, number],
    seatCounts: [4, 1, 4, 1] as [number, number, number, number],
    features: ['Acoustic panels', 'Dual lamps', 'Whiteboard wall', 'Power strip', 'Mini-fridge', 'TV mount'],
    flagship: true,
    accommodations: [
      'Acoustic panels for immersive or private sessions',
      'Whiteboard wall for notes, maps, and initiative',
      'Mini-fridge included with every reservation',
    ],
  },
];

const timeSlots = [
  '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
  '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
  '7:00 PM', '8:00 PM', '9:00 PM',
];

const durations = ['2 hours', '3 hours', '4 hours', 'Full Day (open–close)', 'Custom'];

const gameTypes = [
  'D&D / Pathfinder (TTRPG)',
  'Warhammer / Miniatures',
  'Board Games',
  'Card Games (MtG, etc.)',
  'War Games',
  'Open / Mixed',
  'Private Event',
  'Youth Group / School',
  'Church Group',
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BookPage() {
  const { user, loading: authLoading } = useAuth();
  const supabase = createClient();

  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const [form, setForm] = useState({
    date: '',
    timeSlot: '',
    duration: '',
    gameType: '',
    players: '',
    notes: '',
  });

  const tableData = tables.find(t => t.id === selectedTable);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!user || !tableData) return;
    setSaving(true);
    setSaveError('');

    const { error } = await supabase.from('bookings').insert({
      user_id: user.id,
      table_id: tableData.id,
      table_name: tableData.name,
      date: form.date,
      time_slot: form.timeSlot,
      duration: form.duration,
      game_type: form.gameType,
      players: parseInt(form.players, 10),
      notes: form.notes || null,
      status: 'confirmed',
    });

    if (error) {
      setSaveError(
        error.code === '23505'
          ? 'That table is already booked at that date/time. Please choose another slot.'
          : `Booking failed: ${error.message}`,
      );
      setSaving(false);
    } else {
      setSubmitted(true);
      setSaving(false);
    }
  };

  // ── Auth gate ───────────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <Loader2 size={32} style={{ color: '#39ff14' }} className="slow-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ maxWidth: '500px', margin: '6rem auto', padding: '0 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }} className="float">✦</div>
        <div className="panel glow-border" style={{ padding: '2.5rem', borderRadius: '12px', borderColor: 'rgba(191,64,255,0.3)' }}>
          <LogIn size={36} style={{ color: '#bf40ff', margin: '0 auto 1rem' }} />
          <h2 className="gradient-text" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: '1.5rem', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            Log In to Book
          </h2>
          <p style={{ color: '#8a8a9a', lineHeight: 1.7, marginBottom: '2rem' }}>
            You need a Critical Mass account to reserve tables and track your bookings. It&apos;s free and takes 30 seconds.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth/login?redirectTo=/book" className="btn-primary"><span>Log In</span></Link>
            <Link href="/auth/signup" className="btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>Create Account</Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Success state ───────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div style={{ maxWidth: '600px', margin: '6rem auto', padding: '0 1.5rem', textAlign: 'center' }}>
        <div className="panel glow-border" style={{ padding: '3rem', borderRadius: '12px', borderColor: 'rgba(191,64,255,0.3)' }}>
          <Check size={40} style={{ color: '#39ff14', margin: '0 auto 1rem' }} />
          <h2 className="gradient-text" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: '1.6rem', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            QUEST CONFIRMED
          </h2>
          <p style={{ color: '#8a8a9a', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Your booking for <strong style={{ color: '#e8e6e3' }}>{tableData?.name}</strong> on{' '}
            <strong style={{ color: '#e8e6e3' }}>{form.date}</strong> at{' '}
            <strong style={{ color: '#e8e6e3' }}>{form.timeSlot}</strong> is confirmed.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/dashboard" className="btn-primary"><span>View My Bookings</span></Link>
            <button className="btn-secondary" style={{ padding: '0.75rem 1.5rem' }}
              onClick={() => { setSubmitted(false); setStep(1); setSelectedTable(null); setForm({ date: '', timeSlot: '', duration: '', gameType: '', players: '', notes: '' }); }}>
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div className="rad-badge" style={{ marginBottom: '1rem' }}>⚡ Table Management</div>
        <h1 className="gradient-text" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Book a Table
        </h1>
        <p style={{ color: '#8a8a9a', maxWidth: '600px', lineHeight: 1.7 }}>
          Reserve your war room in advance. Six tables, all equipped. Walk-ins welcome when available.
        </p>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '3rem', maxWidth: '500px' }}>
        {['Select Table', 'Session Details', 'Confirm'].map((label, i) => {
          const stepNum = i + 1;
          const active = step === stepNum;
          const done = step > stepNum;
          return (
            <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', position: 'relative' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: done ? '#39ff14' : active ? 'rgba(191,64,255,0.15)' : 'rgba(191,64,255,0.05)', border: `2px solid ${done ? '#39ff14' : active ? '#bf40ff' : 'rgba(191,64,255,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: done ? '#0a0a0f' : active ? '#bf40ff' : '#5a5a6a', fontSize: '0.8rem', fontWeight: 700 }}>
                {done ? <Check size={14} /> : stepNum}
              </div>
              <div style={{ fontSize: '0.7rem', color: active ? '#bf40ff' : '#5a5a6a', letterSpacing: '0.08em', textAlign: 'center' }}>{label}</div>
              {i < 2 && <div style={{ position: 'absolute', top: '16px', left: '50%', width: '100%', height: '2px', background: done ? '#39ff14' : 'rgba(191,64,255,0.15)', zIndex: -1 }} />}
            </div>
          );
        })}
      </div>

      {/* Step 1: Select table */}
      {step === 1 && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {tables.map(table => {
              const isSelected = selectedTable === table.id;
              return (
                <div
                  key={table.id}
                  onClick={() => setSelectedTable(table.id)}
                  className="panel"
                  style={{
                    borderRadius: '12px',
                    cursor: 'pointer',
                    border: isSelected
                      ? '2px solid #bf40ff'
                      : (table as { flagship?: boolean }).flagship
                        ? '1px solid rgba(191,64,255,0.4)'
                        : '1px solid rgba(191,64,255,0.2)',
                    boxShadow: isSelected ? '0 0 24px rgba(191,64,255,0.35)' : 'none',
                    transition: 'all 0.2s',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Flagship badge */}
                  {(table as { flagship?: boolean }).flagship && (
                    <div style={{ position: 'absolute', top: 0, right: 0, background: 'linear-gradient(135deg, #39ff14, #bf40ff)', color: '#0a0a0f', padding: '0.15rem 0.5rem', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', zIndex: 1 }}>FLAGSHIP</div>
                  )}

                  {/* Diagram */}
                  <div style={{ borderBottom: '1px solid rgba(191,64,255,0.12)', padding: '0.5rem 0.25rem 0' }}>
                    <TableDiagram aspect={table.aspect} seatCounts={table.seatCounts} />
                  </div>

                  {/* Info */}
                  <div style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                      <h3 style={{ fontFamily: "'Orbitron', sans-serif", color: isSelected ? '#bf40ff' : '#e8e6e3', fontWeight: 700, fontSize: '1rem', margin: 0 }}>
                        {table.name}
                      </h3>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.85rem' }}>
                      <span style={{ color: '#8a8a9a', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Clock size={11} style={{ color: '#39ff14' }} /> {table.size}
                      </span>
                      <span style={{ color: '#8a8a9a', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Users size={11} style={{ color: '#39ff14' }} /> Up to {table.seats}
                      </span>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      {table.features.map(f => (
                        <li key={f} style={{ fontSize: '0.78rem', color: '#8a8a9a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ color: '#39ff14', fontSize: '0.6rem' }}>▸</span> {f}
                        </li>
                      ))}
                    </ul>

                    <div style={{ borderTop: '1px solid rgba(191,64,255,0.1)', paddingTop: '0.65rem' }}>
                      {isSelected
                        ? <span style={{ color: '#bf40ff', fontSize: '0.78rem', fontFamily: "'Orbitron', sans-serif", display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Check size={12} /> Selected</span>
                        : <span style={{ color: '#5a5a6a', fontSize: '0.72rem', fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.06em' }}>Click to select</span>
                      }
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3rem' }}>
            <button
              className="btn-primary"
              disabled={!selectedTable}
              onClick={() => setStep(2)}
              style={{ opacity: selectedTable ? 1 : 0.35, cursor: selectedTable ? 'pointer' : 'not-allowed' }}
            >
              <span>Continue with {tableData ? tableData.name : 'a table'} →</span>
            </button>
          </div>

          {/* Info strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', borderTop: '1px solid rgba(191,64,255,0.1)', paddingTop: '2rem' }}>
            {[
              { title: 'Free Reservations', body: 'No deposit required. Just show up and roll.' },
              { title: 'Walk-ins Welcome', body: 'Tables available on a first-come basis when not reserved.' },
              { title: 'Member & Partner Discounts', body: 'Members and community partners receive priority scheduling and exclusive perks.' },
              { title: 'Equipment Included', body: 'Dice, mats, miniature loans, and DM screens at the desk.' },
            ].map(({ title, body }) => (
              <div key={title} style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(191,64,255,0.03)', border: '1px solid rgba(191,64,255,0.1)' }}>
                <div style={{ color: '#39ff14', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem', letterSpacing: '0.08em' }}>{title}</div>
                <p style={{ color: '#8a8a9a', fontSize: '0.8rem', lineHeight: 1.5 }}>{body}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Step 2: Session details */}
      {step === 2 && (
        <form onSubmit={e => { e.preventDefault(); setStep(3); }}>
          <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(191,64,255,0.05)', border: '1px solid rgba(191,64,255,0.2)', padding: '0.75rem 1rem', borderRadius: '12px', fontSize: '0.85rem', color: '#8a8a9a' }}>
              Booking as <strong style={{ color: '#39ff14' }}>{user.email}</strong> &nbsp;·&nbsp; {tableData?.name} (seats {tableData?.seats})
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#8a8a9a', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} required style={{ width: '100%', padding: '0.65rem 0.8rem', fontSize: '0.9rem' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#8a8a9a', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Start Time</label>
              <select name="timeSlot" value={form.timeSlot} onChange={handleChange} required style={{ width: '100%', padding: '0.65rem 0.8rem', fontSize: '0.9rem' }}>
                <option value="">-- Select time --</option>
                {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#8a8a9a', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Duration</label>
              <select name="duration" value={form.duration} onChange={handleChange} required style={{ width: '100%', padding: '0.65rem 0.8rem', fontSize: '0.9rem' }}>
                <option value="">-- Select duration --</option>
                {durations.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#8a8a9a', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Game Type</label>
              <select name="gameType" value={form.gameType} onChange={handleChange} required style={{ width: '100%', padding: '0.65rem 0.8rem', fontSize: '0.9rem' }}>
                <option value="">-- Select type --</option>
                {gameTypes.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#8a8a9a', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Number of Players</label>
              <input type="number" name="players" value={form.players} onChange={handleChange} min="1" max={tableData?.seats} placeholder={`1–${tableData?.seats}`} required style={{ width: '100%', padding: '0.65rem 0.8rem', fontSize: '0.9rem' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#8a8a9a', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Notes / Special Requests</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Terrain requests, accessibility needs, group name..." style={{ width: '100%', padding: '0.65rem 0.8rem', fontSize: '0.9rem', resize: 'vertical' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="button" className="btn-secondary" onClick={() => setStep(1)}>← Back</button>
            <button type="submit" className="btn-primary"><span>Review →</span></button>
          </div>
        </form>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <div style={{ maxWidth: '580px' }}>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", color: '#e8e6e3', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1.5rem' }}>Confirm Your Booking</h2>

          <div className="panel" style={{ padding: '1.5rem', borderRadius: '12px', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#5a5a6a', letterSpacing: '0.15em', marginBottom: '1rem' }}>BOOKING SUMMARY</div>
            {[
              ['Account', user.email ?? ''],
              ['Table', tableData?.name ?? ''],
              ['Seats', `Up to ${tableData?.seats}`],
              ['Date', form.date],
              ['Start Time', form.timeSlot],
              ['Duration', form.duration],
              ['Game Type', form.gameType],
              ['Players', form.players],
              ...(form.notes ? [['Notes', form.notes]] as [string, string][] : []),
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(191,64,255,0.08)', padding: '0.5rem 0', fontSize: '0.85rem', gap: '1rem' }}>
                <span style={{ color: '#8a8a9a', flexShrink: 0 }}>{label}</span>
                <span style={{ color: '#e8e6e3', textAlign: 'right' }}>{val}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', background: 'rgba(191,64,255,0.05)', border: '1px solid rgba(191,64,255,0.2)', padding: '1rem', borderRadius: '12px', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
            <AlertCircle size={16} style={{ color: '#39ff14', flexShrink: 0, marginTop: '2px' }} />
            <span style={{ color: '#8a8a9a', lineHeight: 1.6 }}>
              Reservations are free. Please give 24-hour notice for cancellations. Walk-in players may use your table if you are more than 15 minutes late.
            </span>
          </div>

          {saveError && (
            <div style={{ background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.4)', padding: '0.75rem', borderRadius: '12px', color: '#ff8888', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              ⚠ {saveError}
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="button" className="btn-secondary" onClick={() => setStep(2)} disabled={saving}>← Edit</button>
            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={saving}
              style={{ opacity: saving ? 0.6 : 1, cursor: saving ? 'wait' : 'pointer' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {saving ? <><Loader2 size={14} className="slow-spin" /> Saving...</> : '◈ Confirm Booking'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
