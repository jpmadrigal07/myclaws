import type { Metadata } from 'next';
import { ConvexClientProvider } from '@/components/convex-client-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'MyClaw - Your Personal AI Assistant',
  description:
    'Deploy your own OpenClaw AI assistant in minutes. Chat via Telegram with no setup required.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
