import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { tw } from "@/utils/tailwind";
import ActionButton from "@/components/ActionButton";
import { Ionicons } from "@expo/vector-icons";

const OnboardingScreen = () => {
  return (
    <View style={tw.style("flex-1 gap-5 bg-secondary px-5")}>
      <View>
        <Text style={tw.style("text-4xl font-bold text-highlightAccent")}>
          Set up your profile ✍🏻
        </Text>
        <Text style={tw.style("text-lg leading-5 text-zinc-300")}>
          Let's set up your personal information that will be displayed on your
          profile and to other users!
        </Text>
      </View>
      <View style={tw.style("flex-1 items-center gap-10")}>
        <View>
          <Image style={tw.style("h-28 w-28 rounded-full bg-indigo-400")} />
          <TouchableOpacity
            onPress={() => {}}
            style={tw.style(
              "absolute bottom-0 right-0 rounded-full border-[3px] border-secondary bg-undertone p-2",
            )}>
            <Ionicons name="camera-outline" size={20} color={"grey"} />
          </TouchableOpacity>
        </View>
        <View style={tw.style("flex w-full gap-5")}>
          <TextInput
            style={tw.style("w-full rounded-xl bg-undertone p-4")}
            placeholder="First Name (Required)"
          />
          <TextInput
            style={tw.style("w-full rounded-xl bg-undertone p-4")}
            placeholder="Last Name (Required)"
          />
          <TextInput
            style={tw.style("w-full rounded-xl bg-undertone p-4")}
            placeholder="Email"
          />
        </View>
      </View>
      <View style={tw.style("mb-10 w-[100%] items-center")}>
        <ActionButton>Submit</ActionButton>
      </View>
    </View>
  );
};

export default OnboardingScreen;
