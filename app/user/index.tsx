import { Stack } from "expo-router"
import { View } from "react-native"
import { Text } from "~/components/ui/text"

export default function Screen() {
  return (
    <View className="p-3">
      <Stack.Screen
        name="products/[id]"
        options={{
          title: "My Account",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Text>
        <Text>Home</Text>
      </Text>
    </View>
  )
}
