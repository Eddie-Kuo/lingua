import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { tw } from "@/utils/tailwind";
import { useAuth } from "@/context/AuthProvider";

const HomeScreen = () => {
  const [session, setSession] = useState<Session | null>(null);
  const { signOut } = useAuth();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View style={tw.style("flex-1 items-center justify-center bg-primary")}>
      {session && session.user && <Text>{session.user.id}</Text>}
      <Button title="sign out" onPress={signOut}></Button>
      <Text>Hello World</Text>
    </View>
  );
};

export default HomeScreen;
