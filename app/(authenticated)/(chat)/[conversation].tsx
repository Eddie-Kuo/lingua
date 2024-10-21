import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  FlatList,
  Alert,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { tw } from "@/utils/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { useOtherUserDetails } from "@/hooks/useUser";
import { MockMessages } from "@/constants/mockMessageData";
import { useState } from "react";
import { sendMessage } from "@/api/message";

const ChatScreen = () => {
  const { conversation: conversationId, otherUserId } = useLocalSearchParams<{
    conversation: string;
    otherUserId: string;
  }>();
  const [message, setMessage] = useState<string>("");

  const handleSubmitMessage = async () => {
    try {
      if (message.length === 0) {
        Alert.alert("Please enter a message");
        return;
      }

      await sendMessage(message);
    } catch (error) {}
    setMessage("");
  };

  return (
    <SafeAreaView style={tw.style("flex-1 bg-[#1f1f1f]")}>
      <ChatHeader otherUserId={otherUserId} />

      <KeyboardAvoidingView
        style={tw.style("flex-1 bg-primary")}
        behavior="padding"
        keyboardVerticalOffset={0}>
        {/* chat messages */}

        <ChatMessages />

        {/* chat input */}
        <View style={tw.style("flex-row gap-4 bg-[#1f1f1f] p-4")}>
          <TextInput
            placeholder="Enter text..."
            placeholderTextColor={"white"}
            style={tw.style("flex-1 rounded-xl bg-[#3a3a3a] p-3 text-white")}
            multiline
            value={message}
            onChangeText={setMessage}
          />
          <Pressable
            style={tw.style("justify-center")}
            onPress={handleSubmitMessage}>
            <Ionicons name="send" size={24} color="white" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const ChatHeader = ({ otherUserId }: { otherUserId: string }) => {
  const { data: otherUser } = useOtherUserDetails(Number(otherUserId));
  return (
    <View
      style={tw.style(
        "h-12 flex-row items-end justify-between bg-[#1F1F1F] p-3",
      )}>
      <View style={tw.style("flex-row items-center gap-2")}>
        <Link href="../" asChild>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
        </Link>
        <Text style={tw.style("text-xl font-bold text-white")}>
          {otherUser?.first_name} {otherUser?.last_name}
        </Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="menu" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const ChatMessages = () => {
  return (
    <View style={tw.style("mb-3 flex-1 px-3")}>
      <FlatList
        inverted
        data={[...MockMessages].reverse()}
        renderItem={({ item }) => (
          <View
            style={tw.style(
              "my-1.5 flex max-w-72 rounded-xl bg-zinc-700/70 p-2.5",
              item.sender_id === 57 && "self-end bg-sky-600",
            )}>
            <Text style={tw.style("text-base text-white")}>
              {item.original_message}
            </Text>
          </View>
        )}
      />
    </View>
  );
};
