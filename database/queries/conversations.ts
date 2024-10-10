import { supabase } from "@/utils/supabase";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

export const getConversationByUserId = async (
  userId: number,
): Promise<string> => {
  const { data, error } = await supabase
    .from("conversations")
    .select()
    .eq("my_user_id", userId);

  if (error) {
    throw new Error("Error getting conversation by userId");
  }

  return data[0].room_id;
};

export const createConversation = async (
  userId: number,
  friendId: number,
): Promise<string> => {
  // create 2 conversation records with the same uuid
  const conversationId = nanoid(10);
  const { error } = await supabase.from("conversations").insert([
    {
      room_id: conversationId,
      my_user_id: userId,
      friend_user_id: friendId,
    },
    {
      room_id: conversationId,
      my_user_id: friendId,
      friend_user_id: userId,
    },
  ]);

  if (error) {
    throw new Error("Error creating conversation: " + error.message);
  }

  return conversationId;
};
