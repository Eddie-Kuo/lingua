import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  Image,
  Pressable,
} from "react-native";
import { tw } from "@/utils/tailwind";
import { UserInfo } from "@/types/user";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useFriendsList } from "@/hooks/user";
import {
  createConversation,
  getConversationByUserId,
} from "@/database/queries/conversations";

const HomeScreen = () => {
  const userId = 57; // temp user id for development to bypass auth
  const { data: friendsList } = useFriendsList(userId);
  const router = useRouter();

  const handleSelectedUser = async (friendId: number) => {
    let conversationId = await getConversationByUserId(userId);
    console.log("🚀 ~ handleSelectedUser ~ conversationId:", conversationId);

    if (!conversationId) {
      conversationId = await createConversation(userId, friendId);
    }

    router.push({
      pathname: "/(authenticated)/(tabs)/[chat]",
      params: { chat: conversationId },
    });
  };

  const renderFriendsList: ListRenderItem<UserInfo> = ({ item }) => {
    return (
      <Pressable
        onPress={() => handleSelectedUser(item.id)}
        style={({ pressed }) => [
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
        <FlatList
          renderItem={renderFriendsList}
          data={friendsList}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
