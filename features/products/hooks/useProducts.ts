import { useQuery } from "@tanstack/react-query"
import { apiClient } from "~/utils/fetch"
import { PaginationResponse } from "~/utils/types"
import { Product } from "../utils/types"

type UseProductsProps = {
  page?: number
  limit?: number
  search?: string
}

export const useProducts = ({
  page = 1,
  limit = 10,
  search,
}: UseProductsProps) =>
  useQuery({
    queryKey: ["products", page, limit, search],
    queryFn: () =>
      apiClient
        .get<PaginationResponse<Product>>(`products`, {
          searchParams: {
            page,
            limit,
            ...(search && { search }),
          },
        })
        .json(),
  })

export const useProduct = (id: string) =>
  useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => apiClient.get(`products/${id}`).json(),
  })
