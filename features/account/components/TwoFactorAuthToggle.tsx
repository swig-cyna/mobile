import { useEffect, useState } from "react"
import { View } from "react-native"
import QRCode from "react-qr-code"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Switch } from "~/components/ui/switch"
import { Text } from "~/components/ui/text"
import { authClient, useSession } from "~/features/auth/utils/authClient"

const TwoFactorAuthToggle = () => {
  const { data: session } = useSession()

  const [isLoading, setIsLoading] = useState(false)
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [password, setPassword] = useState("")
  const [qrCodeURI, setQrCodeURI] = useState<string | null>(null)
  const [secret, setSecret] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [message, setMessage] = useState<{
    content: string
    type: string
  } | null>({ content: "", type: "" })

  useEffect(() => {
    setIs2FAEnabled(session?.user?.twoFactorEnabled || false)
  }, [session])

  const handleError = (error: any, defaultMessage: string) => {
    console.error("Erreur, error")
    setMessage({
      content: error.message || defaultMessage,
      type: error,
    })
  }

  const validateInput = (input: string, errorMessage: string) => {
    if (!input) {
      setMessage({ content: errorMessage, type: "error" })

      return false
    }

    return true
  }

  const toggleTwoFactorAuth = async (
    action: string,
    successMessage: string,
    errorMessage: string
  ) => {
    if (!validateInput(password, "Please enter your password to continue")) {
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      if (action === "enable") {
        const result = await authClient.twoFactor.enable({ password })
        const urlParams = new URLSearchParams(
          result.data?.totpURI.split("?")[1]
        )
        if (result.error) {
          throw new Error(result.error.message)
        }

        setQrCodeURI(result.data.totpURI)
        setSecret(urlParams.get("secret") as string)
      }

      if (action === "disable") {
        const result = await authClient.twoFactor.disable({ password })

        if (result.error) {
          throw new Error(result.error.message)
        }

        setQrCodeURI(null)
        setSecret("")
        window.location.reload()
      }

      setIs2FAEnabled(action === "enable")
      setMessage({ content: successMessage, type: "success" })
    } catch (error) {
      handleError(error, errorMessage)
    } finally {
      setIsLoading(false)
      setPassword("")
    }
  }

  const handleToggle = async () => {
    if (is2FAEnabled) {
      await toggleTwoFactorAuth("disable", "2FA disabled", "Deactivation error")
    } else {
      await toggleTwoFactorAuth(
        "enable",
        "Activation request acknowledged",
        "Activation error"
      )
    }
  }

  const verifyTotpCode = async () => {
    if (!validateInput(verificationCode, "Invalid or expired code")) {
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const { error } = await authClient.twoFactor.verifyTotp({
        code: verificationCode,
      })

      if (error) {
        throw new Error(error.message)
      }

      setIs2FAEnabled(true)
      setMessage({
        content: "Activation successful! 2FA is now enabled.",
        type: "success",
      })
    } catch (error) {
      handleError(error, "Invalid or expired code")
    } finally {
      setIsLoading(false)
      setVerificationCode("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          Two-Factor Authentication (2FA)
        </CardTitle>
        <CardDescription>
          Secure your account with two-factor authentication
        </CardDescription>
      </CardHeader>

      <CardContent>
        <View className="mb-4 flex-row items-center justify-between">
          <Text>Status: {is2FAEnabled ? "Enabled" : "Disabled"}</Text>
          <Switch
            checked={is2FAEnabled}
            onCheckedChange={handleToggle}
            disabled={isLoading}
          />
        </View>

        <View className="mb-4">
          <Input
            secureTextEntry
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />
        </View>

        {message?.content && (
          <Text
            className={`text-${message.type === "success" ? "green" : "red"}-500`}
          >
            {message?.content}
          </Text>
        )}

        {qrCodeURI && !is2FAEnabled && (
          <View className="mb-6">
            <Text className="mb-4">
              Step 1/2: Scan the QR Code or enter the secret into your
              authentication app.
            </Text>
            <View className="mb-4 flex-row justify-center items-center p-4">
              <View className="bg-white p-2 rounded">
                <QRCode value={qrCodeURI} size={200} />
              </View>
            </View>

            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium">Secret Key:</Text>
              <Text className="mt-2 text-sm text-muted-foreground">
                Copy this code if you cannot scan the QR Code
              </Text>
              <View className="break-all rounded-md p-3">
                <Text>{secret}</Text>
              </View>
            </View>

            <Text className="mb-4">
              Step 2/2: Enter the code provided by your authentication app.
            </Text>
            <View className="mb-4 flex gap-2">
              <Input
                placeholder="Enter the 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.nativeEvent.text)}
              />
              <Button onPress={verifyTotpCode} disabled={!verificationCode}>
                <Text>Verify</Text>
              </Button>
            </View>
          </View>
        )}

        {isLoading && <Text className="mt-2 text-gray-500">Loading...</Text>}
      </CardContent>
    </Card>
  )
}

export default TwoFactorAuthToggle
