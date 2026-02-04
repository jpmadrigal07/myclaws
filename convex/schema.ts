import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  // Users table - extended profile data (auth data is in better-auth tables)
  users: defineTable({
    // Reference to better-auth user id
    authUserId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    // Trial fields
    trialEndsAt: v.optional(v.number()), // Trial expiration timestamp (24 hours from start)
    trialMessagesUsed: v.number(), // Messages sent during trial (default: 0)
    trialMessageLimit: v.number(), // Max trial messages (default: 50)
    // Subscription fields
    subscriptionStatus: v.union(
      v.literal('trial'),
      v.literal('active'),
      v.literal('past_due'),
      v.literal('cancelled'),
      v.literal('expired')
    ),
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    stripePriceId: v.optional(v.string()),
    currentPeriodEnd: v.optional(v.number()),
    // Timestamps
    createdAt: v.number(),
  })
    .index('by_authUserId', ['authUserId'])
    .index('by_email', ['email']),

  // Instances table - OpenClaw instances
  instances: defineTable({
    userId: v.id('users'),
    vmId: v.optional(v.id('vms')),
    containerId: v.optional(v.string()), // Docker container ID
    status: v.union(
      v.literal('pending_setup'), // Waiting for Telegram setup
      v.literal('provisioning'),
      v.literal('running'),
      v.literal('stopped'),
      v.literal('error')
    ),
    // AI Model
    aiModel: v.union(
      v.literal('kimi-k2.5'),
      v.literal('claude-sonnet'),
      v.literal('gpt-4o')
    ),
    // Platform
    platform: v.union(
      v.literal('telegram'),
      v.literal('discord'),
      v.literal('whatsapp')
    ),
    // Telegram config
    telegramBotToken: v.optional(v.string()), // Encrypted
    telegramBotUsername: v.optional(v.string()),
    // Future platforms (not used in MVP)
    discordBotToken: v.optional(v.string()),
    whatsappPhoneId: v.optional(v.string()),
    // Metadata
    instanceName: v.optional(v.string()),
    createdAt: v.number(),
    lastActiveAt: v.optional(v.number()),
  }).index('by_userId', ['userId']),

  // VMs table - Hetzner VMs
  vms: defineTable({
    hetznerId: v.string(), // Hetzner server ID
    ipAddress: v.string(),
    region: v.union(v.literal('us-east'), v.literal('us-west')),
    status: v.union(
      v.literal('provisioning'),
      v.literal('active'),
      v.literal('full'),
      v.literal('maintenance')
    ),
    capacity: v.number(), // Max users (8)
    currentUsers: v.number(), // Current user count
    createdAt: v.number(),
  }).index('by_status', ['status']),
});
