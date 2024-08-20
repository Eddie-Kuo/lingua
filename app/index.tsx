import { View, Text } from "react-native";
import React from "react";
import { tw } from "@/utils/tailwind";

const Index = () => {
  return (
    <View style={tw.style("flex-1 items-center justify-center")}>
      <Text
        style={tw.style("text-sky-300 font-semibold tracking-widest text-xl")}
      >
        Hello World
      </Text>
    </View>
  );
};

export default Index;
