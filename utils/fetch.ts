import ky from "ky"

export const apiClient = ky.extend({
  prefixUrl: process.env.EXPO_PUBLIC_BACKEND_URL,
})
