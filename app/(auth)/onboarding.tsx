import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { tw } from "@/utils/tailwind";
import ActionButton from "@/components/ActionButton";
import { Ionicons } from "@expo/vector-icons";
import useUserStore from "@/store/userStore";
import { createUser } from "@/database/queries/user";
import { useRouter } from "expo-router";
import { getPublicAvatarURL, selectNewImage } from "@/database/actions/avatar";

export type UserInfo = {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  picURL: string;
  selectedLanguage: "English" | "Spanish" | "Mandarin";
};

const OnboardingScreen = () => {
  const router = useRouter();
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

  //Todo: need to update the placeholder image on the signup form to display the selected image

  const handleUploadImage = async (phoneNumber: string) => {
    try {
      // set the image path for how image is stored in bucket
      const imagePath = await selectNewImage(phoneNumber);
      if (!imagePath) {
        return;
      }

      // fetch the public url of the image with the file path
      const imagePublicUrl = await getPublicAvatarURL(imagePath as string);

      // set the public image url in user info state
      setUserInfo((prev) => ({ ...prev, picURL: imagePublicUrl }));
    } catch (error) {
      console.log("🚀 ~ handleUpdateUserImage ~ error:", error);
    }
  };

  const updateFirstName = (input: string) => {
    setUserInfo((prev) => ({ ...prev, firstName: input }));
  };
  const updateLastName = (input: string) => {
    setUserInfo((prev) => ({ ...prev, lastName: input }));
  };

  const handleSubmit = () => {
    // clear any existing errors from previous submission
    setFormError({ firstName: "", lastName: "" });

    try {
      if (!userInfo.firstName) {
        setFormError((prev) => ({
          ...prev,
          firstName: "Please enter your first name!",
        }));
        return;
      }
      if (!userInfo.lastName) {
        setFormError((prev) => ({
          ...prev,
          lastName: "Please enter your last name!",
        }));
        return;
      }
      // create user instance in database
      createUser(userInfo);
      router.replace("/(authenticated)");
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
            source={
              userInfo.picURL
                ? { uri: userInfo.picURL }
                : require("@/assets/images/ghost.png")
            }
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => handleUploadImage(phoneNumber)}
            style={tw.style(
              "absolute bottom-0 right-0 rounded-full border-[3px] border-secondary bg-undertone p-2",
            )}>
            <Ionicons name="camera-outline" size={20} color={"grey"} />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView style={tw.style("flex w-full")}>
          <TextInput
            key={"firstName"}
            onChangeText={updateFirstName}
            style={tw.style("w-full rounded-xl bg-undertone p-4")}
            placeholder="First Name (Required)"
            placeholderTextColor={"#a1a1aa"}
            autoCorrect={false}
          />
          {formError.firstName && (
            <Text style={tw.style("ml-2 mt-2 text-rose-500")}>
              {formError.firstName}
            </Text>
          )}
          <TextInput
            onChangeText={updateLastName}
            style={tw.style("mt-5 w-full rounded-xl bg-undertone p-4")}
            placeholder="Last Name (Required)"
            placeholderTextColor={"#a1a1aa"}
            autoCorrect={false}
          />
          {formError.lastName && (
            <Text style={tw.style("ml-2 mt-2 text-rose-500")}>
              {formError.lastName}
            </Text>
          )}
        </KeyboardAvoidingView>
      </View>

      <View style={tw.style("mb-10 w-[100%] items-center")}>
        <ActionButton onPress={handleSubmit}>Submit</ActionButton>
      </View>
    </View>
  );
};

export default OnboardingScreen;