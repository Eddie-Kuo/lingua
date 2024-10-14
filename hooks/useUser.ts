import { UserInfo } from "@/types/user";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getFriendsList, getUserById } from "../database/queries/user";

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
