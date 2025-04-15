import { Stack } from "expo-router"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Input } from "~/components/ui/input"
import { Text } from "~/components/ui/text"

export default function Screen() {
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Products" }} />
      <View className="px-3">
        {/* Search bar here */}
        <View>
          <Input placeholder="Search" />
        </View>
        <View>
          <Text>Products</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
