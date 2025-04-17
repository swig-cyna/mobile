import { Image } from "expo-image"
import { Trash } from "lucide-react-native"
import { useState } from "react"
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
} from "react-native"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Text } from "~/components/ui/text"
import useCartStore from "../stores/cartStore"
import { CartItem } from "../utils/types"

type Props = {
  data: CartItem
}

const CartRowProduct = ({ data }: Props) => {
  const { removeItem, updateQuantity } = useCartStore()

  const [quantity, setQuantity] = useState(data.quantity.toString())

  const onQuantityChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const newQuantity = parseInt(e.nativeEvent.text, 10)

    if (isNaN(newQuantity)) {
      setQuantity(e.nativeEvent.text)
      return
    }

    setQuantity(newQuantity.toString())

    updateQuantity(data.id, newQuantity)
  }

  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-4">
        <Image
          source={`${process.env.EXPO_PUBLIC_BUCKET_URL}/products/${data.images[0]}`}
          style={{ width: 100, aspectRatio: 1 }}
        />
        <View className="flex-col items-start">
          <Text className="text-xl font-semibold">{data.name}</Text>
          <Button
            className="flex-row gap-2 mt-2"
            onPress={() => removeItem(data.id)}
            variant="ghost"
            size="sm"
          >
            <Trash color="#fff" />
          </Button>
        </View>
      </View>
      <View className="flex-col items-end gap-2">
        <Input
          placeholder="1"
          keyboardType="numeric"
          className="w-16"
          onChange={onQuantityChange}
          value={quantity.toString()}
        />
        <Text className="text-2xl font-semibold">$ {data.price}</Text>
      </View>
    </View>
  )
}

export default CartRowProduct
