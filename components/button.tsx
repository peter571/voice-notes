// Button.tsx

import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { theme } from "@/theme";

interface ButtonProps {
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  backgroundColor = theme.colors.primary.DEFAULT,
  textColor = theme.colors.white,
}) => (
  <Pressable
    style={[styles.button, { backgroundColor }]}
    onPress={onPress}
  >
    <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    padding: theme.spacing.s4,
    borderRadius: theme.spacing.s1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: theme.fontFamily.body.Montserrat.regular,
    fontSize: theme.fontSize.t4,
    textAlign: "center",
  },
});
