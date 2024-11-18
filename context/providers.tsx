import { AuthProvider } from "./AuthProvider";
import TanstackProvider from "./TanstackProvider";
import Toast from "react-native-toast-message";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TanstackProvider>
      <AuthProvider>
        {children}
        <Toast />
      </AuthProvider>
    </TanstackProvider>
  );
}
