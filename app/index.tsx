import { View, Text, Image, Button, Pressable } from "react-native";
import React from "react";
import { tw } from "@/utils/tailwind";
import { Link } from "expo-router";

const Index = () => {
  return (
    <View
      style={tw.style(
        "items-center justify-center flex-1 bg-secondary relative"
      )}
    >
      <View style={tw.style("flex items-center justify-center gap-2")}>
        <Image
          source={require("@/assets/images/icon.png")}
          resizeMode="contain"
          style={tw.style("w-64 h-52")}
        />
        <Text
          style={tw.style(
            "text-highlight font-semibold tracking-widest text-3xl"
          )}
        >
          Lingua
        </Text>
        <Text
          style={tw.style(
            "text-highlightAccent font-medium tracking-widest text-xl"
          )}
        >
          Speak Freely, Text Clearly
        </Text>
      </View>
      <View style={tw.style("w-[100%] items-center absolute bottom-10")}>
        <Link asChild href={"/(public)"}>
          <Pressable
            style={tw.style(
              "w-[80%] bg-highlightAccent items-center py-3 rounded-full"
            )}
          >
            <Text style={tw.style("text-white font-semibold text-lg")}>
              Start Messaging
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default Index;
