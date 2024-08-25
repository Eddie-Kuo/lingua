import { View, Text, Image, Button, Pressable } from "react-native";
import React from "react";
import { tw } from "@/utils/tailwind";
import { Link } from "expo-router";

const Index = () => {
  return (
    <View
      style={tw.style(
        "relative flex-1 items-center justify-center bg-secondary",
      )}>
      <View style={tw.style("flex items-center justify-center gap-2")}>
        <Image
          source={require("@/assets/images/icon.png")}
          resizeMode="contain"
          style={tw.style("h-52 w-64")}
        />
        <Text
          style={tw.style(
            "text-3xl font-semibold tracking-widest text-highlight",
          )}>
          Lingua
        </Text>
        <Text
          style={tw.style(
            "text-xl font-medium tracking-widest text-highlightAccent",
          )}>
          Speak Freely, Text Clearly
        </Text>
      </View>
      <View style={tw.style("absolute bottom-10 w-[100%] items-center")}>
        <Link asChild href={"/(public)"}>
          <Pressable
            style={tw.style(
              "w-[80%] items-center rounded-full bg-highlightAccent py-3",
            )}>
            <Text style={tw.style("text-lg font-semibold text-white")}>
              Start Messaging
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default Index;
