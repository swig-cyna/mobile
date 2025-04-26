import clsx from "clsx"
import { useRouter } from "expo-router"
import {
  ChevronRight,
  CreditCard,
  HelpCircle,
  LogOut,
  MapPin,
  Package,
  TicketCheck,
  User,
  User2,
} from "lucide-react-native"
import { View } from "react-native"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Text } from "~/components/ui/text"
import { authClient, useSession } from "../../auth/utils/authClient"

const userMenuItems = [
  {
    title: "My Account",
    icon: User2,
    url: "/user/profile",
  },
  {
    title: "Subscriptions",
    icon: TicketCheck,
    url: "#",
  },
  {
    title: "Order History",
    icon: Package,
    url: "/user/orders",
  },
  {
    title: "Payment Methods",
    icon: CreditCard,
    url: "#",
  },
  {
    title: "Shipping Address",
    icon: MapPin,
    url: "#",
  },
  {
    title: "Help",
    icon: HelpCircle,
    url: "#",
  },
  {
    title: "Logout",
    icon: LogOut,
    url: "/",
    onPress: () => {
      authClient.signOut()
    },
  },
]

const AccoutMenu = () => {
  const { data } = useSession()
  const router = useRouter()

  const handlePage = (url: string) => {
    router.navigate(url as never)
  }

  return (
    <View className="flex-col flex-1 gap-5 px-3">
      <View className="flex-col items-center mt-4">
        <View className="p-4 rounded-full bg-muted mb-4">
          <User color="#9ca3af" size={60} />
        </View>
        <Text className="text-3xl">{data?.user.name}</Text>
      </View>

      <Card className="flex-col devide-y-2 divide-y divide-white">
        {userMenuItems.map((item, index) => (
          <Button
            key={index}
            className={clsx("flex-row items-center gap-2 justify-between p-4", {
              "border-b border-secondary": index !== userMenuItems.length - 1,
            })}
            variant="ghost"
            size="lg"
            onPress={item.onPress ? item.onPress : () => handlePage(item.url)}
          >
            <View className="flex-row items-center gap-2">
              <item.icon color="#9ca3af" size={24} />
              <Text>{item.title}</Text>
            </View>

            <ChevronRight color="#9ca3af" size={24} />
          </Button>
        ))}
      </Card>
    </View>
  )
}

export default AccoutMenu
