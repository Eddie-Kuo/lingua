import { getConversationByConversationId } from "@/database/queries/conversations";
import { getUserById } from "@/database/queries/user";
import { useQuery } from "@tanstack/react-query";

export const useConversationDetails = (conversationId: string) => {
  return useQuery({
    queryKey: ["conversation"],
    queryFn: async () => {
      console.log("hello");
      const conversation =
        await getConversationByConversationId(conversationId);
      console.log("🚀 ~ queryFn: ~ conversation:", conversation);

      const otherUser = await getUserById(conversation.friend_user_id);
      console.log("🚀 ~ queryFn: ~ otherUser:", otherUser);

      return otherUser;
    },
  });
};
