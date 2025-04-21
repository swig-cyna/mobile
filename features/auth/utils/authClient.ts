import { expoClient } from "@better-auth/expo/client"
import { twoFactorClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import * as SecureStore from "expo-secure-store"

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
  disableDefaultFetchPlugins: true,
  trustedOrigins: ["mobile://"],
  appName: "Cyna Mobile",
  plugins: [
    expoClient({
      scheme: "myapp",
      storagePrefix: "myapp",
      storage: SecureStore,
    }),
    twoFactorClient(),
  ],
})

export const {
  signIn,
  signUp,
  sendVerificationEmail,
  forgetPassword,
  signOut,
  useSession,
  updateUser,
  changeEmail,
} = authClient
