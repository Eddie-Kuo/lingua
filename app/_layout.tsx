import { AuthProvider, useAuth } from "@/context/AuthProvider";
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
    const isAuthGroup = segments[0] === "(authenticated)";

    if (session && !isAuthGroup && userStatus === "Returning") {
      // router.replace("/(auth)/onboarding/signup");
      router.replace("/(authenticated)");
    } else if (session && userStatus === "New") {
      router.replace("/(auth)/onboarding");
    } else if (!session) {
      router.replace("/(auth)");
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
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default RootLayout;
