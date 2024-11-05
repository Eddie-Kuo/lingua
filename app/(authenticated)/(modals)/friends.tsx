import {
  View,
  TextInput,
  Pressable,
  Alert,
  Text,
  Button,
  Image,
} from "react-native";
import React, { useState } from "react";
import { tw } from "@/utils/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { getUserByPhoneNumber, isFriend } from "@/database/queries/user";
import { UserInfo } from "@/types/user";
import useUserStore from "@/store/userStore";

const Modal = () => {
  const { userInfo } = useUserStore();
  const [number, setNumber] = useState("");
  const [areaCode] = useState("+1");
  const [searchedUser, setSearchedUser] = useState<UserInfo>();
  const [customMessage, setCustomMessage] = useState("");

  //Todo: Set the return of function call into state to show the user or error message user doesn't exist
  const handleSearchForFriend = async () => {
    const fullPhoneNumber = `${areaCode}${number}`;

    if (fullPhoneNumber.length < 12) {
      Alert.alert("Please enter a valid phone number");
      return;
    }

    try {
      // 1. check if the searched user is in the database
      // if the user is in the database, then we need to check if they're already a friend
      // if not, set custom message

      // 2. if the user is not in the database, set custom message

      const user = await getUserByPhoneNumber(fullPhoneNumber);

      if (!user) {
        setCustomMessage(
          "No user by that phone number found. Please check the phone number you entered and try again!",
        );
        return;
      }

      const alreadyFriends = await isFriend(userInfo.id, user.id);

      if (alreadyFriends) {
        setCustomMessage("is already your friend!");
      } else {
        setCustomMessage("add to start chatting!");
      }

      setSearchedUser(user);
    } catch (error) {
      console.log("🚀 ~ handleSearchForFriend ~ error:", error);
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

      {/* <View style={tw.style("mt-5 w-full border border-t-white")} /> */}
      {/* Todo: Display the search result of the function call */}
      <View style={tw.style("h-full items-center bg-zinc-300 pt-56")}>
        {searchedUser && (
          <View style={tw.style("items-center")}>
            <Image
              source={{ uri: searchedUser.pic_url }}
              style={tw.style("mb-4 h-24 w-24 rounded-full")}
            />
            <Text style={tw.style("text-lg font-bold")}>
              {searchedUser.first_name} {searchedUser.last_name}
            </Text>
            <Text style={tw.style("text-sm text-zinc-500")}>
              {customMessage}
            </Text>
            <Pressable
              onPress={() => {}}
              style={({ pressed }) => [
                tw.style("mt-4 items-center rounded-md border border-primary"),
                pressed ? { opacity: 0.75 } : {},
              ]}>
              <Text
                style={tw.style("p-2 text-base font-semibold text-primary")}>
                Chat
              </Text>
            </Pressable>
          </View>
        )}
      </View>
      {/* Todo: Clicking the user card will pop up a modal to confirm if you want to add the user as a friend */}

      {/* User returned */}
    </View>
  );
};

export default Modal;
