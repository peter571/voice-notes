import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/theme";
import { InputField } from "@/components/input-field";
import { Footer } from "@/components/auth/footer";
import { Button } from "@/components/button";

export default function ForgotPassword() {
  return (
    <SafeAreaView style={{
      flex: 1,
      padding: theme.spacing.s4,
      alignItems: "center",
      gap: theme.spacing.s8,
    }}>
      <Text
        style={{
          fontFamily: theme.fontFamily.heading.Roboto.medium,
          fontSize: theme.fontSize.t8,
        }}
      >
        Find account
      </Text>
      <InputField placeholder="Enter email or phone"  />
      <Button text="Send" onPress={() => {}} />
      <View style={{
        alignSelf: "auto"
      }}>
      <Footer text_1="Remember your password?" text_2="Sign In" />
      </View>
    </SafeAreaView>
  );
}
