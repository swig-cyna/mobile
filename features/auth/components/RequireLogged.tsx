import { useRouter } from "expo-router"
import { UserX } from "lucide-react-native"
import React from "react"
import { View } from "react-native"
import { Button } from "~/components/ui/button"
import { Text } from "~/components/ui/text"

const RequireLogged = () => {
  const router = useRouter()

  return (
    <View className="flex-col items-center justify-center flex-1 mt-4">
      <View className="flex-col mt-4 items-center">
        <UserX color="#9ca3af" size={60} />
        <Text className="text-2xl mt-2">Account is required</Text>
        <Text className="text-lg">Sign in to continue</Text>
        <Button
          size="lg"
          className="mt-4"
          onPress={() => router.navigate("/auth" as never)}
        >
          <Text>Sign in</Text>
        </Button>
      </View>
    </View>
  )
}

export default RequireLogged
