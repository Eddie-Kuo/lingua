import { pgTable, integer, text, serial } from "drizzle-orm/pg-core";

export const conversationsTable = pgTable("conversations", {
  id: serial("id").primaryKey(),
  roomId: text("room_id").notNull(),
  myUserId: integer("my_user_id").notNull(),
  friendUserId: integer("friend_user_id").notNull(),
});

export type InsertConversation = typeof conversationsTable.$inferInsert;
export type SelectConversation = typeof conversationsTable.$inferSelect;
