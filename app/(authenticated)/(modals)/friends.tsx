import { View, TextInput, Pressable, Alert, Text, Button } from "react-native";
import React, { useState } from "react";
import { tw } from "@/utils/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { getUserByPhoneNumber } from "@/database/queries/user";

const Modal = () => {
  //Todo: Need to account for area code stored in database
  const [number, setNumber] = useState("");
  const [areaCode, setAreaCode] = useState("+1");
  const [searchedUser, setSearchedUser] = useState<any>();

  //Todo: Set the return of function call into state to show the user or error message user doesn't exist

  const handleSearchForFriend = async () => {
    const fullPhoneNumber = `${areaCode}${number}`;

    if (fullPhoneNumber.length < 12) {
      Alert.alert("Please enter a valid phone number");
      return;
    }

    try {
      const user = await getUserByPhoneNumber(fullPhoneNumber);
      if (!user) {
        Alert.alert(
          "User by that phone number not found. Please check the phone number you entered and try again!",
        );
      }

      setSearchedUser(user);
    } catch (error) {
      console.log("🚀 ~ handleSearchForFriend ~ error:", error);
    }

    return;
  };

  return (
    <View style={tw.style("flex-1 bg-secondary py-3")}>
      {/* Search bar */}
      <View style={tw.style("flex-row items-center gap-3 px-5")}>
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
      <View style={tw.style("mt-8 h-full bg-zinc-300")}>
        {searchedUser && (
          <View>
            <Text>
              {searchedUser.first_name}, {searchedUser.last_name}
            </Text>
            <Text>Custom Message</Text>
            <Button title="Action" />
          </View>
        )}
      </View>
      {/* Todo: Clicking the user card will pop up a modal to confirm if you want to add the user as a friend */}

      {/* User returned */}
    </View>
  );
};

export default Modal;
