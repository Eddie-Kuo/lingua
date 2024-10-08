import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const ChatScreen = () => {
  const { chat: conversationId } = useLocalSearchParams<{
    chat: string;
  }>();
  return (
    <View>
      <Text>conversationId: {conversationId}</Text>
    </View>
  );
};

export default ChatScreen;
