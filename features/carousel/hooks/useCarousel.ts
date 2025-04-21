import { useQuery } from "@tanstack/react-query"
import { apiClient } from "~/utils/fetch"

export const useCarousel = () =>
  useQuery({
    queryKey: ["carousel"],
    queryFn: () => apiClient.get<CarouselItem[]>(`carousel`).json(),
  })
