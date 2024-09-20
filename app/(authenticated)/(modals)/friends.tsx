import { View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { tw } from "@/utils/tailwind";
import { Ionicons } from "@expo/vector-icons";

const Modal = () => {
  //Todo: Need to account for area code stored in database
  const [number, setNumber] = useState("");

  const handleSearchForFriend = () => {
    console.log("handleSearchForFriend Pressed");
    return;
  };

  return (
    <View style={tw.style("bg-secondary flex-1 px-5 py-5")}>
      {/* Search bar */}
      <View style={tw.style("flex-row items-center gap-3")}>
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
            style={tw.style("absolute right-12")}
            onPress={() => setNumber("")}>
            <Ionicons name="close-circle" size={24} color={"grey"} />
          </Pressable>
        )}
        <Pressable style={tw.style("")} onPress={handleSearchForFriend}>
          <Ionicons name="search" size={24} color={"white"} />
        </Pressable>
      </View>

      {/* <View style={tw.style("my-5 w-full border border-t-white")} /> */}

      {/* User returned */}
    </View>
  );
};

export default Modal;
