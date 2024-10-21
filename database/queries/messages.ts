// Queries to fetch messages from the database

import { supabase } from "@/utils/supabase";
import { InsertMessage } from "../schemas/messages";

// Todo: Function to create a message
// this function should take in user Id, room id, original message, translated message
// languages of the original and the translated message
// Need to also link this query with an api function to get the message translations
export const createMessage = async (message: InsertMessage) => {
  const { error } = await supabase.from("messages").insert({
    room_id: message.roomId,
    sender_id: message.senderId,
    original_message: message.originalMessage,
    original_message_language: message.originalMessageLanguage,
    translated_message: message.translatedMessage,
    translated_message_language: message.translatedMessageLanguage,
  });

  if (error) {
    console.log("🚀 ~ createMessage ~ error:", error.message);
    throw new Error("Error creating message");
  }
};

// Todo: Function to get messages by conversation ID
// The function should take in a conversation Id and return a list of messages with the following room ID
// The messages should be ordered by timestamp in descending order
