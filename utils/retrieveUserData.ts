import * as SecureStore from "expo-secure-store";

export const retrieveUserData = async () => {
  const userId = await SecureStore.getItemAsync("userId");
  const masterKey = await SecureStore.getItemAsync("masterKey");

  if (userId && masterKey) {
    return { userId, masterKey };
  } else {
    console.log("No user data found.");
  }
};
