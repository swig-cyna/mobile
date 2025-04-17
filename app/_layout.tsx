import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native"
import { PortalHost } from "@rn-primitives/portal"
import { Tabs } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Box, Home, ShoppingCart } from "lucide-react-native"
import * as React from "react"
import { Platform } from "react-native"
import "~/global.css"
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar"
import { NAV_THEME } from "~/lib/constants"
import { useColorScheme } from "~/lib/useColorScheme"
import TanstackProvider from "~/providers/TanStackProvider"

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
}

const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

export default function RootLayout() {
  const hasMounted = React.useRef(false)
  const { colorScheme, isDarkColorScheme } = useColorScheme()
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false)

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return
    }
    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background")
    }
    setAndroidNavigationBar(colorScheme)
    setIsColorSchemeLoaded(true)
    hasMounted.current = true
  }, [])

  if (!isColorSchemeLoaded) {
    return null
  }

  return (
    <TanstackProvider>
      <ThemeProvider value={DARK_THEME}>
        <StatusBar style="light" />
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
              }

              return null
            },
            tabBarActiveTintColor: "#ffffff",
            tabBarInactiveTintColor: "#a1a1aa",
            tabBarStyle: {
              backgroundColor: "#18181b",
            },
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
        </Tabs>
        <PortalHost />
      </ThemeProvider>
    </TanstackProvider>
  )
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect
