import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Cart, CartItem } from "../utils/types"

interface CartStore extends Cart {
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, newQuantity?: number) => void
  clearCart: () => void
}

const recalculateTotals = (cartItems: CartItem[]) =>
  cartItems.reduce(
    (acc, item) => {
      const price = Number(item.price)
      const quantity = Number(item.quantity)
      acc.totalPrice += price * quantity
      acc.totalQuantity += quantity

      return acc
    },
    { totalPrice: 0, totalQuantity: 0 }
  )

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],
      totalQuantity: 0,
      totalPrice: 0,

      addItem: (item: CartItem) => {
        const itemToAdd = {
          ...item,
          price: Number(item.price),
          quantity: item.quantity !== undefined ? Number(item.quantity) : 1,
        }

        set((state: Cart) => {
          const existingItemIndex = state.cartItems.findIndex(
            (i) => i.id === itemToAdd.id
          )

          let updatedItems = []

          if (existingItemIndex < 0) {
            updatedItems = [...state.cartItems, itemToAdd]
          } else {
            updatedItems = [...state.cartItems]
            updatedItems[existingItemIndex].quantity += itemToAdd.quantity
          }

          const totals = recalculateTotals(updatedItems)

          return {
            cartItems: updatedItems,
            ...totals,
          }
        })
      },

      removeItem: (itemId: string) => {
        set((state: Cart) => {
          const updatedItems = state.cartItems.filter(
            (item) => item.id !== itemId
          )

          const totals = recalculateTotals(updatedItems)

          return {
            cartItems: updatedItems,
            ...totals,
          }
        })
      },

      updateQuantity: (itemId: string, newQuantity = 1) => {
        const quantity = Number(newQuantity)

        set((state: Cart) => {
          const itemIndex = state.cartItems.findIndex(
            (item) => item.id === itemId
          )

          if (itemIndex < 0) {
            return state
          }

          const updatedItems = [...state.cartItems]
          updatedItems[itemIndex] = {
            ...updatedItems[itemIndex],
            quantity,
          }

          const totals = recalculateTotals(updatedItems)

          return {
            cartItems: updatedItems,
            ...totals,
          }
        })
      },

      clearCart: () => {
        set(() => ({
          cartItems: [],
          totalQuantity: 0,
          totalPrice: 0,
        }))
      },
    }),
    {
      name: "cart-storage",
      getStorage: () => AsyncStorage,
    }
  )
)

export default useCartStore
