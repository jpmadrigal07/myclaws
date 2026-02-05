'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { changaOne } from '@/lib/fonts';

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: February 4, 2026
          </p>

          <section className="mt-8 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                1. Introduction
              </h2>
              <p className="mt-2 text-muted-foreground">
                MyClaws (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;)
                respects your privacy and is committed to protecting your
                personal data. This Privacy Policy explains how we collect, use,
                and protect your information when you use our AI assistant
                deployment service.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                2. Information We Collect
              </h2>
              <p className="mt-2 text-muted-foreground">
                We collect the following types of information:
              </p>

              <h3 className="mt-4 text-lg font-medium text-foreground">
                2.1 Account Information
              </h3>
              <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
                <li>Email address (for account creation and communication)</li>
                <li>Password (securely hashed, never stored in plain text)</li>
                <li>Account creation and verification timestamps</li>
              </ul>

              <h3 className="mt-4 text-lg font-medium text-foreground">
                2.2 Telegram Bot Information
              </h3>
              <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
                <li>
                  Telegram bot token (encrypted at rest, required to connect
                  your bot)
                </li>
                <li>
                  Telegram bot username (for identification and display
                  purposes)
                </li>
              </ul>

              <h3 className="mt-4 text-lg font-medium text-foreground">
                2.3 Usage Information
              </h3>
              <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
                <li>
                  Message counts (for trial limits and service optimization)
                </li>
                <li>Instance status and activity timestamps</li>
                <li>Subscription status and billing history</li>
              </ul>

              <h3 className="mt-4 text-lg font-medium text-foreground">
                2.4 Payment Information
              </h3>
              <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
                <li>
                  Stripe customer ID and subscription ID (for payment
                  processing)
                </li>
                <li>
                  Payment card details are handled entirely by Stripe and never
                  stored on our servers
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                3. How We Use Your Information
              </h2>
              <p className="mt-2 text-muted-foreground">
                We use the collected information for:
              </p>
              <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
                <li>
                  <strong>Service Provision:</strong> Deploying and managing
                  your{' '}
                  <a href="https://openclaw.ai/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                    OpenClaw
                  </a>{' '}
                  AI assistant instance
                </li>
                <li>
                  <strong>Account Management:</strong> Authenticating your
                  access and managing your subscription
                </li>
                <li>
                  <strong>Billing:</strong> Processing payments and managing
                  subscriptions through Stripe
                </li>
                <li>
                  <strong>Trial Management:</strong> Tracking message usage
                  during the free trial period
                </li>
                <li>
                  <strong>Communication:</strong> Sending important service
                  updates, billing notifications, and support responses
                </li>
                <li>
                  <strong>Service Improvement:</strong> Analyzing usage patterns
                  to improve our service
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                4. AI Assistant Conversations
              </h2>
              <p className="mt-2 text-muted-foreground">
                Your conversations with your AI assistant are processed by your
                personal{' '}
                <a href="https://openclaw.ai/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  OpenClaw
                </a>{' '}
                instance. Important notes:
              </p>
              <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
                <li>
                  Conversations are processed through the Kimi K2.5 AI model
                  (provided by Moonshot AI)
                </li>
                <li>
                  Your conversations are not stored on MyClaws servers beyond
                  what is necessary for the AI to function
                </li>
                <li>
                  Each user&apos;s{' '}
                  <a href="https://openclaw.ai/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                    OpenClaw
                  </a>{' '}
                  instance runs in an isolated container with dedicated resources
                </li>
                <li>
                  We do not access, read, or analyze the content of your
                  conversations
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                5. Data Sharing and Third Parties
              </h2>
              <p className="mt-2 text-muted-foreground">
                We share your data with the following third-party services that
                are essential to operating MyClaws:
              </p>

              <h3 className="mt-4 text-lg font-medium text-foreground">
                5.1 Stripe (Payment Processing)
              </h3>
              <p className="mt-2 text-muted-foreground">
                We use Stripe to process payments. Stripe receives your payment
                information directly and is PCI-DSS compliant. See{' '}
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Stripe&apos;s Privacy Policy
                </a>
                .
              </p>

              <h3 className="mt-4 text-lg font-medium text-foreground">
                5.2 Hetzner (Cloud Infrastructure)
              </h3>
              <p className="mt-2 text-muted-foreground">
                Your{' '}
                <a href="https://openclaw.ai/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  OpenClaw
                </a>{' '}
                instance runs on Hetzner cloud servers located in the United States (Ashburn or Hillsboro). See{' '}
                <a
                  href="https://www.hetzner.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Hetzner&apos;s Privacy Policy
                </a>
                .
              </p>

              <h3 className="mt-4 text-lg font-medium text-foreground">
                5.3 Telegram
              </h3>
              <p className="mt-2 text-muted-foreground">
                Your Telegram bot communicates through Telegram&apos;s platform.
                See{' '}
                <a
                  href="https://telegram.org/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Telegram&apos;s Privacy Policy
                </a>
                .
              </p>

              <h3 className="mt-4 text-lg font-medium text-foreground">
                5.4 Moonshot AI (Kimi K2.5)
              </h3>
              <p className="mt-2 text-muted-foreground">
                Your AI assistant conversations are processed by the Kimi K2.5
                language model provided by Moonshot AI. Conversation data may be
                processed according to their terms of service.
              </p>

              <h3 className="mt-4 text-lg font-medium text-foreground">
                5.5 Convex
              </h3>
              <p className="mt-2 text-muted-foreground">
                We use Convex as our backend database service for storing
                account and subscription data. See{' '}
                <a
                  href="https://www.convex.dev/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Convex&apos;s Privacy Policy
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                6. Data Security
              </h2>
              <p className="mt-2 text-muted-foreground">
                We implement appropriate security measures to protect your data:
              </p>
              <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
                <li>
                  <strong>Password Security:</strong> Passwords are hashed using
                  industry-standard algorithms (bcrypt/argon2)
                </li>
                <li>
                  <strong>Token Encryption:</strong> Telegram bot tokens are
                  encrypted at rest
                </li>
                <li>
                  <strong>Infrastructure Security:</strong> SSH key-based
                  authentication, no root password access
                </li>
                <li>
                  <strong>Container Isolation:</strong> Each user&apos;s
                  instance runs in an isolated Docker container with resource
                  limits
                </li>
                <li>
                  <strong>PCI Compliance:</strong> All payment processing is
                  handled by Stripe (PCI-DSS compliant)
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                7. Data Retention
              </h2>
              <p className="mt-2 text-muted-foreground">
                We retain your data as follows:
              </p>
              <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
                <li>
                  <strong>Active Accounts:</strong> Data is retained while your
                  account is active
                </li>
                <li>
                  <strong>Cancelled Subscriptions:</strong> Instance paused,
                  data retained for 7 days
                </li>
                <li>
                  <strong>After Retention Period:</strong> All instance data is
                  permanently deleted
                </li>
                <li>
                  <strong>Account Deletion:</strong> You may request complete
                  account deletion at any time
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                8. Your Rights
              </h2>
              <p className="mt-2 text-muted-foreground">
                You have the following rights regarding your personal data:
              </p>
              <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
                <li>
                  <strong>Access:</strong> Request a copy of the data we hold
                  about you
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate
                  data
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your account
                  and associated data
                </li>
                <li>
                  <strong>Portability:</strong> Request your data in a portable
                  format
                </li>
                <li>
                  <strong>Objection:</strong> Object to certain processing of
                  your data
                </li>
              </ul>
              <p className="mt-2 text-muted-foreground">
                To exercise these rights, contact us at support@myclaws.com.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                9. Cookies and Tracking
              </h2>
              <p className="mt-2 text-muted-foreground">
                We use essential cookies for:
              </p>
              <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
                <li>Authentication and session management</li>
                <li>Security and fraud prevention</li>
              </ul>
              <p className="mt-2 text-muted-foreground">
                We do not use third-party advertising or tracking cookies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                10. Children&apos;s Privacy
              </h2>
              <p className="mt-2 text-muted-foreground">
                MyClaws is not intended for children under 13 years of age. We
                do not knowingly collect personal information from children
                under 13. If you believe we have collected data from a child
                under 13, please contact us immediately.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                11. International Data Transfers
              </h2>
              <p className="mt-2 text-muted-foreground">
                Your data may be processed in the United States where our
                servers are located. By using our Service, you consent to the
                transfer of your data to the United States.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                12. Changes to This Policy
              </h2>
              <p className="mt-2 text-muted-foreground">
                We may update this Privacy Policy from time to time. We will
                notify you of any significant changes by email or through the
                Service. Your continued use of the Service after changes become
                effective constitutes acceptance of the revised policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                13. Contact Us
              </h2>
              <p className="mt-2 text-muted-foreground">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us at:
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
