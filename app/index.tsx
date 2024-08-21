import { View, Text, Image } from "react-native";
import React from "react";
import { tw } from "@/utils/tailwind";

const Index = () => {
  return (
    <View style={tw.style("items-center justify-center flex-1 bg-secondary")}>
      <View style={tw.style("flex items-center justify-center gap-2")}>
        <Image
          source={require("@/assets/images/icon.png")}
          resizeMode="contain"
          style={tw.style("w-64 h-52")}
        />
        <Text style={tw.style("text-white font-bold tracking-widest text-xl")}>
          Lingua
        </Text>
        <Text style={tw.style("text-white font-bold tracking-widest text-xl")}>
          Speak Freely, Text Clearly
        </Text>
      </View>
    </View>
  );
};

export default Index;
