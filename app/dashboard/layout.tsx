'use client';

import { useSession, signOut } from '@/lib/auth-client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';
import { LayoutDashboard, Settings, CreditCard, LogOut } from 'lucide-react';
import { changaOne } from '@/lib/fonts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
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
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      {/* Top Navigation */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/dashboard" className={`text-xl sm:text-2xl text-foreground ${changaOne.className}`}>
            MyClaws
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden sm:inline text-sm text-muted-foreground max-w-[200px] truncate">
              {session.user.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation - Desktop */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <nav className="space-y-1 sticky top-24">
              <NavLink
                href="/dashboard"
                icon={<LayoutDashboard className="h-5 w-5" />}
                active={pathname === '/dashboard' || (pathname.startsWith('/dashboard') && !pathname.startsWith('/dashboard/settings') && !pathname.startsWith('/dashboard/billing'))}
              >
                Dashboard
              </NavLink>
              <NavLink href="/dashboard/settings" icon={<Settings className="h-5 w-5" />} active={pathname.startsWith('/dashboard/settings')}>
                Settings
              </NavLink>
              <NavLink href="/dashboard/billing" icon={<CreditCard className="h-5 w-5" />} active={pathname.startsWith('/dashboard/billing')}>
                Billing
              </NavLink>

              {/* Footer Links */}
              <div className="pt-6 mt-6 border-t border-border">
                <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                  <Link href="/terms" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card lg:hidden">
        <div className="flex h-16 items-center justify-around px-4">
          <MobileNavLink
            href="/dashboard"
            icon={<LayoutDashboard className="h-5 w-5" />}
            active={pathname === '/dashboard' || (pathname.startsWith('/dashboard') && !pathname.startsWith('/dashboard/settings') && !pathname.startsWith('/dashboard/billing'))}
          >
            Dashboard
          </MobileNavLink>
          <MobileNavLink href="/dashboard/settings" icon={<Settings className="h-5 w-5" />} active={pathname.startsWith('/dashboard/settings')}>
            Settings
          </MobileNavLink>
          <MobileNavLink href="/dashboard/billing" icon={<CreditCard className="h-5 w-5" />} active={pathname.startsWith('/dashboard/billing')}>
            Billing
          </MobileNavLink>
        </div>
      </nav>
    </div>
  );
}

function NavLink({
  href,
  icon,
  children,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
        active
          ? 'bg-primary/10 text-primary font-medium'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      )}
    >
      {icon}
      <span className="font-medium">{children}</span>
    </Link>
  );
}

function MobileNavLink({
  href,
  icon,
  children,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors',
        active ? 'text-primary' : 'text-muted-foreground'
      )}
    >
      {icon}
      <span className="text-xs font-medium">{children}</span>
    </Link>
  );
}
