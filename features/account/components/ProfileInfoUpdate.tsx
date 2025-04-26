import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "expo-router"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Text } from "~/components/ui/text"
import ResendEmailButton from "~/features/auth/components/ResendEmailButton"
import {
  changeEmail,
  sendVerificationEmail,
  updateUser,
  useSession,
} from "~/features/auth/utils/authClient"
import { AccountSchema, accountSchema } from "./../schemas/changeEmail"

const ProfileInfoUpdate = () => {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ content: "", type: "" })
  const [isEmailChangeInitiated, setIsEmailChangeInitiated] = useState(false)

  const form = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    },
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmit = async (values: AccountSchema) => {
    setIsLoading(true)
    setMessage({ content: "", type: "" })

    try {
      if (session?.user.name !== values.name) {
        await updateUser({ name: values.name })
        setMessage({ content: "Name updated successfully", type: "success" })
      }

      if (session?.user.email !== values.email) {
        await changeEmail({
          newEmail: values.email,
          callbackURL: `${process.env.NEXT_PUBLIC_FRONTEND}/user/account-management`,
        })
        setMessage({
          content: "Email change process initiated",
          type: "success",
        })
        setIsEmailChangeInitiated(true)
      }
    } catch (error) {
      console.error(`Une erreur s'est produite : ${error}`)
      setMessage({ content: "Error updating email", type: "error" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendEmail = async () => {
    try {
      await sendVerificationEmail({
        email: session?.user.email as string,
        callbackURL: `${process.env.NEXT_PUBLIC_FRONTEND}/user/account-management`,
      })
    } catch (err) {
      console.error(`An error has occurred:" ${err}`)
    }
  }

  if (isEmailChangeInitiated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Change your email</CardTitle>
          <CardDescription>
            Verify your identity to validate the request
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Text>
            To secure the modification of your email address, we need to verify
            your identity. An email has been sent to your current address:
          </Text>
          <Text>{session?.user.email}</Text>
          <Text>
            Please click on the link in the email to validate your request.
          </Text>
        </CardContent>
      </Card>
    )
  }

  if (!session?.user.emailVerified) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            Verification of your new email address
          </CardTitle>
          <CardDescription>
            Verify your new address to finalize the request
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Text>
            Thank you for confirming your identity. To finalize the change of
            your email address, you will find an email in your new address:
          </Text>
          <Text>{session?.user.email}</Text>
          <Text>
            "Please click on the link in the email to finalize your request."
          </Text>
          <ResendEmailButton
            onResend={handleResendEmail}
            buttonText="Resend verification email"
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Edit Your Data</CardTitle>
        <CardDescription>
          Here you can edit the information associated with your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Text>Name</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="John"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.name && (
          <Text className="text-red-500 mb-2">{errors.name.message}</Text>
        )}

        <Text className="mt-4">Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="email@example.com"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && (
          <Text className="text-red-500 mb-2">{errors.email.message}</Text>
        )}

        {message.content && (
          <Text
            className={
              message.type === "success" ? "text-green-500" : "text-red-500"
            }
          >
            {message.content}
          </Text>
        )}
        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="mt-4 w-full"
        >
          <Text>{isLoading ? "Updating" : "Update"}</Text>
        </Button>

        <View className="mt-4">
          <Link
            href={"/forget-password" as never}
            className="text-blue-500 hover:underline"
          >
            <Text>I want to reset my password</Text>
          </Link>
        </View>
      </CardContent>
    </Card>
  )
}

export default ProfileInfoUpdate
