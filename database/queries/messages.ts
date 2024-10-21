// Queries to fetch messages from the database

import { Message } from "@/types/conversation";
import { supabase } from "@/utils/supabase";

// Todo: Function to create a message
// this function should take in user Id, room id, original message, translated message
// languages of the original and the translated message
// Need to also link this query with an api function to get the message translations
export const createMessage = async (message: Message) => {
  const { error } = await supabase.from("messages").insert({
    room_id: message.room_id,
    sender_id: message.sender_id,
    original_message: message.original_message,
    original_message_language: message.original_message_language,
    translated_message: message.translated_message,
    translated_message_language: message.translated_message_language,
  });

  if (error) {
    console.log("🚀 ~ createMessage ~ error:", error.message);
    throw new Error("Error creating message");
  }
};

// Todo: Function to get messages by conversation ID
// The function should take in a conversation Id and return a list of messages with the following room ID
// The messages should be ordered by timestamp in descending order
