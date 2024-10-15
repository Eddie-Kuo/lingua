import { Suspense } from "react";
import { AuthProvider } from "./AuthProvider";
import TanstackProvider from "./TanstackProvider";
import { Text } from "react-native";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TanstackProvider>{children}</TanstackProvider>
    </AuthProvider>
  );
}
