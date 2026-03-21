'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Users, Check, AlertCircle, LogIn, Loader2, X, Shield } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';

const tables = [
  {
    id: 1,
    name: 'Table Alpha',
    size: '4ft × 4ft',
    seats: 4,
    features: ['Overhead lamp', 'Dice tray', 'Storage cubbies'],
    status: 'available',
    accommodations: [
      'Compact layout — ideal for small-party RPGs or intimate card game sessions',
      'Storage cubbies keep character sheets and gear off the surface during long sessions',
    ],
  },
  {
    id: 2,
    name: 'Table Beta',
    size: '4ft × 6ft',
    seats: 6,
    features: ['Overhead lamp', 'Dice tray', 'Terrain-ready surface', 'Power strip'],
    status: 'available',
    accommodations: [
      'Power strip supports laptops, tablets, and phone charging throughout your session',
      'Terrain-ready surface accommodates raised miniature bases without tipping',
      'Great for hybrid play — connect remote players via a tablet at the table',
    ],
  },
  {
    id: 3,
    name: 'Table Gamma',
    size: '4ft × 6ft',
    seats: 6,
    features: ['Overhead lamp', 'Wet/dry erase surface', 'Grid overlay', 'Power strip'],
    status: 'occupied',
    accommodations: [
      'Built-in 1-inch grid overlay for precise tactical combat movement',
      'Wet/dry erase surface lets the DM sketch dungeons live at the table',
      'Power strip available for devices',
    ],
  },
  {
    id: 4,
    name: 'Table Delta',
    size: '5ft × 8ft',
    seats: 8,
    features: ['Dual overhead lamps', 'Felt surface', 'Hidden dice wells', 'Terrain rails', 'TV mount'],
    status: 'available',
    flagship: true,
    accommodations: [
      'Terrain rails support modular 3D dungeon tile and scatter terrain builds',
      'Wall-mounted TV for battle map display or streaming to remote players',
      'Hidden dice wells keep rolls contained during large or chaotic sessions',
      'Dual overhead lamps eliminate shadow zones across the full 5×8 surface',
    ],
  },
  {
    id: 5,
    name: 'Table Epsilon',
    size: '4ft × 4ft',
    seats: 4,
    features: ['Overhead lamp', 'Dice tray', 'Folding sides'],
    status: 'reserved',
    accommodations: [
      'Folding table sides provide full wheelchair clearance on the left side',
      'Low-profile setup accessible for players using mobility aids or seated scooters',
    ],
  },
  {
    id: 6,
    name: 'Table Zeta',
    size: '6ft × 8ft — Semi-Private',
    seats: 10,
    features: ['Acoustic panels', 'Dual lamps', 'Whiteboard wall', 'Power strip', 'Mini-fridge', 'TV mount'],
    status: 'available',
    flagship: true,
    accommodations: [
      'Acoustic panels reduce ambient noise — ideal for immersive or emotionally intense sessions',
      'Full-wall whiteboard for campaign notes, world maps, and live initiative tracking',
      'Mini-fridge stocked with beverages, included with every reservation',
      'Wide accessible aisle on both sides for wheelchair and mobility aid access',
      'Best suited for multi-hour campaigns, private events, or groups of 7–10',
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

const statusColor: Record<string, string> = {
  available: '#39ff14',
  occupied: '#ff4444',
  reserved: '#ffd700',
};
const statusLabel: Record<string, string> = {
  available: 'Available',
  occupied: 'In Use',
  reserved: 'Reserved',
};

export default function BookPage() {
  const { user, loading: authLoading } = useAuth();
  const supabase = createClient();

  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Table detail modal state
  const [detailTableId, setDetailTableId] = useState<number | null>(null);
  const [detailDate, setDetailDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [detailSlot, setDetailSlot] = useState<string>('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const [form, setForm] = useState({
    date: '',
    timeSlot: '',
    duration: '',
    gameType: '',
    players: '',
    notes: '',
  });

  const tableData = tables.find(t => t.id === selectedTable);
  const detailTable = tables.find(t => t.id === detailTableId);

  // Fetch booked slots when modal opens or date changes
  useEffect(() => {
    if (!detailTableId || !detailDate) return;
    setSlotsLoading(true);
    supabase
      .from('bookings')
      .select('time_slot')
      .eq('table_id', detailTableId)
      .eq('date', detailDate)
      .eq('status', 'confirmed')
      .then(({ data }) => {
        setBookedSlots(data?.map((b: { time_slot: string }) => b.time_slot) ?? []);
        setSlotsLoading(false);
      });
  }, [detailTableId, detailDate]);

  const handleReserveFromDetail = () => {
    setSelectedTable(detailTableId!);
    setForm(prev => ({
      ...prev,
      date: detailDate,
      ...(detailSlot ? { timeSlot: detailSlot } : {}),
    }));
    setDetailTableId(null);
    setStep(2);
  };

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

  // ── Auth gate ─────────────────────────────────────────────────────────────
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

  // ── Success state ─────────────────────────────────────────────────────────
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

      {/* Table detail modal */}
      {detailTable && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,15,0.88)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={() => setDetailTableId(null)}
        >
          <div
            className="panel"
            style={{ width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '12px', border: '1px solid rgba(191,64,255,0.4)', boxShadow: '0 0 50px rgba(191,64,255,0.15)', position: 'relative' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'sticky', top: 0, background: '#1a1a2e', zIndex: 1, borderBottom: '1px solid rgba(191,64,255,0.15)' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                  <h2 style={{ fontFamily: "'Orbitron', sans-serif", color: '#e8e6e3', fontWeight: 700, fontSize: '1.2rem', margin: 0 }}>
                    {detailTable.name}
                  </h2>
                  {(detailTable as { flagship?: boolean }).flagship && (
                    <span style={{ background: 'linear-gradient(135deg, #39ff14, #bf40ff)', color: '#0a0a0f', padding: '0.1rem 0.5rem', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em' }}>FLAGSHIP</span>
                  )}
                  <span style={{ fontSize: '0.7rem', color: statusColor[detailTable.status], border: `1px solid ${statusColor[detailTable.status]}40`, padding: '0.15rem 0.5rem', letterSpacing: '0.08em' }}>
                    {statusLabel[detailTable.status]}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                  <span style={{ color: '#8a8a9a', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={11} style={{ color: '#39ff14' }} /> {detailTable.size}
                  </span>
                  <span style={{ color: '#8a8a9a', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Users size={11} style={{ color: '#39ff14' }} /> Up to {detailTable.seats} players
                  </span>
                </div>
              </div>
              <button
                onClick={() => setDetailTableId(null)}
                style={{ background: 'none', border: '1px solid rgba(191,64,255,0.3)', borderRadius: '6px', color: '#e8e6e3', cursor: 'pointer', padding: '0.35rem 0.5rem', lineHeight: 1, flexShrink: 0 }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '1.5rem' }}>
              {/* Features */}
              <div style={{ marginBottom: '1.75rem' }}>
                <h3 style={{ fontFamily: "'Orbitron', sans-serif", color: '#bf40ff', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Table Features
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {detailTable.features.map(f => (
                    <span key={f} style={{ background: 'rgba(57,255,20,0.07)', border: '1px solid rgba(57,255,20,0.2)', color: '#e8e6e3', fontSize: '0.78rem', padding: '0.25rem 0.65rem', borderRadius: '20px' }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Accommodations */}
              <div style={{ marginBottom: '1.75rem' }}>
                <h3 style={{ fontFamily: "'Orbitron', sans-serif", color: '#bf40ff', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Accommodations & Services
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {detailTable.accommodations.map(a => (
                    <li key={a} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#8a8a9a', fontSize: '0.85rem', lineHeight: 1.6 }}>
                      <Shield size={12} style={{ color: '#bf40ff', flexShrink: 0, marginTop: '3px' }} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Availability */}
              <div>
                <h3 style={{ fontFamily: "'Orbitron', sans-serif", color: '#bf40ff', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Availability
                </h3>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: '#8a8a9a', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Select Date</label>
                  <input
                    type="date"
                    value={detailDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => { setDetailDate(e.target.value); setDetailSlot(''); }}
                    style={{ padding: '0.55rem 0.75rem', fontSize: '0.9rem', width: 'auto' }}
                  />
                </div>

                {slotsLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#5a5a6a', fontSize: '0.85rem', padding: '1rem 0' }}>
                    <Loader2 size={14} className="slow-spin" /> Loading availability…
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.72rem', color: '#5a5a6a' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#39ff14', display: 'inline-block' }} /> Open</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff4444', display: 'inline-block' }} /> Booked</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#bf40ff', display: 'inline-block' }} /> Your selection</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(105px, 1fr))', gap: '0.5rem' }}>
                      {timeSlots.map(slot => {
                        const isBooked = bookedSlots.includes(slot);
                        const isChosen = detailSlot === slot;
                        return (
                          <button
                            key={slot}
                            onClick={() => !isBooked && setDetailSlot(isChosen ? '' : slot)}
                            disabled={isBooked}
                            style={{
                              padding: '0.5rem 0.25rem',
                              borderRadius: '8px',
                              fontSize: '0.78rem',
                              fontFamily: "'Orbitron', sans-serif",
                              letterSpacing: '0.03em',
                              cursor: isBooked ? 'not-allowed' : 'pointer',
                              border: isChosen ? '1px solid #bf40ff' : isBooked ? '1px solid rgba(255,68,68,0.2)' : '1px solid rgba(57,255,20,0.25)',
                              background: isChosen ? 'rgba(191,64,255,0.15)' : isBooked ? 'rgba(255,68,68,0.04)' : 'rgba(57,255,20,0.05)',
                              color: isChosen ? '#bf40ff' : isBooked ? '#5a5a6a' : '#e8e6e3',
                              textDecoration: isBooked ? 'line-through' : 'none',
                              transition: 'all 0.15s',
                              textAlign: 'center',
                            }}
                          >
                            {slot}
                            <div style={{ fontSize: '0.58rem', marginTop: '3px', color: isChosen ? '#bf40ff' : isBooked ? '#ff4444' : '#5a5a6a' }}>
                              {isChosen ? 'Selected' : isBooked ? 'Booked' : 'Open'}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Modal footer */}
            <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid rgba(191,64,255,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', bottom: 0, background: '#1a1a2e', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ color: '#8a8a9a', fontSize: '0.8rem' }}>
                {detailSlot
                  ? <span>Time selected: <strong style={{ color: '#bf40ff' }}>{detailSlot}</strong> on <strong style={{ color: '#bf40ff' }}>{detailDate}</strong></span>
                  : <span style={{ color: '#5a5a6a' }}>Pick a slot above, or choose one in the next step.</span>
                }
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
                <button className="btn-secondary" onClick={() => setDetailTableId(null)} style={{ fontSize: '0.8rem' }}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={handleReserveFromDetail}>
                  <span>Reserve This Table →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {Object.entries(statusLabel).map(([key, label]) => (
              <span key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#8a8a9a' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: statusColor[key], display: 'inline-block' }} />
                {label}
              </span>
            ))}
          </div>
          <p style={{ color: '#5a5a6a', fontSize: '0.8rem', marginBottom: '1.5rem', fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.05em' }}>
            Click any available table to see details, check the schedule, and reserve.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {tables.map(table => {
              const isUnavailable = table.status !== 'available';
              const isSelected = selectedTable === table.id;
              return (
                <div
                  key={table.id}
                  onClick={() => !isUnavailable && setDetailTableId(table.id)}
                  className="panel"
                  style={{
                    padding: '1.5rem', borderRadius: '12px',
                    cursor: isUnavailable ? 'not-allowed' : 'pointer',
                    opacity: isUnavailable ? 0.5 : 1,
                    border: isSelected ? '2px solid #bf40ff' : (table as { flagship?: boolean }).flagship ? '1px solid rgba(191,64,255,0.4)' : '1px solid rgba(191,64,255,0.2)',
                    boxShadow: isSelected ? '0 0 20px rgba(191,64,255,0.4)' : 'none',
                    transition: 'all 0.2s',
                    position: 'relative',
                  }}
                >
                  {(table as { flagship?: boolean }).flagship && (
                    <div style={{ position: 'absolute', top: 0, right: 0, background: 'linear-gradient(135deg, #39ff14, #bf40ff)', color: '#0a0a0f', padding: '0.15rem 0.5rem', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em' }}>FLAGSHIP</div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontFamily: "'Orbitron', sans-serif", color: isSelected ? '#bf40ff' : '#e8e6e3', fontWeight: 700, fontSize: '1rem' }}>{table.name}</h3>
                    <span style={{ fontSize: '0.7rem', color: statusColor[table.status], border: `1px solid ${statusColor[table.status]}40`, padding: '0.15rem 0.4rem', letterSpacing: '0.08em' }}>
                      {statusLabel[table.status]}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                    <span style={{ color: '#8a8a9a', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={11} style={{ color: '#39ff14' }} /> {table.size}
                    </span>
                    <span style={{ color: '#8a8a9a', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Users size={11} style={{ color: '#39ff14' }} /> Up to {table.seats}
                    </span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {table.features.map(f => (
                      <li key={f} style={{ fontSize: '0.78rem', color: '#8a8a9a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ color: '#39ff14', fontSize: '0.6rem' }}>▸</span> {f}
                      </li>
                    ))}
                  </ul>
                  {!isUnavailable && (
                    <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(191,64,255,0.15)', color: '#5a5a6a', fontSize: '0.75rem', fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.08em' }}>
                      {isSelected ? <span style={{ color: '#bf40ff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Check size={12} /> Selected</span> : 'Click to view & reserve →'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {selectedTable && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <button className="btn-primary" onClick={() => setStep(2)}>
                <span>Continue with {tableData?.name} →</span>
              </button>
            </div>
          )}

          {/* Info strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '3rem', borderTop: '1px solid rgba(191,64,255,0.1)', paddingTop: '2rem' }}>
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
