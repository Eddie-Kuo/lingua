import { Slot } from "expo-router";

const InitialLayout = () => {
  return <Slot />;
};

const RootLayout = () => {
  return <InitialLayout />;
};

export default RootLayout;
