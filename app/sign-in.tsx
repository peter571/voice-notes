import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSession } from "@/context/ctx";
import { theme } from "@/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputField } from "@/components/input-field";
import { Fontisto, Feather } from "@expo/vector-icons";
import { Button } from "@/components/button";
import { Footer } from "@/components/auth/footer";
import { useRouter } from "expo-router";

const SignIn: React.FC = () => {
  const { signIn } = useSession();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Sign In</Text>
      </View>

      <View style={styles.formContainer}>
        <InputField
          icon={<Fontisto name="email" size={24} color="black" />}
          placeholder="Your email address"
        />
        <InputField
          icon={<Feather name="lock" size={24} color="black" />}
          placeholder="Your password"
        />
        <Text
          style={styles.forgotPasswordText}
          onPress={() => {
            router.push("/forgot-password");
          }}
        >
          Forgot password?
        </Text>
        <Button text="Sign In" onPress={signIn} />
      </View>
      <Footer text_1="Don't have an account?" text_2="Sign Up" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.s5,
    alignItems: "center",
    gap: theme.spacing.s4,
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerText: {
    fontFamily: theme.fontFamily.heading.Roboto.bold,
    fontSize: theme.fontSize.t8,
  },
  formContainer: {
    flex: 3,
    width: "100%",
    gap: theme.spacing.s4,
  },
  forgotPasswordText: {
    fontFamily: theme.fontFamily.body.Montserrat.medium,
    fontSize: theme.fontSize.t4,
    color: theme.colors.primary.DEFAULT,
    marginVertical: theme.spacing.s3,
  },
});

export default SignIn;
