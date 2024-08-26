import { View, Text } from "react-native";
import React from "react";

import { useLocalSearchParams } from "expo-router";
import { tw } from "@/utils/tailwind";

const PhoneVerification = () => {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  return (
    <View style={tw.style("flex-1 items-center justify-center")}>
      <Text>PhoneVerification</Text>
      <Text>{phone}</Text>
    </View>
  );
};

export default PhoneVerification;
