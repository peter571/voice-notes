import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { theme } from "@/theme";

interface InputFieldProps {
  icon: React.ReactNode;
  placeholder: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  icon,
  placeholder,
}) => (
  <View style={styles.inputContainer}>
    {icon}
    <TextInput
      placeholder={placeholder}
      cursorColor={theme.colors.black}
      style={styles.inputText}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background.input,
    paddingHorizontal: theme.spacing.s4,
    paddingVertical: theme.spacing.s3,
    borderRadius: theme.spacing.s1,
    gap: theme.spacing.s2,
    width: "100%",
  },
  inputText: {
    fontFamily: theme.fontFamily.body.Montserrat.regular,
    fontSize: theme.fontSize.t4,
  },
});
