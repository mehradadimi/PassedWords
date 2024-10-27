// app/index.tsx
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { View, ActivityIndicator } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export default function EntryScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() || "light";

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/home/(tabs)");
      } else {
        router.replace("/auth/sign-in");
      }
    });

    return unsubscribe;
  }, [router]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors[colorScheme].background,
      }}
    >
      <ActivityIndicator size="large" color={Colors[colorScheme].tint} />
    </View>
  );
}
