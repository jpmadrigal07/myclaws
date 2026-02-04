import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { authComponent } from './auth';

// Get user's instance
export const getUserInstance = query({
  args: {},
  handler: async (ctx) => {
    const authUser = await authComponent.getAuthUser(ctx);
    if (!authUser) {
      return null;
    }

    // Get user profile
    const user = await ctx.db
      .query('users')
      .withIndex('by_authUserId', (q) => q.eq('authUserId', authUser._id))
      .first();

    if (!user) {
      return null;
    }

    // Get user's instance
    return await ctx.db
      .query('instances')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .first();
  },
});

// Create a new instance (pending setup)
export const createInstance = mutation({
  args: {},
  handler: async (ctx) => {
    const authUser = await authComponent.getAuthUser(ctx);
    if (!authUser) {
      throw new Error('Not authenticated');
    }

    // Get user profile
    const user = await ctx.db
      .query('users')
      .withIndex('by_authUserId', (q) => q.eq('authUserId', authUser._id))
      .first();

    if (!user) {
      throw new Error('User profile not found');
    }

    // Check if user already has an instance
    const existingInstance = await ctx.db
      .query('instances')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .first();

    if (existingInstance) {
      return existingInstance;
    }

    // Create new instance in pending_setup status
    const instanceId = await ctx.db.insert('instances', {
      userId: user._id,
      status: 'pending_setup',
      aiModel: 'kimi-k2.5', // MVP default
      platform: 'telegram', // MVP default
      createdAt: Date.now(),
    });

    return await ctx.db.get(instanceId);
  },
});

// Setup Telegram bot for instance
export const setupTelegramBot = mutation({
  args: {
    botToken: v.string(),
    botUsername: v.string(),
  },
  handler: async (ctx, args) => {
    const authUser = await authComponent.getAuthUser(ctx);
    if (!authUser) {
      throw new Error('Not authenticated');
    }

    // Get user profile
    const user = await ctx.db
      .query('users')
      .withIndex('by_authUserId', (q) => q.eq('authUserId', authUser._id))
      .first();

    if (!user) {
      throw new Error('User profile not found');
    }

    // Get user's instance
    const instance = await ctx.db
      .query('instances')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .first();

    if (!instance) {
      throw new Error('Instance not found');
    }

    // Update instance with Telegram config
    // In production, you would encrypt the bot token before storing
    await ctx.db.patch(instance._id, {
      telegramBotToken: args.botToken,
      telegramBotUsername: args.botUsername,
      status: 'provisioning', // Will be changed to 'running' after actual provisioning
    });

    // TODO: Trigger actual provisioning via Convex action
    // For MVP, we'll simulate provisioning completion after a delay
    // In production, this would call the Hetzner API

    return await ctx.db.get(instance._id);
  },
});

// Update instance status (for internal/admin use)
export const updateInstanceStatus = mutation({
  args: {
    instanceId: v.id('instances'),
    status: v.union(
      v.literal('pending_setup'),
      v.literal('provisioning'),
      v.literal('running'),
      v.literal('stopped'),
      v.literal('error')
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.instanceId, {
      status: args.status,
      lastActiveAt: Date.now(),
    });

    return await ctx.db.get(args.instanceId);
  },
});

// Restart instance
export const restartInstance = mutation({
  args: {},
  handler: async (ctx) => {
    const authUser = await authComponent.getAuthUser(ctx);
    if (!authUser) {
      throw new Error('Not authenticated');
    }

    // Get user profile
    const user = await ctx.db
      .query('users')
      .withIndex('by_authUserId', (q) => q.eq('authUserId', authUser._id))
      .first();

    if (!user) {
      throw new Error('User profile not found');
    }

    // Get user's instance
    const instance = await ctx.db
      .query('instances')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .first();

    if (!instance) {
      throw new Error('Instance not found');
    }

    // TODO: Actually restart the container via SSH/Docker API
    // For now, just update the lastActiveAt
    await ctx.db.patch(instance._id, {
      lastActiveAt: Date.now(),
    });

    return await ctx.db.get(instance._id);
  },
});
