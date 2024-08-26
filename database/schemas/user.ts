import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users_table", {
  id: serial("id").primaryKey(),
  phoneNumber: text("phone_number").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  picURL: text("pic_url"),
  username: text("username").unique(),
  selectedLanguage: text("selectedLanguage").notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;