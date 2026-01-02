import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Dreams Map ✨ - My Dream Map',
  description:
    'Digital Dream Map - Visualize, affirm, and achieve your goals. Organize your career, health, finance, and travel dreams in an inspiring way.',
  keywords: [
    'dream map',
    'goals',
    'objectives',
    'achievements',
    'visualization',
    'positive affirmations',
  ],
  authors: [{ name: 'Dreams Map' }],
  openGraph: {
    type: 'website',
    title: 'Dreams Map - My Dream Map',
    description: 'Visualize, affirm, and achieve your goals in an inspiring way.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dreams Map - My Dream Map',
    description: 'Visualize, affirm, and achieve your goals in an inspiring way.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        
      </body>
    </html>
  );
}
