import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSession } from "@/context/ctx";
import { theme } from "@/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputField } from "@/components/input-field";
import { Fontisto, Feather } from "@expo/vector-icons";
import { Button } from "@/components/button";
import { Footer } from "@/components/auth/footer";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useReplaceRoute } from "@/hooks/useReplaceRoute";

const schema = yup.object().shape({
  //Email must be a valid email address
  email: yup.string().required().email("Email must be a valid email address"),
  //Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});

type SignInForm = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: SignInForm) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
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
        router.replace("/");
      }
    } catch (error) {}
  };

  useReplaceRoute();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Sign In</Text>
      </View>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <InputField
              icon={<Fontisto name="email" size={24} color="black" />}
              placeholder="Your email address"
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
              placeholder="Password"
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              secureTextEntry
            />
          )}
          name="password"
          rules={{ required: true }}
        />
        {errors.password && (
          <Text style={styles.textError}>{errors.password.message}</Text>
        )}
        <Text
          style={styles.forgotPasswordText}
          onPress={() => {
            router.push("/forgot-password");
          }}
        >
          Forgot password?
        </Text>
        {errors.root && (
          <Text style={styles.textError}>{errors.root.message}</Text>
        )}
        <Button
          text={isSubmitting ? "Submitting..." : "Sign In"}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        />
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
  textError: {
    color: theme.colors.danger.DEFAULT,
    fontSize: theme.fontSize.t3,
  },
});

export default SignIn;
