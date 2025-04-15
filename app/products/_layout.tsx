import { Stack } from "expo-router"
import { Settings } from "lucide-react-native"
import { Button } from "~/components/ui/button"

export default function ProductsLayout() {
  return (
    <Stack
      // add settings icon on right
      screenOptions={{
        headerRight: () => {
          return (
            <Button size="sm" variant="ghost">
              <Settings />
            </Button>
          )
        },
      }}
    />
  )
}
