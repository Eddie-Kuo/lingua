import React from "react";
import { Stack } from "expo-router";

const VerificationLayout = () => {
  return (
    <Stack
      screenOptions={{
        title: "",
        headerBackTitle: "",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#274560",
        },
      }}
    />
  );
};

export default VerificationLayout;
