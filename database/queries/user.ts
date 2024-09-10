import { UserInfo } from "@/app/(auth)/(onboarding)/signup";
import { supabase } from "@/utils/supabase";

//? Getting this error when making queries with Drizzle ORM - using Supabase queries instead
//! "The package at "node_modules/dotenv/lib/main.js" attempted to import the Node standard library module "path".
//! It failed because the native React runtime does not include the Node standard library."

// Get user by user ID
export const getUserByPhoneNumber = async (phoneNumber: string) => {
  // const formattedPhoneNumber = phoneNumber.slice(0); // remove the +
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("phone_number", phoneNumber);

    if (error) {
      return new Error("Error getting user by phone number");
    }

    return data[0];
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error getting user by phone number: ", error.message);
    }
  }
};

// Add user to database
export const createUser = async (user: UserInfo) => {
  const { error } = await supabase.from("users").insert({
    phone_number: user.phoneNumber,
    first_name: user.firstName,
    last_name: user.lastName,
    pic_url: "",
    selected_language: user.selectedLanguage,
  });

  if (error) {
    console.log("🚀 ~ createUser ~ error:", error.message);
    return { error: error.message };
  }
};
