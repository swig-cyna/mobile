import { Stack } from "expo-router"
import { useSession } from "~/features/auth/utils/authClient"

export default function RootLayout() {
  const { data } = useSession()

  if (!data?.user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">User is required</h1>
        <p className="text-lg">Sign in to continue</p>
      </div>
    )
  }

  return <Stack />
}
