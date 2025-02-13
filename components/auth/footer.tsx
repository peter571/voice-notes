import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/theme";
import { router, usePathname } from "expo-router";

export const Footer: React.FC<{
  text_1: string;
  text_2: string;
}> = ({ text_1, text_2 }) => {
  const path = usePathname();

  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>{text_1}</Text>
      <Text
        style={styles.footerLink}
        onPress={() => {
          // If screen is sign-up, redirect to sign-in screen.

          if (path == "/sign-up") {
            router.push("/sign-in");
          } else if (path == "/sign-in") {
            router.push("/sign-up");
          } else if (path == "/forgot-password") {
            router.push("/sign-in");
          } else {
            router.push("/sign-in");
          }
        }}
      >
        {text_2}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.s2,
  },
  footerText: {
    fontFamily: theme.fontFamily.body.Montserrat.regular,
    fontSize: theme.fontSize.t4,
    color: theme.colors.black,
  },
  footerLink: {
    fontFamily: theme.fontFamily.body.Montserrat.medium,
    fontSize: theme.fontSize.t4,
    color: theme.colors.primary.DEFAULT,
  },
});
