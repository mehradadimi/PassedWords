import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebaseConfig";
import { useState } from "react";

export default function SignInTest() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function signIn() {
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button_container} onPress={signIn}>
        <Text style={styles.button_text}>SignUp</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 48,
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
  },
  button_text: {
    textAlign: "center",
    fontSize: 24,
    color: "#1976d2",
  },
  button_container: {
    borderRadius: 15,
    flexDirection: "row",
    margin: 16,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#e6e6e6",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    color: "white",
  },
});
