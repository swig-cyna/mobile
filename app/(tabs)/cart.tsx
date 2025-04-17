import { ScrollView } from "react-native"
import { Text } from "~/components/ui/text"

export default function Screen() {
  return (
    <ScrollView className="px-3">
      <Text className="text-3xl font-semibold my-4">Cart</Text>
    </ScrollView>
  )
}
