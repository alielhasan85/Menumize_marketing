import '../styles/globals.css';
import type { Metadata } from 'next';
import Navbar from '@components/Navbar/Navbar';
import { Footer } from '@components/Footer';

export const metadata: Metadata = {
  title: 'Menumize | Digital QR menus for modern restaurants',
  description:
    'Menumize helps restaurants create beautiful, fast, QR-based digital menus with powerful branding, analytics, and multi-language support.',
  openGraph: {
    type: 'website',
    siteName: 'Menumize',
    title: 'Menumize | Digital QR menus for modern restaurants',
    description:
      'Create and manage stunning digital menus, track guest behavior, and update items in real time across all your venues.',
    images: [
      {
        // TODO: replace with your own OG banner once ready
        url: '/og-banner.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@menumize', // placeholder, you can change later
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
