import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { tw } from "@/utils/tailwind";
import { SafeAreaView } from "react-native-safe-area-context";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        tabBarLabel: "",
        headerTitle: "Lingua",
        headerTitleAlign: "left", // may not with with iOS according to docs
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 32,
          color: Colors.highlightAccent,
        },
        headerStyle: {
          height: 120,
          backgroundColor: Colors.primary,
        },
        tabBarStyle: {
          backgroundColor: Colors.secondary,
          borderTopColor: Colors.secondary,
          height: 90,
          paddingBottom: 5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} icon={"home"} />
          ),
          header: () => (
            <SafeAreaView style={tw.style("relative h-28 bg-primary")}>
              <View
                style={tw.style(
                  "absolute bottom-3 w-full flex-row items-center justify-between px-5",
                )}>
                <Text
                  style={tw.style(
                    "text-3xl font-semibold tracking-wider text-highlightAccent",
                  )}>
                  Home
                </Text>
                <View style={tw.style("flex-row gap-4")}>
                  <Ionicons
                    color={Colors.highlightAccent}
                    name={"person-add-outline"}
                    size={24}
                  />
                  <Ionicons
                    color={Colors.highlightAccent}
                    name={"notifications-outline"}
                    size={24}
                  />
                </View>
              </View>
            </SafeAreaView>
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              focused={focused}
              icon={"chatbubble-ellipses"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} icon={"settings"} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const TabIcon = ({ focused, icon }: any) => {
  return (
    <View style={tw.style("items-center gap-1")}>
      <Ionicons
        color={Colors.highlightAccent}
        size={28}
        name={focused ? icon : `${icon}-outline`}
      />
    </View>
  );
};
