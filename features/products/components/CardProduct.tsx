import { useNavigation } from "@react-navigation/native"
import { Image } from "expo-image"
import { Image as ImageOffIcon } from "lucide-react-native"
import { View } from "react-native"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Text } from "~/components/ui/text"

type Props = {
  product: any
}

const CardProduct = ({ product }: Props) => {
  const navigation = useNavigation()

  return (
    <Card className="mb-4 overflow-hidden">
      {product.images && product.images.length > 0 ? (
        <Image
          source={product.images[0]}
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
            <Text className="font-semibold flex-1">
              {product.price} {product.currency}
            </Text>
            <Button size="sm" variant="default">
              <Text>Show more</Text>
            </Button>
          </View>
        </View>
      </CardContent>
    </Card>
  )
}

export default CardProduct
