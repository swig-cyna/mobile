import { Stack } from "expo-router"
import { KeyboardAvoidingView, Platform, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import ProfileInfoUpdate from "~/features/account/components/ProfileInfoUpdate"
import TwoFactorAuthToggle from "~/features/account/components/TwoFactorAuthToggle"

export default function Screen() {
  return (
    <KeyboardAvoidingView
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      behavior="padding"
    >
      <ScrollView>
        <Stack.Screen
          name="products/[id]"
          options={{
            title: "My Account",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <View className="p-3 flex-col gap-5">
          <ProfileInfoUpdate />
          <TwoFactorAuthToggle />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
