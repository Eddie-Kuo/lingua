import React from "react";
import { Stack, useRouter } from "expo-router";

const PublicLayout = () => {
  const router = useRouter();
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
      <Stack.Screen name="signup" />
    </Stack>
  );
};

export default PublicLayout;
