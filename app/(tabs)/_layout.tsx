import { Tabs } from "expo-router"
import { Box, Home, ShoppingCart, User } from "lucide-react-native"
import * as React from "react"
import "~/global.css"

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconProps = { color, size }

          if (route.name === "index") {
            return <Home {...iconProps} />
          } else if (route.name === "products") {
            return <Box {...iconProps} />
          } else if (route.name === "cart") {
            return <ShoppingCart {...iconProps} />
          } else if (route.name === "account") {
            return <User {...iconProps} />
          }

          return null
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#a1a1aa",
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Products",
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
        }}
      />
    </Tabs>
  )
}
