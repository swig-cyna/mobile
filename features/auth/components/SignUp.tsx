import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Keyboard, TouchableWithoutFeedback, View } from "react-native"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Text } from "~/components/ui/text"
import { SignUpFormData, signupSchema } from "../schemas/signup"
import { signUp } from "../utils/authClient"

const SignUp = () => {
  const [error, setError] = useState<string | null>(null)
  const [isSignUpComplete, setIsSignUpComplete] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
  })

  async function onSubmit(values: SignUpFormData) {
    try {
      const { error: signUpError } = await signUp.email({
        email: values.email,
        name: `${values.firstname} ${values.lastname}`,
        password: values.password,
      })

      if (signUpError) {
        setError(signUpError.message as string)
      } else {
        setIsSignUpComplete(true)
      }
    } catch (err) {
      console.error("Erreur pendant l'inscription:", err)
      setError("Une erreur est survenue")
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="justify-center">
        <Text className="text-3xl font-bold text-center mb-8">Sign up</Text>

        <Text className="text-base font-medium mb-1 mt-3">First Name</Text>
        <Controller
          control={control}
          name="firstname"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="John"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.firstname && (
          <Text className="text-red-500 mb-2">{errors.firstname.message}</Text>
        )}

        <Text className="text-base font-medium mb-1 mt-3">Last Name</Text>
        <Controller
          control={control}
          name="lastname"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Doe"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.lastname && (
          <Text className="text-red-500 mb-2">{errors.lastname.message}</Text>
        )}

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
          <Text className="text-red-500 mb-2">{errors.password.message}</Text>
        )}

        <Text className="text-base font-medium mb-1 mt-3">
          Confirm Password
        </Text>
        <Controller
          control={control}
          name="confirmPassword"
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
        {errors.confirmPassword && (
          <Text className="text-red-500 mb-4">
            {errors.confirmPassword.message}
          </Text>
        )}

        {error && <Text className="text-red-500 mb-4">{error}</Text>}
        {isSignUpComplete && (
          <Text className="text-green-600 mb-4">
            You have successfully signed up 🎉
          </Text>
        )}

        <Button
          onPress={handleSubmit(onSubmit)}
          className="bg-primary mt-4 rounded-xl p-3"
        >
          <Text className="text-white text-center font-semibold">Sign up</Text>
        </Button>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default SignUp
