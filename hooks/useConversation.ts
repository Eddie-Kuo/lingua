import { getConversationByConversationId } from "@/database/queries/conversations";
import { getUserById } from "@/database/queries/user";
import { UserInfo } from "@/types/user";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

// export const useConversationDetails = (
//   conversationId: string,
// ): UseQueryResult<UserInfo> => {
//   return useQuery({
//     queryKey: ["conversationDetails"],
//     queryFn: async () => {
//       const conversation =
//         await getConversationByConversationId(conversationId);

//       const otherUser = await getUserById(conversation.friend_user_id);

//       return otherUser;
//     },
//   });
// };

// conversation query - useSuspenseQuery for better performance
