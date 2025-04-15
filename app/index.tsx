import * as React from "react"
import { SafeAreaView, ScrollView, View } from "react-native"
import { Text } from "~/components/ui/text"
import CardProduct from "~/features/products/components/CardProduct"

const GITHUB_AVATAR_URI = "https://placehold.co/600x400.png"

export default function Screen() {
  const [progress, setProgress] = React.useState(78)

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100))
  }
  return (
    <SafeAreaView className="flex-1 px-3">
      <ScrollView className="w-full gap-3 flex flex-col">
        <View className="px-3 flex flex-col gap-3">
          <Text className="text-3xl font-semibold my-4">Newest Products</Text>
          <CardProduct
            product={{
              id: "1",
              name: "Product 1",
              price: 12,
              currency: "USD",
              images: [GITHUB_AVATAR_URI],
            }}
          />
          <CardProduct
            product={{
              id: "2",
              name: "Product 2",
              price: 12,
              currency: "USD",
              images: [GITHUB_AVATAR_URI],
            }}
          />
          <CardProduct
            product={{
              id: "3",
              name: "Product 3",
              price: 12,
              currency: "USD",
              images: [GITHUB_AVATAR_URI],
            }}
          />
          <CardProduct
            product={{
              id: "4",
              name: "Product 4",
              price: 12,
              currency: "USD",
              images: [GITHUB_AVATAR_URI],
            }}
          />
          <CardProduct
            product={{
              id: "5",
              name: "Product 5",
              price: 12,
              currency: "USD",
              images: [GITHUB_AVATAR_URI],
            }}
          />
          <CardProduct
            product={{
              id: "6",
              name: "Product 6",
              price: 12,
              currency: "USD",
              images: [GITHUB_AVATAR_URI],
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
