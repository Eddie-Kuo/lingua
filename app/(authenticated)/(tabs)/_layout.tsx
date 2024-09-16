import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/colors";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerTitle: "Lingua",
        headerTitleAlign: "left", // may not with with iOS according to docs
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 32,
          color: Colors.highlightAccent,
        },
        headerStyle: {
          height: 120,
          backgroundColor: Colors.secondary,
        },
      }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="chats" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
};

export default TabsLayout;
