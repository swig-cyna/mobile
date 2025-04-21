import { useRouter } from "expo-router"
import { UserX } from "lucide-react-native"
import { useState } from "react"
import { View } from "react-native"
import { Button } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"
import { Text } from "~/components/ui/text"
import AccoutMenu from "~/features/account/AccoutMenu"
import { useSession } from "~/features/auth/utils/authClient"

export default function Screen() {
  const { data, isPending } = useSession()
  const router = useRouter()
  const [isSingUp, setIsSingUp] = useState(false)

  if (isPending) {
    return (
      <View className="flex-col flex-1 mt-4">
        <View className="flex-col mt-4 items-center">
          <Skeleton className="h-28 w-28 rounded-full" />
          <Skeleton className="h-10 w-40 mt-4" />
        </View>

        <View className="px-3 flex-col gap-3 mt-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-14 w-full" />
          ))}
        </View>
      </View>
    )
  }

  if (!data?.user) {
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

  return <AccoutMenu />
}
