import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import * as React from "react"
import { useWindowDimensions, View } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import Carousel from "react-native-reanimated-carousel"
import { Button } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"
import { Text } from "~/components/ui/text"
import { useCarousel } from "../hooks/useCarousel"

const HomeCarousel = () => {
  const { data: carousel, isLoading: isLoadingCarousel } = useCarousel()
  const screen = useWindowDimensions()
  const progress = useSharedValue<number>(0)

  if (isLoadingCarousel) {
    return <Skeleton className="h-[258] w-full" />
  }

  return (
    <Carousel
      autoPlayInterval={2000}
      data={carousel || []}
      height={258}
      loop={true}
      pagingEnabled={true}
      snapEnabled={true}
      width={screen.width}
      style={{
        width: screen.width,
      }}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50,
      }}
      onProgressChange={progress}
      renderItem={({ item }) => (
        <View className="relative">
          <Image
            source={{
              uri: `${process.env.EXPO_PUBLIC_BUCKET_URL}/carousel/${item.image}`,
            }}
            className="absolute w-full h-full"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
              resizeMode: "cover",
            }}
          />
          <View className="absolute w-full h-full">
            <LinearGradient colors={["transparent", "rgba(0,0,0,0.7)"]}>
              <View className="flex-col items-start justify-end w-full h-full p-4">
                <Text className="text-2xl font-semibold">{item.title}</Text>
                <Text className="text-lg">{item.description}</Text>
                <Button className="mt-2">
                  <Text>Learn more</Text>
                </Button>
              </View>
            </LinearGradient>
          </View>
        </View>
      )}
    />
  )
}

export default HomeCarousel
