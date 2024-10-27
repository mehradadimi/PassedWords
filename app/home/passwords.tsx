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

export default function UserPasswordsScreen() {
  const [passwords, setPasswords] = useState([]);
  const [masterKey, setMasterKey] = useState<string>("");

  useEffect(() => {
    const fetchPasswordsAndMasterKey = async () => {
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
          collection(db, "users", userId, "passwords")
        );
        const passwordsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPasswords(passwordsList);
      } catch (error) {
        console.error("Error fetching passwords or master key: ", error);
      }
    };

    fetchPasswordsAndMasterKey();
  }, []);

  const handlePasswordClick = (encryptedPassword: string) => {
    try {
      if (!masterKey) {
        Alert.alert("Error", "Master key not found.");
        return;
      }

      const decryptedPassword = CryptoES.AES.decrypt(
        encryptedPassword,
        masterKey
      ).toString(CryptoES.enc.Utf8);

      Alert.alert("Decrypted Password", decryptedPassword);
    } catch (error) {
      console.error("Error decrypting password: ", error);
      Alert.alert("Error", "Could not decrypt the password.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Passwords</Text>
      <FlatList
        data={passwords}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handlePasswordClick(item.encryptedPassword)}
          >
            <Text style={styles.text}>Website: {item.website}</Text>
            <Text style={styles.text}>Username: {item.username}</Text>
            <Text style={styles.text}>Tap to reveal password</Text>
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
