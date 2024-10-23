import { useAuth } from "@/context/AuthProvider";
import Providers from "@/context/providers";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

const InitialLayout = () => {
  const { session, initialized, userStatus } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!initialized) {
      return;
    }
    // Check if the path is in the authenticated group
    const inAuthGroup = segments[0] === "(authenticated)";

    // perform a check to see if user is in the database
    if (session && !inAuthGroup) {
      if (userStatus === "Returning") {
        router.navigate("/(authenticated)/(tabs)/home");
      }

      if (userStatus === "New") {
        router.navigate("/(auth)/language-selection");
      }
    }

    if (!session) {
      router.navigate("/");
    }
  }, [session, initialized, userStatus]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <Providers>
      <InitialLayout />
    </Providers>
  );
};

export default RootLayout;
