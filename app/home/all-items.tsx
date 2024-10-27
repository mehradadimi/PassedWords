import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AllItemsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All items</Text>
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
