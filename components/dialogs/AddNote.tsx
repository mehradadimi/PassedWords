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
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import CryptoES from "crypto-es";
import { db, auth } from "../../firebaseConfig";

const screenWidth = Dimensions.get("window").width;

const AddNoteFormDialog = ({ isVisible, onClose }) => {
  const [note, setNote] = useState("");
  const [name, setName] = useState("");

  const handleAddNote = async () => {
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

      // Encrypt the note using the master key
      const encryptedNote = CryptoES.AES.encrypt(note, masterKey).toString();

      const noteDocRef = doc(collection(db, "users", userId, "notes"));

      await setDoc(noteDocRef, {
        name: name,
        note: note,
        encryptedNote: encryptedNote,
        createdAt: new Date(),
      });

      console.log("Note added successfully!");

      onClose();
      setNote("");
    } catch (error) {
      console.error("Error adding note: ", error);
    }
  };

  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={onClose}
      overlayStyle={styles.dialogContainer}
    >
      <Dialog.Title title="Add New Secure Note" />

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Enter a name for your note"
          placeholderTextColor="black"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.inputMultiLine}
          placeholder="Enter your note"
          placeholderTextColor="black"
          value={note}
          onChangeText={setNote}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAddNote}>
        <Text style={styles.buttonText}>Add Note</Text>
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    color: "black",
    marginBottom: 10,
  },
  inputMultiLine: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    color: "black",
    marginBottom: 10,
    height: 100,
    textAlignVertical: "top",
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

export default AddNoteFormDialog;
