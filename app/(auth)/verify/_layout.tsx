import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const VerificationLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="[phone]" />
    </Stack>
  );
};

export default VerificationLayout;
