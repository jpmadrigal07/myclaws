import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  // Example table - modify or replace with your own tables
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),
});
