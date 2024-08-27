import { View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { tw } from "@/utils/tailwind";

const Login = () => {
  return (
    <View style={tw.style("items-center justify-center flex-1 bg-undertone")}>
      <Text>Login</Text>
    </View>
  );
};

export default Login;
