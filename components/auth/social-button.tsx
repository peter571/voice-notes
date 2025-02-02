import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { theme } from "@/theme";

interface SocialButtonProps {
  icon: React.ReactNode;
  text: string;
  color: string;
  backgroundColor: string;
  onPress: () => void;
  display?: boolean;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  text,
  color,
  backgroundColor,
  onPress,
  display = true,
}) => {
  if (!display) return null;

  return (
    <Pressable
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={[styles.buttonText, { color }]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.s4,
    borderRadius: theme.spacing.s1,
    width: "100%",
    justifyContent: "center",
    gap: theme.spacing.s2,
  },
  buttonText: {
    fontFamily: theme.fontFamily.body.Montserrat.regular,
    fontSize: theme.fontSize.t4,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
