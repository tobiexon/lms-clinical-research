import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Clinical Research Nexus | Online Training & Certification',
    template: '%s | Clinical Research Nexus',
  },
  description:
    'Professional clinical research training for the UK and global healthcare community. ICH GCP, Pharmacovigilance, Regulatory Affairs and more.',
  keywords: [
    'clinical research training',
    'GCP training UK',
    'ICH GCP E6',
    'pharmacovigilance course',
    'MHRA training',
    'clinical research certificate',
    'CRA training',
    'clinical data management',
  ],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="flex flex-col min-h-screen bg-white text-gray-900 antialiased">
        <Providers>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
