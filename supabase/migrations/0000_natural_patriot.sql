CREATE TABLE IF NOT EXISTS "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"phone_number" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"pic_url" text,
	"username" text,
	"selectedLanguage" text NOT NULL,
	CONSTRAINT "users_table_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "users_table_username_unique" UNIQUE("username")
);
