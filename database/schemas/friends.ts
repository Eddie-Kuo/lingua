import { pgTable, serial, integer } from "drizzle-orm/pg-core";

export const friendsTable = pgTable("friends", {
  id: serial("id").primaryKey(),
  myUserId: integer("my_user_id").notNull(),
  friendUserId: integer("friend_user_id").notNull(),
});

export type InsertFriend = typeof friendsTable.$inferInsert;
export type SelectFriend = typeof friendsTable.$inferSelect;
