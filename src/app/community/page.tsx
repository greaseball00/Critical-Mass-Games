'use client';

import { useState } from 'react';
import { Users, BookOpen, Heart, Star, ChevronDown, ChevronUp, Check } from 'lucide-react';

const programs = [
  {
    icon: <BookOpen size={28} style={{ color: '#60a5fa' }} />,
    color: '#60a5fa',
    title: 'School Partnership Program',
    subtitle: 'K-12 & Community Colleges',
    description:
      'We work with Tri-Cities area schools to bring tabletop gaming into classrooms and after-school programs. Research shows RPGs and strategy games build critical thinking, teamwork, mathematics, and reading comprehension.',
    offerings: [
      'Curriculum-aligned game sessions (math, history, literacy)',
      'After-school RPG & strategy game clubs',
      'Teacher & counselor orientation sessions',
      'Donation of dice and game materials to qualifying schools',
      'Guest DM visits for classroom storytelling projects',
    ],
    cta: 'Schedule a School Visit',
    partner: true,
    partnerBadge: 'Active Partner',
  },
  {
    icon: <Heart size={28} style={{ color: '#f87171' }} />,
    color: '#f87171',
    title: 'Youth Groups & Scouting',
    subtitle: 'Boy Scouts, Girl Scouts, 4-H, YMCA',
    description:
      'Gaming and scouting share more DNA than you might think — leadership, resourcefulness, collaboration, and storytelling. We offer merit badge support, badge-aligned scenario sessions, and badge-in-a-day workshops.',
    offerings: [
      'Communication & Citizenship merit badge sessions',
      'Game Design badge-in-a-day workshop',
      'Annual "Quest for the Badge" tournament',
      'Leadership-focused RPG scenarios',
      'Group table reservations at no cost',
    ],
    cta: 'Register Your Troop',
    partner: false,
    partnerBadge: '',
  },
  {
    icon: <Star size={28} style={{ color: '#a78bfa' }} />,
    color: '#a78bfa',
    title: 'Church & Faith Community Gaming',
    subtitle: 'Sunday Schools, Youth Ministries, Small Groups',
    description:
      'Gaming is community-building at its core. We partner with faith organizations to provide a wholesome, supervised, family-friendly space where their groups can connect through play. Values-aligned game selection always available.',
    offerings: [
      'Designated family-friendly Sunday sessions',
      'Private room reservations for faith group events',
      'Values-aligned game library recommendations',
      'Chaperone-friendly table layout',
      'Donation tier for scholarship participation',
    ],
    cta: 'Partner With Us',
    partner: true,
    partnerBadge: 'Covenant Partner',
  },
  {
    icon: <Users size={28} style={{ color: '#34d399' }} />,
    color: '#34d399',
    title: 'Inclusion & Accessibility',
    subtitle: 'Everyone at the Table',
    description:
      'The table is for everyone. We actively work to make Critical Mass accessible to players with disabilities, neurodiverse gamers, and underrepresented communities. Games heal, connect, and open worlds.',
    offerings: [
      'Accessible table setup for mobility aids',
      'Large-print reference cards and character sheets',
      'Low-sensory gaming hours (reduced noise/light)',
      'Subsidized membership for income-qualifying players',
      'Safe-play policy enforced at all events',
    ],
    cta: 'Learn More',
    partner: false,
    partnerBadge: '',
  },
];

const partners = [
  { name: 'Kennewick School District', type: 'School', since: '2024' },
  { name: 'Richland Faith Community Church', type: 'Church', since: '2024' },
  { name: 'Pasco 4-H Club #42', type: 'Youth Group', since: '2025' },
  { name: 'Columbia Basin College', type: 'College', since: '2025' },
  { name: 'Tri-Cities YMCA', type: 'Youth', since: '2025' },
  { name: 'BSA Troop 108 — Kennewick', type: 'Scouts', since: '2024' },
];

const impactStats = [
  { value: '400+', label: 'Youth Served', icon: '👦' },
  { value: '6', label: 'Partner Organizations', icon: '🤝' },
  { value: '12', label: 'School Visits', icon: '🏫' },
  { value: '3', label: 'Annual Charity Events', icon: '❤️' },
];

type PartnerType = 'school' | 'youth' | 'church' | 'other';

export default function CommunityPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [partnerForm, setPartnerForm] = useState({
    orgName: '',
    contactName: '',
    email: '',
    phone: '',
    orgType: '' as PartnerType | '',
    groupSize: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setPartnerForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <div className="rad-badge" style={{ marginBottom: '1rem' }}>✦ Outreach Division</div>
        <h1 className="gradient-text" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 900, fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Community
        </h1>
        <p style={{ color: '#8a8a9a', maxWidth: '680px', margin: '0 auto', lineHeight: 1.8, fontSize: '1.05rem' }}>
          Gaming is more than a hobby — it&apos;s a bridge. Critical Mass Games is committed to partnering with schools,
          churches, and youth groups across the Tri-Cities to use the power of play to connect, educate, and uplift our community.
        </p>
      </div>

      {/* Impact stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '4rem' }}>
        {impactStats.map(stat => (
          <div key={stat.label} className="panel" style={{ padding: '1.5rem', textAlign: 'center', borderRadius: '12px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
            <div style={{ color: '#bf40ff', fontSize: '2rem', fontWeight: 900, fontFamily: "'Orbitron', sans-serif", lineHeight: 1 }}>{stat.value}</div>
            <div style={{ color: '#8a8a9a', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.4rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Programs */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ color: '#e8e6e3', fontWeight: 700, fontFamily: "'Orbitron', sans-serif", fontSize: '1.4rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '2rem' }}>
          Our Programs
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {programs.map((program, i) => (
            <div
              key={program.title}
              className="panel"
              style={{ borderLeft: `3px solid ${program.color}`, overflow: 'hidden', borderRadius: '12px' }}
            >
              <div
                onClick={() => setExpanded(expanded === i ? null : i)}
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexGrow: 1 }}>
                  <div>{program.icon}</div>
                  <div>
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                      <h3 style={{ color: '#e8e6e3', fontWeight: 700, fontFamily: "'Orbitron', sans-serif", fontSize: '1.05rem', margin: 0 }}>{program.title}</h3>
                      {program.partner && (
                        <span style={{ fontSize: '0.65rem', color: program.color, border: `1px solid ${program.color}50`, padding: '0.1rem 0.4rem', letterSpacing: '0.1em' }}>
                          {program.partnerBadge}
                        </span>
                      )}
                    </div>
                    <div style={{ color: '#8a8a9a', fontSize: '0.8rem' }}>{program.subtitle}</div>
                  </div>
                </div>
                <div style={{ color: '#bf40ff', flexShrink: 0 }}>
                  {expanded === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>

              {expanded === i && (
                <div style={{ padding: '0 1.5rem 1.5rem', borderTop: `1px solid ${program.color}20` }}>
                  <p style={{ color: '#8a8a9a', lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '0.9rem' }}>
                    {program.description}
                  </p>
                  <h4 style={{ color: '#e8e6e3', fontWeight: 600, fontFamily: "'Orbitron', sans-serif", fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    What We Offer
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {program.offerings.map(o => (
                      <li key={o} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#8a8a9a', fontSize: '0.875rem' }}>
                        <Check size={13} style={{ color: program.color, flexShrink: 0, marginTop: '3px' }} /> {o}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="btn-secondary"
                    style={{ fontSize: '0.8rem', borderColor: `${program.color}60`, color: program.color }}
                    onClick={() => document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {program.cta}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Partners */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ color: '#e8e6e3', fontWeight: 700, fontFamily: "'Orbitron', sans-serif", fontSize: '1.4rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          Current Partners
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {partners.map(p => (
            <div key={p.name} className="panel" style={{ padding: '1rem', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.65rem', color: '#ff6a00', fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{p.type}</div>
              <div style={{ color: '#e8e6e3', fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.3 }}>{p.name}</div>
              <div style={{ color: '#5a5a6a', fontSize: '0.7rem', marginTop: '0.3rem' }}>Partner since {p.since}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Partner inquiry form */}
      <div id="partner-form" className="warning-stripe panel" style={{ padding: '2.5rem', borderColor: 'rgba(191,64,255,0.3)', borderRadius: '12px' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <Check size={40} style={{ color: '#39ff14', margin: '0 auto 1rem' }} />
            <h3 style={{ color: '#bf40ff', fontSize: '1.4rem', fontWeight: 700, fontFamily: "'Orbitron', sans-serif", marginBottom: '0.75rem' }}>Message Received!</h3>
            <p style={{ color: '#8a8a9a', lineHeight: 1.7 }}>
              Thanks, <strong style={{ color: '#e8e6e3' }}>{partnerForm.contactName}</strong>! We&apos;ll reach out to <strong style={{ color: '#e8e6e3' }}>{partnerForm.email}</strong> within 2 business days to discuss how we can partner with <strong style={{ color: '#e8e6e3' }}>{partnerForm.orgName}</strong>.
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <div className="rad-badge" style={{ marginBottom: '1rem' }}>✦ Partnership Inquiry</div>
              <h3 className="gradient-text" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Let&apos;s Build Something Together
              </h3>
              <p style={{ color: '#8a8a9a', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '550px', margin: '0 auto' }}>
                Whether you represent a school, church, youth group, or community org — we want to hear from you.
                All programs are tailored to your group&apos;s needs.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {[
                { name: 'orgName', label: 'Organization Name', type: 'text', placeholder: 'Kennewick Elementary' },
                { name: 'contactName', label: 'Contact Name', type: 'text', placeholder: 'Jane Smith' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'contact@org.com' },
                { name: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: '(509) 555-0000' },
                { name: 'groupSize', label: 'Estimated Group Size', type: 'number', placeholder: '15' },
              ].map(field => (
                <div key={field.name}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#8a8a9a', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={partnerForm[field.name as keyof typeof partnerForm]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={field.name !== 'phone'}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', fontSize: '0.9rem', borderRadius: '12px' }}
                  />
                </div>
              ))}

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#8a8a9a', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  Organization Type
                </label>
                <select
                  name="orgType"
                  value={partnerForm.orgType}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '0.6rem 0.75rem', fontSize: '0.9rem', borderRadius: '12px' }}
                >
                  <option value="">-- Select type --</option>
                  <option value="school">School / Educational Institution</option>
                  <option value="youth">Youth Group / Scouts / 4-H</option>
                  <option value="church">Church / Faith Community</option>
                  <option value="other">Other Community Organization</option>
                </select>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#8a8a9a', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  Tell Us About Your Group & Goals
                </label>
                <textarea
                  name="message"
                  value={partnerForm.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="What does your group need? What are you hoping gaming can provide? Any special considerations?"
                  required
                  style={{ width: '100%', padding: '0.6rem 0.75rem', fontSize: '0.9rem', resize: 'vertical', borderRadius: '12px' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center' }}>
                <button type="submit" className="btn-primary" style={{ minWidth: '200px' }}>
                  <span>◈ Send Partnership Request</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
