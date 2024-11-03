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

export default function AllItemsScreen() {
  const [items, setItems] = useState([]);
  const [masterKey, setMasterKey] = useState<string>("");

  useEffect(() => {
    const fetchItemsAndMasterKey = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("No user is logged in");
          return;
        }
        const userId = user.uid;

        // Fetch masterKey
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setMasterKey(userData.masterKey);
        } else {
          console.error("User document does not exist");
          return;
        }

        // Fetch passwords
        const passwordsSnapshot = await getDocs(
          collection(db, "users", userId, "passwords")
        );
        const passwordsList = passwordsSnapshot.docs.map((doc) => ({
          id: doc.id,
          type: "password",
          ...doc.data(),
        }));

        // Fetch notes
        const notesSnapshot = await getDocs(
          collection(db, "users", userId, "notes")
        );
        const notesList = notesSnapshot.docs.map((doc) => ({
          id: doc.id,
          type: "note",
          ...doc.data(),
        }));

        // Combine and sort by creation date
        const combinedList = [...passwordsList, ...notesList].sort(
          (a, b) => a.createdAt - b.createdAt
        );
        setItems(combinedList);
      } catch (error) {
        console.error("Error fetching items or master key: ", error);
      }
    };

    fetchItemsAndMasterKey();
  }, []);

  const handleItemClick = (item) => {
    try {
      if (!masterKey) {
        Alert.alert("Error", "Master key not found.");
        return;
      }

      const decryptedData = CryptoES.AES.decrypt(
        item.encryptedNote || item.encryptedPassword,
        masterKey
      ).toString(CryptoES.enc.Utf8);

      Alert.alert(
        `Decrypted ${item.type === "note" ? "Note" : "Password"}`,
        decryptedData
      );
    } catch (error) {
      console.error("Error decrypting item: ", error);
      Alert.alert("Error", "Could not decrypt the item.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Items</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleItemClick(item)}
          >
            <Text style={styles.text}>
              {item.type === "note" ? "Note Name" : "Password User ID"}:{" "}
              {item.name || item.website}
            </Text>
            <Text style={styles.text}>Tap to reveal {item.type}</Text>
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
