'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { CreditCard, Check, Sparkles, ArrowRight } from 'lucide-react';

export default function BillingPage() {
  const user = useQuery(api.users.getCurrentUser);
  const trialStatus = useQuery(api.users.getTrialStatus);

  if (user === undefined || trialStatus === undefined) {
    return <BillingSkeleton />;
  }

  const isPro = user?.subscriptionStatus === 'active';

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Billing</h1>
        <p className="mt-1 text-sm sm:text-base text-muted-foreground">
          Manage your subscription and payment methods
        </p>
      </div>

      {/* Current Plan */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <h2 className="text-base sm:text-lg font-semibold text-card-foreground">Current Plan</h2>

        <div className="mt-5 sm:mt-6">
          {isPro ? (
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-card-foreground">Pro Plan</p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  $9/month • Renews on{' '}
                  {user?.currentPeriodEnd
                    ? new Date(user.currentPeriodEnd).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-green-500/20 px-3 py-1 text-xs sm:text-sm font-medium text-green-500">
                Active
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-card-foreground">Free Trial</p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {trialStatus?.isTrialExpired
                    ? 'Trial expired'
                    : trialStatus?.timeRemaining
                      ? `${Math.ceil(trialStatus.timeRemaining / (24 * 60 * 60 * 1000))} days remaining`
                      : 'Trial expired'}
                </p>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs sm:text-sm font-medium ${
                  trialStatus?.isActive
                    ? 'bg-blue-500/20 text-blue-500'
                    : 'bg-red-500/20 text-red-500'
                }`}
              >
                {trialStatus?.isActive ? 'Active' : 'Expired'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Upgrade CTA (for trial users) */}
      {!isPro && (
        <div className="relative overflow-hidden rounded-xl border border-primary bg-primary/5 p-4 sm:p-6">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-20 sm:h-24 w-20 sm:w-24 bg-primary/10 rounded-full blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-xs sm:text-sm font-medium">Upgrade to Pro</span>
            </div>
            <h3 className="mt-2 text-lg sm:text-xl font-bold text-card-foreground">
              Get unlimited access
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Continue using your AI assistant without interruption
            </p>

            <ul className="mt-3 sm:mt-4 space-y-2">
              {[
                'Unlimited messaging',
                'All AI models included',
                'Priority support',
                'Advanced features',
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Check className="h-3 w-3 sm:h-4 sm:w-4 text-primary shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <button className="mt-4 sm:mt-6 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors w-full sm:w-auto">
              Upgrade Now - $9/month
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Subscription Details (for Pro users) */}
      {isPro && (
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
          <h2 className="text-base sm:text-lg font-semibold text-card-foreground">
            Subscription Details
          </h2>

          <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-muted-foreground">Plan</span>
              <span className="text-sm font-medium text-card-foreground">Pro ($9/month)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-muted-foreground">Status</span>
              <span className="text-sm font-medium text-green-500">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-muted-foreground">Next billing date</span>
              <span className="text-sm font-medium text-card-foreground">
                {user?.currentPeriodEnd
                  ? new Date(user.currentPeriodEnd).toLocaleDateString()
                  : 'N/A'}
              </span>
            </div>
          </div>

          <div className="mt-5 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
            <button className="text-sm text-red-500 hover:text-red-400 transition-colors">
              Cancel Subscription
            </button>
          </div>
        </div>
      )}

      {/* Payment Method */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <h2 className="text-base sm:text-lg font-semibold text-card-foreground">Payment Method</h2>

        <div className="mt-5 sm:mt-6">
          {isPro ? (
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-muted">
                  <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">•••• •••• •••• 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/25</p>
                </div>
              </div>
              <button className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors">
                Update
              </button>
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <CreditCard className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                No payment method on file
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Add a payment method when you upgrade to Pro
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Billing History */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <h2 className="text-base sm:text-lg font-semibold text-card-foreground">Billing History</h2>

        <div className="mt-5 sm:mt-6">
          {isPro ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <div>
                  <p className="text-sm font-medium text-card-foreground">Pro Plan</p>
                  <p className="text-xs text-muted-foreground">Jan 1, 2025</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-card-foreground">$9.00</p>
                  <p className="text-xs text-green-500">Paid</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center py-6 sm:py-8 text-sm text-muted-foreground">
              No billing history yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function BillingSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <div className="h-6 sm:h-8 w-20 sm:w-24 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 sm:h-5 w-40 sm:w-56 animate-pulse rounded bg-muted" />
      </div>
      <div className="h-28 sm:h-32 animate-pulse rounded-xl bg-muted" />
      <div className="h-52 sm:h-64 animate-pulse rounded-xl bg-muted" />
      <div className="h-36 sm:h-40 animate-pulse rounded-xl bg-muted" />
    </div>
  );
}
