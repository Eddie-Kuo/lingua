import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Tabs, useRouter } from "expo-router";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { tw } from "@/utils/tailwind";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconNames } from "@/constants/icons";
import { ModalRoutes } from "@/constants/routes";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        tabBarLabel: "",
        // headerShown: false,
        // headerTitle: "Lingua",
        // headerTitleAlign: "left", // may not with with iOS according to docs
        // headerTitleStyle: {
        //   fontWeight: "bold",
        //   fontSize: 32,
        //   color: Colors.highlightAccent,
        // },
        // headerStyle: {
        //   height: 120,
        //   backgroundColor: Colors.primary,
        // },
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
            <BottomTabIcon focused={focused} icon={"home"} />
          ),
          header: () => (
            <CustomHeader
              name={"Home"}
              navLinks={["friends", "notifications"]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          tabBarIcon: ({ focused }) => (
            <BottomTabIcon focused={focused} icon={"chat"} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <BottomTabIcon focused={focused} icon={"settings"} />
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
            <HeaderNavigationIcon key={link} icon={link} href={link} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const BottomTabIcon = ({
  icon,
  focused,
}: {
  icon: string;
  focused: boolean;
}) => {
  const iconName = focused ? IconNames[icon] : IconNames[`${icon}Outline`];
  return <Ionicons size={28} name={iconName} color={Colors.highlightAccent} />;
};

const HeaderNavigationIcon = ({
  icon,
  href,
}: {
  icon: string;
  href: string;
}) => {
  const router = useRouter();
  const iconName = IconNames[icon];
  const route = ModalRoutes[href];

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: route,
          params: { modal: href },
        })
      }>
      <Ionicons color={Colors.highlightAccent} name={iconName} size={24} />
    </TouchableOpacity>
  );
};
