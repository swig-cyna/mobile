import { z } from "zod"

export const signupSchema = z
  .object({
    firstname: z.string().min(3).max(50),
    lastname: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type SignUpFormData = z.infer<typeof signupSchema>
