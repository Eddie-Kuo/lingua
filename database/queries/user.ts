import { supabase } from "@/utils/supabase";
import { UserInfo } from "@/utils/types/user";
import { InsertUser, SelectUser } from "../schemas/users";

// Get user by user ID
export const getUserByPhoneNumber = async (
  phoneNumber: SelectUser["phoneNumber"],
): Promise<UserInfo> => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("phone_number", phoneNumber);

  console.log("data", data);

  if (error) {
    throw new Error("Error getting user by phone number");
  }
  return data[0];
};

// Add user to database
export const createUser = async (user: InsertUser) => {
  const { error } = await supabase.from("users").insert({
    phone_number: user.phoneNumber,
    first_name: user.firstName,
    last_name: user.lastName,
    pic_url: user.picURL,
    selected_language: user.selectedLanguage,
  });

  if (error) {
    console.log("🚀 ~ createUser ~ error:", error.message);
    return { error: error.message };
  }
};
