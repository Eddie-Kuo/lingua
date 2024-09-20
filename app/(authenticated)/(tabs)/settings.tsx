import { View, Button } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthProvider";

const SettingScreen = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Button title="sign out" onPress={signOut}></Button>
    </View>
  );
};

export default SettingScreen;
