import { View, Text, Pressable } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { theme } from "@/theme";

interface HeaderProps {
  title: string;
  rightItem?: React.ReactNode;
}

export default function Header(props: HeaderProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",

        alignItems: "center",
      }}
    >
      <Pressable onPress={() => router.back()}>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={24}
          color="black"
        />
      </Pressable>
      <View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            fontFamily: theme.fontFamily.heading.Roboto.medium,
          }}
        >
          {props.title}
        </Text>
      </View>
      <View>{props.rightItem}</View>
    </View>
  );
}
