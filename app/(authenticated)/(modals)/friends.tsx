import {
  View,
  TextInput,
  Pressable,
  Alert,
  Text,
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
  cancelFriendRequest,
  checkForFriendRequest,
  createFriendRequest,
} from "@/database/queries/friend-requests";
import Toast from "react-native-toast-message";

enum Relationship {
  friend = "friend",
  notFriend = "notFriend",
  notFound = "notFound",
  pendingRequest = "pendingRequest",
  null = "null",
}

type SearchedUserUIConfig = {
  [key in Relationship]: {
    message: string;
    buttonText: string;
    requestId?: number;
  };
};

const SearchFriendModal = () => {
  const { userInfo } = useUserStore();
  const [number, setNumber] = useState("");
  const [searchedUser, setSearchedUser] = useState<UserInfo | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const areaCode = "+1";

  const uiConfigurations: SearchedUserUIConfig = {
    [Relationship.friend]: {
      message: "is already your friend!",
      buttonText: "Chat",
    },
    [Relationship.notFriend]: {
      message: "add to start chatting!",
      buttonText: "Add Friend",
    },
    [Relationship.notFound]: {
      message: "No user by that phone number found.",
      buttonText: "",
    },
    [Relationship.pendingRequest]: {
      message: "Already sent a request to this user.",
      buttonText: "Cancel Request",
    },
    [Relationship.null]: {
      message: "",
      buttonText: "",
    },
  };

  const [searchedUserUIConfig, setSearchedUserUIConfig] = useState({
    ...uiConfigurations[Relationship.null],
    relationship: Relationship.null,
  });

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
      if (!user) {
        setSearchedUserUIConfig({
          ...uiConfigurations[Relationship.notFound],
          relationship: Relationship.notFound,
        });
        setIsLoading(false);

        return;
      }

      // check if searchedUser is already a friend
      const isAlreadyFriends = await isFriend(userInfo.id, user.id);
      const hasPendingFriendRequest = await checkForFriendRequest(
        userInfo.id,
        user.id,
      );

      if (!isAlreadyFriends) {
        // if not friends - check if there is already a sent friend request
        if (hasPendingFriendRequest) {
          setSearchedUserUIConfig({
            ...uiConfigurations[Relationship.pendingRequest],
            relationship: Relationship.pendingRequest,
            requestId: hasPendingFriendRequest.id,
          });
        } else {
          setSearchedUserUIConfig({
            ...uiConfigurations[Relationship.notFriend],
            relationship: Relationship.notFriend,
          });
        }
      } else {
        // is already friends
        setSearchedUserUIConfig({
          ...uiConfigurations[Relationship.friend],
          relationship: Relationship.friend,
        });
      }

      // regardless if searchedUser is a friend, set info to see user profile
      setSearchedUser(user);
      setIsLoading(false);
    });
  };

  const handleAddFriend = async () => {
    // the check if there is a pending friend request is already performed when the user is searched
    // so we can just create a new request
    createFriendRequest(userInfo.id, searchedUser!.id).then(() => {
      setSearchedUserUIConfig({
        ...uiConfigurations[Relationship.pendingRequest],
        relationship: Relationship.pendingRequest,
      });
    });
  };

  const handleStartConversation = async () => {
    // check if we already have an active conversation with this user
    let conversation = await getConversationByUserId(
      userInfo.id,
      searchedUser!.id,
    );

    // if we don't, create a new room
    if (!conversation) {
      conversation = await createConversation(userInfo.id, searchedUser!.id);
    }

    // navigate to the room
    router.replace({
      pathname: "/(authenticated)/(chat)/[conversation]",
      params: {
        conversation: conversation.room_id,
        otherUserId: conversation.friend_user_id,
      },
    });
  };

  const handleCancelRequest = async () => {
    if (!searchedUserUIConfig.requestId) {
      return;
    }

    cancelFriendRequest(searchedUserUIConfig.requestId)
      .then(() => {
        setSearchedUserUIConfig({
          ...uiConfigurations[Relationship.notFriend],
          relationship: Relationship.notFriend,
        });
      })
      .finally(() => {
        router.back();

        Toast.show({
          type: "success",
          text1: "Friend request successfully cancelled",
          topOffset: 70,
          visibilityTime: 3000,
        });
      });
  };

  const determineAction = () => {
    switch (searchedUserUIConfig.relationship) {
      case Relationship.friend:
        return handleStartConversation;
      case Relationship.notFriend:
        return handleAddFriend;
      case Relationship.pendingRequest:
        return handleCancelRequest;
      default:
        return () => {};
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
              {searchedUserUIConfig.message}
            </Text>
            <Pressable
              // Todo: Refactor
              onPress={determineAction()}
              style={({ pressed }) => [
                tw.style("mt-4 items-center rounded-md border border-primary"),
                pressed ? { opacity: 0.75 } : {},
              ]}>
              <Text
                style={tw.style("p-2 text-base font-semibold text-primary")}>
                {searchedUserUIConfig.buttonText}
              </Text>
            </Pressable>
          </View>
        )}

        {searchedUserUIConfig.relationship === Relationship.notFound && (
          <Text style={tw.style("max-w-64 text-center text-sm text-zinc-500")}>
            {searchedUserUIConfig.message}
          </Text>
        )}
      </View>
      {/* Todo: Clicking the user card will pop up a modal to confirm if you want to add the user as a friend */}
    </View>
  );
};

export default SearchFriendModal;
