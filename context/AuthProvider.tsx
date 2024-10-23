import { getUserByPhoneNumber } from "@/database/queries/user";
import { usePersonalDetails } from "@/hooks/useUser";
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
  console.log("🚀 ~ AuthProvider ~ session:", session);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [userStatus, setUserStatus] = useState<UserStatus>("New");

  useEffect(() => {
    const loadUserStatus = async () => {
      const storedStatus = await AsyncStorage.getItem("userStatus");
      console.log("🚀 ~ loadUserStatus ~ storedStatus:", storedStatus);
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
        await AsyncStorage.setItem("userStatus", status);
        // Redirect logic here
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   if (!user) {
  //     return;
  //   }
  //   const getUserStatus = async () => {
  //     const data = await getUserByPhoneNumber(phoneNumber);
  //     setUserInfo(data);
  //     // user is in database
  //     if (data) {
  //       setUserStatus("Returning");
  //     } else {
  //       setUserStatus("New");
  //     }
  //   };
  //   getUserStatus();
  // }, [phoneNumber]);

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
