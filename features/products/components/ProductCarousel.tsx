import { Image } from "expo-image"
import * as React from "react"
import { useWindowDimensions, View } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import Carousel from "react-native-reanimated-carousel"

type Props = {
  images: string[]
}

const ProductCarousel = ({ images }: Props) => {
  const screen = useWindowDimensions()
  const progress = useSharedValue<number>(0)

  return (
    <Carousel
      autoPlayInterval={2000}
      data={images || []}
      height={400}
      loop={false}
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
              uri: `${process.env.EXPO_PUBLIC_BUCKET_URL}/products/${item}`,
            }}
            className=" w-full h-full"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
              resizeMode: "cover",
            }}
          />
        </View>
      )}
    />
  )
}

export default ProductCarousel
