import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { tw } from "@/utils/tailwind";
import { Link, useRouter } from "expo-router";
import ActionButton from "@/components/ActionButton";
import { supabase } from "@/utils/supabase";

const SignUp = () => {
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
        pathname: "/verify/[phone]",
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
          Let's get started!
        </Text>
        <Text style={tw.style("text-undertone")}>
          Enter your phone number. We will send you a confirmation code there
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

        <Link href={"/"} replace asChild style={tw.style("flex-row gap-1")}>
          <Pressable>
            <Text style={tw.style("text-white")}>Already have an account?</Text>
            <Text style={tw.style("font-semibold text-highlightAccent")}>
              Log In
            </Text>
          </Pressable>
        </Link>
        <View style={tw.style("flex-1")} />

        <View style={tw.style("absolute bottom-10 w-[100%] items-center")}>
          <ActionButton onPress={handleSignIn}>Sign In</ActionButton>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
