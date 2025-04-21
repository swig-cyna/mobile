export type Product = {
  id: string
  name: string
  description: string
  price: number
  currency: string
  images: string[]
}

export interface Category {
  id: number
  name: string
  color: string
  count: number
}
