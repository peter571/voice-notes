import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { theme } from "@/theme";

interface InputFieldProps extends React.ComponentProps<typeof TextInput> {
  icon?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = (props) => (
  <View style={styles.inputContainer}>
    {props.icon}
    <TextInput
      {...props}
      autoCapitalize="none"
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
    width: "100%",
  },
});
