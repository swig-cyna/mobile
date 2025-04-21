import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet"
import { ChevronLeft, ChevronRight, Filter } from "lucide-react-native"
import { useCallback, useMemo, useRef, useState } from "react"
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
import ProductFilters from "~/features/products/components/ProductFilters"
import { useProducts } from "~/features/products/hooks/useProducts"
import { useProductFiltersStore } from "~/features/products/stores/product-filters-store"
import { Product } from "~/features/products/utils/types"
import { BottomSheetStyles } from "~/providers/BottomSheet"

export default function Screen() {
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useDebounceValue("", 500)
  const { selectedCategories, priceRange } = useProductFiltersStore()

  const { data: products, isLoading } = useProducts({
    page: currentPage,
    limit: 2,
    search,
    categories: selectedCategories,
    priceRange,
  })

  const handleSearch = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setSearch(e.nativeEvent.text)
    setCurrentPage(1)
  }

  const handleChangePage = (page: number) => () => {
    setCurrentPage(page)
  }

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.expand()
  }, [])

  const snapPoints = useMemo(() => ["75%"], [])

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  )

  return (
    <>
      <ScrollView className="px-3">
        <View className="flex-row w-full gap-4 items-center justify-stretch">
          <Input
            onChange={handleSearch}
            className="my-4 flex-1"
            placeholder="Search"
          />
          <Button onPress={handlePresentModalPress} variant="ghost">
            <Filter color="#fff" />
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

        <View className="flex-row items-end justify-between gap-2 my-4 mt-auto">
          <Text className="text-muted-foreground text-xl">
            Page {currentPage} of {products?.pagination.totalPages}
          </Text>
          <View className="flex-row items-center gap-2">
            <Button
              disabled={!products?.pagination.hasPreviousPage}
              onPress={handleChangePage(currentPage - 1)}
            >
              <ChevronLeft color="#fff" />
            </Button>
            <Button
              disabled={!products?.pagination.hasNextPage}
              onPress={handleChangePage(currentPage + 1)}
            >
              <ChevronRight color="#fff" />
            </Button>
          </View>
        </View>
      </ScrollView>

      <BottomSheet
        style={BottomSheetStyles.container}
        enablePanDownToClose
        snapPoints={snapPoints}
        ref={bottomSheetModalRef}
        enableDynamicSizing={false}
        index={-1}
        backgroundStyle={BottomSheetStyles.backhground}
        handleIndicatorStyle={BottomSheetStyles.handle}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={BottomSheetStyles.contentContainer}>
          <ProductFilters />
        </BottomSheetView>
      </BottomSheet>
    </>
  )
}
