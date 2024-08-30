import { AuthProvider, useAuth } from "@/context/AuthProvider";
import { Slot, useRouter, useSegments } from "expo-router";
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

    if (session && !isAuthGroup && !isFirstTimeUser) {
      router.replace("/(authenticated)");
    } else if (!session) {
      // router.replace("/verify/+18327557675");
      router.replace("/");
      // return;
      //* Dev purposes to get to onboarding screen
    } else if (session) {
      router.replace("/(onboarding)");
    }
  }, [session, initialized]);

  return <Slot />;
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default RootLayout;
