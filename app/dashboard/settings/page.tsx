'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { User, Mail } from 'lucide-react';

export default function SettingsPage() {
  const user = useQuery(api.users.getCurrentUser);

  if (user === undefined) {
    return <SettingsSkeleton />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-gray-600">Manage your account settings</p>
      </div>

      {/* Account Information */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Account Information</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <User className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{user.name || 'Not set'}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <Mail className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Created */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Account Details</h2>
        <div className="mt-4">
          <p className="text-sm text-gray-500">Member since</p>
          <p className="font-medium">
            {new Date(user.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

function SettingsSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-5 w-48 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="h-40 animate-pulse rounded-xl bg-gray-200" />
      <div className="h-24 animate-pulse rounded-xl bg-gray-200" />
    </div>
  );
}
