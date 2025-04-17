import { HTTPError } from "ky"

export const handleQueryError = async (error: any) => {
  if (error instanceof HTTPError) {
    try {
      const errorData = await error.response.json()

      return errorData.error || "Something went wrong"
    } catch (errorThrow) {
      console.error("Error parsing error response:", errorThrow)

      return "Something went wrong"
    }
  }

  console.error("Client error:", error)

  return error.message || "Something went wrong"
}

export const createErrorHandler = async (error: any) => {
  console.error("Query error:", error)
  const message = await handleQueryError(error)
  /*toast({
    title: "Error",
    description: message,
    variant: "destructive",
  })*/
}
