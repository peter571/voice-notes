import React from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { theme } from "@/theme";
import Fontisto from "@expo/vector-icons/Fontisto";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import Checkbox from "expo-checkbox";
import { InputField } from "@/components/input-field";
import { Button } from "@/components/button";
import { SocialButton } from "@/components/auth/social-button";
import { router } from "expo-router";
import { Footer } from "@/components/auth/footer";

const Header: React.FC = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>Create Account</Text>
    <Text style={styles.headerSubtitle}>
      Create your account to start managing your voice notes.
    </Text>
  </View>
);

const TermsAndConditions: React.FC = () => (
  <View style={styles.termsContainer}>
    <Checkbox
      style={styles.checkbox}
      value={true}
      onValueChange={() => {}}
      color={theme.colors.primary.DEFAULT}
    />
    <Text style={styles.termsText}>I agree with Terms & Conditions</Text>
  </View>
);

const Divider: React.FC = () => (
  <View style={styles.dividerContainer}>
    <View style={styles.dividerLine} />
    <Text style={styles.orText}>OR</Text>
    <View style={styles.dividerLine} />
  </View>
);

const SignUp: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <KeyboardAvoidingView style={styles.formContainer}>
        <InputField
          icon={<Fontisto name="email" size={24} color="black" />}
          placeholder="Your email address"
        />
        <InputField
          icon={<Feather name="lock" size={24} color="black" />}
          placeholder="Create a password"
        />
        <TermsAndConditions />
        <Button text="Sign Up" onPress={() => {}} />
      </KeyboardAvoidingView>
      <Divider />
      <View style={styles.socialContainer}>
        <SocialButton
          icon={<Fontisto name="google" size={24} color="#DE3B40" />}
          text="Continue with Google"
          color="#DE3B40"
          backgroundColor="#FDF2F2"
          onPress={() => {}}
        />
        <SocialButton
          icon={<Fontisto name="apple" size={24} color="black" />}
          text="Continue with Apple"
          color={theme.colors.black}
          backgroundColor={theme.colors.background.input}
          onPress={() => {}}
          display={Platform.OS === "ios"}
        />
      </View>
      <Footer text_1="Already registered?" text_2="Sign In" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.s5,
    gap: theme.spacing.s4,
    justifyContent: "space-between",
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    gap: theme.spacing.s5,
  },
  headerTitle: {
    fontFamily: theme.fontFamily.heading.Roboto.bold,
    fontSize: theme.fontSize.t8,
    color: theme.colors.black,
    textAlign: "center",
  },
  headerSubtitle: {
    fontFamily: theme.fontFamily.body.Montserrat.regular,
    fontSize: theme.fontSize.t4,
    color: theme.colors.black,
    textAlign: "center",
  },
  formContainer: {
    justifyContent: "center",
    gap: theme.spacing.s5,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.s2,
    marginVertical: theme.spacing.s3,
  },
  checkbox: {},
  termsText: {
    fontFamily: theme.fontFamily.body.Montserrat.regular,
    fontSize: theme.fontSize.t3,
    color: theme.colors.black,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.s2,
    justifyContent: "center",
    flex: 1,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#BDC1CAFF",
  },
  orText: {
    fontFamily: theme.fontFamily.body.Montserrat.regular,
    fontSize: theme.fontSize.t3,
    color: "#BDC1CAFF",
  },
  socialContainer: {
    gap: theme.spacing.s4,
    padding: theme.spacing.s4,
    width: "100%",
    justifyContent: "center",
  },
});

export default SignUp;
