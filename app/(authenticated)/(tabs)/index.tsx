import { View, Text, FlatList } from "react-native";
import { tw } from "@/utils/tailwind";
import { userData } from "@/constants/userData";
const HomeScreen = () => {
  const renderFriendsList = () => {
    return (
      <View>
        <Text>User</Text>
      </View>
    );
  };

  return (
    <View style={tw.style("flex-1 bg-primary px-5")}>
      <View style={tw.style("mt-2")}>
        <Text style={tw.style("text-base font-semibold text-undertone")}>
          Friends: 20
        </Text>
      </View>
      <View>
        <FlatList renderItem={renderFriendsList} data={userData} />
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
