import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  myUserId: text("my_user_id").notNull(),
  friendUserId: text("friend_user_id").notNull(),
});
