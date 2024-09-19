import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Modal = () => {
  const { modal } = useLocalSearchParams<{ modal: string }>();

  return (
    <View>
      <Text>{modal}</Text>
    </View>
  );
};

export default Modal;
