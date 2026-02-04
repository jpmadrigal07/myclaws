'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Bot,
  MessageSquare,
  Clock,
  Zap,
  AlertCircle,
  Play,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const user = useQuery(api.users.getCurrentUser);
  const trialStatus = useQuery(api.users.getTrialStatus);
  const instance = useQuery(api.instances.getUserInstance);
  const createInstance = useMutation(api.instances.createInstance);

  // Create instance if user doesn't have one
  useEffect(() => {
    if (user && instance === null) {
      createInstance();
    }
  }, [user, instance, createInstance]);

  // Redirect to setup if instance is pending setup
  useEffect(() => {
    if (instance?.status === 'pending_setup') {
      router.push('/dashboard/setup');
    }
  }, [instance, router]);

  if (user === undefined || trialStatus === undefined || instance === undefined) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return null;
  }

  // If instance is pending setup, show loading while redirecting
  if (instance?.status === 'pending_setup') {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">
          Manage your personal AI assistant
        </p>
      </div>

      {/* Trial Status Card (shown during trial) */}
      {trialStatus?.subscriptionStatus === 'trial' && (
        <TrialStatusCard trialStatus={trialStatus} />
      )}

      {/* Trial Expired Card */}
      {trialStatus?.isTrialExpired && (
        <TrialExpiredCard />
      )}

      {/* Instance Status Card */}
      {instance && instance.status !== 'pending_setup' && (
        <InstanceStatusCard instance={instance} />
      )}

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <QuickActionCard
          icon={<MessageSquare className="h-5 w-5" />}
          title="Chat with your Bot"
          description={
            instance?.telegramBotUsername
              ? `Open @${instance.telegramBotUsername} in Telegram`
              : 'Set up your bot to start chatting'
          }
          action={
            instance?.telegramBotUsername ? (
              <a
                href={`https://t.me/${instance.telegramBotUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                Open Telegram
              </a>
            ) : (
              <Link
                href="/dashboard/setup"
                className="text-sm font-medium text-primary hover:underline"
              >
                Complete Setup
              </Link>
            )
          }
        />
        <QuickActionCard
          icon={<Bot className="h-5 w-5" />}
          title="AI Model"
          description="Kimi K2.5 (Default)"
          action={
            <span className="text-sm text-gray-500">Claude & GPT coming soon</span>
          }
        />
        <QuickActionCard
          icon={<Zap className="h-5 w-5" />}
          title="Integrations"
          description="Telegram (Active)"
          action={
            <span className="text-sm text-gray-500">Discord & WhatsApp coming soon</span>
          }
        />
      </div>
    </div>
  );
}

function TrialStatusCard({
  trialStatus,
}: {
  trialStatus: {
    trialMessagesUsed: number;
    trialMessageLimit: number;
    messagesRemaining: number;
    timeRemaining: number;
  };
}) {
  const { trialMessagesUsed, trialMessageLimit, messagesRemaining, timeRemaining } =
    trialStatus;

  const progressPercent = (trialMessagesUsed / trialMessageLimit) * 100;
  const isLow = messagesRemaining <= 10;

  // Format time remaining
  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  const timeString = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Trial Status</h2>
        {isLow && (
          <div className="flex items-center gap-1 text-amber-600">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Running low!</span>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-4">
        {/* Messages Progress */}
        <div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Messages</span>
            <span className="font-medium">
              {trialMessagesUsed}/{trialMessageLimit} used
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full transition-all ${
                isLow ? 'bg-amber-500' : 'bg-primary'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {messagesRemaining} messages remaining
          </p>
        </div>

        {/* Time Remaining */}
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">Time remaining:</span>
          <span className="font-mono font-medium">{timeString}</span>
        </div>
      </div>

      {/* Upgrade CTA */}
      <div className="mt-6 rounded-lg bg-primary/5 p-4">
        <p className="text-sm font-medium text-gray-900">
          Upgrade to Pro - $19/mo
        </p>
        <p className="mt-1 text-sm text-gray-600">
          Unlimited messages, no time limits
        </p>
        <Button className="mt-3 gap-2" size="sm" asChild>
          <Link href="/dashboard/billing">
            Upgrade Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function TrialExpiredCard() {
  return (
    <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
          <Clock className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Trial Ended</h2>
          <p className="text-sm text-gray-600">
            You&apos;ve reached your trial limit. Upgrade to continue using your AI assistant.
          </p>
        </div>
      </div>
      <Button className="mt-4 gap-2" asChild>
        <Link href="/dashboard/billing">
          Upgrade to Pro - $19/month
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

function InstanceStatusCard({
  instance,
}: {
  instance: {
    status: string;
    telegramBotUsername?: string;
    aiModel: string;
    platform: string;
  };
}) {
  const restartInstance = useMutation(api.instances.restartInstance);

  const statusConfig = {
    running: {
      color: 'bg-green-500',
      label: 'Running',
      description: 'Your AI assistant is online',
    },
    provisioning: {
      color: 'bg-amber-500',
      label: 'Provisioning',
      description: 'Setting up your instance...',
    },
    stopped: {
      color: 'bg-gray-400',
      label: 'Stopped',
      description: 'Instance is paused',
    },
    error: {
      color: 'bg-red-500',
      label: 'Error',
      description: 'Something went wrong',
    },
    pending_setup: {
      color: 'bg-blue-500',
      label: 'Pending Setup',
      description: 'Complete the Telegram setup',
    },
  };

  const status = statusConfig[instance.status as keyof typeof statusConfig] ||
    statusConfig.error;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Instance Status</h2>
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${status.color}`} />
          <span className="text-sm font-medium">{status.label}</span>
        </div>
      </div>

      <p className="mt-1 text-sm text-gray-600">{status.description}</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div>
          <p className="text-sm text-gray-500">Bot</p>
          <p className="font-medium">
            {instance.telegramBotUsername
              ? `@${instance.telegramBotUsername}`
              : 'Not configured'}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">AI Model</p>
          <p className="font-medium">Kimi K2.5</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Platform</p>
          <p className="font-medium capitalize">{instance.platform}</p>
        </div>
      </div>

      {instance.status === 'running' && (
        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => restartInstance()}
          >
            <RefreshCw className="h-4 w-4" />
            Restart
          </Button>
          {instance.telegramBotUsername && (
            <Button size="sm" asChild>
              <a
                href={`https://t.me/${instance.telegramBotUsername}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Play className="h-4 w-4" />
                Open in Telegram
              </a>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function QuickActionCard({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mt-3 font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
      <div className="mt-3">{action}</div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-5 w-64 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="h-48 animate-pulse rounded-xl bg-gray-200" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-36 animate-pulse rounded-xl bg-gray-200" />
        ))}
      </div>
    </div>
  );
}
