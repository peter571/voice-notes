import React from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { theme } from "@/theme";
import Fontisto from "@expo/vector-icons/Fontisto";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import Checkbox from "expo-checkbox";
import { InputField } from "@/components/input-field";
import { Button } from "@/components/button";
import { SocialButton } from "@/components/auth/social-button";
import { Footer } from "@/components/auth/footer";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "@/lib/supabase";
import { useReplaceRoute } from "@/hooks/useReplaceRoute";
import SocialSignIn from "@/components/auth/social-sign-in";

const schema = yup.object().shape({
  email: yup.string().required().email("Email must be a valid email address"),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
  terms: yup
    .boolean()
    .required()
    .oneOf([true], "You must accept the terms and conditions"),
});

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const SignUp: React.FC = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: SignUpForm) => {
    const { error, data } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setError("root", {
        message: error.message,
      });
      return;
    }
    if (data.user) {
      Alert.alert(
        "Account created successfully!",
        "Check your email to verify your account"
      );
      router.replace("/");
    }
  };

  useReplaceRoute();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <KeyboardAvoidingView style={styles.formContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <InputField
              icon={<Feather name="mail" size={24} color="black" />}
              placeholder="Enter email"
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name="email"
          rules={{ required: true }}
        />
        {errors.email && (
          <Text style={styles.textError}>{errors.email.message}</Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <InputField
              icon={<Feather name="lock" size={24} color="black" />}
              placeholder="Enter password"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name="password"
          rules={{ required: true }}
        />
        {errors.password && (
          <Text style={styles.textError}>{errors.password.message}</Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <InputField
              icon={<Feather name="lock" size={24} color="black" />}
              placeholder="Confirm password"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name="confirmPassword"
          rules={{ required: true }}
        />
        {errors.confirmPassword && (
          <Text style={styles.textError}>{errors.confirmPassword.message}</Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.termsContainer}>
              <Checkbox
                style={styles.checkbox}
                value={value}
                onValueChange={onChange}
                color={theme.colors.primary.DEFAULT}
              />
              <Text style={styles.termsText}>
                I agree with Terms & Conditions
              </Text>
            </View>
          )}
          name="terms"
          rules={{ required: true }}
        />
        {errors.terms && (
          <Text style={styles.textError}>{errors.terms.message}</Text>
        )}
        {errors.root && (
          <Text style={styles.textError}>{errors.root.message}</Text>
        )}
        <Button
          text={isSubmitting ? "Submitting..." : "Sign Up"}
          onPress={handleSubmit(onSubmit)}
        />
      </KeyboardAvoidingView>
      <Divider />
      <SocialSignIn />
      <Footer text_1="Already registered?" text_2="Sign In" />
    </SafeAreaView>
  );
};

const Header: React.FC = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>Create Account</Text>
    <Text style={styles.headerSubtitle}>
      Create your account to start managing your voice notes.
    </Text>
  </View>
);

const Divider: React.FC = () => (
  <View style={styles.dividerContainer}>
    <View style={styles.dividerLine} />
    <Text style={styles.orText}>OR</Text>
    <View style={styles.dividerLine} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.s5,
    gap: theme.spacing.s4,
    justifyContent: "space-between",
  },
  headerContainer: {
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
  textError: {
    color: theme.colors.danger.DEFAULT,
    fontSize: theme.fontSize.t3,
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
});

export default SignUp;
