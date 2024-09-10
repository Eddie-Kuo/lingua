import { AuthProvider, useAuth } from "@/context/AuthProvider";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

const InitialLayout = () => {
  const { session, initialized, isFirstTimeUser } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!initialized) {
      return;
    }

    // Check if the path is in the authenticated group
    const isAuthGroup = segments[0] === "(authenticated)";

    console.log("SESSION APP LAYOUT", isFirstTimeUser);

    if (session && !isAuthGroup && isFirstTimeUser) {
      router.replace("/(auth)/onboarding/signup");
      // router.replace("/(authenticated)");
    } else if (!session) {
      router.replace("/(auth)");
    }
  }, [session, initialized]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default RootLayout;
