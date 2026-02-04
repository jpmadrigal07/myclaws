# MVP Business Requirements Document (BRD)

## MyClaw - OpenClaw Easy Deployment SaaS

**Version:** 1.0
**Date:** February 4, 2026
**Status:** Draft

---

## 1. Executive Summary

MyClaw is a SaaS platform that provides one-click deployment of [OpenClaw](https://openclaw.ai/) personal AI assistants. Users can get their own OpenClaw instance running in minutes without any technical knowledge, starting with Telegram integration.

### Value Proposition

- **For non-technical users**: Get your own personal AI assistant without managing servers
- **For busy professionals**: Skip the setup complexity and start using OpenClaw immediately
- **Affordable**: $19/month with a 1-day free trial

---

## 2. Problem Statement

OpenClaw is a powerful personal AI assistant, but deploying it requires:
- Technical knowledge (CLI, Docker, server management)
- Setting up and maintaining a server
- Configuring integrations manually
- Ongoing maintenance and updates

**Target users want the benefits of OpenClaw without the technical overhead.**

---

## 3. Solution Overview

A managed SaaS platform that:
1. Automatically provisions OpenClaw instances on Hetzner VMs
2. Pre-configures Telegram integration via BotFather
3. Handles all infrastructure management
4. Provides a simple onboarding experience

---

## 4. MVP Scope

### 4.1 Core Features (Must Have)

| Feature | Description |
|---------|-------------|
| **User Registration** | Email/password signup with email verification |
| **Telegram Bot Setup** | Guided flow to connect user's Telegram bot (via BotFather token) |
| **Messaging Platforms** | Telegram (MVP), Discord & WhatsApp coming soon |
| **Auto-Provisioning** | Automatic OpenClaw deployment on shared Hetzner VM |
| **1-Day Free Trial** | 24 hours OR 50 messages (whichever comes first), no credit card required |
| **Trial Usage Tracking** | Real-time message count displayed in dashboard with upgrade prompts |
| **Subscription Payment** | Stripe Checkout for $19/month with automatic renewal |
| **Basic Dashboard** | View instance status, Telegram bot info, subscription status |
| **Instance Management** | Start/stop/restart OpenClaw instance |
| **Single Instance** | 1 OpenClaw instance per user (multi-instance coming soon) |
| **AI Model Selection** | Kimi K2.5 as default (Claude, ChatGPT coming soon) |

### 4.2 Trial Limits

| Limit | Value | Rationale |
|-------|-------|-----------|
| **Time Limit** | 24 hours | Enough time to test, creates urgency |
| **Message Limit** | 50 messages | Enough to experience value, prevents abuse |
| **Whichever First** | Time OR messages | Trial ends when either limit is reached |

**Trial Behavior:**
- Dashboard shows remaining messages: "42/50 messages remaining"
- Progress bar visualizes usage
- Warning at 10 messages remaining
- When limit reached: instance paused, upgrade prompt shown
- User can upgrade anytime during trial to remove limits

### 4.3 Messaging Platform Integration

| Platform | Status | Setup Method | Notes |
|----------|--------|--------------|-------|
| **Telegram** | MVP Default | BotFather token | Easiest setup, no approval needed |
| Discord | Coming Soon | Discord Bot OAuth | Requires Discord Developer Portal |
| WhatsApp | Coming Soon | WhatsApp Business API | Requires Meta Business verification |

**MVP Behavior:**
- All users connect via Telegram only
- Simple token-based setup (no OAuth flow needed)
- Future: Platform selector during onboarding

**Future Multi-Platform:**
- Users can connect multiple platforms to same instance
- Or different platforms per instance (multi-instance feature)
- Unified conversation history across platforms

### 4.4 AI Model Configuration

| Model | Status | Provider | Notes |
|-------|--------|----------|-------|
| **Kimi K2.5** | MVP Default | Moonshot AI | Cost-effective, strong reasoning |
| Claude | Coming Soon | Anthropic | Premium option |
| ChatGPT | Coming Soon | OpenAI | Premium option |

**MVP Behavior:**
- All users use Kimi K2.5 (no selection UI needed initially)
- Model is configured at instance deployment
- Future: Model selector in dashboard settings

### 4.5 Instance Limits

| Limit | MVP | Future |
|-------|-----|--------|
| **Instances per user** | 1 | Unlimited (pay per instance) |
| **Pricing** | $19/month | $19/month per instance |

**Future Multi-Instance:**
- Users can deploy multiple OpenClaw bots (different Telegram bots)
- Each instance = separate container, separate billing
- Dashboard shows list of instances
- Use cases: personal bot + work bot, different personas

### 4.6 Out of Scope (Post-MVP)

- Slack, Signal, iMessage integrations
- Custom domain support
- Dedicated VMs / higher tiers
- Team/organization accounts
- Custom skill marketplace
- API access
- White-labeling
- Mobile app
- Multiple instances per user
- Claude and ChatGPT model options
- Discord and WhatsApp integrations

---

## 5. Technical Architecture

### 5.1 Infrastructure

| Component | Specification |
|-----------|---------------|
| **VM Provider** | Hetzner Cloud |
| **VM Type** | CPX41 or equivalent (32GB RAM, 8 vCPU) |
| **Region** | US (Ashburn or Hillsboro) |
| **Users per VM** | Maximum 8 users |
| **RAM per User** | 4GB allocated |
| **Pricing** | $19/user/month |

### 5.2 Cost Analysis

| Item | Monthly Cost |
|------|--------------|
| Hetzner CPX41 (32GB) | ~$35-45/month |
| Kimi K2.5 API (estimated per user) | ~$2-5/month |
| Revenue (8 users × $19) | $152/month |
| **Gross Margin per VM** | ~$90-110/month (~60-72%) |

### 5.3 AI Model Configuration

| Model | API Provider | Status | Estimated Cost |
|-------|--------------|--------|----------------|
| **Kimi K2.5** | Moonshot AI | MVP Default | ~$0.002/1K tokens |
| Claude 3.5 Sonnet | Anthropic | Coming Soon | ~$0.003/1K tokens |
| GPT-4o | OpenAI | Coming Soon | ~$0.005/1K tokens |

**Environment Variables:**
```env
# MVP - Kimi K2.5 (Moonshot AI)
KIMI_API_KEY=sk-...
KIMI_API_BASE_URL=https://api.moonshot.cn/v1

# Future - Claude
ANTHROPIC_API_KEY=sk-ant-...

# Future - ChatGPT
OPENAI_API_KEY=sk-...
```

**Model Injection:**
- API key passed to OpenClaw container as environment variable
- OpenClaw configured to use OpenAI-compatible API endpoint
- Kimi K2.5 uses OpenAI-compatible API format

### 5.4 System Components

```
┌─────────────────────────────────────────────────────────────┐
│                        MyClaw Platform                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Next.js    │    │    Convex    │    │    Stripe    │  │
│  │   Frontend   │◄──►│   Backend    │◄──►│   Payments   │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                              │                               │
│                              ▼                               │
│                     ┌──────────────┐                        │
│                     │   Hetzner    │                        │
│                     │ Provisioner  │                        │
│                     └──────────────┘                        │
│                              │                               │
└──────────────────────────────┼───────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     Hetzner Cloud (US)                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Shared VM (32GB RAM)                    │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │   │
│  │  │OpenClaw │ │OpenClaw │ │OpenClaw │ │   ...   │   │   │
│  │  │ User 1  │ │ User 2  │ │ User 3  │ │  (8 max)│   │   │
│  │  │  4GB    │ │  4GB    │ │  4GB    │ │         │   │   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 5.5 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js (App Router), React, TypeScript, Tailwind CSS |
| Backend | Convex (database, real-time, serverless functions) |
| Auth | Better Auth (or Convex Auth) |
| Payments | Stripe (Checkout + Webhooks) |
| Provisioning | Hetzner Cloud API + SSH automation |
| Containerization | Docker (one container per user instance) |
| Reverse Proxy | Caddy or Nginx (on each VM) |

### 5.6 Stripe Integration Details

#### Products & Pricing

| Item | Stripe Object | Details |
|------|---------------|---------|
| **Product** | `prod_myclawPro` | "MyClaw Pro - Personal AI Assistant" |
| **Price** | `price_myclawMonthly` | $19/month, recurring, USD |

#### Stripe Components Used

| Component | Purpose |
|-----------|---------|
| **Stripe Checkout** | Hosted payment page (no PCI burden) |
| **Customer Portal** | Self-service subscription management |
| **Webhooks** | Real-time subscription status updates |
| **Billing Portal** | Invoice history, payment method updates |

#### Webhook Events to Handle

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Activate subscription, provision/unpause instance |
| `customer.subscription.updated` | Update subscription status in DB |
| `customer.subscription.deleted` | Mark as cancelled, schedule instance pause |
| `invoice.payment_succeeded` | Log payment, extend access |
| `invoice.payment_failed` | Send warning email, grace period starts |

#### Checkout Flow

```
User clicks "Subscribe" or "Upgrade"
         │
         ▼
┌─────────────────────────────┐
│  Create Checkout Session    │
│  (Convex Action)            │
│  - customer email           │
│  - price_id                 │
│  - success_url              │
│  - cancel_url               │
│  - metadata: { userId }     │
└─────────────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│   Redirect to Stripe        │
│   Checkout Page             │
└─────────────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│   User enters payment       │
│   (Stripe handles PCI)      │
└─────────────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│   Webhook: checkout.session │
│   .completed                │
│   - Extract userId          │
│   - Save stripeCustomerId   │
│   - Save subscriptionId     │
│   - Set status: "active"    │
│   - Unpause instance        │
└─────────────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│   Redirect to success_url   │
│   (/dashboard?upgraded=1)   │
└─────────────────────────────┘
```

#### Environment Variables Required

```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRICE_ID=price_...
```

---

## 6. User Flows

### 6.1 Signup & Trial Flow

```
1. User lands on homepage
2. Clicks "Start Free Trial"
3. Creates account (email/password)
4. Verifies email
5. Guided Telegram setup:
   a. User creates bot via @BotFather
   b. User provides bot token
   c. System validates token
6. System provisions OpenClaw instance
7. User starts chatting with their bot
8. Trial begins:
   - 24-hour countdown starts
   - 50 message limit initialized
   - Dashboard shows: "50 messages remaining | 23:59:59 left"
```

### 6.2 Trial Limit Flow

```
During Trial:
1. Each message to bot increments messageCount
2. OpenClaw container reports usage via webhook/API
3. Convex updates user's trialMessagesUsed
4. Dashboard updates in real-time (Convex reactivity)

At 40 messages (10 remaining):
1. Dashboard shows warning: "Only 10 messages left!"
2. In-bot message: "You have 10 messages remaining. Upgrade to continue."

At 50 messages OR 24 hours (whichever first):
1. Instance is paused (container stopped)
2. Bot responds: "Trial ended. Visit dashboard to upgrade."
3. Dashboard shows: "Trial ended - Upgrade to continue"
4. User redirected to upgrade prompt

On Upgrade:
1. Stripe Checkout completed
2. Webhook triggers instance unpause
3. Message limit removed
4. Full access granted
```

### 6.3 Subscription Flow (Stripe Checkout)

```
1. Trial expires OR user clicks "Subscribe"/"Upgrade"
2. Frontend calls subscriptions.createCheckoutSession
3. Convex action creates Stripe Checkout Session:
   - customer_email: user's email
   - price: $19/month recurring
   - metadata: { userId, instanceId }
   - success_url: /dashboard?upgraded=1
   - cancel_url: /dashboard/billing
4. User redirected to Stripe Checkout page
5. User enters card details (Stripe handles PCI)
6. On successful payment:
   a. Stripe sends checkout.session.completed webhook
   b. Convex webhook handler:
      - Saves stripeCustomerId to user
      - Saves stripeSubscriptionId to user
      - Sets subscriptionStatus to "active"
      - Unpauses instance (starts container)
   c. User redirected to success_url
7. On failed payment or cancel:
   a. User redirected to cancel_url
   b. No changes to subscription status
   c. Trial continues (if not expired)

Subscription Lifecycle:
- Active: Instance running, no limits
- Past Due: 3-day grace period, warning emails
- Cancelled: Instance paused, data retained 7 days
- Expired: Data deleted after retention period
```

### 6.4 Provisioning Flow (Backend)

```
1. New user completes Telegram setup
2. System checks available VMs with capacity
3. If no capacity: provision new Hetzner VM
4. Deploy OpenClaw container for user:
   a. Pull latest OpenClaw image
   b. Configure with user's Telegram token
   c. Set memory limit (4GB)
   d. Start container
5. Store instance details in Convex
6. Mark user as "active"
```

---

## 7. Data Models

### 7.1 Users Table

| Field | Type | Description |
|-------|------|-------------|
| `_id` | ID | Convex auto-generated |
| `email` | string | User email (unique) |
| `passwordHash` | string | Hashed password |
| `emailVerified` | boolean | Email verification status |
| `createdAt` | number | Registration timestamp |
| `trialEndsAt` | number | Trial expiration timestamp (24 hours from start) |
| `trialMessagesUsed` | number | Messages sent during trial (default: 0) |
| `trialMessageLimit` | number | Max trial messages (default: 50) |
| `subscriptionStatus` | string | `trial` \| `active` \| `past_due` \| `cancelled` \| `expired` |
| `stripeCustomerId` | string? | Stripe customer ID |
| `stripeSubscriptionId` | string? | Stripe subscription ID |
| `stripePriceId` | string? | Current price ID for plan |
| `currentPeriodEnd` | number? | Subscription period end timestamp |

### 7.2 Instances Table

| Field | Type | Description |
|-------|------|-------------|
| `_id` | ID | Convex auto-generated |
| `userId` | ID | Reference to user |
| `vmId` | ID | Reference to VM |
| `containerId` | string | Docker container ID |
| `status` | string | `provisioning` \| `running` \| `stopped` \| `error` |
| `aiModel` | string | `kimi-k2.5` \| `claude-sonnet` \| `gpt-4o` (default: `kimi-k2.5`) |
| `platform` | string | `telegram` \| `discord` \| `whatsapp` (default: `telegram`) |
| `telegramBotToken` | string? | Encrypted Telegram bot token |
| `telegramBotUsername` | string? | Telegram bot username |
| `discordBotToken` | string? | Encrypted Discord bot token (future) |
| `whatsappPhoneId` | string? | WhatsApp Business phone ID (future) |
| `instanceName` | string? | User-defined name (for future multi-instance) |
| `createdAt` | number | Timestamp |
| `lastActiveAt` | number | Last activity timestamp |

### 7.3 VMs Table

| Field | Type | Description |
|-------|------|-------------|
| `_id` | ID | Convex auto-generated |
| `hetznerId` | string | Hetzner server ID |
| `ipAddress` | string | Public IP |
| `region` | string | `us-east` \| `us-west` |
| `status` | string | `provisioning` \| `active` \| `full` \| `maintenance` |
| `capacity` | number | Max users (8) |
| `currentUsers` | number | Current user count |
| `createdAt` | number | Timestamp |

---

## 8. API Endpoints (Convex Functions)

### 8.1 Auth

| Function | Type | Description |
|----------|------|-------------|
| `auth.register` | mutation | Create new user account |
| `auth.login` | mutation | Authenticate user |
| `auth.verifyEmail` | mutation | Verify email token |
| `auth.getCurrentUser` | query | Get logged-in user |

### 8.2 Instances

| Function | Type | Description |
|----------|------|-------------|
| `instances.create` | mutation | Provision new OpenClaw instance |
| `instances.get` | query | Get user's instance details |
| `instances.restart` | mutation | Restart user's instance |
| `instances.updateTelegramToken` | mutation | Update bot token |

### 8.3 Usage Tracking

| Function | Type | Description |
|----------|------|-------------|
| `usage.incrementMessageCount` | mutation | Called when user sends message (from OpenClaw webhook) |
| `usage.getTrialStatus` | query | Get remaining messages and time |
| `usage.checkTrialLimits` | query | Check if trial limits exceeded |

### 8.4 Subscriptions (Stripe)

| Function | Type | Description |
|----------|------|-------------|
| `subscriptions.createCheckoutSession` | action | Create Stripe Checkout session, return URL |
| `subscriptions.createPortalSession` | action | Create Stripe Customer Portal session |
| `subscriptions.handleWebhook` | action | Process Stripe webhook events |
| `subscriptions.cancel` | mutation | Cancel subscription at period end |
| `subscriptions.getStatus` | query | Get subscription status and details |

### 8.5 Admin (Internal)

| Function | Type | Description |
|----------|------|-------------|
| `admin.provisionVM` | action | Create new Hetzner VM |
| `admin.deployInstance` | action | Deploy OpenClaw container |
| `admin.pauseInstance` | action | Pause instance (trial expired/cancelled) |
| `admin.unpauseInstance` | action | Unpause instance (payment received) |
| `admin.cleanupExpiredTrials` | action | Cron: check and pause expired trials |
| `admin.checkTrialMessages` | action | Cron: check and pause over-limit trials |

---

## 9. Pages & UI

### 9.1 Public Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Hero, features, pricing, CTA |
| Login | `/login` | Email/password login |
| Register | `/register` | Signup form |
| Verify Email | `/verify-email` | Email verification |

### 9.2 Dashboard Pages (Authenticated)

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/dashboard` | Instance status, trial usage, quick actions |
| Setup | `/dashboard/setup` | Telegram bot setup wizard |
| Settings | `/dashboard/settings` | Account settings |
| Billing | `/dashboard/billing` | Stripe portal link, subscription status, upgrade CTA |

### 9.3 Dashboard UI Components

**Trial Status Card (shown during trial):**
```
┌─────────────────────────────────────────────┐
│  Trial Status                               │
├─────────────────────────────────────────────┤
│                                             │
│  Messages: 32/50 used                       │
│  [████████████░░░░░░] 64%                   │
│                                             │
│  Time remaining: 18:42:33                   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │      Upgrade to Pro - $19/mo        │   │
│  │      Unlimited messages             │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

**Trial Expired Modal:**
```
┌─────────────────────────────────────────────┐
│  ⏰ Trial Ended                             │
├─────────────────────────────────────────────┤
│                                             │
│  You've used all 50 trial messages.         │
│                                             │
│  Upgrade now to continue using your         │
│  personal AI assistant with unlimited       │
│  messages.                                  │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │     Upgrade to Pro - $19/month      │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 10. Success Metrics (MVP)

| Metric | Target |
|--------|--------|
| Signup to Trial | > 50% conversion |
| Trial to Paid | > 10% conversion |
| Time to First Message | < 10 minutes |
| Provisioning Time | < 3 minutes |
| Uptime | > 99% |
| Churn Rate | < 10% monthly |

---

## 11. Message Tracking Architecture

### How Messages Are Counted

```
User sends message to Telegram Bot
         │
         ▼
┌─────────────────────────────┐
│   Telegram delivers to      │
│   OpenClaw container        │
└─────────────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│   OpenClaw processes msg    │
│   (before responding)       │
└─────────────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│   Webhook to MyClaw API     │
│   POST /api/usage/message   │
│   { instanceId, timestamp } │
└─────────────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│   Convex mutation:          │
│   usage.incrementMessage    │
│   - Check if trial user     │
│   - Increment counter       │
│   - Check if limit reached  │
│   - If over: pause instance │
└─────────────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│   Dashboard updates         │
│   (real-time via Convex)    │
└─────────────────────────────┘
```

### Implementation Options

| Option | Pros | Cons |
|--------|------|------|
| **OpenClaw Webhook** | Real-time, accurate | Requires OpenClaw modification/skill |
| **Telegram Bot API Polling** | No OpenClaw changes | Delayed, complex |
| **Container Log Parsing** | Non-invasive | Unreliable, delayed |

**Recommended**: OpenClaw skill/webhook that fires on each user message.

### Rate Limiting Considerations

- Webhook endpoint rate limited per instance
- Idempotency key to prevent double-counting
- Grace buffer: pause at 52 messages (2 buffer) to handle race conditions

---

## 12. Security Considerations

| Area | Approach |
|------|----------|
| **Authentication** | Secure password hashing (bcrypt/argon2), email verification |
| **Telegram Tokens** | Encrypted at rest, never exposed to frontend |
| **VM Access** | SSH key-based auth only, no root password |
| **Container Isolation** | Docker resource limits, network isolation |
| **Payments** | Stripe handles all card data (PCI compliant) |
| **Data Privacy** | User data isolated per container |

---

## 13. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Hetzner API rate limits | Medium | High | Implement queuing, batch operations |
| Container escape | Low | Critical | Keep Docker updated, use security profiles |
| Abuse/spam via bots | Medium | Medium | Monitor usage, implement rate limits |
| OpenClaw breaking changes | Medium | High | Pin versions, staged rollouts |
| Trial abuse | High | Low | Email verification, IP tracking, 50 message limit |

---

## 14. MVP Timeline (Rough Phases)

### Phase 1: Foundation
- [ ] Project setup (Next.js + Convex)
- [ ] User auth (register, login, email verification)
- [ ] Basic dashboard layout
- [ ] Landing page

### Phase 2: Core Infrastructure
- [ ] Hetzner API integration
- [ ] VM provisioning automation
- [ ] Docker deployment scripts
- [ ] OpenClaw container setup

### Phase 3: User Features
- [ ] Telegram bot setup wizard
- [ ] Instance status monitoring
- [ ] Start/stop/restart controls
- [ ] Real-time status updates

### Phase 4: Billing & Usage
- [ ] Stripe product/price setup
- [ ] Checkout session creation
- [ ] Webhook endpoint & handlers
- [ ] Customer portal integration
- [ ] Trial message tracking
- [ ] Trial expiration logic (time + messages)
- [ ] Instance pause/unpause on status change

### Phase 5: Polish & Launch
- [ ] Error handling & edge cases
- [ ] Email notifications
- [ ] Documentation / FAQ
- [ ] Beta testing
- [ ] Launch

---

## 15. Open Questions

1. **OpenClaw Licensing**: Confirm OpenClaw's license allows commercial hosting
2. **Support Model**: How will user support be handled? (Email, Discord, self-service?)
3. **Backup Strategy**: Should user data/memory be backed up? How often?
4. **Multi-region**: Start US-only, but should we plan for EU expansion?
5. **Kimi K2.5 Rate Limits**: What are the API rate limits? Need to handle per-user throttling?
6. **Multi-Instance Pricing**: When adding multiple instances, same price per instance or volume discount?
7. **Model Switching**: When Claude/GPT added, can users switch models mid-subscription? Data migration?

---

## 16. Glossary

| Term | Definition |
|------|------------|
| **OpenClaw** | Open-source personal AI assistant that runs on your machine |
| **BotFather** | Telegram's official bot for creating and managing Telegram bots |
| **Discord Bot** | Automated bot that connects to Discord servers via OAuth (coming soon) |
| **WhatsApp Business API** | Meta's API for business messaging on WhatsApp (coming soon) |
| **Hetzner** | German cloud provider with affordable VPS offerings |
| **Convex** | Backend-as-a-service with real-time database |
| **Kimi K2.5** | Large language model by Moonshot AI, OpenAI-compatible API |
| **Moonshot AI** | Chinese AI company that provides the Kimi series of language models |
| **Stripe** | Payment processing platform for subscriptions and one-time payments |
| **Stripe Checkout** | Hosted payment page that handles card collection (PCI compliant) |
| **Webhook** | HTTP callback that notifies your server of events (e.g., payment success) |
| **Provisioning** | Automated process of setting up server infrastructure |

---

## Appendix A: Competitor Analysis

| Competitor | Pricing | Differentiator |
|------------|---------|----------------|
| Self-hosted OpenClaw | Free (+ server costs) | Full control, requires technical skill |
| Generic VPS + setup | ~$20-50/month | Manual setup required |
| **MyClaw (Us)** | $19/month | Zero-config, instant setup |

---

*Document End*
