import { z } from "zod"

export const PaginationSchema = (schema: z.ZodSchema) =>
  z.object({
    data: z.array(schema),
    pagination: z.object({
      currentPage: z.number(),
      limit: z.number(),
      totalItems: z.number(),
      totalPages: z.number(),
      remainingPages: z.number(),
      hasNextPage: z.boolean(),
      hasPreviousPage: z.boolean(),
    }),
  })

export interface PaginationResponse<T> {
  data: T[]
  pagination: {
    currentPage: number
    limit: number
    totalItems: number
    totalPages: number
    remainingPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}
