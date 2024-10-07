import { supabase } from "@/utils/supabase";
import { UserInfo } from "@/utils/types/user";
import { InsertUser, SelectUser } from "../schemas/users";

// Get user by user phoneNumber
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

export const getFriendsList = async (
  userId: string,
): Promise<{ friend_user_id: string }[]> => {
  const { data, error } = await supabase
    .from("friends")
    .select("friend_user_id")
    .eq("my_user_id", userId);

  if (error) {
    throw new Error("Error getting friends list");
  }
  return data;
};

export const getUserById = async (
  userId: SelectUser["id"],
): Promise<UserInfo> => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", userId);

  if (error) {
    throw new Error("Error getting user by phone number");
  }
  return data[0];
};
