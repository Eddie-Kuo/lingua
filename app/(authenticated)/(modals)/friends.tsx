import {
  View,
  TextInput,
  Pressable,
  Alert,
  Text,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { tw } from "@/utils/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { getUserByPhoneNumber, isFriend } from "@/database/queries/user";

import { UserInfo } from "@/types/user";
import useUserStore from "@/store/userStore";
import { Colors } from "@/constants/colors";
import {
  createConversation,
  getConversationByUserId,
} from "@/database/queries/conversations";
import { useRouter } from "expo-router";
import {
  checkForFriendRequest,
  createFriendRequest,
} from "@/database/queries/friend-requests";

type SearchedUserStatus = {
  message: string;
  buttonText: string;
  relationship: Relationship;
};

enum Relationship {
  friend = "friend",
  notFriend = "notFriend",
  notFound = "notFound",
}

const SearchFriendModal = () => {
  const { userInfo } = useUserStore();
  const [number, setNumber] = useState("");
  const [searchedUser, setSearchedUser] = useState<UserInfo | null>(null);
  const [searchedUserStatus, setSearchedUserStatus] =
    useState<SearchedUserStatus>({
      message: "",
      buttonText: "",
      relationship: Relationship.notFound,
    });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const areaCode = "+1";

  const handleSearchForFriend = async () => {
    // reset the searchedUser if there was a search done prior
    setSearchedUser(null);
    const fullPhoneNumber = `${areaCode}${number}`;

    if (fullPhoneNumber.length < 12) {
      Alert.alert("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);

    getUserByPhoneNumber(fullPhoneNumber).then(async (user) => {
      console.log("🚀 ~ getUserByPhoneNumber ~ user:", user);
      if (!user) {
        setSearchedUserStatus({
          message: "No user by that phone number found.",
          buttonText: "",
          relationship: Relationship.notFound,
        });
        setIsLoading(false);

        return;
      }

      // check if searchedUser is already a friend
      const isAlreadyFriends = await isFriend(userInfo.id, user.id);
      if (isAlreadyFriends) {
        setSearchedUserStatus({
          message: "is already your friend!",
          buttonText: "Chat",

          relationship: Relationship.friend,
        });
      } else {
        setSearchedUserStatus({
          message: "add to start chatting!",
          buttonText: "Add Friend",

          relationship: Relationship.notFriend,
        });
      }

      // regardless if searchedUser is a friend, set info to see user profile
      setSearchedUser(user);
      setIsLoading(false);
    });
  };

  const handleStartConversation = async () => {
    let conversation = await getConversationByUserId(
      userInfo.id,
      searchedUser!.id,
    );

    if (!conversation) {
      conversation = await createConversation(userInfo.id, searchedUser!.id);
    }

    router.replace({
      pathname: "/(authenticated)/(chat)/[conversation]",
      params: {
        conversation: conversation.room_id,
        otherUserId: conversation.friend_user_id,
      },
    });
  };

  const handleAddFriend = async () => {
    // check if user already has an active friend request with the searched user
    const activeFriendRequest = await checkForFriendRequest(
      userInfo.id,
      searchedUser!.id,
    );

    // no active friend requests - create entry in database
    if (!activeFriendRequest) {
      await createFriendRequest(userInfo.id, searchedUser!.id);
    }
  };

  return (
    <View style={tw.style("flex-1 bg-primary py-3")}>
      {/* Search bar */}
      <View style={tw.style("mb-8 flex-row items-center gap-3 px-5")}>
        <TextInput
          placeholder="Enter your friend's phone number"
          placeholderTextColor={"#a1a1aa"}
          style={tw.style("flex-1 rounded-lg bg-slate-200 px-3 py-4")}
          autoFocus={true}
          showSoftInputOnFocus={true}
          keyboardType="numeric"
          value={number}
          onChangeText={setNumber}
        />
        {number && (
          <Pressable
            style={tw.style("absolute right-16")}
            onPress={() => setNumber("")}>
            <Ionicons name="close-circle" size={24} color={"grey"} />
          </Pressable>
        )}
        <Pressable style={tw.style("")} onPress={handleSearchForFriend}>
          <Ionicons name="search" size={24} color={"white"} />
        </Pressable>
      </View>

      <View style={tw.style("h-full items-center bg-zinc-300 pt-56")}>
        {isLoading && <ActivityIndicator size="large" color={Colors.primary} />}

        {searchedUser && (
          <View style={tw.style("items-center")}>
            <Image
              resizeMode="contain"
              source={
                searchedUser.pic_url
                  ? { uri: searchedUser.pic_url }
                  : require("@/assets/images/ghost.png")
              }
              style={tw.style("mb-4 h-24 w-24 rounded-full border bg-gray-600")}
            />
            <Text style={tw.style("text-lg font-bold")}>
              {searchedUser.first_name} {searchedUser.last_name}
            </Text>
            <Text
              style={tw.style("max-w-64 text-center text-sm text-zinc-500")}>
              {searchedUserStatus.message}
            </Text>
            <Pressable
              onPress={
                searchedUserStatus.relationship === Relationship.friend
                  ? handleStartConversation
                  : handleAddFriend
              }
              style={({ pressed }) => [
                tw.style("mt-4 items-center rounded-md border border-primary"),
                pressed ? { opacity: 0.75 } : {},
              ]}>
              <Text
                style={tw.style("p-2 text-base font-semibold text-primary")}>
                {searchedUserStatus.buttonText}
              </Text>
            </Pressable>
          </View>
        )}

        {searchedUserStatus.relationship === Relationship.notFound && (
          <Text style={tw.style("max-w-64 text-center text-sm text-zinc-500")}>
            {searchedUserStatus.message}
          </Text>
        )}
      </View>
      {/* Todo: Clicking the user card will pop up a modal to confirm if you want to add the user as a friend */}
    </View>
  );
};

export default SearchFriendModal;
