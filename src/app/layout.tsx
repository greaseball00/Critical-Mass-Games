import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Critical Mass Games | Tri-Cities Gaming Hub',
  description:
    "Kennewick's premier gaming shop. Weekly events, dice & terrain shop, table booking, and community outreach across the Tri-Cities.",
  keywords: ['tabletop games', 'RPG', 'D&D', 'Kennewick', 'Tri-Cities', 'gaming shop', 'dice', 'terrain'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
