import { Stack } from "expo-router"
import { Package } from "lucide-react-native"
import * as React from "react"
import { SafeAreaView, ScrollView, View } from "react-native"
import { Button } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"
import { Text } from "~/components/ui/text"
import CardProduct from "~/features/products/components/CardProduct"
import { useProducts } from "~/features/products/hooks/useProducts"

export default function Screen() {
  const { data: products, isLoading } = useProducts({ page: 1, limit: 3 })

  return (
    <SafeAreaView className="flex-1 px-3">
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className="w-full gap-3 flex flex-col">
        <View className="px-3 flex flex-col gap-3">
          <Text className="text-3xl font-semibold my-4">Newest Products</Text>

          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-72 w-full" />
            ))}

          {products &&
            products?.data?.map((product: any) => (
              <CardProduct key={product.id} product={product} />
            ))}

          <View className="flex mb-6 h-72 w-full flex-col items-center justify-center rounded-md border border-muted border-dashed py-8">
            <Package className="mb-2" size={48} color={"#fff"} />
            <Text className="mb-2 border-dashed text-center text-xl font-bold">
              Discover our services
            </Text>
            <Button className="mt-2">
              <Text>Show all services</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
