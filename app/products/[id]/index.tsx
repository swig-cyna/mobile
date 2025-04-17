import { Image } from "expo-image"
import { Stack, useLocalSearchParams } from "expo-router"
import { ShoppingCart } from "lucide-react-native"
import { SafeAreaView, ScrollView } from "react-native"
import { Button } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"
import { Text } from "~/components/ui/text"

import { useProduct } from "~/features/products/hooks/useProducts"

export default function Screen() {
  const param = useLocalSearchParams()

  const { data: product, isLoading } = useProduct(param.id as string)

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
      <Text className="text-3xl font-semibold my-4">{product?.name}</Text>
      <Button size="lg" className="flex-row items-center gap-2" style={{}}>
        <Text className="text-4xl">Add to cart</Text>
        <ShoppingCart size={24} color="#fff" />
      </Button>
    </ScrollView>
  )
}
