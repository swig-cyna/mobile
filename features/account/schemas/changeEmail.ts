import { z } from "zod"

export const accountSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
})

export type AccountSchema = z.infer<typeof accountSchema>
