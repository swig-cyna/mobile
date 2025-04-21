import MultiSlider from "@ptomasroos/react-native-multi-slider"
import { useState } from "react"
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import { Label } from "~/components/ui/label"
import { Skeleton } from "~/components/ui/skeleton"
import { Text } from "~/components/ui/text"
import { useCategories } from "~/features/categories/hooks/useCategory"
import { useProductFiltersStore } from "../stores/product-filters-store"

export default function ProductFilters() {
  const { data: categories, isLoading: isCategoriesLoading } = useCategories()
  const {
    selectedCategories,
    priceRange,
    toggleCategory,
    setPriceRange,
    resetFilters,
  } = useProductFiltersStore()

  const [priceRangeValues, setPriceRangeValues] = useState(priceRange)
  const [scorllIsEnabled, setScrollIsEnabled] = useState(true)
  const screen = useWindowDimensions()

  const handleEnableScroll = (enabled: boolean) => () => {
    setScrollIsEnabled(enabled)
  }

  const handleSliderFinish = (values: number[]) => {
    setPriceRange([values[0], values[1]])
    setScrollIsEnabled(true)
  }

  return (
    <ScrollView scrollEnabled={scorllIsEnabled}>
      <View className="space-y-6">
        <Accordion type="multiple" defaultValue={["categories", "price"]}>
          <AccordionItem value="categories">
            <AccordionTrigger>
              <Text>Categories</Text>
            </AccordionTrigger>
            <AccordionContent>
              <View className="space-y-6 mt-2">
                {categories?.data?.map((category) => (
                  <View
                    key={category.id}
                    className="flex-row items-center gap-2"
                  >
                    <Checkbox
                      className="h-6 w-6 native:h-[30] native:w-[30]"
                      id={`category-${category.id}`}
                      checked={
                        selectedCategories?.includes(category.id) ?? false
                      }
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="text-xl"
                    >
                      {category.name}
                    </Label>
                  </View>
                ))}

                {isCategoriesLoading &&
                  Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton className="h-6 w-full" key={index} />
                  ))}
              </View>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger>
              <Text>Price Range</Text>
            </AccordionTrigger>
            <AccordionContent>
              <View className="space-y-4">
                <MultiSlider
                  values={[priceRange[0], priceRange[1]]}
                  min={0}
                  max={500}
                  step={10}
                  onValuesChange={(values) => {
                    setPriceRangeValues([values[0], values[1]])
                  }}
                  sliderLength={screen.width - 60}
                  markerStyle={MultiSliderStyles.sliderMarker}
                  containerStyle={MultiSliderStyles.multiSliderContainer}
                  onValuesChangeFinish={handleSliderFinish}
                  onValuesChangeStart={handleEnableScroll(false)}
                  selectedStyle={MultiSliderStyles.track}
                />
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm">{priceRangeValues[0]} €</Text>
                  <Text className="text-sm">{priceRangeValues[1]} €</Text>
                </View>
              </View>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <View className="flex gap-2 pt-4 mt-auto">
          <Button
            size="lg"
            variant="outline"
            className="flex-1"
            onPress={resetFilters}
          >
            <Text>Reset filters</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}

const MultiSliderStyles = StyleSheet.create({
  sliderContainer: {
    paddingVertical: 10,
  },
  multiSliderContainer: {
    alignItems: "center",
  },
  sliderMarker: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "hsl(266 97% 47%)",
    borderColor: "hsl(266 97% 47%)",
  },
  track: {
    height: 2,
    backgroundColor: "hsl(266 97% 47%)",
  },
})
