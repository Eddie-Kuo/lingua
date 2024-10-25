import { getUserByPhoneNumber } from "@/database/queries/user";
import useUserStore from "@/store/userStore";
import { supabase } from "@/utils/supabase";
import { Session, User } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthProps = {
  user: User | null;
  session: Session | null;
  initialized?: boolean;
  signOut?: () => void;
  userStatus: UserStatus;
};

// Initialize react context
export const AuthContext = createContext<Partial<AuthProps>>({});

// Custom hook to read the context values
export function useAuth() {
  return useContext(AuthContext);
}

type UserStatus = "New" | "Returning";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>();
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [userStatus, setUserStatus] = useState<UserStatus>("New");
  const { setUserInfo, userInfo } = useUserStore();

  useEffect(() => {
    const loadUserStatus = async () => {
      const storedStatus = await AsyncStorage.getItem("userStatus");
      if (storedStatus) {
        setUserStatus(storedStatus as UserStatus);
      }
    };

    loadUserStatus();

    // Listen for changes to authentication state
    const { data } = supabase.auth.onAuthStateChange(async (_, session) => {
      setSession(session);
      setUser(session ? session.user : null);
      setInitialized(true);

      if (session && session.user) {
        const userData = await getUserByPhoneNumber(`+${session.user.phone!}`);
        const status = userData ? "Returning" : "New";
        setUserStatus(status);
        if (status === "Returning") {
          setUserInfo(userData);
        }
        await AsyncStorage.setItem("userStatus", status);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  // Log out the user
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    initialized,
    signOut,
    userStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
