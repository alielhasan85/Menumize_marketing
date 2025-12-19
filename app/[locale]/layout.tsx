import '../../styles/globals.css';
import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getLocale} from 'next-intl/server';
import Navbar from '@components/Navbar/Navbar';
import {Footer} from '@components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://menumize.com'),
  title: 'Menumize | Digital QR menus for modern restaurants',
  description:
    'Menumize helps restaurants create beautiful, fast, QR-based digital menus with powerful branding, analytics, and multi-language support.',
  openGraph: {
    type: 'website',
    siteName: 'Menumize',
    title: 'Menumize | Digital QR menus for modern restaurants',
    description:
      'Create and manage stunning digital menus, track guest behavior, and update items in real time across all your venues.',
    images: [{url: '/og-banner.png'}]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@menumize'
  }
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();      // comes from i18n/request.ts config
  const messages = await getMessages();  // already merged (common, navbar, hero, ...)

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
