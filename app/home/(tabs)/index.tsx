import AddPasswordFormDialog from "@/components/dialogs/AddPassword";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ListItem, Dialog } from "react-native-elements";
import { Link } from "expo-router";

const screenWidth = Dimensions.get("window").width;

const list = [
  { name: "All Items", icon: "list", link: "/home/(tabs)/all-items" },
  { name: "Passwords", icon: "lock-closed", link: "/home/(tabs)/passwords" }, // Link to passwords route
  {
    name: "Secure Notes",
    icon: "document-lock",
    link: "/home/(tabs)/secure-notes",
  },
];

export default function PasswordsScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddPasswordVisible, setAddPasswordVisible] = useState(false);

  const handleAddPress = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const showAddPasswordDialog = () => {
    setModalVisible(false);
    setAddPasswordVisible(true);
  };
  const closeAddPasswordDialog = () => setAddPasswordVisible(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {list.map((l, i) => (
            <Link key={i} href={l.link} asChild>
              <TouchableOpacity>
                <ListItem bottomDivider containerStyle={styles.listItem}>
                  <Ionicons size={28} style={styles.icon} name={l.icon} />
                  <ListItem.Content>
                    <ListItem.Title style={styles.listItemTitle}>
                      {l.name}
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </TouchableOpacity>
            </Link>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddPress}
          activeOpacity={0.7}
        >
          <Ionicons name="add-circle" size={48} color="#99C764" />
        </TouchableOpacity>

        <Dialog
          isVisible={isModalVisible}
          onBackdropPress={closeModal}
          overlayStyle={styles.dialogContainer}
        >
          <Dialog.Title title="Choose new" />
          <ListItem
            onPress={showAddPasswordDialog}
            containerStyle={styles.dialogListItem}
            underlayColor="transparent"
          >
            <Ionicons name="lock-closed" size={24} color="#000" />
            <ListItem.Content>
              <ListItem.Title style={styles.listItemTitle}>
                Add Password
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>

          <ListItem
            onPress={() => Alert.alert("Add Secure Note")}
            containerStyle={[styles.dialogListItem, styles.dialogItemMargin]}
            underlayColor="transparent"
          >
            <Ionicons name="document-lock" size={24} color="#000" />
            <ListItem.Content>
              <ListItem.Title style={styles.listItemTitle}>
                Add Secure Note
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </Dialog>

        <AddPasswordFormDialog
          isVisible={isAddPasswordVisible}
          onClose={closeAddPasswordDialog}
        />
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
  addButton: {
    position: "absolute",
    bottom: 30,
    left: screenWidth * 0.05,
    backgroundColor: "#606060",
    borderRadius: 50,
    padding: 10,
  },
  dialogContainer: {
    width: screenWidth * 0.9,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
  },
  dialogListItem: {
    width: screenWidth * 0.7,
    borderRadius: 10,
    backgroundColor: "#606060",
  },
  dialogItemMargin: {
    marginTop: 10,
  },
});
