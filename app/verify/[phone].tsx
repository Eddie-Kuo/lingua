import { View, Text } from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { tw } from "@/utils/tailwind";
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { supabase } from "@/utils/supabase";
import { getUserByPhoneNumber } from "@/database/queries/user";

const PhoneVerificationScreen = () => {
  const { phone, language } = useLocalSearchParams<{
    phone: string;
    language: string;
  }>();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (code.length === 6) {
      verifyCode();
    }
  }, [code]);

  const verifyCode = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.verifyOtp({
        phone: phone,
        token: code,
        type: "sms",
      });

      // after verification - we want to check if user instance is in database
      const userStatus = await getUserByPhoneNumber(session!.user!.phone!);
      if (userStatus?.error === "Phone number not in database") {
        // if this is the first time a user is signing in, we want to create a database instance
        // route the user to onboarding
        router.replace({
          pathname: "/(onboarding)",
          params: { language: language },
        });
      }

      if (userStatus?.success) {
        // if the user is a returning user we want to directly route them to dashboard
        router.replace("/(authenticated)");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error: ", error.message);
      }
    }
  };

  return (
    <View style={tw.style("flex-1 gap-3 bg-secondary p-3")}>
      <Text style={tw.style("text-5xl font-semibold text-highlightAccent")}>
        6-digit code
      </Text>
      <Text style={tw.style("text-undertone")}>
        Code sent to {phone}. Please enter the code to verify your account!
      </Text>

      <CodeField
        value={code}
        {...props}
        rootStyle={{
          marginVertical: 20,
          marginLeft: "auto",
          marginRight: "auto",
          gap: 12,
        }}
        onChangeText={setCode}
        cellCount={6}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={tw.style(
                "h-16 flex-1 items-center justify-center rounded-lg bg-undertone",
              )}>
              <Text style={tw.style("text-2xl font-bold")}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
            {index === 2 ? <View key={`separator-${index}`} /> : null}
          </Fragment>
        )}></CodeField>
    </View>
  );
};

export default PhoneVerificationScreen;
