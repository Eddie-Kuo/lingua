import { pgTable, serial, text } from "drizzle-orm/pg-core";


export const friendsTable = pgTable("friends", {
  id: serial("id").primaryKey(),
  myUserId: text("my_user_id").notNull(),
  friendUserId: text("friend_user_id").notNull(),
});

export type InsertFriend = typeof friendsTable.$inferInsert;
export type SelectFriend = typeof friendsTable.$inferSelect;

