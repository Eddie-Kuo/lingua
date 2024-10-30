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
import { useEffect, useState } from "react";
import { UserInfo } from "@/types/user";
import { Message } from "@/types/conversation";
import useUserStore from "@/store/userStore";
import { useMessages, useSendMessage } from "@/hooks/useConversation";
import { supabase } from "@/utils/supabase";

const ChatScreen = () => {
  const { conversation: conversationId, otherUserId } = useLocalSearchParams<{
    conversation: string;
    otherUserId: string;
  }>();
  const { data: otherUser } = useOtherUserDetails(Number(otherUserId));
  const [message, setMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<Message[]>();
  const { userInfo } = useUserStore();
  const { data: messages } = useMessages(conversationId);
  const { mutate: sendMessage } = useSendMessage(conversationId);

  useEffect(() => {
    if (messages) {
      setMessageList(messages);
    }
  }, [messages]);

  useEffect(() => {
    const messageListener = supabase
      .channel(`messages:room_id=eq.${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          console.log("🚀 ~ messageListener ~ payload:", payload);
          setMessageList((prevMessages) =>
            prevMessages
              ? [payload.new as Message, ...prevMessages]
              : [payload.new as Message],
          );
        },
      )
      .subscribe();

    return () => {
      messageListener.unsubscribe();
    };
  }, [conversationId, setMessageList]);

  const handleSubmitMessage = async () => {
    console.log("🚀 ~ handleSubmitMessage ~ message:", message);
    try {
      if (message.length === 0) {
        Alert.alert("Please enter a message");
        return;
      }

      sendMessage({
        message: message,
        conversationId: conversationId,
        userInfo: userInfo,
        otherUser: otherUser!,
      });

      // sendMessage(message, otherUser!.selected_language)
      //   .then((translatedMessage: string) => {
      //     console.log(
      //       "🚀 ~ handleSubmitMessage ~ translatedMessage:",
      //       translatedMessage,
      //     );
      //     createMessage({
      //       roomId: conversationId,
      //       senderId: userInfo.id,
      //       originalMessage: message,
      //       originalMessageLanguage: "English",
      //       translatedMessage: translatedMessage,
      //       translatedMessageLanguage: otherUser!.selected_language,
      //       timeStamp: new Date(),
      //     });
      //   })
      //   .catch((error: Error) => {
      //     // Handle any errors here
      //     console.error("Error sending message", error.message);
      //   });
    } catch (error) {
      console.error("Error sending message", error);
    }
    setMessage("");
  };

  return (
    <SafeAreaView style={tw.style("flex-1 bg-[#1f1f1f]")}>
      <ChatHeader otherUser={otherUser} />

      <KeyboardAvoidingView
        style={tw.style("flex-1 bg-primary")}
        behavior="padding"
        keyboardVerticalOffset={0}>
        {/* chat messages */}

        <ChatMessages userId={userInfo.id} messages={messageList} />

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

const ChatMessages = ({
  userId,
  messages,
}: {
  userId: number;
  messages: Message[] | undefined;
}) => {
  return (
    <View style={tw.style("mb-3 flex-1 px-3")}>
      <FlatList
        inverted
        data={messages}
        renderItem={({ item }: { item: Message }) => (
          <View
            style={tw.style(
              "my-1.5 flex max-w-72 rounded-xl bg-zinc-700/70 p-2.5",
              item.sender_id === userId && "self-end bg-sky-600",
            )}>
            {item.sender_id === userId ? (
              <Text style={tw.style("text-base text-white")}>
                {item.original_message}
              </Text>
            ) : (
              <Text style={tw.style("text-base text-white")}>
                {item.translated_message}
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
};
