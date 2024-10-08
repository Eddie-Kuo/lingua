import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const ChatScreen = () => {
  const { chat: userId } = useLocalSearchParams<{
    chat: string;
  }>();
  return (
    <View>
      <Text>userId: {userId}</Text>
    </View>
  );
};

export default ChatScreen;
