import { pgTable, serial, integer } from "drizzle-orm/pg-core";

export const friendRequestsTable = pgTable("friend_requests", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull(),
  receiverId: integer("receiver_id").notNull(),
});

export type InsertFriendRequest = typeof friendRequestsTable.$inferInsert;
export type SelectFriendRequest = typeof friendRequestsTable.$inferSelect;
