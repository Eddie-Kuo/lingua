import { View, Text } from "react-native";
import React from "react";
import { tw } from "@/utils/tailwind";

const OnboardingScreen = () => {
  return (
    <View style={tw.style("flex-1 items-center justify-center bg-secondary")}>
      <View>
        <Text>Welcome</Text>
      </View>
    </View>
  );
};

export default OnboardingScreen;
