import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { tw } from "@/utils/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { useConversationDetails } from "@/hooks/useConversation";
import { UserInfo } from "@/types/user";

const ChatScreen = () => {
  const { conversation } = useLocalSearchParams<{
    conversation: string;
  }>();
  const { data: otherUser } = useConversationDetails(conversation);

  return (
    <SafeAreaView style={tw.style("flex-1 bg-[#1f1f1f]")}>
      <ChatHeader otherUser={otherUser} />

      <KeyboardAvoidingView
        style={tw.style("flex-1 bg-primary")}
        behavior="padding"
        keyboardVerticalOffset={0}>
        {/* chat messages */}
        <View style={tw.style("flex-1")}></View>

        {/* chat input */}
        <View style={tw.style("flex-row gap-4 bg-[#1f1f1f] p-4")}>
          <TextInput
            placeholder="Enter text..."
            placeholderTextColor={"white"}
            style={tw.style("flex-1 rounded-xl bg-[#3a3a3a] p-3 text-white")}
            multiline
          />
          <Pressable style={tw.style("justify-center")}>
            <Ionicons name="send" size={24} color="white" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const ChatHeader = ({ otherUser }: { otherUser: UserInfo | undefined }) => {
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
