import { View } from "react-native"
import { Skeleton } from "~/components/ui/skeleton"
import AccountMenu from "~/features/account/components/AccountMenu"
import RequireLogged from "~/features/auth/components/RequireLogged"
import { useSession } from "~/features/auth/utils/authClient"

export default function Screen() {
  const { data, isPending } = useSession()

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
    return <RequireLogged />
  }

  return <AccountMenu />
}
