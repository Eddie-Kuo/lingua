import { View, Text, TextInput, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import ActionButton from "@/components/ActionButton";
import { tw } from "@/utils/tailwind";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

const languages: LanguageOptions[] = [
  { language: "English" },
  { language: "Spanish" },
  { language: "Mandarin" },
];

export type LanguageOptions = {
  language: "English" | "Spanish" | "Mandarin";
};

const LanguageSelection = () => {
  const router = useRouter();
  const [targetLanguage, setTargetLanguage] = useState<LanguageOptions>({
    language: "English",
  });
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={tw.style("flex-1 gap-4 bg-secondary p-3")}>
      <Text style={tw.style("text-5xl font-semibold text-highlightAccent")}>
        Let's get started!
      </Text>

      <Text style={tw.style("text-lg font-medium leading-6 text-undertone")}>
        Start by selecting the language of choice you're most comfortable with!
        {"\n"}
        {"\n"}
        The language you select will reflect the language used throughout the
        app and the language in which the messages you will receive.
      </Text>
      <View style={tw.style("w-full")}>
        <Dropdown
          style={tw.style(
            "h-12 rounded-lg border-[0.5px] border-undertone px-3",
            isFocus && "border-highlightAccent",
          )}
          placeholderStyle={tw.style("text-undertone")}
          placeholder="Select Language"
          selectedTextStyle={tw.style("text-undertone")}
          data={languages}
          maxHeight={300}
          labelField="language"
          valueField="language"
          value={targetLanguage}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item: LanguageOptions) => {
            setTargetLanguage({ language: item.language });
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={tw.style("mr-2")}
              color={"#E6EFF5"}
              name="wechat"
              size={20}
            />
          )}
        />
      </View>

      <View style={tw.style("absolute bottom-10 w-[100%] items-center")}>
        <ActionButton
          onPress={() =>
            router.push({
              pathname: "/signup",
              params: { language: targetLanguage.language },
            })
          }>
          Continue
        </ActionButton>
      </View>
    </View>
  );
};

export default LanguageSelection;
