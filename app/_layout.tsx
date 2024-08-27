import { AuthProvider, useAuth } from "@/context/AuthProvider";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

const InitialLayout = () => {
  const { session, initialized } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!initialized) {
      return;
    }

    // Check if the path is in the authenticated group
    const isAuthGroup = segments[0] === "(authenticated)";

    if (session && !isAuthGroup) {
      router.replace("/(authenticated)");
    } else if (!session) {
      // router.replace("/verify/+18327557675");
      router.replace("/(public)/signup");
      // return;
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
