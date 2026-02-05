'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  MessageSquare,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { changaOne } from '@/lib/fonts';

type SetupStep = 'intro' | 'create-bot' | 'enter-token' | 'complete';

export default function SetupPage() {
  const router = useRouter();
  const [step, setStep] = useState<SetupStep>('intro');
  const [botToken, setBotToken] = useState('');
  const [botUsername, setBotUsername] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const instance = useQuery(api.instances.getUserInstance);
  const setupTelegramBot = useMutation(api.instances.setupTelegramBot);

  // If instance is already set up, redirect to dashboard
  if (instance && instance.status !== 'pending_setup') {
    router.push('/dashboard');
    return null;
  }

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateToken = (token: string): boolean => {
    // Basic validation: Telegram bot tokens are in format: 123456789:ABCdefGHI_JKLmnoPQRstuvwxyz
    const tokenRegex = /^\d+:[A-Za-z0-9_-]+$/;
    return tokenRegex.test(token);
  };

  const handleSubmit = async () => {
    setError('');

    if (!validateToken(botToken)) {
      setError('Invalid bot token format. Please check and try again.');
      return;
    }

    if (!botUsername) {
      setError('Please enter your bot username.');
      return;
    }

    // Remove @ prefix if provided
    const cleanUsername = botUsername.replace(/^@/, '');

    setIsSubmitting(true);

    try {
      await setupTelegramBot({
        botToken,
        botUsername: cleanUsername,
      });
      setStep('complete');
    } catch (err) {
      setError('Failed to set up bot. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Set Up Your AI Assistant</h1>
        <p className="mt-1 text-sm sm:text-base text-muted-foreground">
          Connect your Telegram bot to get started with MyClaws
        </p>
      </div>

      {/* Progress Steps */}
      <div>
        {/* Mobile: Horizontal steps */}
        <div className="flex sm:hidden items-center">
          {['Create', 'Token', 'Done'].map((label, index) => {
            const stepMap: SetupStep[] = ['create-bot', 'enter-token', 'complete'];
            const currentIndex = stepMap.indexOf(step);
            const isActive = index <= currentIndex || step === 'intro';
            const isCurrent = stepMap[index] === step;
            const isPast = index < currentIndex;

            return (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      isCurrent
                        ? 'bg-primary text-primary-foreground'
                        : isActive
                          ? 'bg-primary/20 text-primary'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className={`mt-1 text-xs ${isCurrent ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                    {label}
                  </span>
                </div>
                {index < 2 && <div className={`flex-1 mx-2 h-px -mt-4 ${isPast ? 'bg-primary/40' : 'bg-border'}`} />}
              </div>
            );
          })}
        </div>

        {/* Desktop: Horizontal steps */}
        <div className="hidden sm:flex items-center">
          {['Create Bot', 'Enter Token', 'Complete'].map((label, index) => {
            const stepMap: SetupStep[] = ['create-bot', 'enter-token', 'complete'];
            const currentIndex = stepMap.indexOf(step);
            const isActive = index <= currentIndex || step === 'intro';
            const isCurrent = stepMap[index] === step;
            const isPast = index < currentIndex;

            return (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      isCurrent
                        ? 'bg-primary text-primary-foreground'
                        : isActive
                          ? 'bg-primary/20 text-primary'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`ml-2 text-sm whitespace-nowrap ${
                      isCurrent ? 'font-medium text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {index < 2 && (
                  <div className={`flex-1 mx-4 h-px ${isPast ? 'bg-primary/40' : 'bg-border'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        {step === 'intro' && (
          <IntroStep onNext={() => setStep('create-bot')} />
        )}

        {step === 'create-bot' && (
          <CreateBotStep
            onNext={() => setStep('enter-token')}
            onCopy={handleCopy}
            copied={copied}
          />
        )}

        {step === 'enter-token' && (
          <EnterTokenStep
            botToken={botToken}
            botUsername={botUsername}
            error={error}
            isSubmitting={isSubmitting}
            onTokenChange={setBotToken}
            onUsernameChange={setBotUsername}
            onSubmit={handleSubmit}
            onBack={() => setStep('create-bot')}
          />
        )}

        {step === 'complete' && (
          <CompleteStep
            botUsername={botUsername}
            onGoToDashboard={() => router.push('/dashboard')}
          />
        )}
      </div>
    </div>
  );
}

function IntroStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center">
      <h1 className="text-2xl sm:text-3xl font-semibold text-card-foreground">
        Welcome to <span className={`${changaOne.className}`}>MyClaws</span>!
      </h1>
      <p className="mt-2 text-sm sm:text-base text-muted-foreground">
        Let&apos;s connect your Telegram bot to your personal AI assistant. This
        will only take a few minutes.
      </p>

      <div className="mt-5 sm:mt-6 rounded-lg bg-muted p-3 sm:p-4 text-left">
        <h3 className="font-medium text-card-foreground text-sm sm:text-base">What you&apos;ll need:</h3>
        <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            A Telegram account
          </li>
          <li className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            About 2 minutes of your time
          </li>
        </ul>
      </div>

      <Button className="mt-5 sm:mt-6 gap-2 w-full sm:w-auto" onClick={onNext}>
        Get Started
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

function CreateBotStep({
  onNext,
  onCopy,
  copied,
}: {
  onNext: () => void;
  onCopy: (text: string) => void;
  copied: boolean;
}) {
  return (
    <div>
      <h2 className="text-lg sm:text-xl font-semibold text-card-foreground">Step 1: Create Your Telegram Bot</h2>
      <p className="mt-2 text-sm sm:text-base text-muted-foreground">
        Follow these steps to create your bot using Telegram&apos;s BotFather.
      </p>

      <ol className="mt-5 sm:mt-6 space-y-5 sm:space-y-6">
        <li className="flex gap-3 sm:gap-4">
          <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs sm:text-sm font-medium text-primary-foreground">
            1
          </div>
          <div className="min-w-0">
            <p className="font-medium text-card-foreground text-sm sm:text-base">Open BotFather in Telegram</p>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Click the link below or search for @BotFather in Telegram.
            </p>
            <a
              href="https://t.me/BotFather"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Open @BotFather
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </li>

        <li className="flex gap-3 sm:gap-4">
          <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs sm:text-sm font-medium text-primary-foreground">
            2
          </div>
          <div className="min-w-0">
            <p className="font-medium text-card-foreground text-sm sm:text-base">Create a new bot</p>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Send the command below to BotFather to start creating your bot.
            </p>
            <div className="mt-2 flex items-center gap-2">
              <code className="rounded bg-muted px-2 py-1 text-sm text-card-foreground">/newbot</code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCopy('/newbot')}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </li>

        <li className="flex gap-3 sm:gap-4">
          <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs sm:text-sm font-medium text-primary-foreground">
            3
          </div>
          <div className="min-w-0">
            <p className="font-medium text-card-foreground text-sm sm:text-base">Follow the prompts</p>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              BotFather will ask you for:
            </p>
            <ul className="mt-2 list-inside list-disc text-xs sm:text-sm text-muted-foreground space-y-1">
              <li>A display name (e.g., &quot;My AI Assistant&quot;)</li>
              <li>A username ending in &quot;bot&quot;</li>
            </ul>
          </div>
        </li>

        <li className="flex gap-3 sm:gap-4">
          <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs sm:text-sm font-medium text-primary-foreground">
            4
          </div>
          <div className="min-w-0">
            <p className="font-medium text-card-foreground text-sm sm:text-base">Copy your bot token</p>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              BotFather will give you a token that looks like:
            </p>
            <code className="mt-2 block rounded bg-muted px-2 py-1 text-xs text-muted-foreground overflow-x-auto">
              123456789:ABCdefGHI_JKL...
            </code>
            <p className="mt-2 text-xs sm:text-sm text-amber-500">
              Keep this token secret!
            </p>
          </div>
        </li>
      </ol>

      <div className="mt-6 sm:mt-8 flex justify-end">
        <Button className="gap-2 w-full sm:w-auto" onClick={onNext}>
          I have my bot token
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function EnterTokenStep({
  botToken,
  botUsername,
  error,
  isSubmitting,
  onTokenChange,
  onUsernameChange,
  onSubmit,
  onBack,
}: {
  botToken: string;
  botUsername: string;
  error: string;
  isSubmitting: boolean;
  onTokenChange: (value: string) => void;
  onUsernameChange: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <h2 className="text-lg sm:text-xl font-semibold text-card-foreground">Step 2: Enter Your Bot Details</h2>
      <p className="mt-2 text-sm sm:text-base text-muted-foreground">
        Paste your bot token and username from BotFather.
      </p>

      <div className="mt-5 sm:mt-6 space-y-4">
        <div>
          <label
            htmlFor="botToken"
            className="block text-sm font-medium text-card-foreground"
          >
            Bot Token
          </label>
          <Input
            id="botToken"
            type="password"
            placeholder="123456789:ABCdef..."
            value={botToken}
            onChange={(e) => onTokenChange(e.target.value)}
            className="mt-1"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            The token from BotFather after creating your bot.
          </p>
        </div>

        <div>
          <label
            htmlFor="botUsername"
            className="block text-sm font-medium text-card-foreground"
          >
            Bot Username
          </label>
          <Input
            id="botUsername"
            type="text"
            placeholder="my_ai_assistant_bot"
            value={botUsername}
            onChange={(e) => onUsernameChange(e.target.value)}
            className="mt-1"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            The username you chose (without @).
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs sm:text-sm text-red-500">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}
      </div>

      <div className="mt-6 sm:mt-8 flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
        <Button variant="outline" onClick={onBack} className="w-full sm:w-auto">
          Back
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!botToken || !botUsername || isSubmitting}
          className="gap-2 w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Setting up...
            </>
          ) : (
            <>
              Complete Setup
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function CompleteStep({
  botUsername,
  onGoToDashboard,
}: {
  botUsername: string;
  onGoToDashboard: () => void;
}) {
  const cleanUsername = botUsername.replace(/^@/, '');

  return (
    <div className="text-center">
      <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-500/20">
        <Check className="h-7 w-7 sm:h-8 sm:w-8 text-green-500" />
      </div>
      <h2 className="mt-4 text-lg sm:text-xl font-semibold text-card-foreground">You&apos;re All Set!</h2>
      <p className="mt-2 text-sm sm:text-base text-muted-foreground">
        Your AI assistant is being set up. Start chatting with your bot
        on Telegram now.
      </p>

      <div className="mt-5 sm:mt-6 rounded-lg bg-primary/10 p-4">
        <p className="text-sm font-medium text-card-foreground">Your Bot</p>
        <p className="mt-1 text-xl sm:text-2xl font-bold text-primary break-all">@{cleanUsername}</p>
        <a
          href={`https://t.me/${cleanUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <MessageSquare className="h-4 w-4" />
          Open in Telegram
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="mt-5 sm:mt-6 space-y-3">
        <Button className="w-full gap-2" onClick={onGoToDashboard}>
          Go to Dashboard
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="w-full gap-2" asChild>
          <a
            href={`https://t.me/${cleanUsername}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageSquare className="h-4 w-4" />
            Chat with your bot
          </a>
        </Button>
      </div>
    </div>
  );
}
