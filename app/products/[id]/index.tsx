import { Stack, useLocalSearchParams } from "expo-router"
import { ShoppingCart } from "lucide-react-native"
import { SafeAreaView, ScrollView, View } from "react-native"
import Markdown from "react-native-markdown-display"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import { Skeleton } from "~/components/ui/skeleton"
import { Text } from "~/components/ui/text"
import useCartStore from "~/features/cart/stores/cartStore"
import ProductCarousel from "~/features/products/components/ProductCarousel"

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
        <Stack.Screen
          name="products/[id]"
          options={{
            title: "Product Details",
            headerBackButtonDisplayMode: "minimal",
          }}
        />

        <View className="flex-col gap-2 px-3 mt-4">
          <Skeleton className="h-[400] w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-64 ml-auto" />
          <View className="mt-4 flex-col gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-6 w-96" />
            ))}
          </View>
        </View>
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
      <ScrollView className="flex-1 mt-2">
        <Stack.Screen
          name="products/[id]"
          options={{
            title: "Product Details",
            headerBackButtonDisplayMode: "minimal",
          }}
        />

        <ProductCarousel images={product.images} />

        <View className="px-3">
          <View className="flex-col justify-between gap-2 mb-4 mt-1">
            <Text className="text-3xl font-semibold">{product?.name}</Text>
            <Text className="text-4xl font-semibold text-right">
              ${product?.price}
            </Text>
          </View>
          <Separator className="mb-4" />
          <View className="mb-4">
            <Markdown style={MarkDownstyles}>{product?.description}</Markdown>
          </View>
        </View>
      </ScrollView>
      <View className="px-3">
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
