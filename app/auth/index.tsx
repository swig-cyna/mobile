import { Stack } from "expo-router"
import { useState } from "react"
import { Pressable, View } from "react-native"
import { Text } from "~/components/ui/text"
import SignUp from "~/features/auth/components/SignUp"
import SingIn from "~/features/auth/components/SingIn"

export default function Screen() {
  const [isSingUp, setIsSingUp] = useState(false)

  return (
    <View className="flex-col flex-1 mt-4 px-3">
      <Stack.Screen
        name="products/[id]"
        options={{
          title: "Authentication",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <View className="flex-col">{isSingUp ? <SignUp /> : <SingIn />}</View>
      <View className="flex-row items-center justify-center gap-3 mt-4">
        <Text className="text-lg">
          {isSingUp
            ? "Are you already registered ?"
            : "Don't have an account ?"}
        </Text>
        <Pressable onPress={() => setIsSingUp(!isSingUp)}>
          <Text className="underline text-lg">
            {isSingUp ? "Sign in" : "Sign up"}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}
