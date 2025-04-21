"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Text } from "~/components/ui/text"
import { sendVerificationEmail } from "../utils/authClient"
import ResendEmailButton from "./ResendEmailButton"

type Props = {
  userEmail: string
}

const EmailVerification = ({ userEmail }: Props) => {
  const [error, setError] = useState<string | null>(null)

  const handleResendEmail = async () => {
    try {
      await sendVerificationEmail({
        email: userEmail,
      })
    } catch (err) {
      console.error(`An error has occurred:" ${err}`)
      setError("An error has occurred")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Verify your email</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Text>A verification link has been sent to</Text>
        <Text>{userEmail}</Text>
        <Text>Please click the link to verify your email</Text>
        <ResendEmailButton
          onResend={handleResendEmail}
          buttonText={"Resend email"}
        />
        {error && <Text className="mt-2 text-red-500">{error}</Text>}
      </CardContent>
    </Card>
  )
}

export default EmailVerification
