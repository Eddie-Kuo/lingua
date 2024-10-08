import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const ChatScreen = () => {
  const { conversation: conversationId } = useLocalSearchParams<{
    conversation: string;
  }>();
  return (
    <View>
      <Text>conversationId: {conversationId}</Text>
    </View>
  );
};

export default ChatScreen;
