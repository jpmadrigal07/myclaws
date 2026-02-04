'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Bot,
  MessageSquare,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';

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

  const extractBotUsername = (token: string): string => {
    // In a real app, you would call the Telegram API to get the bot info
    // For now, we'll ask the user to provide it
    return '';
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
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Set Up Your AI Assistant</h1>
        <p className="mt-1 text-gray-600">
          Connect your Telegram bot to get started with MyClaw
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-between">
        {['Create Bot', 'Enter Token', 'Complete'].map((label, index) => {
          const stepMap: SetupStep[] = ['create-bot', 'enter-token', 'complete'];
          const currentIndex = stepMap.indexOf(step);
          const isActive = index <= currentIndex || step === 'intro';
          const isCurrent = stepMap[index] === step;

          return (
            <div key={label} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  isCurrent
                    ? 'bg-primary text-white'
                    : isActive
                      ? 'bg-primary/20 text-primary'
                      : 'bg-gray-100 text-gray-400'
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`ml-2 text-sm ${
                  isCurrent ? 'font-medium text-gray-900' : 'text-gray-500'
                }`}
              >
                {label}
              </span>
              {index < 2 && (
                <div className="mx-4 h-px w-12 bg-gray-200 sm:w-24" />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
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
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Bot className="h-8 w-8 text-primary" />
      </div>
      <h2 className="mt-4 text-xl font-semibold">Welcome to MyClaw!</h2>
      <p className="mt-2 text-gray-600">
        Let&apos;s connect your Telegram bot to your personal AI assistant. This
        will only take a few minutes.
      </p>

      <div className="mt-6 rounded-lg bg-gray-50 p-4 text-left">
        <h3 className="font-medium text-gray-900">What you&apos;ll need:</h3>
        <ul className="mt-2 space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <MessageSquare className="mt-0.5 h-4 w-4 text-primary" />
            A Telegram account
          </li>
          <li className="flex items-start gap-2">
            <Bot className="mt-0.5 h-4 w-4 text-primary" />
            About 2 minutes of your time
          </li>
        </ul>
      </div>

      <Button className="mt-6 gap-2" onClick={onNext}>
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
      <h2 className="text-xl font-semibold">Step 1: Create Your Telegram Bot</h2>
      <p className="mt-2 text-gray-600">
        Follow these steps to create your bot using Telegram&apos;s BotFather.
      </p>

      <ol className="mt-6 space-y-6">
        <li className="flex gap-4">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
            1
          </div>
          <div>
            <p className="font-medium text-gray-900">Open BotFather in Telegram</p>
            <p className="mt-1 text-sm text-gray-600">
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

        <li className="flex gap-4">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
            2
          </div>
          <div>
            <p className="font-medium text-gray-900">Create a new bot</p>
            <p className="mt-1 text-sm text-gray-600">
              Send the command below to BotFather to start creating your bot.
            </p>
            <div className="mt-2 flex items-center gap-2">
              <code className="rounded bg-gray-100 px-2 py-1 text-sm">/newbot</code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCopy('/newbot')}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </li>

        <li className="flex gap-4">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
            3
          </div>
          <div>
            <p className="font-medium text-gray-900">Follow the prompts</p>
            <p className="mt-1 text-sm text-gray-600">
              BotFather will ask you for:
            </p>
            <ul className="mt-2 list-inside list-disc text-sm text-gray-600">
              <li>A display name for your bot (e.g., &quot;My AI Assistant&quot;)</li>
              <li>
                A username ending in &quot;bot&quot; (e.g., &quot;my_ai_assistant_bot&quot;)
              </li>
            </ul>
          </div>
        </li>

        <li className="flex gap-4">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
            4
          </div>
          <div>
            <p className="font-medium text-gray-900">Copy your bot token</p>
            <p className="mt-1 text-sm text-gray-600">
              BotFather will give you a token that looks like:
            </p>
            <code className="mt-2 block rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
              123456789:ABCdefGHI_JKLmnoPQRstuvwxyz
            </code>
            <p className="mt-2 text-sm text-amber-600">
              Keep this token secret! Don&apos;t share it with anyone.
            </p>
          </div>
        </li>
      </ol>

      <div className="mt-8 flex justify-end">
        <Button className="gap-2" onClick={onNext}>
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
      <h2 className="text-xl font-semibold">Step 2: Enter Your Bot Details</h2>
      <p className="mt-2 text-gray-600">
        Paste your bot token and username from BotFather.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="botToken"
            className="block text-sm font-medium text-gray-700"
          >
            Bot Token
          </label>
          <Input
            id="botToken"
            type="password"
            placeholder="123456789:ABCdefGHI_JKLmnoPQRstuvwxyz"
            value={botToken}
            onChange={(e) => onTokenChange(e.target.value)}
            className="mt-1"
          />
          <p className="mt-1 text-xs text-gray-500">
            This is the token BotFather gave you after creating your bot.
          </p>
        </div>

        <div>
          <label
            htmlFor="botUsername"
            className="block text-sm font-medium text-gray-700"
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
          <p className="mt-1 text-xs text-gray-500">
            The username you chose (without the @ symbol).
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!botToken || !botUsername || isSubmitting}
          className="gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
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
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      <h2 className="mt-4 text-xl font-semibold">You&apos;re All Set!</h2>
      <p className="mt-2 text-gray-600">
        Your AI assistant is being set up. You can start chatting with your bot
        on Telegram now.
      </p>

      <div className="mt-6 rounded-lg bg-primary/5 p-4">
        <p className="text-sm font-medium text-gray-900">Your Bot</p>
        <p className="mt-1 text-2xl font-bold text-primary">@{cleanUsername}</p>
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

      <div className="mt-6 space-y-3">
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
