ALTER TABLE "users_table" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_table_phone_number_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_table_username_unique";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");