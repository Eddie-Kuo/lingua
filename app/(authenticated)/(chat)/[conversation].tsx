import { View, Text, TouchableOpacity } from "react-native";
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
    <View>
      <ChatHeader otherUser={otherUser} />
      <Text>conversationId: {conversation}</Text>
    </View>
  );
};

export default ChatScreen;

const ChatHeader = ({ otherUser }: { otherUser: UserInfo | undefined }) => {
  return (
    <View
      style={tw.style(
        "h-28 flex-row items-end justify-between bg-[#1F1F1F] p-3",
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
