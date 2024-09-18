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
          tabBarIcon: ({ focused }) => (
            <NavigationIcon focused={focused} icon={"home"} size={28} />
          ),
          header: () => (
            <CustomHeader
              name={"Home"}
              navLinks={["addFriend", "notifications"]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          tabBarIcon: ({ focused }) => (
            <NavigationIcon focused={focused} icon={"chat"} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <NavigationIcon focused={focused} icon={"settings"} size={28} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const CustomHeader = ({
  name,
  navLinks,
}: {
  name: string;
  navLinks: string[];
}) => {
  return (
    <SafeAreaView style={tw.style("relative h-28 bg-primary")}>
      <View
        style={tw.style(
          "absolute bottom-3 w-full flex-row items-center justify-between px-5",
        )}>
        <Text
          style={tw.style(
            "text-3xl font-semibold tracking-wider text-highlightAccent",
          )}>
          {name}
        </Text>
        <View style={tw.style("flex-row gap-4")}>
          {navLinks.map((link) => (
            <NavigationIcon
              key={link}
              icon={link}
              href={"/"}
              focused={false}
              size={24}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const NavigationIcon = ({
  focused,
  icon,
  size,
  href,
}: {
  focused: boolean;
  icon: string;
  size: number;
  href?: string;
}) => {
  // This has something to do with the ternary operation in the name prop with the outline ending. It works as expected but cant fix the error
  const iconName: any = IconNames[icon];
  return (
    <View style={tw.style("items-center gap-1")}>
      <Ionicons
        color={Colors.highlightAccent}
        size={size}
        name={focused ? iconName : `${iconName}-outline`}
      />
    </View>
  );
};

const IconNames: Record<string, keyof typeof Ionicons.glyphMap> = {
  addFriend: "person-add",
  notifications: "notifications",
  settings: "settings",
  home: "home",
  chat: "chatbubble-ellipses",
};
