import { ShoppingBag, ShoppingCart } from "lucide-react-native"
import { ScrollView, View } from "react-native"
import { Button } from "~/components/ui/button"
import { Text } from "~/components/ui/text"
import CartRowProduct from "~/features/cart/components/CartRowProduct"
import useCartStore from "~/features/cart/stores/cartStore"

export default function Screen() {
  const { cartItems, totalPrice } = useCartStore()

  return (
    <View className="flex flex-1 mt-4">
      <ScrollView className="px-3 flex-col flex-1">
        <View className="flex-1">
          {cartItems.length === 0 && (
            <View className="mx-auto flex-col justify-center items-center mt-12">
              <ShoppingBag color="#9ca3af" size={48} />
              <Text className="text-2xl font-semibold mt-4">
                Your cart is empty
              </Text>
              <Text className="text-sm">Add some products to your cart</Text>
            </View>
          )}
        </View>
        <View className="flex-col gap-3 devide-y-2 divide-white">
          {cartItems?.map((item, index) => (
            <CartRowProduct data={item} key={index} />
          ))}
        </View>
      </ScrollView>
      <View className="p-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Text className="text-2xl font-semibold">Total</Text>
            <Text className="text-2xl font-semibold">${totalPrice}</Text>
          </View>
          <Button
            disabled={cartItems.length === 0}
            size="lg"
            className="flex-row gap-2 items-center"
          >
            <Text>Checkout</Text>
            <ShoppingCart size={24} color="#fff" />
          </Button>
        </View>
      </View>
    </View>
  )
}
