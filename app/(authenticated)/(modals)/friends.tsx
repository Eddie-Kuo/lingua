import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { tw } from "@/utils/tailwind";

const Modal = () => {
  return (
    <View style={tw.style("bg-secondary flex-1")}>
      <Text>Friends list modal</Text>
    </View>
  );
};

export default Modal;
