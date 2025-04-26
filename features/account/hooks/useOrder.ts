import { useQuery } from "@tanstack/react-query"
import { apiClient } from "~/utils/fetch"

export const useOrder = (userId: string | undefined) =>
  useQuery({
    retry: false,
    queryKey: ["order"],
    queryFn: () => apiClient.get<Order>(`orders/${userId}`).json(),
  })
