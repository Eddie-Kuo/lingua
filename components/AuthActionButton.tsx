import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { tw } from "@/utils/tailwind";

type AuthActionButtonProps = {
  onPress?: () => void;
  children?: React.ReactNode;
};

const AuthActionButton = ({ onPress, children }: AuthActionButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw.style(
        `w-[90%] items-center rounded-full bg-highlightAccent py-3`,
      )}>
      <Text style={tw.style("text-lg font-semibold text-white")}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default AuthActionButton;
