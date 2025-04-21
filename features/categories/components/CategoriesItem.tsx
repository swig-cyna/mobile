import { useRouter } from "expo-router"
import { TouchableOpacity, View } from "react-native"
import { Text } from "~/components/ui/text"
import { useProductFiltersStore } from "~/features/products/stores/product-filters-store"
import { Category } from "~/features/products/utils/types"

type Props = {
  category: Category
}

const CategoriesItem = ({ category }: Props) => {
  const router = useRouter()
  const { toggleCategory, resetFilters } = useProductFiltersStore()

  const handlePress = () => {
    router.navigate("/products")
    resetFilters()
    toggleCategory(category.id)
  }

  return (
    <TouchableOpacity
      className="group brightness-110 transition-all"
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <View
        className="relative flex min-w-24 items-center justify-center overflow-hidden rounded-lg group-hover:brightness-110"
        style={{ backgroundColor: category.color }}
      >
        <View className="z-10 m-[1px] rounded-lg bg-card/90 px-6 py-3">
          <Text className="font-semibold drop-shadow-md text-xl">
            {category.name || "Category Name"}
          </Text>
          <Text className="text-sm drop-shadow-md">
            {category.count} Products
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
export default CategoriesItem
