import { clsx, type ClassValue } from "clsx"
import { Platform, StyleSheet } from "react-native"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SafeAreaViewStyle = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
})
