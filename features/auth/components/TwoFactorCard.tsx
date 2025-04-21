import { useRouter } from "expo-router"
import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { OtpInput } from "react-native-otp-entry"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Text } from "~/components/ui/text"
import { authClient } from "../utils/authClient"

const TwoFactorCard = () => {
  const router = useRouter()
  const [totpCode, setTotpCode] = useState("")
  const [isSigninComplete, setIsSigninComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTotpVerification = async () => {
    if (totpCode.length !== 6) {
      setError("Please enter a 6-digit code")

      return
    }

    try {
      const response = await authClient.twoFactor.verifyTotp({ code: totpCode })

      if (response.error) {
        throw new Error(response.error.message)
      }

      setIsSigninComplete(true)
      setTimeout(() => {
        router.replace("/account")
        setIsSigninComplete(false)
      }, 2000)
    } catch (err: any) {
      console.error(`TOTP verification failed: ${err}`)
      setError(err.message || "An error occurred")
    }
  }

  if (isSigninComplete) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Verification successful</CardTitle>
          <CardDescription>
            You have successfully verified your account
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Verify your account</CardTitle>
        <CardDescription>
          Enter the code from your authenticator app
        </CardDescription>
      </CardHeader>
      <CardContent>
        <View className="mb-4 flex-row justify-center">
          <OtpInput
            numberOfDigits={6}
            onTextChange={setTotpCode}
            theme={{
              pinCodeContainerStyle: style.pinCodeContainer,
              pinCodeTextStyle: style.pinCodeText,
              focusStickStyle: style.focusStick,
              focusedPinCodeContainerStyle: style.focusedPinCodeContainer,
            }}
          />
        </View>
        {error && <Text className="mt-2 text-red-500">{error}</Text>}
        <Button
          onPress={handleTotpVerification}
          className="mt-4 w-full"
          disabled={totpCode.length !== 6}
        >
          <Text>Verify</Text>
        </Button>
      </CardContent>
    </Card>
  )
}

export default TwoFactorCard

const style = StyleSheet.create({
  pinCodeText: {
    color: "#fff",
  },
  pinCodeContainer: {
    borderColor: "#9ca3af",
  },
  focusStick: {
    backgroundColor: "#fff",
  },
  focusedPinCodeContainer: {
    borderColor: "hsl(266 97% 47%)",
  },
})
