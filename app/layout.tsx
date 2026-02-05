import type { Metadata } from 'next';
import { ConvexClientProvider } from '@/components/convex-client-provider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'MyClaws - Cheapest and Easiest Way to Get Your Own AI Assistant',
    template: '%s | MyClaws',
  },
  description:
    'Get your own personal AI assistant for just $19/month. MyClaws deploys OpenClaw directly to your Telegram - no setup required, no technical knowledge needed. Start chatting in minutes.',
  keywords: [
    'AI assistant',
    'personal AI',
    'Telegram bot',
    'OpenClaw',
    'AI chatbot',
    'cheap AI assistant',
    'easy AI setup',
    'personal chatbot',
    'AI for Telegram',
  ],
  authors: [{ name: 'MyClaws' }],
  creator: 'MyClaws',
  publisher: 'MyClaws',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'MyClaws',
    title: 'MyClaws - Cheapest and Easiest Way to Get Your Own AI Assistant',
    description:
      'Get your own personal AI assistant for just $19/month. No setup required, start chatting via Telegram in minutes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyClaws - Your Personal AI Assistant',
    description:
      'Get your own personal AI assistant for just $19/month. No setup required, start chatting via Telegram in minutes.',
  },
  metadataBase: new URL('https://myclaws.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
