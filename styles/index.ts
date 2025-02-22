import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  title: {
    fontFamily: theme.fontFamily.body.Montserrat.bold,
    fontSize: theme.fontSize.t6,
    color: "#171A1FFF",
  },
  paragraph: {
    fontFamily: theme.fontFamily.body.Montserrat.regular,
    fontSize: theme.fontSize.t4,
    color: theme.colors.black,
  },
});
