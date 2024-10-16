export type Conversation = {
  room_id: string;
  my_user_id: number;
  friend_user_id: number;
};

export type Message = {
  id: number;
  room_id: string;
  sender_id: number;
  original_message: string;
  original_message_language: "English" | "Spanish" | "Mandarin";
  translated_message: string;
  translated_message_language: "English" | "Spanish" | "Mandarin";
  timestamp: string;
};
