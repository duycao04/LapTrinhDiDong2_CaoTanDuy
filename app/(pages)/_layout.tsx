import { Stack } from "expo-router";

export default function PageLayout() {
  return (
    <Stack>
      <Stack.Screen name="OrderSuccess" options={{ headerShown: false }} />
    </Stack>
  );
}
