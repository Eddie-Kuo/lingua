import { selectNewImage } from "@/utils/avatarImage";
import { supabase } from "@/utils/supabase";
import { SelectFriendRequest } from "../schemas/friend_requests";

export const checkForFriendRequest = async (
  userId: SelectFriendRequest["senderId"],
  receiverId: SelectFriendRequest["receiverId"],
): Promise<SelectFriendRequest> => {
  const { data, error } = await supabase
    .from("friend_requests")
    .select()
    .eq("sender_id", userId)
    .eq("receiver_id", receiverId);

  if (error) {
    console.log("🚀 ~ error:", error);
    throw new Error("Error checking for friend request");
  }

  return data[0];
};

export const createFriendRequest = async (
  senderId: SelectFriendRequest["senderId"],
  receiverId: SelectFriendRequest["receiverId"],
) => {
  const { data, error } = await supabase
    .from("friend_requests")
    .insert({ sender_id: senderId, receiver_id: receiverId })
    .select();

  if (error) {
    throw new Error("Error creating friend request");
  }
  return data[0].id;
};
