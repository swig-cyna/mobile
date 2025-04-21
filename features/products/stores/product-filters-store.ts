import { create } from "zustand"

interface ProductFiltersState {
  selectedCategories: number[]
  priceRange: [number, number]
  setSelectedCategories: (categories: number[]) => void
  toggleCategory: (categoryId: number) => void
  setPriceRange: (range: [number, number]) => void
  resetFilters: () => void
}

export const useProductFiltersStore = create<ProductFiltersState>((set) => ({
  selectedCategories: [],
  priceRange: [0, 500],
  setSelectedCategories: (categories) =>
    set({ selectedCategories: categories }),
  toggleCategory: (categoryId) =>
    set((state) => {
      const isSelected = state.selectedCategories.includes(categoryId)
      const newSelectedCategories = isSelected
        ? state.selectedCategories.filter((id) => id !== categoryId)
        : [...state.selectedCategories, categoryId]
      return { selectedCategories: newSelectedCategories }
    }),
  setPriceRange: (range) => set({ priceRange: range }),
  resetFilters: () => set({ selectedCategories: [], priceRange: [0, 500] }),
}))
