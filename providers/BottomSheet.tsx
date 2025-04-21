import React from "react"
import { StyleSheet } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const BottomSheetProvider = ({ children }: React.PropsWithChildren) => (
  <GestureHandlerRootView style={BottomSheetStyles.container}>
    {children}
  </GestureHandlerRootView>
)

export const BottomSheetStyles = StyleSheet.create({
  backhground: {
    backgroundColor: "#09090B",
  },
  handle: {
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    width: "100%",
  },
})

export default BottomSheetProvider
