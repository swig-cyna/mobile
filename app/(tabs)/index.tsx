import { Stack, useRouter } from "expo-router"
import { Package } from "lucide-react-native"
import * as React from "react"
import { SafeAreaView, ScrollView, View } from "react-native"
import { Button } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"
import { Text } from "~/components/ui/text"
import HomeCarousel from "~/features/carousel/components/HomeCarousel"
import CategoriesItem from "~/features/categories/components/CategoriesItem"
import { useCategories } from "~/features/categories/hooks/useCategory"
import CardProduct from "~/features/products/components/CardProduct"
import { useProducts } from "~/features/products/hooks/useProducts"
import { SafeAreaViewStyle } from "~/lib/utils"

export default function Screen() {
  const { data: products, isLoading: isLoadingProducts } = useProducts({
    page: 1,
    limit: 3,
  })
  const { data: categories, isLoading: isCategoriesLoading } = useCategories()
  const router = useRouter()

  return (
    <SafeAreaView style={SafeAreaViewStyle.droidSafeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className="w-full gap-3 flex flex-col">
        <Text className="text-4xl px-3 py-5 font-semibold">
          Welcome back 👋
        </Text>
        <HomeCarousel />
        <View className="px-3 flex flex-col gap-3">
          <Text className="text-3xl font-semibold mt-4 mb-1">Categories</Text>

          <ScrollView horizontal className="w-full pb-4">
            <View className="flex-row min-w-max gap-2">
              {isCategoriesLoading &&
                Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton className="h-[70px] w-[150px]" key={index} />
                ))}

              {categories &&
                categories.data.map((category, index) => (
                  <CategoriesItem key={index} category={category} />
                ))}
            </View>
          </ScrollView>
        </View>
        <View className="px-3 flex flex-col gap-3">
          <Text className="text-3xl font-semibold my-4">Newest Products</Text>

          {isLoadingProducts &&
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
            <Button className="mt-2" onPress={() => router.push("/products")}>
              <Text>Show all services</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
