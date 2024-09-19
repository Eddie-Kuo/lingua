import React from "react";
import { Stack } from "expo-router";

const AuthenticatedLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", headerShown: true }}
      />
    </Stack>
  );
};

export default AuthenticatedLayout;
