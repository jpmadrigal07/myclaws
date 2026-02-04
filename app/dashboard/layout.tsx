'use client';

import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';
import { Bot, LayoutDashboard, Settings, CreditCard, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const getOrCreateUser = useMutation(api.users.getOrCreateUser);

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  // Create user profile when they first access dashboard
  useEffect(() => {
    if (session) {
      getOrCreateUser();
    }
  }, [session, getOrCreateUser]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-primary" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">MyClaw</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{session.user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <nav className="space-y-1">
              <NavLink href="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />}>
                Dashboard
              </NavLink>
              <NavLink href="/dashboard/settings" icon={<Settings className="h-5 w-5" />}>
                Settings
              </NavLink>
              <NavLink href="/dashboard/billing" icon={<CreditCard className="h-5 w-5" />}>
                Billing
              </NavLink>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100"
    >
      {icon}
      <span className="font-medium">{children}</span>
    </Link>
  );
}
