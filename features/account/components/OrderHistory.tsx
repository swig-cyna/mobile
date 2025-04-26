import dayjs from "dayjs"
import { Calendar, ShoppingBag } from "lucide-react-native"
import { useEffect, useState } from "react"
import { View } from "react-native"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"
import { Badge } from "~/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Skeleton } from "~/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { Text } from "~/components/ui/text"
import { useSession } from "~/features/auth/utils/authClient"
import { useOrder } from "../hooks/useOrder"

const OrderHistory = () => {
  const { data: session } = useSession()
  const { data: orderData, isLoading } = useOrder(session?.user.id)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (orderData && Array.isArray(orderData)) {
      setOrders(orderData)
    }
  }, [orderData])

  if (isLoading) {
    return (
      <View className="space-y-8 flex-col gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-24 w-full" />
        ))}
      </View>
    )
  }

  if (orders.length === 0) {
    return (
      <View className="flex flex-col items-center justify-center py-16">
        <ShoppingBag size={48} color="#9ca3af" />
        <Text className="mt-4 text-xl font-semibold">No orders found</Text>
        <Text className="mt-2 text-gray-500">
          You haven't placed any orders in our store yet.
        </Text>
      </View>
    )
  }

  return (
    <View className="container mx-auto space-y-8 py-6">
      <View className="grid gap-6">
        {orders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="bg-muted/50">
              <View className="flex-row gap-4">
                <View>
                  <CardTitle className="flex-row gap-2">
                    {`Order ${order.id}`}
                  </CardTitle>
                  <View className="mt-1 flex-row items-center gap-2">
                    <Calendar size={16} color="gray" />
                    <Text className="text-muted-foreground">
                      {dayjs(order.createdAt).format("MMM D, YYYY")}
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                      {dayjs(order.createdAt).format("h:mm A")}
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-2 ml-auto">
                  <Text className="text-lg font-bold">{order.amount} €</Text>
                </View>
              </View>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="items">
                  <AccordionTrigger className="text-base font-medium border-none">
                    <Text>Order Details</Text>
                    <Badge variant="secondary" className="ml-2">
                      <Text>
                        {order.orderItem.reduce(
                          (total, item) => total + item.quantity,
                          0
                        )}{" "}
                        items
                      </Text>
                    </Badge>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="flex-row">
                          <TableHead className="flex-1">
                            <Text>Product</Text>
                          </TableHead>
                          <TableHead className="flex-1">
                            <Text className="text-right">Unit Price</Text>
                          </TableHead>
                          <TableHead className="flex-1">
                            <Text className="text-right">Quantity</Text>
                          </TableHead>
                          <TableHead className="flex-1">
                            <Text className="text-right">Total</Text>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.orderItem.map((item, index) => (
                          <TableRow key={index} className="flex-row">
                            <TableCell className="flex-1">
                              <Text className="font-medium">
                                {item.product.name}
                              </Text>
                            </TableCell>
                            <TableCell className="flex-1">
                              <Text className="text-right">
                                {item.product.price} €
                              </Text>
                            </TableCell>
                            <TableCell className="flex-1">
                              <Text className="text-right">
                                {item.quantity}
                              </Text>
                            </TableCell>
                            <TableCell className="font-semibold flex-1">
                              <Text className="text-right ">
                                {item.product.price * item.quantity} €
                              </Text>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell className="ml-auto">
                            <Text className="text-right font-bold ">Total</Text>
                          </TableCell>
                          <TableCell>
                            <Text className="text-right font-bold text-primary">
                              {order.amount} €
                            </Text>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </View>
    </View>
  )
}

export default OrderHistory
