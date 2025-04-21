import { useQuery } from "@tanstack/react-query"
import { Category } from "~/features/products/utils/types"
import { apiClient } from "~/utils/fetch"
import { PaginationResponse } from "~/utils/types"

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      apiClient
        .get<
          PaginationResponse<Category>
        >(`categories`, { searchParams: { limit: 100 } })
        .json(),
  })
