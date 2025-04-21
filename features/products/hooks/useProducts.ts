import { useQuery } from "@tanstack/react-query"
import { apiClient } from "~/utils/fetch"
import { PaginationResponse } from "~/utils/types"
import { Product } from "../utils/types"

type UseProductsProps = {
  page?: number
  limit?: number
  search?: string
  categories?: number[]
  priceRange?: [number, number]
}

export const useProducts = ({
  page = 1,
  limit = 10,
  search,
  categories = [],
  priceRange = [0, 500],
}: UseProductsProps) =>
  useQuery({
    queryKey: ["products", page, limit, search, categories, priceRange],
    queryFn: () =>
      apiClient
        .get<PaginationResponse<Product>>(`products`, {
          searchParams: {
            page,
            limit,
            ...(search && { search }),
            ...(categories.length > 0 && { categories: categories.join(",") }),
            ...((priceRange[0] !== 0 || priceRange[1] !== 500) && {
              priceRange: priceRange.join(","),
            }),
          },
        })
        .json(),
  })

export const useProduct = (id: string) =>
  useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => apiClient.get(`products/${id}`).json(),
  })
