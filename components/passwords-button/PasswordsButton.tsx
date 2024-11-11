import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

function PasswordsButton({ onPress, item }) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        onPress(item);
      }}
    >
      <View style={styles.typeContainer}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Type: Password</Text>
      </View>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.text}>Website: {item.website}</Text>
          <Text style={styles.text}>Username: {item.username}</Text>
        </View>
        <View style={styles.revealPassword}>
          <Text style={styles.text}>Tap to reveal password</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  typeContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderBottomColor: "black",
    width: "100%",
    marginBottom: 10,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#D2D2D2",
    display: "flex",
    flexDirection: "column",
  },
  revealPassword: {
    width: "40%",
    flexWrap: "nowrap",
  },
  text: {
    fontSize: 18,
  },
});

export default PasswordsButton;
