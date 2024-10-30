import { Language, UserInfo } from "@/types/user";
import {
  createMessage,
  getMessagesByConversationId,
} from "@/database/queries/messages";
import { Message } from "@/types/conversation";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { sendMessage } from "@/api/message";
import { useEffect } from "react";
import { supabase } from "@/utils/supabase";

export const useMessages = (
  conversationId: string,
): UseQueryResult<Message[]> => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const messages = await getMessagesByConversationId(conversationId);
      return messages;
    },
  });
};

export const useSendMessage = (conversationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      message,
      conversationId,
      userInfo,
      otherUser,
    }: {
      message: string;
      conversationId: string;
      userInfo: UserInfo;
      otherUser: UserInfo;
    }) => {
      sendMessage(message, otherUser.selected_language)
        .then((translatedMessage: string) => {
          console.log(
            "🚀 ~ handleSubmitMessage ~ translatedMessage:",
            translatedMessage,
          );
          createMessage({
            roomId: conversationId,
            senderId: userInfo.id,
            originalMessage: message,
            originalMessageLanguage: userInfo.selected_language,
            translatedMessage: translatedMessage,
            translatedMessageLanguage: otherUser!.selected_language,
            timeStamp: new Date(),
          });
        })
        .catch((error: Error) => {
          // Handle any errors here
          console.error("Error sending message", error.message);
        });
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
    },
  });
};

export const useRealtimeMessages = (
  conversationId: string,
  onNewMessage: (message: Message) => void,
) => {
  useEffect(() => {
    const messageListener = supabase
      .channel(`messages:room_id=eq.${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          console.log("🚀 ~ messageListener ~ payload:", payload);
          onNewMessage(payload.new as Message);
        },
      )
      .subscribe();

    return () => {
      messageListener.unsubscribe();
    };
  }, [conversationId, onNewMessage]);
};
