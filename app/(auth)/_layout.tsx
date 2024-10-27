import React from "react";
import { Stack, useRouter } from "expo-router";

const AuthLayout = () => {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        title: "",
        headerBackTitle: "",
        headerShadowVisible: false,
        headerTintColor: "#131313",
        headerStyle: {
          backgroundColor: "#131313",
        },
      }}>
      <Stack.Screen name="phone-signup" />
      <Stack.Screen name="language-selection" />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
};

export default AuthLayout;
