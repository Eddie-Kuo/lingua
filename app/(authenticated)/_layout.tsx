import React from "react";
import { Link, Stack } from "expo-router";
import { Colors } from "@/constants/colors";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AuthenticatedLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="(modals)/friends"
        options={{
          ...modalHeaderOptions,
          headerTitle: "Add Friends",
        }}
      />
      <Stack.Screen
        name="(modals)/notifications"
        options={{
          ...modalHeaderOptions,
          headerTitle: "Notifications",
        }}
      />
    </Stack>
  );
};

export default AuthenticatedLayout;

const modalHeaderOptions: any = {
  presentation: "modal",
  headerShown: true,
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: Colors.secondary,
  },
  headerTitleStyle: { color: "white" },
  headerRight: () => (
    <Link asChild href="../">
      <TouchableOpacity>
        <Ionicons name="close" color="white" size={24} />
      </TouchableOpacity>
    </Link>
  ),
};
