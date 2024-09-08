import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { tw } from "@/utils/tailwind";
import { useRouter } from "expo-router";
import ActionButton from "@/components/ActionButton";
import { supabase } from "@/utils/supabase";

const PhoneSignUpScreen = () => {
  const [phone, setPhone] = useState<string>("");
  const [areaCode, setAreaCode] = useState<string>("+1");

  const router = useRouter();

  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

  const handleSignIn = async () => {
    const fullPhoneNumber = `${areaCode}${phone}`;

    try {
      const { data: session } = await supabase.auth.signInWithOtp({
        phone: fullPhoneNumber,
      });

      router.push({
        pathname: "/(auth)/verify/[phone]",
        params: { phone: fullPhoneNumber },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error: ", error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={tw.style("flex-1 items-center bg-secondary")}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={tw.style("flex-1 gap-4 p-3")}>
        <Text style={tw.style("text-5xl font-semibold text-highlightAccent")}>
          Time to Verify!
        </Text>
        <Text style={tw.style("text-lg text-undertone")}>
          Enter your phone number. Whether you're a new or returning user, we
          will send you a confirmation code to verify your device.
        </Text>
        <View style={tw.style("mt-4 flex-row gap-3")}>
          <TextInput
            value={areaCode}
            style={tw.style("rounded-xl bg-white p-5 text-xl font-semibold")}
            placeholder="+1"
            keyboardType="numeric"
            placeholderTextColor="grey"
          />
          <TextInput
            value={phone}
            onChangeText={(text: string) => setPhone(text)}
            style={tw.style(
              "flex-1 rounded-xl bg-white p-6 text-xl font-semibold",
            )}
            placeholder="Mobile number"
            keyboardType="numeric"
            placeholderTextColor="grey"
          />
        </View>

        <View style={tw.style("absolute bottom-10 w-[100%] items-center")}>
          <ActionButton onPress={handleSignIn}>Request Code</ActionButton>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PhoneSignUpScreen;
