import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

function NotesButton({ onPress, item }) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        onPress(item);
      }}
    >
      <View style={styles.typeContainer}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Type: Note</Text>
      </View>
      <View style={styles.cotainer}>
        <Text style={styles.text}>Name: {item.name}</Text>
        <Text style={styles.text}>Tap to reveal note</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#D2D2D2",
  },
  cotainer: {
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
  revealPassword: {
    width: "40%",
    flexWrap: "nowrap",
  },
  text: {
    fontSize: 18,
  },
});

export default NotesButton;
