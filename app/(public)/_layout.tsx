import React from "react";
import { Stack, useRouter } from "expo-router";

const PublicLayout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="signup"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#274560",
          },
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
