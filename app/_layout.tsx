// app/_layout.tsx
import { Stack } from "expo-router";
import RootLayout from "@/components/RootLayout";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function AppLayout() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      if (user) {
        router.replace("/home/(tabs)");
      } else {
        router.replace("/auth/sign-in");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <RootLayout>
      <Stack>
        {/* Auth Screens */}
        <Stack.Screen name="auth/sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="auth/sign-up" options={{ headerShown: false }} />

        {/* Home Screens */}
        <Stack.Screen name="home/(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="home/all-items" options={{ title: "All Items" }} />
        <Stack.Screen name="home/passwords" options={{ title: "Passwords" }} />
        <Stack.Screen
          name="home/secure-notes"
          options={{ title: "Secure Notes" }}
        />

        {/* Not-found screen */}
        <Stack.Screen name="+not-found" />
      </Stack>
    </RootLayout>
  );
}
