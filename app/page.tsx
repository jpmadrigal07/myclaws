'use client';

import { useSession } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Zap,
  MessageSquare,
  Shield,
  Clock,
  Check,
  ArrowRight,
  Bot,
  Sparkles,
} from 'lucide-react';

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">MyClaw</span>
            </div>
            <div className="flex items-center gap-4">
              {session ? (
                <Button asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/login">Start Free Trial</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Your Personal AI Assistant in Minutes
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Get Your Own AI Assistant
              <br />
              <span className="text-primary">No Setup Required</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              MyClaw deploys OpenClaw - a powerful personal AI assistant - directly
              to your Telegram. Start chatting in minutes, not hours.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="gap-2 text-base" asChild>
                <Link href="/login">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <p className="text-sm text-gray-500">
                1-day free trial • 50 messages • No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything You Need
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A fully managed AI assistant without the complexity
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Instant Setup"
              description="Connect your Telegram bot and start chatting in under 5 minutes"
            />
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6" />}
              title="Telegram First"
              description="Chat with your AI assistant right from Telegram, anytime, anywhere"
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Fully Managed"
              description="We handle all the infrastructure, updates, and maintenance"
            />
            <FeatureCard
              icon={<Clock className="h-6 w-6" />}
              title="Always Available"
              description="Your AI assistant is online 24/7, ready when you need it"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Simple Pricing</h2>
            <p className="mt-4 text-lg text-gray-600">
              One plan, everything included
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-lg">
            <div className="rounded-2xl border-2 border-primary bg-white p-8 shadow-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">MyClaw Pro</h3>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gray-900">$19</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Billed monthly, cancel anytime
                </p>
              </div>
              <ul className="mt-8 space-y-4">
                <PricingFeature>Unlimited messages</PricingFeature>
                <PricingFeature>Personal OpenClaw instance</PricingFeature>
                <PricingFeature>Telegram integration</PricingFeature>
                <PricingFeature>Kimi K2.5 AI model</PricingFeature>
                <PricingFeature>24/7 availability</PricingFeature>
                <PricingFeature>Automatic updates</PricingFeature>
              </ul>
              <Button className="mt-8 w-full" size="lg" asChild>
                <Link href="/login">Start Free Trial</Link>
              </Button>
              <p className="mt-4 text-center text-sm text-gray-500">
                1-day free trial with 50 messages
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-primary py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
            Join hundreds of users who have already deployed their personal AI
            assistant with MyClaw.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 gap-2 text-base"
            asChild
          >
            <Link href="/login">
              Start Your Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              <span className="font-semibold">MyClaw</span>
            </div>
            <p className="text-sm text-gray-500">
              © 2026 MyClaw. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}

function PricingFeature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
        <Check className="h-3 w-3 text-primary" />
      </div>
      <span className="text-gray-700">{children}</span>
    </li>
  );
}
