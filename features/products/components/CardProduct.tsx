import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { Image as ImageOffIcon } from "lucide-react-native"
import { TouchableOpacity, View } from "react-native"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Text } from "~/components/ui/text"
import { Product } from "../utils/types"

type Props = {
  product: Product
}

const CardProduct = ({ product }: Props) => {
  const router = useRouter()

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.navigate(`/products/${product.id}` as never)}
    >
      <Card className="mb-4 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <Image
            source={`${process.env.EXPO_PUBLIC_BUCKET_URL}/products/${product.images[0]}`}
            style={{ width: "100%", aspectRatio: 1 }}
            resizeMode="cover"
          />
        ) : (
          <View className="aspect-square flex-row items-center justify-center bg-muted">
            <View className="items-center">
              <ImageOffIcon size={64} color="#9ca3af" />
              <Text className="mt-3 text-muted-foreground">
                No image available
              </Text>
            </View>
          </View>
        )}

        <CardContent className="pt-4">
          <Text className="text-3xl font-semibold">{product.name}</Text>
          <View className="mt-2 w-full">
            <View className="flex-row items-center">
              <Text className="font-semibold flex-1 text-3xl">
                $ {product.price}
              </Text>
              <Button
                variant="default"
                onPress={() =>
                  router.navigate(`/products/${product.id}` as never)
                }
              >
                <Text className="text-white">Show more</Text>
              </Button>
            </View>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  )
}

export default CardProduct
