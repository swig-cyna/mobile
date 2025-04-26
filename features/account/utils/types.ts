type Order = {
  id: string
  createdAt: string
  status: string
  total: number
  amount: number
  orderItem: {
    product: {
      id: string
      name: string
      quantity: number
      price: number
    }
    quantity: number
  }[]
}
