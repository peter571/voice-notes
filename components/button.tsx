// Button.tsx

import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { theme } from "@/theme";

interface ButtonProps extends React.ComponentProps<typeof Pressable> {
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
}

export const Button: React.FC<ButtonProps> = (props) => (
  <Pressable
    {...props}
    style={[
      styles.button,
      {
        backgroundColor: props.backgroundColor ?? theme.colors.primary.DEFAULT,
      },
    ]}
    onPress={props.onPress}
  >
    <Text
      style={[
        styles.buttonText,
        { color: props.textColor ?? theme.colors.white },
      ]}
    >
      {props.text}
    </Text>
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
