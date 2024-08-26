import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  schema: "./database/schemas/users.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL!,
  },
});
