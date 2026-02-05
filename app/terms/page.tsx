'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { changaOne } from '@/lib/fonts';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/">
              <span
                className={`text-2xl sm:text-3xl text-foreground ${changaOne.className}`}
              >
                MyClaws
              </span>
            </Link>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="prose prose-invert prose-gray max-w-none">
          <h1
            className={`text-3xl sm:text-4xl font-bold text-foreground ${changaOne.className}`}
          >
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Last updated: February 4, 2026
          </p>

          <section className="mt-8 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                1. Agreement to Terms
              </h2>
              <p className="mt-2 text-muted-foreground">
                By accessing or using MyClaws (&quot;Service&quot;), you agree
                to be bound by these Terms of Service (&quot;Terms&quot;). If
                you disagree with any part of these terms, you may not access
                the Service.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                2. Description of Service
              </h2>
              <p className="mt-2 text-muted-foreground">
                MyClaws is a Software-as-a-Service (SaaS) platform that provides
                managed deployment of{' '}
                <a href="https://openclaw.ai/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  OpenClaw
                </a>{' '}
                personal AI assistants. The Service includes:
              </p>
              <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
                <li>
                  Automatic provisioning and hosting of{' '}
                  <a href="https://openclaw.ai/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                    OpenClaw
                  </a>{' '}
                  instances
                </li>
                <li>
                  Telegram bot integration for AI assistant communication
                  (Discord and WhatsApp coming soon)
                </li>
                <li>
                  AI powered by Kimi K2.5 (Claude and ChatGPT options coming
                  soon)
                </li>
                <li>
                  Dashboard for managing your instance and subscription
                </li>
                <li>Infrastructure management, updates, and maintenance</li>
              </ul>
              <p className="mt-2 text-muted-foreground">
                <strong>Current Limitations:</strong> Each user is limited to
                one OpenClaw instance during the MVP phase. Multiple instances
                per account will be available in a future update.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                3. Free Trial
              </h2>
              <p className="mt-2 text-muted-foreground">
                MyClaws offers a free trial with the following limitations:
              </p>
              <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
                <li>
                  <strong>Time Limit:</strong> 24 hours from trial activation
                </li>
                <li>
                  <strong>Message Limit:</strong> 50 messages to your AI
                  assistant
                </li>
                <li>
                  <strong>Inactivity Timeout:</strong> 6 hours of no activity
                  will pause your instance
                </li>
                <li>
                  <strong>Expiration:</strong> Trial ends when any limit is
                  reached (time, messages, or inactivity)
                </li>
              </ul>
              <p className="mt-2 text-muted-foreground">
                No credit card is required to start the free trial. When your
                trial expires or is paused due to inactivity, you can resume by
                visiting your dashboard.
              </p>
              <p className="mt-2 text-muted-foreground">
                <strong>Important:</strong> If you do not upgrade to a paid plan
                within 3 days of your trial ending, your instance and all
                associated data will be permanently deleted. You will receive an
                email notification 24 hours before deletion.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                4. Subscription and Payment
              </h2>
              <p className="mt-2 text-muted-foreground">
                After the free trial, continued use of the Service requires a
                paid subscription:
              </p>
              <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
                <li>
                  <strong>Price:</strong> $19 USD per month
                </li>
                <li>
                  <strong>Billing:</strong> Recurring monthly payments processed
                  via Stripe
                </li>
                <li>
                  <strong>Cancellation:</strong> You may cancel anytime; service
                  continues until the end of the billing period
                </li>
              </ul>
              <p className="mt-2 text-muted-foreground">
                All payments are processed securely through Stripe. We do not
                store your credit card information on our servers.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                5. User Accounts
              </h2>
              <p className="mt-2 text-muted-foreground">
                To use the Service, you must create an account. You are
                responsible for:
              </p>
              <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
                <li>Providing accurate and complete registration information</li>
                <li>Maintaining the security of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Verifying your email address</li>
                <li>
                  Not creating multiple accounts to abuse the free trial system
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                6. Telegram Bot Setup
              </h2>
              <p className="mt-2 text-muted-foreground">
                To use the Service, you must create a Telegram bot through
                Telegram&apos;s BotFather and provide the bot token to MyClaws.
                You are responsible for:
              </p>
              <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
                <li>Creating and maintaining your Telegram bot</li>
                <li>
                  Complying with Telegram&apos;s Terms of Service and Bot
                  policies
                </li>
                <li>
                  Ensuring your bot usage does not violate any applicable laws
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                7. Acceptable Use
              </h2>
              <p className="mt-2 text-muted-foreground">
                You agree not to use the Service for:
              </p>
              <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
                <li>Any unlawful purpose or activity</li>
                <li>Harassment, abuse, or harm to others</li>
                <li>Generating spam, malware, or malicious content</li>
                <li>
                  Impersonating others or misrepresenting your identity
                </li>
                <li>
                  Circumventing trial limits or abusing the free trial system
                </li>
                <li>
                  Attempting to access other users&apos; instances or data
                </li>
                <li>
                  Reverse engineering or attempting to extract source code
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                8. Service Availability
              </h2>
              <p className="mt-2 text-muted-foreground">
                We strive to maintain high availability of the Service. However,
                we do not guarantee uninterrupted or error-free operation. The
                Service may be temporarily unavailable due to:
              </p>
              <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
                <li>Scheduled maintenance and updates</li>
                <li>Infrastructure issues beyond our control</li>
                <li>Third-party service outages (Telegram, Hetzner, etc.)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                9. Third-Party Services
              </h2>
              <p className="mt-2 text-muted-foreground">
                The Service integrates with and relies on third-party services:
              </p>
              <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
                <li>
                  <strong>Messaging Platforms:</strong> Telegram (current),
                  Discord and WhatsApp (coming soon)
                </li>
                <li>
                  <strong>
                    <a href="https://openclaw.ai/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                      OpenClaw
                    </a>
                    :
                  </strong>{' '}
                  Open-source AI assistant software
                </li>
                <li>
                  <strong>AI Models:</strong> Moonshot AI (Kimi K2.5) as
                  default; Anthropic (Claude) and OpenAI (ChatGPT) coming soon
                </li>
                <li>
                  <strong>Stripe:</strong> Payment processing
                </li>
                <li>
                  <strong>Hetzner:</strong> Cloud infrastructure hosting
                </li>
              </ul>
              <p className="mt-2 text-muted-foreground">
                Your use of these services is subject to their respective terms
                of service.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                10. Intellectual Property
              </h2>
              <p className="mt-2 text-muted-foreground">
                The MyClaws Service, including its original content, features,
                and functionality, is owned by MyClaws and protected by
                copyright, trademark, and other intellectual property laws.{' '}
                <a href="https://openclaw.ai/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  OpenClaw
                </a>{' '}
                is open-source software used under its respective license.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                11. Data Retention and Termination
              </h2>
              <p className="mt-2 text-muted-foreground">
                Your data retention depends on your account status:
              </p>
              <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
                <li>
                  <strong>Trial ended (no payment):</strong> Instance paused
                  immediately, data retained for 3 days, then permanently
                  deleted
                </li>
                <li>
                  <strong>Subscription cancelled:</strong> Instance continues
                  until end of billing period, then paused. Data retained for 7
                  days, then permanently deleted
                </li>
                <li>
                  <strong>Payment failed:</strong> 3-day grace period to update
                  payment method. If not resolved, instance paused and data
                  deleted after 3 additional days
                </li>
              </ul>
              <p className="mt-2 text-muted-foreground">
                You will receive email notifications before any data deletion
                occurs, including a final warning 24 hours before permanent
                deletion.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                12. Limitation of Liability
              </h2>
              <p className="mt-2 text-muted-foreground">
                To the maximum extent permitted by law, MyClaws shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages resulting from your use of the Service. Our
                total liability shall not exceed the amount you paid for the
                Service in the twelve months preceding the claim.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                13. Disclaimer of Warranties
              </h2>
              <p className="mt-2 text-muted-foreground">
                The Service is provided &quot;as is&quot; and &quot;as
                available&quot; without warranties of any kind, either express
                or implied. We do not warrant that the Service will be
                uninterrupted, secure, or error-free, or that the AI assistant
                will provide accurate or appropriate responses.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                14. Changes to Terms
              </h2>
              <p className="mt-2 text-muted-foreground">
                We reserve the right to modify these Terms at any time. We will
                provide notice of significant changes via email or through the
                Service. Your continued use of the Service after changes become
                effective constitutes acceptance of the revised Terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                15. Governing Law
              </h2>
              <p className="mt-2 text-muted-foreground">
                These Terms shall be governed by and construed in accordance
                with the laws of the United States, without regard to its
                conflict of law provisions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                16. Contact Us
              </h2>
              <p className="mt-2 text-muted-foreground">
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <p className="mt-2 text-muted-foreground">
                <strong>Email:</strong> support@myclaws.com
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <span className={`text-lg text-foreground ${changaOne.className}`}>
              MyClaws
            </span>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
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
