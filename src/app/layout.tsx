import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';
import ParticleBackground from '@/components/ParticleBackground';

export const metadata: Metadata = {
  title: 'Critical Mass Games | Tri-Cities Gaming Hub',
  description:
    "Kennewick's premier gaming shop. Weekly events, dice & terrain shop, table booking, and community outreach across the Tri-Cities.",
  keywords: ['tabletop games', 'RPG', 'D&D', 'Kennewick', 'Tri-Cities', 'gaming shop', 'dice', 'terrain'],
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Orbitron:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ParticleBackground />
        <AuthProvider>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              background: 'linear-gradient(90deg, rgba(191,64,255,0.15), rgba(57,255,20,0.1), rgba(191,64,255,0.15))',
              borderBottom: '1px solid rgba(191,64,255,0.4)',
              padding: '10px 16px',
              textAlign: 'center',
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              color: '#e8e6e3',
            }}>
              <span style={{ color: '#39ff14', marginRight: '8px' }}>☢</span>
              <span style={{ color: '#39ff14', fontWeight: 700 }}>COMING SOON</span>
              <span style={{ color: '#8a8a9a', margin: '0 10px' }}>—</span>
              Critical Mass Games is gearing up. Stay tuned for our grand opening!
              <span style={{ color: '#39ff14', marginLeft: '8px' }}>☢</span>
            </div>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
