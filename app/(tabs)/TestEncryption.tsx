import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { encryptPassword } from "@/algorithms/encryptPassword"; // Adjust the path to your encryption function
import { decryptPassword } from "@/algorithms/decryptPassword"; // Adjust the path to your decryption function

export default function TestEncryption() {
  const [password, setPassword] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [decryptedPassword, setDecryptedPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleEncrypt = () => {
    try {
      const encrypted = encryptPassword(password, secretKey);
      setEncryptedPassword(encrypted);
      Alert.alert("Success", "Password encrypted successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleDecrypt = () => {
    try {
      const decrypted = decryptPassword(encryptedPassword, secretKey);
      setDecryptedPassword(decrypted);
      Alert.alert("Success", "Password decrypted successfully!");
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
      <TextInput
        style={styles.input}
        placeholder="Enter secret key"
        value={secretKey}
        onChangeText={setSecretKey}
        secureTextEntry
      />
      <Button title="Encrypt Password" onPress={handleEncrypt} />
      {encryptedPassword ? (
        <Text style={styles.resultText}>
          Encrypted Password: {encryptedPassword}
        </Text>
      ) : null}
      {encryptedPassword && (
        <Button title="Decrypt Password" onPress={handleDecrypt} />
      )}
      {decryptedPassword ? (
        <Text style={styles.resultText}>
          Decrypted Password: {decryptedPassword}
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
    color: "white",
  },
  resultText: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
  },
});
