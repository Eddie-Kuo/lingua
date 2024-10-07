import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const messagesTable = pgTable("messages", {
  id: serial("id").primaryKey(),
  roomId: text("room_id").notNull(),
  senderId: integer("sender_id").notNull(),
  originalMessage: text("original_message").notNull(),
  originalMessageLanguage: text("original_message_language").notNull(),
  translatedMessage: text("translated_message").notNull(),
  translatedMessageLanguage: text("translated_message_language").notNull(),
  timeStamp: timestamp("timestamp").notNull().defaultNow(),
});

export type InsertMessage = typeof messagesTable.$inferInsert;
export type SelectMessage = typeof messagesTable.$inferSelect;
