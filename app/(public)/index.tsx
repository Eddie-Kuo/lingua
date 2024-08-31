import { View, Text, TextInput, Image } from "react-native";
import React from "react";
import ActionButton from "@/components/ActionButton";
import { tw } from "@/utils/tailwind";

const LanguageSelection = () => {
  return (
    <View style={tw.style("flex-1 gap-4 bg-secondary p-3")}>
      <Text style={tw.style("text-5xl font-semibold text-highlightAccent")}>
        Let's get started!
      </Text>

      <Text style={tw.style("text-mg font-medium leading-5 text-undertone")}>
        Start by selecting the language of choice you're most comfortable with
        texting! The language you select will reflect the language used
        throughout the app and the language in which the messages you will
        receive.
      </Text>
      <View style={tw.style("mt-4 flex-row gap-3")}></View>

      <View style={tw.style("absolute bottom-10 w-[100%] items-center")}>
        <ActionButton onPress={() => {}}>Continue</ActionButton>
      </View>
    </View>
  );
};

export default LanguageSelection;
