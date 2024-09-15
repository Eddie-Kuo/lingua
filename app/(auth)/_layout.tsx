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
        headerTintColor: "#E6EFF5",
        headerStyle: {
          backgroundColor: "#274560",
        },
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="phone-signup" />
      <Stack.Screen name="language-selection" />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
};

export default AuthLayout;
