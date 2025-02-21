import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/theme";
import { InputField } from "@/components/input-field";
import { Footer } from "@/components/auth/footer";
import { Button } from "@/components/button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Feather } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";

const schema = yup.object().shape({
  email: yup.string().required().email("Email must be a valid email address"),
});

type ForgotPasswordForm = {
  email: string;
};

export default function ForgotPassword() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: ForgotPasswordForm) => {
    // Add
    try {
      console.log("FORM DATA: ", formData);
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        formData.email
      );
      if (error) {
        setError("email", {
          message: error.message,
        });
        return;
      }
      console.log("DATA", JSON.stringify(data, null, 2));
      Alert.alert(
        "Success",
        "Please check your email for the reset password link"
      );
    } catch (error) {}
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: theme.spacing.s4,
        alignItems: "center",
        gap: theme.spacing.s8,
      }}
    >
      <Text
        style={{
          fontFamily: theme.fontFamily.heading.Roboto.medium,
          fontSize: theme.fontSize.t8,
        }}
      >
        Find account
      </Text>
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
      <Button
        text={isSubmitting ? "Submitting..." : "Send"}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      />
      <View
        style={{
          alignSelf: "auto",
        }}
      >
        <Footer text_1="Remember your password?" text_2="Sign In" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textError: {
    color: theme.colors.danger.DEFAULT,
    fontSize: theme.fontSize.t3,
  },
});
