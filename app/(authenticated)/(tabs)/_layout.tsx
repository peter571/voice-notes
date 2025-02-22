import { theme } from "@/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary.DEFAULT,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "create",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="sticky-note" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
