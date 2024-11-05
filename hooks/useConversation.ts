import { SelectMessage } from "./../database/schemas/messages";
import { UserInfo } from "@/types/user";
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

export const useMessages = (
  conversationId: string,
): UseQueryResult<Message[]> => {
  return useQuery({
    queryKey: ["messages", conversationId],
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
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages", conversationId],
      });
    },
  });
};
