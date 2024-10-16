import { supabase } from "@/utils/supabase";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { Conversation } from "@/types/conversation";

export const getConversationByUserId = async (
  userId: number,
  friendId: number,
): Promise<Conversation> => {
  const { data, error } = await supabase
    .from("conversations")
    .select()
    .eq("my_user_id", userId)
    .eq("friend_user_id", friendId);

  if (error) {
    throw new Error("Error getting conversation by userId");
  }

  return data[0];
};

export const createConversation = async (
  userId: number,
  friendId: number,
): Promise<Conversation> => {
  // create 2 conversation records with the same uuid
  const conversationId = nanoid(10);
  const { data, error } = await supabase
    .from("conversations")
    .insert([
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
    ])
    .select();

  if (error) {
    throw new Error("Error creating conversation: " + error.message);
  }

  return data[0];
};

export const getConversationByConversationId = async (
  conversationId: string,
): Promise<Conversation> => {
  const { data, error } = await supabase
    .from("conversations")
    .select()
    .eq("room_id", conversationId);

  if (error) {
    throw new Error("Error getting conversation by conversationId");
  }

  return data[0];
};
