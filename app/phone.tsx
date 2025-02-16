import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/button";
import Header from "@/components/header";
import { theme } from "@/theme";
import { router } from "expo-router";
import PhoneInput, { ICountry } from "react-native-international-phone-number";

export default function Phone() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState<ICountry | null>(null);

  const submit = async () => {
    const cleanedPhoneNumber =
      country?.callingCode + phoneNumber.replace(/[^0-9]/g, "");
    console.log("Phone Number", cleanedPhoneNumber);
    return;
    router.push("/otp-input");
  };

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: theme.spacing.s5,
        gap: theme.spacing.s8,
      }}
    >
      <Header title="Phone Sign In" />
      <View>
        <PhoneInput
          value={phoneNumber}
          onChangePhoneNumber={setPhoneNumber}
          selectedCountry={country}
          onChangeSelectedCountry={setCountry}
          phoneInputStyles={{
            container: {
              backgroundColor: theme.colors.background.input,
              borderColor: "transparent",
              borderRadius: theme.spacing.s1,
            },
            flagContainer: {
              backgroundColor: "transparent",
            },
            divider: {
              backgroundColor: "transparent",
            },
            input: {
              color: theme.colors.black,
              left: -60,
              fontFamily: theme.fontFamily.body.Montserrat.regular,
              fontSize: 14,
            },
            caret: {
              color: "transparent",
            },
            callingCode: {
              color: theme.colors.black,
              left: -40,
              fontFamily: theme.fontFamily.body.Montserrat.regular,
            },
          }}
          defaultCountry="KE"
          placeholder="Phone Number"
        />
      </View>
      <Button text="Next" onPress={submit} />
    </SafeAreaView>
  );
}
