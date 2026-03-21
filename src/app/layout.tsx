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
        <div className="arcane-circle" />
        <AuthProvider>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
