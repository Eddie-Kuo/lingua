import { UserInfo } from "@/types/user";
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getFriendsList,
  getUserById,
  getUserByPhoneNumber,
} from "../database/queries/user";

export const useFriendsList = (userId: number): UseQueryResult<UserInfo[]> => {
  return useQuery({
    queryKey: ["friendList"],
    queryFn: async () => {
      const friends = await getFriendsList(userId);
      return Promise.all(
        friends.map((friend) => getUserById(friend.friend_user_id)),
      );
    },
  });
};
export const useOtherUserDetails = (
  userId: number,
): UseQueryResult<UserInfo> => {
  return useQuery({
    queryKey: ["otherUserDetails"],
    queryFn: async () => {
      const user = await getUserById(userId);
      return user;
    },
  });
};
