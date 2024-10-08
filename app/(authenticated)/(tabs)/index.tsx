import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  Image,
  Pressable,
} from "react-native";
import { tw } from "@/utils/tailwind";
import { UserInfo } from "@/utils/types/user";
import { StatusBar } from "expo-status-bar";
import { getFriendsList, getUserById } from "@/database/queries/user";
import { useEffect, useState } from "react";

const HomeScreen = () => {
  const [friendsList, setFriendsList] = useState<UserInfo[]>();
  console.log("🚀 ~ HomeScreen ~ friendsList:", friendsList);
  const userId = 57; // temp user id for development to bypass auth

  useEffect(() => {
    getFriendsList(userId)
      .then((friends) => {
        return Promise.all(
          friends.map((friend) => getUserById(friend.friend_user_id)),
        );
      })
      .then((friendList) => {
        setFriendsList(friendList);
      })
      .catch((error) => {
        console.error("Error fetching friends list", error);
      });
  }, []);

  const handleSelectedUser = (userId: string) => {
    // 1. Given the userId, check if current user has an active chat with the selected user
    // if there is a chat, redirect to the chat room
    // if there is no chat, create a new chat room
    // redirect to the chat room
    // router.push({
    //   pathname: "/(authenticated)/(tabs)/[chat]",
    //   params: { chat: userId },
    // });
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
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
