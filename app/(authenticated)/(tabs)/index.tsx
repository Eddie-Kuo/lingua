import { View, Text } from "react-native";
import { tw } from "@/utils/tailwind";

const HomeScreen = () => {
  return (
    <View style={tw.style("flex-1 items-center justify-center bg-primary")}>
      <Text>Hello World</Text>
    </View>
  );
};

export default HomeScreen;

//* Features this screen will be in charge of:
//Todo: addFriend button - search and add a friend through phone number - bottom modal
//Todo: Somewhere to show list of pending requests? - bottom modal
//Todo: list of all friends from friends list - on screen
//Todo: Notifications area to display list of incoming requests within the app - bottom modal
