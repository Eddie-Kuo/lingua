import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { tw } from "@/utils/tailwind";
import { Ionicons } from "@expo/vector-icons";

const ChatScreen = () => {
  const { conversation: conversationId } = useLocalSearchParams<{
    conversation: string;
  }>();
  return (
    <View>
      <ChatHeader />
      <Text>conversationId: {conversationId}</Text>
    </View>
  );
};

export default ChatScreen;

const ChatHeader = () => {
  return (
    <View
      style={tw.style(
        "h-28 flex-row items-end justify-between bg-[#1F1F1F] p-2.5",
      )}>
      <View style={tw.style("flex-row items-center gap-2")}>
        <Link href="../" asChild>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
        </Link>
        <Text style={tw.style("text-xl font-bold text-white")}>Other User</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="menu" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};
