import { View, Text } from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { tw } from "@/utils/tailwind";
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { supabase } from "@/utils/supabase";
import useUserStore from "@/store/userStore";

const PhoneVerificationScreen = () => {
  const { phone } = useLocalSearchParams<{
    phone: string;
  }>();
  const [code, setCode] = useState("");
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  const { updateUserInfo } = useUserStore();

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

      if (!session) {
        //Todo: handle what happens when the code enters is wrong
        return;
      }

      // OTP was verified - set phone number in global store
      updateUserInfo({ phone_number: phone });
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error: ", error.message);
      }
    }
  };

  return (
    <View style={tw.style("flex-1 gap-3 bg-primary p-3")}>
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
