import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  Image,
  Pressable,
  Button,
} from "react-native";
import { tw } from "@/utils/tailwind";
import { UserInfo } from "@/types/user";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useFriendsList } from "@/hooks/useUser";
import {
  createConversation,
  getConversationByUserId,
} from "@/database/queries/conversations";
import useUserStore from "@/store/userStore";

const HomeScreen = () => {
  const router = useRouter();
  const { userInfo } = useUserStore();
  const { data: friendsList } = useFriendsList(userInfo.id);

  const handleSelectedUser = async (friendId: number) => {
    try {
      let conversation = await getConversationByUserId(userInfo.id, friendId);
      if (!conversation) {
        conversation = await createConversation(userInfo.id, friendId);
      }
      router.push({
        pathname: "/(authenticated)/(chat)/[conversation]",
        params: {
          conversation: conversation.room_id,
          otherUserId: conversation.friend_user_id,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const renderFriendsList: ListRenderItem<UserInfo> = ({
    item,
  }: {
    item: UserInfo;
  }) => {
    return (
      <Pressable
        onPress={() => handleSelectedUser(item.id)}
        style={({ pressed }: { pressed: boolean }) => [
          tw.style("flex-row items-center gap-3 px-3"),
          pressed
            ? {
                backgroundColor: "#434446",
              }
            : {},
        ]}>
        <Image
          source={{ uri: item.pic_url }}
          style={tw.style("h-12 w-12 rounded-full")}
        />
        <View
          style={tw.style(
            "flex w-full border-b-[0.5px] border-gray-400/30 py-3",
          )}>
          <Text style={tw.style("text-sm font-semibold text-undertone")}>
            {item.first_name} {item.last_name}
          </Text>
          <Text style={tw.style("text-xs text-gray-500")}>
            {item.phone_number}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={tw.style("flex-1 gap-2 bg-primary")}>
      <StatusBar style="light" />
      <View style={tw.style("mt-2 px-5")}>
        <Text style={tw.style("text-base font-semibold text-undertone")}>
          Start Chatting
        </Text>
      </View>
      <View>
        {friendsList && (
          <FlatList
            renderItem={renderFriendsList}
            data={friendsList}
            keyExtractor={(item: UserInfo) => item.id.toString()}
          />
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
