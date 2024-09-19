import React from "react";
import { Stack } from "expo-router";
import { Colors } from "@/constants/colors";

const AuthenticatedLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="friends"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "friends",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "notifications",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
    </Stack>
  );
};

export default AuthenticatedLayout;
