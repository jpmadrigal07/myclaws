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
  Sparkles,
} from 'lucide-react';
import { changaOne } from '@/lib/fonts';
import { Particles } from './_components/particles';

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <span className={`text-2xl sm:text-3xl text-foreground ${changaOne.className}`}>MyClaws</span>
            <div className="flex items-center gap-2 sm:gap-4">
              {session ? (
                <Button asChild size="sm" className="sm:h-9 sm:px-4 ">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button variant="ghost" asChild size="sm" className="hidden sm:inline-flex">
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild size="sm" className="sm:h-9 sm:px-4 bg-teal-500 hover:bg-teal-600 text-gray-900">
                    <Link href="/login">
                      <span className="sm:hidden">Start Trial</span>
                      <span className="hidden sm:inline">Start Free Trial</span>
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 lg:py-32 relative overflow-hidden">
        <Particles />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>For <strong>$19/month</strong>, you will get your own AI assistant</span>
            </div>
            <h1 className={`text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-red-300 via-40% to-white bg-clip-text text-transparent ${changaOne.className}`}>
              Cheapest and Easiest Way to <br className="hidden sm:block" /> Get Your Own AI Assistant
            </h1>
            <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
              MyClaws deploys{' '}
              <a href="https://openclaw.ai/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                OpenClaw
              </a>{' '}
              - a powerful personal AI assistant - directly to your Telegram. Start chatting in minutes, not hours.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3 sm:gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="gap-2 text-base" asChild>
                <Link href="/login">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <p className="text-xs sm:text-sm text-muted-foreground">
                1-day free trial • 50 messages • No credit card • Cancel anytime • <strong>$19/month</strong> after trial
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-muted/50 py-12 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-500 via-red-300 via-40% to-white bg-clip-text text-transparent ${changaOne.className}`}>
              Everything You Need
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground">
              A fully managed AI assistant without the complexity
            </p>
          </div>
          <div className="mt-10 sm:mt-16 grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-500 via-red-300 via-40% to-white bg-clip-text text-transparent ${changaOne.className}`}>Simple Pricing</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground">
              One plan, everything included
            </p>
          </div>
          <div className="mx-auto mt-10 sm:mt-16 max-w-lg">
            <div className="rounded-2xl border-2 border-primary bg-card p-6 sm:p-8 shadow-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-card-foreground">MyClaws Pro</h3>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-card-foreground">$19</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Billed monthly, cancel anytime
                </p>
              </div>
              <ul className="mt-8 space-y-4">
                <PricingFeature>Unlimited messages</PricingFeature>
                <PricingFeature>
                  Personal{' '}
                  <a href="https://openclaw.ai/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                    OpenClaw
                  </a>{' '}
                  instance
                </PricingFeature>
                <PricingFeature>Telegram integration (Discord, WhatsApp coming soon)</PricingFeature>
                <PricingFeature>Kimi K2.5 AI model (GPT, Claude coming soon)</PricingFeature>
                <PricingFeature>24/7 availability</PricingFeature>
                <PricingFeature>Automatic updates</PricingFeature>
              </ul>
              <Button className="mt-8 w-full " size="lg" asChild>
                <Link href="/login">Start Free Trial</Link>
              </Button>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                1-day free trial with 50 messages
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-primary py-12 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-500 via-red-400 via-40% to-gray-900 bg-clip-text text-transparent ${changaOne.className}`}>
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-base sm:text-lg text-primary-foreground/80 px-4 sm:px-0">
            Join users who have already deployed their personal AI
            assistant with MyClaws.
          </p>
          <Button
            size="lg"
            className="mt-6 sm:mt-8 gap-2 text-base w-full sm:w-auto "
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
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <span className={`text-lg text-foreground ${changaOne.className}`}>MyClaws</span>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 MyClaws. All rights reserved.
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
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mt-4 font-semibold text-card-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function PricingFeature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
        <Check className="h-3 w-3 text-primary" />
      </div>
      <span className="text-card-foreground">{children}</span>
    </li>
  );
}
