import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native"
import { PortalHost } from "@rn-primitives/portal"
import { Tabs } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Box, Home, Settings } from "lucide-react-native"
import * as React from "react"
import { Platform } from "react-native"
import "~/global.css"
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar"
import { NAV_THEME } from "~/lib/constants"
import { useColorScheme } from "~/lib/useColorScheme"

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
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const iconProps = { color, size }

            if (route.name === "index") {
              return <Home {...iconProps} />
            } else if (route.name === "products") {
              return <Box {...iconProps} />
            } else if (route.name === "settings") {
              return <Settings {...iconProps} />
            }

            return null
          },
          tabBarActiveTintColor: isDarkColorScheme ? "#ffffff" : "#000000",
          tabBarInactiveTintColor: isDarkColorScheme ? "#a1a1aa" : "#71717a",
          tabBarStyle: {
            backgroundColor: isDarkColorScheme ? "#18181b" : "#ffffff",
          },
          headerShown: false,
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Accueil",
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: "Products",
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Paramètres",
          }}
        />
      </Tabs>
      <PortalHost />
    </ThemeProvider>
  )
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect
