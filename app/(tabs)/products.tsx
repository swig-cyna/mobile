import { ChevronLeft, ChevronRight, Filter } from "lucide-react-native"
import { useState } from "react"
import {
  NativeSyntheticEvent,
  ScrollView,
  TextInputChangeEventData,
  View,
} from "react-native"
import { useDebounceValue } from "usehooks-ts"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Skeleton } from "~/components/ui/skeleton"
import { Text } from "~/components/ui/text"
import CardProduct from "~/features/products/components/CardProduct"
import { useProducts } from "~/features/products/hooks/useProducts"
import { Product } from "~/features/products/utils/types"

export default function Screen() {
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useDebounceValue("", 500)

  const { data: products, isLoading } = useProducts({
    page: currentPage,
    limit: 2,
    search,
  })

  const handleSearch = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setSearch(e.nativeEvent.text)
    setCurrentPage(1)
  }

  const handleChangePage = (page: number) => () => {
    setCurrentPage(page)
  }

  return (
    <ScrollView className="px-3">
      <View className="flex-row w-full gap-4 items-center justify-stretch">
        <Input
          onChange={handleSearch}
          className="my-4 flex-1"
          placeholder="Search"
        />
        <Button variant="ghost">
          <Filter />
        </Button>
      </View>
      <View className="w-full flex flex-col gap-3">
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-72 w-full" />
          ))}

        {products &&
          products?.data?.map((product: Product) => (
            <CardProduct key={product.id} product={product} />
          ))}

        {products && products?.pagination.totalPages === 0 && (
          <View className="flex-row items-center justify-center gap-2 my-4">
            <Text className="text-muted-foreground text-lg">
              No products found
            </Text>
          </View>
        )}
      </View>

      <View className="flex-row items-center justify-center gap-2 my-4">
        <Button
          disabled={!products?.pagination.hasPreviousPage}
          onPress={handleChangePage(currentPage - 1)}
        >
          <ChevronLeft />
        </Button>

        <Button
          disabled={!products?.pagination.hasNextPage}
          onPress={handleChangePage(currentPage + 1)}
        >
          <ChevronRight />
        </Button>
      </View>
    </ScrollView>
  )
}
