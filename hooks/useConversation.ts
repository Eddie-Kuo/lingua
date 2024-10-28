import { getMessagesByConversationId } from "@/database/queries/messages";
import { Message } from "@/types/conversation";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

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
