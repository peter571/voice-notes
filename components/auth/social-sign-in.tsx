import { View, Text, Platform, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/theme";
import { Fontisto } from "@expo/vector-icons";
import { router } from "expo-router";
import { SocialButton } from "./social-button";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "@/lib/supabase";
import * as AppleAuthentication from "expo-apple-authentication";

GoogleSignin.configure({
  offlineAccess: true,  
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID?.toString(),
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID?.toString(),
});

export default function SocialSignIn() {

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("USER INFO:", userInfo);
      if (userInfo.data && userInfo.data.idToken) {
        const { data: { user }, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.data.idToken,
        });
        
        // User is signed in.
        if (!error && user) {
          router.replace("/");
        }
      } else {
        throw new Error("no ID token present!");
      }
    } catch (error: any) {
      console.error("GOOGLE SIGN IN ERROR: ", JSON.stringify(error, null, 2));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const appleSignIn = async () => {
    try {
        const credential = await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
        })
        // Sign in via Supabase Auth.
        if (credential.identityToken) {
          const {
            error,
            data: { user },
          } = await supabase.auth.signInWithIdToken({
            provider: 'apple',
            token: credential.identityToken,
          })
          console.log(JSON.stringify({ error, user }, null, 2))
          if (!error && user) {
            router.replace('/')
            // User is signed in.
          }
        } else {
          throw new Error('No identityToken.')
        }
      } catch (e: any) {
        console.error("APPLE SIGN IN ERROR: ", e)
        if (e.code === 'ERR_REQUEST_CANCELED') {
          // handle that the user canceled the sign-in flow
        } else {
          // handle other errors
        }
      }
  }

  return (
    <View style={styles.socialContainer}>
      <SocialButton
        icon={
          <Fontisto
            name="mobile-alt"
            size={24}
            color={theme.colors.primary.DEFAULT}
          />
        }
        text="Continue with Phone"
        color={theme.colors.primary.DEFAULT}
        backgroundColor="#6a39f410"
        onPress={() => {
          router.push("/phone");
        }}
      />
      <SocialButton
        icon={<Fontisto name="google" size={24} color="#DE3B40" />}
        text="Continue with Google"
        color="#DE3B40"
        backgroundColor="#FDF2F2"
        onPress={googleSignIn}
      />
      <SocialButton
        icon={<Fontisto name="apple" size={24} color="black" />}
        text="Continue with Apple"
        color={theme.colors.black}
        backgroundColor={theme.colors.background.input}
        onPress={appleSignIn}
        display={Platform.OS === "ios"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  socialContainer: {
    gap: theme.spacing.s4,
    padding: theme.spacing.s4,
    width: "100%",
    justifyContent: "center",
  },
});
