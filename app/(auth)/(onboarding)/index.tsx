import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { tw } from "@/utils/tailwind";
import ActionButton from "@/components/ActionButton";
import { Ionicons } from "@expo/vector-icons";
import useUserStore from "@/store/userStore";
import { createUser } from "@/database/queries/user";

export type UserInfo = {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  picURL: string;
  selectedLanguage: "English" | "Spanish" | "Mandarin";
};

const OnboardingScreen = () => {
  const { language, phoneNumber } = useUserStore();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    phoneNumber: phoneNumber,
    firstName: "",
    lastName: "",
    picURL: "",
    selectedLanguage: language.language,
  });
  const [formError, setFormError] = useState({
    firstName: "",
    lastName: "",
  });

  const updateFirstName = (input: string) => {
    setUserInfo((prev) => ({ ...prev, firstName: input }));
  };
  const updateLastName = (input: string) => {
    setUserInfo((prev) => ({ ...prev, lastName: input }));
  };

  const handleSubmit = () => {
    //TODO: add form validation before allowing user to click submit
    // clear any existing errors from previous submission
    setFormError({ firstName: "", lastName: "" });

    try {
      if (!userInfo.firstName) {
        setFormError((prev) => ({
          ...prev,
          firstName: "Please enter your first name!",
        }));
        Alert.alert("enter first name");
      }
      if (!userInfo.lastName) {
        setFormError((prev) => ({
          ...prev,
          lastName: "Please enter your last name!",
        }));
        Alert.alert("enter last name");

        return;
      }

      console.log("userInfo");

      createUser(userInfo);
    } catch (error) {
      if (error instanceof Error) {
        console.log("🚀 ~ handleSubmit ~ error:", error.message);
      } else {
        console.log(
          "🚀 ~ handleSubmit ~ error: Some other type of unknown error",
        );
      }
    }
  };

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

      {/* Form */}
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
            key={"firstName"}
            onChangeText={updateFirstName}
            style={tw.style("w-full rounded-xl bg-undertone p-4")}
            placeholder="First Name (Required)"
            autoCorrect={false}
          />
          <TextInput
            onChangeText={updateLastName}
            style={tw.style("w-full rounded-xl bg-undertone p-4")}
            placeholder="Last Name (Required)"
            autoCorrect={false}
          />
        </View>
      </View>

      <View style={tw.style("mb-10 w-[100%] items-center")}>
        <ActionButton onPress={handleSubmit}>Submit</ActionButton>
      </View>
    </View>
  );
};

export default OnboardingScreen;
