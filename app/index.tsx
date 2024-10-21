import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { useColorScheme } from "react-native";

import { app } from "../firebaseConfig";
import { Colors } from "@/constants/Colors";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const colorScheme = useColorScheme() || "light"; 
  const router = useRouter();

  const signIn = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert("Success", "Signed in successfully!");
        router.replace("/home/(tabs)");
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <Text style={[styles.title, { color: Colors[colorScheme].tint }]}>
        Sign In
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: Colors[colorScheme].background,
            color: Colors[colorScheme].text,
          },
        ]}
        placeholder="Enter email"
        placeholderTextColor={Colors[colorScheme].icon}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: Colors[colorScheme].background,
            color: Colors[colorScheme].text,
          },
        ]}
        placeholder="Enter password"
        placeholderTextColor={Colors[colorScheme].icon}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors[colorScheme].tint }]} // Button color based on theme
        onPress={signIn}
      >
        <Text
          style={[styles.buttonText, { color: Colors[colorScheme].background }]}
        >
          Sign In
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/sign-up")}>
        <Text style={[styles.footerText, { color: Colors[colorScheme].text }]}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 20,
  },
});
