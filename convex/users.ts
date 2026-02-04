import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { authComponent } from './auth';

// Get or create user profile after authentication
export const getOrCreateUser = mutation({
  args: {},
  handler: async (ctx) => {
    const authUser = await authComponent.getAuthUser(ctx);
    if (!authUser) {
      return null;
    }

    // The auth user ID from better-auth/convex is stored as `_id`
    const authUserId = authUser._id;

    // Check if user profile already exists
    const existingUser = await ctx.db
      .query('users')
      .withIndex('by_authUserId', (q) => q.eq('authUserId', authUserId))
      .first();

    if (existingUser) {
      return existingUser;
    }

    // Create new user profile with trial status
    const now = Date.now();
    const trialEndsAt = now + 24 * 60 * 60 * 1000; // 24 hours from now

    const userId = await ctx.db.insert('users', {
      authUserId,
      email: authUser.email,
      name: authUser.name ?? undefined,
      image: authUser.image ?? undefined,
      trialEndsAt,
      trialMessagesUsed: 0,
      trialMessageLimit: 50,
      subscriptionStatus: 'trial',
      createdAt: now,
    });

    return await ctx.db.get(userId);
  },
});

// Get current user profile
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const authUser = await authComponent.getAuthUser(ctx);
    if (!authUser) {
      return null;
    }

    return await ctx.db
      .query('users')
      .withIndex('by_authUserId', (q) => q.eq('authUserId', authUser._id))
      .first();
  },
});

// Get trial status for current user
export const getTrialStatus = query({
  args: {},
  handler: async (ctx) => {
    const authUser = await authComponent.getAuthUser(ctx);
    if (!authUser) {
      return null;
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_authUserId', (q) => q.eq('authUserId', authUser._id))
      .first();

    if (!user) {
      return null;
    }

    const now = Date.now();
    const timeRemaining = user.trialEndsAt ? Math.max(0, user.trialEndsAt - now) : 0;
    const messagesRemaining = Math.max(0, user.trialMessageLimit - user.trialMessagesUsed);
    const isTrialExpired =
      user.subscriptionStatus === 'trial' &&
      (timeRemaining === 0 || messagesRemaining === 0);

    return {
      subscriptionStatus: user.subscriptionStatus,
      trialEndsAt: user.trialEndsAt,
      trialMessagesUsed: user.trialMessagesUsed,
      trialMessageLimit: user.trialMessageLimit,
      timeRemaining,
      messagesRemaining,
      isTrialExpired,
      isActive: user.subscriptionStatus === 'active',
    };
  },
});

// Update user profile
export const updateUser = mutation({
  args: {
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const authUser = await authComponent.getAuthUser(ctx);
    if (!authUser) {
      throw new Error('Not authenticated');
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_authUserId', (q) => q.eq('authUserId', authUser._id))
      .first();

    if (!user) {
      throw new Error('User not found');
    }

    await ctx.db.patch(user._id, {
      name: args.name,
    });

    return await ctx.db.get(user._id);
  },
});
