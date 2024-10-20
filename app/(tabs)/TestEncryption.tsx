import { encryptPassword } from "@/algorithms/encryptPassword";
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";

export default function TestEncryption() {
  const [password, setPassword] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState("");

  const handleEncrypt = async () => {
    try {
      const encrypted = await encryptPassword(password);
      setEncryptedPassword(encrypted);
      Alert.alert("Success", "Password encrypted successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Encrypt Password" onPress={handleEncrypt} />
      {encryptedPassword ? (
        <Text style={styles.resultText}>
          Encrypted Password: {encryptedPassword}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  resultText: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
  },
});
