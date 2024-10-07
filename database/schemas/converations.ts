import { pgTable, integer, text } from "drizzle-orm/pg-core";

export const conversationsTable = pgTable("conversations", {
  roomId: text("room_id").notNull(),
  myUserId: integer("my_user_id").notNull(),
  friendUserId: integer("friend_user_id").notNull(),
});

export type InsertConversation = typeof conversationsTable.$inferInsert;
export type SelectConversation = typeof conversationsTable.$inferSelect;
