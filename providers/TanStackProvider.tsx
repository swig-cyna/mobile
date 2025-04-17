import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { PropsWithChildren, useState } from "react"

const TanstackProvider = ({ children }: PropsWithChildren) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60_000,
          placeholderData: keepPreviousData,
        },
      },
    })
  )

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default TanstackProvider
