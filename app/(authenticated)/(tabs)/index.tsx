import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  Image,
  Pressable,
} from "react-native";
import { tw } from "@/utils/tailwind";
import { userData } from "@/constants/userData";
import { UserInfo } from "@/utils/types/user";
import { Colors } from "@/constants/colors";

const HomeScreen = () => {
  const handleSelectedUser = () => {};

  const renderFriendsList: ListRenderItem<UserInfo> = ({ item }) => {
    return (
      <Pressable
        onPress={handleSelectedUser}
        style={({ pressed }) => [
          tw.style("flex-row items-center gap-3 px-3"),
          pressed
            ? {
                backgroundColor: "#434446",
                // opacity: 0.75,
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
      <View style={tw.style("mt-2 px-5")}>
        <Text style={tw.style("text-base font-semibold text-undertone")}>
          Start Chatting
        </Text>
      </View>
      <View>
        <FlatList
          renderItem={renderFriendsList}
          data={userData}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

//* Features this screen will be in charge of:
//Todo: addFriend button - search and add a friend through phone number - bottom modal
//Todo: Somewhere to show list of pending requests? - bottom modal
//Todo: list of all friends from friends list - on screen
//Todo: Notifications area to display list of incoming requests within the app - bottom modal
