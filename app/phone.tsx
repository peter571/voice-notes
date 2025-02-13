import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputField } from "@/components/input-field";
import { Button } from "@/components/button";
import Header from "@/components/header";
import { theme } from "@/theme";
import { router } from "expo-router";

export default function Phone() {
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: theme.spacing.s5,
        gap: theme.spacing.s8,
      }}
    >
      <Header title="Phone Sign In" />
      <InputField placeholder="Enter phone" />
      <Button text="Next" onPress={() => router.push("/otp-input")} />
    </SafeAreaView>
  );
}
