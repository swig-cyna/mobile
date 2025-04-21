import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "expo-router"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Keyboard, TouchableWithoutFeedback, View } from "react-native"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Text } from "~/components/ui/text"
import { SignInFormData, signinSchema } from "../schemas/signin"
import { signIn } from "../utils/authClient"
import EmailVerification from "./EmailVerification"
import TwoFactorCard from "./TwoFactorCard"

const SingIn = () => {
  const [error, setError] = useState<string | null>(null)
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  const [isSigninComplete, setIsSigninComplete] = useState(false)
  const [showTwoFactorCard, setShowTwoFactorCard] = useState(false)
  const [showEmailVerification, setShowEmailVerification] = useState(false)

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signinSchema),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form

  async function onSubmit(values: SignInFormData) {
    try {
      const { error: signInError } = await signIn.email(
        {
          email: values.email,
          password: values.password,
          rememberMe,
        },
        {
          onSuccess(context) {
            if (context.data.twoFactorRedirect) {
              setShowTwoFactorCard(true)
              setError(null)
            } else {
              setIsSigninComplete(true)

              setTimeout(() => {
                router.replace("/account")
                setIsSigninComplete(false)
              }, 2000)
            }
          },
        }
      )

      if (signInError) {
        if (signInError.message === "Email not verified") {
          setShowEmailVerification(true)

          return
        }

        setError(signInError.message as string)
      }
    } catch (err) {
      console.error(`An error has occurred: ${err}`)
      setError("An error has occurred")
    }
  }

  if (showEmailVerification) {
    return <EmailVerification userEmail={form.getValues("email")} />
  }

  if (showTwoFactorCard) {
    return <TwoFactorCard />
  }

  if (isSigninComplete) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sign in complete</CardTitle>
          <CardDescription>
            You will be redirected to the account page
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="justify-center">
        <Text className="text-3xl font-bold text-center mb-8">Sing in</Text>

        <Text className="text-base font-medium mb-1">Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="email@example.com"
              autoCapitalize="none"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && (
          <Text className="text-red-500 mb-2">{errors.email.message}</Text>
        )}

        <Text className="text-base font-medium mb-1 mt-3">Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="••••••••"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && (
          <Text className="text-red-500 mb-4">{errors.password.message}</Text>
        )}

        {error && <Text className="text-red-500 mb-4">{error}</Text>}

        <Button
          onPress={handleSubmit(onSubmit)}
          className="bg-primary mt-4 rounded-xl p-3"
        >
          <Text className="text-white text-center font-semibold">Sing in</Text>
        </Button>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default SingIn
