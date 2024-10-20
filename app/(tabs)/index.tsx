import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { ListItem } from "react-native-elements";

const screenWidth = Dimensions.get("window").width;

const list = [
  {
    name: "All Items",
    icon: "list",
  },
  {
    name: "Passwords",
    icon: "lock-closed",
  },
  {
    name: "Secure Notes",
    icon: "document-lock",
  },
];

export default function PasswordsScreen() {
  // Handle the button press for each item
  const handlePress = (itemName) => {
    Alert.alert(`You pressed ${itemName}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {list.map((l, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => handlePress(l.name)}
              activeOpacity={0.6}
            >
              <ListItem bottomDivider containerStyle={styles.listItem}>
                <Ionicons size={28} style={styles.icon} name={l.icon} />
                <ListItem.Content>
                  <ListItem.Title style={styles.listItemTitle}>
                    {l.name}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#D2D2D2",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  listItem: {
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#606060",
    width: screenWidth * 0.9,
    alignSelf: "center",
  },
  listItemTitle: {
    color: "#ffffff",
    fontSize: 18,
  },
  icon: {
    marginRight: 10,
  },
});
