'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useSession } from '@/lib/auth-client';
import { User, Mail, Calendar } from 'lucide-react';

export default function SettingsPage() {
  const { data: session } = useSession();
  const user = useQuery(api.users.getCurrentUser);

  if (user === undefined) {
    return <SettingsSkeleton />;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-sm sm:text-base text-muted-foreground">
          Manage your account settings
        </p>
      </div>

      {/* Profile Section */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <h2 className="text-base sm:text-lg font-semibold text-card-foreground">Profile</h2>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          Your account information from Google
        </p>

        <div className="mt-5 sm:mt-6 space-y-4">
          <div className="flex items-center gap-3 sm:gap-4">
            {session?.user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={session.user.image}
                alt="Profile"
                className="h-12 w-12 sm:h-16 sm:w-16 rounded-full"
              />
            ) : (
              <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/10">
                <User className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-base sm:text-lg font-medium text-card-foreground truncate">
                {session?.user?.name || 'User'}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                Google Account
              </p>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                <p className="text-sm sm:text-base font-medium text-card-foreground truncate">
                  {session?.user?.email || 'Not available'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground">Member since</p>
                <p className="text-sm sm:text-base font-medium text-card-foreground">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'Recently joined'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Status Section */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <h2 className="text-base sm:text-lg font-semibold text-card-foreground">Account Status</h2>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          Your current subscription and account status
        </p>

        <div className="mt-5 sm:mt-6 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs sm:text-sm text-muted-foreground">Status</span>
            <span className="inline-flex items-center rounded-full bg-green-500/20 px-2.5 py-0.5 text-xs font-medium text-green-500">
              Active
            </span>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs sm:text-sm text-muted-foreground">Plan</span>
            <span className="text-sm sm:text-base font-medium text-card-foreground capitalize">
              {user?.subscriptionStatus || 'Trial'}
            </span>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-foreground">Danger Zone</h2>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          Irreversible account actions
        </p>

        <div className="mt-4">
          <button className="rounded-lg border border-red-500 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors w-full sm:w-auto">
            Delete Account
          </button>
          <p className="mt-2 text-xs text-muted-foreground">
            This action cannot be undone. All your data will be permanently
            deleted.
          </p>
        </div>
      </div>
    </div>
  );
}

function SettingsSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <div className="h-6 sm:h-8 w-24 sm:w-28 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 sm:h-5 w-36 sm:w-48 animate-pulse rounded bg-muted" />
      </div>
      <div className="h-52 sm:h-64 animate-pulse rounded-xl bg-muted" />
      <div className="h-28 sm:h-32 animate-pulse rounded-xl bg-muted" />
    </div>
  );
}
