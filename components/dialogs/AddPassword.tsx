import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Dialog } from "react-native-elements";
import {
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import CryptoES from "crypto-es";
import { db, app, auth } from "../../firebaseConfig";

const screenWidth = Dimensions.get("window").width;

const AddPasswordFormDialog = ({ isVisible, onClose }) => {
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAddPassword = async () => {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error("No user is currently authenticated.");
        return;
      }

      const userId = currentUser.uid;

      // Fetch the master key from the user's document
      const userDoc = await getDoc(doc(db, "users", userId));
      if (!userDoc.exists()) {
        console.error("User does not exist");
        return;
      }

      const userData = userDoc.data();
      const masterKey = userData.masterKey;

      // Encrypt the password using the master key
      const encryptedPassword = CryptoES.AES.encrypt(
        password,
        masterKey
      ).toString();

      const passwordDocRef = doc(collection(db, "users", userId, "passwords"));

      await setDoc(passwordDocRef, {
        website: website,
        username: username,
        encryptedPassword: encryptedPassword,
        createdAt: new Date(),
      });

      console.log("Password added successfully!");

      onClose();
      setPassword("");
      setUsername("");
      setWebsite("");
    } catch (error) {
      console.error("Error adding password: ", error);
    }
  };

  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={onClose}
      overlayStyle={styles.dialogContainer}
    >
      <Dialog.Title title="Add New Password" />

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Website</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter website"
          placeholderTextColor="black"
          value={website}
          onChangeText={setWebsite}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="black"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="black"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddPassword}>
        <Text style={styles.buttonText}>Add Password</Text>
      </TouchableOpacity>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    width: screenWidth * 0.9,
    borderRadius: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
    width: "100%",
    color: "black",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddPasswordFormDialog;
