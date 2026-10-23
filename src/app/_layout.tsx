import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@utils/queryClient";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootLayout = () => {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          {/* Back from confirmation would re-show a completed form; finish via its buttons. */}
          <Stack.Screen name="confirmation" options={{ gestureEnabled: false }} />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default RootLayout;
