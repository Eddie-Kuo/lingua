import React from "react";
import { Stack } from "expo-router";

const OnboardingLayout = () => {
  return (
    <Stack
      screenOptions={{
        title: "",
        headerBackTitle: "",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#274560",
        },
      }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default OnboardingLayout;
