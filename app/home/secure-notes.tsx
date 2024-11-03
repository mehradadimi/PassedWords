import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/firebaseConfig";
import CryptoES from "crypto-es";

export default function UserNotesScreen() {
  const [notes, setNotes] = useState([]);
  const [masterKey, setMasterKey] = useState<string>("");

  useEffect(() => {
    const fetchNotesAndMasterKey = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("No user is logged in");
          return;
        }
        const userId = user.uid;

        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setMasterKey(userData.masterKey);
        } else {
          console.error("User document does not exist");
          return;
        }

        const querySnapshot = await getDocs(
          collection(db, "users", userId, "notes")
        );
        const notesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(notesList);
      } catch (error) {
        console.error("Error fetching Notes or master key: ", error);
      }
    };

    fetchNotesAndMasterKey();
  }, []);

  const handleNotesClick = (encryptedNotes: string) => {
    try {
      if (!masterKey) {
        Alert.alert("Error", "Master key not found.");
        return;
      }

      const decryptedNotes = CryptoES.AES.decrypt(
        encryptedNotes,
        masterKey
      ).toString(CryptoES.enc.Utf8);

      Alert.alert("Decrypted Notes", decryptedNotes);
    } catch (error) {
      console.error("Error decrypting notes: ", error);
      Alert.alert("Error", "Could not decrypt the note.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Notes</Text>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleNotesClick(item.encryptedNote)}
          >
            <Text style={styles.text}>Name: {item.name}</Text>
            <Text style={styles.text}>Tap to reveal note</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  text: {
    fontSize: 18,
  },
});
