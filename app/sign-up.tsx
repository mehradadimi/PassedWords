import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  useColorScheme,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, db } from "../firebaseConfig";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { generateSecretKey } from "@/algorithms/encryptPassword";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const colorScheme = useColorScheme() || "light";
  const router = useRouter();

  const signUp = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    const auth = getAuth(app);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const userId = res.user.uid;

      const masterKey = generateSecretKey();

      await setDoc(doc(db, "users", userId), {
        email,
        masterKey,
        createdAt: new Date(),
      });

      Alert.alert(
        "Success",
        "User created successfully and master key generated!",
      );
      router.replace("/home/(tabs)");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <Text style={[styles.title, { color: Colors[colorScheme].tint }]}>
        Create an Account
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: Colors[colorScheme].background,
            color: Colors[colorScheme].text,
          },
        ]}
        placeholder="Email"
        placeholderTextColor={Colors[colorScheme].icon}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: Colors[colorScheme].background,
            color: Colors[colorScheme].text,
          },
        ]}
        placeholder="Password"
        placeholderTextColor={Colors[colorScheme].icon}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors[colorScheme].tint }]}
        onPress={signUp}
      >
        <Text
          style={[styles.buttonText, { color: Colors[colorScheme].background }]}
        >
          Sign Up
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/")}>
        <Text style={[styles.footerText, { color: Colors[colorScheme].text }]}>
          Already have an account? Log In
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
    borderColor: "#ccc",
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
