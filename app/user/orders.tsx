import { Stack } from "expo-router"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import OrderHistory from "~/features/account/components/OrderHistory"

export default function Screen() {
  return (
    <ScrollView>
      <Stack.Screen
        name="user/orders"
        options={{
          title: "Order History",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <View className="p-3">
        <OrderHistory />
      </View>
    </ScrollView>
  )
}
