import { View, TextInput, Pressable } from "react-native";
import React from "react";
import { tw } from "@/utils/tailwind";
import { Ionicons } from "@expo/vector-icons";

const Modal = () => {
  return (
    <View style={tw.style("bg-secondary flex-1 px-5 py-5")}>
      {/* Search bar */}
      <View style={tw.style("flex-row items-center gap-3")}>
        <TextInput
          placeholder="Enter your friend's phone number"
          placeholderTextColor={"#a1a1aa"}
          style={tw.style("flex-1 rounded-lg bg-slate-200 px-3 py-4")}
          clearButtonMode="while-editing"
          autoFocus={true}
          showSoftInputOnFocus={true}
          keyboardType="numeric"
        />
        <Pressable style={tw.style("")}>
          <Ionicons name="search" size={24} color={"white"} />
        </Pressable>
      </View>

      {/* <View style={tw.style("my-5 w-full border border-t-white")} /> */}

      {/* User returned */}
    </View>
  );
};

export default Modal;
