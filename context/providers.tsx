import { AuthProvider } from "./AuthProvider";
import TanstackProvider from "./TanstackProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TanstackProvider>{children}</TanstackProvider>
    </AuthProvider>
  );
}
