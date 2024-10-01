import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const friendRequestsTable = pgTable("friend_requests", {
  id: serial("id").primaryKey(),
  senderId: text("sender_id").notNull(),
  receiverId: text("receiver_id").notNull(),
});

export type InsertFriendRequest = typeof friendRequestsTable.$inferInsert;
export type SelectFriendRequest = typeof friendRequestsTable.$inferSelect;
