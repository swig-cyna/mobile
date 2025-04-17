import { Image } from "expo-image"
import { Stack, useLocalSearchParams } from "expo-router"
import { ShoppingCart } from "lucide-react-native"
import { SafeAreaView, ScrollView, View } from "react-native"
import Markdown from "react-native-markdown-display"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import { Skeleton } from "~/components/ui/skeleton"
import { Text } from "~/components/ui/text"
import useCartStore from "~/features/cart/stores/cartStore"

import { useProduct } from "~/features/products/hooks/useProducts"
import { MarkDownstyles } from "~/features/products/utils/style"

export default function Screen() {
  const param = useLocalSearchParams()

  const { data: product, isLoading } = useProduct(param.id as string)
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    addItem({
      id: product?.id as string,
      quantity: 1,
      name: product?.name as string,
      price: product?.price as number,
      images: product?.images as string[],
    })
  }

  if (isLoading) {
    return (
      <SafeAreaView>
        <Skeleton className="h-72 w-full" />
      </SafeAreaView>
    )
  }

  if (!product) {
    return (
      <SafeAreaView>
        <Text>Product not found</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="px-3 flex-1 mt-4">
        <Stack.Screen
          name="products/[id]"
          options={{
            title: "Product Details",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-72 w-full" />
          ))}

        <Image
          source={`${process.env.EXPO_PUBLIC_BUCKET_URL}/products/${product.images[0]}`}
          style={{ width: "100%", aspectRatio: 1 }}
          className="rounded-md"
        />
        <View className="flex-row items-center justify-between gap-2 mt-4">
          <Text className="text-3xl font-semibold my-4">{product?.name}</Text>
          <Text className="text-4xl font-semibold my-4">${product?.price}</Text>
        </View>
        <Separator className="mb-4" />
        <View className="mb-4">
          <Markdown style={MarkDownstyles}>{product?.description}</Markdown>
        </View>
      </ScrollView>
      <View>
        <Button
          size="lg"
          className="flex-row items-center gap-2"
          onPress={handleAddToCart}
        >
          <Text className="text-4xl">Add to cart</Text>
          <ShoppingCart size={24} color="#fff" />
        </Button>
      </View>
    </SafeAreaView>
  )
}
