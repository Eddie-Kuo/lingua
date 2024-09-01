import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { tw } from "@/utils/tailwind";
import ActionButton from "@/components/ActionButton";
import { Ionicons } from "@expo/vector-icons";
import { User } from "@supabase/supabase-js";

const OnboardingScreen = () => {
  // onSubmit - populate database with user information including the phone number and the selected language
  const handleSubmit = () => {};

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

      <UserInfoForm />

      <View style={tw.style("mb-10 w-[100%] items-center")}>
        <ActionButton onPress={handleSubmit}>Submit</ActionButton>
      </View>
    </View>
  );
};

// type UserInfo = {
//   phoneNumber: string;
//   firstName: string;
//   lastName: string;
//   picURL: string;
//   selectedLanguage: "English" | "Spanish" | "Mandarin";
// };

function UserInfoForm() {
  const [userInfo, setUserInfo] = useState<User>();

  return (
    <View style={tw.style("flex-1 items-center gap-10")}>
      <View>
        <Image
          style={tw.style("h-28 w-28 rounded-full bg-orange-200")}
          source={require("@/assets/images/ghost.png")}
          resizeMode="contain"
        />
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
          autoCorrect={false}
        />
        <TextInput
          style={tw.style("w-full rounded-xl bg-undertone p-4")}
          placeholder="Last Name (Required)"
          autoCorrect={false}
        />
        <TextInput
          style={tw.style("w-full rounded-xl bg-undertone p-4")}
          placeholder="Email"
          autoCorrect={false}
        />
      </View>
    </View>
  );
}

export default OnboardingScreen;
