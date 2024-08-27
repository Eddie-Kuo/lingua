import { View, Text } from "react-native";
import React from "react";

import { useLocalSearchParams } from "expo-router";
import { tw } from "@/utils/tailwind";

const PhoneVerification = () => {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  return (
    <View style={tw.style("flex-1 gap-3 bg-secondary p-3")}>
      <Text style={tw.style("text-5xl font-semibold text-highlightAccent")}>
        6-digit code
      </Text>
      <Text style={tw.style("text-undertone")}>
        Code sent to {phone}. Please enter the code to verify your account!
      </Text>
    </View>
  );
};

export default PhoneVerification;
