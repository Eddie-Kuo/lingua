import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { tw } from "@/utils/tailwind";

const Home = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View style={tw.style("flex-1 items-center justify-center")}>
      {session && session.user && <Text>{session.user.id}</Text>}
    </View>
  );
};

export default Home;
