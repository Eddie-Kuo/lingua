import { Pressable, Text, TouchableOpacity } from "react-native";
import React from "react";
import { tw } from "@/utils/tailwind";
import { router } from "expo-router";

type ActionButtonProps = {
  onPress?: () => void;
  children?: React.ReactNode;
};

const ActionButton = ({ onPress, children }: ActionButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        tw.style("w-[90%] items-center rounded-full bg-highlightAccent py-3"),
        pressed ? { opacity: 0.75 } : {},
      ]}>
      <Text style={tw.style("text-lg font-semibold text-white")}>
        {children}
      </Text>
    </Pressable>
  );
};

export default ActionButton;
