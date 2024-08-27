import { supabase } from "@/utils/supabase";

//? Getting this error when making queries with Drizzle ORM - using Supabase queries instead
//! "The package at "node_modules/dotenv/lib/main.js" attempted to import the Node standard library module "path".
//! It failed because the native React runtime does not include the Node standard library."

// Get user by user ID
export const getUserByPhoneNumber = async (phoneNumber: string) => {
  if (!phoneNumber) {
    return { error: "Invalid input, no phoneNumber" };
  }

  try {
    const data = await supabase
      .from("users")
      .select()
      .eq("phone_number", phoneNumber);

    if (data.count === null) {
      return { error: "Phone number not in database" };
    }

    return { success: data.data[0] };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error getting user by phone number: ", error.message);
    }
  }
};
