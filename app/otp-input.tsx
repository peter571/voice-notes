import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from '@/theme'
import Header from '@/components/header'
import { InputField } from '@/components/input-field'
import { Button } from '@/components/button'
import { Footer } from '@/components/auth/footer'

export default function OtpInput() {
  return (
    <SafeAreaView style={{
        paddingHorizontal: theme.spacing.s5,
        gap: theme.spacing.s8,
        flex: 1,
    }}>
        <Header title='Access Account' />
      <Text style={{
        fontFamily: theme.fontFamily.heading.Roboto.regular,
        fontSize: theme.fontSize.t4,
        textAlign: 'center',
      }}>Enter your OTP to proceed</Text>
      <InputField placeholder='Enter OTP' />
      <Button text='Verify' onPress={() => {}} />
      <Footer text_1='Remember your password?' text_2='Sign In' />  
    </SafeAreaView>
  )
}