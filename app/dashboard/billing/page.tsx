'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { CreditCard, Check, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';

export default function BillingPage() {
  const user = useQuery(api.users.getCurrentUser);
  const trialStatus = useQuery(api.users.getTrialStatus);

  if (user === undefined || trialStatus === undefined) {
    return <BillingSkeleton />;
  }

  if (!user) {
    return null;
  }

  const isTrialActive = trialStatus?.subscriptionStatus === 'trial' && !trialStatus.isTrialExpired;
  const isActive = trialStatus?.subscriptionStatus === 'active';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="mt-1 text-gray-600">Manage your subscription and billing</p>
      </div>

      {/* Current Plan */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full ${
                isActive ? 'bg-green-100' : 'bg-amber-100'
              }`}
            >
              {isActive ? (
                <Check className="h-6 w-6 text-green-600" />
              ) : (
                <Clock className="h-6 w-6 text-amber-600" />
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {isActive ? 'MyClaw Pro' : 'Free Trial'}
              </p>
              <p className="text-sm text-gray-500">
                {isActive
                  ? '$19/month • Unlimited messages'
                  : `${trialStatus?.messagesRemaining || 0} messages remaining`}
              </p>
            </div>
          </div>
          <div className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium capitalize">
            {trialStatus?.subscriptionStatus}
          </div>
        </div>
      </div>

      {/* Upgrade CTA (for trial users) */}
      {!isActive && (
        <div className="rounded-xl border-2 border-primary bg-primary/5 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Upgrade to MyClaw Pro
              </h2>
              <p className="mt-2 text-gray-600">
                Get unlimited messages and remove all trial restrictions.
              </p>
              <ul className="mt-4 space-y-2">
                <PricingFeature>Unlimited messages</PricingFeature>
                <PricingFeature>Personal OpenClaw instance</PricingFeature>
                <PricingFeature>24/7 availability</PricingFeature>
                <PricingFeature>Priority support</PricingFeature>
              </ul>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">$19</div>
              <div className="text-sm text-gray-500">/month</div>
            </div>
          </div>
          <Button className="mt-6 gap-2" size="lg">
            <CreditCard className="h-5 w-5" />
            Subscribe Now
            <ArrowRight className="h-4 w-4" />
          </Button>
          <p className="mt-3 text-sm text-gray-500">
            Secure payment via Stripe. Cancel anytime.
          </p>
        </div>
      )}

      {/* Active Subscription Details */}
      {isActive && (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Subscription Details
          </h2>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Plan</span>
              <span className="font-medium">MyClaw Pro</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Price</span>
              <span className="font-medium">$19/month</span>
            </div>
            {user.currentPeriodEnd && (
              <div className="flex justify-between">
                <span className="text-gray-600">Next billing date</span>
                <span className="font-medium">
                  {new Date(user.currentPeriodEnd).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
          <div className="mt-6 flex gap-3">
            <Button variant="outline">Manage Subscription</Button>
            <Button variant="ghost" className="text-red-600 hover:text-red-700">
              Cancel Plan
            </Button>
          </div>
        </div>
      )}

      {/* Payment Method */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
        <p className="mt-2 text-sm text-gray-600">
          {isActive
            ? 'Manage your payment method through the Stripe customer portal.'
            : 'Add a payment method when you upgrade to Pro.'}
        </p>
        {isActive && (
          <Button variant="outline" className="mt-4">
            Manage Payment Method
          </Button>
        )}
      </div>
    </div>
  );
}

function PricingFeature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
        <Check className="h-3 w-3 text-primary" />
      </div>
      <span className="text-gray-700">{children}</span>
    </li>
  );
}

function BillingSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 w-20 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-5 w-56 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="h-32 animate-pulse rounded-xl bg-gray-200" />
      <div className="h-64 animate-pulse rounded-xl bg-gray-200" />
    </div>
  );
}
