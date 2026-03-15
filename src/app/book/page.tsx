'use client';

import { useState } from 'react';
import { Clock, Users, Check, AlertCircle } from 'lucide-react';

const tables = [
  {
    id: 1,
    name: 'Table Alpha',
    size: '4ft × 4ft',
    seats: 4,
    features: ['Overhead lamp', 'Dice tray', 'Storage cubbies'],
    status: 'available',
    icon: '⬛',
  },
  {
    id: 2,
    name: 'Table Beta',
    size: '4ft × 6ft',
    seats: 6,
    features: ['Overhead lamp', 'Dice tray', 'Terrain-ready surface', 'Power strip'],
    status: 'available',
    icon: '⬛',
  },
  {
    id: 3,
    name: 'Table Gamma',
    size: '4ft × 6ft',
    seats: 6,
    features: ['Overhead lamp', 'Wet/dry erase surface', 'Grid overlay', 'Power strip'],
    status: 'occupied',
    icon: '🟥',
  },
  {
    id: 4,
    name: 'Table Delta',
    size: '5ft × 8ft',
    seats: 8,
    features: ['Dual overhead lamps', 'Felt surface', 'Hidden dice wells', 'Terrain rails', 'TV mount'],
    status: 'available',
    icon: '⬛',
    flagship: true,
  },
  {
    id: 5,
    name: 'Table Epsilon',
    size: '4ft × 4ft',
    seats: 4,
    features: ['Overhead lamp', 'Dice tray', 'Folding sides'],
    status: 'reserved',
    icon: '🟨',
  },
  {
    id: 6,
    name: 'Table Zeta',
    size: '6ft × 8ft — Semi-Private',
    seats: 10,
    features: ['Acoustic panels', 'Dual lamps', 'Whiteboard wall', 'Power strip', 'Mini-fridge', 'TV mount'],
    status: 'available',
    icon: '⬛',
    flagship: true,
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
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '',
    duration: '',
    gameType: '',
    players: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const tableData = tables.find(t => t.id === selectedTable);

  if (submitted) {
    return (
      <div style={{ maxWidth: '600px', margin: '6rem auto', padding: '0 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>☢</div>
        <div className="panel glow-border" style={{ padding: '3rem' }}>
          <Check size={40} style={{ color: '#39ff14', margin: '0 auto 1rem' }} />
          <h2 style={{ color: '#39ff14', fontWeight: 700, fontSize: '1.6rem', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            CHAIN REACTION INITIATED
          </h2>
          <p style={{ color: '#7ab87a', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Your reservation for <strong style={{ color: '#c8f5c2' }}>{tableData?.name}</strong> has been submitted.
            We&apos;ll send confirmation to <strong style={{ color: '#c8f5c2' }}>{form.email}</strong> within the hour.
          </p>
          <div style={{ background: 'rgba(57,255,20,0.05)', border: '1px solid rgba(57,255,20,0.2)', padding: '1rem', marginBottom: '1.5rem', textAlign: 'left' }}>
            <div style={{ fontSize: '0.75rem', color: '#4a6b4a', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>BOOKING SUMMARY</div>
            {[
              ['Table', tableData?.name],
              ['Date', form.date],
              ['Time', form.timeSlot],
              ['Duration', form.duration],
              ['Players', form.players],
              ['Game Type', form.gameType],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(57,255,20,0.08)', padding: '0.4rem 0', fontSize: '0.85rem' }}>
                <span style={{ color: '#7ab87a' }}>{label}</span>
                <span style={{ color: '#c8f5c2' }}>{val}</span>
              </div>
            ))}
          </div>
          <button className="btn-primary" onClick={() => { setSubmitted(false); setStep(1); setSelectedTable(null); setForm({ name: '', email: '', phone: '', date: '', timeSlot: '', duration: '', gameType: '', players: '', notes: '' }); }}>
            <span>Book Another Table</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div className="rad-badge" style={{ marginBottom: '1rem' }}>⚡ Table Management</div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 900, color: '#39ff14', letterSpacing: '0.05em', textTransform: 'uppercase', textShadow: '0 0 20px rgba(57,255,20,0.5)', marginBottom: '0.5rem' }}>
          Book a Table
        </h1>
        <p style={{ color: '#7ab87a', maxWidth: '600px', lineHeight: 1.7 }}>
          Reserve your war room in advance. Six tables, all equipped. Walk-ins welcome when available.
        </p>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '3rem', maxWidth: '500px' }}>
        {['Select Table', 'Your Details', 'Confirm'].map((label, i) => {
          const stepNum = i + 1;
          const active = step === stepNum;
          const done = step > stepNum;
          return (
            <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', position: 'relative' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: done ? '#39ff14' : active ? 'rgba(57,255,20,0.15)' : 'rgba(57,255,20,0.05)',
                border: `2px solid ${done || active ? '#39ff14' : 'rgba(57,255,20,0.2)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: done ? '#050a05' : active ? '#39ff14' : '#4a6b4a',
                fontSize: '0.8rem', fontWeight: 700,
              }}>
                {done ? <Check size={14} /> : stepNum}
              </div>
              <div style={{ fontSize: '0.7rem', color: active ? '#39ff14' : '#4a6b4a', letterSpacing: '0.08em', textAlign: 'center' }}>{label}</div>
              {i < 2 && (
                <div style={{ position: 'absolute', top: '16px', left: '50%', width: '100%', height: '2px', background: done ? '#39ff14' : 'rgba(57,255,20,0.15)', zIndex: -1 }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step 1: Table selection */}
      {step === 1 && (
        <>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#c8f5c2', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.75rem' }}>Select a Table</h2>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', flexWrap: 'wrap' }}>
              {Object.entries(statusLabel).map(([key, label]) => (
                <span key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#7ab87a' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: statusColor[key], display: 'inline-block' }} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {tables.map(table => {
              const isSelected = selectedTable === table.id;
              const isUnavailable = table.status !== 'available';
              return (
                <div
                  key={table.id}
                  onClick={() => !isUnavailable && setSelectedTable(table.id)}
                  className="panel"
                  style={{
                    padding: '1.5rem',
                    cursor: isUnavailable ? 'not-allowed' : 'pointer',
                    opacity: isUnavailable ? 0.5 : 1,
                    border: isSelected ? '2px solid #39ff14' : table.flagship ? '1px solid rgba(57,255,20,0.4)' : '1px solid rgba(57,255,20,0.2)',
                    boxShadow: isSelected ? '0 0 20px rgba(57,255,20,0.4)' : 'none',
                    transition: 'all 0.2s',
                    position: 'relative',
                  }}
                >
                  {table.flagship && (
                    <div style={{ position: 'absolute', top: 0, right: 0, background: '#39ff14', color: '#050a05', padding: '0.15rem 0.5rem', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                      FLAGSHIP
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <h3 style={{ color: isSelected ? '#39ff14' : '#c8f5c2', fontWeight: 700, fontSize: '1rem' }}>{table.name}</h3>
                    <span style={{ fontSize: '0.7rem', color: statusColor[table.status], border: `1px solid ${statusColor[table.status]}40`, padding: '0.15rem 0.4rem', letterSpacing: '0.08em' }}>
                      {statusLabel[table.status]}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                    <span style={{ color: '#7ab87a', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={11} style={{ color: '#39ff14' }} /> {table.size}
                    </span>
                    <span style={{ color: '#7ab87a', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Users size={11} style={{ color: '#39ff14' }} /> Up to {table.seats}
                    </span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {table.features.map(f => (
                      <li key={f} style={{ fontSize: '0.78rem', color: '#7ab87a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ color: '#39ff14', fontSize: '0.6rem' }}>▸</span> {f}
                      </li>
                    ))}
                  </ul>
                  {isSelected && (
                    <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(57,255,20,0.2)', color: '#39ff14', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Check size={12} /> Selected
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              className="btn-primary"
              disabled={!selectedTable}
              onClick={() => setStep(2)}
              style={{ opacity: selectedTable ? 1 : 0.4, cursor: selectedTable ? 'pointer' : 'not-allowed' }}
            >
              <span>Continue →</span>
            </button>
          </div>
        </>
      )}

      {/* Step 2: Details form */}
      {step === 2 && (
        <form onSubmit={e => { e.preventDefault(); setStep(3); }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>

            {/* Contact */}
            <div>
              <h2 style={{ color: '#c8f5c2', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Contact Info
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Goblin Overlord' },
                  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@dungeon.net' },
                  { name: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: '(509) 555-DICE' },
                ].map(field => (
                  <div key={field.name}>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#7ab87a', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required={field.name !== 'phone'}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', fontSize: '0.9rem' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Session details */}
            <div>
              <h2 style={{ color: '#c8f5c2', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Session Details
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#7ab87a', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '0.6rem 0.75rem', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#7ab87a', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Start Time</label>
                  <select name="timeSlot" value={form.timeSlot} onChange={handleChange} required style={{ width: '100%', padding: '0.6rem 0.75rem', fontSize: '0.9rem' }}>
                    <option value="">-- Select time --</option>
                    {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#7ab87a', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Duration</label>
                  <select name="duration" value={form.duration} onChange={handleChange} required style={{ width: '100%', padding: '0.6rem 0.75rem', fontSize: '0.9rem' }}>
                    <option value="">-- Select duration --</option>
                    {durations.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#7ab87a', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Game Type</label>
                  <select name="gameType" value={form.gameType} onChange={handleChange} required style={{ width: '100%', padding: '0.6rem 0.75rem', fontSize: '0.9rem' }}>
                    <option value="">-- Select type --</option>
                    {gameTypes.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#7ab87a', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Number of Players</label>
                  <input
                    type="number"
                    name="players"
                    value={form.players}
                    onChange={handleChange}
                    min="1"
                    max={tableData?.seats}
                    placeholder={`1 – ${tableData?.seats}`}
                    required
                    style={{ width: '100%', padding: '0.6rem 0.75rem', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#7ab87a', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Notes / Special Requests</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Terrain requests, accessibility needs, group name..."
                    style={{ width: '100%', padding: '0.6rem 0.75rem', fontSize: '0.9rem', resize: 'vertical' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
            <button type="button" className="btn-secondary" onClick={() => setStep(1)}>← Back</button>
            <button type="submit" className="btn-primary"><span>Review Booking →</span></button>
          </div>
        </form>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <div style={{ maxWidth: '600px' }}>
          <h2 style={{ color: '#c8f5c2', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1.5rem' }}>Confirm Your Booking</h2>

          <div className="panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#4a6b4a', letterSpacing: '0.15em', marginBottom: '1rem' }}>BOOKING SUMMARY</div>
            {[
              ['Table', tableData?.name + (tableData?.flagship ? ' ★ Flagship' : '')],
              ['Seats', `Up to ${tableData?.seats}`],
              ['Name', form.name],
              ['Email', form.email],
              ['Date', form.date],
              ['Start Time', form.timeSlot],
              ['Duration', form.duration],
              ['Game Type', form.gameType],
              ['Players', form.players],
              ...(form.notes ? [['Notes', form.notes]] : []),
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(57,255,20,0.08)', padding: '0.5rem 0', fontSize: '0.85rem', gap: '1rem' }}>
                <span style={{ color: '#7ab87a', flexShrink: 0 }}>{label}</span>
                <span style={{ color: '#c8f5c2', textAlign: 'right' }}>{val}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', background: 'rgba(57,255,20,0.05)', border: '1px solid rgba(57,255,20,0.2)', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            <AlertCircle size={16} style={{ color: '#39ff14', flexShrink: 0, marginTop: '2px' }} />
            <span style={{ color: '#7ab87a', lineHeight: 1.6 }}>
              Table reservations are free. We ask for 24-hour notice for cancellations.
              Walk-in players may use your table if you&apos;re more than 15 minutes late without notice.
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
            <button type="button" className="btn-secondary" onClick={() => setStep(2)}>← Edit Details</button>
            <button className="btn-primary" onClick={handleSubmit}><span>☢ Confirm Booking</span></button>
          </div>
        </div>
      )}

      {/* Info panels */}
      {step === 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '3rem', borderTop: '1px solid rgba(57,255,20,0.1)', paddingTop: '2rem' }}>
          {[
            { title: 'Free Reservations', body: 'No deposit required. Just show up and roll.' },
            { title: 'Walk-ins Welcome', body: 'Tables available on a first-come basis when not reserved.' },
            { title: 'Group Discounts', body: 'Youth groups, schools, and churches get priority scheduling.' },
            { title: 'Equipment Included', body: 'Dice, mats, miniature loans, and DM screens available at the desk.' },
          ].map(({ title, body }) => (
            <div key={title} style={{ padding: '1rem', background: 'rgba(57,255,20,0.03)', border: '1px solid rgba(57,255,20,0.1)' }}>
              <div style={{ color: '#39ff14', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem', letterSpacing: '0.08em' }}>{title}</div>
              <p style={{ color: '#7ab87a', fontSize: '0.8rem', lineHeight: 1.5 }}>{body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
