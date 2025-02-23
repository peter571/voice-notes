import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/theme";
import Header from "@/components/header";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";

export default function Profile() {
  const { user, isLoading } = useUser();

  const signout = async () => {
    await supabase.auth.signOut();
  };

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: theme.spacing.s5,
        gap: theme.spacing.s4,
      }}
    >
      <Header title="Profile" />
      <Text
        style={{
          fontSize: theme.fontSize.t6,
          fontFamily: theme.fontFamily.body.Montserrat.regular,
          color: "#323743FF",
        }}
      >
        {user?.email}
      </Text>
      <Text
        style={{
          color: theme.colors.primary.DEFAULT,
          fontSize: theme.fontSize.t5,
          fontFamily: theme.fontFamily.body.Montserrat.regular,
          alignSelf: "flex-start",
          paddingVertical: theme.spacing.s2,
          paddingRight: theme.spacing.s4,
        }}
        onPress={signout}
      >
        Sign out
      </Text>
    </SafeAreaView>
  );
}
