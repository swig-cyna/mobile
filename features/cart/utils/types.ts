export type CartItem = {
  id: string
  quantity: number
  name: string
  price: number
  images: string[]
}

export type Cart = {
  cartItems: CartItem[]
  totalPrice: number
  totalQuantity: number
}
