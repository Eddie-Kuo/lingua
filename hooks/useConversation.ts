import { getConversationByConversationId } from "@/database/queries/conversations";
import { getUserById } from "@/database/queries/user";
import { useQuery } from "@tanstack/react-query";

export const useConversationDetails = (conversationId: string) => {
  return useQuery({
    queryKey: ["conversation"],
    queryFn: async () => {
      const conversation =
        await getConversationByConversationId(conversationId);

      const otherUser = await getUserById(conversation.friend_user_id);

      return otherUser;
    },
  });
};
