import Link from 'next/link';
import { Calendar, ShoppingBag, Clock, Users, ChevronRight, Zap, Shield, Star } from 'lucide-react';

const upcomingEvents = [
  { day: 'MON', date: '17', title: "D&D Monday Night Meltdown", type: 'RPG', time: '6:00 PM', spots: 4 },
  { day: 'WED', date: '19', title: 'Warhammer 40K — Cascade of Fate', type: 'Miniatures', time: '5:30 PM', spots: 8 },
  { day: 'FRI', date: '21', title: 'Magic: the Gathering Draft Night', time: '7:00 PM', type: 'CCG', spots: 12 },
  { day: 'SAT', date: '22', title: 'Open Table Saturday — All Systems', time: '11:00 AM', type: 'Open Play', spots: 20 },
];

const features = [
  {
    icon: <Calendar size={28} style={{ color: '#39ff14' }} />,
    title: 'Weekly Events',
    desc: 'RPGs, miniatures, card games, and open play — something every night of the week.',
    href: '/events',
    cta: 'See Schedule',
  },
  {
    icon: <ShoppingBag size={28} style={{ color: '#39ff14' }} />,
    title: 'The Armory',
    desc: 'Dice sets, terrain kits, cosplay props, and accessories to fuel every campaign.',
    href: '/shop',
    cta: 'Browse Shop',
  },
  {
    icon: <Clock size={28} style={{ color: '#39ff14' }} />,
    title: 'Book a Table',
    desc: 'Reserve your war room in advance. Six dedicated gaming tables, all climate-controlled.',
    href: '/book',
    cta: 'Reserve Now',
  },
  {
    icon: <Users size={28} style={{ color: '#39ff14' }} />,
    title: 'Community',
    desc: 'Partnering with schools, churches, and youth groups across the Tri-Cities.',
    href: '/community',
    cta: 'Get Involved',
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="scanlines"
        style={{
          minHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem 1.5rem',
          position: 'relative',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(57,255,20,0.05) 0%, rgba(5,10,5,0) 70%)',
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(57,255,20,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
          }}
        />

        {/* Corner brackets */}
        {['top-8 left-8', 'top-8 right-8', 'bottom-8 left-8', 'bottom-8 right-8'].map((pos, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '30px',
              height: '30px',
              borderColor: 'rgba(57,255,20,0.4)',
              borderStyle: 'solid',
              borderWidth: 0,
              ...(i === 0 && { top: '2rem', left: '2rem', borderTopWidth: '2px', borderLeftWidth: '2px' }),
              ...(i === 1 && { top: '2rem', right: '2rem', borderTopWidth: '2px', borderRightWidth: '2px' }),
              ...(i === 2 && { bottom: '2rem', left: '2rem', borderBottomWidth: '2px', borderLeftWidth: '2px' }),
              ...(i === 3 && { bottom: '2rem', right: '2rem', borderBottomWidth: '2px', borderRightWidth: '2px' }),
            }}
          />
        ))}

        {/* Hazard symbol */}
        <div className="float" style={{ fontSize: '5rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 0 20px rgba(57,255,20,0.6))' }}>
          ☢
        </div>

        <div className="rad-badge" style={{ marginBottom: '1.5rem' }}>
          ⚠ Tri-Cities · Kennewick, WA ⚠
        </div>

        <h1
          className="flicker"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
            fontWeight: 900,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            lineHeight: 1.05,
            color: '#39ff14',
            textShadow: '0 0 20px rgba(57,255,20,0.8), 0 0 60px rgba(57,255,20,0.4)',
            marginBottom: '0.5rem',
          }}
        >
          Critical Mass
        </h1>
        <h2
          style={{
            fontSize: 'clamp(1rem, 3vw, 1.8rem)',
            fontWeight: 400,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#c8f5c2',
            marginBottom: '1.5rem',
          }}
        >
          Games
        </h2>

        <p
          style={{
            maxWidth: '620px',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: '#7ab87a',
            marginBottom: '2.5rem',
          }}
        >
          Your neighborhood game shop at the heart of the Tri-Cities. Where every roll could go critical,
          every campaign becomes legend, and every gamer finds their crew.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/events" className="btn-primary">
            <span>See This Week&apos;s Events</span>
          </Link>
          <Link href="/book" className="btn-secondary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Book a Table
          </Link>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
          <div style={{ color: '#4a6b4a', fontSize: '0.65rem', letterSpacing: '0.2em' }}>SCROLL</div>
          <div className="pulse" style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(57,255,20,0.6), transparent)' }} />
        </div>
      </section>

      {/* Feature cards */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="rad-badge" style={{ marginBottom: '1rem' }}>Portal Systems</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#39ff14', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Command Center
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {features.map(({ icon, title, desc, href, cta }) => (
            <div key={title} className="panel panel-hover glow-border" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>{icon}</div>
              <h3 style={{ color: '#c8f5c2', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.05em' }}>{title}</h3>
              <p style={{ color: '#7ab87a', fontSize: '0.9rem', lineHeight: 1.6, flexGrow: 1 }}>{desc}</p>
              <Link
                href={href}
                style={{ color: '#39ff14', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.3rem', transition: 'gap 0.2s' }}
              >
                {cta} <ChevronRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section style={{ background: '#0a1a0a', borderTop: '1px solid rgba(57,255,20,0.1)', borderBottom: '1px solid rgba(57,255,20,0.1)', padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="rad-badge" style={{ marginBottom: '0.75rem' }}>☢ This Week</div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#39ff14', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Upcoming Events
              </h2>
            </div>
            <Link href="/events" className="btn-secondary">View Full Schedule</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {upcomingEvents.map((event) => (
              <div
                key={event.title}
                className="panel panel-hover"
                style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
              >
                {/* Date block */}
                <div
                  style={{
                    background: 'rgba(57,255,20,0.08)',
                    border: '1px solid rgba(57,255,20,0.3)',
                    padding: '0.5rem 0.75rem',
                    textAlign: 'center',
                    minWidth: '52px',
                    flexShrink: 0,
                  }}
                >
                  <div style={{ fontSize: '0.6rem', color: '#7ab87a', letterSpacing: '0.1em' }}>{event.day}</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#39ff14', lineHeight: 1 }}>{event.date}</div>
                </div>

                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: '0.7rem', color: '#39ff14', letterSpacing: '0.1em', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                    {event.type}
                  </div>
                  <div style={{ color: '#c8f5c2', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                    {event.title}
                  </div>
                  <div style={{ color: '#7ab87a', fontSize: '0.8rem' }}>{event.time}</div>
                  <div style={{ color: '#4a6b4a', fontSize: '0.75rem', marginTop: '0.3rem' }}>
                    {event.spots} spots open
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Critical Mass */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div className="rad-badge" style={{ marginBottom: '1rem' }}>Mission Briefing</div>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#39ff14', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '2.5rem' }}>
          Why Critical Mass?
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {[
            { icon: <Zap size={24} />, title: 'Always Active', desc: 'Events every day of the week. No dead nights.' },
            { icon: <Shield size={24} />, title: 'Safe Space', desc: 'Inclusive, welcoming environment for all ages and play styles.' },
            { icon: <Users size={24} />, title: 'Community First', desc: 'School partnerships, youth programs, and outreach initiatives.' },
            { icon: <Star size={24} />, title: 'Fully Stocked', desc: 'Dice, terrain, cosplay props — your one-stop armory.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{ padding: '1.5rem 1rem' }}>
              <div style={{ color: '#39ff14', marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>{icon}</div>
              <h4 style={{ color: '#c8f5c2', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>{title}</h4>
              <p style={{ color: '#7ab87a', fontSize: '0.85rem', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          className="warning-stripe glow-border"
          style={{
            padding: '2.5rem',
            borderColor: 'rgba(57,255,20,0.4)',
          }}
        >
          <h3 style={{ color: '#39ff14', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            Ready to go critical?
          </h3>
          <p style={{ color: '#7ab87a', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Book a table, browse the shop, or check out this week&apos;s events — the reactor is warm.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/book" className="btn-primary"><span>Book a Table</span></Link>
            <Link href="/shop" className="btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>Visit the Shop</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
