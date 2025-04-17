import { Stack } from "expo-router"
import { Filter } from "lucide-react-native"
import { SafeAreaView, ScrollView, View } from "react-native"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

export default function Screen() {
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Cart" }} />

      <ScrollView className="px-3">
        <View className="flex-row w-full gap-4 items-center justify-stretch">
          <Input className="my-4 flex-1" placeholder="Search" />
          <Button variant="ghost">
            <Filter />
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
